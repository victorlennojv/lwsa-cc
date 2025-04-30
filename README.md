# lwsa-cc

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint

```

# Arquitetura do Jogo da Memória

## Visão Geral

Irei detalhar um pouco sobre o projeto...

## Estrutura de Diretórios

```
src/
├── assets/           # Recursos estáticos (imagens, fontes, etc.)
├── components/       # Componentes Vue reutilizáveis
│   ├── auth/        # Componentes relacionados à feature auth
│   ├── game/        # Componentes específicos da feature game
│   ├── icons/       # Componentes de ícones reutilizáveis
│   ├── layout/      # Componentes de layout reutilizável
│   └── ui/          # Componentes de interface genéricos e reutilizáveis no projeto
├── composables/     # Lógica reutilizável ou separação
├── layouts/         # Layouts da aplicação
├── router/          # Configuração de rotas
├── services/        # Serviços e integrações externas
├── stores/          # Gerenciamento de estado global separados por feature (modular) (Pinia)
├── types/           # Definições de tipos TypeScript
├── utils/           # Funções utilitárias de uso geral
└── views/           # Páginas da aplicação que nesse caos funciona também como containers tendo em vista que tentei usar o pattern container/presentional
```

## Padrões de desenvolvimento

### 1. Componentes

- **Presentacionais**: Focados em UI, sem lógica de negócio
  - `GameCard.vue`
  - `GameFinishModal.vue`
  - `GameInfo.vue`
  - `LoginForm.vue`
  - etc
- **Containers**: Gerenciam estado e lógica
  - `MemoryGamePage.vue`
  - `GameHomePage.vue`
  - `LoginPage.vue`

### 3. Gerenciamento de Estado

- **Pinia Stores**:
  - `game.ts`: Estado global do jogo
  - `user.ts`: Estado do usuário

### 3. Estilização

- **Tailwind CSS**: Classes utilitárias
- **SCSS**: Estilos específicos de componentes
- **BEM**: Nomenclatura de classes

## Boas Práticas

### 1. Performance

- Lazy loading de componentes
- Memoização com computeds

## Segurança

- Proteção de rotas com definição de guards
