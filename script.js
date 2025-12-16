// Seleccionar elementos
const hamburger = document.getElementById("hamburger"); // Botón de menú hamburguesa
const navbar = document.getElementById("navbar"); // Barra de navegación

// Evento para abrir/cerrar menú en dispositivos móviles
hamburger.addEventListener("click", () => {   
  navbar.classList.toggle("active"); // Alterna la clase 'active' para mostrar/ocultar el menú
});

// Ejemplo de alerta al enviar el formulario de contacto
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", async (e) => {e.preventDefault();
  
  const name = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("mensaje").value;

//Mostrar alerta de carga
/* Swal.fire({
  title: "Enviando...",
  allowOutsideClick: false,
  didOpen: () => Swal.showLoading()
}); */

  try {
    const response = await fetch("https://portfolio-backend-0fut.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el mensaje");
    }

  Swal.fire({
    icon: 'success', // Icono de éxito
    title: '¡Mensaje enviado!', // Título del alert
    text: 'Gracias por contactarme. Te responderé a la brevedad.', // Texto del alert
    background: '#232323',         // Fondo del alert
    color: '#ffffffff',              // Color del texto
    confirmButtonColor: '#a0ffff',  // Color del botón
    iconColor: '#a0ffff',           // Color del icono
    confirmButtonText: '<span class="swal2-ok-text">OK</span>', // Texto del botón
    customClass: {
    confirmButton: 'swal2-ok-btn' // Clase personalizada para el botón
  }
  });
  contactForm.reset(); // Reiniciar el formulario

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo enviar el mensaje. Inténtalo más tarde.",
      background: "#232323",
      color: "#ffffff",
      confirmButtonColor: "#ff6b6b",
      confirmButtonText: "OK",
    });
  }
});


// Slider de certificados
// Variables del slider
const slider = document.getElementById('certificatesSlider');
const dotsContainer = document.getElementById('sliderDots');
const cards = document.querySelectorAll('.certificate-card');

let currentIndex = 0;
const cardWidth = 304; // ancho de la tarjeta + gap
const totalCards = cards.length;

// Crear indicadores de puntos
function createDots() {
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Actualizar puntos activos
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}
// Ir a una diapositiva específica
function goToSlide(index) {
  currentIndex = index;
  
  // Calcular el scroll para centrar la tarjeta
  const container = slider.parentElement;
  const containerWidth = container.offsetWidth;
  const cardElement = cards[index];
  const cardOffsetLeft = cardElement.offsetLeft;
  const cardWidth = cardElement.offsetWidth;
  
  // Centrar la tarjeta en el contenedor
  const scrollPosition = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
  
  slider.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
  updateDots();
}

// Deslizar a la izquierda
function slideLeft() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - 1;
  }
  goToSlide(currentIndex);
}

// Deslizar a la derecha
function slideRight() {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  goToSlide(currentIndex);
}

// Autoplay opcional (comentado por defecto)
let autoplayInterval;
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    slideRight();
  }, 3000); // Cambia cada 3 segundos
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Inicializar
createDots();

// Opcional: Descomentar para activar autoplay
  startAutoplay();

// Pausar autoplay al hacer hover
slider.addEventListener('mouseenter', stopAutoplay);
slider.addEventListener('mouseleave', () => {
  // Descomentar para reactivar autoplay después del hover
  //startAutoplay();
});

// Soporte táctil para dispositivos móviles
let startX = 0;
let scrollLeft = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX;
  const walk = (startX - x) * 2;
  slider.scrollLeft = scrollLeft + walk;
});

slider.addEventListener('touchend', () => {
  const newIndex = Math.round(slider.scrollLeft / cardWidth);
  currentIndex = newIndex;
  goToSlide(currentIndex);
});

// ===== FUNCIONES PARA EL MODAL =====

// Abrir modal con la imagen del certificado
function openModal(event, imageSrc) {
  event.preventDefault();
  const modal = document.getElementById('certificateModal');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = imageSrc;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

// Cerrar modal
function closeModal(event) {
  // Cerrar solo si se hace clic en el overlay o en el botón de cerrar
  if (event.target.classList.contains('modal-overlay') || 
      event.target.classList.contains('modal-close') ||
      event.target.closest('.modal-close')) {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll del body
  }
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('certificateModal');
    if (modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});