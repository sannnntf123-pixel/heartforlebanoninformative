import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { importEvents, removeEvents, type EventToImport } from "./lib/import-events";

/**
 * Data migration: adds three more events from the charity (English + Arabic,
 * cover and gallery). Regular events (not "Important"). Photos in
 * content/events/<slug>/. Idempotent.
 */
const events: EventToImport[] = [
  {
    slug: "shelter-visits-war-relief-2026",
    category: "medical",
    // "March and April 2026": dated to the start of the campaign.
    date: "2026-03-01T12:00:00.000Z",
    featured: false,
    en: {
      title:
        "My Heart for Lebanon Association Visits Over 30 Displacement Shelters, Delivering Medical and Food Aid to War-Affected Families",
      summary:
        "In March and April 2026, visits to more than 30 shelters for families displaced by the war, delivering medications, medical equipment and supplies, and food packages.",
      location: "30+ shelters across Lebanon",
      body: [
        "During March and April 2026, the My Heart for Lebanon Association carried out an extensive humanitarian relief initiative, visiting more than 30 shelters hosting families displaced by the recent war in Lebanon.",
        "The initiative included the distribution of essential medications, medical equipment and supplies, as well as food packages, to support displaced families and address their urgent healthcare and humanitarian needs.",
        "Through these efforts, the association reaffirmed its commitment to humanitarian solidarity, providing essential assistance to vulnerable communities and supporting families affected by conflict across Lebanon.",
      ],
      photoAlt: "Aid visits to shelters for displaced families",
    },
    ar: {
      title: "جمعية «قلبي للبنان» تزور أكثر من 30 مركز إيواء وتقدّم مساعدات طبية وغذائية للنازحين جراء الحرب",
      summary:
        "خلال شهري آذار ونيسان 2026، زيارات لأكثر من 30 مركزاً لإيواء النازحين جراء الحرب، مع توزيع الأدوية والمستلزمات والمعدات الطبية والحصص الغذائية.",
      location: "أكثر من 30 مركز إيواء في لبنان",
      body: [
        "في إطار جهودها الإنسانية والإغاثية، نفّذت جمعية «قلبي للبنان» سلسلة زيارات ميدانية شملت أكثر من 30 مركزاً لإيواء النازحين والمتضررين من الحرب في لبنان، خلال شهري آذار ونيسان 2026.",
        "وشملت المبادرة توزيع الأدوية والمستلزمات والمعدات الطبية، إلى جانب المؤن والحصص الغذائية، بهدف التخفيف من معاناة العائلات النازحة وتلبية احتياجاتها الصحية والمعيشية الأساسية.",
        "وتأتي هذه الجهود تأكيداً على التزام الجمعية برسالتها الإنسانية في الوقوف إلى جانب العائلات المتضررة، وتعزيز التضامن المجتمعي في أوقات الأزمات.",
      ],
      photoAlt: "زيارات مراكز إيواء النازحين وتوزيع المساعدات",
    },
  },
  {
    slug: "fasting-together",
    category: "food",
    date: null, // year not given by the charity yet
    featured: false,
    coverFocus: { x: 50, y: 65 },
    en: {
      title:
        "My Heart for Lebanon Association Launches “Fasting Together” Campaign, Delivering Food Aid Across More Than 30 Municipalities in Baabda and Bekaa",
      summary:
        "For Ramadan and the Christian Lenten season, food packages delivered with more than 30 municipalities across Baabda and the Bekaa to support families in need.",
      location: "30+ municipalities in Baabda and the Bekaa",
      body: [
        "On the occasion of the holy month of Ramadan and the Christian Lenten season, the My Heart for Lebanon Association launched a humanitarian initiative titled “Fasting Together” (Saymin Sawa), celebrating solidarity, compassion, and coexistence among Lebanese communities.",
        "The campaign distributed essential food packages in cooperation with more than 30 municipalities across Baabda and the Bekaa region, supporting vulnerable families and easing financial hardships during the fasting season.",
        "Through this initiative, the association reaffirmed its commitment to national unity, interfaith solidarity, and humanitarian values, highlighting how shared traditions of fasting, generosity, and compassion can bring Lebanese communities closer together.",
      ],
      photoAlt: "Fasting Together food aid campaign",
    },
    ar: {
      title: "جمعية «قلبي للبنان» تطلق حملة «صايمين سوا» وتوزّع مساعدات غذائية في أكثر من 30 بلدية في بعبدا والبقاع",
      summary:
        "بمناسبة شهر رمضان وفترة الصوم لدى الطوائف المسيحية، توزيع حصص غذائية بالتعاون مع أكثر من 30 بلدية في بعبدا والبقاع لدعم العائلات المحتاجة.",
      location: "أكثر من 30 بلدية في بعبدا والبقاع",
      body: [
        "بمناسبة شهر رمضان المبارك وفترة الصوم لدى الطوائف المسيحية، أطلقت جمعية «قلبي للبنان» حملة إنسانية بعنوان «صايمين سوا»، تجسيداً لقيم التضامن والتكافل والعيش المشترك بين اللبنانيين.",
        "وشملت المبادرة توزيع مساعدات وحصص غذائية بالتعاون مع أكثر من 30 بلدية في منطقتَي بعبدا والبقاع، بهدف دعم العائلات المحتاجة والتخفيف من الأعباء المعيشية خلال فترة الصيام.",
        "وتؤكد هذه الحملة رسالة الجمعية في تعزيز الوحدة الوطنية والتضامن الإنساني، انطلاقاً من أن الصيام يجمع اللبنانيين على قيم المحبة والعطاء، بعيداً عن الاختلافات الدينية والطائفية.",
      ],
      photoAlt: "حملة «صايمين سوا» لتوزيع المساعدات الغذائية",
    },
  },
  {
    slug: "youth-academy-it-ai-english",
    category: "youth",
    date: null, // "winter 2025": exact date not given yet
    featured: false,
    en: {
      title: "My Heart for Lebanon Association Launches Youth Academy for IT, Artificial Intelligence, and English Language Skills",
      summary:
        "Launched in winter 2025, the “Youth Academy” trains young Lebanese in Information Technology, Artificial Intelligence and English to strengthen their career prospects.",
      location: "Youth Academy",
      body: [
        "In winter 2025, the My Heart for Lebanon Association, headed by Dr. Hadi Mourad, launched a new educational initiative titled “Youth Academy,” aimed at empowering Lebanese youth through training in Information Technology (IT), Artificial Intelligence (AI), and English language skills.",
        "The initiative forms part of the association’s commitment to youth development, digital literacy, and improving educational and professional opportunities in an increasingly technology-driven world.",
        "Through this academy, the association seeks to equip young people with essential skills, strengthen their career prospects, and invest in a more innovative and promising future for Lebanon.",
      ],
      photoAlt: "Youth Academy training session",
    },
    ar: {
      title: "جمعية «قلبي للبنان» تطلق أكاديمية لتأهيل الشباب في التكنولوجيا والذكاء الاصطناعي واللغة الإنجليزية",
      summary:
        "في شتاء 2025، أطلقت الجمعية «أكاديمية الشباب» لتطوير مهارات الشباب اللبناني في تكنولوجيا المعلومات والذكاء الاصطناعي واللغة الإنجليزية.",
      location: "أكاديمية الشباب",
      body: [
        "في شتاء عام 2025، أطلقت جمعية «قلبي للبنان» برئاسة الدكتور هادي مراد مبادرة تعليمية تحت عنوان «أكاديمية الشباب»، تهدف إلى تمكين الشباب اللبناني وتطوير مهاراتهم في تكنولوجيا المعلومات (IT)، والذكاء الاصطناعي (AI)، واللغة الإنجليزية.",
        "وتندرج هذه المبادرة ضمن رؤية الجمعية للاستثمار في طاقات الشباب، وتعزيز فرصهم التعليمية والمهنية، ومواكبة التطورات التكنولوجية ومتطلبات سوق العمل الحديث.",
        "وتؤكد الجمعية من خلال هذه الأكاديمية أن تمكين الشباب بالعلم والمعرفة يشكّل أساساً لبناء مستقبل أفضل للبنان.",
      ],
      photoAlt: "جلسة تدريبية في أكاديمية الشباب",
    },
  },
];

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await importEvents(payload, events);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await removeEvents(
    payload,
    events.map((e) => e.slug)
  );
}
