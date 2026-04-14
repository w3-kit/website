import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Shield,
  AlertTriangle,
  Check,
  X,
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { Card, CardContent } from "../../../../shared/ui/card";
import { ContractError, ContractInfo, SmartContractScannerProps } from "./types";
import { isValidAddress, getStatusColor, getCodePreview, copyToClipboard } from "./utils";

const mockContractData: Omit<ContractInfo, "address"> = {
  name: "Example Token",
  network: "Ethereum Mainnet",
  verified: true,
  license: "MIT",
  compiler: "v0.8.17+commit.8df45f5f",
  securityScore: 85,
  checks: [
    {
      id: "1",
      name: "Reentrancy Guard",
      status: "safe",
      description: "Contract is protected against reentrancy attacks",
    },
    {
      id: "2",
      name: "Access Control",
      status: "warning",
      description: "Owner has significant privileges",
    },
  ],
  functions: [
    {
      name: "balanceOf",
      type: "read",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ type: "uint256" }],
      stateMutability: "view",
    },
    {
      name: "transfer",
      type: "write",
      inputs: [
        { name: "to", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ type: "bool" }],
      stateMutability: "nonpayable",
    },
  ],
  sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Example Token
 * @dev A simple ERC20 token with additional security features
 */
contract ExampleToken is ERC20, Ownable, ReentrancyGuard {
    uint256 private _maxSupply;
    mapping(address => bool) private _blacklisted;

    event AddressBlacklisted(address indexed account);
    event AddressUnblacklisted(address indexed account);

    constructor() ERC20("Example Token", "EXT") {
        _maxSupply = 1000000000 * 10**decimals();
        _mint(msg.sender, 100000000 * 10**decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= _maxSupply, "Exceeds max supply");
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override nonReentrant {
        require(!_blacklisted[from] && !_blacklisted[to], "Blacklisted address");
        super._beforeTokenTransfer(from, to, amount);
    }
}`,
};

export const SmartContractScanner: React.FC<SmartContractScannerProps> = ({
  className = "",
  variant = "default",
  onScan,
  onError,
}) => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "functions" | "code">("overview");
  const [error, setError] = useState<ContractError | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const codePreviewRef = useRef<HTMLDivElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    setValidationError(null);
    setError(null);

    if (value && !isValidAddress(value)) {
      setValidationError(
        "Please enter a valid Ethereum address (0x followed by 40 hex characters)",
      );
    }
  };

  const handleScan = async () => {
    if (!address) return;

    if (!isValidAddress(address)) {
      const errorMsg = ContractError.INVALID_ADDRESS;
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);
    setValidationError(null);

    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1500);
      });

      onScan?.(address);

      setContractInfo({
        ...mockContractData,
        address: address,
      });
    } catch {
      setError(ContractError.UNKNOWN);
      onError?.(ContractError.UNKNOWN);
      setContractInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    copyToClipboard(text)
      .then(() => {
        setCopySuccess(true);
        clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if (variant === "compact") {
    return (
      <Card className={className}>
        <CardContent className="space-y-4 pt-6">
          <div className="relative">
            <Input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter contract address"
              className={`pl-10 ${validationError ? "border-destructive" : ""}`}
              disabled={isLoading}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          {validationError && <p className="text-sm text-destructive">{validationError}</p>}

          <Button
            onClick={handleScan}
            disabled={!address || isLoading || !!validationError}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Scanning...</span>
              </div>
            ) : (
              "Scan Contract"
            )}
          </Button>

          {error && (
            <div className="flex items-start space-x-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {contractInfo && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Security Score</span>
                <span
                  className={`text-sm font-medium ${
                    contractInfo.securityScore >= 80
                      ? "text-green-500"
                      : contractInfo.securityScore >= 60
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {contractInfo.securityScore}/100
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                {contractInfo.checks.length} security checks completed
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-3 pb-3">
        <div className="relative">
          <Input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter contract address (0x...)"
            className={`pl-10 ${validationError ? "border-destructive" : ""}`}
            style={{
              background: "var(--w3-gray-200)",
              border: "1px solid var(--w3-border-standard)",
              color: "var(--w3-gray-900)",
            }}
            disabled={isLoading}
          />
          <Search
            className="absolute left-3 top-2.5 h-4 w-4"
            style={{ color: "var(--w3-gray-500)" }}
          />
        </div>

        {validationError && <p className="text-xs text-destructive">{validationError}</p>}

        <Button
          onClick={handleScan}
          disabled={!address || isLoading || !!validationError}
          className="w-full"
          size="sm"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Scanning...</span>
            </div>
          ) : (
            "Scan Contract"
          )}
        </Button>

        {error && (
          <div
            className="flex items-start gap-2 rounded-lg p-3"
            style={{ background: "var(--w3-glass-inner-bg)" }}
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}
      </div>

      {contractInfo && (
        <div>
          {/* Tabs */}
          <div className="flex gap-1 pb-3">
            {(["overview", "functions", "code"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-md px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  background: activeTab === tab ? "var(--w3-accent)" : "var(--w3-glass-inner-bg)",
                  color: activeTab === tab ? "#fff" : "var(--w3-gray-600)",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="max-h-[320px] overflow-y-auto pb-2">
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* Score + status row */}
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                      Score
                    </span>
                    <div className="flex items-baseline gap-0.5">
                      <span
                        className={`text-2xl font-bold ${
                          contractInfo.securityScore >= 80
                            ? "text-green-500"
                            : contractInfo.securityScore >= 60
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {contractInfo.securityScore}
                      </span>
                      <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                        /100
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                      Status
                    </span>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      {contractInfo.verified ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500" />
                      )}
                      <span className="text-sm" style={{ color: "var(--w3-gray-900)" }}>
                        {contractInfo.verified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                      Network
                    </span>
                    <p className="mt-0.5 text-sm" style={{ color: "var(--w3-gray-900)" }}>
                      {contractInfo.network}
                    </p>
                  </div>
                </div>

                {/* Contract info */}
                <div className="rounded-lg p-3" style={{ background: "var(--w3-glass-inner-bg)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                        {contractInfo.name}
                      </span>
                      <p
                        className="max-w-[280px] truncate text-xs font-mono"
                        style={{ color: "var(--w3-gray-700)" }}
                      >
                        {contractInfo.address}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleCopyToClipboard(contractInfo.address)}
                      variant="ghost"
                      size="icon-xs"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Security checks */}
                <div className="space-y-2">
                  <span className="text-xs font-medium" style={{ color: "var(--w3-gray-900)" }}>
                    Security Checks
                  </span>
                  {contractInfo.checks.map((check) => (
                    <div
                      key={check.id}
                      className="flex items-start justify-between rounded-lg p-3"
                      style={{ background: "var(--w3-glass-inner-bg)" }}
                    >
                      <div className="flex items-start gap-2">
                        {check.status === "safe" ? (
                          <Shield
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${getStatusColor(check.status)}`}
                          />
                        ) : (
                          <AlertTriangle
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${getStatusColor(check.status)}`}
                          />
                        )}
                        <div>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--w3-gray-900)" }}
                          >
                            {check.name}
                          </span>
                          <p className="text-xs" style={{ color: "var(--w3-gray-500)" }}>
                            {check.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-[10px] font-semibold uppercase ${getStatusColor(check.status)}`}
                      >
                        {check.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "functions" && (
              <div className="space-y-2">
                {contractInfo.functions.map((func, index) => (
                  <div
                    key={`${func.name}-${index}`}
                    className="rounded-lg p-3"
                    style={{ background: "var(--w3-glass-inner-bg)" }}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            func.type === "read"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {func.type.toUpperCase()}
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--w3-gray-900)" }}
                        >
                          {func.name}
                        </span>
                      </div>
                      <span className="text-[10px]" style={{ color: "var(--w3-gray-500)" }}>
                        {func.stateMutability}
                      </span>
                    </div>

                    <div
                      className="space-y-1 text-xs"
                      style={{
                        color: "var(--w3-gray-600)",
                        fontFamily: '"Geist Mono", ui-monospace, monospace',
                      }}
                    >
                      {func.inputs.length > 0 && (
                        <div>
                          ({func.inputs.map((input) => `${input.name}: ${input.type}`).join(", ")})
                        </div>
                      )}
                      <div>→ {func.outputs.map((output) => output.type).join(", ")}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "code" && contractInfo.sourceCode && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyToClipboard(contractInfo.sourceCode!)}
                    className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors"
                    style={{
                      background: "var(--w3-glass-inner-bg)",
                      color: copySuccess ? "var(--w3-accent)" : "var(--w3-gray-600)",
                    }}
                  >
                    {copySuccess ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copySuccess ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={`https://etherscan.io/address/${contractInfo.address}#code`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors"
                    style={{ background: "var(--w3-glass-inner-bg)", color: "var(--w3-gray-600)" }}
                  >
                    <ExternalLink className="h-3 w-3" />
                    Etherscan
                  </a>
                </div>

                <div className="relative">
                  <div
                    ref={codePreviewRef}
                    className={`overflow-x-auto rounded-lg p-3 text-[11px] leading-relaxed ${
                      !expandedCode
                        ? "max-h-[200px] overflow-y-hidden"
                        : "max-h-[400px] overflow-y-auto"
                    }`}
                    style={{
                      background: "var(--w3-glass-inner-bg)",
                      fontFamily: '"Geist Mono", ui-monospace, monospace',
                    }}
                  >
                    <pre className="whitespace-pre-wrap break-all">
                      <code style={{ color: "var(--w3-gray-900)" }}>
                        {expandedCode
                          ? contractInfo.sourceCode
                          : getCodePreview(contractInfo.sourceCode!, 10)}
                      </code>
                    </pre>
                  </div>

                  {!expandedCode && contractInfo.sourceCode!.split("\n").length > 10 && (
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 rounded-b-lg"
                      style={{
                        background: "linear-gradient(to top, var(--w3-gray-200), transparent)",
                      }}
                    />
                  )}

                  {contractInfo.sourceCode!.split("\n").length > 10 && (
                    <button
                      onClick={() => setExpandedCode(!expandedCode)}
                      className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-md py-1.5 text-xs font-medium transition-colors"
                      style={{
                        background: "var(--w3-glass-inner-bg)",
                        color: "var(--w3-gray-600)",
                      }}
                    >
                      {expandedCode ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" /> Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" /> More
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartContractScanner;
