import { useState, useEffect, useMemo } from "react";
import { Store, ArrowUpDown, ShoppingCart, Check } from "lucide-react";
import { domainLogo } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { NFT_COLLECTIONS, preloadAllNFTImages, getCachedNFTImage } from "../../lib/nft-images";
import type { MarketplaceListing } from "../../lib/nft-images";

const ALL = NFT_COLLECTIONS.marketplace;
type Marketplace = "all" | "OpenSea" | "Blur" | "LooksRare";
type Sort = "price-asc" | "price-desc";

export function NFTMarketplacePreview() {
  useEffect(() => { preloadAllNFTImages(); }, []);

  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [market, setMarket] = useState<Marketplace>("all");
  const [sort, setSort] = useState<Sort>("price-asc");
  const [bought, setBought] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = market === "all" ? ALL : ALL.filter((l) => l.marketplace === market);
    return [...items].sort((a, b) =>
      sort === "price-asc"
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price),
    );
  }, [market, sort]);

  const bestId = filtered.length > 0
    ? filtered.reduce((b, l) => (parseFloat(l.price) < parseFloat(b.price) ? l : b), filtered[0]).id
    : null;

  const handleBuy = (id: string) => {
    setBought(id);
    setTimeout(() => setBought(null), 2000);
  };

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Store size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Marketplace</span>
          <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>{filtered.length}</span>
        </div>
        <button
          onClick={() => setSort(sort === "price-asc" ? "price-desc" : "price-asc")}
          style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, border: "1px solid var(--w3-border-subtle)", background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 500, color: "var(--w3-gray-600)" }}
        >
          <ArrowUpDown size={12} />
          {sort === "price-asc" ? "Low → High" : "High → Low"}
        </button>
      </div>

      {/* Marketplace filter */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid var(--w3-border-subtle)", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {(["all", "OpenSea", "Blur", "LooksRare"] as Marketplace[]).map((m) => (
          <button
            key={m}
            onClick={() => setMarket(m)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 8,
              border: "none",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              background: market === m ? "var(--w3-accent)" : "var(--w3-surface-elevated)",
              color: market === m ? "#fff" : "var(--w3-gray-600)",
              transition: "background 0.15s",
            }}
          >
            {m !== "all" && <img src={domainLogo(m === "OpenSea" ? "opensea.io" : m === "Blur" ? "blur.io" : "looksrare.org", 14)} alt="" width={12} height={12} style={{ borderRadius: 3, opacity: market === m ? 1 : 0.7 }} />}
            {m === "all" ? "All" : m}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {filtered.map((listing) => {
          const isBest = listing.id === bestId;
          const savings = listing.lastSale ? ((parseFloat(listing.lastSale) - parseFloat(listing.price)) / parseFloat(listing.lastSale) * 100) : null;
          const isBought = bought === listing.id;

          return (
            <div
              key={listing.id}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 12, transition: "background 0.15s", cursor: "default" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ position: "relative", width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "var(--w3-surface-elevated)" }}>
                <img
                  src={getCachedNFTImage(listing.image)}
                  alt={listing.name}
                  onLoad={() => setLoaded((p) => new Set(p).add(listing.id))}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded.has(listing.id) ? 1 : 0, transition: "opacity 0.3s" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block" }}>{listing.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 6px", borderRadius: 5, background: "var(--w3-accent-subtle)" }}>
                    <img src={domainLogo(listing.domain, 14)} alt="" width={12} height={12} style={{ borderRadius: 3 }} />
                    <span style={{ fontSize: 10, fontWeight: 500, color: "var(--w3-accent)" }}>{listing.marketplace}</span>
                  </div>
                  {savings !== null && savings > 0 && (
                    <span style={{ fontSize: 10, fontWeight: 500, color: "#16a34a" }}>
                      {savings.toFixed(0)}% below last
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {isBest && (
                      <span style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", padding: "2px 6px", borderRadius: 9999, background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>Best</span>
                    )}
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", fontFamily: monoFont }}>{listing.price} ETH</span>
                  </div>
                  {listing.lastSale && (
                    <span style={{ fontSize: 11, color: "var(--w3-gray-500)", fontFamily: monoFont }}>
                      Last: {listing.lastSale} ETH
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleBuy(listing.id)}
                  style={{
                    padding: 6,
                    borderRadius: 8,
                    border: "none",
                    background: isBought ? "rgba(22,163,74,0.1)" : "var(--w3-accent)",
                    color: isBought ? "#16a34a" : "#fff",
                    cursor: "pointer",
                    display: "flex",
                    transition: "background 0.2s",
                  }}
                >
                  {isBought ? <Check size={14} /> : <ShoppingCart size={14} />}
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", fontSize: 13, color: "var(--w3-gray-500)" }}>
            No listings on {market}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>
          {filtered.length} of {ALL.length} listings
        </span>
      </div>
    </div>
  );
}
