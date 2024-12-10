import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Music, Wand2, Clock, MessageSquare, Info, Download } from 'lucide-react';
import { auth } from '../lib/firebase';

export function Generator() {
  const [genre, setGenre] = useState('rap');
  const [duration, setDuration] = useState(30);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState('');
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = auth.currentUser?.email || '';
    const name = email.split('@')[0];
    setUserName(name.charAt(0).toUpperCase() + name.slice(1));
  }, []);

  const genrePrompts = {
    'rap': [
        "Energetic drum beats with a strong rhythm.",
        "Simple bassline with steady drums.",
        "Upbeat rhythm with minimal instruments.",
        "Relaxed beats with a smooth tempo.",
        "Strong and consistent drum patterns."
    ],
    'hiphop': [
        "Chill beat with steady rhythm.",
        "Basic drum and bass groove.",
        "Slow and relaxed tempo.",
        "Simple beats with minimal layers.",
        "Steady rhythm with soft drums."
    ],
    'melody': [
        "Bright and cheerful tune.",
        "Simple piano melody.",
        "Relaxing guitar strumming.",
        "Soft and calming piano.",
        "Upbeat and happy melody."
    ],
    'cinematic': [
        "Soft piano with gentle background tones.",
        "Basic orchestral strings.",
        "Simple and calm instrumental theme.",
        "Steady and dramatic rhythm.",
        "Peaceful and soothing instrumental."
    ]
};

  // Generate random prompt based on selected genre
  const generateRandomPrompt = () => {
    const prompts = genrePrompts[genre as keyof typeof genrePrompts];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  };

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt or generate a random one');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setShowAdvantages(true);
    setAudioUrl(null);

    try {
      const requestBody = {
        prompt: prompt,
        duration: duration,
        genre: genre
      };

      // Send POST request to backend API for music generation
      const response = await fetch('https://2c66-34-142-177-236.ngrok-free.app/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set header to JSON
        },
        body: JSON.stringify(requestBody) // Send data as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Check if audio path is received and set audio URL
      if (result.audio_path) {
        setAudioUrl(`https://2c66-34-142-177-236.ngrok-free.app/generate${result.audio_path}`);
      } else {
        throw new Error('No audio path received');
      }
    } catch (err) {
      // Handle error during generation
      setError(err instanceof Error ? err.message : 'Failed to generate music. Please try again.');
    } finally {
      setIsGenerating(false); // Stop loading state
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      // Create a temporary link to download the generated music file
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${genre}_music_${Date.now()}.mp3`; // Set filename dynamically
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link); // Clean up
    }
  };
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, {userName}! 👋</h1>
          <p className="text-gray-400 mt-2">Ready to create some amazing music?</p>
        </div>

        {showAdvantages && (
          <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-indigo-500/20">
            <div className="flex items-center mb-4">
              <Info className="h-5 w-5 text-indigo-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Project Advantages</h3>
            </div>
            <div className="space-y-2 text-gray-300">
              <p>• All generated music is completely original and copyright-free for your use</p>
              <p>• High-quality output suitable for professional projects and commercial use</p>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Music className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Music Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
                  Genre
                </label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="rap">Rap</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="melody">Melody</option>
                  <option value="cinematic">Cinematic</option>
                </select>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  id="duration"
                  min="10"
                  max="300"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Prompt</h2>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your music or click 'Generate Random Prompt'"
                className="w-full h-32 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              
              <button
                onClick={generateRandomPrompt}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Random Prompt
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col items-center space-y-6">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <>
                <Clock className="animate-spin h-5 w-5 mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5 mr-2" />
                Generate Music
              </>
            )}
          </button>

          {audioUrl && (
            <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
              <audio controls className="flex-grow" src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
              <button 
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
