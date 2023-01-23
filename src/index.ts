import { App } from './components/app';
import { Header } from './components/header/header';
import { Winners } from './components/winners/winners';
import './style.css'

const app = document.querySelector('#app');

async function render() {
    const header =  new Header();
    const headerRender = header.render();

    const carsToRender = await App.run();
    
    // const winToRender = await WinnersList.render()
    app?.append(headerRender);
    app?.append(carsToRender);
    
}

render()
