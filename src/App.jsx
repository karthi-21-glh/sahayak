import { useState } from "react";

import Landing from "./pages/Landing";
import Assessment from "./pages/Assessment";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import SchemeDetails from "./pages/SchemeDetails";
import Documents from "./pages/Documents";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [userProfile, setUserProfile] = useState(null);
  const [backendMatches, setBackendMatches] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Global language state
  const [language, setLanguage] = useState("en");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProfileComplete = (profile, matches = []) => {
    setUserProfile(profile);
    setBackendMatches(matches);
    navigate("profile");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "assessment":
        return (
          <Assessment
            onComplete={handleProfileComplete}
            onBack={() => navigate("landing")}
            language={language}
            setLanguage={setLanguage}
          />
        );

      case "profile":
        return (
          <Profile
            profile={userProfile}
            onContinue={() => navigate("results")}
            onBack={() => navigate("assessment")}
            language={language}
            setLanguage={setLanguage}
          />
        );

      case "results":
        return (
          <Results
            profile={userProfile}
            backendMatches={backendMatches}
            onViewDetails={(scheme) => {
              setSelectedScheme(scheme);
              navigate("scheme");
            }}
            onDocuments={() => navigate("documents")}
            onBack={() => navigate("profile")}
            language={language}
            setLanguage={setLanguage}
          />
        );

      case "scheme":
        return (
          <SchemeDetails
            scheme={selectedScheme}
            onBack={() => navigate("results")}
            onDocuments={() => navigate("documents")}
            language={language}
            setLanguage={setLanguage}
          />
        );

      case "documents":
        return (
          <Documents
            scheme={selectedScheme}
            profile={userProfile}
            onBack={() => navigate("results")}
            language={language}
            setLanguage={setLanguage}
          />
        );

      default:
        return (
          <Landing
            onStart={() => navigate("assessment")}
            language={language}
            setLanguage={setLanguage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#10213f]">
      {renderPage()}
    </div>
  );
}

export default App;
