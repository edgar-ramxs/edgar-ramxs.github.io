# Contributing / Guía de cambios

> Este repositorio es personal, pero esta guía estandariza cómo realizar cambios y mantener consistencia.

---

## 🇪🇸 Español

### 1) Antes de cambiar

- Verifica si el cambio es **contenido** (datos/estilos) o **funcionalidad** (componentes/layout/scripts).
- Revisa `README.md` y `docs/PROJECTS-GUIDE.md` si aplica.

### 2) Flujo de trabajo recomendado

1. Crea una rama local con un nombre descriptivo.
2. Realiza cambios pequeños y enfocados.
3. Ejecuta `pnpm dev` para validar la vista.
4. Formatea con `pnpm format` si cambiaste estilos o layout.

### 3) Dónde editar

- **Contenido del CV**: `src/data/cv/*.json`
- **Secciones del portfolio**: `src/components/portfolio/*`
- **SEO/Head**: `src/components/_global/HeadBase.astro`
- **Analytics**: `src/components/_measurement/*`
- **Estilos**: `src/styles/portfolio.css`

### 4) Cambios de proyectos nuevos

Consulta `docs/PROJECTS-GUIDE.md`.

---

## 🇺🇸 English

### 1) Before editing

- Check if the change is **content** (data/styles) or **functionality** (components/layout/scripts).
- Review `README.md` and `docs/PROJECTS-GUIDE.md` if relevant.

### 2) Recommended workflow

1. Create a local branch with a descriptive name.
2. Make small, focused changes.
3. Run `pnpm dev` to validate the UI.
4. Run `pnpm format` if you touched styles or layout.

### 3) Where to edit

- **CV content**: `src/data/cv/*.json`
- **Portfolio sections**: `src/components/portfolio/*`
- **SEO/Head**: `src/components/_global/HeadBase.astro`
- **Analytics**: `src/components/_measurement/*`
- **Styles**: `src/styles/portfolio.css`

### 4) New projects

See `docs/PROJECTS-GUIDE.md`.
