export const CATEGORIES = ['books', 'movies', 'thoughts', 'research', 'product'] as const;
export type Category = (typeof CATEGORIES)[number];
