import React, { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";

export interface OrderData {
  id: string;
  type: "limit" | "stop-loss";
  token: {
    symbol: string;
    logoURI: string;
    price: number;
  };
  amount: string;
  price: string;
  status: "active" | "executed" | "cancelled";
  timestamp: number;
  expiry?: number;
}

interface LimitOrderManagerProps {
  orders: OrderData[];
  onOrderCreate?: (order: Omit<OrderData, "id" | "timestamp">) => void;
  onOrderCancel?: (orderId: string) => void;
  className?: string;
}

export const LimitOrderManager: React.FC<LimitOrderManagerProps> = ({
  orders,
  onOrderCreate,
  onOrderCancel,
  className = "",
}) => {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [orderType, setOrderType] = useState<"limit" | "stop-loss">("limit");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleCreateOrder = () => {
    if (!amount || !price) return;
    
    onOrderCreate?.({
      type: orderType,
      token: {
        symbol: "ETH",
        logoURI: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        price: 2845.67,
      },
      amount,
      price,
      status: "active",
      expiry: expiry ? Date.now() + parseInt(expiry) * 24 * 60 * 60 * 1000 : undefined,
    });

    // Reset form
    setAmount("");
    setPrice("");
    setExpiry("");
    setShowCreateOrder(false);
  };

  const getStatusColor = (status: OrderData["status"]) => {
    switch (status) {
      case "active":
        return "text-green-500 dark:text-green-400";
      case "executed":
        return "text-blue-500 dark:text-blue-400";
      case "cancelled":
        return "text-red-500 dark:text-red-400";
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Limit Orders</h2>
        <button
          onClick={() => setShowCreateOrder(!showCreateOrder)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Order
        </button>
      </div>

      {showCreateOrder && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setOrderType("limit")}
              className={`px-4 py-2 rounded-lg ${
                orderType === "limit"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              Limit Order
            </button>
            <button
              onClick={() => setOrderType("stop-loss")}
              className={`px-4 py-2 rounded-lg ${
                orderType === "stop-loss"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              Stop Loss
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expiry (days)
              </label>
              <input
                type="number"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="Optional"
              />
            </div>

            <button
              onClick={handleCreateOrder}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Order
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={order.token.logoURI}
                  alt={order.token.symbol}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                {order.type === "stop-loss" ? (
                  <TrendingDown className="absolute -top-1 -right-1 w-4 h-4 text-red-500" />
                ) : (
                  <TrendingUp className="absolute -top-1 -right-1 w-4 h-4 text-green-500" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {order.amount} {order.token.symbol}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {order.type === "limit" ? "Limit" : "Stop Loss"} @ ${order.price}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className={`font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <button
                onClick={() => onOrderCancel?.(order.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
