class InterviewsController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      @interviews = Interview.all.includes(:interviewer,:interviewee)
      render json: @interviews.to_json(include: [:interviewer, :interviewee])
    end

    def show
      @interview = Interview.includes(:interviewer,:interviewee).find(params[:id])
      render json: @interview.to_json(include: [:interviewer, :interviewee])
    end

    def create
      @interview = Interview.includes(:interviewer,:interviewee).new(interview_params)
      if @interview.save
        InterviewMailer.with(interview: @interview).new_interview_email.deliver_later
        if @interview.start_time - 30.minutes > DateTime.now
          InterviewMailer.with(interview: @interview).reminder_interview_email.deliver_later(wait_until: @interview.start_time - 6.hours)
        end
        render json: @interview.to_json(include: [:interviewer, :interviewee])
      else
        render json: @interview.errors, status: 400
      end
    end

    def update
      @interview = Interview.includes(:interviewer,:interviewee).find(params[:id])
      if @interview.update(interview_params)
        InterviewMailer.with(interview: @interview).update_interview_email.deliver_later
        if @interview.start_time - 30.minutes > DateTime.now
          InterviewMailer.with(interview: @interview).reminder_interview_email.deliver_later(wait_until: @interview.start_time - 6.hours)
        end
        render json: @interview.to_json(include: [:interviewer, :interviewee])
      else
        render json: @interview.errors, status: 400
      end
    end

    def destroy
      @interview = Interview.find(params[:id])
      @interview.destroy
      render json: {error: 'Interview deleted successfully'}
    end

    private
      def interview_params
        params.permit(:interviewer_id, :interviewee_id, :start_time, :end_time)
      end

end
