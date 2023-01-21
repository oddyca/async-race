/* eslint-disable @typescript-eslint/no-var-requires */
import { getAllCars, QueryParamStrings } from '../../controller/controller';

export class CarList {
    constructor() {}
    async render() {
        const cars: QueryParamStrings = await getAllCars();
        const carlistContainer = document.createElement('div');
        carlistContainer.classList.add('carlist-container');
        
        const carlistHeader = document.createElement('h2');
        carlistHeader.innerText = `Garage (${cars.length} cars)`;
        carlistContainer.append(carlistHeader);

        const carlistPage = document.createElement('h3');
        carlistPage.innerText = `Page #1`; // change after pagination implementation
        carlistContainer.append(carlistPage);

        const carList = document.createElement('div');
        carList.classList.add('garage_car-list');
        cars.map((car) => {
            const carTrack = document.createElement('div');
            carTrack.classList.add('track');

            const carSlot = document.createElement('div');
            carSlot.classList.add('car-slot');

            const engineControls = document.createElement('div');
            engineControls.classList.add('car-slot_engine-controls');
            const engineStart = document.createElement('button');
            engineStart.classList.add('engine-button', 'engine-start');
            engineStart.innerText = 'GO';
            const engineStop = document.createElement('button');
            engineStop.classList.add('engine-button', 'engine-stop');
            engineStop.innerText = 'BR';

            engineControls.append(engineStart);
            engineControls.append(engineStop);

            const carControls = document.createElement('div');
            carControls.classList.add('track_car-controls');
            const carSelect = document.createElement('button');
            carSelect.classList.add('car-controls_buttons','car-controls_select');
            carSelect.innerText = 'SELECT';
            const carRemove = document.createElement('button');
            carRemove.classList.add('car-controls_buttons', 'car-controls_delete');
            carRemove.innerText = 'DELETE';

            carControls.append(carSelect);
            carControls.append(carRemove);

            const carName = document.createElement('p');
            carName.innerText = `${car.name}`;
            carName.classList.add('car-name');
            carControls.append(carName);

            const carContainer = document.createElement('div');
            carContainer.classList.add('car');
            carSlot.append(carControls);
            carContainer.append(engineControls);

            const carBody = document.createElement('div');
            carBody.classList.add('car-body');

            const carFrame = document.createElement('div');
            carFrame.classList.add('car_body-frame');
            carFrame.setAttribute('style', 
                `
                background-color: ${car.color};
                -webkit-mask: url(${require('../../../assets/car-body.svg')}) 0 0/100px 100px no-repeat;
                mask: url(${require('../../../assets/car-body.svg')}) 0 0/100px 100px no-repeat;
                `)
            const carImg = document.createElement('img');

            const rearWheel = document.createElement('div');
            rearWheel.classList.add('car_rear-wheel', 'wheels');
            const frontWheel = document.createElement('div');
            frontWheel.classList.add('car_front-wheel', 'wheels');

            const rearWheelImg = document.createElement('img');
            const frontWheelImg = document.createElement('img');
            rearWheelImg.setAttribute('src', require('../../../assets/car-wheel.svg'));
            rearWheelImg.classList.add('car_wheel-img');
            frontWheelImg.setAttribute('src', require('../../../assets/car-wheel.svg'));
            frontWheelImg.classList.add('car_wheel-img');

            frontWheel.append(frontWheelImg);
            rearWheel.append(rearWheelImg);

            carFrame.append(carImg);
            carBody.append(frontWheel);
            carBody.append(rearWheel);
            carBody.append(carFrame);
            carContainer.append(carBody)
            carSlot.append(carContainer);
            carTrack.append(carSlot);
            carList.append(carTrack);
        });

        carlistContainer.append(carList);
        return carlistContainer;
    }
}