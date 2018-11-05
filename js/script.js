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
	var percent = (years_mort * 100)/40;
	document.getElementById("years_mort").style.background = "linear-gradient(to right, #1091cc " + percent + "%, #d8d8d8 " + percent + "%";
}

var slider2 = document.getElementById("rate_int");
var output2 = document.getElementById("rate_int_out");
output2.innerHTML = slider2.value;  

slider2.oninput = function() {
	var percent = this.value;
	document.getElementById("rate_int").style.background = "linear-gradient(to right, #1091cc " + percent + "%, #d8d8d8 " + percent + "%";
    output2.innerHTML = (this.value / 10);
	rate_int = parseFloat(this.value) / 10;
}

// En el caso del slider 2 tomamos el valor que va de 1 a 100 y lo dividimos en 10 para poder dejar en decimal
// de 0.1 a 10 para que el slider funcione de manera correcta en el html

function cambiaValor(){
	output1.innerHTML = slider1.value;
	years_mort = 20;
	output2.innerHTML = (slider2.value / 10);
	rate_int = (50/10)
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
	
	document.getElementById("mandTxt_1").style.display = "none";
	document.getElementById("mandTxt_2").style.display = "none";
	document.getElementById("mandTxt_3").style.display = "none";
	
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
		document.getElementById("btn_text").innerHTML = "RECALCULATE";
		
		var principle = ((rate_int / 100) / 12) * (loan_ammount / (1 - (Math.pow((1 + ((rate_int / 100)/12)),- (years_mort*12)))));
		principle = Math.round(principle * 100) / 100;
		document.getElementById("principle").innerHTML = "$ " + principle;
		document.getElementById("principle").style.opacity = "1";
		
		var tax = tax_ammount/12;
		tax = Math.round(tax * 100) / 100;
		document.getElementById("tax").innerHTML = "$ " + tax;
		document.getElementById("tax").style.opacity = "1";
		
		var insurance = insurance_ammount/12;
		insurance = Math.round(insurance * 100) / 100;
		document.getElementById("insurance").innerHTML = "$ " + insurance;
		document.getElementById("insurance").style.opacity = "1";
		
		var result = principle + tax + insurance;
		result = Math.round(result * 100) / 100;
		document.getElementById("result").innerHTML = "$ " + result;
		document.getElementById("result").style.opacity = "1";
		
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
		document.getElementById("mandTxt_1").style.display = "block";
	}else{
		if(num1 === 0){
			val1 = false;
			elem = document.getElementById("loan_ammount");
			elem.className = "field-normal-shadow-alt";
			document.getElementById("mandTxt_1").style.display = "block";
		}else{
			val1 = true;
		}
	}
	
	if(isNaN(num2)){
		val2 = false;
		elem = document.getElementById("tax_ammount");
		elem.className = "field-alt";
		document.getElementById("mandTxt_2").style.display = "block";
	}else{
		if(num2 === 0){
			val2 = false;
			elem = document.getElementById("tax_ammount");
			elem.className = "field-alt";
			document.getElementById("mandTxt_2").style.display = "block";
		}else{
			val2 = true;
		}
	}
	
	if(isNaN(num3)){
		val3 = false;
		elem = document.getElementById("insurance_ammount");
		elem.className = "field-alt";
		document.getElementById("mandTxt_3").style.display = "block";
	}else{
		if(num3 === 0){
			val3 = false;
			elem = document.getElementById("insurance_ammount");
			elem.className = "field-alt";
			document.getElementById("mandTxt_3").style.display = "block";
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
  window.scrollBy(0,1000);
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