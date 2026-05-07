import { Product3DHero } from '@/components/sections/Product3DHero';
import { EditorialProductGrid } from '@/components/sections/EditorialProductGrid';
import AboutSection from '@/components/home/AboutSection';
import InteractiveSelector from '@/components/ui/interactive-selector';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background">
      <Product3DHero />
      <div className="relative z-30 flex flex-col">
        <EditorialProductGrid />
        <InteractiveSelector />
        <AboutSection />
        <Testimonials />
        <CTA />
      </div>
    </div>
  );
}

