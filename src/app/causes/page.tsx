import { CausesTab } from "@/components/Causes";
import { Cta1 } from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import SiteLayout from "@/layout/SiteLayout";

const CausesPage = () => {
  return (
    <SiteLayout>
      <PageBanner pageName="Our Causes" />
      <CausesTab />
      <Cta1 />
    </SiteLayout>
  );
};

export default CausesPage;
