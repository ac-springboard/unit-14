'use strict';

class UrlUtils {
	constructor(urlString) {
		this.url = new URL(urlString);
		console.log('searchParams:', this.url);
	}

	getUrl() {
		return this.url.toString();
	}

	getUrlJson() {
		return this.url.toJSON();
	}

	getUrlDetails = () => {
		const params     = this.url.searchParams;
		const paramsJson = {};
		params.forEach((value, key) => paramsJson[key] = value);
		return {
			protocol: this.url.protocol,
			hostname: this.url.hostname,
			host    : this.url.host,
			port    : this.url.port,
			path    : this.url.pathname,
			origin  : this.url.origin,
			search  : this.url.search,
			searchParams: paramsJson
		}
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const gSearch = "https://www.google.com/search?newwindow=1&client=ubuntu&hs=xsP&channel=fs&sxsrf=ALeKk02oGAOEU4C_c7RoGH9IbzMspuXehg%3A1602047476499&ei=9E19X6P-HdTH-gTl2piwCQ&q=%22Lahiru+Ginnalyia+Gamathige%22&oq=%22Lahiru+Ginnalyia+Gamathige%22&gs_lcp=CgZwc3ktYWIQDDIHCCEQChCgATIHCCEQChCgAToHCAAQRxCwAzoFCAAQkQI6CAguELEDEIMBOgsILhCxAxDHARCjAjoICAAQsQMQgwE6BQgAELEDOgIIADoICC4QxwEQowI6BAgAEEM6AgguOgoIABCxAxCDARBDOgcILhCxAxBDOgcIABCxAxBDOgQILhAKOggILhDHARCvAToFCC4QsQM6BAgAEAo6CwguELEDEMcBEK8BOgsIABCxAxCDARDJAzoKCC4QxwEQrwEQCjoOCC4QsQMQgwEQxwEQrwE6CAguEMkDEJMCOg4ILhDHARCvARDJAxCTAjoJCAAQyQMQFhAeOgUIIRCgAToFCCEQqwJQ3LQJWPSqDWDd0A1oF3AAeACAAaEBiAHFIZIBBTEyLjI3mAEAoAEBqgEHZ3dzLXdperABAMgBCMABAQ&sclient=psy-ab&ved=0ahUKEwijyP_126HsAhXUo54KHWUtBpYQ4dUDCAw";
	const urlu    = new UrlUtils(gSearch);
	console.log("================================");
	console.log("URL");
	console.log("================================");
	console.log(urlu.getUrl());
	document.getElementById("url").innerText = urlu.getUrl();
	console.log("================================");
	console.log("URL JSON");
	console.log("================================");
	console.log(urlu.getUrlJson());
	document.getElementById
					("url_json").innerText = urlu.getUrlJson();
	console.log("================================");
	console.log("URL DETAILS");
	console.log("================================");
	console.log(urlu.getUrlDetails());
	document.getElementById("url_details").innerText=JSON.stringify(urlu.getUrlDetails(), null, 4);
	console.log("================================");
	console.log("URL OBJECT");
	console.log("================================");
	const logoUrl=urlu.getUrlDetails().protocol+urlu.getUrlDetails().hostname + "/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
	document.getElementById("url_object").innerText=logoUrl;
	const img=document.getElementById("logo_img");
	img.src=logoUrl;
});
