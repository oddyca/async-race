/* eslint-disable @typescript-eslint/no-var-requires */
import { GarageControls } from './garage-controls/garage-controls';
import { CarList } from './car-list/car-list';

export class Garage {
    constructor() {}

    async render() {
        const garageContainer = document.createElement('div');
        garageContainer.classList.add('garage-container');

        const controls = new GarageControls();
        const controlsBlock = controls.render();

        const carList = new CarList();
        const carListBlock = await carList.render();

        garageContainer.append(controlsBlock);
        garageContainer.append(carListBlock);

        return garageContainer;
    }
}
