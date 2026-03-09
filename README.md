# Edgar Ramos — Portafolio

Portafolio personal construido con [Astro](https://astro.build). Diseño minimalista editorial.

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:4321)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura

```
src/
├── components/
│   ├── Navbar.astro       ← Navegación fija
│   ├── Hero.astro         ← Sección principal
│   ├── About.astro        ← Sobre mí
│   ├── Experience.astro   ← Historial de trabajo
│   ├── Projects.astro     ← Proyectos ⬅ editar aquí
│   ├── Skills.astro       ← Stack técnico
│   ├── Contact.astro      ← Contacto
│   └── Footer.astro
├── layouts/
│   └── Layout.astro       ← Layout base + SEO
├── pages/
│   └── index.astro        ← Página principal
└── styles/
    └── global.css         ← Variables y estilos globales
```

## ✏️ Personalización rápida

### Agregar un proyecto
Edita `src/components/Projects.astro` y agrega un objeto al array `projects`:

```js
{
  number: '03',
  title: 'Nombre del proyecto',
  description: 'Descripción del proyecto.',
  tags: ['Python', 'SQL'],
  github: 'https://github.com/edgar-ramxs/tu-repo',
  featured: false,
},
```

### Cambiar experiencia laboral
Edita el array `jobs` en `src/components/Experience.astro`.

### Cambiar colores
Edita las variables CSS en `src/styles/global.css`:

```css
:root {
  --accent: #c84b2f;   /* color principal */
  --bg: #f5f2ee;       /* fondo */
}
```

## 🌐 Deploy en GitHub Pages

1. En `astro.config.mjs`, actualiza `site` con tu URL real
2. Habilita GitHub Pages en tu repositorio (Settings → Pages)
3. Corre `npm run build` y sube el contenido de `/dist`

O usa [Netlify](https://netlify.com) / [Vercel](https://vercel.com) con deploy automático.
