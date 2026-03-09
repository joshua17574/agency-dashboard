import { Users, Layers, Zap } from 'lucide-react';

interface HeroSectionProps {
  totalAgents: number;
  totalCategories: number;
}

export default function HeroSection({ totalAgents, totalCategories }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              The Agency
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            AI Specialists Ready to Transform Your Workflow
          </p>
          <p className="mt-2 text-sm text-gray-500">
            From frontend wizards to Reddit community ninjas, each agent is a specialized expert with personality, processes, and proven deliverables.
          </p>
          <div className="mt-10 flex justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3 bg-[#111111] border border-gray-800 rounded-xl px-6 py-4">
              <Users className="w-8 h-8 text-blue-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{totalAgents}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Agents</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#111111] border border-gray-800 rounded-xl px-6 py-4">
              <Layers className="w-8 h-8 text-purple-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{totalCategories}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Categories</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 bg-[#111111] border border-gray-800 rounded-xl px-6 py-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
