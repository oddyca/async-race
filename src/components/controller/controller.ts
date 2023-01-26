export const baseURL = 'http://localhost:3000';

<<<<<<< HEAD
=======
export let controller: AbortController;
let signal: AbortSignal;

>>>>>>> async-race
export let state: string;
export const updateState = (data: string) => {
    state = data;
};

<<<<<<< HEAD
=======
let animationID: { [key: string]: number } = {};

>>>>>>> async-race
export interface QueryParams {
    [key: string]: string
}
export type QueryParamStrings = QueryParams[];

interface Stats {
    [key:string]: number
}

function generateQueryString(queryParams: QueryParamStrings): string {
    if (queryParams.length) { 
        return `?${queryParams.map(query => `${query.key}=${query.value}`).join('&')}`
    } else {
        return ''
    }
}

export class CarBlueprint {

    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name,
        this.color = color
    }

    async createCar() {
        const toServer: QueryParams = {
            name: this.name,
            color: this.color
        }

<<<<<<< HEAD
        const response = await fetch(`${baseURL}/garage`, {
=======
        await fetch(`${baseURL}/garage`, {
>>>>>>> async-race
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(toServer)
        });
<<<<<<< HEAD

        return response;
    }

    async getCar(id: number) {
=======
    }

    static async getCar(id: number) {
>>>>>>> async-race
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}];

        const qString = generateQueryString(params);

        const fetchResponse = fetch(`${baseURL}/garage/${qString}`);
        const fetchedData = await (await fetchResponse).json();
<<<<<<< HEAD
=======

        return fetchedData
>>>>>>> async-race
    }

    static async deleteCar(id: string) {
        const response = await fetch(`${baseURL}/garage/${id}`, {
            method: 'DELETE'
        });
        return response;
    }

    static async updateCar(name:string, color: string, id: string) {
        const toServer: QueryParams = {
            name: name,
            color: color
        }
        const response = await fetch(`${baseURL}/garage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toServer)
        });

        return response;
    }

    // Engine
<<<<<<< HEAD
    static async startEngine(id: string, status: string) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': `${status}`}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id,
            status: status
=======
    static async startEngine(id: string) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': 'started'}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id
>>>>>>> async-race
        }
        const response = await fetch(`${baseURL}/engine${qString}`, {
            method: 'PATCH',
            body: JSON.stringify(toServer)
        });
<<<<<<< HEAD
        return response;
    }
    static async stopEngine(id: string, status: string) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': `${status}`}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id,
            status: status
=======

        return response;
    }
    static async stopEngine(id: string) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': 'stopped'}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id
>>>>>>> async-race
        }
        const response = await fetch(`${baseURL}/engine${qString}`, {
            method: 'PATCH',
            body: JSON.stringify(toServer)
        });
<<<<<<< HEAD
        console.log(response)
        return response;
    }
    static async switchEngine(id: string, status: string) {
=======

        return response;
    }
    static async switchEngine(id: string, status: string) {
        controller = new AbortController();
        signal = controller.signal;
>>>>>>> async-race
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': `${status}`}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id,
            status: status
        }
<<<<<<< HEAD
        const response = await fetch(`${baseURL}/engine${qString}`, {
            method: 'PATCH',
            body: JSON.stringify(toServer)
=======
        const response = /* await */ fetch(`${baseURL}/engine${qString}`, {
            method: 'PATCH',
            body: JSON.stringify(toServer),
            signal: signal
>>>>>>> async-race
        });
        console.log(response)
        return response;
    }

    // Winner
    static async createWinner(id: number, wins: number, time: number) {
        const toServer: Stats = {
            id: id,
            wins: wins,
            time: time
        }
<<<<<<< HEAD
        const response = await fetch(`${baseURL}/winners`, {
=======
        await fetch(`${baseURL}/winners`, {
>>>>>>> async-race
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toServer)
        });
<<<<<<< HEAD
        return response;
    }
}

=======
    }
}

export async function generateCars() {
    const namePool = ['Opel', 'Audi', 'Hummer', 'Lada', 'Pegoue', 'Ferrari', 'Lamborghini', 'Aston Martin', 'Porsche'];
    const modelPool = ['Model S', 'Model X', '206', 'Granta', '911', 'Cayene', 'Gallardo', 'Diablo', 'DB9', 'Spider'];

    interface Cars {
        [name: string]: string[] // [model, color]
    }
    const generatedCars: Cars = {}

    for (let i = 0; i < 100; i++) {
        generatedCars[namePool[Math.floor(Math.random()*namePool.length)]] = [`${modelPool[Math.floor(Math.random()*modelPool.length)]}`, `${Math.floor(Math.random()*16777215).toString(16)}`]
    }

    Object.keys(generatedCars).map(async (car) => {
        const newCar = new CarBlueprint(`${car} ${generatedCars[car][0]}`, `#${generatedCars[car][1]}`);

        await newCar.createCar();
    })
}

>>>>>>> async-race
export async function getAllCars() {
    const get: Promise<Response> = fetch(`${baseURL}/garage`);
    const fetchedData = await (await get).json();

    return fetchedData;
}

<<<<<<< HEAD
=======
export async function getWinner(id: string) {
    const fetchResponse = fetch(`${baseURL}/winners/${id}`);

    return fetchResponse
}

