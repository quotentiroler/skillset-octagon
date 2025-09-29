/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from 'styled-components';
import { useSkillStore } from '../store/skillStore';
import type { Skill } from '../types/skills';

// Animation keyframes
const slideIn = keyframes`
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const mergeAnimation = keyframes`
  0% {
    transform: scale(0.8) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.8);
  }
`;

// Styled components
const MergerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ProfileSelector = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const MergeButton = styled.button<{ isAnimating: boolean }>`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => props.isAnimating && css`
    animation: ${pulseGlow} 2s ease infinite;
    pointer-events: none;
  `}

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const OctagonContainer = styled.div<{ isAnimating: boolean; animationType?: 'left' | 'right' | 'merge' }>`
  position: relative;
  
  ${props => props.isAnimating && props.animationType === 'left' && css`
    animation: ${slideIn} 0.8s ease-out;
  `}
  
  ${props => props.isAnimating && props.animationType === 'right' && css`
    animation: ${slideInRight} 0.8s ease-out;
  `}
  
  ${props => props.isAnimating && props.animationType === 'merge' && css`
    animation: ${mergeAnimation} 1.5s ease-out;
  `}
`;

const ResultLabel = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #4f46e5;
  margin-bottom: 1rem;
`;

interface MiniOctagonProps {
  skills: Skill[];
  size?: number;
  title: string;
}

const MiniOctagon: React.FC<MiniOctagonProps> = ({ skills, size = 200, title }) => {
  const getOctagonPoints = (centerX: number, centerY: number, radius: number): string => {
    const points: string[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const getSkillPoints = (centerX: number, centerY: number, maxRadius: number): string => {
    const points: string[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const skillValue = skills[i]?.value || 0;
      const radius = (skillValue / 10) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const center = size / 2;
  const maxRadius = size * 0.35;

  return (
    <div className="text-center">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <svg width={size} height={size} className="border border-gray-200 rounded-lg bg-white">
        {/* Grid lines */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale) => (
          <polygon
            key={scale}
            points={getOctagonPoints(center, center, maxRadius * scale)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Skill polygon */}
        <polygon
          points={getSkillPoints(center, center, maxRadius)}
          fill="rgba(99, 102, 241, 0.3)"
          stroke="#6366f1"
          strokeWidth="2"
        />
        
        {/* Skill labels */}
        {skills.map((skill, index) => {
          const angle = (index * Math.PI) / 4 - Math.PI / 2;
          const labelRadius = maxRadius + 20;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-600"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const OctagonMerger: React.FC = () => {
  const { profiles } = useSkillStore();
  const [profileA, setProfileA] = useState<string>('');
  const [profileB, setProfileB] = useState<string>('');
  const [mergedSkills, setMergedSkills] = useState<Skill[] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const selectedProfileA = profiles.find(p => p.id === profileA);
  const selectedProfileB = profiles.find(p => p.id === profileB);

  const canMerge = profileA && profileB && profileA !== profileB;

  const mergeDuration = 2000; // 2 seconds

  const handleMerge = async () => {
    if (!selectedProfileA || !selectedProfileB) return;

    setIsAnimating(true);
    
    // Calculate merged skills: (A + B) / 2
    const merged: Skill[] = selectedProfileA.skills.map((skillA, index) => {
      const skillB = selectedProfileB.skills[index];
      return {
        name: skillA.name,
        value: Math.round((skillA.value + skillB.value) / 2),
        color: skillA.color, // Keep the original colors
      };
    });

    // Simulate animation duration
    setTimeout(() => {
      setMergedSkills(merged);
      setIsAnimating(false);
    }, mergeDuration);
  };

  const resetMerge = () => {
    setMergedSkills(null);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🔄 Merge Skill Octagons
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select two skill profiles to merge them together. The result will show the average of both profiles: (A + B) ÷ 2
        </p>
      </div>

      <MergerContainer>
        {/* Profile Selectors */}
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile A
            </label>
            <ProfileSelector
              value={profileA}
              onChange={(e) => setProfileA(e.target.value)}
              disabled={isAnimating}
            >
              <option value="">Select Profile A</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </ProfileSelector>
          </div>

          <div className="text-4xl">{isAnimating ? '🔄' : '+'}</div>

          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile B
            </label>
            <ProfileSelector
              value={profileB}
              onChange={(e) => setProfileB(e.target.value)}
              disabled={isAnimating}
            >
              <option value="">Select Profile B</option>
              {profiles.filter(p => p.id !== profileA).map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </ProfileSelector>
          </div>
        </div>

        {/* Merge Button */}
        <MergeButton
          onClick={handleMerge}
          disabled={!canMerge || isAnimating}
          isAnimating={isAnimating}
        >
          {isAnimating ? '🔄 Merging...' : '✨ Merge Profiles'}
        </MergeButton>

        {/* Octagon Display */}
        <div className="flex gap-8 items-center justify-center flex-wrap">
          {selectedProfileA && (
            <OctagonContainer 
              isAnimating={isAnimating} 
              animationType="left"
            >
              <MiniOctagon
                skills={selectedProfileA.skills}
                title={selectedProfileA.name}
              />
            </OctagonContainer>
          )}

          {selectedProfileA && selectedProfileB && !mergedSkills && (
            <div className="text-2xl">➕</div>
          )}

          {selectedProfileB && (
            <OctagonContainer 
              isAnimating={isAnimating} 
              animationType="right"
            >
              <MiniOctagon
                skills={selectedProfileB.skills}
                title={selectedProfileB.name}
              />
            </OctagonContainer>
          )}

          {mergedSkills && (
            <OctagonContainer 
              isAnimating={true} 
              animationType="merge"
            >
              <ResultLabel>Merged Result</ResultLabel>
              <MiniOctagon
                skills={mergedSkills}
                title="Average Profile"
                size={250}
              />
              <button
                onClick={resetMerge}
                className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Reset
              </button>
            </OctagonContainer>
          )}
        </div>

        {profiles.length < 2 && (
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              📝 You need at least 2 saved profiles to use the merge feature.
              <br />
              Go to the Profiles tab to create some skill profiles first!
            </p>
          </div>
        )}
      </MergerContainer>
    </div>
  );
};

export default OctagonMerger;