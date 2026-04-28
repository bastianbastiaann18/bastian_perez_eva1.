const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // ✅ Validación preventiva

  // Captura de valores
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const password = document.getElementById("password").value.trim();

  // Limpiar mensaje previo
  mensaje.textContent = "";
  mensaje.style.color = "red";

  // Validaciones
  if (nombre === "" || correo === "" || direccion === "" || password === "") {
    mensaje.textContent = "Todos los campos son obligatorios.";
    return;
  }

  // Validar nombre (solo letras y espacios)
  const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
  if (!regexNombre.test(nombre)) {
    mensaje.textContent = "El nombre solo debe contener letras.";
    return;
  }

  // Validar correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) {
    mensaje.textContent = "El correo no es válido.";
    return;
  }

  // Validar contraseña (mínimo 6 caracteres)
  if (password.length < 6) {
    mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  // Si todo está correcto
  mensaje.style.color = "green";
  mensaje.textContent = "Formulario enviado correctamente ✅";
});