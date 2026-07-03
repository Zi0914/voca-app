import HomeHeader from './components/home-header';
import HomeCaptureCard from './components/home-capture-card';
import BottomNav from './components/bottom-nav';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-transparent px-5 pb-[calc(104px+env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] min-[400px]:px-6">
      <HomeHeader />
      <HomeCaptureCard />
      <BottomNav />
    </main>
  );
}
