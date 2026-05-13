import { HeroSlider } from "@/components/home/hero-slider";
import { ActiveGardeners } from "@/components/home/active-gardeners";
import { TrendingTips } from "@/components/home/trending-tips";
import { GardenOfTheMonth } from "@/components/home/garden-of-month";
import { UpcomingEvents } from "@/components/home/upcoming-events";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSlider />
      <ActiveGardeners />
      <TrendingTips />
      <GardenOfTheMonth />
      <UpcomingEvents />
    </div>
  );
}
