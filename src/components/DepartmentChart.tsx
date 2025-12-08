import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Engineering', value: 45, color: '#3B82F6' },
  { name: 'Marketing', value: 20, color: '#10B981' },
  { name: 'Sales', value: 25, color: '#F59E0B' },
  { name: 'HR', value: 10, color: '#DC2626' },
];

const DepartmentChart = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Department Distribution</h3>
        <p className="text-sm text-gray-500">Employee distribution by department</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">{item.name}</span>
            <span className="text-sm font-semibold text-gray-900 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentChart;

