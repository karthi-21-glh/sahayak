import { jsPDF } from "jspdf";

function Documents({
  onBack,
  scheme,
  matches = [],
  profile,
  language,
  setLanguage,
}) {
  const isHindi = language === "hi";
  const storedMatches = (() => {
    try {
      const saved = localStorage.getItem("sahayak-matches");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })();
  const availableMatches = matches.length > 0 ? matches : storedMatches;

  const text = {
    en: {
      documentReadiness: "Document Readiness",
      getReady: "Get ready",
      title: "Document Readiness",
      intro:
        "Here's a simple checklist of documents that may be relevant to the potential benefits Sahayak found for you.",
      ready: "ready",
      needed: "needed",
      basedAssessment: "Based on the current assessment",
      documentsReady: "documents ready",
      results: "Results",
      documents: "Documents",
      youHave: "You have",
      available: "Documents currently available",
      youMayNeed: "You may need",
      checkObtain: "Documents to check or obtain",
      whatDo: "What should I do about a missing document?",
      missingIntro:
        "The exact process depends on the document and the authority that issues it. Sahayak can help you understand what a document is generally used for and point you toward the relevant official source.",
      checkAlready: "Check whether you already have it",
      checkAlreadyText:
        "Search your existing documents before applying for a new copy.",
      issuingAuthority: "Find the issuing authority",
      issuingAuthorityText:
        "Use the official government source to confirm where and how the document can be obtained.",
      currentRequirements: "Check current requirements",
      currentRequirementsText:
        "Requirements and procedures can change, so verify the latest information before applying.",
      digitalCopy: "Keep a digital copy",
      digitalCopyText:
        "Where appropriate, keep a secure copy so it is easier to use during future applications.",
      nextStep: "Next step",
      applicationSummary: "Prepare your application summary",
      summaryText:
        "Generate a simple summary containing your profile, potential benefit matches and document checklist. You can use it as a reference when speaking with the relevant authority.",
      generateSummary: "📄 Generate Summary",
      important: "Important:",
      disclaimer:
        "The documents shown are illustrative for this prototype. Actual requirements vary by scheme and authority. Always verify the latest requirements using the relevant official government source.",
      readyStatus: "Ready",
      mayBeNeeded: "May be needed",
      alreadyAvailable: "Already available",
      mayNeedObtain: "You may need to obtain this",
      howToGet: "How to get this →",
      mobileResults: "← Results",
      mobileSummary: "📄 Summary",

      aadhaar: "Aadhaar Card",
      bank: "Bank Account",
      income: "Income Certificate",
      widow: "Widow/Widower Certificate",
      school: "School Certificate",
    },

    hi: {
      documentReadiness: "दस्तावेज़ स्थिति",
      getReady: "तैयार हो जाएँ",
      title: "दस्तावेज़ स्थिति",
      intro:
        "यह उन दस्तावेज़ों की सरल चेकलिस्ट है जो Sahayak द्वारा पाए गए संभावित लाभों के लिए प्रासंगिक हो सकते हैं।",
      ready: "तैयार",
      needed: "आवश्यक",
      basedAssessment: "वर्तमान मूल्यांकन के आधार पर",
      documentsReady: "दस्तावेज़ तैयार",
      results: "परिणाम",
      documents: "दस्तावेज़",
      youHave: "आपके पास हैं",
      available: "वर्तमान में उपलब्ध दस्तावेज़",
      youMayNeed: "आपको आवश्यकता हो सकती है",
      checkObtain: "जाँचने या प्राप्त करने वाले दस्तावेज़",
      whatDo: "यदि कोई दस्तावेज़ नहीं है तो क्या करें?",
      missingIntro:
        "सटीक प्रक्रिया दस्तावेज़ और उसे जारी करने वाले प्राधिकरण पर निर्भर करती है। Sahayak आपको दस्तावेज़ के सामान्य उपयोग को समझने और संबंधित आधिकारिक स्रोत तक पहुँचने में मदद कर सकता है।",
      checkAlready: "पहले जाँचें कि दस्तावेज़ आपके पास है या नहीं",
      checkAlreadyText:
        "नया दस्तावेज़ बनवाने से पहले अपने मौजूदा दस्तावेज़ों को जाँचें।",
      issuingAuthority: "जारी करने वाले प्राधिकरण को खोजें",
      issuingAuthorityText:
        "दस्तावेज़ कहाँ और कैसे प्राप्त किया जा सकता है, इसकी पुष्टि आधिकारिक सरकारी स्रोत से करें।",
      currentRequirements: "वर्तमान आवश्यकताओं की जाँच करें",
      currentRequirementsText:
        "आवश्यकताएँ और प्रक्रियाएँ बदल सकती हैं, इसलिए आवेदन से पहले नवीनतम जानकारी की पुष्टि करें।",
      digitalCopy: "डिजिटल कॉपी रखें",
      digitalCopyText:
        "जहाँ उचित हो, एक सुरक्षित डिजिटल कॉपी रखें ताकि भविष्य के आवेदनों में इसका उपयोग आसानी से किया जा सके।",
      nextStep: "अगला चरण",
      applicationSummary: "अपना आवेदन सारांश तैयार करें",
      summaryText:
        "अपनी प्रोफ़ाइल, संभावित लाभ मिलान और दस्तावेज़ चेकलिस्ट वाला एक सरल सारांश तैयार करें। संबंधित प्राधिकरण से बात करते समय आप इसका संदर्भ के रूप में उपयोग कर सकते हैं।",
      generateSummary: "📄 सारांश बनाएँ",
      important: "महत्वपूर्ण:",
      disclaimer:
        "दिखाए गए दस्तावेज़ इस प्रोटोटाइप के लिए उदाहरण हैं। वास्तविक आवश्यकताएँ योजना और प्राधिकरण के अनुसार अलग हो सकती हैं। नवीनतम आवश्यकताओं की पुष्टि संबंधित आधिकारिक सरकारी स्रोत से करें।",
      readyStatus: "तैयार",
      mayBeNeeded: "आवश्यक हो सकता है",
      alreadyAvailable: "पहले से उपलब्ध",
      mayNeedObtain: "आपको इसे प्राप्त करने की आवश्यकता हो सकती है",
      howToGet: "इसे कैसे प्राप्त करें →",
      mobileResults: "← परिणाम",
      mobileSummary: "📄 सारांश",

      aadhaar: "आधार कार्ड",
      bank: "बैंक खाता",
      income: "आय प्रमाण पत्र",
      widow: "विधवा/विधुर प्रमाण पत्र",
      school: "स्कूल प्रमाण पत्र",
    },
  }[language] || {
    documentReadiness: "Document Readiness",
  };

  const aggregateMissingDocuments = [
    ...new Set(
      availableMatches.flatMap(
        (match) =>
          match.missing_documents ||
          match.documentsMissing ||
          match.documents ||
          [],
      ),
    ),
  ];

  const activeScheme = scheme || {
    name: "",
    documentsReady: [],
    documentsMissing: aggregateMissingDocuments,
  };

  const readyNames = activeScheme.documentsReady || [];
  const missingNames =
    activeScheme.documentsMissing?.length > 0
      ? activeScheme.documentsMissing
      : activeScheme.documents || [];

  const translateDocument = (name) => {
    if (!isHindi) return name;

    const map = {
      "Aadhaar Card": text.aadhaar,
      "Bank Account": text.bank,
      "Income Certificate": text.income,
      "Widow/Widower Certificate": text.widow,
      "School Certificate": text.school,
    };

    return map[name] || name;
  };

  const createDocument = (name, status) => {
    const ready = status === "ready";

    const descriptions = {
      "Aadhaar Card":
        "A government-issued identity document that may be required for verification.",

      "Bank Account":
        "An active bank account may be needed for receiving approved benefits.",

      "Income Certificate":
        "This document can be used to verify household or individual income where required.",

      "Widow/Widower Certificate":
        "This may be required to verify marital status for relevant schemes.",

      "School Certificate":
        "This may be used to verify school enrollment or education-related information.",
    };

    const hindiDescriptions = {
      "Aadhaar Card":
        "यह सरकारी पहचान दस्तावेज़ है जिसकी आवश्यकता सत्यापन के लिए हो सकती है।",

      "Bank Account":
        "स्वीकृत लाभ प्राप्त करने के लिए सक्रिय बैंक खाते की आवश्यकता हो सकती है।",

      "Income Certificate":
        "जहाँ आवश्यक हो, यह दस्तावेज़ व्यक्ति या परिवार की आय की पुष्टि करने के लिए उपयोग किया जा सकता है।",

      "Widow/Widower Certificate":
        "संबंधित योजनाओं के लिए वैवाहिक स्थिति की पुष्टि करने हेतु इसकी आवश्यकता हो सकती है।",

      "School Certificate":
        "शैक्षणिक नामांकन या शिक्षा से संबंधित जानकारी की पुष्टि के लिए इसका उपयोग किया जा सकता है।",
    };

    return {
      id: `${status}-${name}`,
      name,
      status,
      description: isHindi
        ? hindiDescriptions[name] || "इस दस्तावेज़ की आवश्यकता हो सकती है।"
        : descriptions[name] || "This document may be required.",
      action: ready ? text.alreadyAvailable : text.mayNeedObtain,
    };
  };

  const documents = [
    ...readyNames.map((name) => createDocument(name, "ready")),
    ...missingNames.map((name) => createDocument(name, "missing")),
  ];

  const readyDocuments = documents.filter(
    (document) => document.status === "ready",
  );

  const missingDocuments = documents.filter(
    (document) => document.status === "missing",
  );

  const totalDocuments = documents.length;

  const readiness =
    totalDocuments > 0
      ? Math.round((readyDocuments.length / totalDocuments) * 100)
      : 0;

  const generateSummary = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let y = 20;

    const addText = (text, size = 11, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(40, 40, 40);

      const lines = doc.splitTextToSize(String(text), contentWidth);

      if (y + lines.length * 7 > 275) {
        doc.addPage();
        y = 20;
      }

      doc.text(lines, margin, y);
      y += lines.length * 7 + 3;
    };

    const addSection = (title) => {
      y += 5;
      addText(title, 14, true);
    };

    const formatMonthlyIncome = (value) => {
      if (value === null || value === undefined || value === "") {
        return isHindi ? "निर्दिष्ट नहीं" : "Not specified";
      }

      return String(value)
        .replace("₹", "")
        .trim()
        .replace(/^INR\s*/i, "");
    };

    const addDocumentStatus = (status, document) => {
      const markerWidth = 7;
      const documentLines = doc.splitTextToSize(
        String(document),
        contentWidth - markerWidth,
      );

      if (y + documentLines.length * 7 > 275) {
        doc.addPage();
        y = 20;
      }

      const markerX = margin + 2;
      const markerY = y - 2;

      if (status === "ready") {
        doc.setDrawColor(0, 153, 102);
        doc.setLineWidth(0.7);
        doc.line(markerX - 1, markerY, markerX, markerY + 1.5);
        doc.line(markerX, markerY + 1.5, markerX + 2.8, markerY - 2.5);
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(230, 140, 0);
        doc.text("!", markerX, y);
      }

      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text(documentLines[0], margin + markerWidth, y);

      if (documentLines.length > 1) {
        doc.text(documentLines.slice(1), margin, y + 7);
      }

      y += documentLines.length * 7 + 3;
    };

    // Title
    addText("SAHAYAK", 22, true);
    addText(
      isHindi ? "नागरिक लाभ खोज सारांश" : "Civic Benefits Discovery Summary",
      11,
    );

    y += 5;

    // Profile
    addSection(isHindi ? "आपकी जानकारी" : "Your Information");

    if (profile) {
      addText(
        `${isHindi ? "उम्र" : "Age"}: ${
          profile.age ?? (isHindi ? "निर्दिष्ट नहीं" : "Not specified")
        }`,
      );

      addText(
        `${isHindi ? "स्थान" : "Location"}: ${
          profile.location || (isHindi ? "निर्दिष्ट नहीं" : "Not specified")
        }`,
      );

      addText(
        `${isHindi ? "वैवाहिक स्थिति" : "Marital Status"}: ${
          profile.maritalStatus ||
          (isHindi ? "निर्दिष्ट नहीं" : "Not specified")
        }`,
      );

      addText(
        `${isHindi ? "मासिक आय (INR प्रति माह)" : "Monthly Income (INR per month)"}: ${formatMonthlyIncome(profile.monthlyIncome)}`,
      );

      addText(
        `${isHindi ? "बच्चे" : "Children"}: ${
          profile.children ?? (isHindi ? "निर्दिष्ट नहीं" : "Not specified")
        }`,
      );

      addText(
        `${isHindi ? "बच्चे पढ़ रहे हैं" : "Children Studying"}: ${
          profile.childrenStudying ||
          (isHindi ? "निर्दिष्ट नहीं" : "Not specified")
        }`,
      );

      addText(
        `${isHindi ? "सरकारी पेंशन" : "Government Pension"}: ${
          profile.receivesPension ||
          (isHindi ? "निर्दिष्ट नहीं" : "Not specified")
        }`,
      );

      addText(
        `${isHindi ? "आय प्रमाण पत्र" : "Income Certificate"}: ${
          profile.hasIncomeCertificate ||
          (isHindi ? "निर्दिष्ट नहीं" : "Not specified")
        }`,
      );
    }

    // Scheme
    if (scheme) {
      addSection(isHindi ? "संभावित लाभ मिलान" : "Potential Benefit Match");

      const missingInformationLabels = {
        is_student: "student status",
        has_disability: "disability status",
        disability_percentage: "disability percentage",
        monthly_income: "monthly income",
        marital_status: "marital status",
        children_count: "number of children",
        children_are_students: "whether children are studying",
        landholding_farmer: "landholding farmer status",
        poor_household: "household economic status",
        has_pucca_house: "housing status",
      };
      const fallbackReason = scheme.missingInformation?.length
        ? `More information is needed about ${scheme.missingInformation
            .map(
              (field) => missingInformationLabels[field] || field,
            )
            .join(", ")}.`
        : "Potential match based on the information provided.";

      addText(
        scheme.name || (isHindi ? "संभावित योजना" : "Potential Scheme"),
        13,
        true,
      );

      addText(`${isHindi ? "श्रेणी" : "Category"}: ${scheme.category || "—"}`);

      addText(
        `${isHindi ? "स्थिति" : "Status"}: ${
          scheme.status || "Potential match"
        }`,
      );

      if (scheme.matchScore !== undefined) {
        addText(
          `${isHindi ? "मिलान स्कोर" : "Match Score"}: ${
            scheme.matchScore
          }/100`,
        );
      }

      addText(
        `${isHindi ? "क्यों मेल खा सकती है" : "Why it may match"}: ${
          scheme.reason || fallbackReason
        }`,
      );

      if (scheme.matchedConditions?.length) {
        addText(
          `${isHindi ? "मेल खाने वाली जानकारी" : "Matched Information"}:`,
        );

        scheme.matchedConditions.forEach((condition) => {
          addText(`• ${condition}`);
        });
      }

      if (scheme.missingInformation?.length) {
        addText(
          `${isHindi ? "अधिक जानकारी आवश्यक" : "Information Needed"}:`,
        );

        scheme.missingInformation.forEach((field) => {
          addText(`• ${field.replaceAll("_", " ")}`);
        });
      }

      if (scheme.benefit) {
        addText(
          `${isHindi ? "लाभ" : "Benefit"}: ${scheme.benefit}`,
        );
      }

      if (scheme.howToApply) {
        addText(
          `${isHindi ? "आवेदन कैसे करें" : "How to Apply"}: ${
            scheme.howToApply
          }`,
        );
      }

      if (scheme.officialUrl) {
        addText(
          `${isHindi ? "आधिकारिक स्रोत" : "Official Source"}: ${
            scheme.officialUrl
          }`,
        );
      }
    }

    if (!scheme && matches.length) {
      addSection(isHindi ? "संभावित लाभ मिलान" : "Potential Benefit Matches");

      matches.forEach((match, index) => {
        addText(
          `${index + 1}. ${match.name || (isHindi ? "संभावित योजना" : "Potential Scheme")}`,
          12,
          true,
        );
        addText(
          `${isHindi ? "श्रेणी" : "Category"}: ${
            match.category || (isHindi ? "सरकारी लाभ" : "Government Benefit")
          }`,
        );
        addText(
          `${isHindi ? "स्थिति" : "Status"}: ${
            match.match_level || "Potential match"
          }`,
        );
        addText(
          `${isHindi ? "मिलान स्कोर" : "Match Score"}: ${
            match.match_score ?? "—"
          }/100`,
        );
      });
    }

    // Documents
    addSection(isHindi ? "दस्तावेज़ स्थिति" : "Document Readiness");

    addText(
      `${isHindi ? "तैयार दस्तावेज़" : "Documents Ready"}: ${
        readyNames.length
      }`,
    );

    readyNames.forEach((document) => {
      addDocumentStatus("ready", document);
    });

    addText(
      `${isHindi ? "आवश्यक हो सकते हैं" : "Documents That May Be Needed"}: ${
        missingNames.length
      }`,
    );

    missingNames.forEach((document) => {
      addDocumentStatus("missing", document);
    });

    // Disclaimer
    addSection(isHindi ? "महत्वपूर्ण" : "Important");

    addText(
      isHindi
        ? "संभावित मिलान पात्रता या स्वीकृति की गारंटी नहीं देता। अंतिम निर्णय संबंधित सरकारी प्राधिकरण द्वारा लिया जाता है।"
        : "A potential match does not guarantee eligibility or approval. Final decisions are made by the relevant government authority.",
    );

    doc.save("sahayak-application-summary-1.pdf");
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

              <p className="text-xs text-slate-500">Civic Benefits Discovery</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">
              {text.documentReadiness}
            </span>

            {/* Language switcher */}
            <div className="flex items-center rounded-full border border-slate-200 bg-white p-1">
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  language === "en"
                    ? "bg-[#102d68] text-white"
                    : "text-slate-600"
                }`}
              >
                English
              </button>

              <button
                onClick={() => setLanguage("hi")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  language === "hi"
                    ? "bg-[#102d68] text-white"
                    : "text-slate-600"
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs text-slate-500">
          <button onClick={onBack} className="hover:text-[#102d68]">
            {text.results}
          </button>

          <span className="mx-2">/</span>

          <span>{text.documents}</span>
        </div>

        {/* INTRO */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#102d68]">
                {text.getReady}
              </span>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#102d68] sm:text-4xl">
                {text.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                {text.intro}
              </p>
            </div>

            {/* Readiness score */}
            <div className="rounded-3xl bg-blue-50 p-6 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-white shadow-sm">
                <div>
                  <p className="text-3xl font-bold text-[#102d68]">
                    {readiness}%
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    {text.ready}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-bold text-[#102d68]">
                {readyDocuments.length} of {totalDocuments}{" "}
                {text.documentsReady}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {text.basedAssessment}
              </p>
            </div>
          </div>
        </section>

        {/* CHECKLIST */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* READY */}
          <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
                  ✓
                </div>

                <div>
                  <h2 className="font-bold text-[#102d68]">{text.youHave}</h2>

                  <p className="text-xs text-slate-500">{text.available}</p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {readyDocuments.length} {text.ready}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {readyDocuments.length > 0 ? (
                readyDocuments.map((document) => (
                  <DocumentItem
                    key={document.id}
                    document={document}
                    text={text}
                    translateDocument={translateDocument}
                  />
                ))
              ) : (
                <EmptyState
                  message={
                    isHindi
                      ? "अभी कोई दस्तावेज़ उपलब्ध नहीं है।"
                      : "No documents are currently marked as ready."
                  }
                />
              )}
            </div>
          </section>

          {/* MISSING */}
          <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 font-bold text-amber-600">
                !
              </div>

              <div>
                <h2 className="font-bold text-[#102d68]">{text.youMayNeed}</h2>

                <p className="text-xs text-slate-500">{text.checkObtain}</p>
              </div>

              <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                {missingDocuments.length} {text.needed}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {missingDocuments.length > 0 ? (
                missingDocuments.map((document) => (
                  <DocumentItem
                    key={document.id}
                    document={document}
                    text={text}
                    translateDocument={translateDocument}
                  />
                ))
              ) : (
                <EmptyState
                  message={
                    isHindi
                      ? "कोई अतिरिक्त दस्तावेज़ नहीं दिखाया गया है।"
                      : "No additional documents are currently shown."
                  }
                />
              )}
            </div>
          </section>
        </div>

        {/* MISSING DOCUMENT GUIDANCE */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl">
              💡
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#102d68]">
                {text.whatDo}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                {text.missingIntro}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <GuidanceCard
              number="01"
              title={text.checkAlready}
              description={text.checkAlreadyText}
            />

            <GuidanceCard
              number="02"
              title={text.issuingAuthority}
              description={text.issuingAuthorityText}
            />

            <GuidanceCard
              number="03"
              title={text.currentRequirements}
              description={text.currentRequirementsText}
            />

            <GuidanceCard
              number="04"
              title={text.digitalCopy}
              description={text.digitalCopyText}
            />
          </div>
        </section>

        {/* APPLICATION SUMMARY */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-[#102d68] p-6 text-white shadow-lg sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                {text.nextStep}
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                {text.applicationSummary}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                {text.summaryText}
              </p>
            </div>

            <button
              onClick={generateSummary}
              className="rounded-xl bg-white px-6 py-4 font-bold text-[#102d68] transition hover:bg-blue-50"
            >
              {text.generateSummary}
            </button>
          </div>
        </section>

        {/* DISCLAIMER */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
          <strong className="text-slate-700">{text.important}</strong>{" "}
          {text.disclaimer}
        </div>
      </main>

      {/* MOBILE ACTION BAR */}
      <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-2xl gap-2">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-[#102d68]"
          >
            {text.mobileResults}
          </button>

          <button
            onClick={generateSummary}
            className="flex-1 rounded-xl bg-[#102d68] px-3 py-3 text-sm font-bold text-white"
          >
            {text.mobileSummary}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* DOCUMENT ITEM */
/* -------------------------------- */

function DocumentItem({ document, text, translateDocument }) {
  const ready = document.status === "ready";

  return (
    <div
      className={`rounded-2xl border p-4 ${
        ready
          ? "border-emerald-100 bg-emerald-50/50"
          : "border-amber-100 bg-amber-50/50"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${
            ready
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {ready ? "✓" : "!"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-bold text-[#102d68]">
              {translateDocument(document.name)}
            </h3>

            <span
              className={`text-xs font-semibold ${
                ready ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {ready ? text.readyStatus : text.mayBeNeeded}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            {document.description}
          </p>

          <p className="mt-3 text-xs font-semibold text-slate-600">
            {document.action}
          </p>

          {!ready && (
            <button className="mt-3 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-bold text-amber-800 hover:bg-amber-50">
              {text.howToGet}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* EMPTY STATE */
/* -------------------------------- */

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

/* -------------------------------- */
/* GUIDANCE CARD */
/* -------------------------------- */

function GuidanceCard({ number, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <div className="flex gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-[#102d68] shadow-sm">
          {number}
        </div>

        <div>
          <h3 className="font-bold text-[#102d68]">{title}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Documents;
