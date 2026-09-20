function matchScheme(profile, scheme) {
  const eligibility = scheme.eligibility;
  let score = 100;
  let matchedConditions = [];
  let missingInformation = [];
  let failedConditions = [];

  // Age
  if (eligibility.min_age !== null) {
    if (profile.age === null || profile.age === undefined) {
      missingInformation.push("age");
    } else if (profile.age < eligibility.min_age) {
      failedConditions.push("Age requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("Age requirement met");
    }
  }

  if (eligibility.max_age !== null) {
    if (profile.age === null || profile.age === undefined) {
      if (!missingInformation.includes("age")) {
        missingInformation.push("age");
      }
    } else if (profile.age > eligibility.max_age) {
      failedConditions.push("Age requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("Age requirement met");
    }
  }

  // Gender
  if (eligibility.gender !== null) {
    if (!profile.gender) {
      missingInformation.push("gender");
    } else if (
      profile.gender.toLowerCase() !== eligibility.gender.toLowerCase()
    ) {
      failedConditions.push("Gender requirement not met");
      score -= 15;
    } else {
      matchedConditions.push("Gender requirement met");
    }
  }

  // Monthly income
  if (eligibility.income_max_monthly !== null) {
    if (
      profile.monthly_income === null ||
      profile.monthly_income === undefined
    ) {
      missingInformation.push("monthly_income");
    } else if (profile.monthly_income > eligibility.income_max_monthly) {
      failedConditions.push("Income requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("Income requirement met");
    }
  }

  // Student status
  if (eligibility.is_student === true) {
    if (profile.is_student === undefined || profile.is_student === null) {
      missingInformation.push("is_student");
    } else if (profile.is_student !== true) {
      failedConditions.push("Student requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("Student requirement met");
    }
  }

  // Disability
  if (eligibility.has_disability === true) {
    if (
      profile.has_disability === undefined ||
      profile.has_disability === null
    ) {
      missingInformation.push("has_disability");
    } else if (profile.has_disability !== true) {
      failedConditions.push("Disability requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("Disability requirement met");
    }
  }

  // Disability percentage
  if (eligibility.disability_percentage_min != null) {
    if (
      profile.disability_percentage === null ||
      profile.disability_percentage === undefined
    ) {
      missingInformation.push("disability_percentage");
    } else if (
      profile.disability_percentage < eligibility.disability_percentage_min
    ) {
      failedConditions.push("Required disability percentage not met");
      score -= 20;
    } else {
      matchedConditions.push("Disability percentage requirement met");
    }
  }

  // Landholding farmer
  if (eligibility.landholding_farmer === true) {
    if (
      profile.landholding_farmer === undefined ||
      profile.landholding_farmer === null
    ) {
      missingInformation.push("landholding_farmer");
    } else if (profile.landholding_farmer !== true) {
      failedConditions.push("Landholding farmer requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("Landholding farmer requirement met");
    }
  }

  // Poor household
  if (eligibility.poor_household === true) {
    if (
      profile.poor_household === undefined ||
      profile.poor_household === null
    ) {
      missingInformation.push("poor_household");
    } else if (profile.poor_household !== true) {
      failedConditions.push("Household requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("Household requirement met");
    }
  }

  // Existing LPG connection
  if (eligibility.existing_lpg_connection_in_household === false) {
    if (
      profile.existing_lpg_connection_in_household === undefined ||
      profile.existing_lpg_connection_in_household === null
    ) {
      missingInformation.push("existing_lpg_connection_in_household");
    } else if (profile.existing_lpg_connection_in_household !== false) {
      failedConditions.push(
        "Household must not already have an LPG connection",
      );
      score -= 20;
    } else {
      matchedConditions.push("No existing LPG connection requirement met");
    }
  }

  // Pucca house
  if (eligibility.has_pucca_house === false) {
    if (
      profile.has_pucca_house === undefined ||
      profile.has_pucca_house === null
    ) {
      missingInformation.push("has_pucca_house");
    } else if (profile.has_pucca_house !== false) {
      failedConditions.push("No pucca house requirement not met");
      score -= 20;
    } else {
      matchedConditions.push("No pucca house requirement met");
    }
  }

  // Reduce score when important information is missing
  score -= missingInformation.length * 10;

  // Final score
  score = Math.max(0, Math.min(100, score));

  let matchLevel;

  if (failedConditions.length > 0) {
    matchLevel = "Not currently matched";
  } else if (score >= 80) {
    matchLevel = "Strong potential match";
  } else if (score >= 60) {
    matchLevel = "Potential match";
  } else if (score >= 40) {
    matchLevel = "Needs more information";
  } else {
    matchLevel = "Not currently matched";
  }

  return {
    scheme_id: scheme.id,
    name: scheme.name,
    match_level: matchLevel,
    match_score: score,
    reason: buildReason(
      scheme,
      matchedConditions,
      missingInformation,
      failedConditions,
    ),
    matched_conditions: matchedConditions,
    missing_information: missingInformation,
    documents: scheme.documents || [],
    missing_documents: [],
    benefit: scheme.benefit,
    official_url: scheme.application_url,
    failed_conditions: failedConditions,
  };
}

function buildReason(
  scheme,
  matchedConditions,
  missingInformation,
  failedConditions,
) {
  if (failedConditions.length > 0) {
    return `This scheme does not currently match the provided profile because ${failedConditions
      .join(", ")
      .toLowerCase()}.`;
  }

  if (missingInformation.length > 0) {
    return `This may be a potential match, but more information is needed about ${missingInformation.join(
      ", ",
    )}.`;
  }

  if (matchedConditions.length > 0) {
    return `Potential match based on the provided profile. ${matchedConditions.join(
      ", ",
    )}.`;
  }

  return "Potential match based on the available scheme information.";
}

function matchAllSchemes(profile, schemes) {
  return schemes
    .map((scheme) => matchScheme(profile, scheme))
    .sort((a, b) => b.match_score - a.match_score);
}

module.exports = {
  matchScheme,
  matchAllSchemes,
};
