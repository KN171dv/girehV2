# girehV2

Fundação técnica do projeto. Nenhum design ou conteúdo visual foi implementado ainda — este é apenas o esqueleto que vai suportar a próxima etapa (direção criativa).

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **shadcn/ui** para componentes de UI
- **framer-motion**, **gsap** e **lenis** para animações e smooth scroll

## Estrutura

```
src/
  components/   # componentes reutilizáveis (shadcn/ui vive em components/ui)
  data/         # dados estáticos/conteúdo (textos, listas, config)
  pages/        # páginas do site
  lib/          # utilitários (ex.: cn() do shadcn)
```

## Scripts

```bash
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção (tsc + vite build)
npm run preview   # preview do build de produção
npm run lint      # oxlint
```

## Adicionando componentes shadcn/ui

```bash
npx shadcn@latest add <componente>
```
