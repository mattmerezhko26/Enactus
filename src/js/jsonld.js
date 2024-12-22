function generatePageJsonLd(pageType, pageDetails = {}) {
  const baseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Enactus Seneca Polytechnic",
    "description": "As a proud member of Enactus Canada, Enactus Seneca Polytechnic operates as an experiential learning platform dedicated to creating a better world through the development of entrepreneurial leaders and social innovators. We are a vibrant community of students, professors, and industry leaders who collaborate on entrepreneurial projects that not only lead to business success but also generate social impact.",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Enactus Seneca Team",
      },
    ],
    "sameAs": [
      "https://www.linkedin.com/company/enactus-senecapolytechnic/",
      "https://twitter.com/EnactusSeneca"
    ],
    "location": {
      "@type": "Place",
      "name": "Seneca College",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1750 Finch Ave E",
        "addressLocality": "Toronto",
        "addressRegion": "Ontario",
        "postalCode": "M2J 2X5",
        "addressCountry": "CA"
      }
    },
    "industry": "Non-profit Organizations",
    "memberOf": {
      "@type": "Organization",
      "name": "Enactus Canada"
    }
  };

  switch (pageType) {
    case "home":
      return [
        JSON.stringify(baseJsonLd)
      ];
    case "projects":
      return [
        JSON.stringify({
          ...baseJsonLd,
          "name": "Enactus Seneca Polytechnic - Projects",
        })
      ];
    case "team":
      return [
        JSON.stringify({
          ...baseJsonLd,
          "name": "Enactus Seneca Polytechnic - Meet Our Team",
        })
      ];
    default:
      return [];
  }
}

function injectJsonLd(pageType, pageDetails = {}) {
  // Initial static JSON-LD injection
  const staticJsonLdScripts = generatePageJsonLd(pageType, pageDetails);
  
  // Remove any existing JSON-LD scripts for this page type
  // document.querySelectorAll('script[data-page-type="' + pageType + '"]').forEach(script => {
  //   script.remove();
  // });

  // Inject static scripts
  staticJsonLdScripts.forEach((jsonLdContent) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute('data-page-type', pageType);
    script.textContent = jsonLdContent;
    document.head.appendChild(script);
  });
}

export { injectJsonLd };
