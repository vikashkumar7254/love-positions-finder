// Fast content formatter for blog posts
export const formatBlogContent = (content: string): string => {
  if (!content) return ''

  // Simple and fast formatting using regex replacements
  let formatted = content
  
  // Convert double line breaks to paragraph breaks
  formatted = formatted.replace(/\n\n+/g, '</p><p class="story-paragraph">')
  
  // Wrap in paragraph tags
  formatted = `<p class="story-paragraph">${formatted}</p>`
  
  // Handle opening quotes
  formatted = formatted.replace(/"([^"]*✨[^"]*💖[^"]*)"/g, '<div class="quote-section"><blockquote class="opening-quote">"$1"</blockquote></div>')
  
  // Handle story titles (lines with 🌙)
  formatted = formatted.replace(/([^<]*🌙[^<]*)/g, '<h2 class="story-title">$1</h2>')
  
  // Handle tips headings
  formatted = formatted.replace(/(Tips for[^<]*💡[^<]*)/g, '<h3 class="tips-heading">$1</h3>')
  
  // Handle image headings
  formatted = formatted.replace(/(Image Suggestions[^<]*🖼️[^<]*)/g, '<h3 class="image-heading">$1</h3>')
  
  // Handle list items
  formatted = formatted.replace(/- ([^<\n]+)/g, '<ul class="tips-list"><li class="tip-item">$1</li></ul>')
  
  // Handle URLs
  formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<p class="url-content">$1</p>')
  
  // Handle keywords
  formatted = formatted.replace(/(Keywords:[^<]*)/g, '<div class="keywords"><p>$1</p></div>')
  
  // Clean up empty paragraphs
  formatted = formatted.replace(/<p class="story-paragraph"><\/p>/g, '')
  
  return formatted
}

// Additional CSS classes for better formatting
export const getFormattedContentStyles = () => `
  .quote-section {
    margin: 2rem 0;
    text-align: center;
  }
  
  .opening-quote {
    font-size: 1.2em;
    font-style: italic;
    color: #7c3aed;
    background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
    padding: 1.5rem;
    border-radius: 1rem;
    border-left: 4px solid #a855f7;
    margin: 0;
  }
  
  .story-title {
    font-size: 1.5em;
    color: #dc2626;
    text-align: center;
    margin: 2rem 0 1.5rem 0;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    padding: 1rem;
    border-radius: 0.75rem;
    border-left: 4px solid #f59e0b;
  }
  
  .story-paragraph {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    text-align: justify;
    color: #374151;
  }
  
  .tips-heading {
    font-size: 1.3em;
    color: #7c3aed;
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
    padding: 1rem;
    border-radius: 0.75rem;
    margin: 2rem 0 1rem 0;
    border-left: 4px solid #8b5cf6;
  }
  
  .tips-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0 2rem 0;
  }
  
  .tip-item {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    margin: 0.75rem 0;
    padding: 1rem;
    border-radius: 0.75rem;
    border-left: 4px solid #0ea5e9;
    line-height: 1.6;
  }
  
  .image-heading {
    font-size: 1.2em;
    color: #059669;
    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    margin: 2rem 0 1rem 0;
    border-left: 4px solid #10b981;
  }
  
  .image-suggestions {
    background: linear-gradient(135deg, #ffecd2, #fcb69f);
    padding: 1rem;
    border-radius: 0.75rem;
    margin: 1rem 0;
  }
  
  .image-url {
    font-family: monospace;
    font-size: 0.9em;
    color: #92400e;
    margin: 0;
    word-break: break-all;
  }
  
  .keywords {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    padding: 1rem;
    border-radius: 0.75rem;
    text-align: center;
    margin: 2rem 0;
  }
  
  .keywords p {
    margin: 0;
    font-weight: 500;
    color: #1f2937;
  }
`
