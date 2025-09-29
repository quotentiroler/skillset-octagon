import React, { useState } from 'react';
import { useSkillStore } from '../store/skillStore';

const ProfileManager: React.FC = () => {
  const {
    profiles,
    currentProfileId,
    saveCurrentProfile,
    loadProfile,
    deleteProfile,
    createNewProfile,
    exportData,
    importData
  } = useSkillStore();

  const [newProfileName, setNewProfileName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importText, setImportText] = useState('');

  const currentProfile = profiles.find(p => p.id === currentProfileId);

  const handleSaveProfile = () => {
    if (newProfileName.trim()) {
      saveCurrentProfile(newProfileName.trim());
      setNewProfileName('');
      setShowSaveDialog(false);
    }
  };

  const handleImport = () => {
    if (importData(importText)) {
      setImportText('');
      setShowImportDialog(false);
      alert('Data imported successfully!');
    } else {
      alert('Invalid data format. Please check your JSON data.');
    }
  };

  const handleExport = () => {
    const data = exportData();
    navigator.clipboard.writeText(data).then(() => {
      alert('Data copied to clipboard!');
    }).catch(() => {
      // Fallback: create a download link
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'skill-octangle-data.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Skill Profiles</h3>
      
      {/* Current Profile Info */}
      {currentProfile && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 font-medium">Current Profile:</span>
            <button
              onClick={createNewProfile}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              New Profile
            </button>
          </div>
          <div className="text-blue-800 font-semibold">{currentProfile.name}</div>
          <div className="text-xs text-blue-600">
            Updated: {new Date(currentProfile.updatedAt).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 mb-4">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="w-full px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          💾 Save Current Profile
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            📤 Export
          </button>
          <button
            onClick={() => setShowImportDialog(true)}
            className="flex-1 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            📥 Import
          </button>
        </div>
      </div>

      {/* Saved Profiles List */}
      {profiles.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Saved Profiles</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`flex items-center justify-between p-2 rounded-lg border ${
                  profile.id === currentProfileId
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {profile.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  {profile.id !== currentProfileId && (
                    <button
                      onClick={() => loadProfile(profile.id)}
                      className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                    >
                      Load
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm(`Delete profile "${profile.name}"?`)) {
                        deleteProfile(profile.id);
                      }
                    }}
                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Profile</h3>
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Enter profile name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={!newProfileName.trim()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg text-sm transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 mx-4">
            <h3 className="text-lg font-semibold mb-4">Import Data</h3>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste your exported JSON data here..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowImportDialog(false)}
                className="flex-1 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={!importText.trim()}
                className="flex-1 px-3 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white rounded-lg text-sm transition-colors"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManager;