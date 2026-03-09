import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Agent {
  slug: string;
  name: string;
  description: string;
  color: string;
  category: string;
  content: string;
}

export interface CategoryInfo {
  name: string;
  count: number;
  slug: string;
}

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'hover:shadow-cyan-500/20' },
  green: { border: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-400', glow: 'hover:shadow-green-500/20' },
  purple: { border: 'border-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'hover:shadow-purple-500/20' },
  orange: { border: 'border-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-400', glow: 'hover:shadow-orange-500/20' },
  red: { border: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-400', glow: 'hover:shadow-red-500/20' },
  blue: { border: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'hover:shadow-blue-500/20' },
  yellow: { border: 'border-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400', glow: 'hover:shadow-yellow-500/20' },
  pink: { border: 'border-pink-500', bg: 'bg-pink-500/10', text: 'text-pink-400', glow: 'hover:shadow-pink-500/20' },
};

export function getColorClasses(color: string) {
  return colorMap[color] || colorMap['blue'];
}

function getAllMdFiles(dir: string, category?: string): { filePath: string; category: string }[] {
  const results: { filePath: string; category: string }[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const cat = category || entry.name;
      results.push(...getAllMdFiles(fullPath, cat));
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== '.gitkeep') {
      const cat = category || path.basename(path.dirname(fullPath));
      results.push({ filePath: fullPath, category: cat });
    }
  }
  return results;
}

export function getAllAgents(): Agent[] {
  const mdFiles = getAllMdFiles(contentDirectory);
  const agents: Agent[] = [];
  for (const { filePath, category } of mdFiles) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = path.basename(filePath, '.md');
      const name = data.name || slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const description = data.description || '';
      const color = data.color || 'blue';
      agents.push({ slug, name, description, color, category, content });
    } catch { /* skip */ }
  }
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return getAllAgents().find((a) => a.slug === slug);
}

export function getCategories(): CategoryInfo[] {
  const agents = getAllAgents();
  const categoryMap = new Map<string, number>();
  for (const agent of agents) {
    categoryMap.set(agent.category, (categoryMap.get(agent.category) || 0) + 1);
  }
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count, slug: name }))
    .sort((a, b) => b.count - a.count);
}

export function getAgentsByCategory(category: string): Agent[] {
  return getAllAgents().filter((a) => a.category === category);
}

export async function getAgentContent(content: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(content);
  return result.toString();
}
