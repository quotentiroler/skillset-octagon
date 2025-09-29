import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Skill } from '../types/skills'

export interface SkillProfile {
  id: string
  name: string
  skills: Skill[]
  createdAt: Date
  updatedAt: Date
}

interface SkillStore {
  // Current skills state
  skills: Skill[]
  
  // Saved profiles
  profiles: SkillProfile[]
  currentProfileId: string | null
  
  // Actions for skills
  updateSkillValue: (index: number, value: number) => void
  updateSkillName: (index: number, name: string) => void
  resetAllSkills: (value?: number) => void
  randomizeSkills: () => void
  
  // Actions for profiles
  saveCurrentProfile: (name: string) => void
  loadProfile: (profileId: string) => void
  deleteProfile: (profileId: string) => void
  createNewProfile: () => void
  updateCurrentProfileName: (name: string) => void
  
  // Utility actions
  exportData: () => string
  importData: (jsonData: string) => boolean
}

const defaultSkills: Skill[] = [
  { name: "Vision", value: 5, color: "#ef4444" },
  { name: "Leadership", value: 5, color: "#f97316" },
  { name: "Technical", value: 5, color: "#eab308" },
  { name: "Strategy", value: 5, color: "#22c55e" },
  { name: "Sales", value: 5, color: "#06b6d4" },
  { name: "Networking", value: 5, color: "#3b82f6" },
  { name: "Resilience", value: 5, color: "#8b5cf6" },
  { name: "Innovation", value: 5, color: "#ec4899" },
]

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

export const useSkillStore = create<SkillStore>()(
  persist(
    (set, get) => ({
      // Initial state
      skills: [...defaultSkills],
      profiles: [],
      currentProfileId: null,

      // Skill actions
      updateSkillValue: (index, value) =>
        set((state) => {
          const newSkills = [...state.skills]
          newSkills[index] = { ...newSkills[index], value }
          
          // Auto-update current profile if one is loaded
          const updatedProfiles = state.currentProfileId 
            ? state.profiles.map(profile => 
                profile.id === state.currentProfileId
                  ? { ...profile, skills: newSkills, updatedAt: new Date() }
                  : profile
              )
            : state.profiles

          return { 
            skills: newSkills, 
            profiles: updatedProfiles 
          }
        }),

      updateSkillName: (index, name) =>
        set((state) => {
          const newSkills = [...state.skills]
          newSkills[index] = { ...newSkills[index], name }
          
          // Auto-update current profile if one is loaded
          const updatedProfiles = state.currentProfileId 
            ? state.profiles.map(profile => 
                profile.id === state.currentProfileId
                  ? { ...profile, skills: newSkills, updatedAt: new Date() }
                  : profile
              )
            : state.profiles

          return { 
            skills: newSkills, 
            profiles: updatedProfiles 
          }
        }),

      resetAllSkills: (value = 5) =>
        set((state) => {
          const newSkills = state.skills.map(skill => ({ ...skill, value }))
          
          const updatedProfiles = state.currentProfileId 
            ? state.profiles.map(profile => 
                profile.id === state.currentProfileId
                  ? { ...profile, skills: newSkills, updatedAt: new Date() }
                  : profile
              )
            : state.profiles

          return { 
            skills: newSkills, 
            profiles: updatedProfiles 
          }
        }),

      randomizeSkills: () =>
        set((state) => {
          const newSkills = state.skills.map(skill => ({
            ...skill,
            value: Math.floor(Math.random() * 10) + 1
          }))
          
          const updatedProfiles = state.currentProfileId 
            ? state.profiles.map(profile => 
                profile.id === state.currentProfileId
                  ? { ...profile, skills: newSkills, updatedAt: new Date() }
                  : profile
              )
            : state.profiles

          return { 
            skills: newSkills, 
            profiles: updatedProfiles 
          }
        }),

      // Profile actions
      saveCurrentProfile: (name) =>
        set((state) => {
          const newProfile: SkillProfile = {
            id: generateId(),
            name,
            skills: [...state.skills],
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          return {
            profiles: [...state.profiles, newProfile],
            currentProfileId: newProfile.id
          }
        }),

      loadProfile: (profileId) =>
        set((state) => {
          const profile = state.profiles.find(p => p.id === profileId)
          if (!profile) return state
          
          return {
            skills: [...profile.skills],
            currentProfileId: profileId
          }
        }),

      deleteProfile: (profileId) =>
        set((state) => ({
          profiles: state.profiles.filter(p => p.id !== profileId),
          currentProfileId: state.currentProfileId === profileId ? null : state.currentProfileId,
          skills: state.currentProfileId === profileId ? [...defaultSkills] : state.skills
        })),

      createNewProfile: () =>
        set(() => ({
          skills: [...defaultSkills],
          currentProfileId: null
        })),

      updateCurrentProfileName: (name) =>
        set((state) => {
          if (!state.currentProfileId) return state
          
          return {
            profiles: state.profiles.map(profile =>
              profile.id === state.currentProfileId
                ? { ...profile, name, updatedAt: new Date() }
                : profile
            )
          }
        }),

      // Utility actions
      exportData: () => {
        const state = get()
        return JSON.stringify({
          skills: state.skills,
          profiles: state.profiles,
          currentProfileId: state.currentProfileId,
          exportedAt: new Date().toISOString()
        }, null, 2)
      },

      importData: (jsonData) => {
        try {
          const data = JSON.parse(jsonData)
          if (data.skills && Array.isArray(data.skills) && Array.isArray(data.profiles)) {
            set({
              skills: data.skills,
              profiles: data.profiles || [],
              currentProfileId: data.currentProfileId || null
            })
            return true
          }
          return false
        } catch {
          return false
        }
      }
    }),
    {
      name: 'skill-octangle-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist the essentials
      partialize: (state) => ({
        skills: state.skills,
        profiles: state.profiles,
        currentProfileId: state.currentProfileId
      })
    }
  )
)