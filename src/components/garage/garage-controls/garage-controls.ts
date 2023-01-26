<<<<<<< HEAD
import { animateCar, CarBlueprint, state, winner } from '../../controller/controller';
=======
import { animateCar, CarBlueprint, state, winner, toggleButtons, getAllCars, QueryParamStrings, controller, getWinner, updateWinner, generateCars } from '../../controller/controller';
>>>>>>> async-race
import { App } from '../../app';

export class GarageControls {
    constructor() {}

    render() {
        const garageControlsContainer = document.createElement('div');
        garageControlsContainer.classList.add('garage-controls');

<<<<<<< HEAD
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
=======
        const createCar = document.createElement('form');
        createCar.classList.add('garage-controls_create-car');
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.classList.add('create-name', 'garage-inputs');
        nameInput.required = true;
        const createCarColor = document.createElement('input');
        createCarColor.setAttribute('type', 'color');
        createCarColor.classList.add('create-color', 'garage-inputs');
        const createButton = document.createElement('button');
        createButton.innerText = 'CREATE';
        createButton.classList.add('create-car_button', 'button');
        createButton.onclick = async (e) => {
            e.preventDefault();
            const carName = (<HTMLInputElement>document.querySelector('.create-name')).value;
            const carColor = (<HTMLInputElement>document.querySelector('.create-color')).value;
            let newCar

            if (carName && carColor ) {
                newCar = new CarBlueprint(carName, carColor)
            } else {
                return
            }
>>>>>>> async-race
            await newCar.createCar();

            const carsToRender = await App.run();
            document.querySelector('.garage-container')?.remove();
            document.querySelector('#app')?.append(carsToRender);
        };

        createCar.append(nameInput);
        createCar.append(createCarColor);
        createCar.append(createButton);
        garageControlsContainer.append(createCar);

<<<<<<< HEAD
        const updateCar = document.createElement('div');
        updateCar.classList.add('garage-controls_update-car');
        const updateNameInput = document.createElement('input');
        updateNameInput.setAttribute('type', 'text');
        updateNameInput.classList.add('update-name');
=======
        const updateCar = document.createElement('form');
        updateCar.classList.add('garage-controls_update-car');
        const updateNameInput = document.createElement('input');
        updateNameInput.setAttribute('type', 'text');
        updateNameInput.classList.add('update', 'update-name', 'garage-inputs');
>>>>>>> async-race
        updateNameInput.required = true;
        updateNameInput.disabled = true;
        const updateCarColor = document.createElement('input');
        updateCarColor.setAttribute('type', 'color');
<<<<<<< HEAD
        updateCarColor.classList.add('update-color');
=======
        updateCarColor.classList.add('update', 'update-color', 'garage-inputs');
>>>>>>> async-race
        updateCarColor.disabled = true;
        const updateButton = document.createElement('button');
        updateButton.innerText = 'UPDATE';
        updateButton.disabled = true;
<<<<<<< HEAD
        updateButton.classList.add('update-car_button');
        updateButton.onclick = async () => {
=======
        updateButton.classList.add('update', 'update-car_button', 'button');
        updateButton.onclick = async (e) => {
            e.preventDefault();
>>>>>>> async-race
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
<<<<<<< HEAD
        raceButton.classList.add('race-controls', 'race-button');
=======
        raceButton.classList.add('race-controls', 'race-button', 'button');
>>>>>>> async-race

        interface CarElements{
            [id: number]: HTMLDivElement
        }
        raceButton.onclick = () => {
<<<<<<< HEAD
            raceButton.disabled = true;
=======
            toggleButtons('disable');
            raceButton.disabled = true;
            resetButton.disabled = false;
>>>>>>> async-race
            const allCars = document.querySelectorAll('[data-id]') as CarElements;

            const allPromise: Promise<Response>[] = [];
            Object.values(allCars).map(async (x) => {
<<<<<<< HEAD
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
=======
                const animateResponse = animateCar(`${x.dataset.id}`, 'started') as Promise<Response>
                allPromise.push(animateResponse);
            });
            Promise.all(allPromise).then(async () => {
                const sorted = Object.keys(winner).sort((a,b) => {
                    return ((winner[b][0] as number) - (winner[a][0] as number))
                });
                const winnerID = sorted[0];
                const time = winner[winnerID][0];

                try {
                    const winnerResponse = await getWinner(winnerID);
                    if (!winnerResponse.ok) throw new Error('Winner not found');

                    const winenerInfo = await winnerResponse.json();
                    const winsNum = winenerInfo.wins;
                    await updateWinner(parseInt(winnerID), winsNum + 1, time as number)
                } catch(e) {
                    CarBlueprint.createWinner(parseInt(winnerID), 1, time as number);
                }
>>>>>>> async-race
            });
        }


        const resetButton = document.createElement('button');
        resetButton.classList.add('race-controls', 'reset-button');
        resetButton.innerText = 'RESET';
<<<<<<< HEAD

        resetButton.disabled = true;                            // DISABLED
=======
        resetButton.disabled = true;
        resetButton.onclick = async () => {
            controller.abort();
            resetButton.disabled = true;
            toggleButtons('enable');
            const carsToReset: QueryParamStrings = await getAllCars();

            carsToReset.map(async (car) => {
                await animateCar(`${car.id}`, 'stopped');
            })
        }
>>>>>>> async-race

        const generateCarsButton = document.createElement('button');
        generateCarsButton.innerText = 'GENERATE CARS';
        generateCarsButton.classList.add('race-controls', 'generate-button');

<<<<<<< HEAD
        generateCarsButton.disabled = true;                     // DISABLED
=======
        generateCarsButton.onclick = async () => {
            await generateCars();
            const carsToRender = await App.run();
            document.querySelector('.garage-container')?.remove();
            document.querySelector('#app')?.append(carsToRender);
        };
>>>>>>> async-race

        raceControls.append(raceButton);
        raceControls.append(resetButton);
        raceControls.append(generateCarsButton);
        garageControlsContainer.append(raceControls);

        return garageControlsContainer;
    }
}