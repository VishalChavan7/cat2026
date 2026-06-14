import { useState, useEffect, useRef } from "react";

// Palette: Parchment/Espresso/Terracotta — Antigravity-inspired
// bg:#FAF7F2  surface:#F2EDE4  dark:#1A1209
// accent:#7C4A1E  mid:#A0622A  warm:#C4884A
// text:#1A1209  muted:#6B5744  border:#D9CFC0

const SYLLABUS = [
  { id: "q1", section: "Quant", topic: "Profit, Loss & Discount (Basics)" },
  { id: "q2", section: "Quant", topic: "Time & Work (Basics)" },
  { id: "q3", section: "Quant", topic: "Time, Speed & Distance (Foundation)" },
  { id: "q4", section: "Quant", topic: "Simple & Compound Interest" },
  { id: "q5", section: "Quant", topic: "Triangles (Basics)" },
  { id: "q6", section: "Quant", topic: "Quadrilaterals & Circles (Intro)" },
  { id: "q7", section: "Quant", topic: "Linear Equations" },
  { id: "q8", section: "Quant", topic: "Progressions & Series (Basics)" },
  { id: "q9", section: "Quant", topic: "Number System (Foundation)" },
  { id: "q10", section: "Quant", topic: "Permutation & Combinations (Basics)" },
  { id: "q11", section: "Quant", topic: "Introduction to Probability" },
  { id: "q12", section: "Quant", topic: "Average, Ratios & Proportions" },
  { id: "q13", section: "Quant", topic: "Mixtures, Alligations & Solutions" },
  { id: "q14", section: "Quant", topic: "Profit, Loss & Discount" },
  { id: "q15", section: "Quant", topic: "Interest" },
  { id: "q16", section: "Quant", topic: "Time & Work" },
  { id: "q17", section: "Quant", topic: "Time, Speed & Distance - 1" },
  { id: "q18", section: "Quant", topic: "Time, Speed & Distance - 2" },
  { id: "q19", section: "Quant", topic: "Geometry Basics" },
  { id: "q20", section: "Quant", topic: "Geometry - 1" },
  { id: "q21", section: "Quant", topic: "Geometry - 2" },
  { id: "q22", section: "Quant", topic: "Geometry - 3" },
  { id: "q23", section: "Quant", topic: "Linear Equations (Advanced)" },
  { id: "q24", section: "Quant", topic: "Quadratic Equations" },
  { id: "q25", section: "Quant", topic: "Linear + Quadratic" },
  { id: "q26", section: "Quant", topic: "Inequalities - 1" },
  { id: "q27", section: "Quant", topic: "Inequalities - 2" },
  { id: "q28", section: "Quant", topic: "Progressions - 1" },
  { id: "q29", section: "Quant", topic: "Progressions - 2" },
  { id: "q30", section: "Quant", topic: "Functions & Graphs" },
  { id: "q31", section: "Quant", topic: "Logarithm" },
  { id: "q32", section: "Quant", topic: "Number System - 1" },
  { id: "q33", section: "Quant", topic: "Number System - 2" },
  { id: "q34", section: "Quant", topic: "Permutation & Combination - 1" },
  { id: "q35", section: "Quant", topic: "Probability - 1" },
  { id: "q36", section: "Quant", topic: "P&C + Probability" },
  { id: "l1", section: "LRDI", topic: "Puzzles" },
  { id: "l2", section: "LRDI", topic: "Table-based Sets" },
  { id: "l3", section: "LRDI", topic: "Introduction to Charts" },
  { id: "l4", section: "LRDI", topic: "Games & Tournaments (Foundation)" },
  { id: "l5", section: "LRDI", topic: "DI Charts (Bar, Line, Pie)" },
  { id: "l6", section: "LRDI", topic: "Data Interpretation Sets" },
  { id: "l7", section: "LRDI", topic: "Logical Representation of Information" },
  { id: "l8", section: "LRDI", topic: "Linear Arrangement" },
  { id: "l9", section: "LRDI", topic: "Circular Arrangement" },
  { id: "l10", section: "LRDI", topic: "Einstein's Puzzle" },
  { id: "l11", section: "LRDI", topic: "Selection with Conditions" },
  { id: "l12", section: "LRDI", topic: "Games & Tournament (Knockout)" },
  { id: "l13", section: "LRDI", topic: "Routes & Network" },
  { id: "l14", section: "LRDI", topic: "Scheduling" },
  { id: "l15", section: "LRDI", topic: "DI Connecting Data Sets" },
  { id: "l16", section: "LRDI", topic: "DI Table with Missing Values" },
  { id: "l17", section: "LRDI", topic: "Venn Diagram – Maxima & Minima" },
  { id: "l18", section: "LRDI", topic: "Quant-based LR" },
  { id: "l19", section: "LRDI", topic: "DI Charts (Area, Bubble, Radar)" },
  { id: "l20", section: "LRDI", topic: "DI Cumulative" },
  { id: "l21", section: "LRDI", topic: "DI Table with Incorrect Values" },
  { id: "l22", section: "LRDI", topic: "Arrangement Across Levels" },
  { id: "l23", section: "LRDI", topic: "Seating – Different Directions" },
  {
    id: "l24",
    section: "LRDI",
    topic: "Square Seating & Complex Arrangements",
  },
  { id: "l25", section: "LRDI", topic: "Team Selection: Advanced" },
  { id: "l26", section: "LRDI", topic: "Games & Tournament (Advanced)" },
  { id: "l27", section: "LRDI", topic: "2D Space LR" },
  { id: "l28", section: "LRDI", topic: "Quant-based DI" },
  { id: "l29", section: "LRDI", topic: "Misc. (Painted Cube, Truth-Lie)" },
  { id: "l30", section: "LRDI", topic: "LR – Picking Coins, Categorizations" },
  { id: "l31", section: "LRDI", topic: "4-Set Venn Diagram" },
  { id: "l32", section: "LRDI", topic: "DILR Maxima & Minima" },
  { id: "l33", section: "LRDI", topic: "LRDI Revision" },
  { id: "v1", section: "VARC", topic: "Central Idea of Passage" },
  { id: "v2", section: "VARC", topic: "Para Jumbles & OOC (Approach)" },
  { id: "v3", section: "VARC", topic: "Para Summary" },
  { id: "v4", section: "VARC", topic: "Para Insertion (Basics)" },
  { id: "v5", section: "VARC", topic: "Approach to RC" },
  { id: "v6", section: "VARC", topic: "Identifying Central Idea" },
  { id: "v7", section: "VARC", topic: "RC Types (Informative, Scientific)" },
  { id: "v8", section: "VARC", topic: "Inferences" },
  { id: "v9", section: "VARC", topic: "RC with Close Options" },
  { id: "v10", section: "VARC", topic: "RC Types (Negative, Persuasive)" },
  { id: "v11", section: "VARC", topic: "Author Agree or Disagree" },
  { id: "v12", section: "VARC", topic: "Summary Option Elimination" },
  { id: "v13", section: "VARC", topic: "Identify Title & Tone" },
  { id: "v14", section: "VARC", topic: "TITA Parajumbles & OOC" },
  { id: "v15", section: "VARC", topic: "PJs & OOC using Grammar Rules" },
  { id: "v16", section: "VARC", topic: "Para Completion (Sentence Insertion)" },
  { id: "v17", section: "VARC", topic: "RC Structure-Based Questions" },
  { id: "v18", section: "VARC", topic: "Para Summary (Advanced)" },
  { id: "v19", section: "VARC", topic: "Eliminating Options – Para Insertion" },
  { id: "v20", section: "VARC", topic: "Critical Reasoning - 1" },
  { id: "v21", section: "VARC", topic: "Critical Reasoning - 2" },
  { id: "v22", section: "VARC", topic: "Parallel Reasoning" },
  { id: "v23", section: "VARC", topic: "Poem RC" },
  { id: "v24", section: "VARC", topic: "Identifying Links – Transition Words" },
];

const SEC_STYLE = {
  Quant: { accent: "#7C4A1E", light: "#F5EDE2", border: "#D4A574" },
  LRDI: { accent: "#5C3A1A", light: "#F0E8DC", border: "#C49060" },
  VARC: { accent: "#A0622A", light: "#FAF0E6", border: "#DDB87A" },
};

const GENRES = [
  "Philosophy and Epistemology",
  "Colonial History and Power",
  "Neuroscience and Consciousness",
  "Political Economy",
  "Ecology and Climate",
  "Literary Modernism",
  "Psychology of Belief",
  "Urbanisation and Society",
];

const CAT_DATE = new Date("2026-11-29T09:00:00");

