var file ={
	exito: function (){
		
		window.localStorage.setItem ("NombreUsuario", $("#nombreRegistro").val());
		window.location.href = "#home";

	},

	error: function (error){
		alert(error);
		alert ("Error al enviar foto al servidor");
	},

	transferir: function(fileURL){
		/*opciones de envio
		*
		*/
		var options      = new FileUploadOptions ();
		options.fileKey  = "foto";
		options.filename = "miFoto";
		options.mimeType = "image/jpg";

		var ft = new FileTransfer ();
		ft.upload(fileURL, "http://www.colors.edu.mx/archivoTest.php", file.exito, file.error, options);
	}
}