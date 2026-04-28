# Plan de Internacionalización (i18n)

## Resumen

Implementar soporte para 4 idiomas: **Español** (default), **Inglés**, **Portugués** y **Francés**. Sin prefijos en URLs, usando localStorage para persistir la preferencia del usuario.

---

## 1. Estructura del Proyecto

### 1.1 Estructura de Archivos Propuesta

```
src/
├── i18n/
│   ├── utils.ts              # Helper functions (useTranslations, getLocale, setLocale)
│   ├── ui/                  # Traducciones de interfaz
│   │   ├── es.json          # Español (default)
│   │   ├── en.json          # Inglés
│   │   ├── pt.json          # Portugués
│   │   └── fr.json          # Francés
│   └── data/                # Contenido traducido por locale
│       ├── es/
│       │   ├── profile.json
│       │   ├── projects.json
│       │   ├── experiences.json
│       │   ├── education.json
│       │   ├── certifications.json
│       │   └── skills.json
│       ├── en/
│       │   └── ...
│       ├── pt/
│       │   └── ...
│       └── fr/
│           └── ...
```

### 1.2 Jerarquía de Archivos a Traducir

**UI (Interfaz):**

- Navbar (labels de navegación)
- Hero (CTAs, tagline)
- Footer (copyright, botón volver arriba)
- About (títulos de sección)
- Projects (labels, botones)
- Experience (labels, "Presente")
- Skills (nombres de categorías)
- Contact (labels de formulario)
- Pages (títulos, meta descriptions)

**Contenido JSON:**

- `profile.json` - Bio, ubicación, idiomas
- `projects.json` - Nombres y descripciones
- `experiences.json` - Posiciones, responsabilidades
- `education.json` - Instituciones, títulos
- `certifications.json` - Nombres y descripciones
- `skills.json` - Nombres de skills

---

## 2. Configuración de Astro

### 2.1 astro.config.mjs

```javascript
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://edgar-ramxs.github.io",
  integrations: [icon()],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "pt", "fr"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {},
});
```

### 2.2 TypeScript - Tipos de Locale

Crear `src/i18n/types.ts`:

```typescript
export type Locale = "es" | "en" | "pt" | "fr";

export const LOCALES: Locale[] = ["es", "en", "pt", "fr"];
export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_NAMES: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  fr: "Français",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  es: "🇨🇱",
  en: "🇺🇸",
  pt: "🇧🇷",
  fr: "🇫🇷",
};
```

---

## 3. Utils de Internacionalización

### 3.1 src/i18n/utils.ts

```typescript
import { DEFAULT_LOCALE, type Locale } from "./types";

const STORAGE_KEY = "portfolio-locale";

export function getLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && ["es", "en", "pt", "fr"].includes(stored)) {
    return stored as Locale;
  }

  const browserLang = navigator.language.split("-")[0];
  if (["es", "en", "pt", "fr"].includes(browserLang)) {
    return browserLang as Locale;
  }

  return DEFAULT_LOCALE;
}

export function setLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
  window.dispatchEvent(new CustomEvent("locale-change", { detail: locale }));
}

export async function useTranslations(locale: Locale) {
  const translations = await import(`./ui/${locale}.json`);
  return (key: string): string => {
    const keys = key.split(".");
    let value: any = translations.default;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
}
```

### 3.2 Sistema de Cambio de Idioma

El cambio de idioma funciona así:

1. Usuario hace click en selector de idioma
2. `setLocale(newLocale)` guarda en localStorage
3. Se dispara `CustomEvent("locale-change")`
4. Componentes listen para el evento y actualizan su contenido
5. No hay recarga de página

---

## 4. Traducciones de UI

### 4.1 Estructura de es.json (template)

