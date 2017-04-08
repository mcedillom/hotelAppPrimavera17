var networkInfo = {
	estaConectado: function(){
	return true;
		if (navegator.connection.type != Connection.NONE){
			return true;
		}
		return false;
	}
};