// ── FALLBACK DATA FOR OFFLINE / API ERRORS ─────────────────────────────────
const FALLBACK_RCS = [
  {
    rc1: {
      passage:
        "The history of ideas is rarely a linear progression of truths displacing errors. More often, it is a complex web of shifting paradigms, where concepts are borrowed, reinterpreted, and sometimes misconstrued across different epochs. Consider the idea of 'individualism.' In the context of the European Enlightenment, it was a liberating force, challenging the hegemony of monarchical and ecclesiastical institutions. It championed the autonomy of the human intellect and the primacy of personal conscience. However, when transposed to the socio-economic sphere of the industrial revolution, individualism was frequently invoked to justify the unchecked operations of laissez-faire capitalism, often at the expense of communal cohesion and social justice. This evolution illustrates how a philosophical concept can be transformed by its context, serving different, and sometimes contradictory, ideological ends.",
      genre: "Philosophy and Epistemology",
      questions: [
        {
          id: 1,
          text: "Which of the following best expresses the main idea of the passage?",
          options: {
            A: "Individualism has always been a destructive force in human society.",
            B: "Philosophical concepts are static and do not change across historical periods.",
            C: "The meaning and impact of philosophical ideas are heavily dependent on their historical and social context.",
            D: "The European Enlightenment was the only period in which individualism was a positive force.",
          },
          answer: "C",
          explanation:
            "The passage explicitly discusses how the concept of 'individualism' shifted in meaning and function from the Enlightenment to the Industrial Revolution, illustrating that ideas change with context.",
        },
        {
          id: 2,
          text: "What can be inferred about the role of individualism during the European Enlightenment?",
          options: {
            A: "It was used to defend the divine right of kings.",
            B: "It served as a tool for social control by the Church.",
            C: "It was seen as a threat to intellectual freedom.",
            D: "It acted as a counterweight to traditional authority structures.",
          },
          answer: "D",
          explanation:
            "The text states that individualism was a 'liberating force, challenging the hegemony of monarchical and ecclesiastical institutions,' which represents traditional authority.",
        },
        {
          id: 3,
          text: "According to the passage, the industrial revolution witnessed a shift in the application of 'individualism' towards:",
          options: {
            A: "Religious reform.",
            B: "Economic deregulation and capitalist justification.",
            C: "Scientific methodology.",
            D: "Monarchical preservation.",
          },
          answer: "B",
          explanation:
            "The passage notes that in the industrial revolution, individualism was 'frequently invoked to justify the unchecked operations of laissez-faire capitalism.'",
        },
        {
          id: 4,
          text: "The author's tone in describing the evolution of the concept of individualism can be best characterized as:",
          options: {
            A: "Highly dismissive.",
            B: "Analytically objective.",
            C: "Passionately celebratory.",
            D: "Deeply pessimistic.",
          },
          answer: "B",
          explanation:
            "The author analyzes the historical shift objectively without taking a strong emotional stance or dismissing the ideas.",
        },
      ],
    },
    rc2: {
      passage:
        "The human brain is a marvel of evolutionary engineering, but it is not without its design flaws. One of the most persistent cognitive vulnerabilities is our susceptibility to confirmation bias—the tendency to search for, interpret, and recall information in a way that confirms our preexisting beliefs. From an evolutionary perspective, this bias may have once served a purpose. In a hostile environment, making rapid decisions based on quick pattern recognition was often a matter of survival; taking the time to weigh all evidence objectively could be fatal. Today, however, in a complex world saturated with information, confirmation bias leads to polarization, the spread of misinformation, and poor decision-making. Overcoming it requires conscious effort and a commitment to scientific skepticism, which forces us to actively seek out disconfirming evidence.",
      genre: "Neuroscience and Consciousness",
      questions: [
        {
          id: 1,
          text: "The primary purpose of the passage is to:",
          options: {
            A: "Argue that the human brain has ceased to evolve.",
            B: "Describe confirmation bias, explain its evolutionary origin, and highlight its modern consequences.",
            C: "Prove that scientific skepticism is the only valid way to acquire knowledge.",
            D: "Advocate for a return to primitive decision-making processes.",
          },
          answer: "B",
          explanation:
            "The passage defines confirmation bias, mentions its evolutionary utility, explains why it is problematic today, and suggests how to counter it.",
        },
        {
          id: 2,
          text: "According to the passage, why might confirmation bias have been beneficial to our ancestors?",
          options: {
            A: "It allowed them to design complex tools.",
            B: "It facilitated the development of language.",
            C: "It enabled rapid decision-making essential for survival in hazardous conditions.",
            D: "It helped them build cooperative social networks.",
          },
          answer: "C",
          explanation:
            "The passage states that 'making rapid decisions based on quick pattern recognition was often a matter of survival' in a hostile ancestral environment.",
        },
        {
          id: 3,
          text: "Based on the passage, scientific skepticism is recommended because it:",
          options: {
            A: "Simplifies the process of information gathering.",
            B: "Guarantees that we will never make mistakes.",
            C: "Encourages us to actively look for evidence that contradicts our beliefs.",
            D: "Validates our intuitive decisions.",
          },
          answer: "C",
          explanation:
            "The author concludes by noting that scientific skepticism 'forces us to actively seek out disconfirming evidence' to counter confirmation bias.",
        },
        {
          id: 4,
          text: "The author views confirmation bias in the modern era as:",
          options: {
            A: "An obsolete cognitive habit that poses significant challenges.",
            B: "A harmless relic of our evolutionary history.",
            C: "A vital cognitive asset for navigating modern technology.",
            D: "An insurmountable barrier to human progress.",
          },
          answer: "A",
          explanation:
            "The author argues that while it had evolutionary utility, today it 'leads to polarization, the spread of misinformation, and poor decision-making,' requiring conscious effort to overcome.",
        },
      ],
    },
  },
  {
    rc1: {
      passage:
        "Colonialism was not merely a system of political administration and economic extraction; it was, at its core, a project of epistemological domination. The colonizing powers did not just conquer territories; they conquered knowledge. By imposing their own linguistic, historical, and scientific frameworks, they marginalized indigenous ways of knowing, rendering them 'primitive' or 'superstitious.' This process of cultural subjugation created a hierarchy of knowledge that justified colonial rule and persisted long after political independence was achieved. Decolonizing the mind, therefore, requires more than just reclaiming political sovereignty; it demands a radical dismantling of these inherited epistemic hierarchies and a restoration of validity to diverse cultural modes of understanding the world.",
      genre: "Colonial History and Power",
      questions: [
        {
          id: 1,
          text: "According to the passage, the primary power of colonialism lay in its ability to:",
          options: {
            A: "Amass superior military weaponry.",
            B: "Establish efficient trade routes.",
            C: "Dominate and redefine systems of knowledge.",
            D: "Unify diverse ethnic populations.",
          },
          answer: "C",
          explanation:
            "The passage states that colonialism was, at its core, a 'project of epistemological domination' that conquered knowledge.",
        },
        {
          id: 2,
          text: "The term 'epistemological domination' as used in the passage refers to:",
          options: {
            A: "The control of physical boundaries and geographical resources.",
            B: "The imposition of the colonizer's frameworks of knowledge over indigenous ones.",
            C: "The fair exchange of cultural and scientific achievements.",
            D: "The establishment of democratic governance structures.",
          },
          answer: "B",
          explanation:
            "The text defines this domination by stating that colonizing powers 'imposed their own linguistic, historical, and scientific frameworks' to marginalize indigenous knowledge.",
        },
        {
          id: 3,
          text: "Based on the passage, why is political independence insufficient for complete decolonization?",
          options: {
            A: "Economic dependencies often continue to exist.",
            B: "Epistemic and knowledge hierarchies established during colonial times still persist.",
            C: "Former colonies struggle to maintain military security.",
            D: "Linguistic barriers prevent effective international trade.",
          },
          answer: "B",
          explanation:
            "The passage asserts that the hierarchy of knowledge 'persisted long after political independence' and thus dismantling these hierarchies is required.",
        },
        {
          id: 4,
          text: "The author's stance on decolonization can be described as advocating for:",
          options: {
            A: "A complete rejection of all modern scientific knowledge.",
            B: "A balanced synthesis of colonial and indigenous political structures.",
            C: "A fundamental restructuring of how knowledge is valued and validated.",
            D: "A return to isolationist policies for post-colonial states.",
          },
          answer: "C",
          explanation:
            "The author calls for a 'radical dismantling of these inherited epistemic hierarchies and a restoration of validity to diverse cultural modes of understanding.'",
        },
      ],
    },
    rc2: {
      passage:
        "The concept of Anthropocene suggests that human activity has become the dominant influence on climate and the environment. This represents a profound shift in our relationship with the planet, moving humans from passive observers of nature to active shapers of the biosphere. However, this power is asymmetrical and dangerous. Our technological capacity to alter ecosystems has far outpaced our ecological wisdom to manage them. The consequences—biodiversity loss, runaway greenhouse effects, and ocean acidification—are not isolated crises but interconnected symptoms of a deeper systemic imbalance. Addressing this requires a transition from an anthropocentric worldview, which views nature as an infinite resource for exploitation, to an ecocentric one that recognizes the intrinsic value and interdependence of all life systems.",
      genre: "Ecology and Climate",
      questions: [
        {
          id: 1,
          text: "Which of the following describes the key paradox highlighted in the passage?",
          options: {
            A: "Human technology is advancing rapidly while human population is declining.",
            B: "Our ability to alter the planet is immense, yet our understanding of how to manage these changes is severely lacking.",
            C: "Ecocentric worldviews are gaining popularity despite worsening environmental degradation.",
            D: "The Anthropocene is defined by human impact, yet humans are powerless to stop climate change.",
          },
          answer: "B",
          explanation:
            "The passage states: 'Our technological capacity to alter ecosystems has far outpaced our ecological wisdom to manage them.'",
        },
        {
          id: 2,
          text: "The author argues that ecological crises like ocean acidification and biodiversity loss are:",
          options: {
            A: "Unrelated anomalies caused by local industrial mishaps.",
            B: "Exaggerated claims that lack scientific backing.",
            C: "Inevitable side effects of any evolutionary progress.",
            D: "Interconnected indicators of a systemic environmental imbalance.",
          },
          answer: "D",
          explanation:
            "The text refers to these consequences as 'interconnected symptoms of a deeper systemic imbalance.'",
        },
        {
          id: 3,
          text: "An 'anthropocentric worldview,' as implied by the passage, is one that:",
          options: {
            A: "Places human interests and utility at the center of all value.",
            B: "Recognizes the intrinsic worth of non-human species.",
            C: "Prioritizes long-term ecological stability over short-term gains.",
            D: "Advocates for the total elimination of industrial technology.",
          },
          answer: "A",
          explanation:
            "The passage notes that an anthropocentric worldview 'views nature as an infinite resource for exploitation' by and for humans.",
        },
        {
          id: 4,
          text: "To rectify the environmental crises of the Anthropocene, the author proposes:",
          options: {
            A: "Developing more advanced carbon capture technologies.",
            B: "Shifting from human-centered to ecosystem-centered paradigms of value.",
            C: "Banning all research into genetic modification.",
            D: "Establishing international treaties on space exploration.",
          },
          answer: "B",
          explanation:
            "The passage advocates for 'a transition from an anthropocentric worldview... to an ecocentric one that recognizes the intrinsic value and interdependence of all life.'",
        },
      ],
    },
  },
];

