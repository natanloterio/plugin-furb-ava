console.log("injetou");
  var arrayCursos = [
						{codigo:"MAT.131.0.4",descricao:"Estatistica"}
						,{codigo:"CMP.88.2.1",descricao:"Arquitetura de Computadores II"}
						,{codigo:"CMP.89.0.2",descricao:"Lógica para Computação"}
						,{codigo:"CMP.66.1.2",descricao:"Programação I"}
						,{codigo:"LET.160.0.6",descricao:"Linguagem Científica"}];
  
  function traduzir(document){
    //console.log("traduzindo...");
	// create a TreeWalker of all text nodes
	var allTextNodes = document;
	//console.log(allTextNodes);
    // some temp references for performance
    var tmptxt = "";
    var tmpnode = "";
    // compile the RE and cache the replace string, for performance
    var cakeRE = "CMP.88.2.1  ";//prompt("Please enter your name", "Harry Potter");
    var replaceValue = "Arquitetura de Computadores II";//prompt("Please enter your name", "Harry Potter");

	// iterate through all text nodes
	while (allTextNodes.nextNode()) {
		tmpnode = allTextNodes.currentNode;
		tmptxt = tmpnode.nodeValue;
		//console.log("loop");
		for(i=0;arrayCursos[i];++i){
		    cakeRE = arrayCursos[i].codigo;
			replaceValue = arrayCursos[i].descricao+" ("+cakeRE+")"+"&zwnj;";

            //se já foi modificado antes, nao faz nada
            //if(!foiModificado(tmpnode)){
                // limpa codigos no formato [codig]
                tmptxt = tmptxt.replace(/\[.*?\]/g,"");
                tmpnode.nodeValue = tmptxt;
                tmpnode.textContent = tmptxt;

                // troca codigos por descricoes
                var re = new RegExp(cakeRE.trim(),"g");
                tmptxt = tmptxt.replace(re, replaceValue);
                tmpnode.nodeValue = tmptxt;
                tmpnode.textContent = tmptxt;

                //console.log("procurando "+cakeRE+" em "+tmpnode.nodeValue);
            //}

        }
		
	}  
    
	
  }

  function foiModificado(elemento){
      return content.indexOf("\u200C") >= 0;
  }
 
 
  
  function percorrerTodosFrames(__self){
		var root = document.createTreeWalker(__self.document,NodeFilter.SHOW_TEXT);
		traduzir(root);
		//alert("injetamos js nesta janela");
	    console.log("percorrerTodosFrames");
		var frames = document.getElementsByTagName("frame");//__self.frames;
		//console.log("total de frames"+frames.length);
		var i = 0;
		for(i=0;frames[i];++i){
		    //console.log("batendo frame "+i);
		    //console.log(frames[i]);
			var frm = frames[i];
			if(frm && frm.contentWindow && frm.contentWindow.document){
				var documentDoFrame = document.createTreeWalker(frm.contentWindow.document,NodeFilter.SHOW_TEXT);
				traduzir(documentDoFrame);
			}else{
			  //  console.log("frame do loop nao existe");
				//console.log("frame "+frm.id+" não possui document");
			
			}
		}
	}  
	
  var __self = self;
  //percorrerTodosFrames(__self);
  setTimeout(function(){percorrerTodosFrames(__self)}, 1000);
  //window.onload = percorrerTodosFrames(__self);