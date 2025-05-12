import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockTransactions } from '../utils/mockData';
import { Transaction } from '../types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Filter, Search, AlertTriangle, Eye, FileText, ArrowUpDown } from 'lucide-react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    console.log('Transactions page loaded with mock data');
    document.title = 'CU Shield - Transactions';
  }, []);

  useEffect(() => {
    let result = transactions;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(transaction => 
        transaction.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(transaction => transaction.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(transaction => transaction.type === typeFilter);
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredTransactions(result);
  }, [transactions, searchTerm, statusFilter, typeFilter, sortDirection]);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'flagged':
        return <span className="px-2 py-1 bg-alert-red-100 text-alert-red-800 dark:bg-alert-red-900/30 dark:text-alert-red-300 text-xs rounded-full">Flagged</span>;
      case 'suspicious':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs rounded-full">Suspicious</span>;
      case 'cleared':
        return <span className="px-2 py-1 bg-cu-green-100 text-cu-green-800 dark:bg-cu-green-900/30 dark:text-cu-green-300 text-xs rounded-full">Cleared</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs rounded-full">{status}</span>;
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Transactions</h1>
        <div className="flex space-x-2">
          <Button className="bg-cu-blue-600 hover:bg-cu-blue-700 dark:bg-cu-blue-700 dark:hover:bg-cu-blue-600 text-white">
            <FileText className="mr-2 h-4 w-4" />
            Export Transactions
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="suspicious">Suspicious</SelectItem>
                    <SelectItem value="cleared">Cleared</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon" onClick={toggleSortDirection}>
                <ArrowUpDown size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-cu-blue-100 dark:bg-cu-blue-800 flex items-center justify-center text-cu-blue-700 dark:text-cu-blue-300 font-medium mr-2">
                            {transaction.memberName.split(' ').map(n => n[0]).join('')}
                          </div>
                          {transaction.memberName}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                transaction.riskScore >= 70 
                                  ? 'bg-alert-red-500' 
                                  : transaction.riskScore >= 40 
                                  ? 'bg-amber-500' 
                                  : 'bg-cu-green-500'
                              }`} 
                              style={{ width: `${transaction.riskScore}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{transaction.riskScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {transaction.riskScore >= 60 && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-alert-red-500">
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center">
                        <FileText className="h-10 w-10 mb-2 opacity-30" />
                        <p>No transactions found matching your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredTransactions.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredTransactions.length} of {transactions.length} transactions
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

export default TransactionsPage;