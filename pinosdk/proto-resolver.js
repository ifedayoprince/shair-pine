class PinoProtocolResolver {
	constructor(url) {
		this.url = url;
		this.params = this.parseUrlForParams();
		
		window.pine.params = this.params;
	}
	parseUrlForParams() {
		var urlParams = {};
		const searchParams = new URLSearchParams(this.url.split("?")[1]);
		searchParams.forEach((value, key) => {
			urlParams[key] = value;
		});
		return urlParams;
	}
}
