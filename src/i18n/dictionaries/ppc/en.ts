/**
 * "Peace Protects the Shia" project page copy (English), as supplied by the
 * charity. `ar.ts` must provide the same shape.
 */
const ppcEn = {
  meta: {
    title: "Peace Protects the Shia",
    description:
      "A strategic initiative by My Heart for Lebanon promoting a culture of peace, dialogue and civic engagement within Lebanon’s Shiite communities and across Lebanese society.",
  },
  hero: {
    kicker: "A My Heart for Lebanon project",
    title: "Peace Protects the Shia",
    altTitle: "السلام يحمي الشيعة",
    subtitle: "Building a Culture of Peace, Citizenship, and National Partnership",
    logoAlt: "Peace Protects the Shia logo",
  },
  intro: {
    kicker: "About the project",
    title: { before: "A new generation of ", highlight: "peace advocates", after: "" },
    paragraphs: [
      "Peace Protects the Shia is a strategic initiative led by My Heart for Lebanon NGO, dedicated to promoting a culture of peace, dialogue, and civic engagement within Lebanon’s Shiite communities and across Lebanese society.",
      "The project seeks to empower a new generation of peace advocates, strengthen national belonging, and promote the values of state sovereignty, coexistence, and nonviolence.",
    ],
    imageAlt: "Peace Protects the Shia roll-up banner: for a fairer and safer Lebanon",
  },
  activities: {
    kicker: "What we do",
    title: { before: "Our key ", highlight: "activities", after: "" },
    items: [
      {
        id: "academy",
        title: "Peace Leadership Academy",
        text: "Empowering youth through education in citizenship, human rights, leadership, and conflict resolution.",
      },
      {
        id: "forums",
        title: "National Peace Forums",
        text: "Bringing together political, religious, and intellectual figures to encourage dialogue and national partnership.",
      },
      {
        id: "podcast",
        title: "Peace Talks Podcast",
        text: "Hosting thought-provoking conversations on peace, identity, religion, and the future of Lebanon.",
      },
      {
        id: "workshops",
        title: "Community Workshops",
        text: "Promoting tolerance, civic participation, and reconciliation through grassroots engagement.",
      },
      {
        id: "research",
        title: "Research & Advocacy",
        text: "Developing policy recommendations that advance peace, stability, and inclusive citizenship.",
      },
    ],
  },
  podcast: {
    kicker: "Peace Talks Podcast",
    title: { before: "Honest conversations for ", highlight: "a better tomorrow", after: "" },
    imageAlt: "The Peace Protects the Shia podcast studio",
  },
  vision: {
    kicker: "Our vision",
    text: "A Lebanon where peace replaces conflict, citizenship transcends sectarian divisions, and all communities thrive under strong state institutions.",
    mottoLabel: "Our motto",
    motto: "Peace Protects and Builds",
    mottoAlt: "بالسلام نحمي ونبني",
  },
};

export default ppcEn;
export type PpcDictionary = typeof ppcEn;
