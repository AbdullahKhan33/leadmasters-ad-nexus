
import { LucideIcon } from "lucide-react";

interface Metric {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const { title, value, icon: Icon, trend } = metric;
  const isPositive = trend.startsWith('+');

  return (
    <div className="p-4 border border-gray-100 rounded-lg bg-white hover:border-purple-200 hover:shadow-sm transition-all duration-200 group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-200">
            <Icon className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {trend}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
