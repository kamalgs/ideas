export const CATEGORIES = ['books', 'movies', 'thoughts', 'research', 'product', 'investing', 'trading'] as const;
export type Category = (typeof CATEGORIES)[number];
