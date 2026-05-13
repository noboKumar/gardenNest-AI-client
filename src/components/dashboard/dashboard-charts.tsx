"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface DashboardChartsProps {
  tips: any[];
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export function DashboardCharts({ tips }: DashboardChartsProps) {
  // 1. Process data for Bar Chart (Tips by Category)
  const categoryData = tips.reduce((acc: any[], tip) => {
    const existing = acc.find((item) => item.name === tip.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: tip.category || "Uncategorized", count: 1 });
    }
    return acc;
  }, []);

  // 2. Process data for Pie Chart (Difficulty Levels)
  const levelData = tips.reduce((acc: any[], tip) => {
    const existing = acc.find((item) => item.name === tip.level);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: tip.level || "Easy", value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Bar Chart */}
      <Card className="border-green-100 dark:border-green-950 shadow-md">
        <CardHeader>
          <CardTitle>Content Distribution</CardTitle>
          <CardDescription>Number of tips per category</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="count" 
                fill="currentColor" 
                radius={[4, 4, 0, 0]} 
                className="fill-green-600" 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Level Pie Chart */}
      <Card className="border-green-100 dark:border-green-950 shadow-md">
        <CardHeader>
          <CardTitle>Difficulty Breakdown</CardTitle>
          <CardDescription>Tips grouped by difficulty level</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={levelData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {levelData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
