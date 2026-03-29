export const CATEGORIES = ['books', 'movies', 'thoughts'] as const;
export type Category = (typeof CATEGORIES)[number];
