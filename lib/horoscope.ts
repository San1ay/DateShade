// 2. A massive pool of monthly horoscopes
const PREDICTIONS = [
    // --- Career & Finance ---
    "This month brings a wave of clarity. Focus on long-term investments and avoid impulsive decisions. Your ruling planet suggests a favorable outcome in career matters.",
    "Professional opportunities are aligning beautifully. Take the lead on a project you've been hesitating on. Trust your unique vision.",
    "Financial restructuring is highly favored right now. It is a great time to set new budgets. A delayed payment or unexpected bonus may finally arrive.",
    "A sudden shift in your professional sphere opens up a new avenue for income. Trust your instincts when reviewing a new contract, proposal, or collaboration.",
    "Your hard work behind the scenes is about to pay off. Expect recognition from someone in authority. Stay humble but own your success.",
    "It's a great month for networking. A casual conversation could lead to a highly profitable partnership. Keep your business cards (or LinkedIn) ready.",

    // --- Love & Relationships ---
    "Relationships take center stage over the next four weeks. Communication will be your greatest asset. If single, a new connection surprises you.",
    "Romance is in the air. If you are attached, plan a surprise for your partner to break the routine. If single, someone from your past may reach out.",
    "A period of deep reflection regarding your inner circle. It might be time to set healthy boundaries with someone who drains your energy.",
    "Your charm is off the charts this month! Use this magnetic energy to resolve old conflicts and attract positive, uplifting people into your life.",
    "Vulnerability is your superpower right now. Opening up about your true feelings to a loved one will deepen your bond in unexpected ways.",

    // --- Personal Growth & Inner Peace ---
    "A period of deep reflection and growth. You may feel the urge to isolate, but leaning on close friends will provide the breakthrough you need.",
    "Balance is your theme for this month. You have been giving too much energy to work. Reclaim your time. A sudden spark of creativity will help you solve an ongoing problem.",
    "A shift in your perspective will change how you approach your daily tasks. Letting go of the need to control everything brings immense peace.",
    "It's time to declutter your mind and your space. Letting go of old items and old habits will make room for a massive surge of creative energy.",
    "You are stepping into a period of extreme personal empowerment. Stop asking for permission and start trusting your own inner authority.",
    "Dreams will be highly vivid this month. Pay attention to the recurring themes, as your subconscious is trying to hand you the solution to a waking problem.",

    // --- Health & Wellness ---
    "Health and vitality are on an upward trend. Focus on your physical well-being. Incorporating mindful meditation will dramatically improve your daily energy.",
    "Listen to your body. If you feel burnt out, take a step back. A temporary rest period now will prevent a larger crash later in the month.",
    "Your physical energy might fluctuate. Focus on grounding exercises—spend time in nature, eat nourishing meals, and prioritize a consistent sleep schedule.",
    "A great month to break a bad habit. The planetary alignments give you extra willpower to stick to new, healthier routines.",

    // --- Travel & Spontaneity ---
    "Wanderlust strikes! Even a short weekend getaway or exploring a new part of your local area will provide the mental reset you desperately need.",
    "An unexpected detour will lead to a beautiful discovery. Embrace spontaneity this month—say yes to last-minute invitations.",
    "You may feel a strong pull toward a completely new hobby or subject of study. Dive in! This new interest will bring you a lot of joy.",

    // --- Challenges & Overcoming ---
    "A minor setback early in the month is actually a blessing in disguise. It forces you to re-evaluate a flawed plan before it's too late.",
    "You might face a clash of opinions with a peer. Practice active listening instead of preparing your defense. A compromise is highly favored.",
    "Patience is required. Things are moving slower than you'd like, but trust the timing. Rushing the process will only lead to mistakes.",

    // --- Luck & Serendipity ---
    "Serendipity is your companion this month. You will find yourself in the right place at the right time. Trust the coincidences.",
    "Your intuition is razor-sharp right now. If a situation feels 'off,' trust your gut and walk away. If it feels right, dive in fully.",
    "A forgotten passion project from the past is calling your name. Dust it off—the timing is finally right for it to succeed."
];

