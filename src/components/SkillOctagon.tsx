import React from 'react';
import type { Skill } from '../types/skills';
import { useSkillStore } from '../store/skillStore';

interface SkillOctagonProps {
  skills: Skill[];
  size?: number;
}

const SkillOctagon: React.FC<SkillOctagonProps> = ({ skills, size = 400 }) => {
  const { profiles, currentProfileId } = useSkillStore();
  const currentProfile = profiles.find(p => p.id === currentProfileId);
  
  const center = size / 2;
  const maxRadius = (size * 0.8) / 2;
  const numSides = 8;
  
  // Calculate octagon vertices
  const getOctagonPoints = (radius: number) => {
    const points: [number, number][] = [];
    for (let i = 0; i < numSides; i++) {
      const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2; // Start from top
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push([x, y]);
    }
    return points;
  };

  // Generate grid lines (concentric octagons)
  const gridLevels = [2, 4, 6, 8, 10];
  
  // Calculate skill polygon points
  const skillPoints = skills.map((skill, index) => {
    const angle = (index * 2 * Math.PI) / numSides - Math.PI / 2;
    const radius = (skill.value / 10) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return [x, y];
  });

  const skillPolygonPath = `M ${skillPoints.map(([x, y]) => `${x},${y}`).join(' L ')} Z`;

  return (
    <div className="flex flex-col items-center">
      {/* Profile indicator */}
      {currentProfile && (
        <div className="mb-4 px-4 py-2 bg-blue-100 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700">
            <span className="font-medium">Profile:</span> {currentProfile.name}
          </div>
          <div className="text-xs text-blue-600">
            Last updated: {new Date(currentProfile.updatedAt).toLocaleString()}
          </div>
        </div>
      )}
      
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid lines */}
        {gridLevels.map((level) => {
          const radius = (level / 10) * maxRadius;
          const points = getOctagonPoints(radius);
          const pathData = `M ${points.map(([x, y]) => `${x},${y}`).join(' L ')} Z`;
          
          return (
            <path
              key={level}
              d={pathData}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}
        
        {/* Radial lines */}
        {Array.from({ length: numSides }).map((_, index) => {
          const angle = (index * 2 * Math.PI) / numSides - Math.PI / 2;
          const endX = center + maxRadius * Math.cos(angle);
          const endY = center + maxRadius * Math.sin(angle);
          
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
        
        {/* Skill polygon fill */}
        <path
          d={skillPolygonPath}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinejoin="round"
          className="transition-all duration-300 ease-in-out"
        />
        
        {/* Skill points */}
        {skillPoints.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="4"
            fill={skills[index].color || "#3b82f6"}
            stroke="white"
            strokeWidth="2"
            className="transition-all duration-300 ease-in-out hover:r-6 cursor-pointer"
          />
        ))}
        
        {/* Skill labels */}
        {skills.map((skill, index) => {
          const angle = (index * 2 * Math.PI) / numSides - Math.PI / 2;
          const labelRadius = maxRadius + 30;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium fill-gray-700"
            >
              {skill.name}
            </text>
          );
        })}
        
        {/* Value labels on grid */}
        {gridLevels.map((level) => (
          <text
            key={level}
            x={center}
            y={center - (level / 10) * maxRadius - 5}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {level}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default SkillOctagon;