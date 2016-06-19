Q.fcall(step1) 
 .then(step2)
 .then(step3)
 .then(step4)
 .then(function  (value4) {
 	
 }, function (error) {
 	
 })
 .done();

 function * longRunningTask () {
 	try{
 		var value1 = yield step1();
 		var value2 = yield step2(value1);
 		var value3 = yield step3(value2);
 		var value4 = yield step4(value3);
 	} catch(e){
 		
 	}
 }