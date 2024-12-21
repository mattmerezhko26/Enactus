// jsonLd.js - Centralized JSON-LD Generation

const jsonLdConfig = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enactus Seneca",
    description:
      "Enactus Seneca empowers students at Seneca Polytechnic to use entrepreneurial action for solving social, economic, and environmental challenges. Through innovative projects, they create sustainable impact and inspire positive change.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Enactus Seneca Team",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/enactus-senecapolytechnic/",
      "https://twitter.com/EnactusSeneca",
    ],
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Enactus Seneca",
    description:
      "Enactus Seneca empowers students at Seneca Polytechnic to use entrepreneurial action for solving social, economic, and environmental challenges. Through innovative projects, they create sustainable impact and inspire positive change.",
    publisher: {
      "@type": "Organization",
      name: "Enactus Seneca",
    },
  },
};

function generatePageJsonLd(pageType, pageDetails = {}) {
  const baseJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    publisher: {
      "@type": "Organization",
      name: "Enactus Seneca",
    },
  };

  switch (pageType) {
    case "home":
      return [
        JSON.stringify(jsonLdConfig.organization),
        JSON.stringify(jsonLdConfig.website),
      ];
    case "projects":
      return [
        JSON.stringify({
          ...baseJsonLd,
          name: "Enactus Seneca - Our Projects",
          description:
            "Explore the innovative and impactful projects developed by Enactus Seneca students to address social, economic, and environmental challenges.",
          ...pageDetails,
        }),
      ];
    case "team":
      return [
        JSON.stringify({
          ...baseJsonLd,
          name: "Enactus Seneca - Meet Our Team",
          description:
            "Get to know the passionate and innovative students who drive Enactus Seneca's mission of creating positive social and economic change.",
          ...pageDetails,
        }),
      ];
    default:
      return [];
  }
}

function injectJsonLd(pageType, pageDetails = {}) {
  const jsonLdScripts = generatePageJsonLd(pageType, pageDetails);

  jsonLdScripts.forEach((jsonLdContent) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = jsonLdContent;
    document.head.appendChild(script);
  });
}

export { injectJsonLd };
