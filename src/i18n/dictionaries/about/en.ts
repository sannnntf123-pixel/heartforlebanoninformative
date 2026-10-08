/**
 * About page copy (English). Source: docs/content/about-en.md.
 * `ar.ts` must provide the same shape.
 */
const aboutEn = {
  meta: {
    title: "About us",
    description:
      "My Heart for Lebanon (قلبي للبنان) is a Lebanese non-profit organization working in youth education, peacebuilding, preventive health, women empowerment and humanitarian support across Lebanon.",
  },
  hero: {
    kicker: "About us",
    name: "My Heart for Lebanon",
    tagline: [
      "Building Peace.",
      "Strengthening Sovereignty.",
      "Empowering Youth and Women.",
      "Protecting Health.",
    ],
    taglineEnd: "For Lebanon.",
  },
  whoWeAre: {
    kicker: "Since 2021",
    title: { before: "Who ", highlight: "we are", after: "" },
    paragraphs: [
      "My Heart for Lebanon (قلبي للبنان) is a Lebanese non-governmental, non-profit organization officially established on 22 July 2021, under Notice No. 805 (علم وخبر رقم 805) issued by the Lebanese Ministry of Interior and Municipalities.",
      "Born in Baalbek and the Bekaa, My Heart for Lebanon began with a commitment to serve local communities and empower young people. Its work subsequently expanded across Lebanon through health, education, humanitarian assistance, youth development, women empowerment, and civic initiatives.",
      "Today, the organization operates through offices in Baalbek, Rayak, and Baabda–Hazmieh, while implementing programs and initiatives across Lebanon.",
    ],
    factsTitle: "At a glance",
    facts: [
      { label: "Established", value: "22 July 2021" },
      { label: "Registration", value: "Notice No. 805, Lebanese Ministry of Interior and Municipalities" },
      { label: "Born in", value: "Baalbek and the Bekaa" },
      { label: "Offices", value: "Baalbek, Rayak and Baabda–Hazmieh" },
    ],
    imageAlt: "Volunteers delivering aid to families",
    beliefIntro: "At the heart of everything we do is one fundamental belief:",
    belief: "Human dignity comes first.",
    beliefText:
      "We believe every person deserves access to health, knowledge, opportunity, and the ability to participate meaningfully in society — regardless of religion, sect, political affiliation, gender, or social background.",
  },
  mission: {
    kicker: "What drives us",
    title: { before: "Our ", highlight: "mission", after: "" },
    lead: "Our mission is to educate, empower, protect, and connect communities across Lebanon, with a particular focus on youth, children, women, and vulnerable populations.",
    items: {
      youth: {
        title: "Empowering young people",
        text: "We empower young people through education in human rights, leadership, citizenship, civic engagement, peacebuilding, and public affairs.",
      },
      protect: {
        title: "Protecting communities",
        text: "We protect communities through preventive healthcare, early detection, medical awareness, and humanitarian assistance.",
      },
      women: {
        title: "Supporting women",
        text: "We support women by creating opportunities for economic participation, entrepreneurship, leadership, and community engagement.",
      },
      peace: {
        title: "A culture of peace",
        text: "And we work to strengthen a culture of peace, acceptance, tolerance, dialogue, and respect for human dignity.",
      },
    },
  },
  objectives: {
    kicker: "Six pillars",
    title: { before: "Our ", highlight: "objectives", after: "" },
    lead: "The work of My Heart for Lebanon is centered around six main pillars:",
    items: {
      youth: {
        title: "Youth Leadership & Education",
        text: "Developing a new generation of informed, responsible, and engaged young leaders through training in human rights, leadership, citizenship, public law, advocacy, communication, and community service.",
      },
      peace: {
        title: "Peace, Acceptance & Tolerance",
        text: "Promoting dialogue, non-violence, mutual respect, acceptance of diversity, and peaceful coexistence among Lebanon’s different communities.",
      },
      health: {
        title: "Health & Prevention",
        text: "Improving access to preventive healthcare, screening, early detection, medical education, and health awareness, particularly for children, women, and vulnerable populations.",
      },
      civic: {
        title: "Civic Engagement",
        text: "Encouraging young people to understand their rights and responsibilities and become constructive participants in their communities and public life.",
      },
      humanitarian: {
        title: "Social & Humanitarian Support",
        text: "Providing medical assistance, food, essential supplies, and humanitarian support to families, refugees, and communities facing difficult circumstances.",
      },
      women: {
        title: "Women Empowerment",
        text: "Supporting women’s economic independence, entrepreneurship, leadership, education, and participation in their communities.",
      },
    },
  },
  activities: {
    kicker: "Since our establishment",
    title: { before: "Our ", highlight: "activities", after: "" },
    items: {
      youth: {
        title: "Youth Education & Leadership",
        highlight: null,
        paragraphs: [
          "Since its establishment, My Heart for Lebanon has organized academic workshops, training programs, and community initiatives for young people, particularly in Baalbek and the Bekaa.",
          "Programs have addressed subjects including human rights, citizenship, public law, leadership, advocacy, communication, conflict resolution, peacebuilding, community organizing, and civic responsibility.",
          "Our goal is not simply to educate young people, but to give them the tools to become leaders and positive agents of change within their communities.",
        ],
        quote: null,
      },
      breastCancer: {
        title: "10,000 Women Breast Cancer Screening Initiative",
        highlight: { value: "10,000", label: "women screened" },
        paragraphs: [
          "One of the largest health initiatives undertaken by My Heart for Lebanon was a breast cancer screening campaign reaching approximately 10,000 women across Lebanon, conducted in coordination with LAU Medical Center.",
          "The campaign promoted early detection and breast cancer awareness, while helping women access screening services across different Lebanese communities.",
        ],
        quote: { intro: "It reflects one of our fundamental health principles:", text: "Early detection saves lives." },
      },
      childrenHeart: {
        title: "Children’s Heart Screening Campaign",
        highlight: { value: "2,000+", label: "children screened" },
        paragraphs: [
          "My Heart for Lebanon has also conducted a major pediatric cardiovascular health initiative, reaching more than 2,000 children through cardiac screening and awareness activities.",
          "The program focuses on the early identification of potentially serious heart conditions and on educating families about cardiovascular health, warning signs, and the prevention of sudden cardiac death.",
          "Our objective is to bring preventive medicine directly into communities and reach children before an undiagnosed condition becomes an emergency.",
        ],
        quote: null,
      },
      women: {
        title: "Women Empowerment & Entrepreneurship",
        highlight: null,
        paragraphs: [
          "My Heart for Lebanon believes that empowering women strengthens entire communities.",
          "In collaboration with the YWCA, the organization organized an initiative around Lebanese Independence Day supporting Lebanese women entrepreneurs and women-led small businesses.",
          "The initiative provided women with an opportunity to present their products, promote their businesses, expand their networks, and strengthen their economic participation.",
        ],
        quote: {
          intro: "",
          text: "Our women empowerment programs seek to transform skills into opportunities and opportunities into independence.",
        },
      },
      refugees: {
        title: "Refugee & Humanitarian Support",
        highlight: { value: "30+", label: "refugee centers & communities" },
        paragraphs: [
          "My Heart for Lebanon has reached more than 30 refugee centers and vulnerable communities, providing assistance according to identified humanitarian needs.",
          "Our interventions have included medical assistance, medications, food support, essential supplies, health awareness, and medical referrals.",
          "Our approach is based on providing assistance while protecting the dignity of every individual and family we serve.",
        ],
        quote: null,
      },
      occasions: {
        title: "Ramadan & Easter Initiatives",
        highlight: null,
        paragraphs: [
          "Lebanon’s diversity is part of its identity.",
          "During Ramadan, Easter, and other national and community occasions, My Heart for Lebanon has organized food campaigns, distributions, family assistance, and solidarity initiatives.",
        ],
        quote: {
          intro: "These activities combine humanitarian assistance with a broader message:",
          text: "Compassion has no sect, religion, or political identity.",
        },
      },
    },
    imageAlts: {
      refugees: "Volunteers handing out medicine and supplies",
      occasions: "A volunteer carrying a food parcel",
    },
  },
  impact: {
    kicker: "In numbers",
    title: { before: "Our ", highlight: "impact", after: "" },
    items: [
      { value: "10,000+", label: "Women reached through breast cancer screening" },
      { value: "2,000+", label: "Children reached through cardiac screening initiatives" },
      { value: "30+", label: "Refugee centers and vulnerable communities supported" },
      { value: "Hundreds", label: "of young people reached through education and leadership activities" },
      { value: "3", label: "Operational locations: Baalbek, Rayak & Baabda–Hazmieh" },
      { value: "Nationwide", label: "Health, humanitarian, youth and community initiatives across Lebanon" },
    ],
  },
  vision: {
    kicker: "Looking ahead",
    title: { before: "Our ", highlight: "vision", after: "" },
    lead: "We envision a Lebanon where young people choose knowledge over ignorance, dialogue over violence, tolerance over division, and participation over indifference.",
    points: [
      "A Lebanon where children have the opportunity to grow up healthy.",
      "A Lebanon where women have the opportunity to lead, create, work, and achieve economic independence.",
      "A Lebanon where vulnerable people are protected rather than forgotten.",
      "And a Lebanon where differences do not divide its people, but enrich a society built on peace, citizenship, human dignity, and mutual respect.",
    ],
    closing: ["Because Lebanon is more than a place we belong to.", "It is a responsibility we share."],
  },
  closing: {
    name: "My Heart for Lebanon",
    lines: [
      { before: "Together, ", highlight: "we educate", after: "." },
      { before: "Together, ", highlight: "we protect", after: "." },
      { before: "Together, ", highlight: "we empower", after: "." },
      { before: "Together, ", highlight: "we build peace", after: "." },
    ],
    contactCta: "Get in touch",
  },
};

export default aboutEn;

export type AboutDictionary = typeof aboutEn;
