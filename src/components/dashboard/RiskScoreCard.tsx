import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Member } from '../../types';

interface RiskScoreCardProps {
  members: Member[];
}

const RiskScoreCard = ({ members }: RiskScoreCardProps) => {
  // Sort members by risk score (highest first)
  const sortedMembers = [...members].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'bg-alert-red-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-cu-green-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">High Risk Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-cu-blue-100 flex items-center justify-center text-cu-blue-700 font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.accountNumber}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${getRiskScoreColor(member.riskScore)}`} 
                      style={{ width: `${member.riskScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{member.riskScore}</span>
                </div>
                <span className="text-xs text-gray-500 mt-1">Last active: {formatDate(member.lastActivity)}</span>
              </div>
            </div>
          ))}
          
          {members.length > 0 && (
            <div className="text-center mt-4">
              <button className="text-sm font-medium text-cu-blue-600 hover:text-cu-blue-800">
                View All Members
              </button>
            </div>
          )}
          
          {members.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No high risk members to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreCard;