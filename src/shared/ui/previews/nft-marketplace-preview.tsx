import { useState } from "react";
import { Store } from "lucide-react";
import { domainLogo } from "../../lib/logos";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { AZUKI } from "../../lib/nft-images";

const LISTINGS = [
  { id: "1", name: "Azuki #4209", collection: "Azuki", marketplace: "Blur", domain: "blur.io", image: AZUKI["4209"], price: "6.8" },
  { id: "2", name: "Azuki #7712", collection: "Azuki", marketplace: "OpenSea", domain: "opensea.io", image: AZUKI["7712"], price: "7.2" },
  { id: "3", name: "Azuki #1033", collection: "Azuki", marketplace: "Blur", domain: "blur.io", image: AZUKI["1033"], price: "7.5" },
];

const bestId = LISTINGS.reduce((b, l) => (parseFloat(l.price) < parseFloat(b.price) ? l : b), LISTINGS[0]).id;

export function NFTMarketplacePreview() {
  const [loaded, setLoaded] = useState<Set<string>>(new Set());

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Store size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>Marketplace</span>
        </div>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {LISTINGS.map((listing) => (
          <div
            key={listing.id}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 12, transition: "background 0.15s", cursor: "default" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--w3-accent-subtle)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            {/* NFT thumbnail */}
            <div style={{ position: "relative", width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
              <img
                src={listing.image}
                alt={listing.name}
                onLoad={() => setLoaded((p) => new Set(p).add(listing.id))}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded.has(listing.id) ? 1 : 0, transition: "opacity 0.3s" }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {listing.name}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 13, color: "var(--w3-gray-600)" }}>{listing.collection}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 6px", borderRadius: 5, background: "var(--w3-accent-subtle)" }}>
                  <img src={domainLogo(listing.domain, 14)} alt="" width={12} height={12} style={{ borderRadius: 3 }} />
                  <span style={{ fontSize: 10, fontWeight: 500, color: "var(--w3-accent)" }}>{listing.marketplace}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              {listing.id === bestId && (
                <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", padding: "2px 8px", borderRadius: 9999, background: "rgba(22,163,74,0.1)", color: "#16a34a" }}>
                  Best
                </span>
              )}
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)", fontFamily: monoFont }}>{listing.price} ETH</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>3 listings</span>
      </div>
    </div>
  );
}
