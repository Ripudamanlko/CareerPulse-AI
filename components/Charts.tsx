import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { SkillPoint } from '../types';

export const MatchRadar: React.FC<{ skills: SkillPoint[] }> = ({ skills }) => {
  // Combine top skills for a cleaner radar chart
  const data = skills.slice(0, 6).map(s => ({
    subject: s.name,
    You: s.score,
    Job: s.importance,
    fullMark: 100,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Your Profile"
            dataKey="You"
            stroke="#6366f1"
            strokeWidth={2}
            fill="#6366f1"
            fillOpacity={0.4}
          />
          <Radar
            name="Job Requirement"
            dataKey="Job"
            stroke="#10b981"
            strokeWidth={2}
            fill="#10b981"
            fillOpacity={0.1}
          />
          <Legend />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SkillBarChart: React.FC<{ skills: SkillPoint[]; type: 'Tech' | 'Soft' }> = ({ skills, type }) => {
  const data = skills.slice(0, 5); // Top 5
  const barColor = type === 'Tech' ? '#3b82f6' : '#ec4899';

  return (
    <div className="h-[250px] w-full mt-4">
      <h4 className="text-center text-sm font-semibold text-slate-500 mb-2">{type} Skills Gap</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} interval={0} />
          <Tooltip 
             cursor={{fill: 'transparent'}}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar dataKey="score" name="Your Level" fill={barColor} radius={[0, 4, 4, 0]} barSize={12} />
          <Bar dataKey="importance" name="Required Level" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = 'text-red-500';
  if (score > 60) color = 'text-yellow-500';
  if (score > 80) color = 'text-emerald-500';

  return (
    <div className="flex flex-col items-center justify-center">
       <div className="relative w-32 h-32 flex items-center justify-center">
         <svg
           height={radius * 2}
           width={radius * 2}
           className="rotate-[-90deg]"
         >
           <circle
             stroke="#e2e8f0"
             strokeWidth={stroke}
             fill="transparent"
             r={normalizedRadius}
             cx={radius}
             cy={radius}
           />
           <circle
             className={`${color} transition-all duration-1000 ease-out`}
             stroke="currentColor"
             strokeWidth={stroke}
             strokeDasharray={circumference + ' ' + circumference}
             style={{ strokeDashoffset }}
             strokeLinecap="round"
             fill="transparent"
             r={normalizedRadius}
             cx={radius}
             cy={radius}
           />
         </svg>
         <div className="absolute flex flex-col items-center">
            <span className={`text-3xl font-bold ${color}`}>{score}%</span>
            <span className="text-xs text-slate-400 uppercase font-semibold">Match</span>
         </div>
       </div>
    </div>
  );
};