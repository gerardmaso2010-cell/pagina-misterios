// ===== VARIABLES GLOBALES =====
let currentSection = 'cases';
let sessionStartTime = Date.now();
let investigationProgress = {
    casesSolved: 0,
    evidenceFound: 0,
    experienceLevel: 1
};

let secretAccessAttempts = 0;
let matrixEffectActive = true;
let introCompleted = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Cargar progreso guardado al iniciar
    loadSavedProgress();
    
    if (!introCompleted) {
        startIntroSequence();
    } else {
        initializeApp();
    }
});

// ===== INTRO SEQUENCE =====
function startIntroSequence() {
    console.log('🚨 INICIANDO SECUENCIA DE INTRO');
    console.log('🔒 SISTEMA DE SEGURIDAD NACIONAL');
    console.log('🚨 NIVEL DE AMENAZA: CRÍTICO');
    
    // Mostrar intro screen
    document.getElementById('introScreen').style.display = 'flex';
    document.getElementById('mainContainer').style.display = 'none';
    
    // Crear efecto matrix para intro
    createIntroMatrixEffect();
}

function enterSystem() {
    console.log('🖱️ BOTÓN ENTER CLICKEADO - ACCEDIENDO AL SISTEMA');
    completeIntro();
}

function completeIntro() {
    console.log('✅ INTRO COMPLETADA - ACCESO AL SISTEMA');
    
    // Marcar intro como completada
    introCompleted = true;
    localStorage.setItem('introCompleted', 'true');
    
    // Efecto de transición
    const introScreen = document.getElementById('introScreen');
    introScreen.style.animation = 'fadeOut 1s ease-out forwards';
    
    setTimeout(() => {
        // Ocultar intro
        introScreen.style.display = 'none';
        
        // Mostrar sistema principal
        document.getElementById('mainContainer').style.display = 'flex';
        
        // Inicializar aplicación
        initializeApp();
        
        // Efecto de entrada
        document.getElementById('mainContainer').style.animation = 'fadeIn 1s ease-out';
        
        // Mostrar notificación de bienvenida
        showNotification('🔓 BIENVENIDO AL SISTEMA DE INVESTIGACIÓN CRIMINAL', 'success');
        
    }, 1000);
}

