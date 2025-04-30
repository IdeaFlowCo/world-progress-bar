
import { useState, useCallback } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts";
import { ProgressIndicator } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface IndicatorChartProps {
  indicator: ProgressIndicator;
  height?: number;
}

export const IndicatorChart = ({ indicator, height = 150 }: IndicatorChartProps) => {
  const color = indicator.color || "#06B6D4";
  const [leftX, setLeftX] = useState<number | string | undefined>(undefined);
  const [rightX, setRightX] = useState<number | string | undefined>(undefined);
  const [refAreaLeft, setRefAreaLeft] = useState<number | string | undefined>(undefined);
  const [refAreaRight, setRefAreaRight] = useState<number | string | undefined>(undefined);
  const [zoomActive, setZoomActive] = useState(false);
  
  // For domain control
  const [zoomedDomainX, setZoomedDomainX] = useState<[number, number] | undefined>(undefined);
  const [zoomedDomainY, setZoomedDomainY] = useState<[number, number] | undefined>(undefined);
  
  // Determine if this is a percentage-based indicator
  const isPercentage = indicator.unit === "%" || indicator.unit === "percent";
  
  // Set domain max value - cap at 100 if it's a percentage
  const getYAxisDomain = () => {
    // Use zoomed domain if available
    if (zoomedDomainY) return zoomedDomainY;
    
    // For percentage values, cap at 100
    if (isPercentage) {
      return [0, 100];
    }
    
    // For other values, calculate a reasonable upper bound
    // Find the maximum value in historical data
    const maxHistorical = Math.max(...indicator.historical.map(item => item.value));
    const targetValue = indicator.target || 0;
    
    // Use whichever is greater: the max historical value or the target value
    const maxValue = Math.max(maxHistorical, targetValue);
    
    // Add a 10% buffer to the maximum for better visualization
    return [0, Math.ceil(maxValue * 1.1)];
  };
  
  // Handle mouse events for zoom selection
  const handleMouseDown = useCallback((e) => {
    if (!zoomActive) return;
    setRefAreaLeft(e?.activeLabel);
  }, [zoomActive]);

  const handleMouseMove = useCallback((e) => {
    if (!zoomActive || !refAreaLeft) return;
    setRefAreaRight(e?.activeLabel);
  }, [zoomActive, refAreaLeft]);

  const handleMouseUp = useCallback(() => {
    if (!zoomActive || !refAreaLeft || !refAreaRight) {
      setRefAreaLeft(undefined);
      setRefAreaRight(undefined);
      return;
    }
    
    // Convert string years to numbers for comparison
    const refLeft = Number(refAreaLeft);
    const refRight = Number(refAreaRight);

    // Ensure we have valid numbers and a proper range
    if (isNaN(refLeft) || isNaN(refRight) || refLeft === refRight) {
      setRefAreaLeft(undefined);
      setRefAreaRight(undefined);
      return;
    }

    // Sort the years to handle drag in any direction
    const [startYear, endYear] = [refLeft, refRight].sort((a, b) => a - b);

    // Find min/max values within the selected range
    const filteredData = indicator.historical.filter(
      item => item.year >= startYear && item.year <= endYear
    );
    
    if (filteredData.length > 0) {
      const minValue = Math.min(...filteredData.map(item => item.value));
      const maxValue = Math.max(...filteredData.map(item => item.value));
      
      // Add padding to y-axis
      const yPadding = (maxValue - minValue) * 0.1;
      const minY = Math.max(0, minValue - yPadding);
      const maxY = isPercentage ? 100 : maxValue + yPadding;
      
      setZoomedDomainX([startYear, endYear]);
      setZoomedDomainY([minY, maxY]);
    }
    
    setRefAreaLeft(undefined);
    setRefAreaRight(undefined);
  }, [zoomActive, refAreaLeft, refAreaRight, indicator.historical, isPercentage]);

  // Reset zoom
  const handleResetZoom = useCallback(() => {
    setZoomedDomainX(undefined);
    setZoomedDomainY(undefined);
    setLeftX(undefined);
    setRightX(undefined);
  }, []);

  // Toggle zoom mode
  const toggleZoom = useCallback(() => {
    setZoomActive(!zoomActive);
    if (zoomActive) {
      // Reset selection if leaving zoom mode
      setRefAreaLeft(undefined);
      setRefAreaRight(undefined);
    }
  }, [zoomActive]);
  
  const renderChart = () => {
    switch (indicator.chartType) {
      case "line":
        return (
          <LineChart 
            data={indicator.historical}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              domain={zoomedDomainX ? zoomedDomainX : ['dataMin', 'dataMax']}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              width={30}
              domain={getYAxisDomain()}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", 
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px"
              }} 
              formatter={(value: number) => [`${value}${isPercentage ? '%' : ''}`, indicator.unit]}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={{ r: 3, fill: color, stroke: color }}
              activeDot={{ r: 5, fill: color, stroke: "#0F172A" }}
            />
            {refAreaLeft && refAreaRight && (
              <ReferenceArea 
                x1={refAreaLeft} 
                x2={refAreaRight} 
                strokeOpacity={0.3}
                fill={color} 
                fillOpacity={0.3} 
              />
            )}
          </LineChart>
        );
        
      case "bar":
        return (
          <BarChart 
            data={indicator.historical}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              domain={zoomedDomainX ? zoomedDomainX : ['dataMin', 'dataMax']}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              width={30}
              domain={getYAxisDomain()}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", 
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px"
              }}
              formatter={(value: number) => [`${value}${isPercentage ? '%' : ''}`, indicator.unit]}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            {refAreaLeft && refAreaRight && (
              <ReferenceArea 
                x1={refAreaLeft} 
                x2={refAreaRight} 
                strokeOpacity={0.3}
                fill={color} 
                fillOpacity={0.3} 
              />
            )}
          </BarChart>
        );
        
      case "area":
        return (
          <AreaChart 
            data={indicator.historical}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              domain={zoomedDomainX ? zoomedDomainX : ['dataMin', 'dataMax']}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "#94A3B8" }} 
              axisLine={{ stroke: "#334155" }}
              tickLine={{ stroke: "#334155" }}
              width={30}
              domain={getYAxisDomain()}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", 
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px"
              }}
              formatter={(value: number) => [`${value}${isPercentage ? '%' : ''}`, indicator.unit]}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fill={color} 
              fillOpacity={0.3} 
            />
            {refAreaLeft && refAreaRight && (
              <ReferenceArea 
                x1={refAreaLeft} 
                x2={refAreaRight} 
                strokeOpacity={0.3}
                fill={color} 
                fillOpacity={0.3} 
              />
            )}
          </AreaChart>
        );
        
      case "pie":
        // For pie charts, we'll compare current value to target or max possible
        const pieData = [
          { name: "Current", value: indicator.value },
          { name: "Remaining", value: (indicator.target || (isPercentage ? 100 : indicator.value * 2)) - indicator.value }
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
              formatter={(value: number) => [`${value}${isPercentage ? '%' : ''}`, indicator.unit]}
            />
          </PieChart>
        );
        
      default:
        return <div className="text-center">Chart type not supported</div>;
    }
  };

  return (
    <div className="w-full h-full relative">
      {indicator.chartType !== "pie" && (
        <div className="absolute top-0 right-0 z-10 flex space-x-1">
          <Button
            size="icon"
            variant="ghost"
            className={`h-6 w-6 p-0 ${zoomActive ? 'bg-dashboard-accent1/20' : ''}`}
            onClick={toggleZoom}
            title={zoomActive ? "Exit zoom mode" : "Enter zoom mode"}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          {(zoomedDomainX || zoomedDomainY) && (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={handleResetZoom}
              title="Reset zoom"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
      
      {zoomActive && indicator.chartType !== "pie" && (
        <div className="absolute bottom-0 left-0 right-0 bg-slate-800/70 text-xs text-slate-300 p-1 text-center rounded">
          Click and drag to zoom
        </div>
      )}
    </div>
  );
};
