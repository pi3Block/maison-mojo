import type { StyleLetter } from '@/types/quiz';
import { styleLetters } from '@/data/results';

export interface QuizResults {
  primary: StyleLetter;
  secondary: StyleLetter[];
  distribution: Record<StyleLetter, number>;
}

export function calculateResult(answers: StyleLetter[]): StyleLetter {
  const counts = getAnswerDistribution(answers);

  // Trouver la lettre majoritaire
  let maxCount = 0;
  let result: StyleLetter = 'A';

  styleLetters.forEach(letter => {
    if (counts[letter] > maxCount) {
      maxCount = counts[letter];
      result = letter;
    }
  });

  return result;
}

export function calculateFullResults(answers: StyleLetter[]): QuizResults {
  const counts = getAnswerDistribution(answers);

  // Trier les lettres par nombre d'occurrences (décroissant)
  const sortedLetters = [...styleLetters].sort((a, b) => {
    const diff = counts[b] - counts[a];
    if (diff !== 0) return diff;
    // En cas d'égalité, ordre alphabétique
    return a.localeCompare(b);
  });

  // Le style principal est celui avec le plus de réponses
  const primary = sortedLetters[0];

  // Les styles secondaires sont ceux avec le moins de réponses (mais > 0)
  // On prend les 2 derniers styles qui ont au moins 1 réponse
  const answeredStyles = sortedLetters.filter(letter => counts[letter] > 0);

  // Prendre les 2 styles les moins fréquents parmi ceux qui ont été choisis
  // (en excluant le style principal)
  const secondary: StyleLetter[] = [];

  if (answeredStyles.length > 1) {
    // On inverse pour prendre les moins fréquents
    const reversed = [...answeredStyles].reverse();
    for (const letter of reversed) {
      if (letter !== primary && secondary.length < 2) {
        secondary.push(letter);
      }
    }
  }

  return {
    primary,
    secondary,
    distribution: counts,
  };
}

export function getAnswerDistribution(answers: StyleLetter[]): Record<StyleLetter, number> {
  const counts: Record<StyleLetter, number> = {
    A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0
  };

  answers.forEach(letter => {
    counts[letter]++;
  });

  return counts;
}
