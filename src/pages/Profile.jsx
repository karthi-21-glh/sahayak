function Profile({ profile, onContinue, onBack, language, setLanguage }) {
  const data = profile || {
    age: null,
    location: "Not available",
    maritalStatus: "Not available",
    monthlyIncome: "Not available",
    children: null,
    childrenStudying: "Not available",
    receivesPension: "Not available",
    hasIncomeCertificate: "Not available",
  };

  const isHindi = language === "hi";

  const t = {
    en: {
      civicBenefits: "Civic Benefits Discovery",
      profileSummary: "Profile Summary",
      profileSummaryShort: "Profile summary",
      understood: "Here's what we understood",
      review:
        "Review your information before Sahayak looks for potential government benefit matches.",
      yourInformation: "Your information",
      basedOn: "Based on what you told us",
      edit: "← Edit",

      age: "Age",
      years: "years",
      location: "Location",
      maritalStatus: "Marital status",
      monthlyIncome: "Monthly income",
      children: "Children",
      childrenStudying: "Children studying",
      governmentPension: "Government pension",
      incomeCertificate: "Income certificate",
      notSpecified: "Not specified",

      situation: "Your situation",
      defaultSituation:
        "You shared information about your age, family, location, income and current circumstances.",

      information: "Your information",
      privacy:
        "This prototype does not require an account. Your information is used to generate the current benefit discovery experience.",

      goBack: "← Go Back",
      findBenefits: "Find Potential Benefits →",

      disclaimer:
        "Sahayak provides informational guidance only. Final eligibility and benefit approval are determined by the relevant government authority.",
    },

    hi: {
      civicBenefits: "नागरिक लाभ खोज",
      profileSummary: "प्रोफ़ाइल सारांश",
      profileSummaryShort: "प्रोफ़ाइल सारांश",
      understood: "हमने आपकी स्थिति को इस तरह समझा",
      review: "संभावित सरकारी लाभ खोजने से पहले अपनी जानकारी की समीक्षा करें।",
      yourInformation: "आपकी जानकारी",
      basedOn: "आपके द्वारा दी गई जानकारी के आधार पर",
      edit: "← संपादित करें",

      age: "उम्र",
      years: "वर्ष",
      location: "स्थान",
      maritalStatus: "वैवाहिक स्थिति",
      monthlyIncome: "मासिक आय",
      children: "बच्चे",
      childrenStudying: "पढ़ाई कर रहे बच्चे",
      governmentPension: "सरकारी पेंशन",
      incomeCertificate: "आय प्रमाण पत्र",
      notSpecified: "उल्लेख नहीं किया गया",

      situation: "आपकी स्थिति",
      defaultSituation:
        "आपने अपनी उम्र, परिवार, स्थान, आय और वर्तमान परिस्थितियों के बारे में जानकारी साझा की है।",

      information: "आपकी जानकारी",
      privacy:
        "इस प्रोटोटाइप के लिए अकाउंट की आवश्यकता नहीं है। आपकी जानकारी का उपयोग वर्तमान लाभ खोज अनुभव तैयार करने के लिए किया जाता है।",

      goBack: "← वापस जाएं",
      findBenefits: "संभावित लाभ खोजें →",

      disclaimer:
        "सहायाक केवल सूचनात्मक मार्गदर्शन प्रदान करता है। अंतिम पात्रता और लाभ की मंज़ूरी संबंधित सरकारी प्राधिकरण द्वारा निर्धारित की जाती है।",
    },
  };

  const text = t[language] || t.en;

  const translateValue = (value) => {
    if (!isHindi) return value;

    if (value === "Yes") return "हाँ";
    if (value === "No") return "नहीं";
    if (value === "Not sure") return "पता नहीं";
    if (value === "Widowed") return "विधवा/विधुर";
    if (value === "Not specified") return text.notSpecified;

    return value;
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102d68] font-bold text-white">
              S
            </div>

            <div className="hidden text-left sm:block">
              <p className="font-bold text-[#102d68]">SAHAYAK</p>

              <p className="text-xs text-slate-500">{text.civicBenefits}</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">
              {text.profileSummary}
            </span>

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
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#102d68]">
            {text.profileSummaryShort}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#102d68] md:text-5xl">
            {text.understood}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">{text.review}</p>
        </div>

        {/* Profile Card */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {/* Card Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                👤
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#102d68]">
                  {text.yourInformation}
                </h2>

                <p className="mt-1 text-sm text-slate-500">{text.basedOn}</p>
              </div>
            </div>

            <button
              onClick={onBack}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-[#102d68]"
            >
              {text.edit}
            </button>
          </div>

          {/* Information Grid */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileItem
              label={text.age}
              value={
                data.age !== null && data.age !== undefined
                  ? `${data.age} ${text.years}`
                  : isHindi
                    ? "निर्दिष्ट नहीं"
                    : "Not specified"
              }
              icon="🎂"
            />

            <ProfileItem
              label={text.location}
              value={data.location}
              icon="📍"
            />

            <ProfileItem
              label={text.maritalStatus}
              value={translateValue(data.maritalStatus)}
              icon="👤"
            />

            <ProfileItem
              label={text.monthlyIncome}
              value={data.monthlyIncome}
              icon="₹"
            />

            <ProfileItem
              label={text.children}
              value={data.children}
              icon="👨‍👩‍👧"
            />

            <ProfileItem
              label={text.childrenStudying}
              value={translateValue(data.childrenStudying || "Not specified")}
              icon="🎓"
            />

            <ProfileItem
              label={text.governmentPension}
              value={translateValue(data.receivesPension || "Not specified")}
              icon="🏛"
            />

            <ProfileItem
              label={text.incomeCertificate}
              value={translateValue(
                data.hasIncomeCertificate || "Not specified",
              )}
              icon="📄"
            />
          </div>
        </section>

        {/* Situation */}
        <section className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6 md:p-8">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
              💬
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#102d68]">
                {text.situation}
              </p>

              <p className="mt-3 leading-7 text-slate-700">
                {data.description || text.defaultSituation}
              </p>
            </div>
          </div>
        </section>

        {/* Privacy note */}
        <div className="mt-6 flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
          <span className="text-xl">🔒</span>

          <div>
            <p className="font-semibold text-[#102d68]">{text.information}</p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              {text.privacy}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onBack}
            className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-600 transition hover:border-blue-300"
          >
            {text.goBack}
          </button>

          <button
            onClick={onContinue}
            className="rounded-xl bg-[#102d68] px-8 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-[#0b2455]"
          >
            {text.findBenefits}
          </button>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          {text.disclaimer}
        </p>
      </main>
    </div>
  );
}

function ProfileItem({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50/30">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate font-bold text-[#102d68]">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
