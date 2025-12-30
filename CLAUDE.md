# CLAUDE.md - Instructions pour le projet Maison Mojo

## Contexte du Projet

Quiz interactif de style déco permettant aux utilisateurs de découvrir leur ambiance intérieure parmi 11 styles (A à K). Le quiz calcule la lettre majoritaire parmi les réponses pour déterminer le profil déco de l'utilisateur.

## Stack Technique

- **Framework** : React + Vite + TypeScript
- **Styling** : Tailwind CSS
- **Composants UI** : Shadcn/ui
- **Animations** : Framer Motion (Motion)
- **Icônes** : Lucide React
- **Effets** : Canvas Confetti

---

## Bibliothèques - Guide d'utilisation

### 1. Shadcn/ui

**Important** : Ce n'est PAS une bibliothèque npm classique. Les composants sont copiés dans le projet et peuvent être personnalisés directement.

**Installation des composants** :
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add radio-group
```

**Emplacement** : `src/components/ui/`

**Import** :
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
```

**Personnalisation** : Modifier directement les fichiers dans `src/components/ui/` - pas besoin de surcharger les styles.

---

### 2. Framer Motion (Motion)

**Installation** :
```bash
npm install framer-motion
```

**Pattern pour transitions entre questions** :
```tsx
import { motion, AnimatePresence } from 'framer-motion';

// Wrapper obligatoire pour les animations de sortie
<AnimatePresence mode="wait">
  <motion.div
    key={currentQuestionIndex} // IMPORTANT: key unique pour chaque question
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {/* Contenu */}
  </motion.div>
</AnimatePresence>
```

**Props clés** :
- `initial` : État au montage
- `animate` : État cible
- `exit` : État à la suppression (nécessite AnimatePresence)
- `transition` : Configuration de l'animation
- `key` : OBLIGATOIRE pour AnimatePresence

**Variants pour animations complexes** :
```tsx
const questionVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

<motion.div
  variants={questionVariants}
  initial="enter"
  animate="center"
  exit="exit"
/>
```

---

### 3. Lucide React

**Installation** :
```bash
npm install lucide-react
```

**Usage** :
```tsx
import { CheckCircle, ArrowRight, ArrowLeft, Home, RotateCcw, ChevronRight } from 'lucide-react';

<CheckCircle size={24} color="green" strokeWidth={2} />
```

**Props disponibles** :
- `size` : number (défaut: 24)
- `color` : string (défaut: currentColor)
- `strokeWidth` : number (défaut: 2)
- `className` : pour styles Tailwind

**Icônes recommandées pour le quiz** :
- `ArrowRight`, `ArrowLeft` : Navigation
- `CheckCircle` : Réponse sélectionnée
- `Home` : Retour accueil
- `RotateCcw` : Recommencer
- `Sparkles` : Résultat

---

### 4. Canvas Confetti

**Installation** :
```bash
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti
```

**Usage pour célébration du résultat** :
```tsx
import confetti from 'canvas-confetti';

const celebrateResult = () => {
  // Effet simple
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// Effet feu d'artifice prolongé
const fireworksEffect = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 250);
};
```

**Alternative avec react-canvas-confetti** :
```bash
npm install react-canvas-confetti
```
```tsx
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

<Fireworks autorun={{ speed: 3 }} />
```

---

## Structure du Projet

```
src/
├── components/
│   ├── ui/              # Composants Shadcn (auto-générés)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── radio-group.tsx
│   ├── Quiz.tsx         # Composant principal du quiz
│   ├── Question.tsx     # Affichage d'une question
│   └── Result.tsx       # Affichage du résultat final
├── data/
│   └── quizData.ts      # Questions et mapping des résultats
├── types/
│   └── quiz.ts          # Types TypeScript
├── App.tsx
└── main.tsx
```

---

## Types TypeScript

```typescript
// types/quiz.ts

export type StyleLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K';

export interface Option {
  label: string;
  value: StyleLetter;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface StyleResult {
  letter: StyleLetter;
  title: string;
  description: string;
  image: string;
}
```

---

## Data Structure

```typescript
// data/quizData.ts

export const questions: Question[] = [
  {
    id: 1,
    text: "Quelle couleur domine votre intérieur idéal ?",
    options: [
      { label: "Rose vif et jaune", value: "A" },
      { label: "Beige et bois clair", value: "B" },
      { label: "Blanc cassé et taupe", value: "C" },
      // ...
    ]
  },
  // ... autres questions
];

export const styleResults: Record<StyleLetter, StyleResult> = {
  A: {
    letter: "A",
    title: "Ambiance Pop",
    description: "Vous aimez les couleurs vives et l'énergie !",
    image: "/images/pop.jpg"
  },
  B: {
    letter: "B",
    title: "Ambiance Japandi",
    description: "Minimalisme et nature sont vos maîtres mots.",
    image: "/images/japandi.jpg"
  },
  // C: Cocooning, D: Haussmannienne, etc. jusqu'à K
};
```

---

## Logique de Calcul du Résultat

```typescript
const calculateResult = (answers: StyleLetter[]): StyleLetter => {
  const counts: Record<StyleLetter, number> = {
    A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0
  };

  answers.forEach(letter => {
    counts[letter]++;
  });

  // Trouver la lettre majoritaire
  let maxCount = 0;
  let result: StyleLetter = 'A';

  (Object.keys(counts) as StyleLetter[]).forEach(letter => {
    if (counts[letter] > maxCount) {
      maxCount = counts[letter];
      result = letter;
    }
  });

  return result;
};
```

---

## Mapping des 11 Ambiances

| Lettre | Style |
|--------|-------|
| A | Ambiance Pop |
| B | Ambiance Japandi |
| C | Ambiance Cocooning |
| D | Ambiance Haussmannienne |
| E | Ambiance Industrielle |
| F | Ambiance Bohème |
| G | Ambiance Scandinave |
| H | Ambiance Art Déco |
| I | Ambiance Méditerranéenne |
| J | Ambiance Campagne Chic |
| K | Ambiance Contemporaine |

---

## Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Linting
npm run lint

# Ajouter un composant Shadcn
npx shadcn-ui@latest add [component-name]
```

---

## Bonnes Pratiques

1. **Animations** : Toujours utiliser `AnimatePresence` avec une `key` unique pour les transitions
2. **Composants Shadcn** : Personnaliser directement dans `src/components/ui/`
3. **Types** : Utiliser les types stricts pour les lettres (StyleLetter)
4. **Accessibilité** : Les composants Shadcn sont accessibles par défaut, ne pas casser ce comportement
5. **Performance** : Lazy load des images de résultats si nombreuses

---

## Déploiement

- **Vercel** ou **Netlify** recommandés
- Build command : `npm run build`
- Output directory : `dist`
- Intégration iframe pour Hostinger :
```html
<iframe src="https://votre-url.vercel.app" width="100%" height="600px" frameborder="0"></iframe>
```
