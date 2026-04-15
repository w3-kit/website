import { useState } from "react";
import { BadgeCheck, ImageOff } from "lucide-react";

interface Listing {
  id: string;
  name: string;
  collection: string;
  marketplace: string;
  image: string;
  price: string;
  currency: string;
  usdPrice: number;
  verified: boolean;
}

const LISTINGS: Listing[] = [
  {
    id: "1",
    name: "Azuki #4209",
    collection: "Azuki",
    marketplace: "Blur",
    image: "https://i.seadn.io/gcs/files/3c3b01256a9bfc1e8fec0573a8c3ba99.png?auto=format&w=256",
    price: "6.8",
    currency: "ETH",
    usdPrice: 18_360,
    verified: true,
  },
  {
    id: "2",
    name: "Azuki #7712",
    collection: "Azuki",
    marketplace: "OpenSea",
    image: "https://i.seadn.io/gcs/files/e2a58f043be1a2f0c27a0e97b1e75826.png?auto=format&w=256",
    price: "7.2",
    currency: "ETH",
    usdPrice: 19_440,
    verified: true,
  },
  {
    id: "3",
    name: "Azuki #1033",
    collection: "Azuki",
    marketplace: "Blur",
    image: "https://i.seadn.io/gcs/files/6d2a14f4e818cd8e84a4e99ab03aa97d.png?auto=format&w=256",
    price: "7.5",
    currency: "ETH",
    usdPrice: 20_250,
    verified: true,
  },
];

function fmtUsd(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

export function NFTMarketplacePreview() {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  const bestId = LISTINGS.reduce((b, l) => (l.usdPrice < b.usdPrice ? l : b), LISTINGS[0]).id;

  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--w3-border-subtle)",
        background: "var(--w3-surface-elevated)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--w3-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--w3-gray-500)",
            margin: 0,
          }}
        >
          NFT Marketplace
        </p>
        <span
          style={{
            fontSize: 11,
            color: "var(--w3-gray-500)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {LISTINGS.length} listings
        </span>
      </div>

      {/* Listings */}
      {LISTINGS.map((listing, i) => {
        const isBest = listing.id === bestId;

        return (
          <div
            key={listing.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 16px",
              borderBottom: i < LISTINGS.length - 1 ? "1px solid var(--w3-border-subtle)" : "none",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "var(--w3-glass-inner-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                overflow: "hidden",
                background: "var(--w3-glass-inner-bg)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {imgErrors.has(listing.id) ? (
                <ImageOff size={14} style={{ color: "var(--w3-gray-400)" }} />
              ) : (
                <img
                  src={listing.image}
                  alt={listing.name}
                  loading="lazy"
                  onError={() => setImgErrors((p) => new Set(p).add(listing.id))}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {listing.name}
                </span>
                {listing.verified && (
                  <BadgeCheck size={13} style={{ color: "#3b82f6", flexShrink: 0 }} />
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 11, color: "var(--w3-gray-500)" }}>
                  {listing.collection}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: "var(--w3-glass-inner-bg)",
                    color: "var(--w3-gray-600)",
                  }}
                >
                  {listing.marketplace}
                </span>
              </div>
            </div>

            {/* Price */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                {isBest && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "2px 6px",
                      borderRadius: 9999,
                      background: "rgba(22, 163, 74, 0.1)",
                      color: "#16a34a",
                    }}
                  >
                    Best
                  </span>
                )}
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--w3-gray-900)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {listing.price} {listing.currency}
                </span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--w3-gray-500)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmtUsd(listing.usdPrice)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
