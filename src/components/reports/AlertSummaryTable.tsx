import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const alertSummaryData = [
  { 
    type: 'Unusual Login Location', 
    count: 42, 
    highSeverity: 12, 
    mediumSeverity: 18, 
    lowSeverity: 12,
    trend: 'up'
  },
  { 
    type: 'Large Transaction', 
    count: 38, 
    highSeverity: 15, 
    mediumSeverity: 20, 
    lowSeverity: 3,
    trend: 'up'
  },
  { 
    type: 'Multiple Failed Attempts', 
    count: 56, 
    highSeverity: 22, 
    mediumSeverity: 24, 
    lowSeverity: 10,
    trend: 'up'
  },
  { 
    type: 'Account Takeover Attempt', 
    count: 18, 
    highSeverity: 18, 
    mediumSeverity: 0, 
    lowSeverity: 0,
    trend: 'down'
  },
  { 
    type: 'Suspicious IP Address', 
    count: 93, 
    highSeverity: 31, 
    mediumSeverity: 42, 
    lowSeverity: 20,
    trend: 'up'
  },
];

const AlertSummaryTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alert Type</TableHead>
            <TableHead className="text-right">Total Count</TableHead>
            <TableHead className="text-right">High Severity</TableHead>
            <TableHead className="text-right">Medium Severity</TableHead>
            <TableHead className="text-right">Low Severity</TableHead>
            <TableHead className="text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alertSummaryData.map((row) => (
            <TableRow key={row.type}>
              <TableCell className="font-medium">{row.type}</TableCell>
              <TableCell className="text-right">{row.count}</TableCell>
              <TableCell className="text-right">
                <span className="text-alert-red-600 dark:text-alert-red-400 font-medium">{row.highSeverity}</span>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-amber-600 dark:text-amber-400 font-medium">{row.mediumSeverity}</span>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-cu-green-600 dark:text-cu-green-400 font-medium">{row.lowSeverity}</span>
              </TableCell>
              <TableCell className="text-right">
                {row.trend === 'up' ? (
                  <span className="inline-flex items-center text-alert-red-600 dark:text-alert-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Up
                  </span>
                ) : (
                  <span className="inline-flex items-center text-cu-green-600 dark:text-cu-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Down
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlertSummaryTable;