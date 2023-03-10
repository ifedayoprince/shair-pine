import { PinoResolver } from 'https://pino-sdk.vercel.app/core/pino-protocol.js';
import Pine from 'https://pino-sdk.vercel.app/core/pine.js';

let app = new Pine();
app.resolve(new PinoResolver(), startPine);
app.on('offline', showError);
// app.on('init', startPine);

function startPine() {
	let code = document.querySelector('.code code')

	app.fetch(`pine.notes.${app.params.note}`).then((data)=>{
		data = data.data;
		
		document.querySelector('.total').classList.add('hidden');
		code.innerHTML = data.content;
		code.parentElement.classList.remove('hidden');
		
		// code.className = `h-full language-${data.lang}`;
		document.querySelector('#date').innerHTML = data.created.substring(0,10).replace(/\-/g, "/");
		hljs.highlightAll();
	}).catch((e)=>{
		console.log(e.message)
	});
} 

function showError() {
	alert('Offline')
}
