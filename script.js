// Seleccionar elementos
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

// Evento para abrir/cerrar menú en dispositivos móviles
hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Ejemplo de alerta al enviar el formulario de contacto
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("¡Gracias por tu mensaje! Me pondré en contacto pronto.");
  contactForm.reset();
});