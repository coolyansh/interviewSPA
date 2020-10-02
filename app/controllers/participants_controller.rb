class ParticipantsController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      @participants = Participant.all
      render json: @participants
    end

    def show
      @participant = Participant.find(params[:id])
      render json: @participant
    end

    def create
      @participant = Participant.new(participant_params)
      if @participant.save
        render json: @participant
      else
        render json: @participant.errors, status: 400
      end
    end

    def update
      @participant = Participant.find(params[:id])
      if @participant.update(participant_params)
        render json: @participant
      else
        render json: @participant.errors, status: 400
      end
    end

    def destroy
      @participant = Participant.find(params[:id])
      @participant.destroy
      render json: {error: 'Participant deleted successfully'}
    end

    private

      def participant_params
        params.permit(:name, :role, :resume, :email)
      end

end
