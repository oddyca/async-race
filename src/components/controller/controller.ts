export const baseURL = 'http://localhost:3000';

export let state: string;
export const updateState = (data: string) => {
    state = data;
};

export interface QueryParams {
    [key: string]: string,
}
export type QueryParamStrings = QueryParams[];

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

    async getCar(id: number) {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${id}`}];

        const qString = generateQueryString(params);

        const fetchResponse = fetch(`${baseURL}/garage/${qString}`);
        const fetchedData = await (await fetchResponse).json();
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
    static async startEngine(id: string, status: string) {
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
        return response;
    } // PATCH -> /enging: id, status = started
    static async stopEngine() {} // PATCH -> /enging: id, status = stopped
    static async switchEngine() {} // PATCH -> /engine: id, status = [drive]
}

export async function getAllCars() {
    const get: Promise<Response> = fetch(`${baseURL}/garage`);
    const fetchedData = await (await get).json();

    return fetchedData;
}

export async function animateCar(id: string) {
    const response = await CarBlueprint.startEngine(id, 'started');
    const responseData = await (await response).json();
    const carCoord = document.getElementById(`car-number-${id}`)?.getBoundingClientRect().left as number;
    const flagCoord = document.querySelector('.finish-flag')?.getBoundingClientRect().left as number;

    const distance =  Math.floor(flagCoord - carCoord); // px
    const animationDuration = Math.floor(responseData.distance / responseData.velocity); // ms

    let startAnimation: number;
    const carToMove = document.getElementById(`car-body-${id}`) as HTMLDivElement;
    console.log(carToMove)

    requestAnimationFrame(function measure(time){
        if (!startAnimation) {
            startAnimation = time;
        }
        const progress = (time - startAnimation) / animationDuration;
        const translate = Math.floor(progress * distance);
        carToMove.style.transform = `translateX(${translate}px)`;
        if (progress < 1) {
            requestAnimationFrame(measure);
        }
    });

    console.log(distance, animationDuration);
}