// Placeholder business info and copy — anything in [brackets] is a stub.
// Replace with real values from the client (Karl) before launch.

export const business = {
  brandName: "[Brand] SMP",
  city: "Scottsdale",
  state: "AZ",
  phoneDisplay: "(480) 555-0123",
  phoneHref: "tel:4805550123",
  address: "[Street address], Scottsdale, AZ",
  rating: "4.9",
  reviewCount: "120+",
};

export const proofQuotes = [
  { text: "[Short review excerpt — natural result]", name: "[Client name] · Google" },
  { text: "[Short review excerpt — Karl / professionalism]", name: "[Client name] · Google" },
  { text: "[Short review excerpt — confidence]", name: "[Client name] · Google" },
];

export const results = [
  "[Receding hairline · 3 sessions]",
  "[Crown thinning]",
  "[Full scalp · Norwood 6]",
  "[Hairline framing]",
  "[Density · long hair]",
  "[Scar camouflage]",
  "[Receding hairline]",
  "[Full scalp]",
];

export const whatSmpDoes = [
  {
    n: "01",
    t: "Recreates the look of follicles",
    s: "Layered pigment matched to your skin tone and natural hair color.",
  },
  {
    n: "02",
    t: "Adds visual density",
    s: "Reduces scalp contrast behind thinning hair so it looks fuller.",
  },
  {
    n: "03",
    t: "Frames a natural hairline",
    s: "Designed for your face, age and bone structure, never a straight line.",
  },
  {
    n: "04",
    t: "Works with your style",
    s: "Shaved, buzzed, or longer thinning hair. Handles significant hair loss too.",
  },
];

export const whoFor = [
  "Receding hairlines",
  "Thinning hair",
  "Crown thinning",
  "Significant hair loss",
  "Shaved / buzzed styles",
  "Hairline framing",
  "Density enhancement",
];

export const processSteps = [
  { n: "1", t: "Submit photos", s: "Send a few photos and your goals through the form below." },
  { n: "2", t: "Free consultation", s: "Karl calls you personally to talk through options and pricing." },
  { n: "3", t: "Personalized treatment", s: "Hairline, density and shade designed for you, over several sessions." },
  { n: "4", t: "Final result", s: "A natural, low-maintenance look you won't have to think about." },
];

export const reviews = [
  { text: "[Full client testimonial mentioning natural results.]", name: "[Client]", src: "Google" },
  { text: "[Full client testimonial mentioning Karl personally.]", name: "[Client]", src: "Google" },
  { text: "[Full client testimonial mentioning professionalism.]", name: "[Client]", src: "Google" },
  { text: "[Full client testimonial — female client, thinning.]", name: "[Client]", src: "Google" },
];

export const concernOptions = [
  "Receding hairline",
  "Thinning hair",
  "Crown",
  "Significant hair loss",
  "Full scalp",
  "Other",
] as const;

export const hairstyleOptions = ["Shaved / buzzed", "Short", "Medium / long"] as const;
