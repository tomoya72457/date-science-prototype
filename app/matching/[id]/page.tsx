import MatchDetailContent from '@/app/components/matching/MatchDetailContent';
import BottomNav from '@/app/components/shared/BottomNav';

interface MatchDetailPageProps {
  params: {
    id: string;
  };
}

export default function MatchDetailPage({ params }: MatchDetailPageProps) {
  return (
    <>
      <MatchDetailContent matchId={params.id} />
      <BottomNav />
    </>
  );
}
