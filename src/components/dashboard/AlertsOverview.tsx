import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert } from '../../types';

interface AlertsOverviewProps {
  alerts: Alert[];
}

const AlertsOverview = ({ alerts }: AlertsOverviewProps) => {
  // Sort alerts by severity (high first) and then by timestamp (newest first)
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg border ${
                alert.severity === 'high' 
                  ? 'border-alert-red-200 bg-alert-red-50' 
                  : alert.severity === 'medium'
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-cu-green-200 bg-cu-green-50'
              } ${!alert.isRead ? 'animate-pulse-alert' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <span className={`alert-badge alert-badge-${alert.severity} mr-2`}>
                    {alert.severity}
                  </span>
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                </div>
                <span className="text-xs text-gray-500">{formatDate(alert.timestamp)}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{alert.description}</p>
              <div className="mt-2 flex justify-end">
                <button className="text-xs font-medium text-cu-blue-600 hover:text-cu-blue-800 mr-3">
                  Mark as Read
                </button>
                <button className="text-xs font-medium text-cu-blue-600 hover:text-cu-blue-800">
                  View Details
                </button>
              </div>
            </div>
          ))}
          
          {alerts.length > 0 && (
            <div className="text-center mt-4">
              <button className="text-sm font-medium text-cu-blue-600 hover:text-cu-blue-800">
                View All Alerts
              </button>
            </div>
          )}
          
          {alerts.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No alerts to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsOverview;