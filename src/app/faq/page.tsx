import { Faq2, Faq3 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import SiteLayout from "@/layout/SiteLayout";

const CausesPage = () => {
  return (
    <SiteLayout>
      <PageBanner pageName="Faq" />
      <Faq3 />
      <Faq2 />
    </SiteLayout>
  );
};

export default CausesPage;
