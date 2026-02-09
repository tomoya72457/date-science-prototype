import MatchDetailContent from '@/app/components/matching/MatchDetailContent';
import BottomNav from '@/app/components/shared/BottomNav';

interface MatchDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MatchDetailPage({ params }: MatchDetailPageProps) {
  const { id } = await params;
  
  return (
    <>
      <MatchDetailContent matchId={id} />
      <BottomNav />
    </>
  );
}
