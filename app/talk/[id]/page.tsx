import ChatContent from '@/app/components/talk/ChatContent';
import BottomNav from '@/app/components/shared/BottomNav';

interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  return (
    <>
      <ChatContent matchId={id} />
      <BottomNav />
    </>
  );
}
