import { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import FraudMetricsCard from '../components/dashboard/FraudMetricsCard';
import AlertsOverview from '../components/dashboard/AlertsOverview';
import TransactionMonitor from '../components/dashboard/TransactionMonitor';
import RiskScoreCard from '../components/dashboard/RiskScoreCard';
import { mockAlerts, mockTransactions, mockMembers, mockFraudMetrics } from '../utils/mockData';

const Index = () => {
  useEffect(() => {
    console.log('Dashboard loaded with mock data');
    document.title = 'CU Shield - Fraud Detection Dashboard';
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Fraud Detection Dashboard</h1>
        <div className="flex space-x-2">
          <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-cu-blue-500 focus:border-cu-blue-500 p-2">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Custom range</option>
          </select>
          <button className="bg-cu-blue-600 hover:bg-cu-blue-700 dark:bg-cu-blue-700 dark:hover:bg-cu-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Generate Report
          </button>
        </div>
      </div>

      <div className="mb-6">
        <FraudMetricsCard metrics={mockFraudMetrics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AlertsOverview alerts={mockAlerts} />
        <RiskScoreCard members={mockMembers} />
      </div>

      <div className="mb-6">
        <TransactionMonitor transactions={mockTransactions} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-medium mb-4 dark:text-gray-100">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-cu-green-50 dark:bg-cu-green-900/30 rounded-lg border border-cu-green-100 dark:border-cu-green-800">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cu-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-cu-green-700 dark:text-cu-green-300">Rules Engine: Active</span>
            </div>
            <p className="text-xs text-cu-green-600 dark:text-cu-green-400 mt-1">Last updated: Today, 10:45</p>
          </div>
          
          <div className="p-3 bg-cu-green-50 dark:bg-cu-green-900/30 rounded-lg border border-cu-green-100 dark:border-cu-green-800">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cu-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-cu-green-700 dark:text-cu-green-300">Transaction Monitoring: Active</span>
            </div>
            <p className="text-xs text-cu-green-600 dark:text-cu-green-400 mt-1">Processing normally</p>
          </div>
          
          <div className="p-3 bg-cu-green-50 dark:bg-cu-green-900/30 rounded-lg border border-cu-green-100 dark:border-cu-green-800">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cu-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-cu-green-700 dark:text-cu-green-300">Alert System: Active</span>
            </div>
            <p className="text-xs text-cu-green-600 dark:text-cu-green-400 mt-1">All notifications sending</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;