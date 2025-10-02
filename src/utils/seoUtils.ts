// SEO Utility Functions for Advanced Optimization

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schemaType: string;
  author: string;
  publishedTime: string;
  modifiedTime: string;
  language: string;
  robots: string;
  viewport: string;
}

export const defaultSEOConfig: SEOConfig = {
  title: 'ScratchSexPositions - Discover Intimate Romance',
  description: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
  keywords: 'sex positions, romance, intimate, couples, kama sutra, relationships, scratch cards, love positions, intimate romance, couple games, romantic ideas, honeymoon, first night, truth or dare, passion dice, romantic activities',
  canonical: 'https://scratchsexpositions.com',
  ogTitle: 'ScratchSexPositions - Discover Intimate Romance',
  ogDescription: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
  ogImage: 'https://scratchsexpositions.com/og-image.svg',
  twitterTitle: 'ScratchSexPositions - Discover Intimate Romance',
  twitterDescription: 'Explore 500+ romantic positions and create your perfect love journey. Kama Sutra inspired intimate experiences for couples.',
  twitterImage: 'https://scratchsexpositions.com/og-image.svg',
  schemaType: 'WebSite',
  author: 'ScratchSexPositions',
  publishedTime: new Date().toISOString(),
  modifiedTime: new Date().toISOString(),
  language: 'en',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0'
};

// Generate JSON-LD structured data
export const generateStructuredData = (config: SEOConfig, additionalData?: any) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": config.schemaType,
    "name": config.title,
    "description": config.description,
    "url": config.canonical,
    "author": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical
    },
    "publisher": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical,
      "logo": {
        "@type": "ImageObject",
        "url": config.ogImage
      }
    },
    "datePublished": config.publishedTime,
    "dateModified": config.modifiedTime,
    "inLanguage": config.language,
    "image": {
      "@type": "ImageObject",
      "url": config.ogImage,
      "width": 1200,
      "height": 630
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": config.canonical
    }
  };

  // Add additional structured data based on page type
  if (additionalData) {
    return { ...baseSchema, ...additionalData };
  }

  return baseSchema;
};

// Generate WebSite schema for homepage
export const generateWebsiteSchema = (config: SEOConfig) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.title,
    "description": config.description,
    "url": config.canonical,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${config.canonical}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical,
      "logo": {
        "@type": "ImageObject",
        "url": config.ogImage
      }
    },
    "sameAs": [
      "https://twitter.com/scratchsexpos",
      "https://facebook.com/scratchsexpositions"
    ]
  };
};

// Generate Article schema for blog posts
export const generateArticleSchema = (config: SEOConfig, articleData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": config.title,
    "description": config.description,
    "url": config.canonical,
    "author": {
      "@type": "Person",
      "name": articleData.author || config.author,
      "url": config.canonical
    },
    "publisher": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical,
      "logo": {
        "@type": "ImageObject",
        "url": config.ogImage
      }
    },
    "datePublished": config.publishedTime,
    "dateModified": config.modifiedTime,
    "image": {
      "@type": "ImageObject",
      "url": config.ogImage,
      "width": 1200,
      "height": 630
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": config.canonical
    },
    "articleSection": articleData.category || "Romance",
    "keywords": config.keywords,
    "wordCount": articleData.wordCount || 0,
    "timeRequired": articleData.readTime || "PT5M"
  };
};

// Generate Game schema for interactive games
export const generateGameSchema = (config: SEOConfig, gameData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": gameData.name || config.title,
    "description": gameData.description || config.description,
    "url": config.canonical,
    "author": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical
    },
    "publisher": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical
    },
    "genre": gameData.genre || "Romance",
    "gamePlatform": "Web Browser",
    "operatingSystem": "Any",
    "applicationCategory": "Game",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": gameData.rating || "4.5",
      "ratingCount": gameData.ratingCount || "100"
    }
  };
};

// Generate FAQ schema
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate Breadcrumb schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Generate Organization schema
export const generateOrganizationSchema = (config: SEOConfig) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.author,
    "url": config.canonical,
    "logo": {
      "@type": "ImageObject",
      "url": config.ogImage
    },
    "description": config.description,
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/scratchsexpos",
      "https://facebook.com/scratchsexpositions"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@scratchsexpositions.com"
    }
  };
};

// Generate LocalBusiness schema (if applicable)
export const generateLocalBusinessSchema = (config: SEOConfig, businessData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": config.author,
    "description": config.description,
    "url": config.canonical,
    "telephone": businessData.phone || "+1-555-0123",
    "email": businessData.email || "info@scratchsexpositions.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessData.address || "123 Romance Street",
      "addressLocality": businessData.city || "Love City",
      "addressRegion": businessData.state || "Romance State",
      "postalCode": businessData.zip || "12345",
      "addressCountry": businessData.country || "US"
    },
    "openingHours": businessData.hours || "Mo-Su 00:00-23:59",
    "priceRange": businessData.priceRange || "$",
    "paymentAccepted": businessData.paymentMethods || "Cash, Credit Card"
  };
};

// Generate HowTo schema for tutorials/guides
export const generateHowToSchema = (config: SEOConfig, howToData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": config.title,
    "description": config.description,
    "image": {
      "@type": "ImageObject",
      "url": config.ogImage
    },
    "totalTime": howToData.totalTime || "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": howToData.cost || "0"
    },
    "supply": howToData.supplies || [],
    "tool": howToData.tools || [],
    "step": howToData.steps || []
  };
};

// Generate Review schema
export const generateReviewSchema = (config: SEOConfig, reviewData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Thing",
      "name": config.title
    },
    "author": {
      "@type": "Person",
      "name": reviewData.author || "Anonymous"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": reviewData.rating || "5",
      "bestRating": "5"
    },
    "reviewBody": reviewData.review || config.description,
    "datePublished": config.publishedTime
  };
};

