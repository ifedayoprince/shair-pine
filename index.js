import { PinoResolver } from '/pinosdk/pino-protocol.js';
import Pine from '/pinosdk/pine.js';

let app = new Pine();
app.resolve(new PinoResolver(), startPine);
app.on('offline', showError);
// app.on('init', startPine);

function startPine() {
	let code = document.querySelector('.code code')
	app.fetch('get', `pine.notes.${app.params.note}`, (data)=>{
		code.innerHTML = data.content;
		code.className = `h-full language-${data.lang}`;
		
		document.querySelector('#date').innerHTML = data.created.substring(0,10).replace(/\-/g, "/");
		hljs.highlightAll();
	});
} 

function showError() {
	alert('Offline')
}
