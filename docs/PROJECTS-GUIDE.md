# Guía de Organización de Proyectos / Projects Guide

Esta guía detalla cómo agregar nuevos proyectos o experimentos manteniendo el portfolio principal en la raíz `/`.

---

## Estructura recomendada / Recommended structure

Cada proyecto debe estar "encapsulado" para evitar conflictos de estilos o lógica con el portfolio principal.

### Ejemplo / Example: `the-scraping-machine`

1. **Página / Page**: `src/pages/projects/the-scraping-machine.astro`
   - Define la ruta accesible en `/projects/the-scraping-machine`.
2. **Componentes / Components**: `src/components/projects/the-scraping-machine/`
   - Archivos `.astro`, `.jsx`, o `.tsx` específicos del proyecto.
3. **Estilos / Styles**: `src/styles/projects/the-scraping-machine.css`
   - Estilos específicos (importar en el componente principal del proyecto).
4. **Datos / Data**: `src/data/projects/the-scraping-machine.json`
   - Si el proyecto necesita cargar datos externos.

---

## Layout de Proyectos / Project layout

Usa `src/layouts/ProjectLayout.astro` si existe. Si no, crea uno basado en `PortfolioLayout.astro` y añade:
- Botón para volver al CV principal (`/`).
- Configuración de SEO independiente.
- Estilos base que no interfieran con el CV.

---

## Pasos para crear uno nuevo / Steps

1. Crea la carpeta en `src/components/projects/[nombre]`.
2. Crea la página en `src/pages/projects/[nombre].astro`.
3. Importa tus componentes y estilos dentro de esa página.
4. ¡Listo! Astro se encarga del resto.
