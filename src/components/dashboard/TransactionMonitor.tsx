import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Transaction } from '../../types';

interface TransactionMonitorProps {
  transactions: Transaction[];
}

const TransactionMonitor = ({ transactions }: TransactionMonitorProps) => {
  // Sort transactions by risk score (highest first)
  const sortedTransactions = [...transactions].sort((a, b) => b.riskScore - a.riskScore);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'flagged':
        return 'bg-alert-red-100 text-alert-red-800';
      case 'suspicious':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreClass = (score: number) => {
    if (score >= 70) return 'text-alert-red-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-cu-green-600';
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Suspicious Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">Member</th>
                <th scope="col" className="px-4 py-3">Amount</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Type</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Risk Score</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {transaction.memberName}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-3">
                    {transaction.type}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${getRiskScoreClass(transaction.riskScore)}`}>
                      {transaction.riskScore}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs font-medium text-cu-blue-600 hover:text-cu-blue-800 mr-2">
                      Review
                    </button>
                    <button className="text-xs font-medium text-alert-red-600 hover:text-alert-red-800">
                      Flag
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {transactions.length > 0 && (
          <div className="text-center mt-4">
            <button className="text-sm font-medium text-cu-blue-600 hover:text-cu-blue-800">
              View All Transactions
            </button>
          </div>
        )}
        
        {transactions.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No suspicious transactions to display
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionMonitor;