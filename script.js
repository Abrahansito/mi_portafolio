// Seleccionar elementos
const hamburger = document.getElementById("hamburger"); // Botón de menú hamburguesa
const navbar = document.getElementById("navbar"); // Barra de navegación

// Evento para abrir/cerrar menú en dispositivos móviles
hamburger.addEventListener("click", () => {   
  navbar.classList.toggle("active"); // Alterna la clase 'active' para mostrar/ocultar el menú
});

// Ejemplo de alerta al enviar el formulario de contacto
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  Swal.fire({
    icon: 'success', // Icono de éxito
    title: '¡Mensaje enviado!', // Título del alert
    text: 'Gracias por tu interés. Me pondré en contacto pronto.', // Texto del alert
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
});