import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Note: DROP TABLE "registrations" CASCADE already removes the foreign key from
  // payload_locked_documents_rels, so the later drops use IF EXISTS.
  await db.execute(sql`
   CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "registrations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "registrations" CASCADE;
  ALTER TABLE "events" RENAME COLUMN "start_date" TO "date";
  ALTER TABLE "_events_v" RENAME COLUMN "version_start_date" TO "version_date";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_registrations_fk";
  
  DROP INDEX "events_start_date_idx";
  DROP INDEX "_events_v_version_version_start_date_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_registrations_id_idx";
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_media_id_idx" ON "events_rels" USING btree ("media_id");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_media_id_idx" ON "_events_v_rels" USING btree ("media_id");
  CREATE INDEX "events_date_idx" ON "events" USING btree ("date");
  CREATE INDEX "_events_v_version_version_date_idx" ON "_events_v" USING btree ("version_date");
  ALTER TABLE "events" DROP COLUMN "end_date";
  ALTER TABLE "events" DROP COLUMN "registration_enabled";
  ALTER TABLE "events" DROP COLUMN "registration_capacity";
  ALTER TABLE "events" DROP COLUMN "registration_deadline";
  ALTER TABLE "_events_v" DROP COLUMN "version_end_date";
  ALTER TABLE "_events_v" DROP COLUMN "version_registration_enabled";
  ALTER TABLE "_events_v" DROP COLUMN "version_registration_capacity";
  ALTER TABLE "_events_v" DROP COLUMN "version_registration_deadline";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "registrations_id";
  DROP TYPE "public"."enum_registrations_language";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_registrations_language" AS ENUM('en', 'ar');
  CREATE TABLE "registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"attendees" numeric DEFAULT 1 NOT NULL,
  	"notes" varchar,
  	"language" "enum_registrations_language",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  DROP INDEX "events_date_idx";
  DROP INDEX "_events_v_version_version_date_idx";
  ALTER TABLE "events" ADD COLUMN "start_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "end_date" timestamp(3) with time zone;
  ALTER TABLE "events" ADD COLUMN "registration_enabled" boolean DEFAULT true;
  ALTER TABLE "events" ADD COLUMN "registration_capacity" numeric;
  ALTER TABLE "events" ADD COLUMN "registration_deadline" timestamp(3) with time zone;
  ALTER TABLE "_events_v" ADD COLUMN "version_start_date" timestamp(3) with time zone;
  ALTER TABLE "_events_v" ADD COLUMN "version_end_date" timestamp(3) with time zone;
  ALTER TABLE "_events_v" ADD COLUMN "version_registration_enabled" boolean DEFAULT true;
  ALTER TABLE "_events_v" ADD COLUMN "version_registration_capacity" numeric;
  ALTER TABLE "_events_v" ADD COLUMN "version_registration_deadline" timestamp(3) with time zone;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "registrations_id" integer;
  ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "registrations_event_idx" ON "registrations" USING btree ("event_id");
  CREATE INDEX "registrations_updated_at_idx" ON "registrations" USING btree ("updated_at");
  CREATE INDEX "registrations_created_at_idx" ON "registrations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_registrations_fk" FOREIGN KEY ("registrations_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "events_start_date_idx" ON "events" USING btree ("start_date");
  CREATE INDEX "_events_v_version_version_start_date_idx" ON "_events_v" USING btree ("version_start_date");
  CREATE INDEX "payload_locked_documents_rels_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("registrations_id");
  ALTER TABLE "events" DROP COLUMN "date";
  ALTER TABLE "_events_v" DROP COLUMN "version_date";`)
}
