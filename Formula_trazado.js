var canvas = document.getElementById("canvas");
canvas.addEventListener("click", function(event){
    getMousePos(canvas, event);
});


const cord1 = document.getElementById("x");
const cord2 = document.getElementById("y");


var ctx = canvas.getContext("2d");

var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imgData.data;

var x0 = 0;
var x1 = 0;
var y0 = 0;
var y1 = 0;

var contador = 0;

function setPixel(x, y) {
    var n = (y * canvas.width + x) * 4;
    data[n] = 255;
    data[n + 1] = 0;
    data[n + 2] = 0;
    data[n + 3] = 255;
}






function Basico(x0, y0, x1, y1) {
    const m = (y1 - y0) / (x1 - x0);
    const b = y0 - m * x0;

    

    for (let x = x0; x <= x1; x++){
        let y = m * x + b;
        
        setPixel(x, Math.round(y));
    }

    for (let x = x1; x <= x0; x++){
        let y = m * x + b;
        
        setPixel(x, Math.round(y));
    }


    for (let y = y1; y <= y0; y++){
        let x = (y - b) / m;

        setPixel(Math.round(x), y);
    }

    for (let y = y0; y <= y1; y++){
        let x = (y - b) / m;

        setPixel(Math.round(x), y);
    }

    ctx.putImageData(imgData, 0, 0);

}

function getMousePos(canvas, evt) {
    
    
    contador++;

    var rect = canvas.getBoundingClientRect();

    var x = 0;
    var y = 0;


    x = evt.clientX - rect.left; 
    y = evt.clientY - rect.top;

    console.log( {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    });

    if (contador == 2){
        

        x1 = x;
        y1 = Math.trunc(y);
    
        
        
        console.log(
            "1 - " + contador + " - " 
            + "x0" + " = " + x0 + " - "
            + "y0" + " = " + y0 + " - "
            + "x1" + " = " + x1 + " - "
            + "y1" + " = " + y1
        );
    

            Basico(x0,y0,x1,y1);
            cord2.innerHTML = "X<sub>2</sub> = " + x1 + ", Y<sub>2</sub> = " + y1;

        
        ctx.putImageData(imgData, 0, 0);
    
        contador = 0;

    }else{
    
        x0 = x;
        y0 = Math.trunc(y);
    

        cord1.innerHTML = "X<sub>1</sub> = " + x0 + ", Y<sub>1</sub> = " + y0;

        console.log(
            "0 - " + contador + " - " + x0 + " - " + y0
        );
    }
}