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
  Settings, 
  User, 
  Bell, 
  Shield, 
  Lock, 
  Mail, 
  Save,
  RefreshCw,
  Database,
  Smartphone,
  Globe,
  Clock
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
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [dashboardRefreshRate, setDashboardRefreshRate] = useState('5');
  const [apiKey, setApiKey] = useState('sk_test_cu_shield_123456789abcdefghijklmnopqrstuvwxyz');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState('90');
  const [highRiskThreshold, setHighRiskThreshold] = useState('70');
  const [mediumRiskThreshold, setMediumRiskThreshold] = useState('40');

  useEffect(() => {
    console.log('Settings page loaded');
    document.title = 'CU Shield - Settings';
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    // In a real application, this would save the settings to the backend
  };

  const handleResetSettings = () => {
    console.log('Resetting settings to defaults...');
    // In a real application, this would reset settings to default values
  };

  const handleRegenerateApiKey = () => {
    console.log('Regenerating API key...');
    // In a real application, this would generate a new API key
    setApiKey('sk_test_cu_shield_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button 
            className="bg-cu-blue-600 hover:bg-cu-blue-700 dark:bg-cu-blue-700 dark:hover:bg-cu-blue-600 text-white"
            onClick={handleSaveSettings}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api">
            <Globe className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="h-4 w-4 mr-2" />
            Data Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general application settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Interface</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dashboard-refresh">Dashboard Refresh Rate</Label>
                    <Select value={dashboardRefreshRate} onValueChange={setDashboardRefreshRate}>
                      <SelectTrigger id="dashboard-refresh">
                        <SelectValue placeholder="Select refresh rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Every 1 minute</SelectItem>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                        <SelectItem value="manual">Manual refresh only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      How often the dashboard data should automatically refresh
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Format for displaying dates throughout the application
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Risk Thresholds</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="high-risk">High Risk Threshold</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="high-risk" 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={highRiskThreshold}
                        onChange={(e) => setHighRiskThreshold(e.target.value)}
                      />
                      <span>and above</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Risk score threshold for high risk classification
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medium-risk">Medium Risk Threshold</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="medium-risk" 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={mediumRiskThreshold}
                        onChange={(e) => setMediumRiskThreshold(e.target.value)}
                      />
                      <span>to {parseInt(highRiskThreshold) - 1}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Risk score threshold for medium risk classification
                    </p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Low Risk: 0 to {parseInt(mediumRiskThreshold) - 1}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Credit Union Information</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cu-name">Credit Union Name</Label>
                    <Input id="cu-name" defaultValue="Irish Community Credit Union" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cu-contact">Primary Contact Email</Label>
                    <Input id="cu-contact" type="email" defaultValue="admin@irishcu.ie" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cu-address">Address</Label>
                    <Textarea id="cu-address" defaultValue="123 Main Street, Dublin, Ireland" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleResetSettings}>Reset</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive alerts and reports via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  {emailNotifications && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="email-address">Email Address</Label>
                      <Input id="email-address" type="email" defaultValue="alerts@irishcu.ie" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive urgent alerts via SMS
                      </p>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  
                  {smsNotifications && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input id="phone-number" type="tel" defaultValue="+353 1 234 5678" />
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>High Severity Alerts</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Critical security issues requiring immediate attention
                      </p>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select notification type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All channels</SelectItem>
                        <SelectItem value="email">Email only</SelectItem>
                        <SelectItem value="sms">SMS only</SelectItem>
                        <SelectItem value="none">No notifications</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Medium Severity Alerts</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Potential security issues requiring attention
                      </p>
                    </div>
                    <Select defaultValue="email">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select notification type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All channels</SelectItem>
                        <SelectItem value="email">Email only</SelectItem>
                        <SelectItem value="sms">SMS only</SelectItem>
                        <SelectItem value="none">No notifications</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Severity Alerts</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Informational alerts for awareness
                      </p>
                    </div>
                    <Select defaultValue="none">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select notification type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All channels</SelectItem>
                        <SelectItem value="email">Email only</SelectItem>
                        <SelectItem value="sms">SMS only</SelectItem>
                        <SelectItem value="none">No notifications</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Report Scheduling</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Daily Summary Report</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Daily overview of fraud detection activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Analysis Report</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Detailed weekly analysis of fraud patterns
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Monthly Executive Report</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Comprehensive monthly report for management
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleResetSettings}>Reset</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Require two-factor authentication for all users
                      </p>
                    </div>
                    <Switch 
                      id="two-factor" 
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      min="5" 
                      max="240" 
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically log out users after period of inactivity
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Password Complexity Requirements</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enforce strong password requirements
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Access Control</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IP Restriction</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Restrict access to specific IP addresses
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                    <Textarea 
                      id="allowed-ips" 
                      placeholder="Enter IP addresses, one per line"
                      defaultValue="192.168.1.0/24&#10;10.0.0.1&#10;10.0.0.2"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter IP addresses or CIDR ranges, one per line
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Failed Login Lockout</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lock accounts after multiple failed login attempts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Audit Logging</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Detailed Audit Logs</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Log all user actions for security auditing
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention Period (days)</Label>
                    <Input id="log-retention" type="number" min="30" max="365" defaultValue="90" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      How long to retain detailed audit logs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleResetSettings}>Reset</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Manage API keys and integration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Access</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable API Access</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow external systems to access the API
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="api-key" 
                        value={apiKey} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" onClick={handleRegenerateApiKey}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use this key to authenticate API requests
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Important Security Notice</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      Keep your API key secure. If compromised, regenerate immediately. API keys grant access to sensitive data.
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Webhooks</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Webhooks</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Send event notifications to external systems
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" defaultValue="https://api.irishcu.ie/webhooks/fraud-alerts" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      URL to receive webhook notifications
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Webhook Events</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-alert" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="event-alert">New Alert Generated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-transaction" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="event-transaction">Suspicious Transaction Detected</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-rule" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="event-rule">Rule Triggered</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="event-member" className="rounded border-gray-300" />
                        <Label htmlFor="event-member">Member Risk Score Changed</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rate Limiting</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Rate Limiting</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Limit the number of API requests per minute
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Requests per Minute</Label>
                    <Input id="rate-limit" type="number" min="10" max="1000" defaultValue="100" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Maximum number of API requests allowed per minute
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleResetSettings}>Reset</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure data retention and backup settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Retention</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Transaction Data Retention (days)</Label>
                    <Input 
                      id="data-retention" 
                      type="number" 
                      min="30" 
                      max="3650" 
                      value={dataRetentionPeriod}
                      onChange={(e) => setDataRetentionPeriod(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      How long to retain transaction data before archiving
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alert-retention">Alert Data Retention (days)</Label>
                    <Input id="alert-retention" type="number" min="30" max="3650" defaultValue="365" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      How long to retain alert data before archiving
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Data Archiving</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Automatically archive old data based on retention settings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Backups</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Schedule regular backups of all system data
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select backup frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      How often to create backups
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                    <Input id="backup-retention" type="number" min="7" max="365" defaultValue="30" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      How long to keep backup files
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-location">Backup Storage Location</Label>
                    <Input id="backup-location" defaultValue="s3://irishcu-backups/fraud-detection/" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Where backup files are stored
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Export</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Data Export</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow exporting data for external analysis
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Export Formats</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="format-csv" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="format-csv">CSV</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="format-json" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="format-json">JSON</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="format-pdf" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="format-pdf">PDF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="format-excel" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="format-excel">Excel</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleResetSettings}>Reset</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;