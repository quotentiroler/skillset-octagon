export interface Skill {
  name: string;
  value: number; // 1-10 scale
  color?: string;
}

export interface SkillSet {
  skills: Skill[];
}

export const DEFAULT_SKILLS: Skill[] = [
  { name: "Vision", value: 5, color: "#ef4444" },
  { name: "Leadership", value: 5, color: "#f97316" },
  { name: "Technical", value: 5, color: "#eab308" },
  { name: "Strategy", value: 5, color: "#22c55e" },
  { name: "Sales", value: 5, color: "#06b6d4" },
  { name: "Networking", value: 5, color: "#3b82f6" },
  { name: "Resilience", value: 5, color: "#8b5cf6" },
  { name: "Innovation", value: 5, color: "#ec4899" },
];

export const SKILL_LABELS = [
  "Vision", "Leadership", "Technical", "Strategy", 
  "Sales", "Networking", "Resilience", "Innovation"
] as const;

export type SkillLabel = typeof SKILL_LABELS[number];