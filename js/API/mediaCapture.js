var mc = {
	exito: function (mediaFiles) {
			var path = mediaFiles[0].fullpath;

			$("#fotoTomadaRegistro").html('<img src="' + path + '">');
	},
/*fullpath es la ruta a la foto*/
	error: function (){
		alert ("Error al tomar foto");
	},

	abrirCamara: function (){
		/* start  capture*/
       navigator.device.capture.captureImage(mc.exito, mc.error, {limit:1});
	}
};