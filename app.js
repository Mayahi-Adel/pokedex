// DOM Objects
const mainScren = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeWeight = document.querySelector('.poke-weight');
const pokeheight = document.querySelector('.poke-height');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeListItems = document.querySelectorAll('.list-item');
let btnNext = document.querySelector(".right-button");
let btnPrev = document.querySelector(".left-button");

let nextUrl = null;
let prevUrl = null;

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

// Recupere les donnees de la partie droite
async function requirePokemons(url) {

    let response = await fetch(url);
    let data = await response.json();

    nextUrl = data.next;
    prevUrl = data.previous;
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i]) {
            let id = data.results[i].url.split('/')[6];
            pokeListItems[i].textContent = id + '.' + capitalize(data.results[i].name);
        } else {
            pokeListItems[i].textContent = '';
        }
    }
}
requirePokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

function buttonNextCliked() {
    if (nextUrl) {
        requirePokemons(nextUrl);
    }
}

function buttonPrevClicked() {
    if (prevUrl) {
        requirePokemons(prevUrl);
    }
}

function itemPokCliked(e) {
    let id = e.target.textContent.split('.')[0];
    requireDetailsPokemon(id);
}
// Recuperer les donnees de la partie gauche
async function requireDetailsPokemon(id) {

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();

    mainScren.classList.remove('hide');
    let typeClass = document.querySelector(".main-screen").classList[2];

    mainScren.classList.remove(typeClass);
    mainScren.classList.add(`${data.types[0].type.name}`);

    pokeName.textContent = capitalize(data.name);
    pokeId.textContent = "#" + data.id.toString().padStart(3, '0');
    pokeWeight.textContent = data.weight;
    pokeheight.textContent = data.height;
    pokeFrontImage.src = data.sprites.front_default || '';
    pokeBackImage.src = data.sprites.back_default || '';


    pokeTypeOne.textContent = capitalize(data.types[0].type.name);
    if (data.types[1]) {
        pokeTypeTwo.textContent = capitalize(data.types[1].type.name);
    } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
    }

}

//Ajout des EventListener
btnNext.addEventListener('click', buttonNextCliked);
btnPrev.addEventListener('click', buttonPrevClicked);

for (item of pokeListItems) {
    item.addEventListener('click', itemPokCliked);
}