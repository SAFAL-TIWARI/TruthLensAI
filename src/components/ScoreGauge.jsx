import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getColor = (s) => {
    if (s >= 75) return '#10b981'; // Green
    if (s >= 40) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getLabel = (s) => {
    if (s >= 75) return 'Reliable';
    if (s >= 40) return 'Mixed';
    return 'Low Trust';
  };

  return (
    <div className="relative w-full h-[240px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            startAngle={180}
            endAngle={0}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={getColor(score)} />
            <Cell fill="#e2e8f0" opacity={0.3} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl font-bold font-display"
          style={{ color: getColor(score) }}
        >
          {score}
        </motion.span>
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">
          {getLabel(score)}
        </span>
      </div>
    </div>
  );
};

export default ScoreGauge;
