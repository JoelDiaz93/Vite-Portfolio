# Carlos Díaz Portfolio v3.1

Portfolio bilingüe (EN/ES) orientado a Software Engineering, backend, cloud, product engineering y servicios freelance.

## Qué cambia en v3.1

- Design system definitivo:
  - Light: **Piedra y Salvia**.
  - Dark: **Carbón y Salvia**.
- Márgenes laterales consistentes en navegación, hero, secciones y caso de estudio.
- Hero reconstruido con un recorrido interactivo de software: solicitud → análisis → arquitectura → diseño → desarrollo → pruebas → deploy → soporte.
- Stack principal y métricas visibles dentro del primer viewport.
- Experiencia profesional con timeline horizontal, detalle seleccionable, impacto cualitativo y tecnologías completas.
- Banistmo actualizado con Java, Spring Boot, Angular, Node.js, .NET, AWS, TypeScript, Python, SQL y Azure DevOps.
- Proyectos reescritos para que RRHH y clientes entiendan qué necesidad resuelve cada proyecto y qué capacidad demuestra.
- Skills agrupadas por capacidades y subdominios técnicos.
- Servicios reescritos para público interesado en desarrollo, integraciones y automatización.
- Eventra mejorado con:
  - principios de privacidad visuales;
  - objetivos interactivos;
  - flujo pairing → analytics animado;
  - slider de retos con Problema / Decisión / Resultado y mini esquemas.
- Light mode sin barra blanca dura y con superficies más suaves.
- Availability badge corregido para mantener contraste en ambos temas.
- El formulario conserva la integración EmailJS actual; su hardening se deja para una fase posterior.

## Rutas

- `/en`
- `/es`
- `/en/projects/eventra`
- `/es/projects/eventra`

## Instalación

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
npm run preview
```

## Contacto / EmailJS

Copia `.env.example` a `.env` y completa:

```env
VITE_APP_SERVICE_ID=
VITE_APP_TEMPLATE_ID=
VITE_APP_PUBLIC_KEY=
```

No publiques `.env`.

## Design system

Consulta `docs/DESIGN_SYSTEM.md` para los tokens Light / Dark y `docs/palette-reference.png` para la referencia visual aprobada.

## PostCSS / Tailwind

El proyecto no depende de Tailwind. `postcss.config.js` mantiene `plugins: {}` para evitar herencias de configuración que intenten cargar `tailwindcss`.

## Deployment with GitHub Actions + Vercel

Production deployment is controlled by `.github/workflows/deploy-vercel.yml`.
Every successful push to `main` runs a clean build and then deploys the prebuilt output to Vercel.

Required GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

To obtain the project identifiers, install the Vercel CLI locally, run `vercel login` and `vercel link`, then read `.vercel/project.json`. Never commit the `.vercel` directory or access token.

Vercel native Git deployments are disabled in `vercel.json` so GitHub Actions remains the single production deployment path. SPA rewrites are included so localized React Router URLs such as `/es/projects/eventra` can be refreshed directly.
