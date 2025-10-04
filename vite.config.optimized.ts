import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false,
    hmr: {
      clientPort: 443,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('API proxy error (this is normal in dev mode):', err.message);
          });
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build performance
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'utils-vendor': ['@tanstack/react-query'],
          
          // Feature chunks
          'admin': [
            './src/pages/admin/AdminDashboard.tsx',
            './src/pages/admin/BlogsAdmin.tsx',
            './src/pages/admin/ScratchPositionsAdmin.tsx'
          ],
          'games': [
            './src/pages/games/ScratchPosition.tsx',
            './src/pages/games/AllGames.tsx'
          ],
          'blog': [
            './src/pages/Blog.tsx',
            './src/pages/BlogPost.tsx',
            './src/pages/AddBlog.tsx'
          ]
        },
        
        // CSS code splitting
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // CSS optimization
    cssCodeSplit: true,
    
    // Source maps for debugging
    sourcemap: mode === 'development'
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@tanstack/react-query'
    ]
  }
}));
