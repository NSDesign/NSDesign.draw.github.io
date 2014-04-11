//alert("testoutput.js Loaded");


function initTestOutput(){
	
	var screenSize = "Screen Width : " + screen.width + "<br>" + "Screen Height : " + screen.height + "<br>";
	var windowSize = "Window Width : " + window.innerWidth + "<br>" + "Window Height : " + window.innerHeight + "<br>"; 
	
	var testOutputObj = document.getElementById("TestOutput");	
	testOutputObj.innerHTML = screenSize + windowSize; 
	testOutputObj.style.position = "absolute";
	testOutputObj.style.top = 0 + "px";
	testOutputObj.style.left = (screen.width - testOutputObj.offsetWidth) + "px";
	
	//console.log(testOutputObj.offsetWidth);
	
}
		

