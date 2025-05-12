import { Alert, Transaction, Member, FraudMetrics } from '../types';

// Mock Fraud Metrics
export const mockFraudMetrics: FraudMetrics = {
  totalAlerts: 42,
  alertsThisWeek: 18,
  alertsLastWeek: 12,
  highRiskAlerts: 8,
  suspiciousTransactions: 15,
  fraudulentAmount: 12450
};

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    title: 'Unusual Login Location',
    description: 'Member logged in from an unusual location (Dublin) when their normal location is Cork.',
    severity: 'high',
    timestamp: '2023-06-15T08:23:15',
    isRead: false,
    memberId: 'MEM-1234',
    transactionId: 'TRX-5678'
  },
  {
    id: 'alert-002',
    title: 'Multiple Failed Login Attempts',
    description: 'Five failed login attempts detected for member account in the last 10 minutes.',
    severity: 'high',
    timestamp: '2023-06-15T09:45:22',
    isRead: true,
    memberId: 'MEM-5678'
  },
  {
    id: 'alert-003',
    title: 'Large Transaction',
    description: 'Unusually large transaction of €5,000 detected, which is outside the member\'s normal spending pattern.',
    severity: 'medium',
    timestamp: '2023-06-14T14:12:33',
    isRead: false,
    memberId: 'MEM-9012',
    transactionId: 'TRX-3456'
  },
  {
    id: 'alert-004',
    title: 'Account Information Change',
    description: 'Member changed their email address and phone number within 24 hours of a large withdrawal.',
    severity: 'medium',
    timestamp: '2023-06-14T11:05:47',
    isRead: true,
    memberId: 'MEM-3456'
  },
  {
    id: 'alert-005',
    title: 'Multiple Transactions',
    description: 'Multiple small transactions totaling €1,200 made within 1 hour.',
    severity: 'low',
    timestamp: '2023-06-13T16:30:02',
    isRead: false,
    memberId: 'MEM-7890',
    transactionId: 'TRX-1234'
  },
  {
    id: 'alert-006',
    title: 'New Device Login',
    description: 'Member logged in from a new device for the first time.',
    severity: 'low',
    timestamp: '2023-06-13T10:15:38',
    isRead: true,
    memberId: 'MEM-2345'
  },
  {
    id: 'alert-007',
    title: 'International Transfer',
    description: 'First-time international transfer to an account in Eastern Europe.',
    severity: 'high',
    timestamp: '2023-06-12T13:45:22',
    isRead: false,
    memberId: 'MEM-6789',
    transactionId: 'TRX-8901'
  },
  {
    id: 'alert-008',
    title: 'Account Dormancy',
    description: 'Previously dormant account suddenly active with multiple transactions.',
    severity: 'medium',
    timestamp: '2023-06-12T09:20:15',
    isRead: true,
    memberId: 'MEM-0123',
    transactionId: 'TRX-6789'
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'TRX-5678',
    memberName: 'John Murphy',
    memberId: 'MEM-1234',
    amount: 3500,
    date: '2023-06-15T08:20:15',
    type: 'Withdrawal',
    status: 'flagged',
    riskScore: 85
  },
  {
    id: 'TRX-3456',
    memberName: 'Mary O\'Sullivan',
    memberId: 'MEM-9012',
    amount: 5000,
    date: '2023-06-14T14:10:33',
    type: 'Transfer',
    status: 'suspicious',
    riskScore: 72
  },
  {
    id: 'TRX-1234',
    memberName: 'Patrick Kelly',
    memberId: 'MEM-7890',
    amount: 1200,
    date: '2023-06-13T16:25:02',
    type: 'Multiple Payments',
    status: 'suspicious',
    riskScore: 65
  },
  {
    id: 'TRX-8901',
    memberName: 'Siobhan Walsh',
    memberId: 'MEM-6789',
    amount: 2800,
    date: '2023-06-12T13:40:22',
    type: 'International Transfer',
    status: 'flagged',
    riskScore: 90
  },
  {
    id: 'TRX-6789',
    memberName: 'Liam Byrne',
    memberId: 'MEM-0123',
    amount: 1500,
    date: '2023-06-12T09:15:15',
    type: 'Withdrawal',
    status: 'suspicious',
    riskScore: 68
  },
  {
    id: 'TRX-2345',
    memberName: 'Aoife Ryan',
    memberId: 'MEM-4567',
    amount: 750,
    date: '2023-06-11T11:30:45',
    type: 'Purchase',
    status: 'normal',
    riskScore: 35
  },
  {
    id: 'TRX-7890',
    memberName: 'Conor Doyle',
    memberId: 'MEM-8901',
    amount: 1800,
    date: '2023-06-10T15:20:10',
    type: 'Transfer',
    status: 'normal',
    riskScore: 42
  }
];

