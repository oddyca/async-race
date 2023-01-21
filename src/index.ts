import { App } from './components/app'
import './style.css'

const app = document.querySelector('#app');

async function test() {
    const carsToRender = await App.run();
    app?.append(carsToRender);
}

test()
