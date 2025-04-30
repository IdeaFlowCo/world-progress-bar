
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ProgressIndicator } from "@/types/dashboard";

interface IndicatorChartProps {
  indicator: ProgressIndicator;
  height?: number;
}

export const IndicatorChart = ({ indicator, height = 150 }: IndicatorChartProps) => {
  const color = indicator.color || "#06B6D4";
  
  const renderChart = () => {
    switch (indicator.chartType) {
      case "line":
        return (
          <LineChart data={indicator.historical}>
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", 
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={{ r: 3, fill: color, stroke: color }}
              activeDot={{ r: 5, fill: color, stroke: "#0F172A" }}
            />
          </LineChart>
        );
        
      case "bar":
        return (
          <BarChart data={indicator.historical}>
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              width={30}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", 
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px"
              }}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
        
      case "area":
        return (
          <AreaChart data={indicator.historical}>
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              width={30}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", 
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px"
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fill={color} 
              fillOpacity={0.3} 
            />
          </AreaChart>
        );
        
      case "pie":
        // For pie charts, we'll compare current value to target or max possible
        const pieData = [
          { name: "Current", value: indicator.value },
          { name: "Remaining", value: (indicator.target || 100) - indicator.value }
        ];
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              <Cell key={`cell-0`} fill={color} />
              <Cell key={`cell-1`} fill="#334155" />
            </Pie>
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", 
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px"
              }}
            />
          </PieChart>
        );
        
      default:
        return <div className="text-center">Chart type not supported</div>;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  );
};
