import PreSupportContent from '@/app/components/matching/PreSupportContent';
import BottomNav from '@/app/components/shared/BottomNav';

interface PreSupportPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreSupportPage({ params }: PreSupportPageProps) {
  const { id } = await params;

  return (
    <>
      <PreSupportContent matchId={id} />
      <BottomNav />
    </>
  );
}
