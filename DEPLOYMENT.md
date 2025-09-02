# 🚀 GUÍA DE DESPLIEGUE - CRÍMENES IMPERFECTOS

## 🌟 **DESCRIPCIÓN**

Esta guía te ayudará a desplegar tu web **Crímenes Imperfectos** tanto localmente como en plataformas de hosting gratuitas y de pago.

## 🏠 **DESPLIEGUE LOCAL**

### 📋 **Requisitos Previos**
- Navegador web moderno
- Editor de código (VS Code, Sublime Text, etc.)
- Terminal/Consola

### 🔧 **Método 1: Python (Recomendado)**

```bash
# Navegar al directorio del proyecto
cd /ruta/a/tu/proyecto

# Iniciar servidor Python 3
python3 -m http.server 8000

# O si tienes Python 2
python -m SimpleHTTPServer 8000
```

**Acceso:** `http://localhost:8000/mystery-crimes.html`

### 🔧 **Método 2: Node.js**

```bash
# Instalar serve globalmente
npm install -g serve

# Navegar al directorio del proyecto
cd /ruta/a/tu/proyecto

# Iniciar servidor
serve -p 8000
```

**Acceso:** `http://localhost:8000/mystery-crimes.html`

### 🔧 **Método 3: PHP**

```bash
# Navegar al directorio del proyecto
cd /ruta/a/tu/proyecto

# Iniciar servidor PHP
php -S localhost:8000
```

**Acceso:** `http://localhost:8000/mystery-crimes.html`

### 🔧 **Método 4: Live Server (VS Code)**

1. Instalar extensión **Live Server** en VS Code
2. Click derecho en `mystery-crimes.html`
3. Seleccionar **"Open with Live Server"**

## 🌐 **DESPLIEGUE PÚBLICO GRATUITO**

### 🆓 **GitHub Pages (Recomendado para principiantes)**

#### **Paso 1: Crear Repositorio**
```bash
# Inicializar git
git init

# Añadir archivos
git add .

# Primer commit
git commit -m "🎉 Primera versión de Crímenes Imperfectos"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Subir código
git push -u origin main
```

#### **Paso 2: Configurar GitHub Pages**
1. Ir a **Settings** → **Pages**
2. **Source**: Seleccionar **Deploy from a branch**
3. **Branch**: Seleccionar **main** y **/ (root)**
4. **Save**

#### **Paso 3: Acceso**
Tu web estará disponible en: `https://tu-usuario.github.io/tu-repositorio`

### 🆓 **Netlify (Despliegue automático)**

#### **Paso 1: Preparar Archivos**
- Asegúrate de tener `netlify.toml` en tu proyecto
- Sube tu código a GitHub

