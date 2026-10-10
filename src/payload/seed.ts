/**
 * Local development seed: `npm run seed`.
 * - Creates an admin account from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD (.env).
 * - Uploads the site's field photos and creates clearly-marked SAMPLE events
 *   (important, upcoming, past and undated; English + Arabic) with galleries.
 * Refuses to run in production. Safe to re-run: existing sample data is replaced.
 */
import config from "@payload-config";
import path from "path";
import { getPayload } from "payload";

if (process.env.NODE_ENV === "production") {
  throw new Error("The seed script is for local development only.");
}

const DAY = 24 * 60 * 60 * 1000;
/** A calendar day relative to today (noon UTC, so it is the same day in Beirut). */
const day = (daysFromNow: number) => {
  const date = new Date(Date.now() + daysFromNow * DAY);
  date.setUTCHours(12, 0, 0, 0);
  return date.toISOString();
};

/** Minimal Lexical rich-text document from plain paragraphs. */
const richText = (paragraphs: string[], direction: "ltr" | "rtl") => ({
  root: {
    type: "root",
    format: "" as const,
    indent: 0,
    version: 1,
    direction,
    children: paragraphs.map((text) => ({
      type: "paragraph",
      format: "",
      indent: 0,
      version: 1,
      direction,
      textFormat: 0,
      children: [{ type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 }],
    })),
  },
});

type SampleEvent = {
  slug: string;
  photo: "medicine" | "food" | "hygiene";
  category: "medical" | "health" | "food" | "youth" | "women" | "community";
  date: string | null;
  featured?: boolean;
  en: { title: string; summary: string; location: string; body: string[] };
  ar: { title: string; summary: string; location: string; body: string[] };
};

const samples: SampleEvent[] = [
  {
    slug: "sample-medicine-distribution-baalbek",
    photo: "medicine",
    category: "medical",
    date: day(12),
    featured: true,
    en: {
      title: "[Sample] Medicine distribution in Baalbek",
      summary: "Volunteers hand out medicine to displaced families according to each family's needs.",
      location: "Baalbek office",
      body: ["Sample description for testing the CMS.", "Replace or delete this event in the admin panel."],
    },
    ar: {
      title: "[تجريبي] توزيع أدوية في بعلبك",
      summary: "يوزّع المتطوعون الأدوية على العائلات النازحة وفقًا لاحتياجات كل عائلة.",
      location: "مكتب بعلبك",
      body: ["وصف تجريبي لاختبار نظام إدارة المحتوى.", "استبدل هذه الفعالية أو احذفها من لوحة التحكم."],
    },
  },
  {
    slug: "sample-food-parcels-rayak",
    photo: "food",
    category: "food",
    date: day(25),
    en: {
      title: "[Sample] Food parcels for families in Rayak",
      summary: "Packing and delivering food parcels to families in Rayak and nearby villages.",
      location: "Rayak office",
      body: ["Sample description for testing the CMS."],
    },
    ar: {
      title: "[تجريبي] سلال غذائية للعائلات في رياق",
      summary: "تحضير السلال الغذائية وإيصالها إلى العائلات في رياق والقرى المجاورة.",
      location: "مكتب رياق",
      body: ["وصف تجريبي لاختبار نظام إدارة المحتوى."],
    },
  },
  {
    slug: "sample-hygiene-kits-hazmieh",
    photo: "hygiene",
    category: "community",
    date: null, // date to be announced
    en: {
      title: "[Sample] Hygiene kits drive in Hazmieh",
      summary: "Collecting and distributing hygiene kits and nappies for families in need.",
      location: "Baabda–Hazmieh office",
      body: ["Sample description for testing the CMS."],
    },
    ar: {
      title: "[تجريبي] حملة مستلزمات النظافة في الحازمية",
      summary: "جمع مستلزمات النظافة والحفاضات وتوزيعها على العائلات المحتاجة.",
      location: "مكتب بعبدا–الحازمية",
      body: ["وصف تجريبي لاختبار نظام إدارة المحتوى."],
    },
  },
  {
    slug: "sample-past-health-awareness-day",
    photo: "medicine",
    category: "health",
    date: day(-20),
    en: {
      title: "[Sample] Health awareness day (past)",
      summary: "A past sample event to test the archive section.",
      location: "Baalbek",
      body: ["Sample description for testing the CMS."],
    },
    ar: {
      title: "[تجريبي] يوم توعية صحية (سابق)",
      summary: "فعالية تجريبية سابقة لاختبار قسم الأرشيف.",
      location: "بعلبك",
      body: ["وصف تجريبي لاختبار نظام إدارة المحتوى."],
    },
  },
  {
    slug: "sample-past-ramadan-food-campaign",
    photo: "food",
    category: "food",
    featured: true,
    date: day(-60),
    en: {
      title: "[Sample] Ramadan food campaign (past)",
      summary: "A past sample event to test the archive section.",
      location: "Bekaa",
      body: ["Sample description for testing the CMS."],
    },
    ar: {
      title: "[تجريبي] حملة رمضان الغذائية (سابقة)",
      summary: "فعالية تجريبية سابقة لاختبار قسم الأرشيف.",
      location: "البقاع",
      body: ["وصف تجريبي لاختبار نظام إدارة المحتوى."],
    },
  },
];

