import { getAllCars } from './components/controller/controller'
import './style.css'

const app = document.querySelector('#app');

async function test() {
    getAllCars()

    const renderDiv = document.createElement('div');
    renderDiv.classList.add('cars-wrapper');
    // for (const element of data) {
    //     const carDiv = document.createElement('div');
    //     carDiv.classList.add('car');
    //     const pElem = document.createElement('p');
    //     pElem.innerText = 
    //         `
    //         Car: ${element.name};
    //         Color: ${element.color};
    //         id: ${element.id}
    //         `;
    //     carDiv.append(pElem);  
    //     renderDiv.append(carDiv);
    // }
    const bgWrapper = document.createElement('div');
    bgWrapper.classList.add('bg-wrapepr');
    app?.append(bgWrapper);
    app?.append(renderDiv)
}

test()
