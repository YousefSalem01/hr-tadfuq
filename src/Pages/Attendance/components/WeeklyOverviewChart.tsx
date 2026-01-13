import { Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { AttendanceChartItem } from '../types';

interface WeeklyOverviewChartProps {
  data: AttendanceChartItem[];
    startDate?: string;
  endDate?: string;
}

const WeeklyOverviewChart = ({ data, startDate, endDate }: WeeklyOverviewChartProps) => {
  // Calculate total and percentage for center display
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const presentItem = data.find((d) => d.name.toLowerCase() === 'present');
  const presentPercent = total > 0 && presentItem ? Math.round((presentItem.value / total) * 100) : 0;

  // Format date range display
  const dateRangeDisplay = startDate && endDate 
    ? `${startDate} - ${endDate}`
    : startDate 
    ? `From ${startDate}`
    : endDate
    ? `Until ${endDate}`
    : 'All Time';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Attendance Overview</h3>
          <p className="text-sm text-gray-500">Staff participation across divisions</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
          <Calendar size={16} />
          {dateRangeDisplay}
        </div>
      </div>

      <div className="flex items-center justify-center py-8">
        <div className="relative w-64 h-64">
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
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{presentPercent}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-600">
              {item.name} {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyOverviewChart;
