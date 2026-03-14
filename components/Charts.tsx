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
          <PolarGrid stroke="rgba(10, 25, 47, 0.05)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(10, 25, 47, 0.4)', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Your Profile"
            dataKey="You"
            stroke="#0A192F"
            strokeWidth={1.5}
            fill="#4A6FA5"
            fillOpacity={0.1}
          />
          <Radar
            name="Job Requirement"
            dataKey="Job"
            stroke="rgba(74, 111, 165, 0.2)"
            strokeWidth={1}
            strokeDasharray="4 4"
            fill="transparent"
          />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '20px' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: '1px solid rgba(10, 25, 47, 0.05)', boxShadow: '0 10px 30px rgba(10, 25, 47, 0.1)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.8)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SkillBarChart: React.FC<{ skills: SkillPoint[]; type: 'Tech' | 'Soft' }> = ({ skills, type }) => {
  const data = skills.slice(0, 5); // Top 5
  const barColor = '#4A6FA5';

  return (
    <div className="h-[250px] w-full mt-4">
      <h4 className="text-center text-[10px] font-bold text-[#0A192F]/30 uppercase tracking-widest mb-4">{type} Skills Gap</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontWeight: 600, fill: 'rgba(10, 25, 47, 0.5)' }} interval={0} axisLine={false} tickLine={false} />
          <Tooltip 
             cursor={{fill: 'rgba(10, 25, 47, 0.02)'}}
             contentStyle={{ borderRadius: '12px', border: '1px solid rgba(10, 25, 47, 0.05)', boxShadow: '0 10px 30px rgba(10, 25, 47, 0.1)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.8)' }}
          />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
          <Bar dataKey="score" name="Your Level" fill={barColor} radius={[0, 2, 2, 0]} barSize={8} />
          <Bar dataKey="importance" name="Required Level" fill="rgba(10, 25, 47, 0.1)" radius={[0, 2, 2, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const radius = 60;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
       <div className="relative w-40 h-40 flex items-center justify-center">
         <svg
           height={radius * 2}
           width={radius * 2}
           className="rotate-[-90deg]"
         >
           <circle
             stroke="rgba(10, 25, 47, 0.05)"
             strokeWidth={stroke}
             fill="transparent"
             r={normalizedRadius}
             cx={radius}
             cy={radius}
           />
           <circle
             className="text-[#4A6FA5] transition-all duration-1000 ease-out"
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
            <span className="text-4xl font-bold text-[#0A192F] tracking-tighter">{score}%</span>
            <span className="text-[10px] text-[#0A192F]/30 uppercase font-black tracking-widest mt-1">Precision</span>
         </div>
       </div>
    </div>
  );
};
