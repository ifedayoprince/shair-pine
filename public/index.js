// import { PinoResolver } from 'https://pino-sdk.vercel.app/core/pino-protocol.js';
// import Pine from 'https://pino-sdk.vercel.app/core/pine.js';

// let app = new Pine();
// app.resolve(new PinoResolver(), startPine);
// app.on('offline', showError);
// app.on('init', startPine);
window.onload = ()=>{startPine()} 

function startPine() {
	let code = document.querySelector('.code code');
	
	code.ondbclick = (ev)=>{
		navigator.clipboard.writeText(code.innerText.toString());
	}
	hljs.highlightAll();
} 

function showError() {
	alert('Offline')
}
