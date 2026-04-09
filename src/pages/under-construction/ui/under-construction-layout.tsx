import type { ReactNode } from "react";
import type { Section } from "../../../shared/lib/theme";
import { PageShell } from "../../../widgets/page-shell";

interface UnderConstructionLayoutProps {
  section: Section;
  title: string;
  description: string;
  animation?: ReactNode;
}

export function UnderConstructionLayout({
  section,
  title,
  description,
  animation,
}: UnderConstructionLayoutProps) {
  return (
    <PageShell section={section}>
      <div style={{ flex: 1, display: "flex" }} className="uc-main">
        <div
          className="uc-left"
          style={{
            flex: "0 0 40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px",
          }}
        >
          <h1 style={{ marginBottom: 12, color: "var(--w3-gray-900)" }}>{title}</h1>
          <p
            style={{
              fontSize: 16,
              color: "var(--w3-gray-700)",
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            {description}
          </p>
          <div
            style={{
              width: 60,
              height: 1,
              background: "linear-gradient(90deg, var(--w3-accent), transparent)",
              marginBottom: 24,
            }}
          />
          <span
            style={{
              display: "inline-block",
              fontSize: 13,
              color: "var(--w3-gray-700)",
              background: "var(--w3-gray-200)",
              padding: "6px 14px",
              borderRadius: 4,
              width: "fit-content",
              letterSpacing: "0.02em",
            }}
          >
            Under Construction
          </span>
        </div>

        <div
          className="uc-right"
          style={{
            flex: 1,
            borderLeft: "1px solid var(--w3-gray-300)",
            background: "var(--w3-gray-200)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {animation}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .uc-main {
            flex-direction: column !important;
          }
          .uc-left {
            flex: none !important;
            padding: 32px 24px !important;
          }
          .uc-right {
            flex: none !important;
            height: 300px !important;
            border-left: none !important;
            border-top: 1px solid var(--w3-gray-300) !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