#### **Paso 2: Conectar Netlify**
1. Ir a [netlify.com](https://netlify.com)
2. **Sign up** con tu cuenta de GitHub
3. **New site from Git**
4. Seleccionar tu repositorio
5. **Deploy site**

#### **Paso 3: Configuración**
- **Build command**: Dejar vacío
- **Publish directory**: `.`
- **Deploy**

#### **Paso 4: Acceso**
Tu web tendrá una URL como: `https://random-name.netlify.app`

### 🆓 **Vercel (Rendimiento optimizado)**

#### **Paso 1: Preparar Archivos**
- Asegúrate de tener `vercel.json` en tu proyecto
- Sube tu código a GitHub

#### **Paso 2: Conectar Vercel**
1. Ir a [vercel.com](https://vercel.com)
2. **Sign up** con tu cuenta de GitHub
3. **New Project**
4. Importar tu repositorio
5. **Deploy**

#### **Paso 3: Acceso**
Tu web tendrá una URL como: `https://tu-proyecto.vercel.app`

### 🆓 **Firebase Hosting (Google)**

#### **Paso 1: Instalar Firebase CLI**
```bash
npm install -g firebase-tools
```

#### **Paso 2: Configurar Firebase**
```bash
# Login
firebase login

# Inicializar proyecto
firebase init hosting

# Seleccionar opciones:
# - Use an existing project
# - Seleccionar tu proyecto
# - Public directory: .
# - Single-page app: No
# - Overwrite index.html: No
```

#### **Paso 3: Desplegar**
```bash
firebase deploy
```

#### **Paso 4: Acceso**
Tu web estará en: `https://tu-proyecto.web.app`

## 💰 **HOSTING DE PAGO (OPCIONAL)**

### 🌟 **Hostinger**
- **Precio**: Desde €2.99/mes
- **Características**: Dominio gratis, SSL, email
- **Ventajas**: Panel fácil, soporte en español

### 🌟 **SiteGround**
- **Precio**: Desde €3.99/mes
- **Características**: WordPress optimizado, CDN
- **Ventajas**: Velocidad, seguridad

### 🌟 **Bluehost**
- **Precio**: Desde $2.95/mes
- **Características**: Dominio gratis, SSL
- **Ventajas**: Confiable, soporte 24/7

## 🔧 **CONFIGURACIÓN AVANZADA**

### 📱 **Dominio Personalizado**

#### **GitHub Pages**
1. **Settings** → **Pages**
2. **Custom domain**: `tu-dominio.com`
3. **Save**
4. Configurar DNS en tu proveedor de dominios

#### **Netlify**
1. **Domain management** → **Add custom domain**
2. Introducir tu dominio
3. Configurar DNS según las instrucciones

### 🔒 **HTTPS y SSL**
- **GitHub Pages**: Automático
- **Netlify**: Automático
- **Vercel**: Automático
- **Firebase**: Automático

### 📊 **Analytics y Monitoreo**

#### **Google Analytics**
```html
<!-- Añadir en el <head> de mystery-crimes.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### **Netlify Analytics**
- Activar en **Site settings** → **Analytics**
- **Enable analytics**

## 🚨 **SOLUCIÓN DE PROBLEMAS**

### ❌ **Error: Página no encontrada**
- Verificar que `mystery-crimes.html` esté en la raíz
- Comprobar configuración de redirecciones
- Verificar que el servidor esté funcionando

### ❌ **Error: Fuentes no cargan**
- Verificar conexión a internet
- Comprobar que Google Fonts esté accesible
- Verificar consola del navegador

### ❌ **Error: JavaScript no funciona**
- Verificar que JavaScript esté habilitado
- Comprobar consola del navegador
- Verificar que todos los archivos estén subidos

### ❌ **Error: CSS no se aplica**
- Verificar ruta del archivo CSS
- Comprobar que el archivo esté subido
- Verificar sintaxis CSS

## 📱 **OPTIMIZACIÓN PARA MÓVILES**

### 🎯 **Puntos de Control**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### 🔧 **Verificación**
1. **DevTools** → **Toggle device toolbar**
2. Probar diferentes resoluciones
3. Verificar navegación táctil
4. Comprobar legibilidad del texto

## 🎨 **PERSONALIZACIÓN POST-DESPLIEGUE**

### 🌈 **Cambiar Colores**
Editar variables en `mystery-crimes.css`:
```css
:root {
  --primary-color: #00ff88;
  --secondary-color: #00ffaa;
  --accent-color: #ff4080;
}
```

### 🔤 **Cambiar Fuentes**
Modificar en `mystery-crimes.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=NUEVA_FUENTE:wght@400;700;900&display=swap" rel="stylesheet">
```

### 🖼️ **Cambiar Logo**
Reemplazar emojis en el header:
```html
<span class="logo-text">🔒 SISTEMA</span>
```

## 📈 **MANTENIMIENTO**

### 🔄 **Actualizaciones Regulares**
- Mantener dependencias actualizadas
- Verificar compatibilidad del navegador
- Monitorear rendimiento

### 📊 **Monitoreo de Rendimiento**
- **PageSpeed Insights** de Google
- **WebPageTest** para análisis detallado
- **Lighthouse** en DevTools

### 🔒 **Seguridad**
- Mantener HTTPS activado
- Verificar headers de seguridad
- Monitorear logs de acceso

---

## 🎯 **¡TU WEB ESTÁ LISTA!**

Con esta guía, tu web **Crímenes Imperfectos** estará funcionando perfectamente tanto localmente como en internet.

### 🌟 **Próximos Pasos Recomendados**
1. **Probar localmente** primero
2. **Desplegar en GitHub Pages** (más fácil)
3. **Configurar dominio personalizado** (opcional)
4. **Añadir analytics** para seguimiento
5. **Compartir** con amigos y familia

### 🚀 **¡A INVESTIGAR!**

Tu sistema de investigación criminal está listo para resolver los casos más misteriosos del mundo digital.

🔍 **¡La verdad está ahí fuera!** 🔍