```json
{
  "nav": {
    "projects": "Proyectos",
    "experience": "Experiencia",
    "certifications": "Certificaciones",
    "skills": "Habilidades",
    "about": "Sobre mí",
    "contact": "Contacto",
    "github": "GitHub"
  },
  "hero": {
    "available": "Disponible para proyectos",
    "cta": {
      "viewProjects": "Ver proyectos",
      "contact": "Contacto"
    }
  },
  "footer": {
    "backToTop": "Volver arriba",
    "copyright": "© {year} — {role}"
  },
  "sections": {
    "about": "Sobre mí",
    "experience": "Experiencia",
    "projects": "Proyectos",
    "skills": "Habilidades",
    "certifications": "Certificaciones",
    "contact": "Contacto"
  },
  "labels": {
    "present": "Presente",
    "active": "Activo",
    "completed": "Completado",
    "backTo": "Volver a",
    "viewDetails": "Ver detalles",
    "viewProject": "Abrir proyecto",
    "githubRepo": "Repositorio GitHub"
  },
  "meta": {
    "home": {
      "title": "Edgar Ramos — Data Analyst",
      "description": "Portfolio de Edgar Ramos, Data Analyst en Chile"
    },
    "about": {
      "title": "Sobre mí — Edgar Ramos",
      "description": "Conoce más sobre mi trayectoria profesional"
    }
  }
}
```

### 4.2 Idiomas Complementarios

Los archivos `en.json`, `pt.json`, `fr.json` contendrán las mismas claves con sus respectivas traducciones.

---

## 5. Componente Language Switcher

### 5.1 Ubicación

Nuevo componente: `src/components/_global/LanguageSwitcher.astro`

### 5.2 Funcionalidad

- Dropdown con los 4 idiomas
- Bandera + código ISO
- Cambio sin recarga (localStorage + CustomEvent)
- Persistencia entre sesiones

### 5.3 Integración

Se agrega en `Navbar.astro` al lado derecho, antes del enlace a GitHub.

---

## 6. Migración de Datos JSON

### 6.1 Estrategia

Los archivos JSON actuales en `src/data/` se mueven a `src/i18n/data/es/` (español es el default).

Los demás idiomas (`en`, `pt`, `fr`) reciben copias con contenido traducido.

### 6.2 Nombres de Archivos

```
src/i18n/data/
├── es/profile.json
├── en/profile.json
├── pt/profile.json
├── fr/profile.json
├── es/projects.json
├── en/projects.json
└── ...
```

### 6.3 Imports en Tipos

El archivo `src/types/cv.ts` se actualiza para usar el locale activo:

```typescript
import { getLocale } from "@i18n/utils";

// Cargar datos según locale
const locale = getLocale();
const profile = await import(`@i18n/data/${locale}/profile.json`);
```

---

## 7. Fases de Implementación

### Fase 1: Configuración Base

- [ ] Crear estructura de carpetas (`src/i18n/`)
- [ ] Configurar `astro.config.mjs` con i18n
- [ ] Crear tipos en `src/i18n/types.ts`
- [ ] Crear utils en `src/i18n/utils.ts`

### Fase 2: UI Strings

- [ ] Crear `src/i18n/ui/es.json` con todas las traducciones españolas
- [ ] Traducir a inglés (`en.json`)
- [ ] Traducir a portugués (`pt.json`)
- [ ] Traducir a francés (`fr.json`)
- [ ] Crear componente `LanguageSwitcher.astro`
- [ ] Integrar en `Navbar.astro`

### Fase 3: Contenido JSON

- [ ] Mover datos a `src/i18n/data/es/`
- [ ] Crear versiones en inglés
- [ ] Crear versiones en portugués
- [ ] Crear versiones en francés
- [ ] Actualizar imports en `src/types/cv.ts`

### Fase 4: Integración en Componentes

- [ ] Actualizar `Navbar.astro` con traducciones
- [ ] Actualizar `Hero.astro` con traducciones
- [ ] Actualizar `Footer.astro` con traducciones
- [ ] Actualizar `About.astro` con traducciones
- [ ] Actualizar `Projects.astro` con traducciones
- [ ] Actualizar `Experience.astro` con traducciones
- [ ] Actualizar `Skills.astro` con traducciones
- [ ] Actualizar `Contact.astro` con traducciones
- [ ] Actualizar todas las páginas (`index.astro`, `about.astro`, etc.)

