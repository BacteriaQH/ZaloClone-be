export const obfuscate = (a, b) => (a.length ? [a[0], ...obfuscate(b, a.slice(1))] : b);
