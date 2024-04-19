let player_name = document.querySelector('.start-game input')
let start_game_btn = document.querySelector('.start-game button')

let myName = document.querySelector('.resaults span')

start_game_btn.addEventListener('click', () => {
    if(player_name != '') {
        
        myName.textContent = player_name.value
        document.querySelector('.start-game').classList.add('diable')
    } 
})
let cards = document.querySelectorAll('.memory-game .card')

let cardsKeys = [...Array.from(cards).keys()]

shuffle(cardsKeys)

cards.forEach((el, index) => {
    el.style.order = cardsKeys[index]
})

let cards_array = Array.from(cards)

cards_array.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.add('fliped')
        checkElement(cards_array, el)
    })
})

function shuffle(arr) {
    
    let currentIndex = arr.length
    while(currentIndex != 0) {
        let random = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        [arr[currentIndex], arr[random]] = [arr[random], arr[currentIndex]]
    }
    return arr;

}

function checkElement(cards, el) {

        let all_cards = cards.filter(el => {
            return el.classList.contains('fliped')
        })
        
        if(all_cards.length == 1) {

        } else {
            cards.forEach(el => el.classList.add('disabled'))

            setTimeout(() => {
                checkAnswer(cards, all_cards)
            }, 1000)
        }
}

function checkAnswer(cards, two_card) {

    let first_answer = two_card[0].dataset.name
    let second_answer = two_card[1].dataset.name
    let wrong = document.querySelector('.resaults span.wrong')
    

    if(first_answer != second_answer) {
        wrong.innerHTML =  Number.parseInt(wrong.textContent) + 1
        two_card[0].classList.remove('fliped')

        two_card[1].classList.remove('fliped')

        cards_array.forEach(card => card.classList.remove('disabled'))
    } else {
        two_card[0].classList.remove('fliped')
        two_card[1].classList.remove('fliped')

        two_card[0].classList.add('match')
        two_card[1].classList.add('match')

        cards_array.forEach(card => card.classList.remove('disabled'))

    }

    let all_fliped = cards.every(card => card.classList.contains('match'))

    if(all_fliped == true) {
        console.log('Congratulations! You have finished')
    }
}


