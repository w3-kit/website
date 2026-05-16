/* AUTO-GENERATED — mirrored from ui/registry/w3-kit/. Edit the source there. */
export interface Airdrop {
  id: string;
  token: string;
  amount: string;
  status: "active" | "claimed" | "expired";
  startDate: string;
  endDate: string;
}

export interface TokenAirdropProps {
  airdrops: Airdrop[];
  onClaim?: (airdropId: string) => void;
  claimingId?: string;
  className?: string;
}
