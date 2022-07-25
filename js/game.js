const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstcard = ''
let secondcard = ''

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')
    if (disabledCards.length == 20) {
        clearInterval(this.loop)
        alert(`Parabéns, ${spanPlayer.innerHTML} você ganhou!`)
    }
}

const checkCards = () => {
    const firstcharacter = firstcard.getAttribute('data-character')
    const secondcharacter = secondcard.getAttribute('data-character')

    if (firstcharacter == secondcharacter) {
        firstcard.firstChild.classList.add('disabled-card')
        secondcard.firstChild.classList.add('disabled-card')
        firstcard = ''
        secondcard = ''

        checkEndGame()

    } else {
        setTimeout(() => {
        firstcard.classList.remove('reveal-card')
        secondcard.classList.remove('reveal-card')

        firstcard = ''
        secondcard = ''
        }, 600)
    }
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstcard == '') {
        target.parentNode.classList.add('reveal-card')
        firstcard = target.parentNode
    } else if(secondcard == '') {
        target.parentNode.classList.add('reveal-card')
        secondcard = target.parentNode

        checkCards()
    }
}

function createcard(character) {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../images/${character}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

   return card
}

const loadGame = () => {

    const duplicatesCharacters = [...characters, ...characters]

    const shuffledArray = duplicatesCharacters.sort( () => Math.random() - 0.5)

    shuffledArray.forEach((character) => {
       const card = createcard(character)
       grid.appendChild(card)
    })
}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = parseInt(timer.innerHTML)
        timer.innerHTML = currentTime + 1
    }, 1000)
}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player')
    startTimer()
    loadGame()
}

