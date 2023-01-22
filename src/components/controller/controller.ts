export const baseURL = 'http://localhost:3000';

// Создаем блупринт для машины, чтобы затем создавать инстансы и хранить их в Map

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
        console.log(fetchedData);
    }

    static async deleteCar(id: string) {
        const response = await fetch(`${baseURL}/garage/${id}`, {
            method: 'DELETE'
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