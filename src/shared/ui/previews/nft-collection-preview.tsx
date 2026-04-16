import { useState } from "react";
import { Grid3X3 } from "lucide-react";
import { previewCard, previewHeader } from "./_shared";

const NFTS = [
  { id: "1", name: "BAYC #3749", image: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR0qKbTVt-OLCGMXSsqvbFGATgtZN-_5TT4UjBVTo6FVaUiVCaZRoNiAN5tA4XVw_Fs4YdVD-mEJA3rag?auto=format&w=200" },
  { id: "2", name: "BAYC #8585", image: "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYeFo0bgUvPR0GHQL5SQSP_S4EcmmU3YP1EL?auto=format&w=200" },
  { id: "3", name: "BAYC #7090", image: "https://i.seadn.io/gae/uJypMa6KLFcMT-FpZCqC5VxjLTMqSCim0TrkHCf5CoRGEMKjhQtBnXF0KBwjECRHW0WT2mwFf9RLfNXwShLnKPjz?auto=format&w=200" },
  { id: "4", name: "BAYC #4671", image: "https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewAIs3SeLGJhFjaMfxMmQRF-GvscVpkwjluJJgcE-MXJisnH3aryQ?auto=format&w=200" },
];

export function NFTCollectionPreview() {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Grid3X3 size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Collection</span>
          <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{NFTS.length}</span>
        </div>
      </div>

      <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {NFTS.map((nft) => (
          <div
            key={nft.id}
            style={{ cursor: "pointer", transition: "transform 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
          >
            <div style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <img
                src={nft.image}
                alt={nft.name}
                onLoad={() => setLoadedIds((prev) => new Set(prev).add(nft.id))}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: loadedIds.has(nft.id) ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
            <span style={{ display: "block", fontSize: 13, color: "var(--w3-gray-600)", marginTop: 6 }}>
              {nft.name}
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>4 items</span>
      </div>
    </div>
  );
}
