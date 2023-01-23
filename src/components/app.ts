import { Garage } from './garage/garage';
import { Winners } from './winners/winners'

export class App {
    constructor(){}

    static async run() {
        const GaragePage = new Garage();
        const garageCars = await GaragePage.render();

        return garageCars;
    }
}