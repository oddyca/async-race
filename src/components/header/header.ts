import { handleRoute } from '../router/router';

export class Header {
    constructor() {}

    render() {
        const nav = document.createElement('div');
        nav.classList.add('navbar');

        const toGarage = document.createElement('a');
        toGarage.classList.add('navbar_to');
        toGarage.innerText = 'Garage';
        toGarage.setAttribute('href', '#garage');
        toGarage.onclick = () => {
            handleRoute('#garage')
        }

        const toWinners = document.createElement('a');
        toWinners.classList.add('navbar_to');
        toWinners.innerText = 'Winners';
        toWinners.setAttribute('href', '#winners');
        toWinners.onclick = () => {
            handleRoute('#winners')
        }
        nav.append(toGarage);
        nav.append(toWinners);
        return nav;
    }
}