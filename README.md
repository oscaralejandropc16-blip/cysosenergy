# CYSOS ENERGY, C.A. - Sitio Web Corporativo & CMS Administrativo

Plataforma web corporativa de categoría **Super Premium** para **CYSOS ENERGY, C.A.**, empresa líder en Ingeniería, Procura, Construcción (IPC) y Servicios Petroleros Especializados en Venezuela.

![CYSOS ENERGY Logo](https://raw.githubusercontent.com/cysosenergy/web/main/public/favicon.svg)

---

## ⚡ Características Principales

### 1. Portal Público Corporativo (UI/UX Super Premium)
- **Identidad Corporativa Oficial:** Misión, Visión y Valores exactos extraídos de la documentación institucional oficial.
- **Isotipo & Logotipo Oficial:** Vectorizado SVG de la gota de petróleo/fuego con la paleta de colores corporativa (Negro Obsidiana, Plata Metálico, Naranja Fuego `#FF5722` y Ámbar Petrolero `#F59E0B`).
- **Visualizador Dinámico EOR:** Demostración gráfica de inyección de reductores de viscosidad para crudos pesados de la Faja Petrolífera del Orinoco.
- **Simulador Interactivo de Viscosidad:** Calculadora en tiempo real para estimar la reducción de viscosidad (cPs), ganancia de tasa de flujo (BPD) y ahorro en diluyentes (Nafta).
- **Mapa de Cobertura en Venezuela:** Mapa interactivo por cuencas hidrocarburíferas (Faja Petrolífera del Orinoco, Cuenca de Maracaibo / Zulia, Cuenca Oriental).
- **Formulario de Contacto Directo:** Validación completa de datos corporativos conectada en tiempo real a la bandeja de entrada del CMS.
- **Enlace a Instagram Oficial:** Acceso directo a [@cysosenergy](https://instagram.com/cysosenergy/).

### 2. Panel CMS Administrativo Integrado
- **Autenticación Segura:** Acceso restringido por clave de administrador (por defecto: `cysos2026` o `admin`).
- **Inbox de Solicitudes y Cotizaciones:**
  - Recepción de mensajes en tiempo real con indicador en la barra de navegación.
  - 1-Clic para **Responder por WhatsApp** con plantilla profesional personalizada.
  - 1-Clic para **Enviar Email** corporativo.
  - Cambio de estado (Pendiente 🟡 / Atendido 🟢) y gestión de registros.
- **Gestión de KPIs y Métricas:** Edición en vivo de los contadores públicos (Pozos Intervenidos, % Reducción Viscosidad, Horas HSE, Barriles/día).
- **Editor Corporativo:** Modificación del texto de la Misión y Visión con guardado persistente en `localStorage`.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** React 18 + Vite
- **Estilos:** Tailwind CSS 3 + Custom Glassmorphic Design System
- **Iconografía:** Lucide Icons (`lucide-react`)
- **Tipografía:** Google Fonts (*Lexend* para títulos y *Inter* para cuerpo)
- **Despliegue:** Optimizado para Vercel (`vercel.json` preconfigurado)

---

## 🚀 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/cysosenergy.git
cd cysosenergy

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.

---

## 🌐 Despliegue en Vercel

Esta aplicación está 100% preconfigurada para Vercel.

1. Instala Vercel CLI o conecta tu cuenta de GitHub a Vercel.
2. Si usas Vercel CLI, ejecuta:
   ```bash
   vercel
   ```
3. O en la interfaz de Vercel (https://vercel.com/new), importa el repositorio de GitHub y selecciona la configuración predeterminada de Vite.

---

## 📦 Repositorio en GitHub

Para subir el proyecto a un nuevo repositorio de GitHub:

```bash
git init
git add .
git commit -m "Initial commit - CYSOS ENERGY Web & CMS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cysosenergy.git
git push -u origin main
```
