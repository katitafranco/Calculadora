var display = document.getElementById('display');
var anteriorNumero =0
var anteriorDigito =0;
var anteriorTecla="";
var operador = "igual";

var Calculadora={

  init: function(){
    var self = this;
    for (var i = 0; i < 10; i++) {
      agregarEventos(document.getElementById(i));
    };
    agregaEventosOperadores(document.getElementById("mas"));
    agregaEventosOperadores(document.getElementById("menos"));
    agregaEventosOperadores(document.getElementById("por"));
    agregaEventosOperadores(document.getElementById("dividido"));
    agregaEventosOperadores(document.getElementById("sign"));
    agregaEventosOperadores(document.getElementById("punto"));
    agregaEventosOperadores(document.getElementById("igual"));
    agregaEventosOperadores(document.getElementById("on"));

    function agregarEventos(boton){
        boton.addEventListener("click",function(){
            self.calcular(boton.id)
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
          self.calcular2(boton.id)
      });
        boton.addEventListener("mousedown", function(){
            boton.setAttribute("style","transform:scale(0.90,0.90)")
        });
        boton.addEventListener("mouseup", function(){
            boton.setAttribute("style","transform:scale(1,1)")
        });

    };
    function agregarEventoClick(boton){

    }
  },
    calcular: function(n){
      var cadena = display.innerText;
      var anteriorNumero = parseFloat(display.innerText);
      var anteriorDigito = parseFloat(display.innerText);
      if (cadena==0)
      {
        display.innerText = n;
        anteriorTecla=n;
      }else {
        if(this.verificaLength(cadena)){
          display.innerText = cadena + n;
          anteriorTecla=n;
        }
      }
    },
    calcular2: function(n){
      var numero = parseFloat(display.innerText);
      switch (n) {
        case "on":
          this.encerarDisplay();
          break;
        case "mas":
          display.innerText =""
          operador = anteriorTecla = "mas";
          break;
        case "menos":
          display.innerText =""
          operador="menos"
          break;
        case "igual":
          // case operador:
          //
          //   break;
          break;

        case "sign":
          this.modificarSigno()
          break;

      }

    },
    encerarDisplay: function(){
      display.innerText="0";
      anteriorTecla="";
      anteriorNumero=0
      anteriorDigito=0;
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
    }
}
Calculadora.init();
