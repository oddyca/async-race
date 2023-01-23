import { animateCar, CarBlueprint, state, winner } from '../../controller/controller';
import { App } from '../../app';

export class GarageControls {
    constructor() {}

    render() {
        const garageControlsContainer = document.createElement('div');
        garageControlsContainer.classList.add('garage-controls');

        const createCar = document.createElement('div');
        createCar.classList.add('garage-controls_create-car');
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.classList.add('create-name');
        nameInput.required = true;
        const createCarColor = document.createElement('input');
        createCarColor.setAttribute('type', 'color');
        createCarColor.classList.add('create-color');
        const createButton = document.createElement('button');
        createButton.innerText = 'CREATE';
        createButton.classList.add('create-car_button');
        createButton.onclick = async () => {
            const carName = (<HTMLInputElement>document.querySelector('.create-name')).value;
            const carColor = (<HTMLInputElement>document.querySelector('.create-color')).value;

            const newCar = new CarBlueprint(carName, carColor);
            await newCar.createCar();

            const carsToRender = await App.run();
            document.querySelector('.garage-container')?.remove();
            document.querySelector('#app')?.append(carsToRender);
        };

        createCar.append(nameInput);
        createCar.append(createCarColor);
        createCar.append(createButton);
        garageControlsContainer.append(createCar);

        const updateCar = document.createElement('div');
        updateCar.classList.add('garage-controls_update-car');
        const updateNameInput = document.createElement('input');
        updateNameInput.setAttribute('type', 'text');
        updateNameInput.classList.add('update-name');
        updateNameInput.required = true;
        updateNameInput.disabled = true;
        const updateCarColor = document.createElement('input');
        updateCarColor.setAttribute('type', 'color');
        updateCarColor.classList.add('update-color');
        updateCarColor.disabled = true;
        const updateButton = document.createElement('button');
        updateButton.innerText = 'UPDATE';
        updateButton.disabled = true;
        updateButton.classList.add('update-car_button');
        updateButton.onclick = async () => {
            const carName = (<HTMLInputElement>document.querySelector('.update-name')).value;
            const carColor = (<HTMLInputElement>document.querySelector('.update-color')).value;

            await CarBlueprint.updateCar(carName, carColor, state)

            const carsToRender = await App.run();
            document.querySelector('.garage-container')?.remove();
            document.querySelector('#app')?.append(carsToRender);
        }

        updateCar.append(updateNameInput);
        updateCar.append(updateCarColor);
        updateCar.append(updateButton);
        garageControlsContainer.append(updateCar);

        const raceControls = document.createElement('div');
        raceControls.classList.add('garage-controls_race-controls');
        const raceButton = document.createElement('button');
        raceButton.innerText = 'RACE';
        raceButton.classList.add('race-controls', 'race-button');

        interface CarElements{
            [id: number]: HTMLDivElement
        }
        raceButton.onclick = () => {
            raceButton.disabled = true;
            const allCars = document.querySelectorAll('[data-id]') as CarElements;

            const allPromise: Promise<Response>[] = [];
            Object.values(allCars).map(async (x) => {
                const animateResponse = animateCar(`${x.dataset.id}`) as Promise<Response>
                allPromise.push(animateResponse);
            })
            Promise.all(allPromise).then(async () => {
                const sorted = Object.keys(winner).sort((a,b) => winner[b][0] - winner[a][0]);
                const winnerID = sorted[0];
                const time = winner[winnerID][0];
                // const velocity = winner[winnerID][1];
                console.log(sorted, winnerID);

                const winnerFetch = fetch(`http://localhost:3000/winner/${winnerID}`)
                const wins = await (await winnerFetch).json();
                const winsNum = wins.wins

                CarBlueprint.createWinner(parseInt(winnerID), winsNum !== undefined ? winsNum + 1 : 1, time);
            });
        }


        const resetButton = document.createElement('button');
        resetButton.classList.add('race-controls', 'reset-button');
        resetButton.innerText = 'RESET';

        resetButton.disabled = true;                            // DISABLED

        const generateCarsButton = document.createElement('button');
        generateCarsButton.innerText = 'GENERATE CARS';
        generateCarsButton.classList.add('race-controls', 'generate-button');

        generateCarsButton.disabled = true;                     // DISABLED

        raceControls.append(raceButton);
        raceControls.append(resetButton);
        raceControls.append(generateCarsButton);
        garageControlsContainer.append(raceControls);

        return garageControlsContainer;
    }
}