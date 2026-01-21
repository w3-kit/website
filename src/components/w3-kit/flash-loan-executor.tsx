import React, { useState } from "react";
import { ArrowUpDown, Loader2, Check, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface FlashLoanData {
  id: string;
  protocol: {
    name: string;
    logoURI: string;
    address: string;
  };
  token: {
    symbol: string;
    logoURI: string;
    decimals: number;
    address: string;
  };
  amount: string;
  profit: string;
  risk: "low" | "medium" | "high";
  status: "pending" | "executing" | "completed" | "failed";
  timestamp: number;
}

interface FlashLoanExecutorProps {
  protocols: {
    name: string;
    logoURI: string;
    address: string;
  }[];
  tokens: {
    symbol: string;
    logoURI: string;
    decimals: number;
    address: string;
  }[];
  onExecute?: (data: Omit<FlashLoanData, "id" | "timestamp">) => void;
  className?: string;
}

export const FlashLoanExecutor: React.FC<FlashLoanExecutorProps> = ({
  protocols,
  tokens,
  onExecute,
  className = "",
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState(protocols[0]);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [amount, setAmount] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    amount?: string;
    protocol?: string;
    token?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!selectedProtocol) {
      newErrors.protocol = "Please select a protocol";
    }

    if (!selectedToken) {
      newErrors.token = "Please select a token";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleExecute = async () => {
    if (!validateForm()) return;

    setIsExecuting(true);
    try {
      // Simulate flash loan execution
      await new Promise(resolve => setTimeout(resolve, 1000));

      const flashLoanData: Omit<FlashLoanData, "id" | "timestamp"> = {
        protocol: selectedProtocol,
        token: selectedToken,
        amount,
        profit: "0.05", // Example profit in ETH
        risk: "medium",
        status: "completed",
      };

      await onExecute?.(flashLoanData);

      // Show success animation
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAmount("");
      }, 1500);
    } finally {
      setIsExecuting(false);
    }
  };

  const getRiskColor = (risk: FlashLoanData["risk"]) => {
    switch (risk) {
      case "low":
        return "text-green-500 dark:text-green-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "high":
        return "text-red-500 dark:text-red-400";
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Protocol
          </label>
          <div className="flex flex-wrap gap-2">
            {protocols.map((protocol) => (
              <Button
                key={protocol.address}
                onClick={() => setSelectedProtocol(protocol)}
                variant={selectedProtocol.address === protocol.address ? "default" : "outline"}
                className="flex items-center space-x-2 flex-1 min-w-[120px]"
              >
                <Image
                  src={protocol.logoURI}
                  alt={protocol.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">
                  {protocol.name}
                </span>
              </Button>
            ))}
          </div>
          {errors.protocol && (
            <p className="mt-1 text-sm text-red-500">{errors.protocol}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Token
          </label>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token) => (
              <Button
                key={token.address}
                onClick={() => setSelectedToken(token)}
                variant={selectedToken.address === token.address ? "default" : "outline"}
                className="flex items-center space-x-2 flex-1 min-w-[120px]"
              >
                <Image
                  src={token.logoURI}
                  alt={token.symbol}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">
                  {token.symbol}
                </span>
              </Button>
            ))}
          </div>
          {errors.token && (
            <p className="mt-1 text-sm text-red-500">{errors.token}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Amount
          </label>
          <div className="relative">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={errors.amount ? "border-red-500" : ""}
              placeholder="0.0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Image
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
          )}
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Estimated Profit</span>
              <span className="text-sm font-medium text-green-500">+0.05 ETH</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">Risk Level</span>
              <span className={`text-sm font-medium ${getRiskColor("medium")}`}>Medium</span>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleExecute}
          disabled={isExecuting || showSuccess}
          className="w-full"
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span className="whitespace-nowrap">Executing Flash Loan...</span>
            </>
          ) : showSuccess ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">Flash Loan Executed!</span>
            </>
          ) : (
            <>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">Execute Flash Loan</span>
            </>
          )}
        </Button>

        <div className="flex flex-wrap items-center text-sm text-yellow-600 dark:text-yellow-400 gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Make sure you have enough collateral to cover the flash loan fee</span>
        </div>
      </CardContent>
    </Card>
  );
};
