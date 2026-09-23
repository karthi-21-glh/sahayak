const express = require("express");
const cors = require("cors");

const schemes = require("./data/schemes.json");
const { matchAllSchemes } = require("./utils/matcher");
const { extractProfile } = require("./utils/gemini");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Sahayak backend is running!",
  });
});

// Match schemes
app.post("/api/match", async (req, res) => {
  try {
    const profile = req.body;

    if (!profile || typeof profile !== "object" || Array.isArray(profile)) {
      return res.status(400).json({
        error: "A profile object is required",
      });
    }

    const matches = matchAllSchemes(profile, schemes);

    res.json({
      profile: profile,
      matches: matches,
      summary: {
        total_schemes_checked: schemes.length,
        total_matches: matches.length,
      },
    });
  } catch (error) {
    console.error("Matching error:", error);

    res.status(500).json({
      error: "Failed to match schemes",
    });
  }
});

function extractProfileFallback(message) {
  const description = message.toLowerCase();

  const ageMatch = description.match(
    /(\d{1,3})\s*(?:-\s*)?(?:years?\s*old|year\s*old|year)/,
  );

  const age = ageMatch ? Number(ageMatch[1]) : null;

  const incomeMatch = description.match(
    /(?:income|earn|earning|salary)[^₹\d]{0,20}₹?\s*([\d,]+)/,
  );

  const monthly_income = incomeMatch
    ? Number(incomeMatch[1].replace(/,/g, ""))
    : null;

  const numberWords = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
  };

  let children_count = null;

  const childrenNumberMatch = description.match(/(\d+)\s+child(?:ren)?/);

  const childrenWordMatch = description.match(
    /(one|two|three|four|five)\s+child(?:ren)?/,
  );

  if (childrenNumberMatch) {
    children_count = Number(childrenNumberMatch[1]);
  } else if (childrenWordMatch) {
    children_count = numberWords[childrenWordMatch[1]];
  }

  let marital_status = null;

  if (/widow|widowed/.test(description)) {
    marital_status = "widowed";
  } else if (/married/.test(description)) {
    marital_status = "married";
  } else if (/divorced/.test(description)) {
    marital_status = "divorced";
  } else if (/single|unmarried/.test(description)) {
    marital_status = "single";
  }

  const states = [
    "Kerala",
    "Tamil Nadu",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana",
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
    "Punjab",
    "Haryana",
    "Delhi",
    "Uttar Pradesh",
    "Bihar",
    "West Bengal",
    "Odisha",
    "Assam",
  ];

  const location =
    states.find((state) => new RegExp(`\\b${state}\\b`, "i").test(message)) ||
    null;

  let gender = null;

  if (/\b(woman|female)\b/i.test(message)) {
    gender = "female";
  } else if (/\b(man|male)\b/i.test(message)) {
    gender = "male";
  }

  const children_are_students =
    /children?.{0,50}(studying|school|student)/i.test(message) ||
    /studying.{0,50}children?/i.test(message)
      ? true
      : null;

  const is_student = /\b(student|studying)\b/i.test(message);

  return {
    age,
    gender,
    marital_status,
    location,
    monthly_income,
    children_count,
    children_are_students,
    is_student,
    has_disability: null,
    disability_percentage: null,
    landholding_farmer: null,
    poor_household: null,
    existing_lpg_connection_in_household: null,
    has_pucca_house: null,
  };
}

// AI profile extraction
app.post("/api/intake", async (req, res) => {
  try {
    const { message, answers = {} } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Extract user profile using Gemini
    let profile;
    let usedFallback = false;

    try {
      profile = await extractProfile(message);
    } catch (error) {
      console.error(
        "Gemini profile extraction failed. Using local fallback extraction.",
        error instanceof Error ? error.message : error,
      );

      profile = extractProfileFallback(message);
      usedFallback = true;
    }

    if (answers.childrenStudying === "Yes") {
      profile.children_are_students = true;
    } else if (answers.childrenStudying === "No") {
      profile.children_are_students = false;
    }

    profile.receives_pension = answers.receivesPension || null;
    profile.has_income_certificate = answers.hasIncomeCertificate || null;

    // Match profile against all schemes
    const matches = matchAllSchemes(profile, schemes);

    res.json({
      profile: profile,
      matches: matches,
      used_fallback: usedFallback,
      summary: {
        total_schemes_checked: schemes.length,
        total_matches: matches.length,
      },
    });
  } catch (error) {
    console.error("AI intake error:", error);

    res.status(500).json({
      error: "Failed to process request",
    });
  }
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Sahayak backend running on http://localhost:${PORT}`);
});
