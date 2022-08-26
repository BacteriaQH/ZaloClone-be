export const deobfuscate = (cipher) => {
    const arr = cipher.split('').map((i) => {
        return Number(i);
    });
    return arr.toString().split(',NaN').join('').split(',').join('');
};