const photoFiles = {
  medicine: { file: "medicine-wide.jpg", en: "Volunteers handing out medicine", ar: "متطوعون يوزّعون الأدوية" },
  food: { file: "food-wide.jpg", en: "A volunteer carrying a food parcel", ar: "متطوعة تحمل سلة غذائية" },
  hygiene: { file: "hygiene-wide.jpg", en: "A volunteer loading hygiene supplies", ar: "متطوعة تحمّل مستلزمات النظافة" },
} as const;

const payload = await getPayload({ config });

// 1. Admin account (local only, credentials from .env)
const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;
if (email && password) {
  const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
  if (existing.totalDocs === 0) {
    await payload.create({ collection: "users", data: { email, password, name: "Local admin", role: "admin" } });
    payload.logger.info(`Created admin ${email} (password in .env)`);
  }
}

// 2. Remove previous sample data
const old = await payload.find({
  collection: "events",
  where: { slug: { like: "sample-" } },
  pagination: false,
  depth: 0,
});
for (const doc of old.docs) {
  await payload.delete({ collection: "events", id: doc.id });
}

// 3. Photos
const mediaIds: Record<keyof typeof photoFiles, number> = { medicine: 0, food: 0, hygiene: 0 };
for (const [key, photo] of Object.entries(photoFiles) as [keyof typeof photoFiles, (typeof photoFiles)[keyof typeof photoFiles]][]) {
  const found = await payload.find({ collection: "media", where: { filename: { like: key } }, limit: 1 });
  if (found.docs[0]) {
    mediaIds[key] = found.docs[0].id;
    continue;
  }
  const media = await payload.create({
    collection: "media",
    locale: "en",
    data: { alt: photo.en },
    filePath: path.resolve(process.cwd(), "public/images", photo.file),
  });
  await payload.update({ collection: "media", id: media.id, locale: "ar", data: { alt: photo.ar } });
  mediaIds[key] = media.id;
}

// 4. Sample events (English first, then the Arabic version of each field)
for (const sample of samples) {
  const event = await payload.create({
    collection: "events",
    locale: "en",
    data: {
      title: sample.en.title,
      summary: sample.en.summary,
      location: sample.en.location,
      description: richText(sample.en.body, "ltr"),
      slug: sample.slug,
      category: sample.category,
      date: sample.date,
      coverImage: mediaIds[sample.photo],
      gallery: Object.values(mediaIds),
      featured: sample.featured ?? false,
      _status: "published",
    },
  });
  await payload.update({
    collection: "events",
    id: event.id,
    locale: "ar",
    data: {
      title: sample.ar.title,
      summary: sample.ar.summary,
      location: sample.ar.location,
      description: richText(sample.ar.body, "rtl"),
      _status: "published",
    },
  });
}

payload.logger.info(`Seeded ${samples.length} sample events.`);
process.exit(0);
