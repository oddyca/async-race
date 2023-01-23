import { Winners } from '../winners/winners';
import { Garage } from '../garage/garage';

export async function handleRoute(route:string) {
    const appDiv = document.querySelector('#app');
    const childDv = appDiv?.childNodes[2] as Node
    if (route === '#winners') {
        const winnersPage = new Winners()
        const winnersToRender = await winnersPage.render();
        appDiv?.removeChild(childDv);
        appDiv?.append(winnersToRender);
    }  else {
        const garagePage = new Garage()
        const garageToRender = await garagePage.render();
        appDiv?.removeChild(childDv);
        appDiv?.append(garageToRender);
    }
}