import PageBanner from "@/components/PageBanner";
import SiteLayout from "@/layout/SiteLayout";
import Link from "next/link";

const NotFound = () => {
  return (
    <SiteLayout>
      <PageBanner pageName="error page" />
      <section className="error-section section-padding fix">
        <div className="container">
          <div className="error-content text-center">
            <h2 className="mt-char-animation">
              4<span>0</span>4
            </h2>
            <h3 className="wow fadeInUp" data-wow-delay=".5s">
              we’re sorry page not found
            </h3>
            <Link
              href="/"
              className="theme-btn style-line-height mt-5 wow fadeInUp"
              data-wow-delay=".7s"
            >
              <span className="button-text">Back To Home</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
