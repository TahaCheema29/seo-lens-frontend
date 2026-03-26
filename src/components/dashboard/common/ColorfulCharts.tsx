'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
  showValues?: boolean;
  barColor?: string;
}

const defaultColors = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#84cc16', // lime
];

export function ColorfulBarChart({ 
  data, 
  height = 250, 
  className,
  showValues = false,
}: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <div className="h-full flex items-end justify-between gap-2">
        {data.map((item, index) => {
          const heightPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          const color = item.color || defaultColors[index % defaultColors.length];
          
          return (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
            >
              {showValues && (
                <span className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity text-[var(--dashboard-text)]">
                  {item.value.toLocaleString()}
                </span>
              )}
              <div
                className="w-full rounded-t-md transition-all duration-500 hover:opacity-80 relative overflow-hidden"
                style={{ 
                  height: `${Math.max(heightPercent, 5)}%`, 
                  minHeight: '4px',
                  backgroundColor: color,
                  boxShadow: `0 4px 12px ${color}40`,
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                />
              </div>
              <span className="text-xs text-[var(--dashboard-text-muted)] truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
  lineColor?: string;
  fillColor?: string;
  showPoints?: boolean;
  showArea?: boolean;
}

export function ColorfulLineChart({ 
  data, 
  height = 250, 
  className,
  lineColor = '#3b82f6',
  fillColor,
  showPoints = true,
  showArea = true,
}: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 90 - 5; // 5% padding
    return { x, y, value: item.value, label: item.label };
  });
  
  const pathD = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    // Smooth curve using quadratic bezier
    const prev = points[index - 1];
    const cpX = (prev.x + point.x) / 2;
    return `${acc} Q ${cpX} ${prev.y} ${point.x} ${point.y}`;
  }, '');
  
  const areaD = showArea 
    ? `${pathD} L 100 100 L 0 100 Z`
    : '';
  
  const actualFillColor = fillColor || `${lineColor}20`;
  
  return (
    <div className={cn('w-full relative', className)} style={{ height }}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="var(--dashboard-border)"
            strokeWidth="0.2"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Area fill */}
        {showArea && (
          <path
            d={areaD}
            fill={actualFillColor}
            className="transition-all duration-500"
          />
        )}
        
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 2px 4px ${lineColor}50)` }}
          className="transition-all duration-500"
        />
        
        {/* Data points */}
        {showPoints && points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill={lineColor}
              stroke="white"
              strokeWidth="0.5"
              className="transition-all duration-300 hover:r-2"
            />
          </g>
        ))}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <span 
            key={index} 
            className="text-xs text-[var(--dashboard-text-muted)] truncate flex-1 text-center"
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface DualChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
  title?: string;
  showToggle?: boolean;
}

export function DualChart({ 
  data, 
  height = 300, 
  className,
  title,
  showToggle = true,
}: DualChartProps) {
  const [chartType, setChartType] = React.useState<'bar' | 'line'>('bar');
  
  return (
    <div className={cn('w-full', className)}>
      {(title || showToggle) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-semibold text-[var(--dashboard-text)]">{title}</h3>}
          {showToggle && (
            <div className="flex gap-1 bg-[var(--dashboard-sidebar-hover)] rounded-lg p-1">
              <button
                onClick={() => setChartType('bar')}
                className={cn(
                  'px-3 py-1 rounded-md text-sm font-medium transition-all',
                  chartType === 'bar' 
                    ? 'bg-[var(--dashboard-card)] text-[var(--dashboard-text)] shadow-sm' 
                    : 'text-[var(--dashboard-text-muted)] hover:text-[var(--dashboard-text)]'
                )}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType('line')}
                className={cn(
                  'px-3 py-1 rounded-md text-sm font-medium transition-all',
                  chartType === 'line' 
                    ? 'bg-[var(--dashboard-card)] text-[var(--dashboard-text)] shadow-sm' 
                    : 'text-[var(--dashboard-text-muted)] hover:text-[var(--dashboard-text)]'
                )}
              >
                Line
              </button>
            </div>
          )}
        </div>
      )}
      
      {chartType === 'bar' ? (
        <ColorfulBarChart data={data} height={height} />
      ) : (
        <ColorfulLineChart data={data} height={height} />
      )}
    </div>
  );
}