const FALLBACK_WORDS = [
  [
    {
      word: "Dichotomy",
      part_of_speech: "noun",
      meaning:
        "A division or contrast between two things that are represented as being opposed or entirely different.",
      example:
        "The author rejects the false dichotomy between nature and nurture, arguing instead that genetic potential is realized only through environmental interaction.",
    },
    {
      word: "Hegemony",
      part_of_speech: "noun",
      meaning:
        "Leadership or dominance, especially by one state or social group over others, often in terms of cultural or ideological influence.",
      example:
        "The critic analyzed how Western media outlets maintain cultural hegemony by framing non-Western societies through an orientalist lens.",
    },
    {
      word: "Epistemic",
      part_of_speech: "adjective",
      meaning:
        "Relating to knowledge or the validation of belief, particularly how we justify what we know.",
      example:
        "Post-colonial scholars challenge the epistemic hierarchies that marginalize indigenous ways of understanding the natural world.",
    },
    {
      word: "Anomalous",
      part_of_speech: "adjective",
      meaning:
        "Deviating from what is standard, normal, or expected; irregular or incongruous.",
      example:
        "The researchers were forced to re-examine their thesis after discovering several anomalous data points that contradicted the prevailing model.",
    },
    {
      word: "Obfuscate",
      part_of_speech: "verb",
      meaning:
        "To deliberately render obscure, unclear, or unintelligible, often to avoid scrutiny.",
      example:
        "The corporation's spokesperson attempted to obfuscate the environmental damage by releasing a dense report filled with vague technical jargon.",
    },
  ],
  [
    {
      word: "Hermeneutic",
      part_of_speech: "adjective",
      meaning:
        "Concerning interpretation, especially of literary, philosophical, or historical texts.",
      example:
        "A proper hermeneutic analysis of modern literature requires understanding the social and historical conditions under which the texts were produced.",
    },
    {
      word: "Dialectic",
      part_of_speech: "noun",
      meaning:
        "A discourse between opposing cognitive forces or arguments, leading to a higher synthesis of truth.",
      example:
        "The philosophical essay explores the dialectic between individual freedom and societal obligation in contemporary democratic states.",
    },
    {
      word: "Teleological",
      part_of_speech: "adjective",
      meaning:
        "Relating to the explanation of phenomena in terms of the purpose they serve rather than of the cause by which they arise.",
      example:
        "Early evolutionary theories were often criticized for their teleological assumption that life possesses an inherent drive toward complexity.",
    },
    {
      word: "Reification",
      part_of_speech: "noun",
      meaning:
        "The process of treating something abstract or conceptual as if it were a concrete, physical thing.",
      example:
        "The psychologist argued that treating IQ scores as a fixed, physical trait is a dangerous reification of a complex cognitive concept.",
    },
    {
      word: "Equivocate",
      part_of_speech: "verb",
      meaning:
        "To use ambiguous language so as to conceal the truth or avoid committing oneself to a position.",
      example:
        "When asked directly about the policy change, the politician chose to equivocate rather than risk alienating potential voters.",
    },
  ],
  [
    {
      word: "Esoteric",
      part_of_speech: "adjective",
      meaning:
        "Intended for or likely to be understood by only a small number of people with a specialized knowledge.",
      example:
        "The academic journal was filled with esoteric jargon that made its groundbreaking research inaccessible to the general public.",
    },
    {
      word: "Paradigm",
      part_of_speech: "noun",
      meaning:
        "A typical pattern, model, or conceptual framework that dictates how a discipline conducts research or understands reality.",
      example:
        "The discovery of quantum mechanics forced a paradigm shift in physics, overturning long-held Newtonian assumptions about the universe.",
    },
    {
      word: "Idiosyncratic",
      part_of_speech: "adjective",
      meaning:
        "Relating to a distinctive, peculiar, or individualistic feature of a person, group, or system.",
      example:
        "His idiosyncratic writing style, characterized by extremely long sentences and frequent parenthetical remarks, polarized literary critics.",
    },
    {
      word: "Fastidious",
      part_of_speech: "adjective",
      meaning:
        "Very attentive to and concerned about accuracy, detail, and cleanliness.",
      example:
        "The historian's fastidious archival research ensured that every quote and date in the biography was verified by multiple sources.",
    },
    {
      word: "Paucity",
      part_of_speech: "noun",
      meaning:
        "The presence of something only in small or insufficient quantities or amounts; scarcity.",
      example:
        "Despite the paucity of empirical evidence supporting the new theory, many scholars rushed to embrace its provocative conclusions.",
    },
  ],
];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function getDayIndex() {
  const start = new Date("2026-06-14");
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(1, Math.floor((today - start) / 86400000) + 1);
}

// ── GEMINI KEY from .env (REACT_APP_GEMINI_KEY) ───────────────────────────
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY || "";

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

function parseJSON(raw) {
  if (!raw) return null;
  const clean = raw.trim();
  try {
    return JSON.parse(clean);
  } catch {}

  try {
    const withoutMarkdown = clean
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(withoutMarkdown);
  } catch {}

  const firstCurly = clean.indexOf("{");
  const lastCurly = clean.lastIndexOf("}");
  if (firstCurly !== -1 && lastCurly !== -1 && lastCurly > firstCurly) {
    try {
      return JSON.parse(clean.substring(firstCurly, lastCurly + 1));
    } catch {}
  }

  const firstSquare = clean.indexOf("[");
  const lastSquare = clean.lastIndexOf("]");
  if (firstSquare !== -1 && lastSquare !== -1 && lastSquare > firstSquare) {
    try {
      return JSON.parse(clean.substring(firstSquare, lastSquare + 1));
    } catch {}
  }

  return null;
}

