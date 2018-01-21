var anteriorNumero =0
var operador = "";
var total = 0;
var ultimoOperando = 0;
var operadorSecuencial ="";
//se activa cuando la tecla oprimida es "=" y se desactiva cuando se acciona una tecla de operadores aritmeticos y el "ON"
var repiteSecuencia=true;

var Calculadora={
  init: function(){
    this.encerarDisplay();
    var self = this;
    for (var i = 0; i < 11; i++) {
      if (i==10){
        agregarEventos(document.getElementById("punto"));
      }
      else{
        agregarEventos(document.getElementById(i));
      }
    };
    agregaEventosOperadores(document.getElementById("mas"));
    agregaEventosOperadores(document.getElementById("menos"));
    agregaEventosOperadores(document.getElementById("por"));
    agregaEventosOperadores(document.getElementById("dividido"));
    agregaEventosOperadores(document.getElementById("sign"));
    agregaEventosOperadores(document.getElementById("igual"));
    agregaEventosOperadores(document.getElementById("on"));

    function agregarEventos(boton){
        boton.addEventListener("click",function(){
            self.concatenaDigitos(boton.id,document.getElementById("display"))
        });
          self.agregaAnimacion(boton);
    };
    function agregaEventosOperadores(boton){
      boton.addEventListener("click",function(){
          self.realizaOperaciones(boton.id,document.getElementById("display"))
      });
      self.agregaAnimacion(boton);
    };
  },
    agregaAnimacion: function(boton)
    {
      boton.addEventListener("mousedown", function(){
          boton.setAttribute("style","transform:scale(0.90,0.90)")
      });
      boton.addEventListener("mouseup", function(){
          boton.setAttribute("style","transform:scale(1,1)")
      });
    },
    concatenaDigitos: function(n, display){
      var cadena = display.innerText;
      // var anteriorNumero = parseFloat(display.innerText);
      if (cadena=="0" && n!="punto")
      {
          display.innerText = n;
      }
      else if (cadena==0 && n=="punto")
      {
          display.innerText = "0."
      }
      else if(cadena!=0 && n=="punto")
      {
          this.agregarPunto();

      }
      else
      {
          display.innerText = this.verificaLongitudCadena(cadena + n);
      }
    },
    realizaOperaciones: function(n,display){
      // se vacia el display y se asigna el ultimo operador cuando el objeto display tiene un numero y
      // cuando se envia un operador aritmeticos
          var operando = parseFloat(display.innerText);
                if (n== "on"){
                      this.encerarDisplay();
                  }
                else if( n == "mas" || n == "menos" || n == "por" || n == "dividido" || n == "igual"){
                      var result = this.realizarCalculosAritmeticos(operando,n);
                      if(n=="igual")
                      {
                          display.innerText = this.verificaLongitudCadena(result);

                      }else { // vacia el display esperando el siguiente numero para la operacion
                        display.innerText = ""; operador = n; // asigna el ultimo operador para utilizarlo en caso de secuencia
                        repiteSecuencia = false; // no es secuencia de operaciones
                      }
                }
                else if(n=="sign"){
                      this.modificarSigno()
                }

    },
    realizarCalculosAritmeticos: function(operandoActual,tecla){
      if(repiteSecuencia == true)
      {
        if(tecla=="igual"){
            switch (operador) {
              case "mas":
                total = total + parseFloat(anteriorNumero);
                break;
              case "menos":
                total = total - parseFloat(anteriorNumero);
                break;
              case "por":
                total = total * parseFloat(anteriorNumero);
                break;
              case "dividido":
                total = total / parseFloat(anteriorNumero);
                break;
            }
          }
      }
      else
      {
          if(operador !="")
          {
            if(total==0)
            {
              total = operandoActual
            }else
            {
                switch (operador) {
                  case "mas":
                    total = parseFloat(total) +  operandoActual ;
                    break;
                  case "menos":
                      total = parseFloat(total) - operandoActual;
                    break;
                  case "por":
                      total = parseFloat(total) * operandoActual;
                    break;
                  case "dividido":
                      total = parseFloat(total) / operandoActual;
                    break;
                }
            }
            repiteSecuencia = true;
            anteriorNumero = operandoActual;
          }
          else {
            total = operandoActual;
          }
        }
        return total;
    },
    encerarDisplay: function(){
        display.innerText="0";
        anteriorNumero =0;
        operador = "";
        total = 0;
        ultimoOperando = 0;
        operadorSecuencial ="";
        repiteSecuencia=false;
    },
    modificarSigno: function(){
         var a = parseFloat(display.innerText)*-1;
        //
        if(parseFloat(display.innerText)==String(total).substring(0,8)||
            parseFloat(display.innerText)==String(total).substring(0,9))
        {
            total = total*-1;
            display.innerText = this.verificaLongitudCadena(total);
        }else {
          display.innerText= this.verificaLongitudCadena(a);
        }

    },
    verificaLongitudCadena: function(cadena){
      var resultString = String(cadena);
      return (resultString.length < 9 ? resultString : resultString.substring(0,8));

    },
    agregarPunto: function(){
      var cadena = display.innerText;
      var punto = cadena.indexOf(".")
      if (punto == -1){
        display.innerText= this.verificaLongitudCadena(cadena+".");
      }else {
        return;
      }
    }
}
Calculadora.init();
