/* AUTO-GENERATED — mirrored from ui/registry/w3-kit/. Edit the source there. */
export interface ENSResult {
  address?: string;
  ensName?: string;
  avatar?: string;
}

export interface ENSResolverProps {
  onResolve?: (result: ENSResult) => void;
  resolver?: (input: string) => Promise<ENSResult>;
  className?: string;
}
