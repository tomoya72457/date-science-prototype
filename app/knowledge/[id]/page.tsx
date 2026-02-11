import KnowledgeDetailContent from '@/app/components/knowledge/KnowledgeDetailContent';
import BottomNav from '@/app/components/shared/BottomNav';

interface KnowledgeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function KnowledgeDetailPage({ params }: KnowledgeDetailPageProps) {
  const { id } = await params;
  
  return (
    <>
      <KnowledgeDetailContent knowledgeId={id} />
      <BottomNav />
    </>
  );
}
