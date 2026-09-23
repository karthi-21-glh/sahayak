import { useState, useRef } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function Assessment({ onComplete, onBack, language, setLanguage }) {
  const [step, setStep] = useState(1);
  const [story, setStory] = useState("");

  const [answers, setAnswers] = useState({
    childrenStudying: "",
    receivesPension: "",
    hasIncomeCertificate: "",
  });

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const isHindi = language === "hi";

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        language === "hi"
          ? "आपके ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है।"
          : "Voice input is not supported in this browser.",
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setStory((prev) =>
        prev.trim() ? `${prev.trim()} ${transcript}` : transcript,
      );
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const t = {
    en: {
      civicBenefits: "Civic Benefits Discovery",
      assessment: "Assessment",
      step: "Step",
      of: "of",
      complete: "Complete",

      tellSituation: "Tell us about your situation",
      tellDescription:
        "You don't need to know the name of a scheme. Just describe your situation in your own words.",
      yourSituation: "Your situation",
      placeholder:
        "For example: I'm a 55-year-old widow living in Kerala. I have two children studying in school and my monthly income is around ₹8,000.",
      speak: "🎙 Speak instead",
      continue: "Continue →",

      naturalTitle: "You can speak naturally",
      naturalDescription:
        "Tell us about your age, family, income, location, education, work or anything else that may help.",

      childrenQuestion: "Are your children currently studying?",
      childrenSubtitle:
        "This helps us understand whether education-related benefits may be relevant.",

      pensionQuestion: "Are you currently receiving any government pension?",
      pensionSubtitle:
        "This helps us avoid suggesting benefits that may not apply to your current situation.",

      incomeQuestion: "Do you currently have an income certificate?",
      incomeSubtitle: "This helps us prepare your document checklist.",

      yes: "Yes",
      no: "No",
      notSure: "Not sure",
      selected: "Selected",
      back: "← Back",
      completeAssessment: "Complete Assessment →",

      disclaimer:
        "Sahayak provides informational guidance only. Final eligibility is determined by the relevant government authority.",
    },

    hi: {
      civicBenefits: "नागरिक लाभ खोज",
      assessment: "मूल्यांकन",
      step: "चरण",
      of: "में से",
      complete: "पूर्ण",

      tellSituation: "अपनी स्थिति के बारे में बताएं",
      tellDescription:
        "आपको योजना का नाम जानने की आवश्यकता नहीं है। बस अपनी स्थिति अपने शब्दों में बताएं।",
      yourSituation: "आपकी स्थिति",
      placeholder:
        "उदाहरण: मैं केरल में रहने वाली 55 वर्षीय विधवा हूँ। मेरे दो बच्चे स्कूल में पढ़ रहे हैं और मेरी मासिक आय लगभग ₹8,000 है।",
      speak: "🎙 बोलकर बताएं",
      continue: "जारी रखें →",

      naturalTitle: "आप सामान्य तरीके से बता सकते हैं",
      naturalDescription:
        "अपनी उम्र, परिवार, आय, स्थान, शिक्षा, काम या ऐसी कोई भी जानकारी बताएं जो मददगार हो सकती है।",

      childrenQuestion: "क्या आपके बच्चे अभी पढ़ाई कर रहे हैं?",
      childrenSubtitle:
        "इससे हमें यह समझने में मदद मिलती है कि शिक्षा से जुड़े लाभ आपके लिए प्रासंगिक हो सकते हैं या नहीं।",

      pensionQuestion: "क्या आपको अभी कोई सरकारी पेंशन मिल रही है?",
      pensionSubtitle:
        "इससे हमें ऐसे लाभ सुझाने से बचने में मदद मिलती है जो आपकी वर्तमान स्थिति पर लागू नहीं हो सकते।",

      incomeQuestion: "क्या आपके पास अभी आय प्रमाण पत्र है?",
      incomeSubtitle:
        "इससे हमें आपके आवश्यक दस्तावेज़ों की सूची तैयार करने में मदद मिलती है।",

      yes: "हाँ",
      no: "नहीं",
      notSure: "पता नहीं",
      selected: "चयनित",
      back: "← वापस",
      completeAssessment: "मूल्यांकन पूरा करें →",

      disclaimer:
        "सहायाक केवल सूचनात्मक मार्गदर्शन प्रदान करता है। अंतिम पात्रता संबंधित सरकारी प्राधिकरण द्वारा निर्धारित की जाती है।",
    },
  };

  const text = t[language] || t.en;

  const handleContinue = async () => {
    if (step === 1 && story.trim().length < 20) {
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(4);
      return;
    }

    if (step === 4) {
      const description = story.trim();

      try {
        const response = await fetch(`${API_BASE_URL}/api/intake`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: description,
            answers,
          }),
        });

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const data = await response.json();

        console.log(
          "FIRST BACKEND MATCH:",
          JSON.stringify(data.matches?.[0], null, 2),
        );

        const backendProfile = data.profile || {};

        const monthlyIncome =
          backendProfile.monthly_income !== null &&
          backendProfile.monthly_income !== undefined
            ? `₹${new Intl.NumberFormat("en-IN").format(
                backendProfile.monthly_income,
              )}`
            : "Not specified";

        onComplete(
          {
            age: backendProfile.age ?? null,
            gender: backendProfile.gender ?? null,
            location: backendProfile.location || "Not specified",
            maritalStatus: backendProfile.marital_status || "Not specified",
            monthlyIncome,
            children: backendProfile.children_count ?? null,

            childrenStudying:
              answers.childrenStudying ||
              (backendProfile.children_are_students === true
                ? "Yes"
                : backendProfile.children_are_students === false
                  ? "No"
                  : "Not sure"),

            receivesPension: answers.receivesPension,
            hasIncomeCertificate: answers.hasIncomeCertificate,

            description,

            usedFallback: data.used_fallback ?? false,
            backendSummary: data.summary || null,
          },
          data.matches || [],
        );
      } catch (error) {
        console.error("Sahayak backend error:", error);

        alert(
          isHindi
            ? "बैकएंड से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि Sahayak backend चल रहा है।"
            : "Could not connect to the Sahayak backend. Please make sure the backend is running.",
        );
      }
    }
  };

  const progress = Math.min((step / 4) * 100, 100);

  const getStepText = () => {
    if (step <= 4) {
      return `${text.step} ${step} ${text.of} 4`;
    }

    return text.complete;
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2">
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
              {text.assessment}
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
      <main className="mx-auto max-w-4xl px-6 py-10 md:py-16">
        {/* Progress */}
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-[#102d68]">
              {text.assessment}
            </span>

            <span className="text-slate-500">{getStepText()}</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#102d68] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <section>
            <div className="mb-8">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#102d68]">
                {text.step} 1
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight text-[#102d68] md:text-5xl">
                {text.tellSituation}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                {text.tellDescription}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
              <label className="text-sm font-semibold text-slate-700">
                {text.yourSituation}
              </label>

              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={7}
                placeholder={text.placeholder}
                className="mt-3 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={startListening}
                  disabled={isListening}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:border-blue-300"
                >
                  {isListening
                    ? language === "hi"
                      ? "🎙 सुन रहा हूँ..."
                      : "🎙 Listening..."
                    : text.speak}
                </button>

                <button
                  onClick={handleContinue}
                  disabled={story.trim().length < 20}
                  className={`rounded-xl px-7 py-3 font-semibold text-white transition ${
                    story.trim().length >= 20
                      ? "bg-[#102d68] hover:bg-[#0b2455]"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  {text.continue}
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <span className="text-xl">💡</span>

                <div>
                  <p className="font-semibold text-[#102d68]">
                    {text.naturalTitle}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {text.naturalDescription}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Question
            step="2"
            question={text.childrenQuestion}
            subtitle={text.childrenSubtitle}
            value={answers.childrenStudying}
            options={[
              { value: "Yes", label: text.yes },
              { value: "No", label: text.no },
              { value: "Not sure", label: text.notSure },
            ]}
            onSelect={(value) =>
              setAnswers({
                ...answers,
                childrenStudying: value,
              })
            }
            onContinue={handleContinue}
            onBack={() => setStep(1)}
            text={text}
          />
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <Question
            step="3"
            question={text.pensionQuestion}
            subtitle={text.pensionSubtitle}
            value={answers.receivesPension}
            options={[
              { value: "Yes", label: text.yes },
              { value: "No", label: text.no },
              { value: "Not sure", label: text.notSure },
            ]}
            onSelect={(value) =>
              setAnswers({
                ...answers,
                receivesPension: value,
              })
            }
            onContinue={handleContinue}
            onBack={() => setStep(2)}
            text={text}
          />
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <Question
            step="4"
            question={text.incomeQuestion}
            subtitle={text.incomeSubtitle}
            value={answers.hasIncomeCertificate}
            options={[
              { value: "Yes", label: text.yes },
              { value: "No", label: text.no },
              { value: "Not sure", label: text.notSure },
            ]}
            onSelect={(value) =>
              setAnswers({
                ...answers,
                hasIncomeCertificate: value,
              })
            }
            onContinue={handleContinue}
            onBack={() => setStep(3)}
            finalStep
            text={text}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8 text-center text-xs text-slate-400">
        {text.disclaimer}
      </footer>
    </div>
  );
}

function Question({
  step,
  question,
  subtitle,
  value,
  options,
  onSelect,
  onContinue,
  onBack,
  finalStep = false,
  text,
}) {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-8">
        <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#102d68]">
          {text.step} {step}
        </span>

        <h1 className="mt-5 text-3xl font-bold leading-tight text-[#102d68] md:text-5xl">
          {question}
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                value === option.value
                  ? "border-[#102d68] bg-blue-50 ring-2 ring-blue-100"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    value === option.value
                      ? "border-[#102d68]"
                      : "border-slate-300"
                  }`}
                >
                  {value === option.value && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#102d68]" />
                  )}
                </div>

                <span className="font-semibold text-slate-700">
                  {option.label}
                </span>
              </div>

              {value === option.value && (
                <span className="text-sm font-bold text-[#102d68]">
                  {text.selected}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={onBack}
            className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50"
          >
            {text.back}
          </button>

          <button
            onClick={onContinue}
            disabled={!value}
            className={`rounded-xl px-7 py-3 font-semibold text-white transition ${
              value
                ? "bg-[#102d68] hover:bg-[#0b2455]"
                : "cursor-not-allowed bg-slate-300"
            }`}
          >
            {finalStep ? text.completeAssessment : text.continue}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Assessment;
