import { useState } from "react";
import { Image } from "lucide-react";
import { previewCard, previewHeader, monoFont } from "./_shared";
import { NOUNS } from "../../lib/nft-images";

export function NFTCardPreview() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ ...previewCard, maxWidth: 400, width: "100%", margin: "0 auto" }}>
      <div style={{ ...previewHeader }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image size={18} style={{ color: "var(--w3-accent)" }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--w3-gray-900)" }}>NFT</span>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--w3-border-subtle)" }}>
          <div style={{ position: "relative", aspectRatio: "1", background: "var(--w3-surface-elevated)" }}>
            <img
              src={NOUNS["42"]}
              alt="Noun #42"
              onLoad={() => setLoaded(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
            />
            <div style={{ position: "absolute", top: 10, left: 10, padding: "4px 10px", borderRadius: 8, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>
              Nouns
            </div>
          </div>

          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--w3-gray-900)" }}>Noun #42</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--w3-gray-900)", fontFamily: monoFont }}>38.2 ETH</span>
              <span style={{ fontSize: 13, color: "var(--w3-gray-600)", fontFamily: monoFont }}>0x1a2B...9fC4</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 20px", borderTop: "1px solid var(--w3-border-subtle)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--w3-gray-500)" }}>Nouns Collection</span>
      </div>
    </div>
  );
}
