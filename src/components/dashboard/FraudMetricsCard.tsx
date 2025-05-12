import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FraudMetrics } from '../../types';

interface FraudMetricsCardProps {
  metrics: FraudMetrics;
}

const FraudMetricsCard = ({ metrics }: FraudMetricsCardProps) => {
  const alertsChange = metrics.alertsThisWeek - metrics.alertsLastWeek;
  const alertsPercentChange = Math.round((alertsChange / metrics.alertsLastWeek) * 100);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
          <div className={`${alertsChange >= 0 ? 'text-alert-red-500' : 'text-cu-green-500'} flex items-center text-xs font-medium`}>
            {alertsChange >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
            {Math.abs(alertsPercentChange)}%
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalAlerts}</div>
          <p className="text-xs text-muted-foreground">
            {alertsChange >= 0 ? `+${alertsChange}` : alertsChange} from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Risk Alerts</CardTitle>
          <div className="text-alert-red-500 bg-alert-red-50 p-1 rounded text-xs font-medium">
            {Math.round((metrics.highRiskAlerts / metrics.totalAlerts) * 100)}%
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.highRiskAlerts}</div>
          <p className="text-xs text-muted-foreground">
            Of total {metrics.totalAlerts} alerts
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Suspicious Transactions</CardTitle>
          <div className="text-amber-500 bg-amber-50 p-1 rounded text-xs font-medium">
            Active
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.suspiciousTransactions}</div>
          <p className="text-xs text-muted-foreground">
            Requiring review
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Potential Fraud Amount</CardTitle>
          <div className="text-alert-red-500 flex items-center text-xs font-medium">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            12%
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{metrics.fraudulentAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Under investigation
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudMetricsCard;