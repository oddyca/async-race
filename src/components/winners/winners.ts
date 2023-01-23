import { getAllWinners, QueryParamStrings } from '../controller/controller';

export class Winners {
    constructor(){}

    async render() {
        const winners: QueryParamStrings = await getAllWinners();
        const winnersPage = document.createElement('div');
        winnersPage.classList.add('winners-container');

        winners.map((car) => {
            const carDiv = document.createElement('div');
            carDiv.innerText = `${car.id}`
            winnersPage.append(carDiv);
        });
        return winnersPage;
    }
}