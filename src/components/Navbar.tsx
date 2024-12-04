import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { LogOut, Music } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const userName = auth.currentUser?.email?.split('@')[0] || '';
  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Music className="h-8 w-8 text-indigo-500" />
            <span className="ml-2 text-xl font-bold text-white">Music Generator</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-300">
                {displayName}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}