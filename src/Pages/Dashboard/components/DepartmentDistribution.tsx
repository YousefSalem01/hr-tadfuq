import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { DepartmentDistribution as DepartmentDistributionType } from '../types';

interface DepartmentDistributionProps {
  data: DepartmentDistributionType[] | null;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#DC2626', '#8B5CF6', '#EC4899'];

const DepartmentDistribution = ({ data }: DepartmentDistributionProps) => {
  const chartData = data?.map((item, index) => ({
    name: item.department,
    value: item.count,
    percentage: item.percentage,
    color: COLORS[index % COLORS.length],
  })) || [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Department Distribution</h3>
        <p className="text-sm text-gray-500">Employee distribution by department</p>
      </div>
      
      {chartData.length > 0 ? (
        <>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-semibold text-gray-900 ml-auto">
                  {item.percentage.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No department data available
        </div>
      )}
    </div>
  );
};

export default DepartmentDistribution;


