import { Alert, Transaction, Member, FraudMetrics } from '../types';

// Generate random date within the last 30 days
const getRandomRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

// Generate random amount between min and max
const getRandomAmount = (min: number, max: number) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Unusual login location detected',
    description: 'Member logged in from an unusual location (Ukraine) for the first time.',
    timestamp: getRandomRecentDate(),
    severity: 'high',
    isRead: false,
  },
  {
    id: '2',
    title: 'Multiple failed login attempts',
    description: 'Five failed login attempts for member #CR-78291 within 10 minutes.',
    timestamp: getRandomRecentDate(),
    severity: 'high',
    isRead: true,
  },
  {
    id: '3',
    title: 'Large transaction alert',
    description: 'Transaction of €15,000 exceeds typical spending pattern for member #CR-12345.',
    timestamp: getRandomRecentDate(),
    severity: 'medium',
    isRead: false,
  },
  {
    id: '4',
    title: 'Rapid succession withdrawals',
    description: 'Three ATM withdrawals within 30 minutes from different locations.',
    timestamp: getRandomRecentDate(),
    severity: 'medium',
    isRead: false,
  },
  {
    id: '5',
    title: 'New payee added',
    description: 'Member #CR-34567 added a new international payee.',
    timestamp: getRandomRecentDate(),
    severity: 'low',
    isRead: true,
  },
  {
    id: '6',
    title: 'Account details changed',
    description: 'Member #CR-45678 changed their contact email and phone number.',
    timestamp: getRandomRecentDate(),
    severity: 'low',
    isRead: false,
  },
];

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    memberId: 'm1',
    memberName: 'Sean O\'Connor',
    amount: 5000,
    date: getRandomRecentDate(),
    type: 'Transfer',
    status: 'suspicious',
    riskScore: 75,
    description: 'Transfer to new international account',
  },
  {
    id: 't2',
    memberId: 'm2',
    memberName: 'Mary Kelly',
    amount: 1200,
    date: getRandomRecentDate(),
    type: 'Withdrawal',
    status: 'normal',
    riskScore: 25,
    description: 'ATM withdrawal',
  },
  {
    id: 't3',
    memberId: 'm3',
    memberName: 'Patrick Murphy',
    amount: 15000,
    date: getRandomRecentDate(),
    type: 'Transfer',
    status: 'flagged',
    riskScore: 90,
    description: 'Large transfer to unknown recipient',
  },
  {
    id: 't4',
    memberId: 'm4',
    memberName: 'Siobhan Walsh',
    amount: 750,
    date: getRandomRecentDate(),
    type: 'Payment',
    status: 'normal',
    riskScore: 15,
    description: 'Monthly mortgage payment',
  },
  {
    id: 't5',
    memberId: 'm5',
    memberName: 'Liam Byrne',
    amount: 3500,
    date: getRandomRecentDate(),
    type: 'Deposit',
    status: 'suspicious',
    riskScore: 65,
    description: 'Cash deposit exceeding typical pattern',
  },
  {
    id: 't6',
    memberId: 'm1',
    memberName: 'Sean O\'Connor',
    amount: 2500,
    date: getRandomRecentDate(),
    type: 'Withdrawal',
    status: 'suspicious',
    riskScore: 70,
    description: 'Multiple withdrawals in short period',
  },
  {
    id: 't7',
    memberId: 'm6',
    memberName: 'Aoife Doyle',
    amount: 900,
    date: getRandomRecentDate(),
    type: 'Payment',
    status: 'normal',
    riskScore: 20,
    description: 'Utility bill payment',
  },
];

// Mock members data
export const mockMembers: Member[] = [
  {
    id: 'm1',
    name: 'Sean O\'Connor',
    accountNumber: 'CR-78291',
    riskScore: 75,
    joinDate: '2018-05-12T00:00:00Z',
    lastActivity: getRandomRecentDate(),
    recentTransactions: mockTransactions.filter(t => t.memberId === 'm1'),
  },
  {
    id: 'm2',
    name: 'Mary Kelly',
    accountNumber: 'CR-12345',
    riskScore: 25,
    joinDate: '2015-11-23T00:00:00Z',
    lastActivity: getRandomRecentDate(),
    recentTransactions: mockTransactions.filter(t => t.memberId === 'm2'),
  },
  {
    id: 'm3',
    name: 'Patrick Murphy',
    accountNumber: 'CR-34567',
    riskScore: 90,
    joinDate: '2020-02-15T00:00:00Z',
    lastActivity: getRandomRecentDate(),
    recentTransactions: mockTransactions.filter(t => t.memberId === 'm3'),
  },
  {
    id: 'm4',
    name: 'Siobhan Walsh',
    accountNumber: 'CR-45678',
    riskScore: 15,
    joinDate: '2010-07-30T00:00:00Z',
    lastActivity: getRandomRecentDate(),
    recentTransactions: mockTransactions.filter(t => t.memberId === 'm4'),
  },
  {
    id: 'm5',
    name: 'Liam Byrne',
    accountNumber: 'CR-56789',
    riskScore: 65,
    joinDate: '2019-09-05T00:00:00Z',
    lastActivity: getRandomRecentDate(),
    recentTransactions: mockTransactions.filter(t => t.memberId === 'm5'),
  },
  {
    id: 'm6',
    name: 'Aoife Doyle',
    accountNumber: 'CR-67890',
    riskScore: 20,
    joinDate: '2017-03-18T00:00:00Z',
    lastActivity: getRandomRecentDate(),
    recentTransactions: mockTransactions.filter(t => t.memberId === 'm6'),
  },
];

// Mock fraud metrics
export const mockFraudMetrics: FraudMetrics = {
  totalAlerts: 24,
  highRiskAlerts: 8,
  suspiciousTransactions: 15,
  fraudulentAmount: 42500,
  riskScoreAverage: 48.3,
  alertsThisWeek: 12,
  alertsLastWeek: 9,
};