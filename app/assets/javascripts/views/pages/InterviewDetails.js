let InterviewDetails = {
    render : async () => {
        let request = parseRequestURL()
        let interview = await getDataJson(`http://localhost:3000/interviews/` + request.id)
        let view =  /*html*/`
            <section class="section">
                <h1> Interview Details </h1>
                <p>
                  Interviewer : ${interview.interviewer.name}<br>
                  Interviewee : ${interview.interviewee.name}<br>
                  Start time : ${interview.start_time}<br>
                  End Time : ${interview.end_time}<br>
                </p>
                <a href="#/interview_edit/${interview.id}" data-turbolinks="false">Edit </a><br><br>
                <span style="cursor: pointer; text-decoration: underline;" id="delete"> Delete </span><br><br>
            </section>
        `
        return view
    }
    , after_render: async () => {
      document.getElementById("delete").addEventListener("click",() => {
        let request = parseRequestURL();
        fetch('/interviews/'+request.id, {method: 'DELETE'});
        alert("Interview was deleted successfully.");
        location.hash = "/interviews";
      });
    }

}
