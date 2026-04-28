# Edgar Ramos — Portfolio

[ES] Portfolio personal construido con [Astro](https://astro.build). Diseño minimalista editorial.

[EN] Personal portfolio built with [Astro](https://astro.build). Minimal editorial design.

---

## ✅ Requisitos / Requirements

- Node.js 18+ (recomendado)
- pnpm, npm o yarn

---

## 🚀 Instalación / Installation

1. Instala dependencias:

- `pnpm install` (recomendado) o `npm install`

2. Desarrollo local:

- `pnpm dev` o `npm run dev`

3. Build producción:

- `pnpm build` o `npm run build`

4. Preview:

- `pnpm preview` o `npm run preview`

---

## 📦 Paquetes / Packages

- Astro
- @astrojs/partytown
- Prettier + plugins (Astro, Tailwind)

---

## 📁 Estructura / Structure

```
src/
├── components/
│   ├── _global/            ← Head, scripts, verificaciones
│   ├── _measurement/       ← Analytics / Pixels
│   └── portfolio/          ← Secciones del portfolio
├── data/
│   └── cv/                 ← Datos (skills, works, projects, etc.)
├── layouts/
│   └── PortfolioLayout.astro
├── pages/
│   └── index.astro
├── scripts/
└── styles/
public/
```

---

## 🛠️ Cambios comunes / Common updates

- **Contenido del CV**: `src/data/cv/*.json`
- **Secciones del portfolio**: `src/components/portfolio/*`
- **SEO/Head**: `src/components/_global/HeadBase.astro`
- **Analytics**: `src/components/_measurement/*`
- **Estilos**: `src/styles/portfolio.css`

---

## 🌐 Deploy

GitHub Pages ya está configurado en `.github/workflows/deploy.yml`.

Para cambiar la URL del sitio:

- actualiza `site` en `astro.config.mjs`.

---

## 📚 Documentación / Docs

- `docs/PROJECTS-GUIDE.md` — guía de proyectos
- `CHANGELOG.md` — historial de cambios
- `CONTRIBUTING.md` — estándar de cambios
- `SECURITY.md` — contacto privado de seguridad
