import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  BarChart, 
  FileText, 
  Download, 
  Calendar, 
  PieChart, 
  TrendingUp, 
  AlertTriangle,
  Users
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import FraudTrendsChart from '../components/reports/FraudTrendsChart';
import RiskDistributionChart from '../components/reports/RiskDistributionChart';
import AlertSummaryTable from '../components/reports/AlertSummaryTable';

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    console.log('Reports page loaded');
    document.title = 'CU Shield - Reports';
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleExportReport = () => {
    console.log('Exporting report for:', timeRange, 'tab:', activeTab);
    // In a real application, this would trigger a report export
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Reports</h1>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="bg-cu-blue-600 hover:bg-cu-blue-700 dark:bg-cu-blue-700 dark:hover:bg-cu-blue-600 text-white"
            onClick={handleExportReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fraud-trends">Fraud Trends</TabsTrigger>
          <TabsTrigger value="member-risk">Member Risk</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-alert-red-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">247</div>
                    <p className="text-xs text-green-600">+12% from previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Flagged Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-amber-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-alert-red-600">+23% from previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">High Risk Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-cu-blue-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-amber-600">+5% from previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Potential Fraud Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-cu-green-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">€42,891</div>
                    <p className="text-xs text-alert-red-600">+18% from previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Trends</CardTitle>
                <CardDescription>Fraud activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <FraudTrendsChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Member risk level distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskDistributionChart />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Alert Summary</CardTitle>
              <CardDescription>Recent alerts by type and severity</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertSummaryTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fraud-trends">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Trends Analysis</CardTitle>
              <CardDescription>Detailed view of fraud patterns over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">Detailed fraud trends chart will appear here</p>
                  <p className="text-sm">Showing data for the selected time period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="member-risk">
          <Card>
            <CardHeader>
              <CardTitle>Member Risk Analysis</CardTitle>
              <CardDescription>Detailed view of member risk profiles</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <PieChart className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">Member risk distribution chart will appear here</p>
                  <p className="text-sm">Showing data for the selected time period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert Analysis</CardTitle>
              <CardDescription>Detailed view of alert patterns and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <AlertTriangle className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">Alert analysis chart will appear here</p>
                  <p className="text-sm">Showing data for the selected time period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ReportsPage;