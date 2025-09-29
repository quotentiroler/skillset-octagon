import { useState } from 'react'
import SkillOctagon from './components/SkillOctagon'
import SkillControls from './components/SkillControls'
import ProfileManager from './components/ProfileManager'
import { useSkillStore } from './store/skillStore'

function App() {
  const { skills } = useSkillStore()
  const [showProfiles, setShowProfiles] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.svg" alt="Skill Octangle Logo" className="w-16 h-16" />
            <h1 className="text-4xl font-bold text-gray-800">
              Skill Octangle
            </h1>
          </div>
          <p className="text-gray-600 mb-4">
            Visualize your Tech Founder skills - define 8 key abilities on a scale of 1-10
          </p>
          
          {/* Profile Toggle */}
          <button
            onClick={() => setShowProfiles(!showProfiles)}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
          >
            {showProfiles ? '📊 Show Chart' : '💾 Manage Profiles'}
          </button>
        </header>
        
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          {!showProfiles ? (
            <>
              <div className="flex-shrink-0">
                <SkillOctagon skills={skills} size={450} />
              </div>
              
              <div className="flex-shrink-0">
                <SkillControls />
              </div>
            </>
          ) : (
            <div className="w-full max-w-2xl mx-auto">
              <ProfileManager />
            </div>
          )}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            {showProfiles 
              ? 'Save and manage multiple skill profiles with persistence'
              : 'Adjust the sliders to see your skill octangle update in real-time'
            }
          </p>
          <div className="mt-2 text-xs">
            {showProfiles && '💡 Your data is automatically saved to your browser'}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
