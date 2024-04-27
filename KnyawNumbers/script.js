const sentences = [
    "၁ တၢ",
    "၂ ခံ",
    "၃ သၢ",
    "၄ လွံၢ်",
    "၅ ယဲၢ်",
    "၆ ဃု",
    "၇ နွံ",
    "၈ ဃိး",
    "၉ ခွံ",
    "၁ဝ တဆံ"
];

const audioFiles = {
    "၁": "numbers/1.mp3",
    "၂": "numbers/2.mp3",
    "၃": "numbers/3.mp3",
    "၄": "numbers/4.mp3",
    "၅": "numbers/5.mp3",
    "၆": "numbers/6.mp3",
    "၇": "numbers/7.mp3",
    "၈": "numbers/8.mp3",
    "၉": "numbers/9.mp3",
    "၁ဝ": "numbers/10.mp3",
    "တၢ": "numbers/1spelling.mp3",
    "ခံ": "numbers/2spelling.mp3",
    "သၢ": "numbers/3spelling.mp3",
    "လွံၢ်": "numbers/4spelling.mp3",
    "ယဲၢ်": "numbers/5spelling.mp3",
    "ဃု": "numbers/6spelling.mp3",
    "နွံ": "numbers/7spelling.mp3",
    "ဃိး": "numbers/8spelling.mp3",
    "ခွံ": "numbers/9spelling.mp3",
    "တဆံ": "numbers/10spelling.mp3",
};

const sentenceContainer = document.getElementById('sentenceContainer');
const nextButton = document.getElementById('nextButton');
let sentenceIndex = 0;

function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}

function displaySentence() {
    const sentence = sentences[sentenceIndex];
    const words = sentence.split(/\s+/); // Split by any whitespace character
    sentenceContainer.innerHTML = '';
    words.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.classList.add('word');
        wordSpan.textContent = word;
        wordSpan.addEventListener('click', () => {
            const audioUrl = getAudioUrlForWord(word);
            if (audioUrl) {
                playAudio(audioUrl);
            } else {
                console.log("Audio file not found for word:", word);
            }
        });
        wordSpan.addEventListener('mouseover', () => {
            wordSpan.classList.add('highlight');
        });
        wordSpan.addEventListener('mouseout', () => {
            wordSpan.classList.remove('highlight');
        });
        sentenceContainer.appendChild(wordSpan);
        sentenceContainer.appendChild(document.createTextNode(' ')); // Add space between words
    });
}

function getAudioUrlForWord(word) {
    let audioUrl = '';
    for (let i = word.length; i > 0; i--) {
        const subWord = word.substring(0, i);
        if (audioFiles[subWord]) {
            audioUrl = audioFiles[subWord];
            break;
        }
    }
    return audioUrl;
}

function displayNextSentence() {
    sentenceIndex++;
    if (sentenceIndex >= sentences.length) {
        document.getElementById("sentenceContainer").innerText = "";
        document.getElementById("message").innerText = "Congrats! You Just Learned Knyaw Numbers!";
        document.getElementById("nextButton").innerText = "Restart";
        nextButton.removeEventListener('click', displayNextSentence);
        nextButton.addEventListener('click', restartLesson);
        return;
    }
    displaySentence();
}

function restartLesson() {
    sentenceIndex = 0;
    document.getElementById("message").innerText = "";
    document.getElementById("nextButton").innerText = "Next";
    nextButton.removeEventListener('click', restartLesson);
    nextButton.addEventListener('click', displayNextSentence);
    displaySentence();
}

nextButton.addEventListener('click', displayNextSentence);

// Display the first sentence initially
displaySentence();