export function formatAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
  
  export function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }
  
  export function formatEther(value: string): string {
    const num = Number(value) / 1e18;
    return num.toFixed(4);
  }
  
  export function getStatusColor(status: 'pending' | 'success' | 'failed'): string {
    switch (status) {
      case 'pending':
        return 'bg-warning-muted text-warning';
      case 'success':
        return 'bg-success-muted text-success';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-foreground';
    }
  } 