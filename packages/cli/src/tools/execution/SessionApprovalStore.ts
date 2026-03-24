export interface SessionApprovalStore {
  has(signature: string): boolean;
  add(signature: string): void;
  clear(): void;
}

export class InMemorySessionApprovalStore implements SessionApprovalStore {
  private readonly approvals = new Set<string>();

  has(signature: string): boolean {
    return this.approvals.has(signature);
  }

  add(signature: string): void {
    this.approvals.add(signature);
  }

  clear(): void {
    this.approvals.clear();
  }
}
