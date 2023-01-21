/* eslint-disable @typescript-eslint/no-var-requires */
import { CarList } from './car-list/car-list';

export class Garage {
    constructor() {}

    async render() {
        const garageContainer = document.createElement('div');
        garageContainer.classList.add('garage-container');

        const carList = new CarList();
        const carListContainer = await carList.render()
        garageContainer.append(carListContainer);

        return garageContainer;
    }
}
