xhr.onreadystatechange = function  () {
	if (req.readyState === 4){
		var arrayResponse = xhr.response;
		var dataView = new DataView(arrayResponse);
		var ints = new Uint32Array(dataView.by)
	}
}