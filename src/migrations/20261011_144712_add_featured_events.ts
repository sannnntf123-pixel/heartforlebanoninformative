import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import fs from "fs";
import path from "path";

/**
 * Data migration: adds the charity's three featured events (English + Arabic,
 * cover photo and gallery) so they exist in production without manual entry.
 * Photos live in content/events/<slug>/ (cover.jpg + numbered gallery photos).
 * Idempotent: an event whose slug already exists is skipped.
 */

type Copy = { title: string; summary: string; location: string; body: string[]; photoAlt: string };

type FeaturedEvent = {
  slug: string;
  category: "health";
  /** ISO date, or null when the charity hasn't given one. */
  date: string | null;
  /** Focal point (percent) for the cover, so faces survive cropping. */
  coverFocus?: { x: number; y: number };
  en: Copy;
  ar: Copy;
};

const events: FeaturedEvent[] = [
  {
    slug: "together-against-breast-cancer",
    category: "health",
    date: "2021-10-27T12:00:00.000Z",
    en: {
      title:
        "In the Presence of Lebanese Star Elissa, Dr. Hadi Mourad Launches “Together Against Breast Cancer” Campaign to Screen 10,000 Women Across Lebanon",
      summary:
        "Launched with Lebanese star Elissa and the Noah Association: 10,000 mammography and breast ultrasound screenings for women across Lebanon, with LAU Medical Center.",
      location: "Across Lebanon",
      body: [
        "On October 27, 2021, Dr. Hadi Mourad, President of the My Heart for Lebanon Association, in collaboration with the Noah Association, launched the “Together Against Breast Cancer” campaign in the presence of renowned Lebanese singer Elissa.",
        "The initiative announced a nationwide program providing 10,000 preventive mammography and breast ultrasound screenings for 10,000 women across all Lebanese governorates, in partnership with the Lebanese American University Medical Center (LAU Medical Center).",
        "The campaign aimed to promote breast cancer awareness, encourage early detection, and improve women’s access to preventive healthcare, reaffirming the commitment to protecting women’s health and saving lives through timely diagnosis.",
      ],
      photoAlt: "Launch of the Together Against Breast Cancer campaign",
    },
    ar: {
      title: "بحضور النجمة إليسا… جمعية «قلبي للبنان» بالتعاون مع جمعية «نوح» تطلق حملة «سوا منحارب سرطان الثدي»",
      summary:
        "بحضور النجمة إليسا وبالتعاون مع جمعية «نوح»: 10,000 فحص وقائي بالماموغرافي والإيكوغرافي لنساء في مختلف المحافظات اللبنانية، بالتعاون مع المركز الطبي للجامعة اللبنانية الأميركية.",
      location: "مختلف المحافظات اللبنانية",
      body: [
        "في 27 تشرين الأول 2021، أطلق الدكتور هادي مراد، رئيس جمعية «قلبي للبنان»، بالتعاون مع جمعية «نوح»، حملة «سوا منحارب سرطان الثدي»، بحضور النجمة اللبنانية إليسا، في مبادرة صحية وإنسانية تهدف إلى تعزيز الوعي والكشف المبكر عن سرطان الثدي.",
        "وشهد إطلاق الحملة الإعلان عن إجراء 10,000 فحص وقائي بالماموغرافي والإيكوغرافي لـ10,000 امرأة في مختلف المحافظات اللبنانية، بالتعاون مع المركز الطبي للجامعة اللبنانية الأميركية (LAU Medical Center).",
        "وتأتي هذه المبادرة تأكيداً على أهمية الوقاية والكشف المبكر، وإيماناً بأن صحة المرأة اللبنانية حقّ وأولوية، وأن التشخيص المبكر قد ينقذ آلاف الأرواح.",
      ],
      photoAlt: "إطلاق حملة «سوا منحارب سرطان الثدي»",
    },
  },
  {
    slug: "my-heart-for-lebanons-children",
    category: "health",
    date: null, // ongoing programme, every Saturday
    coverFocus: { x: 50, y: 28 },
    en: {
      title: "Dr. Hadi Mourad Launches “My Heart for Lebanon’s Children” Campaign for Early Detection of Heart Disease",
      summary:
        "Heart screenings for children every Saturday at the association’s centre: ECG and echocardiography by a team of physicians and specialists.",
      location: "Association’s medical centre, every Saturday",
      body: [
        "Dr. Hadi Mourad, through the My Heart for Lebanon Association, has launched a humanitarian healthcare initiative titled “My Heart for Lebanon’s Children,” aimed at promoting early detection of heart conditions among children.",
        "Every Saturday, the association’s medical center will host cardiac screening sessions, including electrocardiograms (ECG) and echocardiography (cardiac ultrasound), conducted by a dedicated team of physicians and specialists.",
        "The initiative reflects a commitment to protecting children’s health and ensuring that early detection provides every child with a better chance for a healthy future.",
      ],
      photoAlt: "My Heart for Lebanon’s Children heart screening campaign",
    },
    ar: {
      title: "الدكتور هادي مراد يطلق حملة «قلبي عَ قلب أطفال لبنان» للكشف المبكر عن أمراض القلب",
      summary:
        "فحوصات للقلب للأطفال كل يوم سبت في مركز الجمعية: تخطيط للقلب (ECG) وتصوير بالموجات فوق الصوتية، بإشراف فريق من الأطباء والاختصاصيين.",
      location: "مركز الجمعية، كل يوم سبت",
      body: [
        "أطلق الدكتور هادي مراد، من خلال جمعية «قلبي للبنان»، مبادرة صحية وإنسانية بعنوان «قلبي عَ قلب أطفال لبنان»، تهدف إلى الكشف المبكر عن أمراض القلب لدى الأطفال وتعزيز الوقاية الصحية.",
        "وتتضمن الحملة إجراء تخطيط للقلب (ECG) وتصوير القلب بالموجات فوق الصوتية (Echocardiography)، كل يوم سبت في مركز الجمعية، بإشراف فريق من الأطباء والاختصاصيين.",
        "وتأتي هذه المبادرة انطلاقاً من الإيمان بأن صحة أطفال لبنان أولوية، وأن الكشف المبكر قد يصنع فارقاً في حياة طفل ومستقبله.",
      ],
      photoAlt: "حملة «قلبي عَ قلب أطفال لبنان» للكشف المبكر عن أمراض القلب",
    },
  },
  {
    slug: "use-your-mind-mental-health",
    category: "health",
    date: null, // date not provided yet
    coverFocus: { x: 60, y: 30 },
    en: {
      title: "My Heart for Lebanon Brings Tim Hassan and Sadek Sabbah Together for Mental Health Awareness in Beirut",
      summary:
        "A mental health awareness conference, “Use Your Mind – Mental Illness Is Not a Shame”, with actor Tim Hassan and producer Sadek Sabbah at LAU Medical Center – Rizk Hospital.",
      location: "LAU Medical Center – Rizk Hospital, Beirut",
      body: [
        "Dr. Hadi Mourad (Head of the NGO) organized a mental health awareness conference titled “Use Your Mind – Mental Illness Is Not a Shame” at the Lebanese American University Medical Center – Rizk Hospital in Beirut, featuring renowned actor Tim Hassan and producer Sadek Sabbah, alongside prominent medical, religious, and media figures.",
        "The event brought together medicine, entertainment, and faith to challenge the stigma surrounding mental illness, promote mental health awareness, and highlight the powerful role of television drama in shaping public understanding.",
        "The conference concluded with a special tribute honoring Tim Hassan and Sadek Sabbah for their artistic and humanitarian contributions.",
      ],
      photoAlt: "Use Your Mind mental health awareness conference",
    },
    ar: {
      title: "بحضور تيم حسن وصادق الصبّاح… الدكتور هادي مراد ينظّم ندوة للتوعية بالصحة النفسية في بيروت",
      summary:
        "ندوة توعوية بعنوان «حكّم عقلك – المرض النفسي مش عيب» بحضور النجم تيم حسن والمنتج صادق الصبّاح في المركز الطبي للجامعة اللبنانية الأميركية – مستشفى رزق.",
      location: "المركز الطبي للجامعة اللبنانية الأميركية – مستشفى رزق، بيروت",
      body: [
        "نظّم الدكتور هادي مراد رئيس جمعية \"قلبي للبنان\" في المركز الطبي للجامعة اللبنانية الأميركية – مستشفى رزق في بيروت، ندوة توعوية بعنوان «حكّم عقلك – المرض النفسي مش عيب»، بحضور النجم تيم حسن والمنتج صادق الصبّاح، إلى جانب شخصيات طبية ودينية وإعلامية بارزة.",
        "وجمعت الندوة بين الطب والفن والدين لتسليط الضوء على أهمية الصحة النفسية، وكسر الوصمة الاجتماعية المرتبطة بالأمراض النفسية، والتأكيد على دور الدراما في نشر الوعي المجتمعي.",
        "واختُتم اللقاء بتكريم تيم حسن وصادق الصبّاح تقديراً لمساهمتهما الفنية والإنسانية.",
      ],
      photoAlt: "ندوة «حكّم عقلك» للتوعية بالصحة النفسية",
    },
  },
];

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

