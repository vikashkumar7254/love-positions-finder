import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Load CSS with priority
const loadCSS = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/index.css';
  link.media = 'all';
  link.onload = () => {
    // CSS loaded successfully
    console.log('✅ CSS loaded successfully');
  };
  link.onerror = () => {
    console.error('❌ CSS failed to load');
  };
  document.head.appendChild(link);
};

// Load CSS immediately
loadCSS();

createRoot(document.getElementById("root")!).render(<App />);
