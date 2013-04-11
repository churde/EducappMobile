
function con(){
    
    try{
        
        for(var i=0, l=arguments.length; i<l; i++){
            console.log(arguments[i])
        }
        
    }
    catch(e){
        
    }
  
}

function err(e){
    con("Error " + e.message + " en la linea " + e.lineNumber + " del archivo " + e.fileName)
}


