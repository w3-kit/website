const MAX_SEED = 0xffffff;

/** A fresh page. The seed goes in the address, so the page can be shared as it is. */
export const randomSeed = () => Math.floor(Math.random() * MAX_SEED);
