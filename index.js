import { PinoResolver } from 'https://pino-sdk.vercel.app/core/pino-protocol.js';
import Pine from 'https://pino-sdk.vercel.app/core/pine.js';

let app = new Pine();
app.resolve(new PinoResolver(), startPine);
app.on('offline', showError);
app.on('init', startPine);

function startPine() {
	let code = document.querySelector('.code code');
	var script = document.createElement("script");

	code.ondbclick = (ev)=>{
		navigator.clipboard.writeText(code.innerText.toString());
	}
	let langs = {
		js: "javascript",
		py: "python", 
		json: "json", 
		xml: "xml"
	}

	script.src = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/${langs[app.params.lang]}.min.js`;
	document.body.appendChild(script);
	let fn = document.querySelector('.filename')
	fn.innerText = (app.params.fname.split('.')[0]).toLowerCase();
	fn.innerHTML += `<p class="ext text-lg text-gray-300">.${app.params.lang}</p>`;
	code.className = `h-full language-${app.params.lang}`;

	app.fetch(`pine.notes.${app.params.note}`).then(({data})=>{
		document.querySelector('.total').classList.add('hidden');
		code.innerHTML = data.content;
		code.parentElement.classList.remove('hidden');
		
		document.querySelector('#date').innerHTML = data.created.substring(0,10).replace(/\-/g, "/");
		hljs.highlightAll();
	}).catch((e)=>{
		code.innerHTML = 'Error'
	});
} 

function showError() {
	alert('Offline')
}
