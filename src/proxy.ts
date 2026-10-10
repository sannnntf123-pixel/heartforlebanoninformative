import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, type Locale } from "./i18n/config";

/** Picks Arabic when the browser prefers it over English, otherwise English. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const match = ranked.find(({ lang }) => lang === "ar" || lang === "en");
  return (match?.lang as Locale | undefined) ?? defaultLocale;
}

/** `/` has no page of its own: send visitors to their language's home page. */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
