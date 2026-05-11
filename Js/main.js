// ============================================
// DATOS DE PRODUCTOS
// ============================================

const products = [
  {
    id: 1,
    type: 'baguette',
    title: 'Baguette Artesanal',
    description: 'Corteza crujiente, miga aireada — 280g',
    price: '$1.275',
    tags: ['Tradicional', 'Horno diario'],
    image: 'Images/baguette.jpg'
  },
  {
    id: 2,
    type: 'croissant',
    title: 'Croissant Dorado',
    description: 'Mantequilla pura, laminado clásico — por unidad',
    price: '$1.700',
    tags: ['Mantequilla', 'Hojaldre'],
    image: 'Images/crossaint.jpg'
  },
  {
    id: 3,
    type: 'integral',
    title: 'Pan Integral',
    description: 'Harinas integrales, sabor profundo — 500g',
    price: '$2.720',
    tags: ['Saludable', 'Fibra'],
    image: 'Images/pan_integral (2).jpg'
  },
  {
    id: 4,
    type: 'dulces',
    title: 'Tartaletas y Dulces',
    description: 'Selección diaria: tartaletas, napolitanas y más',
    price: '$2.125',
    tags: ['Repostería', 'Para compartir'],
    image: 'Images/tarta.jpg'
  },
  {
    id: 5,
    type: 'baguette',
    title: 'Baguette Integral',
    description: 'Combinación de trigo integral y harina blanca — 350g',
    price: '$1.700',
    tags: ['Nutritivo', 'Mezcla'],
    image: 'Images/crossaint_integral.jpg'
  },
  {
    id: 6,
    type: 'croissant',
    title: 'Croissant de Chocolate',
    description: 'Hojaldre relleno de chocolate belga — por unidad',
    price: '$2.125',
    tags: ['Chocolate', 'Premium'],
    image: 'Images/crossaint.jpg'
  },
  {
    id: 7,
    type: 'dulces',
    title: 'Medialunas',
    description: 'Medialunas de mantequilla crujientes — 2 unidades',
    price: '$1.530',
    tags: ['Clásico', 'Desayuno'],
    image: 'Images/medialuna.jpg'
  },
  {
    id: 8,
    type: 'integral',
    title: 'Pan de Centeno',
    description: 'Rico en fibra, sabor intenso — 450g',
    price: '$2.975',
    tags: ['Europeo', 'Saludable'],
    image: 'Images/pan_de_centeno.jpg'
  }
];

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const filterSelect = document.getElementById('filterType');
const resetButton = document.getElementById('resetFilters');
const productsGrid = document.getElementById('productsGrid');
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const locateBtn = document.getElementById('locateBtn');
const themeToggle = document.getElementById('themeToggle');

// ============================================
// SISTEMA DE TEMAS (MODO OSCURO)
// ============================================

/**
 * Inicializa el sistema de temas
 */
