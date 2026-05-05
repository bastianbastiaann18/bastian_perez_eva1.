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
// ELEMENTOS DEL DOM - AUTENTICACIÓN
// ============================================

const authModal = document.getElementById('authModal');
const authButton = document.getElementById('authButton');
const closeModal = document.getElementById('closeModal');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginMsg = document.getElementById('loginMsg');
const registerMsg = document.getElementById('registerMsg');
const charCount = document.getElementById('charCount');
const mensajeField = document.getElementById('mensaje');

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

/**
 * Valida que un email tenga formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida que una contraseña tenga al menos 8 caracteres
 * @param {string} password - Contraseña a validar
 * @returns {boolean} True si es válido
 */
function isValidPassword(password) {
  return password.length >= 8;
}

/**
 * Muestra un error en un campo específico
 * @param {string} fieldId - ID del campo
 * @param {string} errorId - ID del elemento de error
 * @param {string} message - Mensaje de error
 */
function showFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(errorId);
  
  if (field) field.classList.add('input-error');
  if (errorElement) errorElement.textContent = message;
}

/**
 * Limpia el error de un campo
 * @param {string} fieldId - ID del campo
 * @param {string} errorId - ID del elemento de error
 */
function clearFieldError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(errorId);
  
  if (field) field.classList.remove('input-error');
  if (errorElement) errorElement.textContent = '';
}

// ============================================
// MANEJADORES DE FORMULARIOS DE AUTENTICACIÓN
// ============================================

/**
 * Abre el modal de autenticación
 */