function createIntroMatrixEffect() {
    const introMatrixBg = document.getElementById('introMatrixBg');
    if (!introMatrixBg) return;
    
    // Crear efecto de lluvia de caracteres para intro
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 12;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawIntroMatrix() {
        const ctx = introMatrixBg.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, introMatrixBg.width, introMatrixBg.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > introMatrixBg.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Configurar canvas para intro
    function setupIntroCanvas() {
        introMatrixBg.width = window.innerWidth;
        introMatrixBg.height = window.innerHeight;
    }
    
    setupIntroCanvas();
    window.addEventListener('resize', setupIntroCanvas);
    
    // Iniciar animación de intro
    setInterval(drawIntroMatrix, 60);
}

function showIntroNotification(message, type = 'info') {
    // Crear notificación especial para intro
    const notification = document.createElement('div');
    notification.className = `intro-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Estilos de notificación de intro
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 20, 0, 0.95));
        border: 3px solid #00ff88;
        border-radius: 15px;
        padding: 20px 30px;
        color: #00ff88;
        font-family: 'Orbitron', monospace;
        font-weight: 700;
        z-index: 10000;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 50px rgba(0, 255, 136, 0.8);
        font-size: 1.2rem;
        text-align: center;
        animation: introNotificationIn 0.5s ease-out;
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'introNotificationOut 0.5s ease-out forwards';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// ===== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN =====
function initializeApp() {
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
    
    // Configurar navegación
    setupNavigation();
    
    // Configurar eventos de casos
    setupCaseEvents();
    
    // Mostrar sección inicial
    showSection('cases');
    
    // Iniciar timer de sesión
    startSessionTimer();
    
    // Crear efecto matrix principal
    createMatrixEffect();
    
    // Añadir easter eggs
    addEasterEggs();
    
    console.log('🔍 SISTEMA DE INVESTIGACIÓN CRIMINAL INICIADO');
    console.log('🚨 NIVEL DE SEGURIDAD: ALTO');
    console.log('👤 USUARIO: INVESTIGADOR');
}

// ===== SISTEMA DE NAVEGACIÓN =====
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            
            // Remover clase activa de todos los botones
            navButtons.forEach(b => b.classList.remove('active'));
            
            // Activar botón clickeado
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            showSection(section);
            
            // Efecto de sonido (simulado)
            playClickSound();
            
            // Actualizar progreso
            updateInvestigationProgress();
        });
    });
}

function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Efecto de entrada
        targetSection.style.animation = 'none';
        targetSection.offsetHeight; // Trigger reflow
        targetSection.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Actualizar título de la página
        updatePageTitle(sectionId);
    }
}

function updatePageTitle(sectionId) {
    const titles = {
        'cases': '📁 ARCHIVO DE CASOS',
        'evidence': '🔍 EVIDENCIAS RECOPILADAS',
        'suspects': '👤 PERFIL DE SOSPECHOSOS',
        'analysis': '📊 ANÁLISIS CRIMINAL'
    };
    
    document.title = `🔍 ${titles[sectionId] || 'CRÍMENES IMPERFECTOS'} - ZONA RESTRINGIDA`;
}

// ===== SISTEMA DE CASOS =====
function setupCaseEvents() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('case-btn')) return;
            
            const caseId = this.dataset.case;
            if (caseId === '4') {
                attemptAccess();
            } else {
                openCase(caseId);
            }
        });
        
        // Efecto hover avanzado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.boxShadow = '0 0 60px rgba(0, 255, 136, 0.8)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
        });
    });
}

function openCase(caseId) {
    const caseData = getCaseData(caseId);
    
    // Efecto de apertura
    const card = document.querySelector(`[data-case="${caseId}"]`);
    card.classList.add('glitch');
    
    // Simular proceso de investigación
    setTimeout(() => {
        card.classList.remove('glitch');
        showInvestigationProgress(caseId);
        
        // Marcar caso como investigado
        if (investigationProgress.casesSolved < 4) {
            investigationProgress.casesSolved++;
            updateProgressDisplay();
        }
        
        // Mostrar mensaje de éxito
        showNotification(`✅ CASO #${caseId.padStart(3, '0')} INVESTIGADO`, 'success');
        
    }, 1500);
}

function getCaseData(caseId) {
    const cases = {
        '1': {
            title: 'El Robo Perfecto',
            difficulty: 'FÁCIL',
            reward: '100 XP'
        },
        '2': {
            title: 'El Asesinato en la Mansión',
            difficulty: 'MEDIO',
            reward: '250 XP'
        },
        '3': {
            title: 'El Diamante Desaparecido',
            difficulty: 'DIFÍCIL',
            reward: '500 XP'
        }
    };
    
    return cases[caseId] || { title: 'Caso Desconocido', difficulty: '???', reward: '0 XP' };
}

// ===== SISTEMA DE ACCESO SECRETO =====
function attemptAccess() {
    secretAccessAttempts++;
    
    if (secretAccessAttempts >= 3) {
        showNotification('🚨 DEMASIADOS INTENTOS - ACCESO BLOQUEADO PERMANENTEMENTE', 'error');
        return;
    }
    
    document.getElementById('secretOverlay').style.display = 'block';
    
    // Efecto de advertencia
    const secretCase = document.querySelector('.secret-case');
    secretCase.style.animation = 'pulse 0.5s ease-in-out 3';
    
    setTimeout(() => {
        secretCase.style.animation = '';
    }, 1500);
}

function checkAccess() {
    const password = document.getElementById('accessPassword').value;
    const correctPassword = 'CRIMINAL2024';
    
    if (password === correctPassword) {
        unlockSecretCase();
    } else {
        showNotification('❌ CONTRASEÑA INCORRECTA', 'error');
        secretAccessAttempts++;
        
        if (secretAccessAttempts >= 3) {
            showNotification('🚨 ACCESO BLOQUEADO - DEMASIADOS INTENTOS', 'error');
            closeSecret();
        }
    }
}

