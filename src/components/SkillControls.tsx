import React from 'react';
import type { Skill } from '../types/skills';
import { useSkillStore } from '../store/skillStore';

interface SkillSliderProps {
  skill: Skill;
  index: number;
}

const SkillSlider: React.FC<SkillSliderProps> = ({ skill, index }) => {
  const { updateSkillValue, updateSkillName } = useSkillStore();

  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border">
      <div className="flex-1">
        <input
          type="text"
          value={skill.name}
          onChange={(e) => updateSkillName(index, e.target.value)}
          className="block w-full text-sm font-medium text-gray-700 mb-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Skill name"
        />
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="10"
            value={skill.value}
            onChange={(e) => updateSkillValue(index, parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, ${skill.color || '#3b82f6'} 0%, ${skill.color || '#3b82f6'} ${skill.value * 10}%, #e5e7eb ${skill.value * 10}%, #e5e7eb 100%)`
            }}
          />
          <div className="w-8 text-center">
            <span className="text-sm font-semibold text-gray-800">
              {skill.value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillControls: React.FC = () => {
  const { skills, resetAllSkills, randomizeSkills } = useSkillStore();

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Adjust Skills</h2>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <SkillSlider
            key={index}
            skill={skill}
            index={index}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Presets</h3>
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => resetAllSkills(5)}
            className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            Reset All (5)
          </button>
          <button 
            onClick={randomizeSkills}
            className="px-3 py-1 text-xs bg-blue-200 hover:bg-blue-300 rounded transition-colors"
          >
            Random
          </button>
          <button 
            onClick={() => resetAllSkills(10)}
            className="px-3 py-1 text-xs bg-green-200 hover:bg-green-300 rounded transition-colors"
          >
            Max All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillControls;