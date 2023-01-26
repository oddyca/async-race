import { CarBlueprint, getAllWinners, QueryParamStrings } from '../controller/controller';

export class Winners {
    constructor(){}
    
    async render() {
        const winners: QueryParamStrings = await getAllWinners();
        const winnersPage = document.createElement('div');
        winnersPage.classList.add('winners-container');

        const winnersTable = document.createElement('div');
        winnersTable.classList.add('winners-table');
        const positionColumn = document.createElement('div'); // position column
        positionColumn.classList.add('table-column');
        const positionColumnTitle = document.createElement('div');
        positionColumnTitle.innerText = 'Position';
        positionColumnTitle.classList.add('column-title');
        positionColumn.append(positionColumnTitle);
        winnersTable.append(positionColumn);

        const carImgColumn = document.createElement('div'); // car img column
        carImgColumn.classList.add('table-column');
        const carImgColumnTitle = document.createElement('div');
        carImgColumnTitle.innerText = 'Car';
        carImgColumnTitle.classList.add('column-title');
        carImgColumn.append(carImgColumnTitle);
        winnersTable.append(carImgColumn);

        const carNameColumn = document.createElement('div'); // car name column
        carNameColumn.classList.add('table-column');
        const carNameColumnTitle = document.createElement('div');
        carNameColumnTitle.innerText = 'Name';
        carNameColumnTitle.classList.add('column-title');
        carNameColumn.append(carNameColumnTitle);
        winnersTable.append(carNameColumn);

        const carWinsColumn = document.createElement('div'); // car wins column
        carWinsColumn.classList.add('table-column');
        const carWinsColumnTitle = document.createElement('div');
        carWinsColumnTitle.innerText = 'Wins';
        carWinsColumnTitle.classList.add('column-title');
        carWinsColumn.append(carWinsColumnTitle);
        winnersTable.append(carWinsColumn);

        const carTimeColumn = document.createElement('div'); // car time column
        carTimeColumn.classList.add('table-column');
        const carTimeColumnTitle = document.createElement('div');
        carTimeColumnTitle.innerText = 'Best Time (s)';
        carTimeColumnTitle.classList.add('column-title');
        carTimeColumn.append(carTimeColumnTitle);
        winnersTable.append(carTimeColumn);

        winners.map(async (position, index) => {
            const carInfo = await CarBlueprint.getCar(parseInt(position.id));

            const positionDiv = document.createElement('div');
            positionDiv.innerText = `${index + 1}`;
            positionColumn.append(positionDiv);

            const carIcon = document.createElement('div');
            const carImg = document.createElement('img');
            carIcon.setAttribute('alt', 'car image');
            carIcon.append(carImg);
            carImgColumn.append(carIcon);

            const carName = document.createElement('div');
            carName.innerText = carInfo[0].name;
            carNameColumn.append(carName);

            const carWins = document.createElement('div');
            carWins.innerText = position.wins;
            carWinsColumn.append(carWins);

            const carTime = document.createElement('div');
            carTime.innerText = `${(parseInt(position.time) / 60).toFixed(2)}`;
            carTimeColumn.append(carTime);
        });
        winnersPage.append(winnersTable)
        return winnersPage;
    }
}