// Mock Members
export const mockMembers: Member[] = [
  {
    id: 'MEM-1234',
    name: 'John Murphy',
    accountNumber: '3021-4567-8901',
    email: 'john.murphy@example.com',
    joinDate: '2018-03-15T00:00:00',
    lastActivity: '2023-06-15T08:20:15',
    riskScore: 85
  },
  {
    id: 'MEM-5678',
    name: 'Sarah O\'Brien',
    accountNumber: '3021-2345-6789',
    email: 'sarah.obrien@example.com',
    joinDate: '2019-07-22T00:00:00',
    lastActivity: '2023-06-15T09:40:22',
    riskScore: 78
  },
  {
    id: 'MEM-9012',
    name: 'Mary O\'Sullivan',
    accountNumber: '3021-8901-2345',
    email: 'mary.osullivan@example.com',
    joinDate: '2017-11-05T00:00:00',
    lastActivity: '2023-06-14T14:10:33',
    riskScore: 72
  },
  {
    id: 'MEM-3456',
    name: 'Michael Collins',
    accountNumber: '3021-5678-9012',
    email: 'michael.collins@example.com',
    joinDate: '2020-02-18T00:00:00',
    lastActivity: '2023-06-14T11:00:47',
    riskScore: 65
  },
  {
    id: 'MEM-7890',
    name: 'Patrick Kelly',
    accountNumber: '3021-1234-5678',
    email: 'patrick.kelly@example.com',
    joinDate: '2016-09-30T00:00:00',
    lastActivity: '2023-06-13T16:25:02',
    riskScore: 60
  },
  {
    id: 'MEM-2345',
    name: 'Emma Fitzgerald',
    accountNumber: '3021-6789-0123',
    email: 'emma.fitzgerald@example.com',
    joinDate: '2021-05-12T00:00:00',
    lastActivity: '2023-06-13T10:10:38',
    riskScore: 25
  },
  {
    id: 'MEM-6789',
    name: 'Siobhan Walsh',
    accountNumber: '3021-3456-7890',
    email: 'siobhan.walsh@example.com',
    joinDate: '2019-01-25T00:00:00',
    lastActivity: '2023-06-12T13:40:22',
    riskScore: 90
  },
  {
    id: 'MEM-0123',
    name: 'Liam Byrne',
    accountNumber: '3021-9012-3456',
    email: 'liam.byrne@example.com',
    joinDate: '2018-08-07T00:00:00',
    lastActivity: '2023-06-12T09:15:15',
    riskScore: 68
  },
  {
    id: 'MEM-4567',
    name: 'Aoife Ryan',
    accountNumber: '3021-0123-4567',
    email: 'aoife.ryan@example.com',
    joinDate: '2020-11-19T00:00:00',
    lastActivity: '2023-06-11T11:25:45',
    riskScore: 35
  },
  {
    id: 'MEM-8901',
    name: 'Conor Doyle',
    accountNumber: '3021-7890-1234',
    email: 'conor.doyle@example.com',
    joinDate: '2017-04-03T00:00:00',
    lastActivity: '2023-06-10T15:15:10',
    riskScore: 42
  },
  {
    id: 'MEM-2346',
    name: 'Niamh McCarthy',
    accountNumber: '3021-4567-8902',
    email: 'niamh.mccarthy@example.com',
    joinDate: '2019-10-28T00:00:00',
    lastActivity: '2023-06-09T12:30:20',
    riskScore: 18
  },
  {
    id: 'MEM-6790',
    name: 'Sean Lynch',
    accountNumber: '3021-2345-6790',
    email: 'sean.lynch@example.com',
    joinDate: '2018-06-14T00:00:00',
    lastActivity: '2023-06-08T09:45:55',
    riskScore: 30
  }
];