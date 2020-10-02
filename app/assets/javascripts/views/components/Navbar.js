let Navbar = {
    render: async () => {
        let view =  /*html*/`
        <div style="padding: 10px;" >
           <a href="#/participant_new" data-turbolinks="false" style="margin: 10px;"> New Participant </a>
           <a href="#/participants" data-turbolinks="false" style="margin: 10px;"> View Participants </a>
           <a href="#/interview_new" data-turbolinks="false" style="margin: 10px;"> New Interview </a>
           <a href="#/interviews" data-turbolinks="false" style="margin: 10px;"> View Interviews </a>
        </div>
        `
        return view
    },
    after_render: async () => { }

}
