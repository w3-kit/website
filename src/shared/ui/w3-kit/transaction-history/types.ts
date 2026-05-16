/* AUTO-GENERATED — mirrored from ui/registry/w3-kit/. Edit the source there. */
export interface Transaction {
  hash: string;
  type: "send" | "receive" | "swap" | "approve" | "contract";
  status: "success" | "pending" | "failed";
  value: string;
  tokenSymbol?: string;
  from: string;
  to: string;
  timestamp: number;
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
  onTransactionClick?: (transaction: Transaction) => void;
  className?: string;
}
