import { VERTICALS } from '../data/site.jsx';
import { PHONE_COUNTRIES } from '../data/phoneCountries.jsx';

const CHAT_TOPICS = [
    ...VERTICALS.map((t) => ({
      label: `${t.icon} ${t.name}`,
      value: t.name,
    })),
    {
      label: "🏛️ Government research",
      value: "Government & opinion poll research",
    },
    {
      label: "🎁 Join a research panel",
      value: "I want to join a research panel",
    },
    {
      label: "💬 Something else",
      value: "Something else",
    },
  ];
function phoneFromText(t) {
  const e = t.replace(/[^\d+]/g, "");
  if (e.startsWith("+")) {
    const a = PHONE_COUNTRIES.filter((s) => s.code && e.startsWith(s.code)).sort((s, i) => i.code.length - s.code.length);
    if (a[0])
      return {
        iso: a[0].iso,
        code: a[0].code,
        num: e.slice(a[0].code.length),
      };
    const n = e.match(/^(\+\d{1,4})(\d{6,14})$/);
    return n
      ? {
          iso: "XX",
          code: n[1],
          num: n[2],
        }
      : null;
  }
  return /^[6-9]\d{9}$/.test(e)
    ? {
        iso: "IN",
        code: "+91",
        num: e,
      }
    : /^0[6-9]\d{9}$/.test(e)
      ? {
          iso: "IN",
          code: "+91",
          num: e.slice(1),
        }
      : null;
}

export { phoneFromText };