export async function updateWinner(id: number, wins: number, time: number) {
    const toServer: Stats = {
        wins: wins,
        time: time
    }
    const response = await fetch(`${baseURL}/winners/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toServer)
    });
    return response;
}

>>>>>>> async-race
export async function getAllWinners(page?:string, limit?:string, sort?:string, order?:string) {
    let fetchedData;
    const params: QueryParamStrings = [
        {'key': '_page', 'value': `${page}`}, 
        {'key': '_limit', 'value': `${limit}`},
        {'key': '_sort', 'value': `${sort}`},
        {'key': '_order', 'value': `${order}`}
    ];
    const qString = generateQueryString(params);

    if (!arguments.length) {
        const get: Promise<Response> = fetch(`${baseURL}/winners`);
        fetchedData = await (await get).json();
    } else {
        const get: Promise<Response> = fetch(`${baseURL}/winners${qString}`);
        fetchedData = await (await get).json();
    }
    console.log(fetchedData)
    return fetchedData
}
<<<<<<< HEAD
interface Winners {
    [id: string]: number[]
}
export const winner: Winners = {}

export async function animateCar(id: string) {
    const responseEngineStart = await CarBlueprint.startEngine(id, 'started');
=======

export function toggleButtons(mode: string) {
    const buttonsToToggle = document.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>;
    const inputsToToggle = document.querySelectorAll('.garage-inputs') as NodeListOf<HTMLInputElement>;
    buttonsToToggle.forEach((button) => {
        if (mode === 'disable') {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
        if (button.classList[0] === 'update') {
            button.disabled = true;
        }
    });
    inputsToToggle.forEach((input) => {
        if (mode === 'disable') {
            input.disabled = true;
            if (input.type === 'radio') {
                const label = input.parentElement as HTMLLabelElement;
                label.setAttribute('style', `
                border: solid 2px grey;
                background-color: grey;
                color: darkgray;
                cursor: default;
                `)
            }
        } else {
            input.disabled = false;

            if (input.type === 'radio') {
                const label = input.parentElement as HTMLLabelElement;
                label.setAttribute('style', `
                padding: .2rem .2rem;
                border: solid 1px var(--neon-color);
                background: none;
                color: var(--neon-color);
                cursor: pointer;`
                )
            }
            if (input.classList[0] === 'update') {
                input.disabled = true;
            }
        }
    })
}

interface Winners {
    [id: string]: (number|string)[]
}
export const winner: Winners = {}

export async function animateCar(id: string, status: string) {
    const carToMove = document.querySelector(`[data-id='${id}']`) as HTMLDivElement;
    const wheelsToAnimate = [carToMove.children[0], carToMove.children[1]];

    if (status === 'stopped') {
        window.cancelAnimationFrame(animationID[id]);
        carToMove.style.transform = `translateX(0px)`;
        wheelsToAnimate.forEach((wheel) => {
            (<HTMLImageElement>wheel.children[0]).style.transform = `rotate(0deg)`;
        })
        return;
    }

    const responseEngineStart = status === 'started' ? await CarBlueprint.startEngine(id) : await CarBlueprint.stopEngine(id);
>>>>>>> async-race
    const responseEngineStartData = await (await responseEngineStart).json();

    const carCoord = document.querySelector(`[data-id='${id}']`)?.getBoundingClientRect().left as number;
    const flagCoord = document.querySelector('.finish-flag')?.getBoundingClientRect().left as number;

<<<<<<< HEAD
    const distance =  Math.floor(flagCoord - carCoord); // px
    const animationDuration = Math.floor(responseEngineStartData.distance / responseEngineStartData.velocity); // ms

    let startAnimation: number;
    const carToMove = document.querySelector(`[data-id='${id}']`) as HTMLDivElement;

    let animID = requestAnimationFrame(measure);
=======
    const distance = Math.floor(flagCoord - carCoord); // px
    const animationDuration = Math.floor(responseEngineStartData.distance / responseEngineStartData.velocity); // ms

    let startAnimation: number;

    let animID = requestAnimationFrame(measure);
    let rotationDegree = 0;

>>>>>>> async-race
    function measure(time: number){
        if (!startAnimation) {
            startAnimation = time;
        }
<<<<<<< HEAD
        const progress = (time - startAnimation) / animationDuration;
        const translate = Math.floor(progress * distance);
        carToMove.style.transform = `translateX(${translate}px)`;
        if (progress < 1) {
            animID = requestAnimationFrame(measure)
=======
        
        const progress = (time - startAnimation) / animationDuration;
        const translate = Math.floor(progress * distance);
        carToMove.style.transform = `translateX(${translate}px)`;
        wheelsToAnimate.forEach((wheel) => {
            rotationDegree = rotationDegree + 15;
            (<HTMLImageElement>wheel.children[0]).style.transform = `rotate(${rotationDegree}deg)`;
        })
        if (progress < 1) {
            animID = requestAnimationFrame(measure);
            animationID = {...animationID, [`${id}`]: animID}
>>>>>>> async-race
        }
    }

    try {
        const isFailed = await CarBlueprint.switchEngine(id, 'drive') as Response;
<<<<<<< HEAD
        if (!isFailed.ok) throw new Error('Engine failed');

        winner[id] = [responseEngineStartData.velocity]; // this but when the whole race is over
        winner[id].push(animationDuration);
=======

        if (!isFailed.ok) throw new Error('Engine failed');

        winner[id] = [responseEngineStartData.velocity as number];
        winner[id].push(animationDuration as number);
>>>>>>> async-race
    } 
    catch(e) {
        window.cancelAnimationFrame(animID);
    }
    return responseEngineStart
}