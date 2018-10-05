webViewJavascriptBridge.callHandler('submitFromWeb', {'param': str}, function (responseData) {
    document.getElementById('show').innerHTML = 'send get resonsedata from java, data = ' + responseData;
})