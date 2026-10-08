import PageBanner from "@/components/PageBanner";
import { VolunteersPage } from "@/components/Volunter";
import SiteLayout from "@/layout/SiteLayout";

const CausesPage = () => {
  return (
    <SiteLayout>
      <PageBanner pageName="Volunteer" pageTitle="Our Volunteer" />
      <VolunteersPage />
    </SiteLayout>
  );
};

export default CausesPage;
