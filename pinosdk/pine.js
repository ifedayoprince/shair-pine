class Pine {
	constructor() {
		window.pine = {
			server: "https://api-pinocchio.cyclic.app", 
			API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRheW8iLCJpYXQiOjE2NzY1OTEwODAsImV4cCI6MTY3OTE4MzA4MH0.D7XKf1pAr7wpLZ_Wqw4rXJU5NOsS108u9caZAP0bQYg"
		}
		window.pine.fetch = axios.create({baseUrl: window.pine.server}), 
		window.pine.fetch.defaults.headers.common['Authorization'] = `Bearer ${window.pine.API_KEY}`; 
		
	}
	async resolve(resolver, cb) {
		var urlParams = {};
		const searchParams = new URLSearchParams(window.location.href.split("?")[1]);
		searchParams.forEach((value, key) => {
			urlParams[key] = value;
		});
		if(!urlParams.origin && urlParams.origin.length < 8) throw new Error("'origin' is invalid" )
		await resolver.resolve(this, urlParams.origin, cb);
	}
	on(event, cb) {
		try {
			switch (event) {
				case 'init': {window.addEventListener('load', ()=>{cb();}); break;}
				case 'offline': {window.addEventListener('offline', ()=>{cb();}); break;}
			}
		} catch (e) {
			
		}
	}
	async fetch(method, url, cb) {
		var nUrl = url.replace(/\./g, "/");
		nUrl = `${window.pine.server}/${nUrl}`;
		//let xhr = new XMLHttpRequest();
		//xhr.open(method.toUpperCase(), url);
	//	xhr.setRequestHeader("Authorization", `Bearer ${window.pine.API_KEY}`);
		//xhr.onreadystatechange = function () {
	//		if (xhr.readyState === 4) {
    //			console.log(xhr);
		//	}
	//	};

	//	xhr.send({});

		window.pine.fetch[method](nUrl).then((d)=>{
			cb(d.data);
		}, (e)=>{
			console.log(`PINO ${url} `, e.message);
		});
	}
}

export default Pine;
