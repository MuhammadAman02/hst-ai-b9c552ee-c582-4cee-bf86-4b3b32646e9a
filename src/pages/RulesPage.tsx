import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Shield, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  MapPin,
  UserCheck,
  ToggleLeft,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Switch
} from "../components/ui/switch";
import { Badge } from '../components/ui/badge';

// Mock data for fraud detection rules
const mockRules = [
  {
    id: 'rule-001',
    name: 'Large Transaction Amount',
    description: 'Flag transactions over €5,000',
    category: 'transaction',
    condition: 'Transaction amount > €5,000',
    action: 'Generate high severity alert',
    enabled: true,
    createdAt: '2023-10-15T10:30:00',
    lastTriggered: '2023-11-02T14:22:00',
    triggerCount: 28,
    severity: 'high'
  },
  {
    id: 'rule-002',
    name: 'Multiple Failed Login Attempts',
    description: 'Detect brute force login attempts',
    category: 'authentication',
    condition: '> 5 failed login attempts within 10 minutes',
    action: 'Lock account and generate high severity alert',
    enabled: true,
    createdAt: '2023-09-20T09:15:00',
    lastTriggered: '2023-11-01T23:45:00',
    triggerCount: 42,
    severity: 'high'
  },
  {
    id: 'rule-003',
    name: 'Unusual Login Location',
    description: 'Detect logins from new geographic locations',
    category: 'authentication',
    condition: 'Login from previously unused location',
    action: 'Generate medium severity alert',
    enabled: true,
    createdAt: '2023-08-05T11:20:00',
    lastTriggered: '2023-11-02T08:12:00',
    triggerCount: 63,
    severity: 'medium'
  },
  {
    id: 'rule-004',
    name: 'Rapid Successive Transactions',
    description: 'Detect multiple transactions in short time period',
    category: 'transaction',
    condition: '> 3 transactions within 5 minutes',
    action: 'Generate medium severity alert',
    enabled: false,
    createdAt: '2023-07-12T14:45:00',
    lastTriggered: '2023-10-28T16:33:00',
    triggerCount: 17,
    severity: 'medium'
  },
  {
    id: 'rule-005',
    name: 'International Transaction',
    description: 'Flag transactions from foreign countries',
    category: 'transaction',
    condition: 'Transaction origin outside Ireland',
    action: 'Generate low severity alert',
    enabled: true,
    createdAt: '2023-06-30T16:10:00',
    lastTriggered: '2023-11-01T12:05:00',
    triggerCount: 94,
    severity: 'low'
  },
  {
    id: 'rule-006',
    name: 'Account Dormancy Change',
    description: 'Detect activity on dormant accounts',
    category: 'account',
    condition: 'Activity after > 90 days of inactivity',
    action: 'Generate high severity alert',
    enabled: true,
    createdAt: '2023-05-18T10:00:00',
    lastTriggered: '2023-10-25T09:17:00',
    triggerCount: 8,
    severity: 'high'
  },
];

// Rule templates for quick creation
const ruleTemplates = [
  {
    id: 'template-001',
    name: 'Large Transaction Detection',
    description: 'Detect transactions above a specified threshold',
    category: 'transaction',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    id: 'template-002',
    name: 'Login Anomaly Detection',
    description: 'Detect unusual login patterns or locations',
    category: 'authentication',
    icon: <MapPin className="h-5 w-5" />
  },
  {
    id: 'template-003',
    name: 'Account Takeover Prevention',
    description: 'Detect and prevent account takeover attempts',
    category: 'account',
    icon: <UserCheck className="h-5 w-5" />
  },
  {
    id: 'template-004',
    name: 'Rapid Transaction Sequence',
    description: 'Detect multiple transactions in a short time period',
    category: 'transaction',
    icon: <Clock className="h-5 w-5" />
  },
];

