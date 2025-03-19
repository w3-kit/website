import React, { useState } from "react";
import { CreditCard, Check, Loader2, AlertCircle, Sparkles, Zap, Shield, Star } from "lucide-react";
import Image from "next/image";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  token: {
    symbol: string;
    logoURI: string;
    decimals: number;
  };
  interval: "daily" | "weekly" | "monthly" | "yearly";
  features: string[];
  description: string;
  icon: "sparkles" | "zap" | "shield";
  isPopular?: boolean;
}

interface SubscriptionPaymentsProps {
  plans: SubscriptionPlan[];
  onSubscribe?: (planId: string) => void;
  className?: string;
}

export const SubscriptionPayments: React.FC<SubscriptionPaymentsProps> = ({
  plans,
  onSubscribe,
  className = "",
}) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(plans[0]?.id || "");

  // Ensure activeTab is always valid
  React.useEffect(() => {
    if (plans.length > 0 && !plans.some(plan => plan.id === activeTab)) {
      setActiveTab(plans[0].id);
    }
  }, [plans, activeTab]);

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    
    setIsSubscribing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await onSubscribe?.(selectedPlan.id);
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedPlan(null);
      }, 1500);
    } finally {
      setIsSubscribing(false);
    }
  };

  const getIcon = (icon: SubscriptionPlan["icon"]) => {
    switch (icon) {
      case "sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "zap":
        return <Zap className="w-6 h-6" />;
      case "shield":
        return <Shield className="w-6 h-6" />;
    }
  };

  const currentPlan = plans.find(plan => plan.id === activeTab);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${className}`}>
      <div className="space-y-6">
        {/* Plan Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(plan.id)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === plan.id
                  ? plan.isPopular
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {getIcon(plan.icon)}
              <span className="font-medium">{plan.name}</span>
              {plan.isPopular && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center shadow-sm">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Plan Content */}
        {currentPlan && (
          <div className="space-y-6">
            {/* Plan Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                {getIcon(currentPlan.icon)}
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {currentPlan.name}
                    </h3>
                    {currentPlan.isPopular && (
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {currentPlan.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={currentPlan.token.logoURI}
                  alt={currentPlan.token.symbol}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  /{currentPlan.interval}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing || showSuccess}
              className={`relative w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center overflow-hidden ${
                (isSubscribing || showSuccess) ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubscribing && (
                <div className="absolute inset-0 bg-blue-600 animate-subscribe-pulse" />
              )}
              {isSubscribing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span className="whitespace-nowrap">Subscribing...</span>
                </>
              ) : showSuccess ? (
                <>
                  <Check className="w-5 h-5 mr-2 animate-scale-in" />
                  <span className="whitespace-nowrap">Subscribed!</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">Subscribe Now</span>
                </>
              )}
            </button>

            {/* Warning Message */}
            <div className="flex flex-wrap items-center text-sm text-yellow-600 dark:text-yellow-400">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Subscriptions will automatically renew unless cancelled</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 