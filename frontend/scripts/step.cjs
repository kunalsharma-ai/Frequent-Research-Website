// Build 82.5: prints which step of `npm run prerender` is running, so a long step never looks like a stop.
const [n, what] = process.argv.slice(2);
console.log('\n==== ' + (n === 'done' ? 'DONE' : 'step ' + n + ' of 6') + ': ' + (what || '') + ' ' + new Date().toISOString().slice(11, 19) + ' UTC ====');
