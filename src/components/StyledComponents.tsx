/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import { pulseAnimation, gradientText, skillLevelIndicator } from '../styles/animations';

// Styled-components example - animated skill card
export const AnimatedSkillCard = styled.div<{ skillValue: number; skillColor: string }>`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.skillColor};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.skillColor}, ${props => props.skillColor}99);
    transform: scaleX(${props => props.skillValue / 10});
    transform-origin: left;
    transition: transform 0.5s ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background: ${props => props.skillColor}20;
    border-radius: 50%;
    transform: translate(50%, -50%);
    opacity: ${props => props.skillValue / 10};
    transition: opacity 0.3s ease;
  }
`;

// Styled-components for skill slider
export const StyledSlider = styled.input<{ skillColor: string; skillValue: number }>`
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    ${props => props.skillColor} 0%,
    ${props => props.skillColor} ${props => props.skillValue * 10}%,
    #e5e7eb ${props => props.skillValue * 10}%,
    #e5e7eb 100%
  );
  outline: none;
  transition: all 0.3s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.skillColor};
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.skillColor};
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

// Styled-components - floating action button
export const FloatingButton = styled.button<{ isActive: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  
  ${props => props.isActive && css`
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    transform: rotate(45deg);
    box-shadow: 0 12px 35px rgba(245, 87, 108, 0.4);
  `}

  &:hover {
    transform: ${props => props.isActive ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)'};
    box-shadow: 0 12px 35px ${props => props.isActive ? 'rgba(245, 87, 108, 0.6)' : 'rgba(102, 126, 234, 0.6)'};
  }

  &:active {
    transform: ${props => props.isActive ? 'rotate(45deg) scale(0.95)' : 'scale(0.95)'};
  }
`;

// Styled-components - glowing border container
export const GlowContainer = styled.div<{ glowColor: string }>`
  position: relative;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(45deg, ${props => props.glowColor}, transparent, ${props => props.glowColor});
  background-size: 200% 200%;
  animation: glow 3s ease infinite;

  @keyframes glow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  > div {
    background: white;
    border-radius: 14px;
    padding: 1.5rem;
  }
`;

// Demo component showcasing CSS-in-JS capabilities
export const StyledComponentsDemo: React.FC = () => {
  const [activeButton, setActiveButton] = React.useState(false);
  const [skillLevel, setSkillLevel] = React.useState(7);

  return (
    <div className="p-6 space-y-6">
      <h2 css={gradientText}>CSS-in-JS Demo</h2>
      
      <GlowContainer glowColor="#667eea">
        <div>
          <AnimatedSkillCard skillValue={skillLevel} skillColor="#10b981">
            <h3 className="font-bold text-lg mb-2">Leadership Skills</h3>
            <p className="text-gray-600">Level {skillLevel}/10</p>
            <StyledSlider
              type="range"
              min="0"
              max="10"
              value={skillLevel}
              skillColor="#10b981"
              skillValue={skillLevel}
              onChange={(e) => setSkillLevel(Number(e.target.value))}
              className="mt-4"
            />
          </AnimatedSkillCard>
        </div>
      </GlowContainer>

      <div css={[pulseAnimation, { padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }]}>
        <p css={skillLevelIndicator(8, '#3b82f6')}>Innovation: 8/10</p>
      </div>

      <FloatingButton 
        isActive={activeButton}
        onClick={() => setActiveButton(!activeButton)}
        title="Toggle Demo"
      >
        ✨
      </FloatingButton>
    </div>
  );
};