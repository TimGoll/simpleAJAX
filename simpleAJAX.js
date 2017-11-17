var simpleAJAX = (function() {
	var simpleAJAX = {
		request : function(formData, destinationURL, callback_onComplete, callback_onProgress) {
			var xmlhttp;
            if (window.XMLHttpRequest)
                xmlhttp = new XMLHttpRequest();
            else
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    if (callback_onComplete != undefined)
                        callback_onComplete(xmlhttp.responseText);
            };

            xmlhttp.onprogress = function(event) {
                if (callback_onProgress != undefined)
                    callback_onProgress(event);
            };

            xmlhttp.open('GET', destinationURL + '?nocache=' + Math.random() * 1000000, true);
            xmlhttp.send(formData);
		}
	};

	return simpleAJAX;
})();
