var file ={
	exito: function (){
		window.location.href = "#home";
	},

	error: function (){
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
		ft.upload(fileURL, "", file.exito, file.error, options);
	}
}