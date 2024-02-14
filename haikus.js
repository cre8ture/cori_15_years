const haikus = [
    "Moonlit paths we've walked, Cori and I, hand in hand, Our baby's laughter echoes.",
    "Sunrise marks our days, Growth in love, Cori by side, A new dawn with our child.",
    "Blossoms mark the years, Cori's smile, our shared journey, Life blooms with our babe.",
    "Stars chart our passage, Old souls wandering as one, Our baby, our north star.",
    "Rain recalls hardships, Together, Cori and I, Shelter for our child.",
    "Snow blankets our past, Memories of warmth inside, Our baby's first steps.",
    "Leaves of amber fall, Seasons change, but love stands firm, Cori, me, and our little one.",
    "Ocean waves recount, Our journey, deep and vast love, With our baby, joy multiplies.",
    "Mountains echo vows, Cori and I, strength in love, Our child, the summit of joy.",
    "Fields of green, life's canvas, Cori, our baby, and I, Wildflowers on our path."
];

function shuffleHaikus(haikus) {
    // Flatten the array into a single array of words
    let words = haikus.join(" ").split(/\s+/);
    // Shuffle the words
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]]; // Swap
    }
    // Distribute the words back into the original haikus structure
    return haikus.map(haiku => {
        return haiku.split(/\s+/).map(() => words.pop()).join(" ");
    });
}

