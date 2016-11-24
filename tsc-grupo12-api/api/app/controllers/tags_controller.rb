class TagsController < ApplicationController
  before_action :set_tag, only: [:show, :update, :destroy]

  # GET /tags
  # GET /tags.json
  def index
    @user = User.find(params[:user_id])
    @tags = @user.tags
  end

  # GET /tags/1
  # GET /tags/1.json
  def show
  end

  # POST /tags
  # POST /tags.json
  def create
    @user = User.find(params[:user_id])
    @tag = @user.tags.build(tag_params) 

    if @tag.save
      render :show, status: :created, location: [@user, @tag]
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tags/1
  # PATCH/PUT /tags/1.json
  def update
    @user=User.find(@tag.user_id)
    if @tag.update(tag_params)
      render :show, status: :ok, location: [@user,@tag]
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tags/1
  # DELETE /tags/1.json
  def destroy
    @tag.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tag
      @tag = Tag.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tag_params
      params.require(:tag).permit(:tagname, :description, :user_id)
    end
end