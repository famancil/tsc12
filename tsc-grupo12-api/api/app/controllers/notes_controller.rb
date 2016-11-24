class NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]

  # GET /notes
  # GET /notes.json
  def index
    @user = User.find(params[:user_id])
    @notes = @user.notes
  end

  # GET /notes/1
  # GET /notes/1.json
  def show
  end

  def assign
    @note = Note.find(params[:note_id])
    @user = User.find(@note.user_id)
    @tag = Tag.find(params[:tag_id])
    @error = {:error => "Notas y etiquetas tienen user_id distintas"}
    if @note.user_id == @tag.user_id
      if @note.tags << @tag 
        render :show, status: :created, location: [@user,@note]
      else
        render json: @note.errors, status: :unprocessable_entity
      end
    else
      render json: @error , status: :unprocessable_entity
    end
  end

  # POST /notes
  # POST /notes.json
  def create
    @user = User.find(params[:user_id])
    @note = @user.notes.build(note_params) 

    if @note.save
      render :show, status: :created, location: [@user,@note]
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  # PATCH/PUT /notes/1.json
  def update
    @user=User.find(@note.user_id)
    if @note.update(note_params)
      render :show, status: :ok, location: [@user,@note]
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  # DELETE /notes/1.json
  def destroy
    @note.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def note_params
      params.require(:note).permit(:title, :description, :user_id)
    end
end
