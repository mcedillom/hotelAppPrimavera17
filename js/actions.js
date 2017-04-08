var fn  = {
	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false);
	},

	init: function(){
		/*
		 * Colocamos la fecha actual
		 */ 
		 fn.ponerFecha();

		/*
		 * En esta seccion vamos a asociar
		 * todos los eventos del "Click" al HTML
		 */
		 $("#botonRegistrar").tap(fn.registrar);
		 $("#botonTomarFoto").tap(mc.abrirCamara);
		 $(".tipoHabitacion").tap(fn.seleccionarTipoDeHabitacion);
		 $("#reserva1 .siguiente").tap(fn.reserva1Siguiente);
		 $("#reserva2 .reservar").tap(fn.realizarReservacion);
		 $("#botonCerrarSesion").tap(fn.cerrarSesion);
		 $("#botonIniciarSesion").tap(fn.iniciarSesion);
		 $("#botonHistorial").tap(fn.mostrarHistorial);
		 $("#botonReservasPendientes").tap(fn.mostrarReservasPendientes);
		 $("#botonGaleria").tap(fn.mostrarGaleria);
		 $("#gallery").on('tap', 'img', fn.mostrarPopUp);
	},

	mostrarPopUp: function(){
		var rutaImagen = $(this).attr("src");
		$("#popupFoto img").attr("src", rutaImagen);
		$("#popupGaleria").popup("open");
	},

	mostrarGaleria: function(){
		$.ajax({
		  	    method:"GET",
			    url:"http://www.colors.edu.mx/images.json"
		       }).done(function(data){
		         //console.log(data);
		         /*
		         *Inciar la galeria
		         */
		         $("#gallery").html("");
		         var contenidoGaleria="";
		         var contador        =1;
		         /*
		         * Recorrer el arreglo de imagenes
		         */
		         data.images.forEach(function(image){
		         	if((contador % 2) !=0 ){
		         		contenidoGaleria+="<div class='ui-block-a'><img src='img/galeria/"+image.imageName+".jpg'></div>"
		         	}else{
		         		contenidoGaleria+="<div class='ui-block-b'><img src='img/galeria/"+image.imageName+".jpg'></div>"
		         	}         	
		         	contador++;
		         });
		         $("#gallery").html(contenidoGaleria);
	           });
	},

	mostrarReservasPendientes: function(){
		almacen.cargarDatosReservasP();
	},	

	mostrarHistorial: function(){
		almacen.cargarDatosHistorial();
	},

	iniciarSesion: function(){
		var pass 		= $("#passwordSesion").val();
		var email 		= $("#emailSesion").val();

		try{
			
			if(email == ""){
				throw new Error("Email forzozo")
			}
			if(email.indexOf("@") == -1){
				throw new Error("Debe contener arroba");
			}
			if (pass == "")
			{
				throw new Error("Campo contraseña es forzozo");
			}
			fn.enviaSesion(email, pass);	

		}catch(error){
			alert(error);
		}
	},

	enviaSesion: function(emailR,passR)
	{
		$.ajax({
			  method: "POST",
			  url: "http://www.colors.edu.mx/archivoTest.php",
			  data: { email: emailR, 
			  		  pass: passR
			  		}

			}).done(function( mensaje ) {
			   		if(mensaje == 1)
			   		{
			   			window.localStorage.setItem("nombreUsuario", emailR);
						window.location.href="#home";
			   		}
			   		else
			   		{
			   			alert("Error al iniciar Sesion");
			   		}
			  }).fail(function (error){
			});
	},

	cerrarSesion: function(){
		window.localStorage.removeItem("nombreUsuario");
		window.location.href = "#registro";
	},


	ponerFecha: function(){
		var fecha = new Date();
		var dia   = fecha.getDate();
		var mes   = fecha.getMonth() + 1;
		var anio  = fecha.getFullYear();
		var hoy   = dia + "/" + mes + "/" + anio;

		$(".fecha").html(hoy);
	},

	realizarReservacion: function(event){
		event.preventDefault();

		/*
		 * Obtener los datos
		 * para realizar la reserva
		 */
		 var reservacion = {
			 tipoHabitacion  : $("#reserva1").attr("tipoHabitacion"),
			 numPersonas     : $("#reserva2 select.numPersonas").val(),
			 numHabitaciones : $("#reserva2 select.numHabitaciones").val(),
			 numDias         : $("#reserva2 select.numDias").val()
		};

		 /*
		  * Corroborar si hay conexión
		  * a internet
		  */
		  if(networkInfo.estaConectado()){
		  	/*
		  	 * Si hubo conexión
		  	 * Entonces enviamos los datos al servidor
		  	 */
		  	 $.ajax({
		  	 	method: "POST",
		  	 	url: "http://www.colors.edu.mx/archivoTest.php",
		  	 	data: {
		  	 		reservacionS: reservacion
		  	 	}

		  	 }).done(function(respuesta){
		  	 	/*
		  	 	 * Checar respuesta del servidor
		  	 	 * Si se envio correcto entonces
		  	 	 * guardamos los datos localmente
		  	 	 */
		  	 	 if(respuesta == 1){
		  	 	 	almacen.guardarReservasHistorial(reservacion.tipoHabitacion, reservacion.numPersonas, reservacion.numHabitaciones, reservacion.numDias);

		  	 	 }else{
		  	 	 	alert("Error al guardar reservación en el servidor");
		  	 	 }
		  	 });

		  }else{
		  	almacen.guardarReservaLocal(reservacion.tipoHabitacion, reservacion.numPersonas, reservacion.numHabitaciones, reservacion.numDias);
		  }


		  /*
		   * Resetear datos del formulario
		   */
		   $("#reserva1").removeAttr("tipoHabitacion");
		   $(".tipoHabitacion").css("background-color", "");
		   $("#reserva2 select").prop("selectedIndex", 0).selectmenu("refresh", true);

		   window.location.href = "#home";
	},

	reserva1Siguiente: function(){
		/*
		 * Verificar que el usuario haya seleccionado
		 * algún tipo de habitación
		 */
		if($("#reserva1").attr("tipoHabitacion") != undefined){
			window.location.href= "#reserva2";

		}else{
			alert("Es necesario seleccionar un tipo de habitación");
		}
	},

	seleccionarTipoDeHabitacion: function(){
		$(".tipoHabitacion").css("background-color", "");
		$(this).css("background-color", "#38C");
		$("#reserva1").attr("tipoHabitacion", $(this).text().toLowerCase());
	},

	registrar: function(){
		/*
		 * 1) Paso obtener todos los datos del formulario
		 */
		 var nombre   = $("#nombreRegistro").val();
		 var email    = $("#emailRegistro").val();
		 var tel      = $("#telefonoRegistro").val();
		 var password = $("#passwordRegistro").val();
		 var foto     = $("#fotoTomadaRegistro img")[0];

		try{
			if(foto == undefined){
				throw new Error("Debe de tomar una foto");
			}

			if(typeof nombre !== "string"){
				throw new Error("El nombre no es valido");
			}

			if(nombre == ""){
				throw new Error("El nombre es forzoso");
			}

			if(email == ""){
				throw new Error("El email es forzoso");
			}

			if(password == ""){
				throw new Error("La contraseña es forzosa");
			}

			if(email.indexOf("@") == -1){
				throw new Error("El email debe contener un arroba");
			}

			if(Number.isNaN(Number(tel))){
				throw new Error("El teléfono debe de ser numérico");
			}


			/*
			 * Registrar al Usuario
			 */
			 fn.enviarRegistro(nombre, email, tel, password, foto);

		}catch(error){
			alert(error);
		}
	},

	enviarRegistro: function(nombreR, emailR, telR, passwordR, fotoR){
alert("Enviando registro");
alert("Nombre: "+nombreR+" Email: "+emailR+" Tel: "+telR+" Password:"+passwordR);
		$.ajax({
			  method: "POST",
			  url: "http://www.colors.edu.mx/archivoTest.php",
			  data: { 
			  	nombre:  nombreR,
			  	email: emailR,
			  	tel: telR,
			  	password: passwordR
			  }

			}).done(function( mensaje ){
alert("AJAX terminado");
				if(mensaje == 1){
					/*
					 * Transferimos la foto
					 */
					 //var fotoURL =  fotoR.src;
					 var fotoURL = $(fotoR).attr("src");
					 file.transferir(fotoURL);

				}else{
					alert("Error al enviar datos de registro: "+mensaje);
				}

			}).fail(function(error){
alert(error.status);
alert(error.message);
alert(error.responseText);
			});
	}
};



/*
 * LLAMAR AL METODO INIT
 * EN EL NAVEGADOR
 */
//fn.init();


/*
 * LLAMAR DEVICEREADY
 * PARA COMPILAR
 */
//$(fn.deviceready);
fn.deviceready();