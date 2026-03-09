import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllAgents, getCategories, getAgentsByCategory } from '@/lib/agents';
import AgentGrid from '@/components/AgentGrid';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const displayName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${displayName} - The Agency`,
    description: `Browse all ${displayName} agents in The Agency.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const agents = getAgentsByCategory(category);
  const categories = getCategories();
  const categoryInfo = categories.find((c) => c.slug === category);

  if (!categoryInfo || agents.length === 0) notFound();

  const displayName = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">{displayName}</h1>
        <p className="text-gray-400">
          {agents.length} specialized agent{agents.length !== 1 ? 's' : ''} in this division
        </p>
      </div>

      <AgentGrid agents={agents} />
    </div>
  );
}
