/* =========================================================
   KOLPO FILMS — edit this file to update the site.
   Every text has an English (en) and Bangla (bn) version.
   ========================================================= */
window.KOLPO = {
  contact: {
    whatsapp: "8801784065730",
    whatsappLabel: "+880 1784-065730",
    email: "masumkhandakar4@gmail.com",
  },
  socials: [
    { label: "Facebook", url: "https://www.facebook.com/masum.khandakar4/" },
    { label: "Instagram", url: "https://www.instagram.com/mh_masum57/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/masum4/" },
  ],
  founderSite: "https://masum4.github.io",

  /* Work ---------------------------------------------------
     kind:  "ad" | "film" | "music"
     video: a local .mp4 plays in the popup; link: opens in a new tab
     concept: true labels it as concept work, never as a client job */
  work: [
    {
      kind: "ad", concept: true, format: "9:16", length: "0:20",
      title: "ZAHRAEL · The Eid Edit",
      line: { en: "An abaya lookbook ad for a fictional label: one model, three looks, woven from the desert wind.", bn: "একটি কাল্পনিক লেবেলের আবায়া লুকবুক বিজ্ঞাপন: একজন মডেল, তিনটি লুক।" },
      credit: { en: "Consistent AI model, 3 looks, fabric-wipe edit, motion graphics, original Arabic house music", bn: "একই এআই মডেল, ৩টি লুক, ফ্যাব্রিক-ওয়াইপ এডিট, মোশন গ্রাফিক্স, অরিজিনাল মিউজিক" },
      thumb: "assets/img/zahrael.png", video: "assets/video/zahrael.mp4",
    },
    {
      kind: "ad", concept: true, format: "9:16", length: "0:20",
      title: "ASTRAVEL · Espresso No. 7",
      line: { en: "A high-energy coffee ad for a fictional roaster: \"A universe in every cup.\"", bn: "একটি কাল্পনিক কফি ব্র্যান্ডের হাই-এনার্জি বিজ্ঞাপন: \"প্রতিটি কাপে একটি মহাবিশ্ব।\"" },
      credit: { en: "Product design, 10 AI shots, beat-synced edit, motion graphics, original music", bn: "প্রোডাক্ট ডিজাইন, ১০টি এআই শট, বিট-সিঙ্কড এডিট, মোশন গ্রাফিক্স, অরিজিনাল মিউজিক" },
      thumb: "assets/img/astravel.png", video: "assets/video/astravel.mp4",
    },
    {
      kind: "ad", concept: true, format: "9:16", length: "0:15",
      title: "EMBER & DUNE · Oud de Nuit",
      line: { en: "Luxury perfume ad for a fictional oud house.", bn: "একটি কাল্পনিক উদ ব্র্যান্ডের লাক্সারি পারফিউম বিজ্ঞাপন।" },
      credit: { en: "Product design, AI shots, edit, original music", bn: "প্রোডাক্ট ডিজাইন, এআই শট, এডিট, অরিজিনাল মিউজিক" },
      thumb: "assets/img/ember-dune.png", video: "assets/video/ember-dune.mp4",
    },
    {
      kind: "film", format: "9:16",
      title: "7:00 AM",
      line: { en: "Every day, the same alarm. Until one day he took the watch off.", bn: "প্রতিদিন একই অ্যালার্ম। একদিন সে ঘড়িটাই খুলে ফেলল।" },
      credit: { en: "Story, AI video, edit, sound", bn: "গল্প, এআই ভিডিও, এডিট, সাউন্ড" },
      thumb: "assets/img/7am.png", link: "https://www.facebook.com/reel/914210741658470",
    },
    {
      kind: "film", format: "9:16",
      title: "Kalpurush (কালপুরুষ)",
      line: { en: "A fictional Bangla short film inspired by real events.", bn: "সত্য ঘটনা থেকে অনুপ্রাণিত একটি কাল্পনিক বাংলা শর্ট ফিল্ম।" },
      credit: { en: "Story, AI video, edit", bn: "গল্প, এআই ভিডিও, এডিট" },
      thumb: "assets/img/kalpurush.png", link: "https://www.facebook.com/reel/1862259908100611",
    },
    {
      kind: "music", format: "9:16",
      title: "Grand Theft Manual · Dhaka edition",
      line: { en: "A game-style music video set in Dhaka.", bn: "ঢাকাকে ঘিরে গেম-স্টাইলের মিউজিক ভিডিও।" },
      credit: { en: "Edit · clips & song: The Khalid Way", bn: "এডিট · ক্লিপ ও গান: The Khalid Way" },
      thumb: "assets/img/grand-theft-manual.png", link: "https://www.facebook.com/reel/2939809759699478",
    },
  ],

  /* The making-of strip uses real frames from the EMBER & DUNE ad. */
  making: [
    { img: "assets/img/make-1-product.jpg",
      t: { en: "Design the product", bn: "প্রোডাক্ট ডিজাইন" },
      d: { en: "We design the product look first, then lock it as the reference for every shot, so it never changes between scenes.", bn: "আগে প্রোডাক্টের লুক ডিজাইন করি, তারপর সেটাকেই প্রতিটি শটের রেফারেন্স হিসেবে লক করি, যাতে কোনো দৃশ্যে বদলে না যায়।" } },
    { img: "assets/img/make-2-frame.jpg",
      t: { en: "Approve the frames", bn: "ফ্রেম অনুমোদন" },
      d: { en: "Every shot starts as a still image you approve. Changes at this stage are fast and cost nothing.", bn: "প্রতিটি শট শুরু হয় একটি স্থির ছবি দিয়ে, যা আপনি অনুমোদন করেন। এই ধাপে পরিবর্তন দ্রুত এবং বিনা খরচে।" } },
    { img: "assets/img/make-3-shot.jpg",
      t: { en: "Bring it to life", bn: "দৃশ্যে প্রাণ" },
      d: { en: "Each frame becomes motion. We check every clip frame by frame and cut around any AI glitch.", bn: "প্রতিটি ফ্রেম চলমান দৃশ্যে রূপ নেয়। প্রতিটি ক্লিপ ফ্রেম ধরে চেক করি, এআই-এর ভুল অংশ কেটে বাদ দিই।" } },
    { img: "assets/img/make-4-final.jpg",
      t: { en: "The final cut", bn: "ফাইনাল কাট" },
      d: { en: "Colour grade, type, original music and sound design, delivered in every size you need.", bn: "কালার গ্রেড, টাইপোগ্রাফি, অরিজিনাল মিউজিক ও সাউন্ড, আপনার প্রয়োজনীয় সব সাইজে।" } },
  ],
  makingStats: [
    { n: "5", l: { en: "AI shots", bn: "এআই শট" } },
    { n: "15", l: { en: "seconds", bn: "সেকেন্ড" } },
    { n: "0", l: { en: "cameras or crew", bn: "ক্যামেরা বা ক্রু" } },
    { n: "1", l: { en: "day, idea to final cut", bn: "দিন, আইডিয়া থেকে ফাইনাল কাট" } },
  ],

  /* Prices are optional: leave "" to show "Get a quote". */
  services: [
    { tag: "01", price: "",
      t: { en: "AI ad films", bn: "এআই বিজ্ঞাপন" },
      d: { en: "TVC-style commercials and social ads with a story, built to stop the thumb and sell the product.", bn: "গল্পসহ টিভিসি-স্টাইল বিজ্ঞাপন ও সোশ্যাল অ্যাড, যা স্ক্রল থামায় আর প্রোডাক্ট বিক্রি করে।" },
      items: { en: ["Script, storyboard and voice", "16:9 for TV and YouTube", "9:16 for Reels and TikTok"], bn: ["স্ক্রিপ্ট, স্টোরিবোর্ড ও ভয়েস", "টিভি ও ইউটিউবের জন্য ১৬:৯", "রিলস ও টিকটকের জন্য ৯:১৬"] } },
    { tag: "02", price: "",
      t: { en: "Product films", bn: "প্রোডাক্ট ফিল্ম" },
      d: { en: "Premium product videos for e-commerce stores and launches, without a studio shoot.", bn: "স্টুডিও শুট ছাড়াই ই-কমার্স ও লঞ্চের জন্য প্রিমিয়াম প্রোডাক্ট ভিডিও।" },
      items: { en: ["Hero and detail shots", "Store and ad cutdowns", "Same look across every video"], bn: ["হিরো ও ডিটেইল শট", "স্টোর ও অ্যাডের ছোট ভার্সন", "সব ভিডিওতে একই লুক"] } },
    { tag: "03", price: "",
      t: { en: "Brand stories & short films", bn: "ব্র্যান্ড স্টোরি ও শর্ট ফিল্ম" },
      d: { en: "Emotional films that make people remember a brand, from 30 seconds to a few minutes.", bn: "আবেগী ফিল্ম, যা মানুষকে ব্র্যান্ড মনে রাখতে সাহায্য করে, ৩০ সেকেন্ড থেকে কয়েক মিনিট।" },
      items: { en: ["Original story and characters", "Consistent characters across scenes", "Bangla and English"], bn: ["অরিজিনাল গল্প ও চরিত্র", "সব দৃশ্যে একই চরিত্র", "বাংলা ও ইংরেজি"] } },
    { tag: "04", price: "",
      t: { en: "Music videos & edits", bn: "মিউজিক ভিডিও ও এডিট" },
      d: { en: "Music videos, reels and edits from your footage or ours, cut to the beat.", bn: "আপনার বা আমাদের ফুটেজ থেকে মিউজিক ভিডিও, রিলস ও এডিট, বিটের তালে তালে।" },
      items: { en: ["AI visuals or your footage", "Colour grade and effects", "Subtitles in any language"], bn: ["এআই ভিজ্যুয়াল বা আপনার ফুটেজ", "কালার গ্রেড ও ইফেক্ট", "যেকোনো ভাষায় সাবটাইটেল"] } },
  ],

  process: [
    { t: { en: "Brief", bn: "ব্রিফ" }, d: { en: "A short call or chat: your product, your audience, where the film will run.", bn: "ছোট একটি কল বা চ্যাট: আপনার প্রোডাক্ট, দর্শক, আর ফিল্মটি কোথায় চলবে।" } },
    { t: { en: "Script & frames", bn: "স্ক্রিপ্ট ও ফ্রেম" }, d: { en: "You approve the script and the key frames before a single second of video is made.", bn: "এক সেকেন্ড ভিডিও বানানোর আগেই আপনি স্ক্রিপ্ট ও মূল ফ্রেম অনুমোদন করেন।" } },
    { t: { en: "Production", bn: "প্রোডাকশন" }, d: { en: "AI shots, edit, music and sound. You see progress as it happens.", bn: "এআই শট, এডিট, মিউজিক ও সাউন্ড। কাজের অগ্রগতি সাথে সাথে দেখতে পাবেন।" } },
    { t: { en: "Delivery", bn: "ডেলিভারি" }, d: { en: "The final film in every size you need, with two rounds of changes included.", bn: "প্রয়োজনীয় সব সাইজে ফাইনাল ফিল্ম, সাথে দুই দফা পরিবর্তন।" } },
  ],

  /* Short UI texts */
  i18n: {
    en: {
      nav_work: "Work", nav_making: "Making of", nav_services: "Services", nav_process: "Process", nav_contact: "Contact",
      cta_start: "Start a project",
      hero_kicker: "AI film & ad studio · Bangladesh, worldwide",
      hero_title: "Imagination,<br><em>filmed.</em>",
      hero_sub: "Kolpo Films turns a brief into cinematic ads, product films and short stories with generative AI. No crew, no sets, no waiting weeks.",
      hero_play: "Watch the latest film",
      hero_now: "Now showing",
      work_kicker: "Selected work", work_title: "Films that <em>feel</em> real.",
      f_all: "All", f_ad: "Ads", f_film: "Short films", f_music: "Music videos",
      concept: "Concept ad", watch: "Watch", open: "Watch on Facebook",
      making_kicker: "Making of", making_title: "One image. Fifteen seconds. <em>Zero cameras.</em>",
      making_sub: "How the EMBER & DUNE ad was made, with the real frames from the project.",
      services_kicker: "Services", services_title: "What we <em>make.</em>",
      quote: "Get a quote →", from: "From",
      process_kicker: "Process", process_title: "From brief to <em>final cut.</em>",
      founder_kicker: "The studio",
      founder_text: "Kolpo comes from the Bangla word <b>kolpona</b>: imagination. The studio is run by <b>Masum Khandakar</b>, a filmmaker and web developer from Bangladesh who makes every film from script to final sound.",
      founder_link: "Need a website or online store too? See Masum's web work ↗",
      contact_kicker: "Contact", contact_title: "Tell us what you <em>imagine.</em>",
      need: "I need", name: "Your name", brand: "Brand / product", msg: "What should we make?", msg_ph: "Product, goal, deadline…",
      send_wa: "Send on WhatsApp", send_mail: "Send by email",
      note_name: "Please add your name first.", note_ok: "Opening your app… we usually reply within a few hours.",
      wa_label: "WhatsApp · fastest", email_label: "Email",
      footer: "Imagination, filmed.",
    },
    bn: {
      nav_work: "কাজ", nav_making: "যেভাবে বানাই", nav_services: "সার্ভিস", nav_process: "প্রসেস", nav_contact: "যোগাযোগ",
      cta_start: "প্রজেক্ট শুরু করুন",
      hero_kicker: "এআই ফিল্ম ও বিজ্ঞাপন স্টুডিও · বাংলাদেশ ও বিশ্বজুড়ে",
      hero_title: "কল্পনা,<br><em>ক্যামেরায়।</em>",
      hero_sub: "কল্প ফিল্মস জেনারেটিভ এআই দিয়ে আপনার ব্রিফকে বানায় সিনেমাটিক বিজ্ঞাপন, প্রোডাক্ট ফিল্ম আর শর্ট ফিল্ম। কোনো ক্রু নেই, সেট নেই, সপ্তাহের পর সপ্তাহ অপেক্ষাও নেই।",
      hero_play: "সর্বশেষ ফিল্ম দেখুন",
      hero_now: "এখন দেখছেন",
      work_kicker: "নির্বাচিত কাজ", work_title: "যে ফিল্ম <em>সত্যি</em> মনে হয়।",
      f_all: "সব", f_ad: "বিজ্ঞাপন", f_film: "শর্ট ফিল্ম", f_music: "মিউজিক ভিডিও",
      concept: "কনসেপ্ট বিজ্ঞাপন", watch: "দেখুন", open: "ফেসবুকে দেখুন",
      making_kicker: "যেভাবে বানাই", making_title: "একটি ছবি। পনেরো সেকেন্ড। <em>কোনো ক্যামেরা নেই।</em>",
      making_sub: "EMBER & DUNE বিজ্ঞাপনটি যেভাবে বানানো হয়েছে, প্রজেক্টের আসল ফ্রেম দিয়ে।",
      services_kicker: "সার্ভিস", services_title: "আমরা যা <em>বানাই।</em>",
      quote: "দাম জানুন →", from: "শুরু",
      process_kicker: "প্রসেস", process_title: "ব্রিফ থেকে <em>ফাইনাল কাট।</em>",
      founder_kicker: "স্টুডিও",
      founder_text: "<b>কল্প</b> নামটি এসেছে বাংলা শব্দ <b>কল্পনা</b> থেকে। স্টুডিওটি পরিচালনা করেন <b>মাসুম খন্দকার</b>, বাংলাদেশের একজন ফিল্মমেকার ও ওয়েব ডেভেলপার, যিনি স্ক্রিপ্ট থেকে শেষ সাউন্ড পর্যন্ত প্রতিটি ফিল্ম নিজে বানান।",
      founder_link: "ওয়েবসাইট বা অনলাইন স্টোরও লাগবে? মাসুমের ওয়েব কাজ দেখুন ↗",
      contact_kicker: "যোগাযোগ", contact_title: "আপনার <em>কল্পনার</em> কথা বলুন।",
      need: "আমার প্রয়োজন", name: "আপনার নাম", brand: "ব্র্যান্ড / প্রোডাক্ট", msg: "কী বানাতে চান?", msg_ph: "প্রোডাক্ট, লক্ষ্য, ডেডলাইন…",
      send_wa: "হোয়াটসঅ্যাপে পাঠান", send_mail: "ইমেইলে পাঠান",
      note_name: "আগে আপনার নাম লিখুন।", note_ok: "অ্যাপ খুলছে… সাধারণত কয়েক ঘণ্টার মধ্যে উত্তর দিই।",
      wa_label: "হোয়াটসঅ্যাপ · দ্রুততম", email_label: "ইমেইল",
      footer: "কল্পনা, ক্যামেরায়।",
    },
  },
};
