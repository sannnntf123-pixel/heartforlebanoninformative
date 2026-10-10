import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { ar } from "@payloadcms/translations/languages/ar";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Events } from "./payload/collections/Events";
import { Media } from "./payload/collections/Media";
import { Registrations } from "./payload/collections/Registrations";
import { Users } from "./payload/collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name} (see .env.example)`);
  return value;
};

export default buildConfig({
  secret: requireEnv("PAYLOAD_SECRET"),
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,

  admin: {
    user: Users.slug,
    meta: { titleSuffix: " | Heart of Lebanon CMS" },
    importMap: { baseDir: path.resolve(dirname) },
  },

  // Admin panel language: each editor picks English or Arabic in their account.
  i18n: {
    supportedLanguages: { en, ar },
    fallbackLanguage: "en",
  },

  // Content languages: every localized field has an English and an Arabic version.
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "ar", label: "العربية", rtl: true },
    ],
    defaultLocale: "en",
    fallback: true,
  },

  collections: [Events, Registrations, Media, Users],

  editor: lexicalEditor(),

  db: postgresAdapter({
    // DATABASE_URL is what the Neon integration on Vercel sets automatically.
    pool: { connectionString: process.env.DATABASE_URI ?? requireEnv("DATABASE_URL") },
    // Schema changes in production go through versioned migrations (src/migrations).
    push: process.env.NODE_ENV !== "production",
    migrationDir: path.resolve(dirname, "migrations"),
  }),

  sharp,

  plugins: [
    // Production uploads go to Vercel Blob; locally (no token) files stay in ./media.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  telemetry: false,
});
