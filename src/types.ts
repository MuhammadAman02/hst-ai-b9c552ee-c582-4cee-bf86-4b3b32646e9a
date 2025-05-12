export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  memberId: string;
  transactionId?: string;
}

export interface Transaction {
  id: string;
  memberName: string;
  memberId: string;
  amount: number;
  date: string;
  type: string;
  status: string;
  riskScore: number;
}

export interface Member {
  id: string;
  name: string;
  accountNumber: string;
  email: string;
  joinDate: string;
  lastActivity: string;
  riskScore: number;
}

export interface FraudMetrics {
  totalAlerts: number;
  alertsThisWeek: number;
  alertsLastWeek: number;
  highRiskAlerts: number;
  suspiciousTransactions: number;
  fraudulentAmount: number;
}