function unlockSecretCase() {
    showNotification('🔓 ACCESO CONCEDIDO - CASO CLASIFICADO DESBLOQUEADO', 'success');
    
    // Cambiar apariencia del caso secreto
    const secretCase = document.querySelector('.secret-case');
    secretCase.style.background = 'linear-gradient(135deg, rgba(0, 255, 136, 0.4), rgba(0, 255, 170, 0.3))';
    secretCase.style.borderColor = '#00ff88';
    secretCase.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.8)';
    
    // Cambiar botón
    const btn = secretCase.querySelector('.case-btn');
    btn.textContent = 'ACCEDER';
    btn.classList.remove('locked');
    btn.onclick = () => openSecretCase();
    
    closeSecret();
}

function openSecretCase() {
    showNotification('🚨 CONTENIDO ULTRA SECRETO - ACCESO RESTRINGIDO', 'warning');
    
    // Simular contenido secreto
    setTimeout(() => {
        showNotification('🔍 DESCARGANDO ARCHIVOS CLASIFICADOS...', 'info');
        
        setTimeout(() => {
            showNotification('✅ ARCHIVOS DESCARGADOS - CASO RESUELTO', 'success');
            investigationProgress.casesSolved++;
            updateProgressDisplay();
        }, 3000);
    }, 2000);
}

function closeSecret() {
    document.getElementById('secretOverlay').style.display = 'none';
    document.getElementById('accessPassword').value = '';
}

// ===== SISTEMA DE PROGRESO =====
function showInvestigationProgress(caseId) {
    const progressPanel = document.getElementById('progressPanel');
    progressPanel.style.display = 'block';
    
    // Animar barra de progreso
    const progressFill = document.getElementById('progressFill');
    const progress = (investigationProgress.casesSolved / 4) * 100;
    
    progressFill.style.width = progress + '%';
    
    // Actualizar estadísticas
    updateProgressDisplay();
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        closeProgress();
    }, 5000);
}

function closeProgress() {
    document.getElementById('progressPanel').style.display = 'none';
}

function updateProgressDisplay() {
    document.getElementById('casesSolved').textContent = investigationProgress.casesSolved;
    document.getElementById('evidenceFound').textContent = investigationProgress.evidenceFound;
    document.getElementById('experienceLevel').textContent = investigationProgress.experienceLevel;
    
    // Calcular nivel de experiencia
    const totalProgress = investigationProgress.casesSolved + investigationProgress.evidenceFound;
    investigationProgress.experienceLevel = Math.floor(totalProgress / 3) + 1;
}

function updateInvestigationProgress() {
    // Simular progreso basado en tiempo en la página
    const timeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
    
    if (timeSpent > 30 && investigationProgress.evidenceFound < 3) {
        investigationProgress.evidenceFound++;
        showNotification('🔍 NUEVA EVIDENCIA ENCONTRADA', 'info');
        updateProgressDisplay();
    }
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    
    // Estilos de notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 20, 0, 0.95));
        border: 2px solid #00ff88;
        border-radius: 10px;
        padding: 15px 20px;
        color: #00ff88;
        font-family: 'Orbitron', monospace;
        font-weight: 700;
        z-index: 3000;
        backdrop-filter: blur(15px);
        box-shadow: 0 0 30px rgba(0, 255, 136, 0.6);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// ===== SISTEMA DE TIMESTAMP =====
function updateTimestamp() {
    const now = new Date();
    const timestamp = now.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.textContent = `📅 ${timestamp}`;
    }
}

