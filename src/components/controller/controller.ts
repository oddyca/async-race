const baseURL = 'http://localhost:3000';

interface QueryParams {
    [key: string]: string,
}
type QueryParamStrings = QueryParams[];

function generateQueryString(queryParams: QueryParamStrings) {
    queryParams.length 
    ? `?${queryParams.map(query => `${query.key}=${query.value}`)}`
    : ''
}

export class CarBlueprint {

    name: string;
    color: string;
    id: number;

    constructor(name: string, color: string, id: number) {
        this.name = name,
        this.color = color,
        this.id = id
    }

    async createCar() {}

    async getCar() {
        const params: QueryParamStrings = [{'key': 'id', 'value': `${this.id}`}];

        const qString = generateQueryString(params);

        const fetchResponse = fetch(`${baseURL}/garage/${qString}`);
        const fetchedData = await (await fetchResponse).json();
        console.log(fetchedData);
    }

    async deleteCar() {} // GET -> /garag: id

    // Engine
    async startEngine() {} // PATCH -> /enging: id, status = started
    async stopEngine() {} // PATCH -> /enging: id, status = stopped
    async switchEngine() {} // PATCH -> /engine: id, status = [drive]
}

export async function getAllCars() {
    const get: Promise<Response> = fetch(`${baseURL}/garage`);

    const fetchedData = await (await get).json()
    console.log(fetchedData);
}