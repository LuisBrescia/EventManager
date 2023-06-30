import '../CSS/style.css'
import javascriptLogo from '../javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Event Manager</h1>
    <h3>Trabalho interdisciplinar de aplicações web</h3>
    <div class="card">
      <a href="./HTML/Listas.html"><button type="button">Clique aqui para iniciar</button>
    </div>
  </div>
`