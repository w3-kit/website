import { useState } from "react";
import { Check, Sparkles, Zap } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  icon: typeof Sparkles;
  price: string;
  token: string;
  priceUsd: string;
  interval: string;
  features: string[];
  isPopular: boolean;
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    icon: Sparkles,
    price: "5",
    token: "USDC",
    priceUsd: "5.00",
    interval: "month",
    features: ["100 API calls/day", "Basic analytics", "Email support"],
    isPopular: false,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    price: "20",
    token: "USDC",
    priceUsd: "20.00",
    interval: "month",
    features: [
      "Unlimited API calls",
      "Advanced analytics",
      "Priority support",
      "Custom webhooks",
    ],
    isPopular: true,
  },
];

export function SubscriptionPreview() {
  const [subscribing, setSubscribing] = useState<string | null>(null);

  const handleSubscribe = (planId: string) => {
    setSubscribing(planId);
    setTimeout(() => setSubscribing(null), 1500);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {PLANS.map((plan) => {
        const Icon = plan.icon;
        const isLoading = subscribing === plan.id;
        return (
          <div
            key={plan.id}
            style={{
              borderRadius: 12,
              border: plan.isPopular
                ? "1.5px solid var(--w3-gray-900)"
                : "1px solid var(--w3-border-subtle)",
              background: "var(--w3-surface-elevated)",
              padding: 14,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Popular badge */}
            {plan.isPopular && (
              <div
                style={{
                  position: "absolute",
                  top: -9,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: 8,
                    background: "var(--w3-gray-900)",
                    color: "var(--w3-gray-100)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Popular
                </span>
              </div>
            )}

            {/* Plan header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 10,
                marginTop: plan.isPopular ? 4 : 0,
              }}
            >
              <Icon
                size={14}
                style={{ color: "var(--w3-gray-500)" }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--w3-gray-900)",
                }}
              >
                {plan.name}
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                marginBottom: 2,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--w3-gray-900)",
                }}
              >
                {plan.price}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--w3-gray-500)",
                }}
              >
                {plan.token}/{plan.interval}
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--w3-gray-400)",
                fontVariantNumeric: "tabular-nums",
                marginBottom: 10,
              }}
            >
              ≈ ${plan.priceUsd} USD
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "var(--w3-border-subtle)",
                marginBottom: 10,
              }}
            />

            {/* Features */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                flex: 1,
                marginBottom: 12,
              }}
            >
              {plan.features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                >
                  <Check
                    size={12}
                    style={{
                      color: plan.isPopular
                        ? "var(--w3-gray-900)"
                        : "#22c55e",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--w3-gray-600)",
                      lineHeight: 1.3,
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Subscribe button */}
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "7px 12px",
                borderRadius: 8,
                border: plan.isPopular
                  ? "none"
                  : "1px solid var(--w3-border-subtle)",
                background: plan.isPopular
                  ? "var(--w3-gray-900)"
                  : "transparent",
                color: plan.isPopular
                  ? "var(--w3-gray-100)"
                  : "var(--w3-gray-700)",
                fontSize: 12,
                fontWeight: 500,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {isLoading ? "Processing..." : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
