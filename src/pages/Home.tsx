import { Link } from 'react-router-dom';
import { Music, Wand2, Users, Sparkles, Target, Shield, Heart, Star } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Music className="mx-auto h-16 w-16 text-indigo-500" />
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            AI-Powered Music Generation
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
            Transform your ideas into unique musical compositions with our advanced AI technology.
          </p>
          <div className="mt-8">
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Start Creating Music
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform">
              <Target className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-medium text-white">Personalized Creation</h3>
              <p className="mt-2 text-gray-400">
                Create music that matches your unique style and preferences with customizable parameters.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform">
              <Shield className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-medium text-white">Copyright Free</h3>
              <p className="mt-2 text-gray-400">
                All generated music is 100% original and free to use in your projects without any copyright concerns.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform">
              <Heart className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-medium text-white">User-Friendly</h3>
              <p className="mt-2 text-gray-400">
                Intuitive interface designed for both beginners and professional musicians.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <Wand2 className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-medium text-white">Multiple Genres</h3>
              <p className="mt-2 text-gray-400">
                From rap to cinematic scores, create music across various genres.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <Users className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-medium text-white">Collaborative</h3>
              <p className="mt-2 text-gray-400">
                Perfect for solo creators, bands, or production teams.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <Sparkles className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-medium text-white">Custom Duration</h3>
              <p className="mt-2 text-gray-400">
                Generate music of any length from short clips to full tracks.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <Star className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-lg font-medium text-white">High Quality</h3>
              <p className="mt-2 text-gray-400">
                Professional-grade output ready for your projects.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Create?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of creators who are already making amazing music with AI.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}