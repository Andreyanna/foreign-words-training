"use strict";

class Words {
    constructor(englishWords, russianWords, example) {
        this.englishWords = englishWords;
        this.russianWords = russianWords;
        this.example = example;
    }
}

const words1 = new Words('hydrangea', 'гортензия', 'It is worth noting that hydrangea is considered a very rare flower.');
const words2 = new Words('chrysanthemum', 'хризантема', 'Chrysanthemum reacts poorly to the absence of moisture and does not like a thick shadow.');
const words3 = new Words('carnation', 'гвоздика', 'White carnation means good luck, and pink symbolizes maternal love.');
const words4 = new Words('orchid', 'орхидея', 'Today, orchid is not such a rare plant in a room flower garden.');
const words5 = new Words('buttercup', 'лютик', 'One of few that can survive in the region is a glacier buttercup.');
const words6 = new Words('sunflower', 'подсолнух', 'Sunflower causes a wide smile and gives a good mood, as it resembles the sun.');

const arr = [words1, words2, words3, words4, words5, words6];

function randomInteger(max) {
    let rand = Math.random() * (max + 1);
    return Math.floor(rand);
}

const currentWord = document.querySelector('#current-word');
const totalWord = document.querySelector('#total-word');
const wordsProgress = document.querySelector('#words-progress');
const shuffleWords = document.querySelector('#shuffle-words');
const examProgress = document.querySelector('#exam-progress');
const slider = document.querySelector('.slider');
const flipCard = document.querySelector('.flip-card');
const cardFront = document.querySelector('#card-front');
const cardFrontH1 = cardFront.querySelector('h1');
const cardBack = document.querySelector('#card-back');
const cardBackH1 = cardBack.querySelector('h1');
const example = cardBack.querySelector('span');
const buttonBack = document.querySelector('#back');
const buttonNext = document.querySelector('#next');
const buttonTesting = document.querySelector('#exam');


slider.addEventListener("click", () => {
    flipCard.classList.toggle('active');
});

let currentIndex = 0;

function createCard(showText) {
    cardFrontH1.textContent = showText.englishWords;
    cardBackH1.textContent = showText.russianWords;
    example.textContent = showText.example;
    currentWord.textContent = currentIndex + 1;
    wordsProgress.value = (currentIndex + 1) / arr.length * 100;
}
createCard(arr[currentIndex]);

buttonNext.addEventListener('click', () => {
    currentIndex++;
    createCard(arr[currentIndex]);
    buttonBack.removeAttribute('disabled');
    if (currentIndex == arr.length - 1) {
        buttonNext.disabled = true;
    }
})

buttonBack.addEventListener('click', () => {
    currentIndex--;
    createCard(arr[currentIndex]);
    buttonNext.removeAttribute('disabled');
    if (currentIndex == 0) {
        buttonBack.disabled = true;
    }
})

shuffleWords.addEventListener('click', () => {
    arr.sort(() => Math.random() - 0.5);
    createCard(arr[currentIndex]);
})

totalWord.textContent = arr.length;


const studyCards = document.querySelector('.study-cards');
const examCards = document.querySelector('#exam-cards');

let selectedCard;

function creatingTestCard(object) {
    const divElement = document.createElement('div');
    divElement.classList.add('card');
    const pElement = document.createElement('p');
    pElement.textContent = object;
    divElement.append(pElement);
    divElement.addEventListener('click', () => checkTranslations(divElement))
    return divElement;
}


function cardInsert() {
    const fragment = new DocumentFragment();
    const newArray = [];
    arr.forEach((array) => {
        newArray.push(creatingTestCard(array.russianWords));
        newArray.push(creatingTestCard(array.englishWords));
    });
    fragment.append(...newArray.sort(() => Math.random() - 0.5));
    examCards.innerHTML = "";
    examCards.append(fragment);
}


buttonTesting.addEventListener('click', () => {
    studyCards.classList.add('hidden');
    cardInsert()
})


function checkTranslations(currentCard) {
    if (!selectedCard) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('correct');
            card.classList.remove('wrong');
        });
        currentCard.style.pointerEvents = "none";
        currentCard.classList.add('correct');
        selectedCard = currentCard;
    } else {
        const wordObject = arr.find(word => word.russianWords === selectedCard.textContent || word.englishWords === selectedCard.textContent);
        if (wordObject.russianWords === currentCard.textContent || wordObject.englishWords === currentCard.textContent) {
            currentCard.style.pointerEvents = "none";
            currentCard.classList.add('correct');
            currentCard.classList.add('fade-out');
            selectedCard.classList.add('fade-out');
            const allCards = document.querySelectorAll('.card');
            let allCardsFaded = true;
            allCards.forEach(card => {
                if (!card.classList.contains('fade-out')) {
                    allCardsFaded = false;
                }
            });
            if (allCardsFaded) {
                setTimeout(() => {
                    alert('Проверка знаний завершена! Ты молодец!');
                }, 1000);
            }
        } else {
            selectedCard.classList.add('correct');
            currentCard.classList.add('wrong');
            setTimeout(() => {
                const allCards = document.querySelectorAll('.card');
                allCards.forEach(card => {
                    card.classList.remove('correct');
                    card.classList.remove('wrong');
                });
            }, 500);
            currentCard.style.pointerEvents = "all";
            selectedCard.style.pointerEvents = "all";
        }
        selectedCard = null;
    }
}