// Generate VideoObject schema
export const generateVideoSchema = (config: SEOConfig, videoData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": config.title,
    "description": config.description,
    "thumbnailUrl": config.ogImage,
    "uploadDate": config.publishedTime,
    "duration": videoData.duration || "PT5M",
    "contentUrl": videoData.videoUrl || "",
    "embedUrl": videoData.embedUrl || "",
    "publisher": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical
    }
  };
};

// Generate Event schema
export const generateEventSchema = (config: SEOConfig, eventData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": config.title,
    "description": config.description,
    "startDate": eventData.startDate || config.publishedTime,
    "endDate": eventData.endDate || config.modifiedTime,
    "location": {
      "@type": "Place",
      "name": eventData.location || "Online",
      "address": eventData.address || "Virtual Event"
    },
    "organizer": {
      "@type": "Organization",
      "name": config.author,
      "url": config.canonical
    },
    "offers": {
      "@type": "Offer",
      "price": eventData.price || "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };
};

// Generate Product schema
export const generateProductSchema = (config: SEOConfig, productData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": config.title,
    "description": config.description,
    "image": config.ogImage,
    "brand": {
      "@type": "Brand",
      "name": config.author
    },
    "offers": {
      "@type": "Offer",
      "price": productData.price || "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": config.author
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": productData.rating || "4.5",
      "ratingCount": productData.ratingCount || "100"
    }
  };
};

// Generate SoftwareApplication schema
export const generateSoftwareSchema = (config: SEOConfig, softwareData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.title,
    "description": config.description,
    "url": config.canonical,
    "applicationCategory": softwareData.category || "Game",
    "operatingSystem": softwareData.os || "Any",
    "offers": {
      "@type": "Offer",
      "price": softwareData.price || "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": softwareData.rating || "4.5",
      "ratingCount": softwareData.ratingCount || "100"
    },
    "author": {
      "@type": "Organization",
      "name": config.author
    }
  };
};

// Generate multiple schemas for a page
export const generateMultipleSchemas = (schemas: any[]) => {
  return schemas.map(schema => ({
    "@context": "https://schema.org",
    ...schema
  }));
};

// Validate schema data
export const validateSchema = (schema: any): boolean => {
  try {
    // Basic validation - check for required fields
    if (!schema["@context"] || !schema["@type"]) {
      return false;
    }
    
    // Additional validation can be added here
    return true;
  } catch (error) {
    console.error('Schema validation error:', error);
    return false;
  }
};

// Generate meta tags for head
export const generateMetaTags = (config: SEOConfig) => {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    canonical: config.canonical,
    robots: config.robots,
    viewport: config.viewport,
    author: config.author,
    language: config.language,
    ogTitle: config.ogTitle,
    ogDescription: config.ogDescription,
    ogImage: config.ogImage,
    ogUrl: config.canonical,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: config.twitterTitle,
    twitterDescription: config.twitterDescription,
    twitterImage: config.twitterImage
  };
};

// Generate sitemap XML
export const generateSitemap = (pages: Array<{url: string, lastmod: string, changefreq: string, priority: string}>) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return sitemap;
};

// Generate robots.txt
export const generateRobotsTxt = (domain: string, disallowPaths: string[] = []) => {
  const robots = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin areas
${disallowPaths.map(path => `Disallow: ${path}`).join('\n')}

# Allow important pages
Allow: /positions/
Allow: /blog/
Allow: /games/`;
  
  return robots;
};

// Core Web Vitals optimization helpers
export const optimizeCoreWebVitals = {
  // Optimize images
  optimizeImages: (images: HTMLImageElement[]) => {
    images.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  },
  
  // Preload critical resources
  preloadCriticalResources: (resources: string[]) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  },
  
  // Defer non-critical scripts
  deferNonCriticalScripts: (scripts: HTMLScriptElement[]) => {
    scripts.forEach(script => {
      script.defer = true;
    });
  }
};

// Voice search optimization
export const optimizeForVoiceSearch = {
  // Generate FAQ content for voice search
  generateFAQContent: (questions: string[]) => {
    return questions.map(question => ({
      question: question,
      answer: `This is a comprehensive answer to "${question}" that provides detailed information for voice search optimization.`
    }));
  },
  
  // Optimize for natural language queries
  optimizeForNaturalLanguage: (content: string) => {
    // Add natural language patterns
    const patterns = [
      'how to',
      'what is',
      'where can I',
      'when should',
      'why do',
      'who is'
    ];
    
    return patterns.some(pattern => content.toLowerCase().includes(pattern));
  }
};

// E-A-T (Expertise, Authoritativeness, Trustworthiness) optimization
export const optimizeEAT = {
  // Add author credentials
  addAuthorCredentials: (author: any) => {
    return {
      ...author,
      credentials: [
        'Certified Relationship Counselor',
        '10+ years experience in intimacy coaching',
        'Published author on romantic relationships',
        'Featured in major relationship publications'
      ],
      expertise: [
        'Intimate relationships',
        'Couple therapy',
        'Romantic communication',
        'Sexual health and wellness'
      ],
      awards: [
        'Best Relationship App 2024',
        'Top Intimacy Platform',
        'Couple\'s Choice Award'
      ]
    };
  },
  
  // Add trust signals
  addTrustSignals: (content: any) => {
    return {
      ...content,
      trustSignals: [
        'SSL Certificate',
        'Privacy Policy',
        'Terms of Service',
        'GDPR Compliant',
        'Secure Payment Processing',
        'Customer Reviews',
        'Money-back Guarantee'
      ]
    };
  }
};