const RulesPage = () => {
  const [rules, setRules] = useState(mockRules);
  const [filteredRules, setFilteredRules] = useState(mockRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    console.log('Rules page loaded with mock data');
    document.title = 'CU Shield - Fraud Detection Rules';
  }, []);

  useEffect(() => {
    let result = rules;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(rule => 
        rule.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        rule.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(rule => rule.category === categoryFilter);
    }
    
    // Apply severity filter
    if (severityFilter !== 'all') {
      result = result.filter(rule => rule.severity === severityFilter);
    }
    
    // Apply active/inactive filter
    if (activeTab === 'active') {
      result = result.filter(rule => rule.enabled);
    } else if (activeTab === 'inactive') {
      result = result.filter(rule => !rule.enabled);
    }
    
    setFilteredRules(result);
  }, [rules, searchTerm, categoryFilter, severityFilter, activeTab]);

  const handleToggleRule = (ruleId: string) => {
    const updatedRules = rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    );
    setRules(updatedRules);
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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">Medium</Badge>;
      case 'low':
        return <Badge variant="default" className="bg-cu-green-500 hover:bg-cu-green-600">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transaction':
        return <DollarSign className="h-4 w-4 text-cu-blue-500" />;
      case 'authentication':
        return <UserCheck className="h-4 w-4 text-amber-500" />;
      case 'account':
        return <Shield className="h-4 w-4 text-alert-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Fraud Detection Rules</h1>
        <Button className="bg-cu-blue-600 hover:bg-cu-blue-700 dark:bg-cu-blue-700 dark:hover:bg-cu-blue-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New Rule
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search rules..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-40">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="transaction">Transaction</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
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
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Rules</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Rules</TabsTrigger>
          <TabsTrigger value="templates">Rule Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 gap-6">
            {filteredRules.length > 0 ? (
              filteredRules.map((rule) => (
                <Card key={rule.id} className={rule.enabled ? 'border-l-4 border-l-cu-green-500' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getCategoryIcon(rule.category)}
                        <CardTitle className="text-lg font-medium ml-2">{rule.name}</CardTitle>
                        {getSeverityBadge(rule.severity)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={rule.enabled} 
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                    <CardDescription>{rule.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Condition</h4>
                        <p className="text-sm">{rule.condition}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Action</h4>
                        <p className="text-sm">{rule.action}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Created</h4>
                        <p className="text-sm">{formatDate(rule.createdAt)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Triggered</h4>
                        <p className="text-sm">{formatDate(rule.lastTriggered)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Trigger Count</h4>
                        <p className="text-sm">{rule.triggerCount} times</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 pt-0">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" className="text-alert-red-500 hover:text-alert-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Shield className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No rules found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {activeTab === 'active' 
                    ? 'No active rules match your filters. Try adjusting your search criteria or create a new rule.'
                    : 'No inactive rules match your filters. Try adjusting your search criteria.'}
                </p>
                <div className="mt-6">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Rule
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive">
          <div className="grid grid-cols-1 gap-6">
            {filteredRules.length > 0 ? (
              filteredRules.map((rule) => (
                <Card key={rule.id} className="border-l-4 border-l-gray-300 dark:border-l-gray-600">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getCategoryIcon(rule.category)}
                        <CardTitle className="text-lg font-medium ml-2">{rule.name}</CardTitle>
                        {getSeverityBadge(rule.severity)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={rule.enabled} 
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                    <CardDescription>{rule.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Condition</h4>
                        <p className="text-sm">{rule.condition}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Action</h4>
                        <p className="text-sm">{rule.action}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Created</h4>
                        <p className="text-sm">{formatDate(rule.createdAt)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Triggered</h4>
                        <p className="text-sm">{formatDate(rule.lastTriggered)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Trigger Count</h4>
                        <p className="text-sm">{rule.triggerCount} times</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 pt-0">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" className="text-alert-red-500 hover:text-alert-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <ToggleLeft className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No inactive rules found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  All your rules are currently active or none match your filters.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ruleTemplates.map((template) => (
              <Card key={template.id} className="hover:border-cu-blue-300 dark:hover:border-cu-blue-700 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-cu-blue-100 dark:bg-cu-blue-900 flex items-center justify-center text-cu-blue-600 dark:text-cu-blue-300 mr-3">
                      {template.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default RulesPage;