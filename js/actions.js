var fn = {
	deviceready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},

	init: function(){
		/* 
		 *En esta sección vamos a asociar 
		 *todos los eventos del Click al HTML
		 */
		 $("#botonRegistrar").tap(fn.registrar);
		 $("#botonTomarFoto").tap(mc.abrirCamara);
/*console.log("algo");*/
	},

	registrar: function(){
		/*
		* 1)Paso obtener todos los datos del formulario
		*/
		var nombre   = $("#nombreRegistro").val();
		var email    = $("#emailRegistro").val();
		var tel      = $("#telefonoRegistro").val();
		var password = $("#passwordRegistro").val();
		var foto     = $("#fotoTomadaRegistro.img")[0];
/*console.log(nombre);
*console.log(email);
*console.log(tel);
*console.log(password);*/

/* try es para tipo de error*/
		try{ 

			if(foto == undefined){
				throw new Error ("Debe de Tomar una Foto");
			}

			if(typeof nombre !== "string"){
				throw new Error("El nombre no es válido");
			}
			if(email == ""){
				throw new Error ("El email es Forzoso");
			}
			if(password == ""){
				throw new Error ("La contraseña es necesaria");
			}
			if(email.indexOf("@") == -1){
				throw new error ("el email debe contener un arroba");
			}
			if (Number.isNan(Number(tel))) {
				throw new Error ("El Número de telefono debe ser númerico");
			}

/*
* a qui va el registro
*/
			fn.enviarRegistro(nombre, email, tel, password, foto);


		}catch(error){
				alert(error);
		}

	},

	enviarRegistro: function(nombreR, emailR, telR, passwordR, fotoR){
		$.ajax({
		  method: "POST",
		  url: "http://www.colors.edu.mx/archivoTest.php",
		  data: { nombre: nombreR,
		  		  email: emailR,
		  		  tel: telR,
		  		  password: passwordR
		 }
		})
		  .done(function( mensaje) {
		  	if (mensajec== 1){
		  		/*
		  		*transferimos la foto
		  		*/
		  		var fotoURL = fotoR.src;
		  		file.transferir(fotoURL);
		  	} else{
		        alert( "Error al enviar datos de registro" + mensaje );
		      }
		});

	}
};

/*  llamar al metodo init en el navegador
*
*/
/*console.log("algo");*/
//fn.init();

/*
* llamar deviceready para compilar
*/
$(fn.deviceready);