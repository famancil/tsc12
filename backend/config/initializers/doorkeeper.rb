Doorkeeper.configure do
  resource_owner_from_credentials do |routes|
    user = User.find_by(:username => request.headers["username"])
    if user    	
    user.password = AESCrypt.decrypt(user.password, "TSC_Grupo_12")
    	if user && user.password == request.headers["password"]
      	user
    	end
    end
  end
end

Doorkeeper.configuration.token_grant_types << "password"