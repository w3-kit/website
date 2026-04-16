import { useState, useEffect, useMemo } from "react";
import { Grid3X3, ArrowUpDown } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { NFT_COLLECTIONS, preloadAllNFTImages, getCachedNFTImage } from "../../lib/nft-images";
import type { NFTItem } from "../../lib/nft-images";

const ALL_ITEMS = NFT_COLLECTIONS.nouns.items;

type Rarity = "all" | "common" | "rare" | "legendary";
type Sort = "price-asc" | "price-desc" | "id";

const RARITY_COLORS: Record<string, { bg: string; color: string }> = {
  common: { bg: "var(--w3-surface-elevated)", color: "var(--w3-gray-600)" },
  rare: { bg: "rgba(85,84,217,0.1)", color: "var(--w3-accent)" },
  legendary: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
};

export function NFTCollectionPreview() {
  useEffect(() => { preloadAllNFTImages(); }, []);

  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const [rarity, setRarity] = useState<Rarity>("all");
  const [sort, setSort] = useState<Sort>("price-desc");

  const filtered = useMemo(() => {
    let items = rarity === "all" ? ALL_ITEMS : ALL_ITEMS.filter((n) => n.rarity === rarity);

    if (sort === "price-asc") items = [...items].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sort === "price-desc") items = [...items].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

    return items;
  }, [rarity, sort]);

  const cycleSort = () => {
    setSort((s) => s === "price-desc" ? "price-asc" : s === "price-asc" ? "id" : "price-desc");
  };

  const sortLabel = sort === "price-desc" ? "Price ↓" : sort === "price-asc" ? "Price ↑" : "ID";

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Grid3X3 size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Nouns</span>
          <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{filtered.length}</span>
        </div>
        <button
          onClick={cycleSort}
          style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 500, color: "var(--w3-gray-600)" }}
        >
          <ArrowUpDown size={12} />
          {sortLabel}
        </button>
      </div>

      {/* Rarity filter */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--w3-border-subtle)", display: "flex", gap: 6 }}>
        {(["all", "common", "rare", "legendary"] as Rarity[]).map((r) => (
          <button
            key={r}
            onClick={() => setRarity(r)}
            style={{
              padding: "4px 10px",
              borderRadius: 8,
              border: "none",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              textTransform: "capitalize",
              background: rarity === r ? "var(--w3-accent)" : "var(--w3-surface-elevated)",
              color: rarity === r ? "#fff" : "var(--w3-gray-600)",
              transition: "background 0.15s",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map((nft) => (
          <div
            key={nft.id}
            style={{ cursor: "pointer", transition: "transform 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
          >
            <div style={{ position: "relative", aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: "var(--w3-surface-elevated)" }}>
              <img
                src={getCachedNFTImage(nft.image)}
                alt={nft.name}
                onLoad={() => setLoadedIds((prev) => new Set(prev).add(nft.id))}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loadedIds.has(nft.id) ? 1 : 0, transition: "opacity 0.3s" }}
              />
              {/* Rarity badge */}
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  padding: "2px 6px",
                  borderRadius: 5,
                  fontSize: 9,
                  fontWeight: 600,
                  textTransform: "capitalize",
                  background: RARITY_COLORS[nft.rarity].bg,
                  color: RARITY_COLORS[nft.rarity].color,
                  backdropFilter: "blur(4px)",
                }}
              >
                {nft.rarity}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--w3-gray-900)" }}>{nft.name}</span>
              <span style={{ fontSize: 12, color: "var(--w3-gray-600)", fontFamily: monoFont }}>{nft.price} ETH</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ gridColumn: "1 / -1", padding: 24, textAlign: "center", fontSize: 13, color: "var(--w3-gray-500)" }}>
            No items match filter
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {filtered.length} of {ALL_ITEMS.length} items
        </span>
      </div>
    </div>
  );
}
