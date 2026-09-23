function Landing({ onStart, language, setLanguage }) {
  const isHindi = language === "hi";

  const t = {
    en: {
      howItWorks: "How it works",
      privacy: "Privacy & Trust",
      voice: "🎙 Voice Assistant",
      badge: "Citizen-first benefit discovery",
      hero: "Government benefits shouldn't be hard to find.",
      description:
        "Tell us about your situation. Sahayak helps you discover potential government benefits, understand why they may match, and prepare the documents you may need.",
      findBenefits: "Find My Benefits →",
      seeHow: "See How It Works",
      noAccount: "✓ No account required",
      simpleLanguage: "✓ Simple language",
      officialSources: "✓ Official sources",
      journey: "Sahayak journey",
      journeyTitle: "From situation to action",
      ready: "Ready",
      tellUs: "Tell us",
      tellUsDesc: "Describe your situation naturally.",
      match: "We match",
      matchDesc: "Find potential benefit matches.",
      getReady: "Get ready",
      getReadyDesc: "See documents and next steps.",
      simpler: "Your benefits, made simpler.",
      howTitle: "Start with your situation, not the scheme name.",
      howDesc:
        "Sahayak turns a simple conversation into a clearer path toward potential government benefits.",
      tellCard: "Describe your situation naturally by typing or speaking.",
      matchCard: "Compare your information with the available scheme dataset.",
      readyCard: "Understand potential matches, documents and next steps.",
      voiceFriendly: "Voice friendly",
      multilingual: "Multilingual",
      clearDocuments: "Clear documents",
      privacyFocused: "Privacy focused",
      ctaTitle: "Don't know where to start?",
      ctaDesc: "Start with your situation, not the scheme name.",
      footerDesc: "Civic benefits discovery made simpler.",
      disclaimer:
        "Sahayak provides informational guidance only. Final eligibility and benefit approval are determined by the relevant government authority.",
    },

    hi: {
      howItWorks: "यह कैसे काम करता है",
      privacy: "गोपनीयता और भरोसा",
      voice: "🎙 वॉइस असिस्टेंट",
      badge: "नागरिक-केंद्रित लाभ खोज",
      hero: "सरकारी लाभों को ढूँढना मुश्किल नहीं होना चाहिए।",
      description:
        "अपनी स्थिति के बारे में बताएं। सहायाक आपको संभावित सरकारी लाभ खोजने, यह समझने कि वे आपके लिए क्यों उपयोगी हो सकते हैं, और आवश्यक दस्तावेज़ तैयार करने में मदद करता है।",
      findBenefits: "मेरे लाभ खोजें →",
      seeHow: "यह कैसे काम करता है",
      noAccount: "✓ अकाउंट की आवश्यकता नहीं",
      simpleLanguage: "✓ सरल भाषा",
      officialSources: "✓ आधिकारिक स्रोत",
      journey: "सहायाक की प्रक्रिया",
      journeyTitle: "स्थिति से समाधान तक",
      ready: "तैयार",
      tellUs: "बताएं",
      tellUsDesc: "अपनी स्थिति सामान्य तरीके से बताएं।",
      match: "हम मिलान करते हैं",
      matchDesc: "संभावित लाभों से आपका मिलान करें।",
      getReady: "तैयार हों",
      getReadyDesc: "दस्तावेज़ और अगले कदम देखें।",
      simpler: "आपके लाभ, अब और आसान।",
      howTitle: "योजना का नाम नहीं, अपनी स्थिति से शुरुआत करें।",
      howDesc:
        "सहायाक एक सरल बातचीत को संभावित सरकारी लाभों तक पहुँचने के स्पष्ट रास्ते में बदलता है।",
      tellCard: "टाइप करके या बोलकर अपनी स्थिति सामान्य तरीके से बताएं।",
      matchCard: "आपकी जानकारी की उपलब्ध योजनाओं के डेटासेट से तुलना करें।",
      readyCard: "संभावित लाभ, आवश्यक दस्तावेज़ और अगले कदम समझें।",
      voiceFriendly: "वॉइस सुविधा",
      multilingual: "बहुभाषी",
      clearDocuments: "स्पष्ट दस्तावेज़",
      privacyFocused: "गोपनीयता केंद्रित",
      ctaTitle: "समझ नहीं आ रहा कहाँ से शुरू करें?",
      ctaDesc: "योजना के नाम से नहीं, अपनी स्थिति से शुरुआत करें।",
      footerDesc: "सरकारी लाभों की खोज अब आसान।",
      disclaimer:
        "सहायाक केवल सूचनात्मक मार्गदर्शन प्रदान करता है। अंतिम पात्रता और लाभ की मंज़ूरी संबंधित सरकारी प्राधिकरण द्वारा निर्धारित की जाती है।",
    },
  };

  const text = t[language] || t.en;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/sahayak-icon.png"
              alt="Sahayak"
              className="h-10 w-10 rounded-xl object-cover"
            />

            <div>
              <h1 className="text-lg font-bold text-[#102d68]">SAHAYAK</h1>

              <p className="text-xs text-slate-500">
                {language === "hi"
                  ? "नागरिक लाभ खोज"
                  : "Civic Benefits Discovery"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-[#102d68]"
            >
              {text.howItWorks}
            </a>

            <a
              href="#trust"
              className="text-sm font-medium text-slate-600 hover:text-[#102d68]"
            >
              {text.privacy}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center rounded-full border border-slate-200 bg-white p-1">
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                  !isHindi
                    ? "bg-[#102d68] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                English
              </button>

              <button
                onClick={() => setLanguage("hi")}
                className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                  isHindi
                    ? "bg-[#102d68] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                हिंदी
              </button>
            </div>

            <button className="rounded-full bg-[#102d68] px-4 py-2 text-xs font-semibold text-white">
              {text.voice}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="bg-[#f7f9fc]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#102d68]">
                {text.badge}
              </div>

              <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[#102d68] md:text-6xl">
                {text.hero}
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                {text.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={onStart}
                  className="rounded-xl bg-[#102d68] px-7 py-4 font-semibold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-[#0b2455]"
                >
                  {text.findBenefits}
                </button>

                <a
                  href="#how-it-works"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-center font-semibold text-slate-700 hover:border-blue-300"
                >
                  {text.seeHow}
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-500">
                <span>{text.noAccount}</span>
                <span>{text.simpleLanguage}</span>
                <span>{text.officialSources}</span>
              </div>
            </div>

            {/* Product preview */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-100/50 blur-3xl"></div>

              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {text.journey}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-[#102d68]">
                      {text.journeyTitle}
                    </h3>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {text.ready}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <JourneyStep
                    number="01"
                    title={text.tellUs}
                    description={text.tellUsDesc}
                  />

                  <JourneyStep
                    number="02"
                    title={text.match}
                    description={text.matchDesc}
                  />

                  <JourneyStep
                    number="03"
                    title={text.getReady}
                    description={text.getReadyDesc}
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-[#102d68] p-5 text-white">
                  <p className="text-xs text-blue-200">SAHAYAK</p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-semibold">{text.simpler}</p>

                    <span className="text-2xl">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-y border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                {text.howItWorks}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#102d68] md:text-4xl">
                {text.howTitle}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">{text.howDesc}</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <InfoCard
                number="01"
                title={text.tellUs}
                description={text.tellCard}
              />

              <InfoCard
                number="02"
                title={text.match}
                description={text.matchCard}
              />

              <InfoCard
                number="03"
                title={text.getReady}
                description={text.readyCard}
              />
            </div>
          </div>
        </section>

        {/* Trust */}
        <section id="trust" className="bg-[#f7f9fc]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-6 md:grid-cols-4">
              <TrustCard icon="🎙" title={text.voiceFriendly} />
              <TrustCard icon="🌐" title={text.multilingual} />
              <TrustCard icon="📄" title={text.clearDocuments} />
              <TrustCard icon="🔒" title={text.privacyFocused} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#102d68]">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center text-white">
            <h2 className="text-3xl font-bold md:text-4xl">{text.ctaTitle}</h2>

            <p className="mt-4 text-blue-100">{text.ctaDesc}</p>

            <button
              onClick={onStart}
              className="mt-8 rounded-xl bg-white px-8 py-4 font-bold text-[#102d68] hover:bg-blue-50"
            >
              {text.findBenefits}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#08152f] px-6 py-8 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-white">SAHAYAK</p>

            <p className="text-sm">{text.footerDesc}</p>
          </div>

          <p className="max-w-xl text-xs leading-5 md:text-right">
            {text.disclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}

function JourneyStep({ number, title, description }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-[#102d68]">
        {number}
      </div>

      <div>
        <h4 className="font-bold text-[#102d68]">{title}</h4>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function InfoCard({ number, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-[#102d68]">
        {number}
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#102d68]">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function TrustCard({ icon, title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="text-2xl">{icon}</div>

      <h3 className="mt-4 font-bold text-[#102d68]">{title}</h3>
    </div>
  );
}

export default Landing;
