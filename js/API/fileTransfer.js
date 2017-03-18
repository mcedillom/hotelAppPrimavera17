var file ={
	exito: function (){
		
		window.localStorage.setItem ("NombreUsuario", $("#nombreRegistro").val());
		window.location.href = "#home";

	},

	error: function (error){
		alert(error.code);
		alert(error.source);
		alert(error.target);
		alert ("Error al enviar foto al servidor");
	},

	transferir: function(fileURL){
		/*opciones de envio
		*
		*/
		var options      = new FileUploadOptions();
		options.fileKey  = "foto";
		options.filename = "miFoto";
		options.mimeType = "image/jpg";
		options.chunkedNode = false;
		options.headers ={
			Connection: "Close"
		};

		var ft = new FileTransfer ();
		ft.upload(fileURL, encodeURI("http://www.colors.edu.mx/archivoTest.php"), file.exito, file.error, options);
	}
}