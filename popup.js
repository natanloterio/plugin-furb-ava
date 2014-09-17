function injetarScript() {
	
  chrome.tabs.executeScript(null, {
    file: "replace.js"
  }, function() {
	console.log("intetou script:");
   
  });

}

//window.onload = injetarScript;

function onClickInjetar(){

  injetarScript();

}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  injetarScript();
});

injetarScript();

