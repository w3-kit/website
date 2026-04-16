/**
 * Reliable NFT image URLs from permanent IPFS storage.
 * These are pinned on multiple gateways and will not expire.
 */

// BAYC — official IPFS CID: QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq
const BAYC_BASE = "https://cloudflare-ipfs.com/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq";

export const BAYC = {
  "7842": `${BAYC_BASE}/7842`,
  "3749": `${BAYC_BASE}/3749`,
  "8585": `${BAYC_BASE}/8585`,
  "7090": `${BAYC_BASE}/7090`,
  "4671": `${BAYC_BASE}/4671`,
};

// Azuki — official IPFS CID via Pinata
const AZUKI_BASE = "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg";

export const AZUKI = {
  "4209": `${AZUKI_BASE}/4209.png`,
  "7712": `${AZUKI_BASE}/7712.png`,
  "1033": `${AZUKI_BASE}/1033.png`,
};

// Doodles — official IPFS
const DOODLES_BASE = "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS";

export const DOODLES = {
  "1": `${DOODLES_BASE}/1`,
  "42": `${DOODLES_BASE}/42`,
  "100": `${DOODLES_BASE}/100`,
  "500": `${DOODLES_BASE}/500`,
};
