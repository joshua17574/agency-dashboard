'use client';

import { CategoryInfo } from '@/lib/agents';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  selected: string;
  onSelect: (category: string) => void;
  totalAgents: number;
}

export default function CategoryFilter({ categories, selected, onSelect, totalAgents }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1">
      <button
        onClick={() => onSelect('all')}
        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          selected === 'all'
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            : 'bg-[#111111] text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-gray-200'
        }`}
      >
        All
        <span className="ml-1.5 text-xs opacity-60">{totalAgents}</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
            selected === cat.slug
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-[#111111] text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-gray-200'
          }`}
        >
          {cat.name.replace(/-/g, ' ')}
          <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
        </button>
      ))}
    </div>
  );
}
