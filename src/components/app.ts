import { getAllCars } from './controller/controller';
import { Garage } from './garage/garage';

export class App {
    constructor(){}

    static async run() {
        const GaragePage = new Garage();

        const garageCars = await GaragePage.render();
        return garageCars;
    }
}