const ZODIAC_FACTS: Record<string, any> = {
    aries: { element: "Fire", ruler: "Mars", traits: ["Courageous", "Determined", "Confident"] },
    taurus: { element: "Earth", ruler: "Venus", traits: ["Reliable", "Patient", "Practical"] },
    gemini: { element: "Air", ruler: "Mercury", traits: ["Gentle", "Affectionate", "Curious"] },
    cancer: { element: "Water", ruler: "Moon", traits: ["Tenacious", "Highly Imaginative", "Loyal"] },
    leo: { element: "Fire", ruler: "Sun", traits: ["Creative", "Passionate", "Generous"] },
    virgo: { element: "Earth", ruler: "Mercury", traits: ["Loyal", "Analytical", "Kind"] },
    libra: { element: "Air", ruler: "Venus", traits: ["Cooperative", "Diplomatic", "Gracious"] },
    scorpio: { element: "Water", ruler: "Pluto", traits: ["Resourceful", "Brave", "Passionate"] },
    sagittarius: { element: "Fire", ruler: "Jupiter", traits: ["Generous", "Idealistic", "Great sense of humor"] },
    capricorn: { element: "Earth", ruler: "Saturn", traits: ["Responsible", "Disciplined", "Self-control"] },
    aquarius: { element: "Air", ruler: "Uranus", traits: ["Progressive", "Original", "Independent"] },
    pisces: { element: "Water", ruler: "Neptune", traits: ["Compassionate", "Artistic", "Intuitive"] }
};


// 2. A massive dictionary of 60 Astrology-themed colors
const COLORS = [
    // --- Reds & Pinks ---
    { name: "Crimson Red", hex: "#DC143C" },
    { name: "Ruby", hex: "#E0115F" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Maroon", hex: "#800000" },
    { name: "Cherry Blossom", hex: "#FFB7C5" },
    { name: "Dusty Rose", hex: "#DCAE96" },
    { name: "Fuchsia", hex: "#FF00FF" },
    { name: "Salmon", hex: "#FA8072" },

    // --- Oranges & Yellows ---
    { name: "Sunset Orange", hex: "#FD5E53" },
    { name: "Golden Yellow", hex: "#FFC000" },
    { name: "Mustard", hex: "#FFDB58" },
    { name: "Amber", hex: "#FFBF00" },
    { name: "Peach", hex: "#FFE5B4" },
    { name: "Tangerine", hex: "#F28500" },
    { name: "Saffron", hex: "#F4C430" },
    { name: "Marigold", hex: "#EAA221" },
    { name: "Champagne", hex: "#F7E7CE" },
    { name: "Burnt Orange", hex: "#CC5500" },

    // --- Greens ---
    { name: "Emerald Green", hex: "#50C878" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Mint", hex: "#3EB489" },
    { name: "Jade", hex: "#00A86B" },
    { name: "Olive", hex: "#808000" },
    { name: "Seafoam", hex: "#9FE2BF" },
    { name: "Teal", hex: "#008080" },
    { name: "Sage", hex: "#9DC183" },
    { name: "Lime", hex: "#BFFF00" },
    { name: "Malachite", hex: "#0BDA51" },

    // --- Blues ---
    { name: "Sapphire Blue", hex: "#0F52BA" },
    { name: "Midnight Blue", hex: "#191970" },
    { name: "Turquoise", hex: "#40E0D0" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Navy", hex: "#000080" },
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Cobalt", hex: "#0047AB" },
    { name: "Aquamarine", hex: "#7FFFD4" },
    { name: "Periwinkle", hex: "#CCCCFF" },
    { name: "Cerulean", hex: "#007BA7" },

    // --- Purples ---
    { name: "Amethyst Purple", hex: "#9966CC" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Plum", hex: "#8E4585" },
    { name: "Violet", hex: "#EE82EE" },
    { name: "Orchid", hex: "#DA70D6" },
    { name: "Mauve", hex: "#E0B0FF" },
    { name: "Indigo", hex: "#4B0082" },
    { name: "Lilac", hex: "#C8A2C8" },
    { name: "Eggplant", hex: "#614051" },
    { name: "Mulberry", hex: "#C54B8C" },

    // --- Neutrals & Metallics ---
    { name: "Onyx Black", hex: "#353839" },
    { name: "Pearl White", hex: "#F0EAD6" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Slate Gray", hex: "#708090" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Bronze", hex: "#CD7F32" },
    { name: "Copper", hex: "#B87333" },
    { name: "Ivory", hex: "#FFFFF0" },
    { name: "Obsidian", hex: "#0B1215" },
    { name: "Platinum", hex: "#E5E4E2" }
];

const ZODIAC_SYMBOLS: Record<string, string> = {
    aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
    leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
    sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓"
};
export default PREDICTIONS;
export { ZODIAC_FACTS, COLORS, ZODIAC_SYMBOLS }