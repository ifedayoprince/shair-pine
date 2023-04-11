import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('x-powered-by', false);
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

let apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBpbm9TdG9yZSIsImlhdCI6MTY3OTgyMzAzOSwiZXhwIjoxNjgyNDE1MDM5fQ.lsi0e7qbuAXpXNDcWu_hcqROp5JaNHVwyC4ckIRetRg"
let langs = {
		js: "javascript",
		py: "python", 
		json: "json", 
		xml: "xml", 
		css: "css", 
		java: "java", 
		kotlin: "kotlin", 
		rust: "rust"
	}
let newAxe = axios.create()
newAxe.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`; 

async function indexFile(req, res) {
	try {
	var data = (await newAxe.get(`https://api-pinocchio.cyclic.app/pine/protocol/${req.query.origin}`)).data.protocol;
	var params = {};
	
	params.langCode = data.params.lang;
	params.lang = langs[data.params.lang];
	
	params.name = (data.params.fname.split('.')[0]).toLowerCase() + "." + data.params.lang;
	
	data = (await newAxe.get(`https://api-pinocchio.cyclic.app/pine/notes/${data.params.note}`)).data
	params.code = data.content;
	params.date = data.created.substring(0,10).replace(/\-/g, "/");
	
	res.render('index', {params})
	} catch (e) {
		console.log(`GET ${e.message}`)
		res.render('error')
	}
}

// index page
app.get('/', indexFile);
app.get('/index.html', indexFile);

// Catch all handler for all other request.
app.use('*', (req, res) => {
	res.send({msg: "Does not exist"})
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})


