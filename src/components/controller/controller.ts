export const baseURL = 'http://localhost:3000';

export let state: string;
export const updateState = (data: string) => {
    state = data;
};

let animationID: { [key: string]: number } = {};

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

        const response = await fetch(`${baseURL}/garage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(toServer)
        });

        return response;
    }

    static async getCar(id: number) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}];

        const qString = generateQueryString(params);

        const fetchResponse = fetch(`${baseURL}/garage/${qString}`);
        const fetchedData = await (await fetchResponse).json();

        return fetchedData
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
    static async startEngine(id: string) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': 'started'}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id
        }
        const response = await fetch(`${baseURL}/engine${qString}`, {
            method: 'PATCH',
            body: JSON.stringify(toServer)
        });

        return response;
    }
    static async stopEngine(id: string) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': 'stopped'}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id
        }
        const response = await fetch(`${baseURL}/engine${qString}`, {
            method: 'PATCH',
            body: JSON.stringify(toServer)
        });

        return response;
    }
    static async switchEngine(id: string, status: string) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}, {'key': 'status', 'value': `${status}`}];
        const qString = generateQueryString(params);

        const toServer: QueryParams = {
            id: id,
            status: status
        }
        const response = await fetch(`${baseURL}/engine${qString}`, {
            method: 'PATCH',
            body: JSON.stringify(toServer)
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
        const response = await fetch(`${baseURL}/winners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toServer)
        });
        return response;
    }
}

export async function getAllCars() {
    const get: Promise<Response> = fetch(`${baseURL}/garage`);
    const fetchedData = await (await get).json();

    return fetchedData;
}

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

interface Winners {
    [id: string]: (number|string)[]
}
export const winner: Winners = {}

export async function animateCar(id: string, status: string, carName?: string, carColor?: string) {
    const carToMove = document.querySelector(`[data-id='${id}']`) as HTMLDivElement;

    if (status === 'stopped') {
        console.log('stopped')
        window.cancelAnimationFrame(animationID[id]);
        carToMove.style.transform = `translateX(0px)`;
        return;
    }

    const responseEngineStart = status === 'started' ? await CarBlueprint.startEngine(id) : await CarBlueprint.stopEngine(id);
    const responseEngineStartData = await (await responseEngineStart).json();

    const carCoord = document.querySelector(`[data-id='${id}']`)?.getBoundingClientRect().left as number;
    const flagCoord = document.querySelector('.finish-flag')?.getBoundingClientRect().left as number;

    const distance =  Math.floor(flagCoord - carCoord); // px
    const animationDuration = Math.floor(responseEngineStartData.distance / responseEngineStartData.velocity); // ms

    let startAnimation: number;

    let animID = requestAnimationFrame(measure);
    
    function measure(time: number){
        if (!startAnimation) {
            startAnimation = time;
        }
        const progress = (time - startAnimation) / animationDuration;
        const translate = Math.floor(progress * distance);
        carToMove.style.transform = `translateX(${translate}px)`;
        if (progress < 1) {
            animID = requestAnimationFrame(measure);
            animationID = {...animationID, [`${id}`]: animID}
        }
    }

    try {
        const isFailed = await CarBlueprint.switchEngine(id, 'drive') as Response;
        if (!isFailed.ok) throw new Error('Engine failed');

        winner[id] = [responseEngineStartData.velocity as number];
        winner[id].push(animationDuration as number);
        if (carName && carColor) {
            winner[id].push(carName);
            winner[id].push(carColor);
        }
        
    } 
    catch(e) {
        window.cancelAnimationFrame(animID);
    }
    return responseEngineStart
}