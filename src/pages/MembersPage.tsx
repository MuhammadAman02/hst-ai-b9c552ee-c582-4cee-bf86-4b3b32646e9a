import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { mockMembers } from '../utils/mockData';
import { Member } from '../types';
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
import { Filter, Search, UserPlus, AlertTriangle, Eye } from 'lucide-react';

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  useEffect(() => {
    console.log('Members page loaded with mock data');
    document.title = 'CU Shield - Members';
  }, []);

  useEffect(() => {
    let result = members;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        member.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply risk filter
    if (riskFilter !== 'all') {
      if (riskFilter === 'high') {
        result = result.filter(member => member.riskScore >= 70);
      } else if (riskFilter === 'medium') {
        result = result.filter(member => member.riskScore >= 40 && member.riskScore < 70);
      } else if (riskFilter === 'low') {
        result = result.filter(member => member.riskScore < 40);
      }
    }
    
    setFilteredMembers(result);
  }, [members, searchTerm, riskFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getRiskBadge = (score: number) => {
    if (score >= 70) {
      return <span className="px-2 py-1 bg-alert-red-100 text-alert-red-800 dark:bg-alert-red-900/30 dark:text-alert-red-300 text-xs rounded-full">High</span>;
    } else if (score >= 40) {
      return <span className="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs rounded-full">Medium</span>;
    } else {
      return <span className="px-2 py-1 bg-cu-green-100 text-cu-green-800 dark:bg-cu-green-900/30 dark:text-cu-green-300 text-xs rounded-full">Low</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Members</h1>
        <Button className="bg-cu-blue-600 hover:bg-cu-blue-700 dark:bg-cu-blue-700 dark:hover:bg-cu-blue-600 text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search members..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-40">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
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
          <CardTitle className="text-lg font-medium">Member List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-cu-blue-100 dark:bg-cu-blue-800 flex items-center justify-center text-cu-blue-700 dark:text-cu-blue-300 font-medium mr-2">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>{member.accountNumber}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{formatDate(member.joinDate)}</TableCell>
                      <TableCell>{formatDate(member.lastActivity)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                member.riskScore >= 70 
                                  ? 'bg-alert-red-500' 
                                  : member.riskScore >= 40 
                                  ? 'bg-amber-500' 
                                  : 'bg-cu-green-500'
                              }`} 
                              style={{ width: `${member.riskScore}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{member.riskScore}</span>
                          {getRiskBadge(member.riskScore)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {member.riskScore >= 70 && (
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
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center">
                        <UserPlus className="h-10 w-10 mb-2 opacity-30" />
                        <p>No members found matching your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredMembers.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredMembers.length} of {members.length} members
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

export default MembersPage;