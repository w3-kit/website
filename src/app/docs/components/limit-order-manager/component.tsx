import React, { useState } from "react";
import { TrendingDown, TrendingUp, Check, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
  orders: initialOrders,
  onOrderCreate,
  onOrderCancel,
  className = "",
}) => {
  const [orders, setOrders] = useState<OrderData[]>(initialOrders);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [orderType, setOrderType] = useState<"limit" | "stop-loss">("limit");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const [errors, setErrors] = useState<{
    amount?: string;
    price?: string;
    expiry?: string;
  }>({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!price || parseFloat(price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (expiry && (parseInt(expiry) <= 0 || parseInt(expiry) > 30)) {
      newErrors.expiry = "Expiry must be between 1 and 30 days";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) return;

    setIsCreating(true);
    try {
      const newOrder: OrderData = {
        id: Date.now().toString(),
        type: orderType,
        token: {
          symbol: "ETH",
          logoURI: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
          price: 2845.67,
        },
        amount,
        price,
        status: "active",
        timestamp: Date.now(),
        expiry: expiry ? Date.now() + parseInt(expiry) * 24 * 60 * 60 * 1000 : undefined,
      };

      setOrders(prev => [...prev, newOrder]);
      await onOrderCreate?.({
        type: orderType,
        token: newOrder.token,
        amount,
        price,
        status: "active",
        expiry: newOrder.expiry,
      });

      // Show loading for 1 second before success
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success animation
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form and close modal
        setAmount("");
        setPrice("");
        setExpiry("");
        setErrors({});
        setShowCreateOrder(false);
      }, 1500);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancelClick = (orderId: string) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (orderToCancel) {
      setOrders(prev => prev.map(order =>
        order.id === orderToCancel
          ? { ...order, status: "cancelled" }
          : order
      ));
      onOrderCancel?.(orderToCancel);
      setShowCancelModal(false);
      setOrderToCancel(null);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const getStatusColor = (status: OrderData["status"]) => {
    switch (status) {
      case "active":
        return "text-success";
      case "executed":
        return "text-primary";
      case "cancelled":
        return "text-destructive";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <h2 className="text-lg font-semibold text-foreground">Limit Orders</h2>
        <Button onClick={() => setShowCreateOrder(!showCreateOrder)}>
          Create Order
        </Button>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Create Order Form with Transitions */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            showCreateOrder
              ? "opacity-100 max-h-[1000px] mb-6"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <Card className="bg-muted">
            <CardContent className="p-4">
              <div className="flex space-x-2 mb-4">
                <Button
                  onClick={() => setOrderType("limit")}
                  variant={orderType === "limit" ? "default" : "secondary"}
                >
                  Limit Order
                </Button>
                <Button
                  onClick={() => setOrderType("stop-loss")}
                  variant={orderType === "stop-loss" ? "default" : "secondary"}
                >
                  Stop Loss
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Amount
                  </label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={errors.amount ? "border-red-500" : ""}
                    placeholder="0.0"
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-destructive">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Price
                  </label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={errors.price ? "border-red-500" : ""}
                    placeholder="0.0"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-destructive">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Expiry (days)
                  </label>
                  <Input
                    type="number"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className={errors.expiry ? "border-red-500" : ""}
                    placeholder="Optional"
                  />
                  {errors.expiry && (
                    <p className="mt-1 text-sm text-destructive">{errors.expiry}</p>
                  )}
                </div>

                <Button
                  onClick={handleCreateOrder}
                  disabled={isCreating || showSuccess}
                  className="w-full flex items-center justify-center relative"
                >
                  {isCreating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating Order...
                    </>
                  ) : showSuccess ? (
                    <>
                      <Check className="w-5 h-5 mr-2 animate-scale-in" />
                      Order Created!
                    </>
                  ) : (
                    "Create Order"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          {orders.map((order) => (
            <Card key={order.id} className="bg-muted group">
              <CardContent className="flex items-center justify-between p-4">
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
                      <TrendingDown className="absolute -top-1 -right-1 w-4 h-4 text-destructive" />
                    ) : (
                      <TrendingUp className="absolute -top-1 -right-1 w-4 h-4 text-success" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {order.amount} {order.token.symbol}
                    </div>
                    <div className="text-sm text-muted-foreground">
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
                  {order.status === "active" ? (
                    <Button
                      onClick={() => handleCancelClick(order.id)}
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleDeleteOrder(order.id)}
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      title="Delete order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-overlay/50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Confirm Cancellation
              </h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setShowCancelModal(false)}
                  variant="ghost"
                >
                  No, Keep Order
                </Button>
                <Button
                  onClick={handleConfirmCancel}
                  variant="destructive"
                >
                  Yes, Cancel Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
};