const contentDir = (slug: string) => path.resolve(process.cwd(), "content/events", slug);

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const event of events) {
    const existing = await payload.find({
      collection: "events",
      where: { slug: { equals: event.slug } },
      limit: 1,
      depth: 0,
      req,
    });
    if (existing.totalDocs > 0) {
      payload.logger.info(`Event "${event.slug}" already exists, skipping`);
      continue;
    }

    const dir = contentDir(event.slug);
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
    const galleryFiles = files.filter((f) => !f.startsWith("cover."));
    const coverFile = files.find((f) => f.startsWith("cover."));
    if (!coverFile) throw new Error(`Missing cover photo in ${dir}`);

    const upload = async (file: string, index: number | null, focus?: { x: number; y: number }) => {
      const suffix = index === null ? "" : ` (${index})`;
      const media = await payload.create({
        collection: "media",
        locale: "en",
        data: {
          alt: `${event.en.photoAlt}${suffix}`,
          ...(focus ? { focalX: focus.x, focalY: focus.y } : {}),
        },
        filePath: path.join(dir, file),
        req,
      });
      await payload.update({
        collection: "media",
        id: media.id,
        locale: "ar",
        data: { alt: `${event.ar.photoAlt}${suffix}` },
        req,
      });
      return media.id;
    };

    const coverId = await upload(coverFile, null, event.coverFocus);
    const galleryIds: number[] = [];
    for (const [i, file] of galleryFiles.entries()) {
      galleryIds.push(await upload(file, i + 1));
    }

    const created = await payload.create({
      collection: "events",
      locale: "en",
      data: {
        title: event.en.title,
        summary: event.en.summary,
        location: event.en.location,
        description: richText(event.en.body, "ltr"),
        slug: event.slug,
        category: event.category,
        date: event.date,
        coverImage: coverId,
        gallery: galleryIds,
        featured: true,
        _status: "published",
      },
      req,
    });
    await payload.update({
      collection: "events",
      id: created.id,
      locale: "ar",
      data: {
        title: event.ar.title,
        summary: event.ar.summary,
        location: event.ar.location,
        description: richText(event.ar.body, "rtl"),
        _status: "published",
      },
      req,
    });
    payload.logger.info(`Added featured event "${event.slug}" with ${galleryIds.length} gallery photos`);
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  for (const event of events) {
    const { docs } = await payload.find({
      collection: "events",
      where: { slug: { equals: event.slug } },
      depth: 0,
      req,
    });
    for (const doc of docs) {
      const mediaIds = [doc.coverImage, ...(doc.gallery ?? [])].filter((id): id is number => typeof id === "number");
      await payload.delete({ collection: "events", id: doc.id, req });
      for (const id of mediaIds) await payload.delete({ collection: "media", id, req });
    }
  }
}
