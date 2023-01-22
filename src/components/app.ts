import { Garage } from './garage/garage';
import { CarBlueprint } from './controller/controller';

export class App {
    constructor(){}

    static async run() {
        const GaragePage = new Garage();
        const garageCars = await GaragePage.render();
        
        return garageCars;
    }
}