function initTheme() {
  // Obtener el tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Aplicar tema
  applyTheme(theme);
  
  // Listener para cambios en preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Aplica el tema a la página
 * @param {string} theme - 'light' o 'dark'
 */
function applyTheme(theme) {
  const html = document.documentElement;
  
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    updateThemeToggleIcon('dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    updateThemeToggleIcon('light');
  }
}

/**
 * Actualiza el icono del botón toggle
 * @param {string} theme - 'light' o 'dark'
 */
function updateThemeToggleIcon(theme) {
  if (!themeToggle) return;
  
  const svg = themeToggle.querySelector('svg');
  
  if (theme === 'dark') {
    // Mostrar icono de luna (para cambiar a claro)
    svg.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    `;
    themeToggle.setAttribute('title', 'Cambiar a modo claro');
  } else {
    // Mostrar icono de sol (para cambiar a oscuro)
    svg.innerHTML = `
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
    themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
  }
}

/**
 * Toggle entre temas
 */
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Event listener para el botón toggle
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Renderiza los productos en el grid
 * @param {Array} productsToRender - Array de productos a mostrar
 */
function renderProducts(productsToRender) {
  productsGrid.innerHTML = '';
  
  if (productsToRender.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <p style="color: var(--text-light); font-size: 16px;">No hay productos disponibles en esta categoría.</p>
      </div>
    `;
    return;
  }

  productsToRender.forEach((product, index) => {
    const productCard = document.createElement('article');
    productCard.className = 'card';
    productCard.setAttribute('role', 'listitem');
    productCard.setAttribute('data-type', product.type);
    productCard.style.animation = `fadeIn 0.6s ease-out ${0.1 * index}s both`;
    
    const tagsHTML = product.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    productCard.innerHTML = `
      <div class="card-media">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          width="400" 
          height="300" 
          loading="lazy">
        <span class="badge-type">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          ${product.type.charAt(0).toUpperCase() + product.type.slice(1)}
        </span>
        <span class="price-badge">${product.price}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${product.title}</div>
        <div class="card-meta">${product.description}</div>
        <div class="card-tags">
          ${tagsHTML}
        </div>
      </div>
    `;

    // Agregar animación de click
    productCard.addEventListener('click', () => {
      productCard.style.transform = 'scale(0.98)';
      setTimeout(() => {
        productCard.style.transform = '';
      }, 200);
    });

    productsGrid.appendChild(productCard);
  });
}

/**
 * Filtra productos por tipo
 */
function filterProducts() {
  const selectedType = filterSelect.value;
  let filtered = products;

  if (selectedType !== 'all') {
    filtered = products.filter(product => product.type === selectedType);
  }

  renderProducts(filtered);
}

/**
 * Reinicia los filtros
 */
function resetFilters() {
  filterSelect.value = 'all';
  renderProducts(products);
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el sistema de temas
  initTheme();
  
  // Renderizar todos los productos inicialmente
  renderProducts(products);
  
  // Inicializar formulario de contacto
  inicializarFormularioContacto();
  
  // Inicializar autenticación
  inicializarAutenticacion();
  
  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Añadir efecto de entrada a elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
});

// ============================================
// EFECTOS DE SCROLL
// ============================================

// Efecto parallax simple cuando se hace scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage) {
    // Limitar el movimiento parallax para que no baje demasiado
    const maxScroll = window.innerHeight * 0.5;
    const limitedScroll = Math.min(scrolled, maxScroll);
    heroImage.style.transform = `translateY(${limitedScroll * 0.1}px)`;
  }
});

// ============================================
// FUNCIONES ADICIONALES
// ============================================

// ============================================
// SISTEMA DE GESTIÓN DE CONTACTOS
// ============================================

/**
 * Estructura de datos para usuarios/contactos
 */
const Usuario = {
  /**
   * Crear un nuevo usuario/contacto
   * @param {string} nombre - Nombre del usuario
   * @param {string} email - Email del usuario
   * @param {string} mensaje - Mensaje del usuario
   * @returns {Object} Objeto usuario validado
   */
  crear: function(nombre, email, mensaje) {
    // Sanitización de entrada para evitar XSS
    return {
      id: Date.now(),
      nombre: this.sanitizarEntrada(nombre),
      email: this.sanitizarEntrada(email),
      mensaje: this.sanitizarEntrada(mensaje),
      fecha: new Date().toLocaleDateString('es-ES'),
      hora: new Date().toLocaleTimeString('es-ES')
    };
  },
  
  /**
   * Sanitizar entrada de usuario para evitar inyección XSS
   * @param {string} entrada - Texto a sanitizar
   * @returns {string} Texto sanitizado
   */
  sanitizarEntrada: function(entrada) {
    const div = document.createElement('div');
    div.textContent = entrada;
    return div.innerHTML;
  }
};

/**
 * Array para almacenar la lista de contactos
 */
let contactosRegistrados = [];

/**
 * Cargar contactos del localStorage al iniciar
 */
function cargarContactosGuardados() {
  const contactosGuardados = localStorage.getItem('contactosRicopan');
  if (contactosGuardados) {
    try {
      contactosRegistrados = JSON.parse(contactosGuardados);
      if (contactosRegistrados.length > 0) {
        actualizarDOM();
      }
    } catch (error) {
      console.error('Error al cargar contactos guardados:', error);
      contactosRegistrados = [];
    }
  }
}

/**
 * Validación de datos del formulario
 * @param {Object} datos - Objeto con nombre, email y mensaje
 * @returns {Object} Objeto con validación y errores
 */
function validarDatos(datos) {
  const errores = {};
  
  // Validar nombre
  if (!datos.nombre || datos.nombre.trim().length === 0) {
    errores.nombre = 'El nombre es requerido';
  } else if (datos.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  } else if (datos.nombre.trim().length > 100) {
    errores.nombre = 'El nombre no puede exceder 100 caracteres';
  }
  
  // Validar email con regex más robusta
  if (!datos.email || datos.email.trim().length === 0) {
    errores.email = 'El email es requerido';
  } else {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(datos.email.trim())) {
      errores.email = 'Por favor ingresa un email válido (ej: usuario@ejemplo.com)';
    } else if (datos.email.length > 254) {
      errores.email = 'El email es demasiado largo';
    }
  }
  
  // Validar mensaje
  if (!datos.mensaje || datos.mensaje.trim().length === 0) {
    errores.mensaje = 'El mensaje es requerido';
  } else if (datos.mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  } else if (datos.mensaje.trim().length > 500) {
    errores.mensaje = 'El mensaje no puede exceder 500 caracteres';
  }
  
  return {
    valido: Object.keys(errores).length === 0,
    errores: errores
  };
}

/**
 * Mostrar errores de validación en el DOM
 * @param {Object} errores - Objeto con errores de validación
 */
function mostrarErrores(errores) {
  // Limpiar todos los errores primero
  document.getElementById('nombreError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('mensajeError').textContent = '';
  
  // Mostrar errores específicos
  if (errores.nombre) {
    document.getElementById('nombreError').textContent = errores.nombre;
  }
  if (errores.email) {
    document.getElementById('emailError').textContent = errores.email;
  }
  if (errores.mensaje) {
    document.getElementById('mensajeError').textContent = errores.mensaje;
  }
}

/**
 * Limpiar todos los errores del formulario
 */
function limpiarErrores() {
  document.getElementById('nombreError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('mensajeError').textContent = '';
}

/**
 * Actualizar el DOM con la lista de contactos
 */
function actualizarDOM() {
  const contactosList = document.getElementById('contactosList');
  const contactosUl = document.getElementById('contactosUl');
  
  if (contactosRegistrados.length === 0) {
    contactosList.style.display = 'none';
    contactosUl.innerHTML = '';
    return;
  }
  
  contactosList.style.display = 'block';
  contactosUl.innerHTML = '';
  
  // Mostrar los últimos 5 contactos (más recientes primero)
  const contactosMostrados = contactosRegistrados.slice(-5).reverse();
  
  contactosMostrados.forEach((contacto, index) => {
    const li = document.createElement('li');
    li.style.padding = '12px';
    li.style.marginBottom = '8px';
    li.style.backgroundColor = 'var(--bg-alt)';
    li.style.borderRadius = '8px';
    li.style.borderLeft = '4px solid var(--primary)';
    li.style.wordBreak = 'break-word';
    
    const nombreSpan = document.createElement('strong');
    nombreSpan.textContent = contacto.nombre;
    
    const emailSpan = document.createElement('span');
    emailSpan.textContent = ` (${contacto.email})`;
    emailSpan.style.color = 'var(--text-light)';
    emailSpan.style.fontSize = '0.9em';
    
    const fechaSpan = document.createElement('div');
    fechaSpan.textContent = `${contacto.fecha} ${contacto.hora}`;
    fechaSpan.style.fontSize = '0.85em';
    fechaSpan.style.color = 'var(--text-light)';
    fechaSpan.style.marginTop = '4px';
    
    const mensajeSpan = document.createElement('div');
    mensajeSpan.textContent = contacto.mensaje;
    mensajeSpan.style.marginTop = '6px';
    mensajeSpan.style.fontSize = '0.95em';
    
    li.appendChild(nombreSpan);
    li.appendChild(emailSpan);
    li.appendChild(fechaSpan);
    li.appendChild(mensajeSpan);
    
    contactosUl.appendChild(li);
  });
}

/**
 * Cambiar imagen (función modular adicional)
 * @param {string} id - ID del elemento
 * @param {string} src - Nueva URL de la imagen
 */
function cambiarImagen(id, src) {
  const elemento = document.getElementById(id);
  if (elemento && elemento.tagName === 'IMG') {
    elemento.src = src;
    elemento.style.opacity = '0.7';
    setTimeout(() => {
      elemento.style.opacity = '1';
      elemento.style.transition = 'opacity 0.3s ease-in-out';
    }, 10);
  }
}

/**
 * Guardar contactos en localStorage
 */
function guardarContactosEnStorage() {
  try {
    localStorage.setItem('contactosRicopan', JSON.stringify(contactosRegistrados));
  } catch (error) {
    console.error('Error al guardar contactos:', error);
  }
}

/**
 * Manejar el envío del formulario de contacto
 */
function inicializarFormularioContacto() {
  const formularioContacto = document.getElementById('contactForm');
  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputMensaje = document.getElementById('mensaje');
  const charCount = document.getElementById('charCount');
  const formMsg = document.getElementById('formMsg');
  
  // Cargar contactos guardados
  cargarContactosGuardados();
  
  // Actualizar contador de caracteres en tiempo real
  if (inputMensaje) {
    inputMensaje.addEventListener('input', function() {
      charCount.textContent = this.value.length;
    });
  }
  
  // Manejar envío del formulario
  if (formularioContacto) {
    formularioContacto.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Limpiar errores previos
      limpiarErrores();
      formMsg.textContent = '';
      formMsg.className = '';
      
      // Obtener datos del formulario
      const datos = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        mensaje: inputMensaje.value
      };
      
      // Validar datos
      const validacion = validarDatos(datos);
      
      if (!validacion.valido) {
        mostrarErrores(validacion.errores);
        formMsg.textContent = '❌ Por favor completa correctamente todos los campos';
        formMsg.className = 'form-message error';
        return;
      }
      
      // Crear usuario y agregarlo al array
      const nuevoContacto = Usuario.crear(datos.nombre, datos.email, datos.mensaje);
      contactosRegistrados.push(nuevoContacto);
      
      // Guardar en localStorage
      guardarContactosEnStorage();
      
      // Actualizar DOM
      actualizarDOM();
      
      // Mostrar mensaje de éxito
      formMsg.textContent = '✅ ¡Mensaje enviado correctamente! Nos contactaremos pronto.';
      formMsg.className = 'form-message success';
      
      // Limpiar formulario
      formularioContacto.reset();
      charCount.textContent = '0';
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        formMsg.textContent = '';
        formMsg.className = '';
      }, 5000);
    });
  }
}

// ============================================
// SISTEMA DE AUTENTICACIÓN
// ============================================

/**
 * Estructura de datos para Usuario (Login/Registro)
 */
const UsuarioAuth = {
  /**
   * Crear un nuevo usuario
   * @param {string} username - Nombre de usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña (se almacena en texto por simplicidad, en producción usar hash)
   * @returns {Object} Objeto usuario
   */
  crear: function(username, email, password) {
    return {
      id: Date.now(),
      username: this.sanitizarEntrada(username),
      email: this.sanitizarEntrada(email),
      password: password, // En producción, usar bcrypt o similar
      fechaRegistro: new Date().toLocaleDateString('es-ES'),
      activo: true
    };
  },
  
  /**
   * Sanitizar entrada de usuario
   * @param {string} entrada - Texto a sanitizar
   * @returns {string} Texto sanitizado
   */
  sanitizarEntrada: function(entrada) {
    const div = document.createElement('div');
    div.textContent = entrada;
    return div.innerHTML;
  }
};

/**
 * Array para almacenar usuarios registrados
 */
let usuariosRegistrados = [];

/**
 * Variable para almacenar el usuario actualmente logueado
 */
let usuarioActual = null;

/**
 * Cargar usuarios del localStorage al iniciar
 */
function cargarUsuariosGuardados() {
  const usuariosGuardados = localStorage.getItem('usuariosRicopan');
  if (usuariosGuardados) {
    try {
      usuariosRegistrados = JSON.parse(usuariosGuardados);
    } catch (error) {
      console.error('Error al cargar usuarios guardados:', error);
      usuariosRegistrados = [];
    }
  }
  
  // Verificar si hay sesión activa
  const sesionActiva = localStorage.getItem('sesionActiva');
  if (sesionActiva) {
    try {
      usuarioActual = JSON.parse(sesionActiva);
      actualizarBotonesAutenticacion();
    } catch (error) {
      console.error('Error al cargar sesión:', error);
      usuarioActual = null;
    }
  }
}

/**
 * Guardar usuarios en localStorage
 */
function guardarUsuariosEnStorage() {
  try {
    localStorage.setItem('usuariosRicopan', JSON.stringify(usuariosRegistrados));
  } catch (error) {
    console.error('Error al guardar usuarios:', error);
  }
}

/**
 * Guardar sesión actual
 */
function guardarSesion(usuario) {
  try {
    localStorage.setItem('sesionActiva', JSON.stringify(usuario));
  } catch (error) {
    console.error('Error al guardar sesión:', error);
  }
}

/**
 * Validar datos de registro
 * @param {Object} datos - Datos del usuario
 * @returns {Object} Validación y errores
 */
function validarRegistro(datos) {
  const errores = {};
  
  // Validar nombre de usuario
  if (!datos.username || datos.username.length === 0) {
    errores.username = 'El nombre de usuario es requerido';
  } else if (datos.username.length < 3) {
    errores.username = 'El nombre de usuario debe tener al menos 3 caracteres';
  } else if (datos.username.length > 50) {
    errores.username = 'El nombre de usuario no puede exceder 50 caracteres';
  } else if (!/^[a-zA-Z0-9_-]+$/.test(datos.username)) {
    errores.username = 'Solo se permiten letras, números, guiones y guiones bajos';
  } else if (usuariosRegistrados.some(u => u.username.toLowerCase() === datos.username.toLowerCase())) {
    errores.username = 'Este nombre de usuario ya está registrado';
  }
  
  // Validar email
  if (!datos.email || datos.email.length === 0) {
    errores.email = 'El email es requerido';
  } else {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(datos.email)) {
      errores.email = 'Por favor ingresa un email válido (ej: usuario@ejemplo.com)';
    } else if (usuariosRegistrados.some(u => u.email.toLowerCase() === datos.email.toLowerCase())) {
      errores.email = 'Este email ya está registrado';
    }
  }
  
  // Validar contraseña
  if (!datos.password || datos.password.length === 0) {
    errores.password = 'La contraseña es requerida';
  } else if (datos.password.length < 8) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres';
  } else if (datos.password.length > 128) {
    errores.password = 'La contraseña no puede exceder 128 caracteres';
  } else if (!/(?=.*[a-z])/.test(datos.password)) {
    errores.password = 'Debe contener al menos una letra minúscula (a-z)';
  } else if (!/(?=.*[A-Z])/.test(datos.password)) {
    errores.password = 'Debe contener al menos una letra mayúscula (A-Z)';
  } else if (!/(?=.*\d)/.test(datos.password)) {
    errores.password = 'Debe contener al menos un número (0-9)';
  }
  
  // Validar confirmación de contraseña
  if (!datos.passwordConfirm || datos.passwordConfirm.length === 0) {
    errores.passwordConfirm = 'Debe confirmar la contraseña';
  } else if (datos.password !== datos.passwordConfirm) {
    errores.passwordConfirm = 'Las contraseñas no coinciden';
  }
  
  return {
    valido: Object.keys(errores).length === 0,
    errores: errores
  };
}

/**
 * Validar datos de login
 * @param {Object} datos - Email y contraseña
 * @returns {Object} Validación y errores
 */
function validarLogin(datos) {
  const errores = {};
  
  if (!datos.email || datos.email.trim().length === 0) {
    errores.email = 'El email es requerido';
  } else {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(datos.email.trim())) {
      errores.email = 'Por favor ingresa un email válido';
    }
  }
  
  if (!datos.password || datos.password.length === 0) {
    errores.password = 'La contraseña es requerida';
  }
  
  return {
    valido: Object.keys(errores).length === 0,
    errores: errores
  };
}

/**
 * Mostrar errores de registro
 * @param {Object} errores - Errores de validación
 */
function mostrarErroresRegistro(errores) {
  document.getElementById('registerUsernameError').textContent = errores.username || '';
  document.getElementById('registerEmailError').textContent = errores.email || '';
  document.getElementById('registerPasswordError').textContent = errores.password || '';
  document.getElementById('registerPasswordConfirmError').textContent = errores.passwordConfirm || '';
}

/**
 * Mostrar errores de login
 * @param {Object} errores - Errores de validación
 */
function mostrarErroresLogin(errores) {
  document.getElementById('loginEmailError').textContent = errores.email || '';
  document.getElementById('loginPasswordError').textContent = errores.password || '';
}

/**
 * Limpiar errores de registro
 */
function limpiarErroresRegistro() {
  document.getElementById('registerUsernameError').textContent = '';
  document.getElementById('registerEmailError').textContent = '';
  document.getElementById('registerPasswordError').textContent = '';
  document.getElementById('registerPasswordConfirmError').textContent = '';
}

/**
 * Limpiar errores de login
 */
function limpiarErroresLogin() {
  document.getElementById('loginEmailError').textContent = '';
  document.getElementById('loginPasswordError').textContent = '';
}

/**
 * Actualizar botones de autenticación
 */
function actualizarBotonesAutenticacion() {
  const authButton = document.getElementById('authButton');
  
  if (usuarioActual) {
    authButton.textContent = `Hola, ${usuarioActual.username}`;
    authButton.style.backgroundColor = 'var(--primary)';
    authButton.onclick = function(e) {
      e.preventDefault();
      cerrarSesion();
    };
  } else {
    authButton.textContent = 'Ingresar';
    authButton.style.backgroundColor = '';
    authButton.onclick = null;
  }
}

/**
 * Cerrar sesión
 */
function cerrarSesion() {
  usuarioActual = null;
  localStorage.removeItem('sesionActiva');
  actualizarBotonesAutenticacion();
  cerrarModal();
  alert('✅ Sesión cerrada correctamente');
}

/**
 * Abrir modal de autenticación
 */
function abrirModal() {
  const authModal = document.getElementById('authModal');
  authModal.classList.add('active');
}

/**
 * Cerrar modal de autenticación
 */
function cerrarModal() {
  const authModal = document.getElementById('authModal');
  authModal.classList.remove('active');
}

/**
 * Manejar eventos de autenticación
 */
function inicializarAutenticacion() {
  cargarUsuariosGuardados();
  
  // Elementos del modal
  const authModal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const authButton = document.getElementById('authButton');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  // Verificar que existan los elementos
  if (!authModal || !loginForm || !registerForm) {
    console.error('No se encontraron los elementos del modal de autenticación');
    return;
  }
  
  // Abrir modal
  if (authButton) {
    authButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (usuarioActual) {
        cerrarSesion();
      } else {
        abrirModal();
      }
    });
  }
  
  // Cerrar modal
  if (closeModal) {
    closeModal.addEventListener('click', cerrarModal);
  }
  
  // Cerrar modal al hacer clic fuera del contenido
  authModal.addEventListener('click', function(e) {
    if (e.target === authModal) {
      cerrarModal();
    }
  });
  
  // Cambiar entre tabs (Login/Registro)
  if (loginTab && registerTab) {
    loginTab.addEventListener('click', function() {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
      limpiarErroresLogin();
      limpiarErroresRegistro();
    });
    
    registerTab.addEventListener('click', function() {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
      limpiarErroresLogin();
      limpiarErroresRegistro();
    });
  }
  
  // ========== MANEJO DE FORMULARIO DE LOGIN ==========
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
      limpiarErroresLogin();
      const loginMsg = document.getElementById('loginMsg');
      
      // Verificar que los elementos existan
      const loginEmailEl = document.getElementById('loginEmail');
      const loginPasswordEl = document.getElementById('loginPassword');
      
      if (!loginEmailEl || !loginPasswordEl) {
        console.error('No se encontraron los elementos del formulario de login');
        loginMsg.textContent = '❌ Error: No se encontraron los campos del formulario';
        loginMsg.className = 'form-message error';
        return;
      }
      
      loginMsg.textContent = '';
      loginMsg.className = '';
      
      const datos = {
        email: loginEmailEl.value.trim(),
        password: loginPasswordEl.value
      };
      
      console.log('Datos de login:', datos);
      
      const validacion = validarLogin(datos);
      
      if (!validacion.valido) {
        mostrarErroresLogin(validacion.errores);
        loginMsg.textContent = '❌ Por favor completa todos los campos';
        loginMsg.className = 'form-message error';
        return;
      }
      
      // Buscar usuario
      const usuarioEncontrado = usuariosRegistrados.find(u => 
        u.email.toLowerCase() === datos.email.toLowerCase() && u.password === datos.password
      );
      
      if (usuarioEncontrado) {
        usuarioActual = usuarioEncontrado;
        guardarSesion(usuarioActual);
        actualizarBotonesAutenticacion();
        
        loginMsg.textContent = `✅ ¡Bienvenido, ${usuarioActual.username}!`;
        loginMsg.className = 'form-message success';
        
        loginForm.reset();
        
        setTimeout(() => {
          cerrarModal();
        }, 1500);
      } else {
        console.log('Usuario no encontrado o contraseña incorrecta');
        document.getElementById('loginPasswordError').textContent = 'Email o contraseña incorrectos';
        loginMsg.textContent = '❌ Credenciales inválidas';
        loginMsg.className = 'form-message error';
      }
    } catch (error) {
      console.error('Error en login:', error);
      const loginMsg = document.getElementById('loginMsg');
      loginMsg.textContent = '❌ Error al procesar el login: ' + error.message;
      loginMsg.className = 'form-message error';
    }
  });
  
  // ========== MANEJO DE FORMULARIO DE REGISTRO ==========
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
      limpiarErroresRegistro();
      const registerMsg = document.getElementById('registerMsg');
      
      // Verificar que los elementos existan
      const regUsername = document.getElementById('registerUsername');
      const regEmail = document.getElementById('registerEmail');
      const regPassword = document.getElementById('registerPassword');
      const regPasswordConfirm = document.getElementById('registerPasswordConfirm');
      
      if (!regUsername || !regEmail || !regPassword || !regPasswordConfirm) {
        console.error('No se encontraron los elementos del formulario');
        registerMsg.textContent = '❌ Error: No se encontraron los campos del formulario';
        registerMsg.className = 'form-message error';
        return;
      }
      
      registerMsg.textContent = '';
      registerMsg.className = '';
      
      const datos = {
        username: regUsername.value.trim(),
        email: regEmail.value.trim(),
        password: regPassword.value,
        passwordConfirm: regPasswordConfirm.value
      };
      
      console.log('Datos de registro:', datos);
      
      const validacion = validarRegistro(datos);
      
      console.log('Validación:', validacion);
      
      if (!validacion.valido) {
        mostrarErroresRegistro(validacion.errores);
        registerMsg.textContent = '❌ Por favor completa correctamente todos los campos';
        registerMsg.className = 'form-message error';
        return;
      }
      
      // Crear nuevo usuario
      const nuevoUsuario = UsuarioAuth.crear(datos.username, datos.email, datos.password);
      usuariosRegistrados.push(nuevoUsuario);
      
      console.log('Usuario creado:', nuevoUsuario);
      
      // Guardar en localStorage
      guardarUsuariosEnStorage();
      
      // Mostrar mensaje de éxito
      registerMsg.textContent = '✅ ¡Cuenta creada exitosamente! Inicia sesión para continuar.';
      registerMsg.className = 'form-message success';
      
      registerForm.reset();
      
      // Cambiar a tab de login
      setTimeout(() => {
        loginTab.click();
      }, 2000);
    } catch (error) {
      console.error('Error en registro:', error);
      const registerMsg = document.getElementById('registerMsg');
      registerMsg.textContent = '❌ Error al procesar el registro: ' + error.message;
      registerMsg.className = 'form-message error';
    }
  });
}
