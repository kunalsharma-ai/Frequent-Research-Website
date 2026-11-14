/* build 74: data that a home page section loads on its own (a map, the case studies), once, shared by every user */
import * as ee from 'react';
const done = new Map();
const wait = new Map();
/* sync (optional): returns the value at once when it is already in memory (the rest of the site has loaded) */
function useLazy(key, load, sync) {
  const [v, setV] = ee.useState(() => {
    if (!done.has(key) && sync) {
      const x = sync();
      if (x !== undefined) done.set(key, x);
    }
    return done.get(key);
  });
  ee.useEffect(() => {
    if (v !== undefined) return undefined;
    let live = true;
    if (!wait.has(key)) wait.set(key, load().then((m) => (done.set(key, m), m)));
    wait.get(key).then((m) => live && setV(m), () => wait.delete(key));
    return () => {
      live = false;
    };
  }, [key]);
  return v;
}
export { useLazy };
