function SchemeDetails({ scheme, onBack, onDocuments, language, setLanguage }) {
  const isHindi = language === "hi";

  const text = {
    en: {
      backResults: "Back to Results",
      results: "Results",
      schemeDetails: "Scheme Details",
      potentialMatch: "Potential match",
      reviewIntro:
        "Review why this may match your situation, what information may be needed, and what you can do next.",
      matchStatus: "Match status",
      basedOnInfo: "Based on the information you provided.",
      whyMatch: "Why it may match",
      informationMatch: "Information that may match",
      contributed:
        "These are the parts of your profile that contributed to this potential match.",
      documents: "Documents",
      documentReadiness:
        "Your document readiness based on the information currently available.",
      youHave: "You have",
      youMayNeed: "You may need",
      completeChecklist: "View Complete Document Checklist →",
      nextSteps: "What to do next",
      checkDocuments: "Check your documents",
      checkDocumentsText:
        "Review which documents you already have and which may still be needed.",
      verifyRequirements: "Verify the official requirements",
      verifyRequirementsText:
        "Use the official government source before submitting an application.",
      prepareApplication: "Prepare your application",
      prepareApplicationText:
        "Use your Sahayak summary to organize the information you may need.",
      readyNext: "Ready for the next step?",
      prepareDocuments: "Prepare your documents",
      prepareDocumentsText:
        "Check your complete document readiness and prepare a simple application summary.",
      checkDocumentsButton: "Check Documents →",
      officialSource: "Official source",
      officialSourceText:
        "Always verify current eligibility, documents and application procedures with the relevant government authority.",
      openOfficial: "Open Official Source ↗",
      important: "Important",
      disclaimer:
        "A potential match does not guarantee eligibility or approval. Final decisions are made by the relevant government authority.",
      mobileResults: "← Results",
      mobileDocuments: "📄 Documents",

      strongMatch: "Strong potential match",
      potential: "Potential match",

      socialWelfare: "Social Welfare",
      education: "Education",
      household: "Food & Household",

      widowed: "Widowed",
      keralaResident: "Kerala resident",
      incomeInformation: "Income information provided",
      childrenStudying: "Children studying",
      familyInformation: "Family information provided",
      lowerIncome: "Lower-income household",

      aadhaar: "Aadhaar Card",
      bank: "Bank Account",
      incomeCertificate: "Income Certificate",
      widowCertificate: "Widow/Widower Certificate",
      schoolCertificate: "School Certificate",

      demoWidowReason:
        "Your profile indicates that you are widowed, which may match the configured conditions in this demo scheme dataset.",
      demoEducationReason:
        "Your profile indicates that children in your household are currently studying.",
      demoHouseholdReason:
        "Your reported monthly income falls within the configured range used by this demo scheme.",
    },

    hi: {
      backResults: "परिणामों पर वापस जाएँ",
      results: "परिणाम",
      schemeDetails: "योजना विवरण",
      potentialMatch: "संभावित मिलान",
      reviewIntro:
        "देखें कि यह आपकी स्थिति से क्यों मेल खा सकती है, कौन-सी जानकारी आवश्यक हो सकती है और आपको आगे क्या करना चाहिए।",
      matchStatus: "मिलान स्थिति",
      basedOnInfo: "आपके द्वारा दी गई जानकारी के आधार पर।",
      whyMatch: "यह क्यों मेल खा सकती है",
      informationMatch: "मेल खाने वाली जानकारी",
      contributed:
        "आपकी प्रोफ़ाइल की ये जानकारी इस संभावित मिलान में शामिल हुई।",
      documents: "दस्तावेज़",
      documentReadiness:
        "वर्तमान में उपलब्ध जानकारी के आधार पर आपके दस्तावेज़ों की स्थिति।",
      youHave: "आपके पास हैं",
      youMayNeed: "आपको आवश्यकता हो सकती है",
      completeChecklist: "पूरा दस्तावेज़ चेकलिस्ट देखें →",
      nextSteps: "आगे क्या करें",
      checkDocuments: "अपने दस्तावेज़ जाँचें",
      checkDocumentsText:
        "देखें कि आपके पास कौन-से दस्तावेज़ हैं और किनकी आवश्यकता हो सकती है।",
      verifyRequirements: "आधिकारिक आवश्यकताओं की जाँच करें",
      verifyRequirementsText:
        "आवेदन जमा करने से पहले आधिकारिक सरकारी स्रोत की जानकारी जाँचें।",
      prepareApplication: "अपना आवेदन तैयार करें",
      prepareApplicationText:
        "आवश्यक जानकारी व्यवस्थित करने के लिए Sahayak सारांश का उपयोग करें।",
      readyNext: "अगले चरण के लिए तैयार हैं?",
      prepareDocuments: "अपने दस्तावेज़ तैयार करें",
      prepareDocumentsText:
        "अपने दस्तावेज़ों की पूरी स्थिति देखें और एक सरल आवेदन सारांश तैयार करें।",
      checkDocumentsButton: "दस्तावेज़ जाँचें →",
      officialSource: "आधिकारिक स्रोत",
      officialSourceText:
        "वर्तमान पात्रता, दस्तावेज़ और आवेदन प्रक्रिया की जानकारी संबंधित सरकारी प्राधिकरण से अवश्य जाँचें।",
      openOfficial: "आधिकारिक स्रोत खोलें ↗",
      important: "महत्वपूर्ण",
      disclaimer:
        "संभावित मिलान पात्रता या स्वीकृति की गारंटी नहीं देता। अंतिम निर्णय संबंधित सरकारी प्राधिकरण द्वारा लिया जाता है।",
      mobileResults: "← परिणाम",
      mobileDocuments: "📄 दस्तावेज़",

      strongMatch: "मजबूत संभावित मिलान",
      potential: "संभावित मिलान",

      socialWelfare: "सामाजिक कल्याण",
      education: "शिक्षा",
      household: "खाद्य और घरेलू सहायता",

      widowed: "विधवा/विधुर",
      keralaResident: "केरल निवासी",
      incomeInformation: "आय की जानकारी दी गई",
      childrenStudying: "बच्चे पढ़ रहे हैं",
      familyInformation: "परिवार की जानकारी दी गई",
      lowerIncome: "कम आय वाला परिवार",

      aadhaar: "आधार कार्ड",
      bank: "बैंक खाता",
      incomeCertificate: "आय प्रमाण पत्र",
      widowCertificate: "विधवा/विधुर प्रमाण पत्र",
      schoolCertificate: "स्कूल प्रमाण पत्र",

      demoWidowReason:
        "आपकी प्रोफ़ाइल में विधवा/विधुर स्थिति दिखाई देती है, जो इस डेमो योजना डेटासेट की निर्धारित शर्तों से मेल खा सकती है।",
      demoEducationReason:
        "आपकी प्रोफ़ाइल के अनुसार आपके परिवार में बच्चे वर्तमान में पढ़ रहे हैं।",
      demoHouseholdReason:
        "आपके द्वारा बताई गई मासिक आय इस डेमो योजना में उपयोग की गई निर्धारित सीमा के अंतर्गत आती है।",
    },
  }[language] || {
    en: {
      backResults: "Back to Results",
    },
  };

  const data = scheme || {
    name: isHindi ? "योजना उपलब्ध नहीं है" : "Scheme unavailable",
    category: "",
    status: isHindi ? "जानकारी उपलब्ध नहीं है" : "Information unavailable",
    statusType: "potential",
    reason: isHindi
      ? "योजना का विवरण उपलब्ध नहीं है।"
      : "Scheme details are not available.",
    matchedConditions: [],
    documentsReady: [],
    documentsMissing: [],
    officialUrl: "",
  };

  const translateCondition = (condition) => {
    if (!isHindi) return condition;

    const translations = {
      Widowed: text.widowed,
      "Kerala resident": text.keralaResident,
      "Income information provided": text.incomeInformation,
      "Children studying": text.childrenStudying,
      "Family information provided": text.familyInformation,
      "Lower-income household": text.lowerIncome,
      "Reported income information": "आय की जानकारी दी गई",
    };

    return translations[condition] || condition;
  };

  const translateDocument = (document) => {
    if (!isHindi) return document;

    const translations = {
      "Aadhaar Card": text.aadhaar,
      "Bank Account": text.bank,
      "Income Certificate": text.incomeCertificate,
      "Widow/Widower Certificate": text.widowCertificate,
      "School Certificate": text.schoolCertificate,
    };

    return translations[document] || document;
  };

  const translateCategory = (category) => {
    if (!isHindi) return category;

    const categories = {
      "Social Welfare": text.socialWelfare,
      Education: text.education,
      "Food & Household": text.household,
    };

    return categories[category] || category;
  };

  const translateStatus = (status) => {
    if (!isHindi) return status;

    if (status === "Strong potential match") {
      return text.strongMatch;
    }

    if (status === "Potential match") {
      return text.potential;
    }

    return status;
  };

  const openOfficialSource = () => {
    if (data.officialUrl) {
      window.open(data.officialUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button onClick={onBack} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102d68] font-bold text-white">
              S
            </div>

            <div className="hidden text-left sm:block">
              <p className="font-bold text-[#102d68]">SAHAYAK</p>

              <p className="text-xs text-slate-500">Civic Benefits Discovery</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden items-center rounded-full border border-slate-200 bg-white p-1 sm:flex">
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  language === "en"
                    ? "bg-[#102d68] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                English
              </button>

              <button
                onClick={() => setLanguage("hi")}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  language === "hi"
                    ? "bg-[#102d68] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                हिंदी
              </button>
            </div>

            <button
              onClick={onBack}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-blue-300"
            >
              ← {text.backResults}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs text-slate-500">
          {text.results}
          <span className="mx-2">/</span>
          {text.schemeDetails}
        </div>

        {/* Hero */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#102d68]">
                  {translateCategory(data.category)}
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  ✓ {translateStatus(data.status)}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-[#102d68] sm:text-4xl lg:text-5xl">
                {isHindi
                  ? data.id === 2
                    ? "उदाहरण शिक्षा सहायता"
                    : data.id === 3
                      ? "उदाहरण घरेलू सहायता"
                      : data.name
                  : data.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                {text.reviewIntro}
              </p>
            </div>

            {/* Status box */}
            <div className="rounded-2xl bg-blue-50 p-5 lg:min-w-[230px]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#102d68]">
                {text.matchStatus}
              </p>

              <p className="mt-2 text-xl font-bold text-[#102d68]">
                {text.potentialMatch}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                {text.basedOnInfo}
              </p>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Why it may match */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading number="01" title={text.whyMatch} />

              <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                <p className="text-sm leading-7 text-slate-600">
                  {isHindi && data.id === 2
                    ? text.demoEducationReason
                    : isHindi && data.id === 3
                      ? text.demoHouseholdReason
                      : isHindi && data.id === 1
                        ? text.demoWidowReason
                        : data.reason}
                </p>
              </div>
            </section>

            {/* Matched conditions */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading number="02" title={text.informationMatch} />

              <p className="mt-2 text-sm text-slate-500">{text.contributed}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {data.matchedConditions.map((condition) => (
                  <div
                    key={condition}
                    className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white font-bold text-emerald-600">
                      ✓
                    </span>

                    <span className="text-sm font-semibold text-emerald-800">
                      {translateCondition(condition)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading number="03" title={text.documents} />

              <p className="mt-2 text-sm text-slate-500">
                {text.documentReadiness}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <DocumentGroup
                  title={text.youHave}
                  items={data.documentsReady}
                  type="ready"
                  translateDocument={translateDocument}
                />

                <DocumentGroup
                  title={text.youMayNeed}
                  items={data.documentsMissing}
                  type="missing"
                  translateDocument={translateDocument}
                />
              </div>

              <button
                onClick={onDocuments}
                className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-[#102d68] hover:bg-blue-100"
              >
                {text.completeChecklist}
              </button>
            </section>

            {/* Next steps */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <SectionHeading number="04" title={text.nextSteps} />

              <div className="mt-5 space-y-3">
                <ActionStep
                  number="1"
                  title={text.checkDocuments}
                  text={text.checkDocumentsText}
                />

                <ActionStep
                  number="2"
                  title={text.verifyRequirements}
                  text={text.verifyRequirementsText}
                />

                <ActionStep
                  number="3"
                  title={text.prepareApplication}
                  text={text.prepareApplicationText}
                />
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="space-y-5">
            {/* Action card */}
            <div className="rounded-3xl bg-[#102d68] p-6 text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                {text.readyNext}
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {text.prepareDocuments}
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                {text.prepareDocumentsText}
              </p>

              <button
                onClick={onDocuments}
                className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-bold text-[#102d68] hover:bg-blue-50"
              >
                {text.checkDocumentsButton}
              </button>
            </div>

            {/* Official source */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  ↗
                </div>

                <div>
                  <h3 className="font-bold text-[#102d68]">
                    {text.officialSource}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {text.officialSourceText}
                  </p>
                </div>
              </div>

              <button
                onClick={openOfficialSource}
                disabled={!data.officialUrl}
                className={`mt-4 w-full rounded-xl border px-4 py-3 text-sm font-semibold ${
                  data.officialUrl
                    ? "border-slate-200 text-[#102d68] hover:border-blue-300"
                    : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                }`}
              >
                {text.openOfficial}
              </button>
            </div>

            {/* Trust */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex gap-3">
                <span className="text-xl">🔒</span>

                <div>
                  <h3 className="font-bold text-[#102d68]">{text.important}</h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {text.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile bottom actions */}
      <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-2xl gap-2">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-[#102d68]"
          >
            {text.mobileResults}
          </button>

          <button
            onClick={onDocuments}
            className="flex-1 rounded-xl bg-[#102d68] px-3 py-3 text-sm font-bold text-white"
          >
            {text.mobileDocuments}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ */
/* SECTION HEADING */
/* ------------------------------ */

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-[#102d68]">
        {number}
      </div>

      <h2 className="text-xl font-bold text-[#102d68]">{title}</h2>
    </div>
  );
}

/* ------------------------------ */
/* DOCUMENT GROUP */
/* ------------------------------ */

function DocumentGroup({ title, items, type, translateDocument }) {
  const ready = type === "ready";

  return (
    <div
      className={`rounded-2xl border p-4 ${
        ready
          ? "border-emerald-100 bg-emerald-50"
          : "border-amber-100 bg-amber-50"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-wide ${
          ready ? "text-emerald-700" : "text-amber-700"
        }`}
      >
        {title}
      </p>

      <div className="mt-3 space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2.5"
            >
              <span
                className={`font-bold ${
                  ready ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {ready ? "✓" : "!"}
              </span>

              <span className="text-sm font-medium text-slate-700">
                {translateDocument(item)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">—</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ */
/* ACTION STEP */
/* ------------------------------ */

function ActionStep({ number, title, text }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#102d68] shadow-sm">
        {number}
      </div>

      <div>
        <h3 className="font-bold text-[#102d68]">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default SchemeDetails;