// ── REACT BITS - STAGGERED SPRING LETTER ANIMATION ──────────────────────────
function AnimatedTitle({ text, delay = 0.04, className = "", style = {} }) {
  const words = text.split(" ");
  let charCount = 0;
  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          style={{
            display: "inline-block",
            marginRight: "0.25em",
            whiteSpace: "nowrap",
          }}
        >
          {word.split("").map((char, cIdx) => {
            const index = charCount++;
            return (
              <span
                key={cIdx}
                className="animate-letter"
                style={{
                  display: "inline-block",
                  animationDelay: `${index * delay}s`,
                  animationFillMode: "forwards",
                  opacity: 0,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function useCountdown() {
  const [t, setT] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = CAT_DATE - new Date();
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// DOT FIELD — physics-based, reacts everywhere on the hero including over text
function DotField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W,
      H,
      dots = [];
    // Dense fine grid; each dot gets random bias so scatter is never a perfect circle
    const SP = 20,
      BASE_R = 0.9,
      PUSH = 260;

    function resize() {
      const p = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = p.width;
      H = canvas.height = p.height;
      dots = [];
      for (let x = SP / 2; x < W; x += SP)
        for (let y = SP / 2; y < H; y += SP)
          dots.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            // Per-dot random directional bias breaks radial symmetry
            bx: (Math.random() - 0.5) * 2.2,
            by: (Math.random() - 0.5) * 2.2,
            // Per-dot sensitivity: some dots react sooner, some later
            sens: 0.4 + Math.random() * 1.1,
          });
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x,
        my = mouse.current.y;
      for (const d of dots) {
        const dx = d.x - mx,
          dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < PUSH && dist > 0.1) {
          const strength = 1 - dist / PUSH;
          // Skew force vector with per-dot bias — no two dots flee in the same direction
          const fx = (dx / dist + d.bx) * strength * strength * 12 * d.sens;
          const fy = (dy / dist + d.by) * strength * strength * 12 * d.sens;
          d.vx += fx;
          d.vy += fy;
        }
        d.vx *= 0.86;
        d.vy *= 0.86;
        d.x += d.vx + (d.ox - d.x) * 0.055;
        d.y += d.vy + (d.oy - d.y) * 0.055;
        const od = Math.sqrt((d.x - d.ox) ** 2 + (d.y - d.oy) ** 2);
        const disp = Math.min(od / 30, 1);
        const alpha = 0.13 + disp * 0.58;
        const r = BASE_R + disp * 2.2;
        const rr = Math.round(210 - disp * 90);
        const gg = Math.round(162 - disp * 84);
        const bb = Math.round(112 - disp * 68);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        ctx.fillRect(d.x - r * 0.5, d.y - r * 0.5, r, r);
      }
      raf.current = requestAnimationFrame(frame);
    }

    resize();
    frame();

    // Track mouse on WINDOW so it works even when hovering over child text nodes
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMove);
    canvas.parentElement.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

// NAV
function Nav({ active, setActive }) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "varc", label: "Daily RC" },
    { id: "syllabus", label: "Syllabus" },
    { id: "words", label: "Vocabulary" },
  ];
  return (
    <div
      style={{
        position: "sticky",
        top: 16,
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
        pointerEvents: "none",
      }}
    >
      <nav
        className="nav-bar"
        style={{
          pointerEvents: "auto",
          background: "rgba(255, 255, 255, 0.22)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          border: "none",
          borderRadius: "9999px",
          padding: "5px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          boxShadow:
            "0 10px 30px rgba(26, 18, 9, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
          width: "max-content",
        }}
      >
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: "9px 18px",
                background: isActive ? "#1A1209" : "transparent",
                border: "none",
                borderRadius: "9999px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "-0.01em",
                color: isActive ? "#FAF7F2" : "#6B5744",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                boxShadow: isActive ? "0 4px 12px rgba(26,18,9,0.18)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = "rgba(26, 18, 9, 0.06)";
                  e.target.style.color = "#1A1209";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#6B5744";
                }
              }}
            >
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// HERO
function Hero({ setActive }) {
  const { days, hours, minutes, seconds } = useCountdown();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const elapsed = getDayIndex();
  const totalPrep = 167;
  const pct = Math.min(100, Math.round((elapsed / totalPrep) * 100));
  const remaining = Math.floor((CAT_DATE - new Date()) / 86400000);

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning, future IIM grad! ☕";
    if (hr < 17) return "Good afternoon, time to crush DILR! 🧠";
    return "Good evening, keep grinding! 🌙";
  };

  const getDailyQuote = () => {
    const quotes = [
      "Commitment is doing what you said you were going to do, long after the mood you said it in has left you.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts. Stay focused!",
      "The only place where success comes before work is in the dictionary. Keep practicing daily! 📚",
      "It always seems impossible until it's done. Stay hungry, stay humble, and grind hard.",
      "Energy and persistence conquer all things. Your IIM dream seat is waiting for you! 🚀",
      "Productivity is being able to do things that you were never able to do before. Push your limits!",
      "Do not count the days, make the days count. Every RC passage and DILR set builds your future.",
    ];
    return quotes[getDayIndex() % quotes.length];
  };

  function Seg({ v, label }) {
    return (
      <div style={{ textAlign: "center", flex: 1 }}>
        <div
          className="countdown-seg-box"
          style={{
            background: "#1A1209",
            color: "#FAF7F2",
            borderRadius: 12,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontFamily: "monospace, sans-serif",
            fontVariantNumeric: "tabular-nums",
            boxShadow:
              "inset 0 2px 4px rgba(0,0,0,0.35), 0 4px 12px rgba(26,18,9,0.15)",
            border: "1px solid rgba(196, 136, 74, 0.25)",
          }}
        >
          {String(v ?? 0).padStart(2, "0")}
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#A0622A",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          {label}
        </div>
      </div>
    );
  }
  function Colon() {
    return (
      <div
        className="countdown-colon"
        style={{
          fontWeight: 900,
          color: "#D4A574",
          lineHeight: 1.8,
        }}
      >
        :
      </div>
    );
  }

  return (
    <div
      className="hero-container"
      style={{
        position: "relative",
        flex: 1,
        minHeight: 0,
        background: "#FAF7F2",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dot field fills the entire hero */}
      <DotField />

      {/* Two-column main layout */}
      <div
        className="hero-main-layout"
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "stretch",
          gap: 36,
          padding: "28px 52px 48px",
        }}
      >
        {/* LEFT: Identity + headline + quote */}
        <div
          className="hero-left-col"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Date + greeting row */}
          <div
            className="hero-greeting-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <div
              className="hero-date-pill animate-fade-in-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#F2EDE4",
                border: "1px solid #D4A574",
                borderRadius: 999,
                padding: "5px 16px",
                animationDelay: "0.1s",
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#7C4A1E",
                  animation: "pulse2 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#7C4A1E",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {today}
              </span>
            </div>
            <div
              className="hero-greeting animate-fade-in-up"
              style={{
                display: "inline-block",
                background: "rgba(196,136,74,0.12)",
                borderRadius: 8,
                padding: "5px 14px",
                fontSize: 13,
                fontWeight: 700,
                color: "#7C4A1E",
                letterSpacing: "-0.01em",
                animationDelay: "0.2s",
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              {getGreeting()}
            </div>
          </div>
          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Google Sans Display','Google Sans',sans-serif",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 900,
              color: "#1A1209",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              position: "relative",
              zIndex: 2,
            }}
          >
            <AnimatedTitle text="Your IIM dream." delay={0.05} />
            <br />
            <div
              style={{
                display: "inline-block",
                position: "relative",
                marginTop: 6,
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #7C4A1E 0%, #C4884A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Make it happen.
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: "5%",
                  right: "5%",
                  height: 3,
                  background: "linear-gradient(90deg, #7C4A1E, #C4884A)",
                  borderRadius: 999,
                  transform: "scaleX(0)",
                  transformOrigin: "center",
                  animation:
                    "expand-underline 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
                  animationDelay: "0.8s",
                }}
              />
            </div>
          </h1>

          {/* Subtitle — snug below headline, not floating */}
          <p
            className="hero-subtitle animate-fade-in-up"
            style={{
              color: "#6B5744",
              fontSize: 15,
              letterSpacing: "-0.01em",
              margin: "16px 0 0",
              animationDelay: "0.35s",
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            CAT 2026 · 29 November 2026
          </p>

          {/* Quote — pinned to bottom */}
          <div
            className="hero-quote animate-fade-in-up"
            style={{
              borderLeft: "3px solid #C4884A",
              paddingLeft: 16,
              paddingTop: 4,
              animationDelay: "0.45s",
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#A0622A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Daily Quote ✍️
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: "#2C1E0F",
                fontStyle: "italic",
                fontFamily: "Georgia, serif",
                lineHeight: 1.6,
              }}
            >
              "{getDailyQuote()}"
            </div>
          </div>
        </div>

        {/* RIGHT: Countdown + Progress stacked */}
        <div
          className="hero-right-col"
          style={{
            width: "min(500px, 46%)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Countdown HUD */}
          <div
            className="hud-card animate-fade-in-up hover-lift"
            style={{
              background: "rgba(255, 255, 255, 0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1.5px solid #EDE4D8",
              borderRadius: 20,
              boxShadow: "0 10px 30px rgba(124, 74, 30, 0.03)",
              animationDelay: "0.3s",
              animationFillMode: "forwards",
              opacity: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Label */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#A0622A",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Countdown to Main Event ⏱️
            </div>

            {/* Segments */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <Seg v={days} label="Days" />
              <Colon />
              <Seg v={hours} label="Hours" />
              <Colon />
              <Seg v={minutes} label="Mins" />
              <Colon />
              <Seg v={seconds} label="Secs" />
            </div>

            {/* Cats illustration — drop cats-vector.png into public/ */}
            <div
              style={{
                marginTop: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <img
                src="/cats-vector.png"
                alt="study cats"
                style={{
                  width: "100%",
                  maxHeight: 90,
                  objectFit: "contain",
                  objectPosition: "bottom",
                  mixBlendMode: "multiply",
                  opacity: 0.88,
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Progress HUD */}
          <div
            className="hud-card animate-fade-in-up hover-lift"
            style={{
              background: "rgba(255, 255, 255, 0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1.5px solid #EDE4D8",
              borderRadius: 20,
              boxShadow: "0 10px 30px rgba(124, 74, 30, 0.03)",
              textAlign: "left",
              animationDelay: "0.4s",
              animationFillMode: "forwards",
              opacity: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#A0622A",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Velocity Metric
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#7C4A1E",
                  background: "#F5EDE2",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                Streak: active 🔥
              </span>
            </div>

            {/* Ring + stats row */}
            <div
              className="ring-stats-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flex: 1,
              }}
            >
              {/* Circular progress ring */}
              <svg
                viewBox="0 0 130 130"
                width="120"
                height="120"
                style={{ flexShrink: 0 }}
              >
                <defs>
                  <linearGradient
                    id="ringGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#A0622A" />
                    <stop offset="100%" stopColor="#C4884A" />
                  </linearGradient>
                </defs>
                {/* Outer decorative ring */}
                <circle
                  cx="65"
                  cy="65"
                  r="60"
                  fill="none"
                  stroke="#F0E8DC"
                  strokeWidth="1.5"
                  strokeDasharray="3 6"
                />
                {/* Background track */}
                <circle
                  cx="65"
                  cy="65"
                  r="50"
                  fill="none"
                  stroke="#E8DDD0"
                  strokeWidth="12"
                />
                {/* Progress arc */}
                <circle
                  cx="65"
                  cy="65"
                  r="50"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(2 * Math.PI * 50 * Math.max(pct, 1)) / 100} ${2 * Math.PI * 50}`}
                  transform="rotate(-90 65 65)"
                />
                {/* Inner decorative ring */}
                <circle
                  cx="65"
                  cy="65"
                  r="36"
                  fill="none"
                  stroke="#F0E8DC"
                  strokeWidth="1"
                />
                {/* Center: percentage */}
                <text
                  x="65"
                  y="63"
                  textAnchor="middle"
                  fill="#1A1209"
                  fontSize="22"
                  fontWeight="900"
                  fontFamily="monospace"
                >
                  {pct}%
                </text>
                <text
                  x="65"
                  y="77"
                  textAnchor="middle"
                  fill="#A0622A"
                  fontSize="9"
                  fontWeight="800"
                  letterSpacing="1"
                >
                  COMPLETE
                </text>
                {/* Tick marks at 25% intervals */}
                {[0, 90, 180, 270].map((deg, i) => {
                  const rad = ((deg - 90) * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={65 + 43 * Math.cos(rad)}
                      y1={65 + 43 * Math.sin(rad)}
                      x2={65 + 57 * Math.cos(rad)}
                      y2={65 + 57 * Math.sin(rad)}
                      stroke="#D9CFC0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>

              {/* Right stats */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div>
                  <div
                    className="stat-num"
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: "#1A1209",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {elapsed}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6B5744",
                      fontWeight: 600,
                      marginTop: 2,
                    }}
                  >
                    days studied
                  </div>
                </div>
                <div style={{ height: 1, background: "#EDE4D8" }} />
                <div>
                  <div
                    className="stat-num"
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: "#C4884A",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {totalPrep - elapsed}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6B5744",
                      fontWeight: 600,
                      marginTop: 2,
                    }}
                  >
                    days to go
                  </div>
                </div>
                <div style={{ height: 1, background: "#EDE4D8" }} />
                {/* Mini progress bar */}
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#A0622A",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      marginBottom: 6,
                      textTransform: "uppercase",
                    }}
                  >
                    {totalPrep} Day Journey
                  </div>
                  <div
                    style={{
                      background: "#E8DDD0",
                      borderRadius: 999,
                      height: 8,
                      overflow: "hidden",
                      border: "1px solid #D9CFC0",
                    }}
                  >
                    <div
                      className="progress-bar-animated"
                      style={{
                        width: `${Math.max(pct, 1)}%`,
                        height: "100%",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="hero-footer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          borderTop: "1px solid #D9CFC0",
          padding: "12px 36px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          background: "rgba(250,247,242,0.75)",
        }}
      >
        <span style={{ fontSize: 11, color: "#A0927A", fontWeight: 600 }}>
          {remaining} days remaining
        </span>
      </div>
    </div>
  );
}

// ── VARC ──────────────────────────────────────────────────────────────────
function VARCSection() {
  const [rc1, setRc1] = useState(null);
  const [rc2, setRc2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const today = getTodayKey();

  const [scores, setScores] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cat_varc_scores_v3") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const c = localStorage.getItem(`varc3_${today}`);
    if (c) {
      try {
        const d = JSON.parse(c);
        setRc1(d.rc1);
        setRc2(d.rc2);
      } catch {}
    } else {
      fetchRCs();
    }

    // Load saved answers for today if any
    try {
      const savedAnswers = localStorage.getItem(`varc_answers_${today}`);
      const savedRevealed = localStorage.getItem(`varc_revealed_${today}`);
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedRevealed) setRevealed(JSON.parse(savedRevealed));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save answers & revealed states in real-time
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(`varc_answers_${today}`, JSON.stringify(answers));
    }
    if (Object.keys(revealed).length > 0) {
      localStorage.setItem(`varc_revealed_${today}`, JSON.stringify(revealed));
    }
  }, [answers, revealed, today]);

  // Score calculation
  useEffect(() => {
    if (!rc1 && !rc2) return;
    let correct = 0;
    let total = 0;

    const checkRC = (rc, num) => {
      if (!rc?.questions) return;
      rc.questions.forEach((q, qi) => {
        const qk = `r${num}q${qi}`;
        if (revealed[qk]) {
          total++;
          if (answers[qk] === q.answer) {
            correct++;
          }
        }
      });
    };
    checkRC(rc1, 1);
    checkRC(rc2, 2);

    if (total > 0) {
      setScores((prev) => {
        const next = { ...prev, [today]: { correct, total } };
        localStorage.setItem("cat_varc_scores_v3", JSON.stringify(next));
        return next;
      });
    }
  }, [answers, revealed, rc1, rc2, today]);

  async function fetchRCs() {
    setLoading(true);
    try {
      const di = getDayIndex();
      const g1 = GENRES[di % GENRES.length],
        g2 = GENRES[(di + 1) % GENRES.length];
      const makePrompt = (g, s) =>
        `You are a CAT exam VARC expert. Create a Reading Comprehension passage for a student preparing for CAT 2026.\n\n` +
        `Genre: ${g}\n` +
        `Passage length: 300 to 380 words. Write a dense, intellectually rich passage.\n` +
        `Then write exactly 4 multiple choice questions based on the passage.\n` +
        `Question types: main idea, inference, vocabulary in context, author's tone or purpose.\n\n` +
        `Respond with ONLY a JSON object. No explanation, no markdown, no code fences. Pure JSON.\n\n` +
        `Use this exact structure:\n` +
        `{\n` +
        `  "passage": "<the full passage text here>",\n` +
        `  "genre": "${g}",\n` +
        `  "questions": [\n` +
        `    {\n` +
        `      "id": 1,\n` +
        `      "text": "<question text>",\n` +
        `      "options": { "A": "<option A>", "B": "<option B>", "C": "<option C>", "D": "<option D>" },\n` +
        `      "answer": "B",\n` +
        `      "explanation": "<why the answer is correct>"\n` +
        `    }\n` +
        `  ]\n` +
        `}\n\n` +
        `Variation seed: ${s}`;
      const [t1, t2] = await Promise.all([
        callGemini(makePrompt(g1, di)),
        callGemini(makePrompt(g2, di + 100)),
      ]);
      const r1 = parseJSON(t1),
        r2 = parseJSON(t2);
      if (r1 && r2) {
        setRc1(r1);
        setRc2(r2);
        localStorage.setItem(
          `varc3_${today}`,
          JSON.stringify({ rc1: r1, rc2: r2 }),
        );
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (e) {
      console.error("VARC fetch error, using fallback:", e);
      const fallbackIdx = getDayIndex() % FALLBACK_RCS.length;
      const fb = FALLBACK_RCS[fallbackIdx];
      setRc1(fb.rc1);
      setRc2(fb.rc2);
      localStorage.setItem(
        `varc3_${today}`,
        JSON.stringify({ rc1: fb.rc1, rc2: fb.rc2 }),
      );
    }
    setLoading(false);
  }

  function RCCard({ rc, num }) {
    if (!rc) return null;
    return (
      <div
        className="rc-card hover-lift"
        style={{
          background: "#FFFDF9",
          border: "1px solid #D9CFC0",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 36,
        }}
      >
        <div
          style={{
            background: "#1A1209",
            padding: "14px 26px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              color: "#C4884A",
              fontWeight: 800,
              fontSize: 11.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Passage {num}
          </span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12.5 }}>
            {rc.genre}
          </span>
        </div>
        <div className="rc-card-content" style={{ padding: "26px 28px 8px" }}>
          <p
            className="rc-passage-text"
            style={{
              fontSize: 15,
              lineHeight: 1.88,
              color: "#2C1E0F",
              background: "#FAF4EC",
              border: "1px solid #EDE0CC",
              borderRadius: 10,
              padding: "22px 24px",
              marginBottom: 30,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {rc.passage}
          </p>
          {rc.questions?.map((q, qi) => {
            const qk = `r${num}q${qi}`;
            const sel = answers[qk],
              show = revealed[qk];
            return (
              <div
                key={qi}
                style={{
                  marginBottom: 26,
                  paddingBottom: 26,
                  borderBottom: qi < 3 ? "1px solid #EDE4D8" : "none",
                }}
              >
                <p
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: "#1A1209",
                    marginBottom: 14,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.5,
                  }}
                >
                  {qi + 1}. {q.text}
                </p>
                <div
                  className="options-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 9,
                    marginBottom: 14,
                  }}
                >
                  {Object.entries(q.options).map(([k, v]) => {
                    let bg = "#F5EEE5",
                      bd = "#D9CFC0",
                      col = "#2C1E0F";
                    if (sel === k && !show) {
                      bg = "#F2E6D4";
                      bd = "#A0622A";
                      col = "#7C4A1E";
                    }
                    if (show) {
                      if (k === q.answer) {
                        bg = "#EDF5E5";
                        bd = "#70A840";
                        col = "#2D5C10";
                      } else if (sel === k) {
                        bg = "#F5E8E8";
                        bd = "#C06060";
                        col = "#7C1A1A";
                      }
                    }
                    return (
                      <button
                        key={k}
                        onClick={() =>
                          !show && setAnswers((a) => ({ ...a, [qk]: k }))
                        }
                        className="option-btn"
                        style={{
                          background: bg,
                          border: `1.5px solid ${bd}`,
                          borderRadius: 9,
                          padding: "10px 14px",
                          textAlign: "left",
                          fontSize: 13.5,
                          color: col,
                          cursor: show ? "default" : "pointer",
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ fontWeight: 800, minWidth: 16 }}>
                          {k}.
                        </span>
                        <span>{v}</span>
                      </button>
                    );
                  })}
                </div>
                {!show ? (
                  <button
                    onClick={() => setRevealed((r) => ({ ...r, [qk]: true }))}
                    style={{
                      fontSize: 12.5,
                      color: "#7C4A1E",
                      background: "none",
                      border: "1px solid #C4884A",
                      borderRadius: 7,
                      padding: "5px 14px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Show Answer
                  </button>
                ) : (
                  <div
                    style={{
                      background: "#F5EEE0",
                      border: "1px solid #D4A574",
                      borderRadius: 8,
                      padding: "10px 16px",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ fontWeight: 800, color: "#5C3A1A" }}>
                      ✓ Answer: {q.answer}
                    </span>
                    <span style={{ color: "#6B5744", marginLeft: 10 }}>
                      {q.explanation}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const todayScore = scores[today];
  const history = Object.entries(scores)
    .filter(([date]) => date !== today)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .slice(0, 5);

  let totalCorrect = 0;
  let totalQuestions = 0;
  Object.values(scores).forEach((s) => {
    totalCorrect += s.correct;
    totalQuestions += s.total;
  });
  const accuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <PageWrap>
      <PageHeader
        label="VARC"
        title="Daily Reading Comprehension"
        sub="Two CAT-level passages · four questions each · fresh every morning"
      />

      {/* Score Tracker Card */}
      <div
        className="score-tracker-card hover-lift progress-card-effect"
        style={{
          background: "#FFFDF9",
          border: "1px solid #D4A574",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ minWidth: 200 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#A0622A",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Daily RC Performance
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: "#1A1209" }}>
              {todayScore ? `${todayScore.correct}/${todayScore.total}` : "0/0"}
            </span>
            <span style={{ fontSize: 13, color: "#6B5744" }}>
              today's score
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#8A755D", marginTop: 4 }}>
            Overall Accuracy: <strong>{accuracy}%</strong> ({totalCorrect}/
            {totalQuestions} questions correct)
          </div>
        </div>

        {history.length > 0 && (
          <div
            className="score-history-col"
            style={{
              borderLeft: "1px solid #EDE4D8",
              paddingLeft: 24,
              flex: 1,
              minWidth: 240,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#6B5744",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Recent Scores History
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {history.map(([date, score]) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                  },
                );
                const pct = Math.round((score.correct / score.total) * 100);
                return (
                  <div
                    key={date}
                    style={{
                      background: "#FAF4EC",
                      border: "1px solid #EDE0CC",
                      borderRadius: 8,
                      padding: "6px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 10, color: "#8A755D" }}>
                      {formattedDate}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#1A1209",
                      }}
                    >
                      {score.correct}/{score.total}
                    </div>
                    <div
                      style={{ fontSize: 9, color: "#A0622A", fontWeight: 700 }}
                    >
                      {pct}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <Spinner text="Crafting today's passages…" />
      ) : (
        <>
          <RCCard rc={rc1} num={1} />
          <RCCard rc={rc2} num={2} />
        </>
      )}
    </PageWrap>
  );
}

// ── SYLLABUS ──────────────────────────────────────────────────────────────
function SyllabusSection() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cat_ck3") || "{}");
    } catch {
      return {};
    }
  });
  const [filter, setFilter] = useState("All");

  function toggle(id) {
    const n = { ...checked, [id]: !checked[id] };
    setChecked(n);
    localStorage.setItem("cat_ck3", JSON.stringify(n));
  }

  const total = SYLLABUS.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
  const filtered =
    filter === "All" ? SYLLABUS : SYLLABUS.filter((t) => t.section === filter);
  const grouped = {};
  for (const t of filtered) {
    if (!grouped[t.section]) grouped[t.section] = [];
    grouped[t.section].push(t);
  }

  return (
    <PageWrap>
      <PageHeader
        label="SYLLABUS"
        title="Topic Progress Tracker"
        sub="Check off topics as you master them — progress saved in your browser"
      />

      {/* 3D Flip Progress Card */}
      <div className="syllabus-flip-card">
        <div className="syllabus-flip-card-inner">
          {/* Front Side */}
          <div className="syllabus-flip-card-front progress-card-effect">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#C4884A",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Overall Progress
                </div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    fontFamily:
                      "'Google Sans Display','Google Sans',sans-serif",
                    color: "#FAF7F2",
                  }}
                >
                  {pct}
                  <span style={{ fontSize: 26, color: "#C4884A" }}>%</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: "#D4A574",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {done}
                </div>
                <div style={{ fontSize: 12, color: "#A0927A" }}>
                  of {total} topics
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 999,
                height: 12,
                overflow: "hidden",
                marginBottom: 16,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="progress-bar-animated"
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  borderRadius: 999,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                {["Quant", "LRDI", "VARC"].map((s) => {
                  const items = SYLLABUS.filter((t) => t.section === s);
                  const d = items.filter((t) => checked[t.id]).length;
                  return (
                    <div
                      key={s}
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          background: SEC_STYLE[s].border,
                        }}
                      />
                      <span style={{ fontSize: 12, color: "#A0927A" }}>
                        {s}{" "}
                        <strong style={{ color: SEC_STYLE[s].border }}>
                          {d}/{items.length}
                        </strong>
                      </span>
                    </div>
                  );
                })}
              </div>
              <span
                className="syllabus-hover-hint"
                style={{
                  fontSize: 11,
                  color: "#C4884A",
                  opacity: 0.8,
                  letterSpacing: "0.05em",
                }}
              >
                Hover to see stats ⟳
              </span>
            </div>
          </div>

          {/* Back Side */}
          <div className="syllabus-flip-card-back progress-card-effect">
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#C4884A",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Section Progress Breakdown
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
              }}
            >
              {["Quant", "LRDI", "VARC"].map((s) => {
                const items = SYLLABUS.filter((t) => t.section === s);
                const d = items.filter((t) => checked[t.id]).length;
                const sp = Math.round((d / items.length) * 100) || 0;
                return (
                  <div key={s} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "#FAF7F2" }}>
                        {s} Section
                      </span>
                      <span style={{ color: "#D4A574", fontWeight: 700 }}>
                        {d} / {items.length} done ({sp}%)
                      </span>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 999,
                        height: 8,
                        overflow: "hidden",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div
                        className="progress-bar-animated"
                        style={{
                          width: `${sp}%`,
                          background: SEC_STYLE[s].border,
                          height: "100%",
                          borderRadius: 999,
                          position: "relative",
                          overflow: "hidden",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}
      >
        {["All", "Quant", "LRDI", "VARC"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "7px 18px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              border: "1.5px solid",
              transition: "all 0.15s",
              background: filter === s ? "#1A1209" : "transparent",
              color: filter === s ? "#FAF7F2" : "#7C4A1E",
              borderColor: filter === s ? "#1A1209" : "#C4884A",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([sec, topics]) => {
        const c = SEC_STYLE[sec];
        const sd = topics.filter((t) => checked[t.id]).length;
        const sp = Math.round((sd / topics.length) * 100);
        return (
          <div
            key={sec}
            className="hover-lift"
            style={{
              marginBottom: 18,
              background: "#FFFDF9",
              border: `1px solid ${c.border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: c.light,
                padding: "13px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${c.border}`,
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 14,
                  color: c.accent,
                  letterSpacing: "-0.01em",
                }}
              >
                {sec}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 100,
                    background: "#E8DDD0",
                    borderRadius: 999,
                    height: 8,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="progress-bar-animated"
                    style={{
                      width: `${sp}%`,
                      background: c.accent,
                      height: "100%",
                      borderRadius: 999,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  />
                </div>
                <span
                  style={{ fontSize: 12, color: c.accent, fontWeight: 700 }}
                >
                  {sd}/{topics.length}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              }}
            >
              {topics.map((t) => (
                <label
                  key={t.id}
                  onClick={() => toggle(t.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 18px",
                    cursor: "pointer",
                    background: checked[t.id] ? c.light : "transparent",
                    borderBottom: "1px solid #F5EEE5",
                    transition: "background 0.12s",
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      flexShrink: 0,
                      border: `2px solid ${checked[t.id] ? c.accent : "#C8B8A2"}`,
                      background: checked[t.id] ? c.accent : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.12s",
                    }}
                  >
                    {checked[t.id] && (
                      <span
                        style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: checked[t.id] ? "#A0927A" : "#2C1E0F",
                      textDecoration: checked[t.id] ? "line-through" : "none",
                      lineHeight: 1.4,
                      transition: "all 0.12s",
                    }}
                  >
                    {t.topic}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </PageWrap>
  );
}

// ── WORDS ─────────────────────────────────────────────────────────────────
function WordsSection() {
  const [words, setWords] = useState(null);
  const [loading, setLoading] = useState(false);
  const today = getTodayKey();

  useEffect(() => {
    const c = localStorage.getItem(`words3_${today}`);
    if (c) {
      try {
        setWords(JSON.parse(c));
      } catch {}
      return;
    }
    fetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchWords() {
    setLoading(true);
    try {
      const prompt =
        `You are a CAT (Common Admission Test) exam vocabulary expert specializing in the VARC (Verbal Ability & Reading Comprehension) section.\n\n` +
        `Generate exactly 5 high-yield, sophisticated English vocabulary words that are highly relevant to a student preparing for CAT 2026.\n` +
        `Focus on academic, esoteric, philosophical, and critical-reasoning terms commonly found in dense reading comprehension passages (such as those from Aeon, The Economist, Smithsonian, or London Review of Books).\n` +
        `Avoid general or overly simplistic GRE list words (like 'happy' or 'adorn'). Instead, choose high-cognitive-load words like 'dichotomy', 'hegemony', 'paradigm', 'epistemic', 'ontology', 'anomalous', 'hermeneutic', 'dialectic', 'teleological', 'reify', etc.\n\n` +
        `Respond with ONLY a JSON object. No explanation, no markdown, no code fences. Pure JSON.\n\n` +
        `Use this exact structure:\n` +
        `{\n` +
        `  "words": [\n` +
        `    {\n` +
        `      "word": "<the vocabulary word>",\n` +
        `      "part_of_speech": "<noun or verb or adjective or adverb>",\n` +
        `      "meaning": "<precise, clear definition, highlighting its contextual nuance in academic writing>",\n` +
        `      "example": "<a rich, sophisticated academic/literary sentence using the word naturally in a CAT RC-style context>"\n` +
        `    }\n` +
        `  ]\n` +
        `}`;
      const raw = await callGemini(prompt);
      const d = parseJSON(raw);
      if (d?.words && d.words.length > 0) {
        setWords(d.words);
        localStorage.setItem(`words3_${today}`, JSON.stringify(d.words));
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (e) {
      console.error("Words fetch error, using fallback:", e);
      const fallbackIdx = getDayIndex() % FALLBACK_WORDS.length;
      const fb = FALLBACK_WORDS[fallbackIdx];
      setWords(fb);
      localStorage.setItem(`words3_${today}`, JSON.stringify(fb));
    }
    setLoading(false);
  }

  return (
    <PageWrap>
      <PageHeader
        label="VOCABULARY"
        title="Words of the Day"
        sub="5 CAT-grade words · example sentences · AI sentence checker"
      />
      {loading ? (
        <Spinner text="Selecting today's words…" />
      ) : words ? (
        words.map((w, i) => (
          <WordCard key={i} word={w} dayKey={today} idx={i} />
        ))
      ) : null}
    </PageWrap>
  );
}

function WordCard({ word, dayKey, idx }) {
  const sk = `wi3_${dayKey}_${idx}`;
  const [inputs, setInputs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(sk) || "{}");
    } catch {
      return {};
    }
  });
  const [results, setResults] = useState({});
  const [checking, setChecking] = useState({});
  const [open, setOpen] = useState(false);

  function setInput(i, v) {
    const n = { ...inputs, [i]: v };
    setInputs(n);
    localStorage.setItem(sk, JSON.stringify(n));
  }

  async function check(i) {
    if (!inputs[i]?.trim()) return;
    setChecking((c) => ({ ...c, [i]: true }));
    try {
      const prompt =
        `You are a strict vocabulary teacher checking a student's sentence.\n` +
        `Word: "${word.word}"\n` +
        `Meaning: "${word.meaning}"\n` +
        `Student's sentence: "${inputs[i]}"\n\n` +
        `Evaluate whether the student used the word correctly and naturally.\n` +
        `Respond with ONLY a JSON object. No explanation, no markdown, no code fences. Pure JSON.\n\n` +
        `{\n` +
        `  "correct": true,\n` +
        `  "score": 8,\n` +
        `  "feedback": "<1-2 sentence feedback on correct usage or how to improve>"\n` +
        `}`;
      const raw = await callGemini(prompt);
      const r = parseJSON(raw);
      if (r) setResults((res) => ({ ...res, [i]: r }));
    } catch (e) {
      console.error("Check error:", e);
    }
    setChecking((c) => ({ ...c, [i]: false }));
  }

  return (
    <div
      className="hover-lift"
      style={{
        background: "#FFFDF9",
        border: "1px solid #D9CFC0",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <div
        className="word-card-header"
        style={{
          padding: "16px 22px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        onClick={() => setOpen(!open)}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#1A1209",
                fontFamily: "Georgia,'Times New Roman',serif",
                letterSpacing: "-0.01em",
              }}
            >
              {word.word}
            </span>
            <span
              style={{
                fontSize: 10.5,
                color: "#7C4A1E",
                background: "#F5EDE2",
                padding: "2px 9px",
                borderRadius: 999,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {word.part_of_speech}
            </span>
          </div>
          <p
            style={{
              fontSize: 13.5,
              color: "#6B5744",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {word.meaning}
          </p>
        </div>
        <span
          style={{
            color: "#C4884A",
            fontSize: 18,
            marginLeft: 14,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        >
          ▾
        </span>
      </div>
      <div className={`word-details ${open ? "open" : ""}`}>
        <div className="word-details-inner">
          <div className="word-card-details" style={{ padding: "18px 22px" }}>
            <div
              className="word-card-example"
              style={{
                background: "#FAF0E0",
                border: "1px solid #DDC8A0",
                borderRadius: 9,
                padding: "13px 18px",
                marginBottom: 20,
                fontSize: 14.5,
                color: "#4A3010",
                fontStyle: "italic",
                fontFamily: "Georgia,serif",
                lineHeight: 1.75,
              }}
            >
              "{word.example}"
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#2C1E0F",
                marginBottom: 14,
                letterSpacing: "-0.01em",
              }}
            >
              Practice — write 5 sentences using{" "}
              <em style={{ color: "#7C4A1E" }}>{word.word}</em>
            </p>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div
                  className="practice-row"
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "#A0927A",
                      minWidth: 20,
                      paddingTop: 10,
                    }}
                  >
                    {i + 1}.
                  </span>
                  <textarea
                    value={inputs[i] || ""}
                    onChange={(e) => setInput(i, e.target.value)}
                    placeholder={`Write sentence ${i + 1}…`}
                    rows={2}
                    style={{
                      flex: 1,
                      border: "1.5px solid #D9CFC0",
                      borderRadius: 8,
                      padding: "9px 13px",
                      fontSize: 13.5,
                      resize: "vertical",
                      fontFamily: "inherit",
                      color: "#2C1E0F",
                      background: "#FAF7F2",
                      outline: "none",
                      transition: "border-color 0.15s",
                    }}
                  />
                  <button
                    onClick={() => check(i)}
                    disabled={checking[i] || !inputs[i]?.trim()}
                    style={{
                      padding: "9px 16px",
                      background: inputs[i]?.trim() ? "#1A1209" : "#E8DDD0",
                      color: inputs[i]?.trim() ? "#FAF7F2" : "#A0927A",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: inputs[i]?.trim() ? "pointer" : "default",
                      alignSelf: "flex-start",
                      minWidth: 68,
                      transition: "all 0.15s",
                    }}
                  >
                    {checking[i] ? "…" : "Check"}
                  </button>
                </div>
                {results[i] && (
                  <div
                    style={{
                      marginLeft: 28,
                      padding: "8px 14px",
                      borderRadius: 8,
                      fontSize: 12.5,
                      background: results[i].correct ? "#EDF5E5" : "#F5E8E8",
                      border: `1px solid ${results[i].correct ? "#85B855" : "#C07070"}`,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        color: results[i].correct ? "#2D5C10" : "#7C1A1A",
                      }}
                    >
                      {results[i].correct ? "✓ Correct!" : "✗ Needs work"}
                    </span>
                    {results[i].score != null && (
                      <span
                        style={{
                          margin: "0 8px",
                          opacity: 0.65,
                          fontSize: 11.5,
                        }}
                      >
                        ({results[i].score}/10)
                      </span>
                    )}
                    <span
                      style={{
                        color: results[i].correct ? "#3D6B15" : "#8B3030",
                      }}
                    >
                      {results[i].feedback}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SHARED UI ─────────────────────────────────────────────────────────────
function PageWrap({ children }) {
  return (
    <div
      className="page-wrap animate-fade-in-up"
    >
      {children}
    </div>
  );
}
function PageHeader({ label, title, sub }) {
  return (
    <div style={{ marginBottom: 38 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: "#A0622A",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontFamily: "'Google Sans Display','Google Sans',sans-serif",
          fontSize: "clamp(28px,4vw,50px)",
          fontWeight: 900,
          color: "#1A1209",
          margin: "0 0 8px",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "#6B5744",
          fontSize: 15,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {sub}
      </p>
      <div
        style={{
          width: 38,
          height: 3,
          background: "#7C4A1E",
          borderRadius: 999,
          marginTop: 16,
        }}
      />
    </div>
  );
}
function Spinner({ text }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "64px 0",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          border: "3px solid #EDE4D8",
          borderTop: "3px solid #7C4A1E",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
        }}
      />
      <p style={{ color: "#6B5744", fontSize: 14, letterSpacing: "-0.01em" }}>
        {text}
      </p>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");

  function go(id) {
    setActive(id);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
  }

  return (
    <div
      className="app-container"
      style={{
        fontFamily: "'Google Sans','Segoe UI',system-ui,sans-serif",
        background: "#FAF7F2",
        minHeight: "100vh",
        color: "#1A1209",
        ...(active === "home" && {
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }),
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulse2{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.3;transform:scale(0.85);}}
        textarea:focus{border-color:#7C4A1E!important;}
        button:active{transform:scale(0.97);}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#F2EDE4;}
        ::-webkit-scrollbar-thumb{background:#C4884A;border-radius:3px;}

        /* React Bits inspired custom animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes shiny-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes blur-reveal {
          0% {
            filter: blur(12px);
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          100% {
            filter: blur(0px);
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        @keyframes progress-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes progress-card-glow {
          0% { box-shadow: 0 8px 32px rgba(124, 74, 30, 0.05), 0 0 0px rgba(196, 136, 74, 0.2); }
          50% { box-shadow: 0 8px 32px rgba(124, 74, 30, 0.15), 0 0 15px rgba(196, 136, 74, 0.4); }
          100% { box-shadow: 0 8px 32px rgba(124, 74, 30, 0.05), 0 0 0px rgba(196, 136, 74, 0.2); }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px) scale(1.005);
          box-shadow: 0 16px 36px rgba(124, 74, 30, 0.07);
          border-color: #D4A574 !important;
        }
        .hover-lift:active {
          transform: translateY(-2px);
        }

        .option-btn {
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .option-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 74, 30, 0.05);
          border-color: #A0622A !important;
        }
        .option-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .progress-bar-animated {
          background: linear-gradient(90deg, #A0622A, #C4884A, #A0622A);
          background-size: 200% auto;
          position: relative;
          overflow: hidden;
          transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .progress-bar-animated::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,120 L0,120 Z' fill='white' opacity='0.35'/%3E%3Cpath d='M0,70 C150,30 350,110 600,70 C850,30 1050,110 1200,70 L1200,120 L0,120 Z' fill='white' opacity='0.18'/%3E%3C/svg%3E");
          background-size: 50% 100%;
          background-repeat: repeat-x;
          animation: wave-move-forward 3.5s linear infinite;
          pointer-events: none;
        }
        @keyframes wave-move-forward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .progress-card-effect {
          animation: progress-card-glow 4s ease-in-out infinite;
          border: 1px solid rgba(196, 136, 74, 0.35) !important;
        }

        @keyframes letter-spring {
          0% {
            opacity: 0;
            transform: translateY(25px) scale(0.6) rotate(8deg);
            filter: blur(4px);
          }
          65% {
            opacity: 0.85;
            transform: translateY(-8px) scale(1.08) rotate(-3deg);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }
        .animate-letter {
          animation: letter-spring 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* 3D Syllabus Flip Card */
        .syllabus-flip-card {
          perspective: 1200px;
          background-color: transparent;
          height: 240px;
          margin-bottom: 28px;
        }
        .syllabus-flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: left;
          transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform-style: preserve-3d;
        }
        .syllabus-flip-card:hover .syllabus-flip-card-inner {
          transform: rotateX(180deg);
        }
        .syllabus-flip-card-front, .syllabus-flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 20px;
          padding: 32px 38px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(26, 18, 9, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .syllabus-flip-card-front {
          background: linear-gradient(135deg, rgba(26, 18, 9, 0.96) 0%, rgba(42, 28, 14, 0.98) 100%);
          color: #FAF7F2;
          border: 1px solid rgba(196, 136, 74, 0.35);
          backdrop-filter: blur(20px);
        }
        .syllabus-flip-card-back {
          background: linear-gradient(135deg, rgba(26, 18, 9, 0.96) 0%, rgba(42, 28, 14, 0.98) 100%);
          color: #FAF7F2;
          transform: rotateX(180deg);
          border: 1px solid rgba(196, 136, 74, 0.35);
          backdrop-filter: blur(20px);
        }

        @keyframes expand-underline {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        /* Smooth Word Card details expander using CSS Grid height transition */
        .word-details {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          overflow: hidden;
          border-top: 1px solid transparent;
          transition: grid-template-rows 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease, border-color 0.4s ease;
        }
        .word-details.open {
          grid-template-rows: 1fr;
          opacity: 1;
          border-top: 1px solid #EDE4D8;
        }
        .word-details-inner {
          min-height: 0;
          overflow: hidden;
        }

        /* Responsiveness & Media Queries */
        .page-wrap {
          max-width: 1040px;
          margin: 0 auto;
          padding: 64px 32px 100px;
        }
        .hero-headline {
          margin-top: 150px;
        }
        .hero-quote {
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .app-container {
            height: auto !important;
            overflow: visible !important;
          }
          .hero-container {
            height: auto !important;
            overflow: visible !important;
          }
          .hero-main-layout {
            flex-direction: column !important;
            padding: 42px 20px 30px !important;
            align-items: stretch !important;
            gap: 28px !important;
          }
          .hero-headline {
            margin-top: 24px !important;
          }
          .hero-quote {
            margin-top: 36px !important;
            margin-bottom: 20px !important;
          }
          .hero-right-col {
            width: 100% !important;
            max-width: 350px !important;
            margin: 0 auto !important;
          }
          .hero-footer {
            position: static !important;
            padding: 16px 20px !important;
            background: #FAF7F2 !important;
            justify-content: center !important;
            border-top: 1px solid #EDE4D8 !important;
          }
          .hud-card {
            padding: 16px 16px !important;
            flex: none !important;
          }
          .countdown-seg-box {
            padding: 10px 4px !important;
            font-size: clamp(18px, 3.5vw, 24px) !important;
            border-radius: 8px !important;
          }
          .countdown-colon {
            font-size: 16px !important;
            padding-bottom: 4px !important;
          }
          .rc-card-content {
            padding: 16px 14px 8px !important;
          }
          .rc-passage-text {
            padding: 14px 16px !important;
          }
        }

        @media (max-width: 768px) {
          .syllabus-flip-card {
            height: auto !important;
            perspective: none !important;
          }
          .syllabus-flip-card-inner {
            transform: none !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          .syllabus-flip-card-front, .syllabus-flip-card-back {
            position: static !important;
            height: auto !important;
            transform: none !important;
            backface-visibility: visible !important;
            padding: 24px 20px !important;
          }
          .syllabus-flip-card-back {
            transform: none !important;
          }
          .syllabus-hover-hint {
            display: none !important;
          }
        }

        /* Default HUD and Countdown classes */
        .hud-card {
          padding: 22px 26px;
        }
        .countdown-seg-box {
          padding: 18px 10px;
          font-size: clamp(28px, 3.8vw, 48px);
        }
        .countdown-colon {
          font-size: clamp(22px, 3vw, 36px);
          padding-bottom: 18px;
        }

        @media (max-width: 600px) {
          .page-wrap {
            padding: 56px 16px 80px !important;
            max-width: 420px !important;
            margin: 0 auto !important;
          }
          .options-grid {
            grid-template-columns: 1fr !important;
          }
          .score-tracker-card {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .score-history-col {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid #EDE4D8 !important;
            padding-top: 20px !important;
          }
          .ring-stats-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .word-card-header {
            padding: 12px 14px !important;
          }
          .word-card-details {
            padding: 12px 14px !important;
          }
          .word-card-example {
            padding: 10px 12px !important;
          }
        }

        @media (max-width: 500px) {
          .nav-bar {
            width: calc(100% - 32px) !important;
            max-width: 450px !important;
            margin: 0 auto !important;
          }
          .nav-bar button {
            padding: 6px 10px !important;
            font-size: 11px !important;
            flex: 1 !important;
            text-align: center !important;
          }
          .practice-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
          .practice-row button {
            align-self: flex-end !important;
          }
        }
      `}</style>
      <Nav active={active} setActive={go} />
      {active === "home" && <Hero setActive={go} />}
      {active === "varc" && <VARCSection />}
      {active === "syllabus" && <SyllabusSection />}
      {active === "words" && <WordsSection />}
    </div>
  );
}
