import { About3 } from "@/components/About";
import { Causes3 } from "@/components/Causes";
import { Cta3, Cta4 } from "@/components/Cta";
import { Event3 } from "@/components/Event";
import { Feature2 } from "@/components/Feature";
import { HeroSlider3 } from "@/components/HeroSlider";
import { News3 } from "@/components/News";
import { Promo2 } from "@/components/Promo";
import SiteLayout from "@/layout/SiteLayout";

const Home3 = () => {
  return (
    <SiteLayout>
      <HeroSlider3 />
      <Promo2 />
      <About3 />
      <Causes3 />
      <Cta3 />
      <Event3 />
      <Feature2 />
      <Cta4 />
      <News3 />
    </SiteLayout>
  );
};

export default Home3;
