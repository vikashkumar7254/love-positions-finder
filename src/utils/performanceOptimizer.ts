// Core Web Vitals and Performance Optimization Utilities

export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  overall: 'good' | 'needs-improvement' | 'poor';
}

export interface OptimizationConfig {
  enableLazyLoading: boolean;
  enablePreloading: boolean;
  enableCodeSplitting: boolean;
  enableImageOptimization: boolean;
  enableCaching: boolean;
  enableCompression: boolean;
}

export const defaultOptimizationConfig: OptimizationConfig = {
  enableLazyLoading: true,
  enablePreloading: true,
  enableCodeSplitting: true,
  enableImageOptimization: true,
  enableCaching: true,
  enableCompression: true
};

// Core Web Vitals thresholds
export const CORE_WEB_VITALS_THRESHOLDS = {
  lcp: { good: 2.5, poor: 4.0 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1.8, poor: 3.0 },
  ttfb: { good: 200, poor: 600 }
};

// Performance optimization class
export class PerformanceOptimizer {
  private config: OptimizationConfig;
  private metrics: PerformanceMetrics | null = null;

  constructor(config: OptimizationConfig = defaultOptimizationConfig) {
    this.config = config;
    this.initializeOptimizations();
  }

  private initializeOptimizations() {
    if (this.config.enableLazyLoading) {
      this.setupLazyLoading();
    }
    
    if (this.config.enablePreloading) {
      this.setupPreloading();
    }
    
    if (this.config.enableImageOptimization) {
      this.setupImageOptimization();
    }
    
    if (this.config.enableCaching) {
      this.setupCaching();
    }
  }

  // Setup lazy loading for images
  private setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Setup preloading for critical resources
  private setupPreloading() {
    const criticalResources = [
      '/src/index.css',
      '/src/main.tsx',
      '/og-image.svg'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : resource.endsWith('.tsx') ? 'script' : 'image';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Force CSS loading with high priority
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/src/index.css';
    cssLink.media = 'all';
    cssLink.onload = () => {
      console.log('✅ Critical CSS loaded');
      // Remove loading class if exists
      document.body.classList.remove('loading');
    };
    cssLink.onerror = () => {
      console.error('❌ Critical CSS failed to load');
    };
    document.head.appendChild(cssLink);
  }

  // Setup image optimization
  private setupImageOptimization() {
    // Add loading="lazy" to all images
    document.querySelectorAll('img').forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });

