import "@/styles/site.css";

import { arabicFont, latinFont } from "./[locale]/fonts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Heart of Lebanon",
};

/** Rendered for any URL that matches no route (both route groups). */
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={`${latinFont.variable} ${arabicFont.variable}`}>
      <body>
        <main className="sec">
          <div className="wrap st">
            <span className="kick">
              <i className="dia" aria-hidden="true" />
              <i className="dia" aria-hidden="true" />
              404
            </span>
            <h2>
              Page <span className="hl">not found</span>
            </h2>
            <p>
              The page you are looking for does not exist.{" "}
              <span lang="ar" dir="rtl">
                الصفحة التي تبحث عنها غير موجودة.
              </span>
            </p>
            <p>
              <Link className="btn" href="/en">
                Back to home
              </Link>{" "}
              <Link className="btn btn--out" href="/ar" lang="ar">
                العودة إلى الرئيسية
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
