import * as ee from 'react';
import { Link } from 'react-router-dom';

const HhLink = (p) => <Link {...p} />;
const hhReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));

export { HhLink, hhReduce };
