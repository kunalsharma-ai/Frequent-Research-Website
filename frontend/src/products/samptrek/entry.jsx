/* Build 68: entry of the samptrek product site inside the Frequent Research page (src/products/_shell/ProductSite.jsx).
   Same imports, in the same order, as the product site's own main.jsx. */
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import './styles/global.css';

export const fonts = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500;700&display=swap';
export default function Root() {
  return (
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  );
}
