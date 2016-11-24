class UsersController < ApplicationController
  #before_action :authenticate
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    pass = "TSC_Grupo_12"
    @users.each do |p|
      p.password = AESCrypt.decrypt(p.password, pass)
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @note = Note.where(user_id: @user.id)
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    #logger.info user_params[:password]
    password = "TSC_Grupo_12"
    @user.password = AESCrypt.encrypt(@user.password, password)

    if @user.save
      render :show, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update    
    @user.password = AESCrypt.decrypt(@user.password, "TSC_Grupo_12")    
    @pass = AESCrypt.encrypt(user_params[:password], "TSC_Grupo_12")
    @user_params[:password] = @pass
    #logger.info user_params[:password]
    if @user.password == params[:password_confirmation]
      #logger.info "Entro en la funcion"      
      if @user.update(user_params)
        render :show, status: :ok, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    head :no_content 
  end

  private

    #User Authentication
    #def authenticate
     # key = "TSC_Grupo_12"
      #authenticate_or_request_with_http_basic do |username,password|
      #  @length=User.all
       # if @length.length > 0
        #  @user = User.find_by(username: username)
         # if @user 
          #  @user.password = AESCrypt.decrypt(@user.password, key)
           # username==@user.username && password == @user.password 
          #end
        #else
         # username== 'tsc12' && password == 'apirest' 
        #end          
      #end
    #end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
     @user_params ||= params.require(:user).permit(:username, :fullname, :email, :password)
    end
end