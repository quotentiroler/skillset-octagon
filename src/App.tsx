import { useState } from 'react'
import SkillOctagon from './components/SkillOctagon'
import SkillControls from './components/SkillControls'
import ProfileManager from './components/ProfileManager'
import { StyledComponentsDemo } from './components/StyledComponents'
import OctagonMerger from './components/OctagonMerger'
import { useSkillStore } from './store/skillStore'

function App() {
  const { skills } = useSkillStore()
  const [activeTab, setActiveTab] = useState<'chart' | 'profiles' | 'merge' | 'demo'>('chart')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Skill Octangle Logo" className="w-16 h-16" />
            <h1 className="text-4xl font-bold text-gray-800">
              Skill Octangle
            </h1>
          </div>
          <p className="text-gray-600 mb-4">
            Visualize your Tech Founder skills - define 8 key abilities on a scale of 1-10
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'chart' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white text-indigo-500 hover:bg-indigo-50'
              }`}
            >
              📊 Chart
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'profiles' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white text-indigo-500 hover:bg-indigo-50'
              }`}
            >
              💾 Profiles
            </button>
            <button
              onClick={() => setActiveTab('merge')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'merge' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white text-indigo-500 hover:bg-indigo-50'
              }`}
            >
              🔄 Merge
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'demo' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white text-indigo-500 hover:bg-indigo-50'
              }`}
            >
              ✨ CSS Demo
            </button>
          </div>
        </header>
        
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          {activeTab === 'chart' && (
            <>
              <div className="flex-shrink-0">
                <SkillOctagon skills={skills} size={450} />
              </div>
              
              <div className="flex-shrink-0">
                <SkillControls />
              </div>
            </>
          )}
          
          {activeTab === 'profiles' && (
            <div className="w-full max-w-2xl mx-auto">
              <ProfileManager />
            </div>
          )}
          
          {activeTab === 'merge' && (
            <div className="w-full max-w-6xl mx-auto">
              <OctagonMerger />
            </div>
          )}
          
          {activeTab === 'demo' && (
            <div className="w-full max-w-4xl mx-auto">
              <StyledComponentsDemo />
            </div>
          )}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            {activeTab === 'chart' && 'Adjust the sliders to see your skill octangle update in real-time'}
            {activeTab === 'profiles' && 'Save and manage multiple skill profiles with persistence'}
            {activeTab === 'merge' && 'Combine two skill profiles to see their averaged result with smooth animations'}
            {activeTab === 'demo' && 'Showcase of styled-components and emotion CSS-in-JS libraries'}
          </p>
          <div className="mt-2 text-xs">
            {activeTab === 'profiles' && '💡 Your data is automatically saved to your browser'}
            {activeTab === 'merge' && '🎯 Perfect for comparing team skills or tracking progress over time'}
            {activeTab === 'demo' && '🚀 Optimized with SWC plugins for better performance'}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
