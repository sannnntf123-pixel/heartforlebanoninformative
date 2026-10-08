import { EventPage } from "@/components/Event";
import PageBanner from "@/components/PageBanner";
import SiteLayout from "@/layout/SiteLayout";

const CausesPage = () => {
  return (
    <SiteLayout>
      <PageBanner pageName="Events" pageTitle="Upcoming Events" />
      <EventPage />
    </SiteLayout>
  );
};

export default CausesPage;
