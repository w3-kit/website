import { useState } from "react";
import { ImageOff } from "lucide-react";

const COLLECTION = {
  name: "Bored Ape Yacht Club",
  items: [
    { id: "1", name: "BAYC #3749", image: "https://i.seadn.io/gae/1PJXxzSE_URFH86YYxlyRBn5JOcBxRcEiGsm_pJVETHCz0ckeSkDBFiYOFGeBgJSPQOXdK0JT_sE-MdCOE6d_CVfdjrV0Y_mqJhS?auto=format&w=256" },
    { id: "2", name: "BAYC #8585", image: "https://i.seadn.io/gae/jW1FlhFMnPTPVSbXiJJwME_-xMB3EYN-Bab33wJmm8BQYW3gVpZezWAGmAdpHJa42_k5M_cPjJLEWGBjpf7BYYXE5kJecsF8cLU0Dg?auto=format&w=256" },
    { id: "3", name: "BAYC #7090", image: "https://i.seadn.io/gae/C65IrDW-JiuW77oarxvgpNI9cA30H16qP6Vg8xASdJrnNKEMi6sOpuwace8GrL_JJf_GlbfOBVPJXL-_SSmquFyHAjE0D-Q7Uwp3mA?auto=format&w=256" },
    { id: "4", name: "BAYC #4671", image: "https://i.seadn.io/gae/cJhff_kZQrmC5b8Pz7VLbG-sMTWnxJJjkEK3LzojRFnIQK5dSZ_dfPCIBk5dwRQCSufNwwB9IjUnTOPVt6iI31gPyitFyb3MYB4JdA?auto=format&w=256" },
  ],
};

export function NFTCollectionPreview() {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  const handleError = (id: string) => {
    setImgErrors((prev) => new Set(prev).add(id));
  };

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
          {COLLECTION.name}
        </p>
        <span
          style={{
            fontSize: 11,
            color: "var(--w3-gray-500)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {COLLECTION.items.length} items
        </span>
      </div>

      {/* 2x2 grid */}
      <div
        style={{
          padding: 12,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {COLLECTION.items.map((nft) => (
          <div
            key={nft.id}
            style={{
              borderRadius: 10,
              overflow: "hidden",
              background: "var(--w3-glass-inner-bg)",
              border: "1px solid var(--w3-border-subtle)",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "none";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div
              style={{
                aspectRatio: "1",
                background: "var(--w3-glass-inner-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {imgErrors.has(nft.id) ? (
                <ImageOff size={20} style={{ color: "var(--w3-gray-400)" }} />
              ) : (
                <img
                  src={nft.image}
                  alt={nft.name}
                  loading="lazy"
                  onError={() => handleError(nft.id)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div style={{ padding: "6px 8px" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--w3-gray-900)",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {nft.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
