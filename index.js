import { PinoResolver } from 'https://pino-sdk.vercel.app/core/pino-protocol.js';
import Pine from 'https://pino-sdk.vercel.app/core/pine.js';

let app = new Pine();
app.resolve(new PinoResolver(), startPine);
app.on('offline', showError);
app.on('init', startPine);

function startPine() {
	let code = document.querySelector('.code code')
	var script = document.createElement("script");

	app.fetch(`pine.notes.${app.params.note}`).then((data)=>{
		data = data.data;
		
		document.querySelector('.total').classList.add('hidden');
		code.innerHTML = data.content;
		code.parentElement.classList.remove('hidden');
		
		code.className = `h-full language-${app.params.lang}`;
		document.querySelector('#date').innerHTML = data.created.substring(0,10).replace(/\-/g, "/");

		let langs = {
			js: "javascript",
			py: "python"
		}

		script.src = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/${langs[app.params.lang]}.min.js`
		script.onload = ()=>{
			hljs.highlightAll();
		}
		document.body.appendChild(script);
	}).catch((e)=>{
		console.log(e.message)
	});
} 

function showError() {
	alert('Offline')
}
