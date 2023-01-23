export const baseURL = 'http://localhost:3000';

export let state: string;
export const updateState = (data: string) => {
    state = data;
};

export interface QueryParams {
    [key: string]: string,
}
export type QueryParamStrings = QueryParams[];

function generateQueryString(queryParams: QueryParamStrings) {
    queryParams.length 
    ? `?${queryParams.map(query => `${query.key}=${query.value}`)}`
    : ''
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
    async startEngine() {} // PATCH -> /enging: id, status = started
    async stopEngine() {} // PATCH -> /enging: id, status = stopped
    async switchEngine() {} // PATCH -> /engine: id, status = [drive]
}

export async function getAllCars() {
    const get: Promise<Response> = fetch(`${baseURL}/garage`);
    const fetchedData = await (await get).json();

    return fetchedData;
}