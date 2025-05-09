import React from 'react';
import { ArrowRight, Code2, Cpu, Globe2, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Chaitanya AI</span>
          </div>
          <div className="flex space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors">About</button>
            <button className="text-gray-300 hover:text-white transition-colors">Features</button>
            <button className="text-gray-300 hover:text-white transition-colors">Contact</button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            Your Intelligent AI Assistant
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Experience the power of advanced artificial intelligence designed to enhance your productivity
            and streamline your workflow.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold flex items-center space-x-2">
              <span>Try Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-750 transition-colors">
            <Globe2 className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Global Intelligence</h3>
            <p className="text-gray-300">
              Access worldwide knowledge and insights powered by advanced AI algorithms.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-750 transition-colors">
            <Code2 className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Smart Automation</h3>
            <p className="text-gray-300">
              Automate complex tasks and workflows with intelligent processing.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-750 transition-colors">
            <Cpu className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Advanced Processing</h3>
            <p className="text-gray-300">
              Leverage powerful computing capabilities for complex problem-solving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;