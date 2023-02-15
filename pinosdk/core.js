	class PinoCore {
	constructor() {
		this.pinoServer = 'pino-mock-server.cyclic.app';
		
		window.pine.server = this.pinoServer;
		
		this.resourceId = {
			NOTE: 100
		}
		
		window.pine.res = this.resourceId;
	}
	fetchNoteById(id, cb, fb) {
		this.fetchResource(window.pine.res.NOTE,{rid: id}).then(cb, fb);
	}
	async fetchResource(ep, params) {
		var finalUrl = `https://${this.pinoServer}/res?`;
		params.type = ep;
		params.pid = window.pine.pid;
		
		let par = [];
		Object.keys(params).forEach((v)=>{
			par.push(`${v}=${encodeURIComponent(params[v])}`);
		})
		finalUrl += par.join('&');
		
		// return {data: finalUrl, ext: 'js'};
		return fetch({method: "GET", url: finalUrl});
	}
}

window.pine.core = new PinoCore();
