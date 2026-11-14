// Build 78: the kinds of section the super admin can add to any page or to a new page (app/cmsBlocks.jsx draws them,
// admin/PagesBuilder.jsx builds the forms from this list). Each field: [name, label, kind, extra]
// kinds: text, area (several lines), image, link, file, number, select (extra = options), lines (one item per line),
// list (extra = the fields of one item), html, bool
const DESIGNS = ["soft", "navy", "gradient", "glass", "outline", "plain"];
const CMS_BLOCK_TYPES = [
  { type: "hero", name: "Big title (hero)", fields: [["eyebrow", "Small line above", "text"], ["heading", "Title", "text"], ["text", "Text", "area"], ["image", "Picture", "image"], ["button", "Button text", "text"], ["link", "Button link", "link"], ["button2", "Second button text", "text"], ["link2", "Second button link", "link"], ["design", "Design", "select", ["gradient", "navy", "split", "soft", "plain"]]] },
  { type: "text", name: "Text", fields: [["heading", "Heading", "text"], ["text", "Text (blank line = new paragraph, **bold**, [link text](/page))", "area"], ["align", "Align", "select", ["left", "center"]], ["design", "Design", "select", DESIGNS]] },
  { type: "textImage", name: "Text and picture", fields: [["eyebrow", "Small line above", "text"], ["heading", "Heading", "text"], ["text", "Text", "area"], ["image", "Picture", "image"], ["side", "Picture side", "select", ["right", "left"]], ["button", "Button text", "text"], ["link", "Button link", "link"], ["design", "Design", "select", DESIGNS]] },
  { type: "cards", name: "Cards", fields: [["heading", "Heading", "text"], ["text", "Intro", "area"], ["columns", "Cards per row", "select", ["3", "2", "4"]], ["design", "Design", "select", ["lift", "glass", "outline", "navy", "image-top"]], ["items", "Cards", "list", [["title", "Title", "text"], ["text", "Text", "area"], ["image", "Picture", "image"], ["icon", "Emoji or symbol", "text"], ["link", "Link", "link"]]]] },
  { type: "stats", name: "Numbers", fields: [["heading", "Heading", "text"], ["design", "Design", "select", ["navy", "soft", "outline"]], ["items", "Numbers", "list", [["value", "Number (e.g. 25+)", "text"], ["label", "Label", "text"]]]] },
  { type: "steps", name: "Steps / timeline", fields: [["heading", "Heading", "text"], ["design", "Design", "select", ["timeline", "numbered", "cards"]], ["items", "Steps", "list", [["title", "Title", "text"], ["text", "Text", "area"], ["when", "Year or label", "text"]]]] },
  { type: "faq", name: "Questions and answers", fields: [["heading", "Heading", "text"], ["items", "Questions", "list", [["q", "Question", "text"], ["a", "Answer", "area"]]]] },
  { type: "cta", name: "Call to action", fields: [["heading", "Heading", "text"], ["text", "Text", "area"], ["button", "Button text", "text"], ["link", "Button link", "link"], ["design", "Design", "select", ["gradient", "navy", "soft"]]] },
  { type: "video", name: "YouTube video", fields: [["heading", "Heading", "text"], ["text", "Text", "area"], ["url", "YouTube link", "text"]] },
  { type: "gallery", name: "Picture gallery", fields: [["heading", "Heading", "text"], ["items", "Pictures", "list", [["image", "Picture", "image"], ["caption", "Caption", "text"]]]] },
  { type: "logos", name: "Logo strip", fields: [["heading", "Heading", "text"], ["items", "Logos", "list", [["image", "Logo", "image"], ["alt", "Name", "text"], ["link", "Link", "link"]]]] },
  { type: "plans", name: "Plans / pricing", fields: [["heading", "Heading", "text"], ["text", "Intro", "area"], ["items", "Plans", "list", [["name", "Plan name", "text"], ["price", "Price (leave empty for 'Ask us')", "text"], ["note", "Under the price", "text"], ["features", "Features (one per line)", "lines"], ["button", "Button text", "text"], ["link", "Button link", "link"], ["featured", "Highlight this plan", "bool"]]]] },
  { type: "quotes", name: "Quotes (only with the client's permission)", fields: [["heading", "Heading", "text"], ["items", "Quotes", "list", [["text", "Quote", "area"], ["name", "Name", "text"], ["role", "Role / company", "text"]]]] },
  { type: "team", name: "People", fields: [["heading", "Heading", "text"], ["items", "People", "list", [["name", "Name", "text"], ["role", "Role", "text"], ["image", "Photo", "image"], ["link", "LinkedIn or page", "link"]]]] },
  { type: "checklist", name: "Checklist", fields: [["heading", "Heading", "text"], ["items", "Points (one per line)", "lines"], ["columns", "Columns", "select", ["2", "1", "3"]]] },
  { type: "table", name: "Table", fields: [["heading", "Heading", "text"], ["rows", "Rows (one per line, cells split with | , first row = header)", "lines"]] },
  { type: "download", name: "Download button", fields: [["heading", "Heading", "text"], ["text", "Text", "area"], ["file", "File (PDF)", "file"], ["button", "Button text", "text"]] },
  { type: "form", name: "Form", fields: [["heading", "Heading", "text"], ["text", "Text", "area"], ["formKey", "Form name (for the inbox and emails)", "text"], ["button", "Button text", "text"], ["success", "Thank-you message", "text"], ["fields", "Fields (name and email are always there)", "list", [["label", "Label", "text"], ["type", "Type", "select", ["text", "textarea", "tel", "number", "select", "checkbox", "date"]], ["options", "Choices (for select, one per line)", "lines"], ["required", "Required", "bool"]]]] },
  { type: "newsletter", name: "Newsletter sign-up", fields: [["heading", "Heading", "text"], ["text", "Text", "area"], ["button", "Button text", "text"]] },
  { type: "blog", name: "Latest blog posts", fields: [["heading", "Heading", "text"], ["count", "How many", "select", ["3", "6", "9"]], ["vertical", "Only this service area (optional, e.g. market-research)", "text"]] },
  { type: "html", name: "Own HTML (scripts are removed)", fields: [["html", "HTML", "html"]] },
  { type: "spacer", name: "Space", fields: [["size", "Size", "select", ["medium", "small", "large"]]] },
];
const cmsBlockType = (t) => CMS_BLOCK_TYPES.find((x) => x.type === t);
export { CMS_BLOCK_TYPES, cmsBlockType };
