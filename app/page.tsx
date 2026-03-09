import { getAllAgents, getCategories } from '@/lib/agents';
import DashboardClient from './DashboardClient';

export default function Home() {
  const agents = getAllAgents();
  const categories = getCategories();

  return <DashboardClient agents={agents} categories={categories} />;
}