// ===== SISTEMA DE TIMER DE SESIÓN =====
function startSessionTimer() {
    setInterval(() => {
        const elapsed = Date.now() - sessionStartTime;
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        const sessionTimeElement = document.getElementById('sessionTime');
        if (sessionTimeElement) {
            sessionTimeElement.textContent = `Sesión: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// ===== EFECTO MATRIX =====
function createMatrixEffect() {
    const matrixBg = document.getElementById('matrixBg');
    if (!matrixBg) return;
    
    // Crear efecto de lluvia de caracteres
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        if (!matrixEffectActive) return;
        
        const ctx = matrixBg.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixBg.width, matrixBg.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixBg.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Configurar canvas
    function setupCanvas() {
        matrixBg.width = window.innerWidth;
        matrixBg.height = window.innerHeight;
    }
    
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    
    // Iniciar animación
    setInterval(drawMatrix, 50);
}

// ===== EASTER EGGS =====
function addEasterEggs() {
    // Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateKonamiCode();
            konamiCode = [];
        }
    });
    
    // Click secreto en el logo
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    let clickTimer;
    
    logo.addEventListener('click', function() {
        clickCount++;
        clearTimeout(clickTimer);
        
        clickTimer = setTimeout(() => {
            if (clickCount >= 5) {
                activateSecretMode();
                clickCount = 0;
            }
        }, 1000);
    });
    
    // Triple click en el footer
    const footer = document.querySelector('.footer');
    footer.addEventListener('dblclick', function() {
        activateGlitchMode();
    });
}

function activateKonamiCode() {
    showNotification('🎮 KONAMI CODE ACTIVADO - MODO DIOS DESBLOQUEADO', 'success');
    
    // Efectos especiales
    document.body.style.animation = 'glitch 0.1s ease-in-out infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
        showNotification('✨ MODO DIOS ACTIVADO - TODOS LOS CASOS DESBLOQUEADOS', 'success');
        
        // Desbloquear todos los casos
        investigationProgress.casesSolved = 4;
        investigationProgress.evidenceFound = 3;
        updateProgressDisplay();
    }, 2000);
}

function activateSecretMode() {
    showNotification('🔓 MODO SECRETO ACTIVADO - ACCESO TOTAL', 'success');
    
    // Cambiar colores temporalmente
    document.documentElement.style.setProperty('--primary-color', '#ff00ff');
    document.documentElement.style.setProperty('--secondary-color', '#00ffff');
    
    setTimeout(() => {
        document.documentElement.style.removeProperty('--primary-color');
        document.documentElement.style.removeProperty('--secondary-color');
    }, 10000);
}

function activateGlitchMode() {
    showNotification('🌀 MODO GLITCH ACTIVADO', 'warning');
    
    // Efecto de glitch en toda la página
    const elements = document.querySelectorAll('*');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'glitch 0.1s ease-in-out';
            setTimeout(() => {
                el.style.animation = '';
            }, 100);
        }, index * 50);
    });
}

// ===== FUNCIONES UTILITARIAS =====
function playClickSound() {
    // Simular sonido de click (en un navegador real se usaría Web Audio API)
    console.log('🔊 Click sound played');
}

// ===== MANEJADORES DE EVENTOS GLOBALES =====
window.addEventListener('beforeunload', function() {
    // Guardar progreso antes de salir
    localStorage.setItem('investigationProgress', JSON.stringify(investigationProgress));
    localStorage.setItem('sessionStartTime', sessionStartTime);
    localStorage.setItem('introCompleted', introCompleted.toString());
});

// ===== INICIALIZACIÓN DE PROGRESO GUARDADO =====
function loadSavedProgress() {
    const savedProgress = localStorage.getItem('investigationProgress');
    const savedSessionTime = localStorage.getItem('sessionStartTime');
    const savedIntroCompleted = localStorage.getItem('introCompleted');
    
    if (savedProgress) {
        investigationProgress = JSON.parse(savedProgress);
    }
    
    if (savedSessionTime) {
        sessionStartTime = parseInt(savedSessionTime);
    }
    
    if (savedIntroCompleted) {
        introCompleted = savedIntroCompleted === 'true';
    }
}

// Cargar progreso guardado al iniciar
loadSavedProgress();

