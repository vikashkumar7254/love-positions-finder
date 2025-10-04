// CSS Optimization Utilities
export class CSSOptimizer {
  private static instance: CSSOptimizer;
  private loadedStyles = new Set<string>();

  static getInstance(): CSSOptimizer {
    if (!CSSOptimizer.instance) {
      CSSOptimizer.instance = new CSSOptimizer();
    }
    return CSSOptimizer.instance;
  }

  // Preload critical CSS
  preloadCriticalCSS(): void {
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.href = '/src/styles/critical.css';
    criticalCSS.as = 'style';
    criticalCSS.onload = () => {
      criticalCSS.rel = 'stylesheet';
    };
    document.head.appendChild(criticalCSS);
  }

  // Lazy load non-critical CSS
  loadCSS(href: string, id?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loadedStyles.has(href)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.id = id;
      
      link.onload = () => {
        this.loadedStyles.add(href);
        resolve();
      };
      
      link.onerror = () => {
        reject(new Error(`Failed to load CSS: ${href}`));
      };

      document.head.appendChild(link);
    });
  }

  // Load CSS when needed (intersection observer)
  loadCSSWhenVisible(selector: string, cssHref: string): void {
    const element = document.querySelector(selector);
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadCSS(cssHref);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);
  }

  // Optimize CSS loading for different pages
  optimizeForPage(page: string): void {
    switch (page) {
      case 'admin':
        this.loadCSS('/src/styles/rich-text-editor.css', 'rich-text-editor-css');
        break;
      case 'blog':
        this.loadCSS('/src/styles/blog-content.css', 'blog-content-css');
        break;
      case 'games':
        // Games don't need additional CSS
        break;
      default:
        // Load all CSS for homepage
        this.loadCSS('/src/styles/blog-content.css', 'blog-content-css');
        this.loadCSS('/src/styles/rich-text-editor.css', 'rich-text-editor-css');
    }
  }

  // Remove unused CSS
  removeUnusedCSS(): void {
    const unusedSelectors = [
      '.dark.comfort',
      '.dark',
      '.sidebar-*',
      '.unused-*'
    ];

    // This would need a more sophisticated implementation
    // For now, we'll just log the unused selectors
    console.log('Unused CSS selectors detected:', unusedSelectors);
  }

  // Inline critical CSS
  inlineCriticalCSS(): void {
    const criticalCSS = `
      /* Critical above-the-fold styles */
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
      .min-h-screen { min-height: 100vh; }
      .bg-gradient-to-br { background: linear-gradient(to bottom right, #fdf2f8, #fce7f3, #f3e8ff); }
      .navigation { position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
      .btn-primary { background: linear-gradient(135deg, #e91e63, #c2185b); color: white; }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  // Optimize font loading
  optimizeFonts(): void {
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontPreload.as = 'style';
    fontPreload.onload = () => {
      fontPreload.rel = 'stylesheet';
    };
    document.head.appendChild(fontPreload);
  }

  // Initialize CSS optimization
  init(): void {
    // Preload critical CSS
    this.preloadCriticalCSS();
    
    // Inline critical CSS
    this.inlineCriticalCSS();
    
    // Optimize fonts
    this.optimizeFonts();
    
    // Load CSS based on current page
    const currentPage = this.getCurrentPage();
    this.optimizeForPage(currentPage);
  }

  private getCurrentPage(): string {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/games')) return 'games';
    return 'homepage';
  }
}

// Auto-initialize CSS optimization
if (typeof window !== 'undefined') {
  const cssOptimizer = CSSOptimizer.getInstance();
  cssOptimizer.init();
}
