
// utils
function $(ele) {
	return document.querySelector(ele)
}

// URL可选项，默认取 浏览器URL指定参数
function QueryUrlParams (name, url){
	var locationUrl = '?' + window.location.href.split("?")[1];
	if (url) {
		var s = url.indexOf("?");
		locationUrl = url.substring(s);
	}
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = locationUrl.substr(1).match(reg);
	if (r!=null) return unescape(r[2]);
	return null;
}
