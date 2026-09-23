import { useState } from "react";

function Results({
  profile,
  backendMatches = [],
  onViewDetails,
  onDocuments,
  onBack,
  language,
  setLanguage,
}) {
  const data = profile || {
    age: "—",
    location: "Not available",
    maritalStatus: "Not available",
    monthlyIncome: "Not available",
    children: "—",
  };

  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (content) => {
    if (!("speechSynthesis" in window)) {
      alert(
        language === "hi"
          ? "आपके ब्राउज़र में वॉइस आउटपुट उपलब्ध नहीं है।"
          : "Voice output is not supported in this browser.",
      );
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);

    utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.95;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const readAllResults = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const intro = isHindi
      ? `आपके लिए ${schemes.length} संभावित योजना मिलान मिले हैं।`
      : `We found ${schemes.length} potential scheme matches for you.`;

    const schemeSummary = schemes
      .map((scheme, index) => {
        const documents = scheme.documents.length
          ? isHindi
            ? ` आवश्यक दस्तावेज़: ${scheme.documents.join(", ")}.`
            : ` Identified documents: ${scheme.documents.join(", ")}.`
          : "";

        return isHindi
          ? ` योजना ${index + 1}: ${scheme.name}. यह एक ${
              scheme.statusType === "strong"
                ? "मजबूत संभावित मिलान"
                : "संभावित मिलान"
            } है। कारण: ${scheme.reason || "उपलब्ध जानकारी के आधार पर संभावित मिलान।"}.${documents}`
          : ` Scheme ${index + 1}: ${scheme.name}. This is a ${
              scheme.statusType === "strong"
                ? "strong potential match"
                : "potential match"
            }. Reason: ${scheme.reason || "Potential match based on the available information."}.${documents}`;
      })
      .join(" ");

    const missing = totalMissing > 0
      ? isHindi
        ? ` विशेष रूप से अनुपलब्ध बताए गए दस्तावेज़: ${documentsMissing.join(", ")}.`
        : ` Documents specifically marked as missing: ${documentsMissing.join(", ")}.`
      : isHindi
        ? " किसी दस्तावेज़ को विशेष रूप से अनुपलब्ध नहीं बताया गया है।"
        : " No documents have been specifically marked as missing.";

    speakText(`${intro} ${schemeSummary} ${missing}`);
  };

  const isHindi = language === "hi";

  const t = {
    en: {
      civicBenefits: "Civic Benefits Discovery",
      howItWorks: "How it works",
      checkEligibility: "Check Eligibility",
      schemesLibrary: "Schemes Library",
      privacy: "Privacy & Trust",
      voice: "🎙 Voice Assistant",

      activeProfile: "Active Profile",
      years: "years",
      children: "children",
      editProfile: "✎ Edit Profile",

      discovery: "Sahayak Benefit Discovery",
      potentialMatches: "Your Potential Benefit Matches",
      basedOn:
        "Based on the information you provided, Sahayak found potential matches in its scheme dataset. These are informational matches, not final government eligibility decisions.",

      potentialMatch: "Potential Matches",
      basedOnProfile: "Based on your profile",
      documentsReady: "Documents Ready",
      currentReadiness: "No documents confirmed yet",
      documentsNeeded: "Documents Needed",
      mayBeRequired: "Required by the selected schemes",

      matches: "Potential matches",
      reviewMatches: "Review why each result may match your situation.",
      discovered: "discovered",

      whyMatch: "Why it may match",
      matchedInfo: "Matched information",
      documents: "Documents",
      viewDetails: "View Details →",
      officialSource: "↗ Official Source",
      informationalResult: "Informational result",

      yourDocuments: "Your documents",
      documentReadiness: "Document Checklist",
      ready: "identified",
      viewChecklist: "View Document Checklist →",

      whatsNext: "What's next?",
      nextDescription:
        "Review your potential matches and prepare any missing documents before contacting the relevant authority.",
      reviewPotential: "Review a potential match",
      checkMissing: "Check missing documents",
      openOfficial: "Open the official source",
      prepareSummary: "Prepare your application summary",
      checkDocuments: "Check My Documents →",

      listen: "Listen to your results",
      listenDescription:
        "Use Sahayak's read-aloud feature to hear your results.",
      readResults: "🔊 Read Results Aloud",
      readAloud: "🔊 Read Aloud",

      important: "Important:",
      disclaimer:
        "Sahayak provides informational guidance based on the information provided by the user and the available scheme dataset. A potential match does not guarantee eligibility, benefit approval or payment. Final decisions are made by the relevant government authority.",

      readyStatus: "Identified",
      neededStatus: "Needed",

      aadhaar: "Aadhaar Card",
      bank: "Bank Account",
      incomeCertificate: "Income Certificate",
      widowCertificate: "Widow/Widower Certificate",
      schoolCertificate: "School Certificate",

      strongMatch: "Strong potential match",
      potential: "Potential match",

      widowed: "Widowed",
      yes: "Yes",
      no: "No",
    },

    hi: {
      civicBenefits: "नागरिक लाभ खोज",
      howItWorks: "यह कैसे काम करता है",
      checkEligibility: "पात्रता जांचें",
      schemesLibrary: "योजनाओं की सूची",
      privacy: "गोपनीयता और भरोसा",
      voice: "🎙 वॉइस असिस्टेंट",

      activeProfile: "सक्रिय प्रोफ़ाइल",
      years: "वर्ष",
      children: "बच्चे",
      editProfile: "✎ प्रोफ़ाइल संपादित करें",

      discovery: "सहायाक लाभ खोज",
      potentialMatches: "आपके संभावित लाभ",
      basedOn:
        "आपके द्वारा दी गई जानकारी के आधार पर, सहायाक ने अपने योजना डेटासेट में कुछ संभावित मिलान पाए हैं। ये केवल सूचनात्मक मिलान हैं, अंतिम सरकारी पात्रता का निर्णय नहीं।",

      potentialMatch: "संभावित मिलान",
      basedOnProfile: "आपकी प्रोफ़ाइल के आधार पर",
      documentsReady: "तैयार दस्तावेज़",
      currentReadiness: "अभी किसी दस्तावेज़ की पुष्टि नहीं हुई",
      documentsNeeded: "आवश्यक दस्तावेज़",
      mayBeRequired: "चयनित योजनाओं के लिए आवश्यक",

      matches: "संभावित मिलान",
      reviewMatches:
        "देखें कि प्रत्येक परिणाम आपकी स्थिति से क्यों मेल खा सकता है।",
      discovered: "मिले",

      whyMatch: "यह क्यों मेल खा सकता है",
      matchedInfo: "मिलान की गई जानकारी",
      documents: "दस्तावेज़",
      viewDetails: "विवरण देखें →",
      officialSource: "↗ आधिकारिक स्रोत",
      informationalResult: "सूचनात्मक परिणाम",

      yourDocuments: "आपके दस्तावेज़",
      documentReadiness: "दस्तावेज़ सूची",
      ready: "पहचाने गए",
      viewChecklist: "दस्तावेज़ सूची देखें →",

      whatsNext: "अगला कदम क्या है?",
      nextDescription:
        "अपने संभावित मिलानों की समीक्षा करें और संबंधित प्राधिकरण से संपर्क करने से पहले आवश्यक दस्तावेज़ तैयार करें।",
      reviewPotential: "संभावित मिलान की समीक्षा करें",
      checkMissing: "आवश्यक दस्तावेज़ देखें",
      openOfficial: "आधिकारिक स्रोत खोलें",
      prepareSummary: "आवेदन सारांश तैयार करें",
      checkDocuments: "मेरे दस्तावेज़ देखें →",

      listen: "अपने परिणाम सुनें",
      listenDescription:
        "अपने परिणाम सुनने के लिए सहायाक की पढ़कर सुनाने की सुविधा का उपयोग करें।",
      readResults: "🔊 परिणाम सुनें",
      readAloud: "🔊 पढ़कर सुनाएं",

      important: "महत्वपूर्ण:",
      disclaimer:
        "सहायाक उपयोगकर्ता द्वारा दी गई जानकारी और उपलब्ध योजना डेटासेट के आधार पर केवल सूचनात्मक मार्गदर्शन प्रदान करता है। संभावित मिलान पात्रता, लाभ की मंज़ूरी या भुगतान की गारंटी नहीं देता। अंतिम निर्णय संबंधित सरकारी प्राधिकरण द्वारा लिया जाता है।",

      readyStatus: "पहचाना गया",
      neededStatus: "आवश्यक",

      aadhaar: "आधार कार्ड",
      bank: "बैंक खाता",
      incomeCertificate: "आय प्रमाण पत्र",
      widowCertificate: "विधवा/विधुर प्रमाण पत्र",
      schoolCertificate: "स्कूल प्रमाण पत्र",

      strongMatch: "मजबूत संभावित मिलान",
      potential: "संभावित मिलान",

      widowed: "विधवा/विधुर",
      yes: "हाँ",
      no: "नहीं",
    },
  };

  const text = t[language] || t.en;

  const schemes = backendMatches.map((match) => ({
      id: match.scheme_id,
      name: match.name,

      category: match.category || "Government Benefit",

      status: match.match_level || "Potential match",

      statusType:
        match.match_level === "Strong potential match" ? "strong" : "potential",

      matchScore: match.match_score,

      reason:
        match.reason || "Potential match based on the information provided.",

      matchedConditions: match.matched_conditions || [],

      missingInformation: match.missing_information || [],

      documents: match.documents || [],

      documentsReady: match.documents_ready || [],
      documentsMissing: match.missing_documents || match.documents || [],

      benefit: match.benefit || "",

      howToApply: match.how_to_apply || "",

      officialUrl: match.official_url || "",
  }));

  const documentsReady = [
    ...new Set(schemes.flatMap((scheme) => scheme.documentsReady)),
  ];

  const documentsMissing = [
    ...new Set(schemes.flatMap((scheme) => scheme.documentsMissing)),
  ];

  const totalIdentified = documentsReady.length;
  const totalMissing = documentsMissing.length;

  const translateProfileValue = (value) => {
    if (!isHindi) return value;

    if (value === "Yes") return text.yes;
    if (value === "No") return text.no;
    if (value === "Widowed") return text.widowed;

    return value;
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button onClick={onBack} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102d68] font-bold text-white">
              S
            </div>

            <div className="hidden text-left sm:block">
              <p className="font-bold text-[#102d68]">SAHAYAK</p>

              <p className="text-xs text-slate-500">{text.civicBenefits}</p>
            </div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            <button className="text-sm text-slate-500 hover:text-[#102d68]">
              {text.howItWorks}
            </button>

            <button className="font-semibold text-[#102d68]">
              {text.checkEligibility}
            </button>

            <button className="text-sm text-slate-500 hover:text-[#102d68]">
              {text.schemesLibrary}
            </button>

            <button className="text-sm text-slate-500 hover:text-[#102d68]">
              {text.privacy}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="hidden items-center rounded-full border border-slate-200 bg-white p-1 sm:flex">
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

            <button className="hidden rounded-full bg-[#102d68] px-4 py-2 text-xs font-semibold text-white sm:block">
              {text.voice}
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm lg:hidden">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Profile strip */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-[#102d68]">
              {text.activeProfile}
            </span>

            <span className="text-slate-300">•</span>

            <span>
              {data.age} {text.years}
            </span>

            <span className="text-slate-300">•</span>

            <span>{translateProfileValue(data.maritalStatus)}</span>

            <span className="text-slate-300">•</span>

            <span>{data.location}</span>

            <span className="text-slate-300">•</span>

            <span>
              {data.children} {text.children}
            </span>
          </div>

          <button
            onClick={onBack}
            className="self-start rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-blue-300 sm:self-auto"
          >
            {text.editProfile}
          </button>
        </div>

        {/* Page heading */}
        <div className="mb-7">
          <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#102d68]">
            {text.discovery}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#102d68] sm:text-4xl">
            {text.potentialMatches}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {text.basedOn}
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            number={schemes.length}
            label={text.potentialMatch}
            description={text.basedOnProfile}
            icon="✓"
            type="green"
          />

          <SummaryCard
            number={totalIdentified}
            label={text.documentsReady}
            description={text.currentReadiness}
            icon="▣"
            type="blue"
          />

          <SummaryCard
            number={totalMissing}
            label={text.documentsNeeded}
            description={text.mayBeRequired}
            icon="!"
            type="amber"
          />
        </section>

        {/* RESPONSIVE CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
          {/* LEFT: SCHEMES */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#102d68]">
                  {text.matches}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {text.reviewMatches}
                </p>
              </div>

              <span className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#102d68] sm:block">
                {schemes.length} {text.discovered}
              </span>
            </div>

            <div className="space-y-4">
              {schemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  onViewDetails={() => onViewDetails(scheme)}
                  onReadAloud={speakText}
                  text={text}
                  isHindi={isHindi}
                />
              ))}
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4">
            <DocumentReadiness
              totalIdentified={totalIdentified}
              totalMissing={totalMissing}
              documentsReady={documentsReady}
              documentsMissing={documentsMissing}
              onDocuments={() => onDocuments()}
              text={text}
            />

            {/* Next steps */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  →
                </div>

                <div>
                  <h3 className="font-bold text-[#102d68]">{text.whatsNext}</h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {text.nextDescription}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <NextStep number="1" text={text.reviewPotential} />

                <NextStep number="2" text={text.checkMissing} />

                <NextStep number="3" text={text.openOfficial} />

                <NextStep number="4" text={text.prepareSummary} />
              </div>

              <button
                onClick={onDocuments}
                className="mt-5 w-full rounded-xl bg-[#102d68] px-4 py-3 text-sm font-bold text-white hover:bg-[#0b2455]"
              >
                {text.checkDocuments}
              </button>
            </div>

            {/* Voice */}
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  🔊
                </div>

                <div>
                  <h3 className="font-bold text-[#102d68]">{text.listen}</h3>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {text.listenDescription}
                  </p>
                </div>
              </div>

              <button
                onClick={() => readAllResults()}
                className="mt-4 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-[#102d68] hover:bg-blue-100"
              >
                {isSpeaking ? "⏹ Stop" : text.readResults}
              </button>
            </div>
          </aside>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
          <strong className="text-slate-700">{text.important}</strong>{" "}
          {text.disclaimer}
        </div>
      </main>

      {/* MOBILE ACTION BAR */}
      <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-2xl gap-2">
          <button
            onClick={() => readAllResults()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-[#102d68]"
          >
            {isSpeaking ? "⏹ Stop" : text.readAloud}
          </button>

          <button
            onClick={onDocuments}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#102d68] px-3 py-3 text-xs font-bold text-white"
          >
            📄 {text.documents}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* SUMMARY CARD */
/* -------------------------------- */

function SummaryCard({ number, label, description, icon, type }) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blue: "bg-blue-50 text-[#102d68] border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <div className={`rounded-2xl border p-5 ${styles[type]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-bold">{number}</p>

          <p className="mt-1 font-bold">{label}</p>

          <p className="mt-1 text-xs opacity-70">{description}</p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 font-bold">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* SCHEME CARD */
/* -------------------------------- */

function SchemeCard({ scheme, onViewDetails, onReadAloud, text, isHindi }) {
  const strong = scheme.statusType === "strong";

  const status = strong ? text.strongMatch : text.potential;

  const category = isHindi
    ? scheme.category === "Social Welfare"
      ? "सामाजिक कल्याण"
      : scheme.category === "Education"
        ? "शिक्षा"
        : scheme.category === "Food and Household Support"
          ? "खाद्य और घरेलू सहायता"
          : scheme.category === "Government Benefit"
            ? "सरकारी लाभ"
            : scheme.category
    : scheme.category;

  const matchedConditions = isHindi
    ? scheme.matchedConditions.map((condition) => {
        if (condition === "Widowed") return "विधवा/विधुर";
        if (condition === "Kerala resident") return "केरल निवासी";
        if (condition === "Reported income information")
          return "आय संबंधी जानकारी";
        if (condition === "Children studying") return "बच्चे पढ़ाई कर रहे हैं";
        if (condition === "Family information provided")
          return "परिवार की जानकारी दी गई";
        if (condition === "Household information provided")
          return "घरेलू जानकारी दी गई";

        return condition;
      })
    : scheme.matchedConditions;

  const documentsReady = isHindi
    ? scheme.documentsReady.map((document) => {
        if (document === "Aadhaar Card") return "आधार कार्ड";
        if (document === "Bank Account") return "बैंक खाता";
        return document;
      })
    : scheme.documentsReady;

  const documentsMissing = isHindi
    ? scheme.documentsMissing.map((document) => {
        if (document === "Income Certificate") return "आय प्रमाण पत्र";
        if (document === "Widow/Widower Certificate")
          return "विधवा/विधुर प्रमाण पत्र";
        if (document === "School Certificate") return "स्कूल प्रमाण पत्र";

        return document;
      })
    : scheme.documentsMissing;

  const schemeName = scheme.name;

  const reason = isHindi
    ? `यह एक संभावित मिलान है। ${scheme.reason || "आपकी दी गई जानकारी के आधार पर यह योजना प्रासंगिक हो सकती है।"}`
    : scheme.reason;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6">
      {/* Top row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#102d68]">
              {category}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                strong
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-blue-50 text-[#102d68]"
              }`}
            >
              {status}
            </span>
          </div>

          <h3 className="text-lg font-bold leading-6 text-[#102d68] sm:text-xl">
            {schemeName}
          </h3>
        </div>

        <span className="text-xs font-medium text-slate-400">
          {text.informationalResult}
        </span>
      </div>

      {/* Why */}
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {text.whyMatch}
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600">{reason}</p>
      </div>

      {/* Matched conditions */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
          {text.matchedInfo}
        </p>

        <div className="flex flex-wrap gap-2">
          {matchedConditions.map((condition) => (
            <span
              key={condition}
              className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
            >
              ✓ {condition}
            </span>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {text.documents}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {documentsReady.map((document) => (
              <span
                key={document}
                className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-[#102d68]"
              >
                • {document}
              </span>
            ))}

            {documentsMissing.map((document) => (
              <span
                key={document}
                className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-700"
              >
                ⚠ {document}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={onViewDetails}
          className="flex-1 rounded-xl bg-[#102d68] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0b2455]"
        >
          {text.viewDetails}
        </button>

        <button
          onClick={() => {
            const speechText = isHindi
              ? `${scheme.name}। यह एक ${
                  scheme.statusType === "strong"
                    ? "मजबूत संभावित मिलान"
                    : "संभावित मिलान"
                } है। कारण: ${
                  scheme.reason ||
                  "आपकी दी गई जानकारी के आधार पर यह योजना प्रासंगिक हो सकती है।"
                } ${
                  scheme.documents.length > 0
                    ? `योजना की आवश्यकताओं में पहचाने गए दस्तावेज़: ${scheme.documents.join(", ")}।`
                    : ""
                }`
              : `${scheme.name}. This is a ${
                  scheme.statusType === "strong"
                    ? "strong potential match"
                    : "potential match"
                }. Reason: ${
                  scheme.reason ||
                  "Potential match based on the available information."
                } ${
                  scheme.documents.length > 0
                    ? `Documents identified from the scheme requirements: ${scheme.documents.join(", ")}.`
                    : ""
                }`;

            onReadAloud(speechText);
          }}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#102d68] transition hover:bg-slate-50"
        >
          🎙️ {isHindi ? "सुनें" : "Read Aloud"}
        </button>
      </div>
    </article>
  );
}

/* -------------------------------- */
/* DOCUMENT READINESS */
/* -------------------------------- */

function DocumentReadiness({
  totalIdentified,
  totalMissing,
  documentsReady,
  documentsMissing,
  onDocuments,
  text,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {text.yourDocuments}
          </p>

          <h3 className="mt-1 text-xl font-bold text-[#102d68]">
            {text.documentReadiness}
          </h3>
        </div>

        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#102d68]">
          {totalIdentified} identified
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-[#102d68]">
            {totalIdentified}
          </span>

          <span className="text-xs text-slate-500">{text.ready}</span>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          {text.currentReadiness}
        </div>
      </div>

      {totalMissing > 0 && (
        <div className="mt-4 rounded-xl bg-amber-50 px-3 py-3 text-xs text-amber-700">
          {totalMissing} {text.documentsNeeded.toLowerCase()}
        </div>
      )}

      <div className="mt-6 space-y-2">
        {documentsReady.map((document) => (
          <DocumentStatus
            key={`identified-${document}`}
            name={document}
            status="identified"
            text={text}
          />
        ))}

        {documentsMissing.map((document) => (
          <DocumentStatus
            key={`missing-${document}`}
            name={document}
            status="missing"
            text={text}
          />
        ))}
      </div>

      <button
        onClick={onDocuments}
        className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-[#102d68] hover:bg-blue-100"
      >
        {text.viewChecklist}
      </button>
    </div>
  );
}

/* -------------------------------- */
/* DOCUMENT STATUS */
/* -------------------------------- */

function DocumentStatus({ name, status, text }) {
  const identified = status === "identified";

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
            identified
              ? "bg-blue-100 text-[#102d68]"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {identified ? "•" : "!"}
        </div>

        <span className="text-sm font-medium text-slate-700">{name}</span>
      </div>

      <span
        className={`text-xs font-semibold ${
          identified ? "text-[#102d68]" : "text-amber-700"
        }`}
      >
        {identified ? text.documentsReady : text.neededStatus}
      </span>
    </div>
  );
}

/* -------------------------------- */
/* NEXT STEP */
/* -------------------------------- */

function NextStep({ number, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#102d68]">
        {number}
      </div>

      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}

export default Results;
