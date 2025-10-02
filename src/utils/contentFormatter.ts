// Fast content formatter for blog posts
export const formatBlogContent = (content: string): string => {
  if (!content) return ''

  // Split content into lines for better processing
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  let formatted = ''
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Skip empty lines
    if (!line) continue

    // Handle opening quotes
    if (line.startsWith('"') && line.includes('✨') && line.includes('💖')) {
      if (inList) {
        formatted += '</ul>'
        inList = false
      }
      formatted += `<div class="quote-section">
        <blockquote class="opening-quote">${line}</blockquote>
      </div>`
      continue
    }

    // Handle story titles (lines with 🌙)
    if (line.includes('🌙') && line.length < 100) {
      if (inList) {
        formatted += '</ul>'
        inList = false
      }
      formatted += `<h2 class="story-title">${line}</h2>`
      continue
    }

    // Handle tips headings
    if (line.includes('Tips for') && line.includes('💡')) {
      if (inList) {
        formatted += '</ul>'
        inList = false
      }
      formatted += `<h3 class="tips-heading">${line}</h3>`
      continue
    }

    // Handle image headings
    if (line.includes('Image Suggestions') && line.includes('🖼️')) {
      if (inList) {
        formatted += '</ul>'
        inList = false
      }
      formatted += `<h3 class="image-heading">${line}</h3>`
      continue
    }

    // Handle featured image URL
    if (line.includes('Featured Image URL') || line.includes('https://images.unsplash.com')) {
      if (inList) {
        formatted += '</ul>'
        inList = false
      }
      formatted += `<div class="image-suggestions">
        <p class="image-url">${line}</p>
      </div>`
      continue
    }

    // Handle keywords
    if (line.includes('Keywords:')) {
      if (inList) {
        formatted += '</ul>'
        inList = false
      }
      formatted += `<div class="keywords">
        <p>${line}</p>
      </div>`
      continue
    }

    // Handle list items (lines starting with -)
    if (line.startsWith('- ')) {
      if (!inList) {
        formatted += '<ul class="tips-list">'
        inList = true
      }
      const listItem = line.substring(2) // Remove "- "
      formatted += `<li class="tip-item">${listItem}</li>`
      continue
    }

    // Handle regular paragraphs
    if (line.length > 10) {
      if (inList) {
        formatted += '</ul>'
        inList = false
      }
      formatted += `<p class="story-paragraph">${line}</p>`
      continue
    }
  }

  // Close any open list
  if (inList) {
    formatted += '</ul>'
  }

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