function openAuthModal() {
  authModal.style.display = 'flex';
  authModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de autenticación
 */
function closeAuthModal() {
  authModal.style.display = 'none';
  authModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  clearAllAuthErrors();
  clearAuthMessages();
}

/**
 * Limpia todos los errores del modal
 */
function clearAllAuthErrors() {
  document.querySelectorAll('.input-error').forEach(field => {
    field.classList.remove('input-error');
  });
  document.querySelectorAll('.error-message').forEach(error => {
    error.textContent = '';
  });
}

/**
 * Limpia los mensajes de éxito/error
 */
function clearAuthMessages() {
  loginMsg.className = 'form-message';
  registerMsg.className = 'form-message';
  loginMsg.textContent = '';
  registerMsg.textContent = '';
}

/**
 * Cambia la pestaña de autenticación
 * @param {string} tab - 'login' o 'register'
 */
function switchAuthTab(tab) {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(t => t.classList.remove('active'));
  forms.forEach(f => f.classList.remove('active'));
  
  if (tab === 'login') {
    loginTab.classList.add('active');
    loginForm.classList.add('active');
  } else {
    registerTab.classList.add('active');
    registerForm.classList.add('active');
  }
  
  clearAllAuthErrors();
  clearAuthMessages();
}

/**
 * Maneja el envío del formulario de login
 */
function handleLoginSubmit(event) {
  event.preventDefault();
  clearAllAuthErrors();
  clearAuthMessages();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  let isValid = true;

  // Validar email
  if (!email) {
    showFieldError('loginEmail', 'loginEmailError', 'El email es obligatorio');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError('loginEmail', 'loginEmailError', 'Por favor ingresa un email válido');
    isValid = false;
  } else {
    clearFieldError('loginEmail', 'loginEmailError');
  }

  // Validar contraseña
  if (!password) {
    showFieldError('loginPassword', 'loginPasswordError', 'La contraseña es obligatoria');
    isValid = false;
  } else {
    clearFieldError('loginPassword', 'loginPasswordError');
  }

  if (!isValid) return;

  // Mostrar mensaje de éxito
  loginMsg.className = 'form-message success';
  loginMsg.textContent = `¡Bienvenido ${email}! Acceso exitoso.`;
  
  console.log({
    action: 'login',
    email,
    timestamp: new Date().toISOString()
  });

  loginForm.reset();
  
  setTimeout(() => {
    closeAuthModal();
  }, 2000);
}

/**
 * Maneja el envío del formulario de registro
 */
function handleRegisterSubmit(event) {
  event.preventDefault();
  clearAllAuthErrors();
  clearAuthMessages();
  
  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const passwordConfirm = document.getElementById('registerPasswordConfirm').value.trim();
  let isValid = true;

  // Validar usuario
  if (!username) {
    showFieldError('registerUsername', 'registerUsernameError', 'El usuario es obligatorio');
    isValid = false;
  } else if (username.length < 3) {
    showFieldError('registerUsername', 'registerUsernameError', 'El usuario debe tener al menos 3 caracteres');
    isValid = false;
  } else {
    clearFieldError('registerUsername', 'registerUsernameError');
  }

  // Validar email
  if (!email) {
    showFieldError('registerEmail', 'registerEmailError', 'El email es obligatorio');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError('registerEmail', 'registerEmailError', 'Por favor ingresa un email válido');
    isValid = false;
  } else {
    clearFieldError('registerEmail', 'registerEmailError');
  }

  // Validar contraseña
  if (!password) {
    showFieldError('registerPassword', 'registerPasswordError', 'La contraseña es obligatoria');
    isValid = false;
  } else if (!isValidPassword(password)) {
    showFieldError('registerPassword', 'registerPasswordError', 'La contraseña debe tener al menos 8 caracteres');
    isValid = false;
  } else {
    clearFieldError('registerPassword', 'registerPasswordError');
  }

  // Validar confirmación de contraseña
  if (!passwordConfirm) {
    showFieldError('registerPasswordConfirm', 'registerPasswordConfirmError', 'Confirma tu contraseña');
    isValid = false;
  } else if (password !== passwordConfirm) {
    showFieldError('registerPasswordConfirm', 'registerPasswordConfirmError', 'Las contraseñas no coinciden');
    isValid = false;
  } else {
    clearFieldError('registerPasswordConfirm', 'registerPasswordConfirmError');
  }

  if (!isValid) return;

  // Mostrar mensaje de éxito
  registerMsg.className = 'form-message success';
  registerMsg.textContent = `¡Bienvenido ${username}! Registro exitoso.`;
  
  console.log({
    action: 'register',
    username,
    email,
    timestamp: new Date().toISOString()
  });

  registerForm.reset();
  
  setTimeout(() => {
    closeAuthModal();
  }, 2000);
}

/**
 * Maneja el envío del formulario de contacto
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const asunto = document.getElementById('asunto').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  let isValid = true;

  // Limpiar errores previos
  clearFieldError('nombre', 'nombreError');
  clearFieldError('asunto', 'asuntoError');
  clearFieldError('mensaje', 'mensajeError');

  // Validación de nombre
  if (!nombre) {
    showFieldError('nombre', 'nombreError', 'El nombre es obligatorio');
    isValid = false;
  }

  // Validación de asunto
  if (!asunto) {
    showFieldError('asunto', 'asuntoError', 'El asunto es obligatorio');
    isValid = false;
  }

  // Validación de mensaje
  if (!mensaje) {
    showFieldError('mensaje', 'mensajeError', 'El mensaje es obligatorio');
    isValid = false;
  }

  if (!isValid) {
    showMessage('Por favor completa todos los campos correctamente.', 'error');
    return;
  }

  // Mostrar mensaje de éxito
  showMessage('¡Gracias por tu pedido! Nos contactaremos pronto.', 'success');
  
  console.log({
    nombre,
    asunto,
    mensaje,
    timestamp: new Date().toISOString()
  });

  // Limpiar formulario
  contactForm.reset();
  charCount.textContent = '0';
  
  // Desvanecerá el mensaje después de 5 segundos
  setTimeout(() => {
    hideMessage();
  }, 5000);
}

/**
 * Muestra un mensaje en el formulario
 */
function showMessage(text, type) {
  formMsg.textContent = text;
  formMsg.className = `form-message ${type}`;
}

/**
 * Oculta el mensaje del formulario
 */
function hideMessage() {
  formMsg.className = 'form-message';
}

/**
 * Abre la ubicación en Google Maps
 */
function locate() {
  const latitude = -33.4489;
  const longitude = -70.6693;
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapsUrl, '_blank');
}

/**
 * Maneja el menú hamburguesa
 */
function toggleMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

/**
 * Cierra el menú cuando se hace clic en un enlace
 */
function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Autenticación
authButton.addEventListener('click', openAuthModal);
closeModal.addEventListener('click', closeAuthModal);
loginTab.addEventListener('click', () => switchAuthTab('login'));
registerTab.addEventListener('click', () => switchAuthTab('register'));
loginForm.addEventListener('submit', handleLoginSubmit);
registerForm.addEventListener('submit', handleRegisterSubmit);

// Cerrar modal al hacer clic fuera
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    closeAuthModal();
  }
});

// Contador de caracteres
if (mensajeField) {
  mensajeField.addEventListener('input', (e) => {
    charCount.textContent = e.target.value.length;
  });
}

// Filtro de productos
filterSelect.addEventListener('change', filterProducts);
resetButton.addEventListener('click', resetFilters);

// Formulario de contacto
contactForm.addEventListener('submit', handleFormSubmit);
locateBtn.addEventListener('click', locate);

// Menú hamburguesa (para dispositivos móviles)
hamburger.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el sistema de temas
  initTheme();
  
  // Renderizar todos los productos inicialmente
  renderProducts(products);
  
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

/**
 * Función para detectar tema oscuro preferido del sistema
 */
initTheme();
