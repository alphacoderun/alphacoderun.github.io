const vocabulary = [
    { en: "Weather", romaji: "tenki", hiragana: "てんき" },
    { en: "Fine/Sunny", romaji: "hare", hiragana: "はれ" },
    { en: "Cloudy", romaji: "kumori", hiragana: "くもり" },
    { en: "Rain", romaji: "ame", hiragana: "あめ" },
    { en: "Hot", romaji: "atsui", hiragana: "あつい" },
    { en: "Warm", romaji: "atatakai", hiragana: "あたたかい" },
    { en: "Dog", romaji: "inu", hiragana: "いぬ" },
    { en: "Cold", romaji: "samui", hiragana: "さむい" },
    { en: "Heated table", romaji: "kotatsu", hiragana: "こたつ" },
    { en: "Bath", romaji: "ofuro", hiragana: "おふろ" },
    { en: "Cloud", romaji: "kumo", hiragana: "くも" },
    { en: "Umbrella", romaji: "kasa", hiragana: "かさ" },
    { en: "Doll Festival", romaji: "hinamatsuri", hiragana: "ひなまつり" },
    { en: "Sky", sora: "sora", hiragana: "そら" },
    { en: "Later", romaji: "atode", hiragana: "あとで" },
    { en: "Season", romaji: "kisetsu", hiragana: "きせつ" },
    { en: "Summer", romaji: "natsu", hiragana: "なつ" },
    { en: "Autumn", romaji: "aki", hiragana: "あき" },
    { en: "Winter", romaji: "fuyu", hiragana: "ふゆ" },
    { en: "Spring", romaji: "haru", hiragana: "はる" },
    { en: "Flower viewing", romaji: "hanami", hiragana: "はなみ" },
    { en: "Watermelon", romaji: "suika", hiragana: "すいか" },
    { en: "Tree", romaji: "ki", hiragana: "き" },
    { en: "Snow", romaji: "yuki", hiragana: "ゆき" },
    { en: "Scenery", romaji: "keshiki", hiragana: "けしき" },
    { en: "Cherry blossoms", romaji: "sakura", hiragana: "さくら" },
    { en: "Roasted Sweet potato", romaji: "yakiimo", hiragana: "やきいも" }
];

let currentIndex = 0;
let isRandom = false;
let order = Array.from({ length: vocabulary.length }, (_, i) => i);

const card = document.getElementById('flashcard');
const englishWordEl = document.getElementById('english-word');
const hiraganaWordEl = document.getElementById('hiragana-word');
const romajiWordEl = document.getElementById('romaji-word');
const progressText = document.getElementById('progress-text');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const audioBtn = document.getElementById('audio-btn');

const modeSequential = document.getElementById('mode-sequential');
const modeRandom = document.getElementById('mode-random');

// Initialize
function init() {
    // Fix any potential typo in vocabulary ("sora": "sora" instead of "romaji": "sora")
    vocabulary.forEach(word => {
        if (!word.romaji && word.sora) {
            word.romaji = word.sora;
        }
    });

    updateCard();
    
    // Event Listeners
    card.addEventListener('click', (e) => {
        // Prevent flipping if clicking the audio button
        if(e.target.closest('#audio-btn')) return;
        card.classList.toggle('is-flipped');
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent card click
        navigate(-1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent card click
        navigate(1);
    });

    audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playAudio();
    });

    modeSequential.addEventListener('change', () => {
        isRandom = false;
        order = Array.from({ length: vocabulary.length }, (_, i) => i);
        currentIndex = 0;
        updateCard();
    });

    modeRandom.addEventListener('change', () => {
        isRandom = true;
        shuffleArray(order);
        currentIndex = 0;
        updateCard();
    });
}

function updateCard() {
    // If flipped, unflip it first before changing content
    if (card.classList.contains('is-flipped')) {
        card.classList.remove('is-flipped');
        // Wait for flip animation to finish before updating content
        setTimeout(setContent, 400); 
    } else {
        setContent();
    }
}

function setContent() {
    const wordIndex = order[currentIndex];
    const word = vocabulary[wordIndex];
    
    englishWordEl.textContent = word.en;
    hiraganaWordEl.textContent = word.hiragana;
    romajiWordEl.textContent = word.romaji;
    
    progressText.textContent = `${currentIndex + 1} / ${vocabulary.length}`;
}

function navigate(direction) {
    currentIndex += direction;
    
    // Wrap around
    if (currentIndex < 0) {
        currentIndex = vocabulary.length - 1;
    } else if (currentIndex >= vocabulary.length) {
        currentIndex = 0;
    }
    
    updateCard();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playAudio() {
    const wordIndex = order[currentIndex];
    const word = vocabulary[wordIndex];
    
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(word.hiragana);
        utterance.lang = 'ja-JP';
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support text to speech!");
    }
}

// Run init
init();