### Fase 5: SEO y Meta

- [ ] Actualizar `HeadBase.astro` para usar `lang` dinámico
- [ ] Agregar meta descriptions por idioma
- [ ] Actualizar Open Graph tags por idioma

### Fase 6: Testing

- [ ] Verificar cambio de idioma sin recarga
- [ ] Verificar persistencia en localStorage
- [ ] Verificar todos los textos traducidos
- [ ] Verificar build completo

---

## 8. Herramientas de Traducción

Para acelerar el proceso, se pueden usar:

### 8.1 Opciones Automatizadas

- **DeepL API** - Traducciones de alta calidad
- **Google Translate API** - Amplio soporte de idiomas
- **LibreTranslate** - Open source, auto-hostable
- **ChatGPT/GPT-4** - Bueno para contexto y consistencia

### 8.2 Recomendación

Usar una combinación de:

1. Traducción automática inicial (DeepL o ChatGPT)
2. Revisión manual para ajustar tono y contexto
3. Validación de consistencia entre archivos

---

## 9. Consideraciones Técnicas

### 9.1 SSR vs Static

Este es un sitio **estático** (`output: "static"`). El idioma se determina en el cliente:

- No hay servidor que renderice según Accept-Language
- localStorage es la fuente de verdad para el idioma

### 9.2 Hydration

Los componentes que muestran contenido traducible deben:

- Escuchar el evento `locale-change`
- Actualizar su contenido sin Full Page Reload

### 9.3 Fallback

Si una traducción no existe, mostrar la clave en inglés (o español si es la default).

---

## 10. Ejemplo de Flujo de Cambio de Idioma

```
Usuario clickea "EN" en LanguageSwitcher
           ↓
setLocale("en") ejecuta
           ↓
localStorage.setItem("portfolio-locale", "en")
           ↓
window.dispatchEvent(new CustomEvent("locale-change", {detail: "en"}))
           ↓
Todos los componentes subscribed actualizan sus textos
           ↓
UI refleja el nuevo idioma instantáneamente
```

---

## 11. Checklist de Archivos a Modificar

### Archivos Existentes

- `astro.config.mjs` - Agregar config i18n
- `src/types/cv.ts` - Actualizar imports
- `Navbar.astro` - Agregar LanguageSwitcher
- `Hero.astro` - Usar traducciones
- `Footer.astro` - Usar traducciones
- `About.astro` - Usar traducciones
- `Projects.astro` - Usar traducciones
- `Experience.astro` - Usar traducciones
- `Skills.astro` - Usar traducciones
- `Contact.astro` - Usar traducciones
- Todas las páginas en `src/pages/`

### Archivos a Crear

- `src/i18n/types.ts`
- `src/i18n/utils.ts`
- `src/i18n/ui/es.json`
- `src/i18n/ui/en.json`
- `src/i18n/ui/pt.json`
- `src/i18n/ui/fr.json`
- `src/components/_global/LanguageSwitcher.astro`
- `src/i18n/data/es/*.json` (6 archivos)
- `src/i18n/data/en/*.json` (6 archivos)
- `src/i18n/data/pt/*.json` (6 archivos)
- `src/i18n/data/fr/*.json` (6 archivos)

---

## 12. Orden de Desarrollo Sugerido

1. **Fase 1** - Configuración (1-2 horas)
2. **Fase 2** - UI Strings en español (1 hora)
3. **Fase 3** - Traducciones EN/PT/FR (2-3 horas con herramienta)
4. **Fase 4** - Migrar datos JSON (2 horas)
5. **Fase 5** - Integración componentes (3-4 horas)
6. **Fase 6** - Testing y ajustes (1-2 horas)

**Total estimado: 10-15 horas**