    // Optimize image formats
    this.optimizeImageFormats();
  }

  // Optimize image formats based on browser support
  private optimizeImageFormats() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add WebP support detection
      if (this.supportsWebP()) {
        const src = img.src;
        if (src && !src.includes('.webp')) {
          img.src = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
        }
      }
    });
  }

  // Check WebP support
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Setup caching headers
  private setupCaching() {
    // Add cache control headers via meta tags
    const cacheControl = document.createElement('meta');
    cacheControl.httpEquiv = 'Cache-Control';
    cacheControl.content = 'public, max-age=31536000';
    document.head.appendChild(cacheControl);
  }

  // Measure Core Web Vitals
  public async measureCoreWebVitals(): Promise<PerformanceMetrics> {
    const metrics: Partial<PerformanceMetrics> = {};

    // Measure LCP
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Measure FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.processingStart && entry.startTime) {
            metrics.fid = entry.processingStart - entry.startTime;
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Measure CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Measure FCP
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
      metrics.fcp = fcpEntry.startTime;
    }

    // Measure TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Calculate overall score
    const overall = this.calculateOverallScore(metrics as PerformanceMetrics);
    metrics.overall = overall;

    this.metrics = metrics as PerformanceMetrics;
    return this.metrics;
  }

  // Calculate overall performance score
  private calculateOverallScore(metrics: PerformanceMetrics): 'good' | 'needs-improvement' | 'poor' {
    const scores = [
      this.getScore(metrics.lcp, CORE_WEB_VITALS_THRESHOLDS.lcp),
      this.getScore(metrics.fid, CORE_WEB_VITALS_THRESHOLDS.fid),
      this.getScore(metrics.cls, CORE_WEB_VITALS_THRESHOLDS.cls),
      this.getScore(metrics.fcp, CORE_WEB_VITALS_THRESHOLDS.fcp),
      this.getScore(metrics.ttfb, CORE_WEB_VITALS_THRESHOLDS.ttfb)
    ];

    const goodScores = scores.filter(score => score === 'good').length;
    const poorScores = scores.filter(score => score === 'poor').length;

    if (goodScores >= 4) return 'good';
    if (poorScores >= 2) return 'poor';
    return 'needs-improvement';
  }

  // Get individual score for a metric
  private getScore(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  }

  // Get current metrics
  public getMetrics(): PerformanceMetrics | null {
    return this.metrics;
  }

  // Optimize images for better performance
  public optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" if not already present
      if (!img.loading) {
        img.loading = 'lazy';
      }

      // Add decoding="async" for better performance
      if (!img.decoding) {
        img.decoding = 'async';
      }

      // Add proper alt text if missing
      if (!img.alt) {
        img.alt = 'Image';
      }

      // Add proper sizing to prevent layout shift
      if (!img.width || !img.height) {
        img.style.aspectRatio = '16/9';
      }
    });
  }

  // Preload critical resources
  public preloadCriticalResources(resources: string[]) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = this.getResourceType(resource);
      document.head.appendChild(link);
    });
  }

  // Get resource type for preloading
  private getResourceType(resource: string): string {
    if (resource.endsWith('.css')) return 'style';
    if (resource.endsWith('.js')) return 'script';
    if (resource.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
    if (resource.match(/\.(woff|woff2|ttf|otf)$/)) return 'font';
    return 'fetch';
  }

  // Defer non-critical scripts
  public deferNonCriticalScripts() {
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (!script.async && !script.defer) {
        script.defer = true;
      }
    });
  }

  // Optimize CSS delivery
  public optimizeCSSDelivery() {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
      // Add media="print" and onload to non-critical CSS
      if (!link.media || link.media === 'all') {
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
      }
    });
  }

  // Enable service worker for caching
  public enableServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  // Generate performance report
  public generatePerformanceReport(): string {
    if (!this.metrics) {
      return 'No performance metrics available. Run measureCoreWebVitals() first.';
    }

    const report = `
# Performance Report

## Core Web Vitals
- **Largest Contentful Paint (LCP)**: ${this.metrics.lcp.toFixed(2)}s ${this.getScore(this.metrics.lcp, CORE_WEB_VITALS_THRESHOLDS.lcp)}
- **First Input Delay (FID)**: ${this.metrics.fid.toFixed(2)}ms ${this.getScore(this.metrics.fid, CORE_WEB_VITALS_THRESHOLDS.fid)}
- **Cumulative Layout Shift (CLS)**: ${this.metrics.cls.toFixed(3)} ${this.getScore(this.metrics.cls, CORE_WEB_VITALS_THRESHOLDS.cls)}
- **First Contentful Paint (FCP)**: ${this.metrics.fcp.toFixed(2)}s ${this.getScore(this.metrics.fcp, CORE_WEB_VITALS_THRESHOLDS.fcp)}
- **Time to First Byte (TTFB)**: ${this.metrics.ttfb.toFixed(2)}ms ${this.getScore(this.metrics.ttfb, CORE_WEB_VITALS_THRESHOLDS.ttfb)}

## Overall Score: ${this.metrics.overall.toUpperCase()}

## Recommendations
${this.getRecommendations()}
    `;

    return report;
  }

  // Get performance recommendations
  private getRecommendations(): string {
    if (!this.metrics) return '';

    const recommendations: string[] = [];

    if (this.metrics.lcp > CORE_WEB_VITALS_THRESHOLDS.lcp.good) {
      recommendations.push('- Optimize images and reduce LCP');
    }

    if (this.metrics.fid > CORE_WEB_VITALS_THRESHOLDS.fid.good) {
      recommendations.push('- Reduce JavaScript execution time');
    }

    if (this.metrics.cls > CORE_WEB_VITALS_THRESHOLDS.cls.good) {
      recommendations.push('- Add proper sizing to images and elements');
    }

    if (this.metrics.fcp > CORE_WEB_VITALS_THRESHOLDS.fcp.good) {
      recommendations.push('- Optimize critical rendering path');
    }

    if (this.metrics.ttfb > CORE_WEB_VITALS_THRESHOLDS.ttfb.good) {
      recommendations.push('- Improve server response time');
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '- All metrics are within good thresholds!';
  }
}

// Initialize performance optimizer
export const performanceOptimizer = new PerformanceOptimizer();

// Auto-optimize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    performanceOptimizer.optimizeImages();
    performanceOptimizer.deferNonCriticalScripts();
    performanceOptimizer.optimizeCSSDelivery();
    
    // Measure Core Web Vitals after a delay
    setTimeout(() => {
      performanceOptimizer.measureCoreWebVitals();
    }, 2000);
  });
}

// Export utility functions
export const optimizePerformance = {
  // Optimize all images on the page
  optimizeAllImages: () => performanceOptimizer.optimizeImages(),
  
  // Preload critical resources
  preloadResources: (resources: string[]) => performanceOptimizer.preloadCriticalResources(resources),
  
  // Defer non-critical scripts
  deferScripts: () => performanceOptimizer.deferNonCriticalScripts(),
  
  // Get performance metrics
  getMetrics: () => performanceOptimizer.getMetrics(),
  
  // Generate performance report
  getReport: () => performanceOptimizer.generatePerformanceReport()
};
