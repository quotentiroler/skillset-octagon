# Skill Octangle

A Tech Founder skill visualization web app that allows users to define and visualize 8 different entrepreneurial skills on an octagonal radar chart to see how well they match with other founders.

## Features

- **Interactive Octagonal Chart**: Display skills on a radar chart with 8 vertices
- **Real-time Updates**: Adjust skill values with sliders and see immediate visual feedback
- **Customizable Skills**: Edit skill names and values (1-10 scale)
- **Smooth Animations**: Transitions and hover effects for better user experience
- **Modern Design**: Built with Tailwind CSS for responsive and attractive styling
- **Quick Presets**: Reset, randomize, or maximize all skills with one click
- **Persistent Storage**: Save and manage multiple skill profiles with Zustand

## Tech Stack

- **React 19**: Latest React with modern features
- **Vite**: Fast build tool with SWC compilation and plugins
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Modern utility-first CSS framework
- **Zustand**: Lightweight state management with persistence
- **SVG Graphics**: Scalable vector graphics for the octagonal chart

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **View Your Skills**: The octagonal chart displays your current skill levels
2. **Adjust Skills**: Use the sliders on the right to modify skill values
3. **Rename Skills**: Click on skill names to edit them
4. **Quick Actions**: Use preset buttons to reset, randomize, or maximize all skills
5. **Visual Feedback**: Watch the skill polygon update in real-time as you make changes

## Default Skills

The app comes with 8 default Tech Founder skills:

- **Vision** - Ability to see the big picture and future opportunities
- **Leadership** - Capacity to inspire and guide teams effectively
- **Technical** - Understanding of technology and product development
- **Strategy** - Skill in planning and executing business strategies
- **Sales** - Ability to sell products, ideas, and vision to stakeholders
- **Networking** - Building and maintaining valuable professional relationships
- **Resilience** - Mental toughness to overcome challenges and setbacks
- **Innovation** - Creative thinking and ability to disrupt markets

Each skill can be customized both in name and value (1-10 scale).

## Design Assets

The app includes custom octagon-themed branding:

- **Logo** (`/public/logo.svg`): Full-size logo with octagonal radar chart design
- **Favicon** (`/public/favicon.svg`): Scalable 32x32 favicon for modern browsers
- **Favicon ICO** (`/public/favicon.ico`): Legacy format for older browsers
- **Octagonal Theme**: All visual elements follow the 8-sided polygon concept

## Development

### Project Structure

```
src/
├── components/
│   ├── SkillOctagon.tsx    # Main octagonal chart component
│   └── SkillControls.tsx   # Skill adjustment controls
├── types/
│   └── skills.ts           # TypeScript types and default data
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
public/
├── logo.svg               # App logo with octagonal design
├── favicon.svg            # Modern SVG favicon
└── favicon.ico            # Legacy ICO favicon
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project deploys to GitHub Pages using GitHub Actions.

- Workflow: `.github/workflows/deploy.yml`
- Environment: `github-pages` (required by Pages deploy action)
- Artifact: built from `dist` after `npm run build`
- Vite base path: `vite.config.ts` sets `base: '/skillset-octagon/'` so assets resolve correctly when hosted at `https://quotentiroler.github.io/skillset-octagon/`.

If you rename the repository or publish to a custom domain, update the `base` option accordingly.

## License

MIT License
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

    // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

    // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
