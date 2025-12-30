# Maison Mojo - Quiz de Style Déco

Un quiz interactif et moderne qui permet aux utilisateurs de découvrir leur ambiance intérieure idéale parmi 11 styles décoratifs uniques.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

---

## Apercu

Le quiz propose une série de questions à choix multiples. Chaque réponse est associée à une lettre (A à K) correspondant à un style déco. À la fin, l'application calcule la lettre majoritaire et révèle le profil décoratif de l'utilisateur avec une animation festive.

### Les 11 Ambiances

| Lettre | Style | Description |
|:------:|-------|-------------|
| A | **Pop** | Couleurs vives, énergie et optimisme |
| B | **Japandi** | Minimalisme japonais et design scandinave |
| C | **Cocooning** | Douceur, confort et textures enveloppantes |
| D | **Haussmannienne** | Élégance parisienne et moulures classiques |
| E | **Industrielle** | Métal brut, briques et esprit loft |
| F | **Bohème** | Éclectisme, voyages et accumulation chaleureuse |
| G | **Scandinave** | Blanc, bois clair et fonctionnalité |
| H | **Art Déco** | Géométrie, luxe et années folles |
| I | **Méditerranéenne** | Bleu, terracotta et dolce vita |
| J | **Campagne Chic** | Rustique raffiné et nature |
| K | **Contemporaine** | Lignes épurées et tendances actuelles |

---

## Stack Technique

### Core
- **[React 19](https://react.dev/)** - Bibliothèque UI
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rapide

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Composants accessibles et personnalisables
  - Card, Button, Progress, RadioGroup

### Animations & Effets
- **[Framer Motion](https://motion.dev/)** - Animations fluides et transitions
- **[Lucide React](https://lucide.dev/)** - Icônes modernes (1000+)
- **[Canvas Confetti](https://github.com/catdad/canvas-confetti)** - Effet de célébration

---

## Installation

### Prérequis
- Node.js 18+
- npm, yarn, pnpm ou bun

### Démarrage rapide

```bash
# Cloner le projet
git clone https://github.com/votre-repo/maison-mojo.git
cd maison-mojo

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Ajouter les composants Shadcn/ui

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add radio-group
```

---

## Structure du Projet

```
maison-mojo/
├── public/
│   └── images/              # Images des 11 ambiances
├── src/
│   ├── components/
│   │   ├── ui/              # Composants Shadcn (auto-générés)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── progress.tsx
│   │   │   └── radio-group.tsx
│   │   ├── Quiz.tsx         # Logique principale du quiz
│   │   ├── Question.tsx     # Affichage d'une question
│   │   └── Result.tsx       # Écran de résultat final
│   ├── data/
│   │   └── quizData.ts      # Questions et mapping des résultats
│   ├── types/
│   │   └── quiz.ts          # Types TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── CLAUDE.md                # Instructions pour l'IA
├── README.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Fonctionnalités

### Quiz Interactif
- Navigation fluide entre les questions
- Barre de progression visuelle
- Animations de transition (slide, fade)

### Calcul Intelligent
- Comptage des occurrences par lettre
- Gestion des égalités (priorité alphabétique)
- Résultat instantané

### Expérience Premium
- Animations Framer Motion sur chaque transition
- Effet confettis lors du résultat
- Design responsive (mobile-first)

### Accessibilité
- Composants Shadcn accessibles par défaut
- Navigation clavier complète
- Contraste et lisibilité optimisés

---

## Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Analyse le code avec ESLint |

---

## Déploiement

### Vercel (Recommandé)

1. Connectez votre repo GitHub à [Vercel](https://vercel.com)
2. Configuration automatique détectée
3. Déploiement en ~2 minutes

### Netlify

1. Connectez votre repo à [Netlify](https://netlify.com)
2. Build command : `npm run build`
3. Publish directory : `dist`

### Intégration Hostinger

Pour intégrer le quiz sur un site Hostinger, utilisez un bloc HTML :

```html
<iframe
  src="https://votre-app.vercel.app"
  width="100%"
  height="700px"
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
></iframe>
```

---

## Personnalisation

### Ajouter/Modifier des questions

Éditez le fichier `src/data/quizData.ts` :

```typescript
export const questions: Question[] = [
  {
    id: 1,
    text: "Votre question ici ?",
    options: [
      { label: "Option Pop", value: "A" },
      { label: "Option Japandi", value: "B" },
      // ...
    ]
  },
];
```

### Modifier les résultats

```typescript
export const styleResults: Record<StyleLetter, StyleResult> = {
  A: {
    letter: "A",
    title: "Ambiance Pop",
    description: "Votre description personnalisée...",
    image: "/images/pop.jpg"
  },
  // ...
};
```

### Personnaliser le thème

Les composants Shadcn utilisent des CSS variables. Modifiez `src/index.css` :

```css
:root {
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  /* ... */
}
```

---

## Contribution

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Pushez (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

---

## Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Contact

**Maison Mojo** - Découvrez votre style intérieur

Fait avec React et beaucoup de style.
