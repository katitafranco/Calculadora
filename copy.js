// var display = document.getElementById('display');
var anteriorNumero =0
var operador = "";
var total = 0;
var ultimoOperando = 0;
var operadorSecuencial ="";
//se activa cuando la tecla oprimida es "=" y se desactiva cuando se acciona una tecla de operadores aritmeticos y el "ON"
var repiteSecuencia=true;


var Calculadora={
  init: function(){
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
        boton.addEventListener("mousedown", function(){
            boton.setAttribute("style","transform:scale(0.90,0.90)")
        });
        boton.addEventListener("mouseup", function(){
            boton.setAttribute("style","transform:scale(1,1)")
        });

    };
    function agregaEventosOperadores(boton){
      boton.addEventListener("click",function(){
          self.calcular2(boton.id,document.getElementById("display"))
      });
        boton.addEventListener("mousedown", function(){
            boton.setAttribute("style","transform:scale(0.90,0.90)")
        });
        boton.addEventListener("mouseup", function(){
            boton.setAttribute("style","transform:scale(1,1)")
        });

    };
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
          if(this.verificaLength(cadena))
          {
              this.agregarPunto();
          }
      }
      else
      {
        if(this.verificaLength(cadena))
        {
          display.innerText = cadena + n;
        }
      }
    },
    calcular2: function(n,display){
      // se vacia el display y se asigna el ultimo operador cuando el objeto display tiene un numero y
      // cuando se envia un operador aritmeticos
          var operando = parseFloat(display.innerText);

              switch (n)
              {
                case "on":
                  this.encerarDisplay();
                  break;
                case ( operando!="" &&( n == "mas" || n == "menos" || n == "por" || n == "dividido")):
                      switch (operador) {
                        case "mas":
                          total = total + operando;
                          break;
                        case "menos":
                          // total = total - operando;
                          if(total!=0){
                            total = total - operando;
                          }else{
                            total = operando;}
                          break;
                        case "por":
                          if(total!=0){
                            total = total * operando;
                          }else{
                            total = operando;
                          }
                          break;
                        case "dividido":
                          // total = total / operando;
                          if(total!=0){
                            total = total / operando;
                          }else{
                            total = operando;}
                          break;
                      }
                      anteriorNumero = operando; // asigna el ultimo numero para utilizarlo en caso de secuencia
                      display.innerText = ""; // vacia el display esperando el siguiente numero para la operacion
                      operador = n; // asigna el ultimo operador para utilizarlo en caso de secuencia
                      repiteSecuencia = false; // no es secuencia de operaciones
                case "igual":
                  var result = this.realizarCalculosAritmeticos(operando);
                  resultString = String(result);
                  display.innerText = (resultString.length < 9 ? result : resultString.substring(0,7));
                  total = result;
                  break;

                case "sign":
                  this.modificarSigno()
                  break;
              }
            }
    },

    realizarCalculosAritmeticos: function(operandoActual){

      if(repiteSecuencia == true)
      {
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
      else
      {
        if(operador !="" && anteriorNumero!=0)
        {
          switch (operador) {
            case "mas":
              total = parseFloat(total)+  operandoActual ;
              break;
            case "menos":
              total = parseFloat(total) - operandoActual;
              break;
            case "por":
              total = parseFloat(total) * operandoActual ;
              break;
            case "dividido":
              total = parseFloat(total) / operandoActual;
              break;
          }
          repiteSecuencia = true;
          anteriorNumero = operandoActual;// asigna el ultimo numero para utilizarlo en caso de secuencia
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
        display.innerText=a;
    },
    verificaLength: function(cadena){
      if (cadena.length<8)
      {return true;}
      else {
        return false;}
    },
    agregarPunto: function(){
      var cadena = display.innerText;
      var punto = cadena.indexOf(".")
      if (punto == -1){
        display.innerText= cadena+".";
      }else {
        return;
      }

    }
}
Calculadora.init();
