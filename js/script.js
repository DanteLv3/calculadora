// Código Javascript que se encarga de la funcionalidad de la calculadora

//Las variables years_mort y rate_int almacenan los valores inidcados por el usuario en los sliders

var years_mort = 0;
var rate_int = 0;

// Aquí vemos el código que se encarga de tomar los avlores en vivo de los sliders

var slider1 = document.getElementById("years_mort");
var output1 = document.getElementById("years_mort_out");
output1.innerHTML = slider1.value; 

slider1.oninput = function() {
    output1.innerHTML = this.value;
	years_mort = parseFloat(this.value);
}

var slider2 = document.getElementById("rate_int");
var output2 = document.getElementById("rate_int_out");
output2.innerHTML = slider2.value;  

slider2.oninput = function() {
    output2.innerHTML = (this.value / 10);
	rate_int = parseFloat(this.value) / 10;
}

// En el caso del slider 2 tomamos el valor que va de 1 a 100 y lo dividimos en 10 para poder dejar en decimal
// de 0.1 a 10 para que el slider funcione de manera correcta en el html

function cambiaValor(){
	output1.innerHTML = slider1.value;
	years_mort = parseFloat(this.value);
	output2.innerHTML = (slider2.value / 10);
	rate_int = parseFloat(this.value) / 10;
}

//isNumber() verifica que los valores ingresados en los campos input sean numéricos
// Adicionalmente restaura la clase original de estilos cuando los campos se resaltan en rojo

function isNumber(evt) {
	var elem1;
	var elem2;
	var elem3;
	
	elem1 = document.getElementById("loan_ammount");
	elem1.className = "field-normal-shadow";
	
	elem2 = document.getElementById("tax_ammount");
	elem2.className = "field";
	
	elem3 = document.getElementById("insurance_ammount");
	elem3.className = "field";
	
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// La función calculate() realiza el cálculo de los valores para arrojar los resultados correspondientes
// Se apoya en la función validate() para verificar que existan los valores necesarios para hacer el
// cálculo y mostrar los resultados respectivos

function calculate(){
	var loan_ammount = parseFloat(document.getElementById('loan_ammount').value);
	var tax_ammount = parseFloat(document.getElementById('tax_ammount').value);
	var insurance_ammount = parseFloat(document.getElementById('insurance_ammount').value);
	
	if(validate(loan_ammount, tax_ammount, insurance_ammount)){
	    //Aquí se calcula el resultado
		var principle = ((rate_int / 100) / 12) * (loan_ammount / (1 - (Math.pow((1 + ((rate_int / 100)/12)),- (years_mort*12)))));
		document.getElementById("principle").innerHTML = "$ " + principle;
		var tax = tax_ammount/12;
		document.getElementById("tax").innerHTML = "$ " + tax;
		var insurance = insurance_ammount/12;
		document.getElementById("insurance").innerHTML = "$ " + insurance;
		var result = principle + tax + insurance;
		document.getElementById("result").innerHTML = "$ " + insurance;
		var w = window.innerWidth;
		if(w <= 768){
			document.getElementById("result-box").style.display = "block";
			//console.log(document.getElementById("result-box").getBoundingClientRect());
			animResults();
		}
	}
}

// Función auxiliar de calculate() que se encarga de verificar que existan valores en los tres campos input del html
// Retorna true si en los tres campos hay valores, de lo contrario retorna false y se encarga de resaltar
// en rojo los campos

function validate(num1, num2, num3){
	var val1 = false;
	var val2 = false;
	var val3 = false;
	var elem;
	
	if(isNaN(num1)){
		val1 = false;
		elem = document.getElementById("loan_ammount");
		elem.className = "field-normal-shadow-alt";
	}else{
		if(num1 === 0){
			val1 = false;
			elem = document.getElementById("loan_ammount");
			elem.className = "field-normal-shadow-alt";
		}else{
			val1 = true;
		}
	}
	
	if(isNaN(num2)){
		val2 = false;
		elem = document.getElementById("tax_ammount");
		elem.className = "field-alt";
	}else{
		if(num2 === 0){
			val2 = false;
			elem = document.getElementById("tax_ammount");
			elem.className = "field-alt";
		}else{
			val2 = true;
		}
	}
	
	if(isNaN(num3)){
		val3 = false;
		elem = document.getElementById("insurance_ammount");
		elem.className = "field-alt";
	}else{
		if(num3 === 0){
			val3 = false;
			elem = document.getElementById("insurance_ammount");
			elem.className = "field-alt";
		}else{
			val3 = true;
		}
	}

	if(val1 && val2 && val3){
		return true;
	}else{
		return false;
	}
}

//Función que anima los resultados cuando la calculadora está en modo móvil

function animResults() {
  var elem = document.getElementById("result-box");   
  var pos = -225;
  var id = setInterval(frame, 2);
  function frame() {
    if (pos == 0) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px';
    }
  }
}