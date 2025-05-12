export type AlertSeverity = 'high' | 'medium' | 'low';

export interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: AlertSeverity;
  isRead: boolean;
}

export interface Transaction {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  type: string;
  status: 'normal' | 'suspicious' | 'flagged';
  riskScore: number;
  description: string;
}

export interface Member {
  id: string;
  name: string;
  accountNumber: string;
  riskScore: number;
  joinDate: string;
  lastActivity: string;
  recentTransactions: Transaction[];
}

export interface FraudMetrics {
  totalAlerts: number;
  highRiskAlerts: number;
  suspiciousTransactions: number;
  fraudulentAmount: number;
  riskScoreAverage: number;
  alertsThisWeek: number;
  alertsLastWeek: number;
}