import { HeroSlider } from "@/components/home/hero-slider";
import { ActiveGardeners } from "@/components/home/active-gardeners";
import { TrendingTips } from "@/components/home/trending-tips";
import { GardenOfTheMonth } from "@/components/home/garden-of-month";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { GardenStats } from "@/components/home/garden-stats";
import { GardenServices } from "@/components/home/garden-services";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSlider />
      <GardenStats />
      <ActiveGardeners />
      <GardenServices />
      <TrendingTips />
      <GardenOfTheMonth />
      <UpcomingEvents />
      <Newsletter />
    </div>
  );
}
