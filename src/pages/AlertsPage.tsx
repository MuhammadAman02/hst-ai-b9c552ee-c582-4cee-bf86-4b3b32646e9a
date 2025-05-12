import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockAlerts } from '../utils/mockData';
import { Alert } from '../types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { AlertTriangle, CheckCircle, Filter, Search } from 'lucide-react';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    console.log('Alerts page loaded with mock data');
    document.title = 'CU Shield - Alerts';
  }, []);

  useEffect(() => {
    let result = alerts;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(alert => 
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        alert.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply severity filter
    if (severityFilter !== 'all') {
      result = result.filter(alert => alert.severity === severityFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      const isRead = statusFilter === 'read';
      result = result.filter(alert => alert.isRead === isRead);
    }
    
    setFilteredAlerts(result);
  }, [alerts, searchTerm, severityFilter, statusFilter]);

  const handleMarkAsRead = (alertId: string) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    );
    setAlerts(updatedAlerts);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Alerts</h1>
        <Button className="bg-cu-blue-600 hover:bg-cu-blue-700 dark:bg-cu-blue-700 dark:hover:bg-cu-blue-600 text-white">
          Create Alert Rule
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search alerts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-40">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">All Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'high' 
                      ? 'border-alert-red-200 bg-alert-red-50 dark:border-alert-red-800 dark:bg-alert-red-900/30' 
                      : alert.severity === 'medium'
                      ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/30'
                      : 'border-cu-green-200 bg-cu-green-50 dark:border-cu-green-800 dark:bg-cu-green-900/30'
                  } ${!alert.isRead ? 'animate-pulse-alert' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className={`alert-badge alert-badge-${alert.severity} mr-2`}>
                          {alert.severity}
                        </span>
                        <h4 className="font-medium">{alert.title}</h4>
                        {!alert.isRead && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{alert.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Member ID: {alert.memberId}</span>
                        <span className="mx-2">•</span>
                        <span>Transaction: {alert.transactionId || 'N/A'}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(alert.timestamp)}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 md:mt-0">
                      {!alert.isRead && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => handleMarkAsRead(alert.id)}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Mark as Read
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Investigate
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <AlertTriangle className="mx-auto h-10 w-10 mb-2 opacity-30" />
                <p>No alerts found matching your filters</p>
              </div>
            )}
          </div>
          
          {filteredAlerts.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredAlerts.length} of {alerts.length} alerts
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AlertsPage;