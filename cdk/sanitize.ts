export const sanitize = (s: string): string => s.replace(/[^a-z0-9-]/g, '')
