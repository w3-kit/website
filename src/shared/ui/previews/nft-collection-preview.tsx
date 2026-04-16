import { useState } from "react";
import { Grid3X3 } from "lucide-react";
import { previewCard, previewHeader } from "./_shared";
import { NFT_COLLECTIONS } from "../../lib/nft-images";

const NFTS = NFT_COLLECTIONS.nouns.items;

export function NFTCollectionPreview() {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Grid3X3 size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Nouns</span>
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
            <div style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: "var(--w3-surface-elevated)" }}>
              <img
                src={nft.image}
                alt={nft.name}
                onLoad={() => setLoadedIds((prev) => new Set(prev).add(nft.id))}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loadedIds.has(nft.id) ? 1 : 0, transition: "opacity 0.3s" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>{nft.name}</span>
              <span style={{ fontSize: 12, color: "var(--w3-gray-600)" }}>{nft.price} ETH</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{NFTS.length} items</span>
      </div>
    </div>
  );
}
