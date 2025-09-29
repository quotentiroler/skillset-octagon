import { css } from '@emotion/react';

// Emotion CSS example - pulse animation
export const pulseAnimation = css`
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }

  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

// Emotion CSS - gradient text
export const gradientText = css`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
`;

// Emotion CSS - skill level indicator
export const skillLevelIndicator = (level: number, color: string) => css`
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: ${level * 10}%;
    height: 3px;
    background: linear-gradient(90deg, ${color}, ${color}80);
    border-radius: 2px;
    transition: width 0.5s ease-out;
  }
`;

// Floating button animations
export const floatingButtonBase = css`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Glow effect keyframes
export const glowKeyframes = css`
  @keyframes glow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;