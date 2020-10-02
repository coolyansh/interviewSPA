let ParticipantDetails = {
    render : async () => {
      let request = parseRequestURL()
      let participant = await getDataJson(`http://localhost:3000/participants/` + request.id)
      let three_digit_id = (id) => {
        var s = "00" + id.toString();
        return s.slice(-3);
      }
        let view =  /*html*/`
            <section class="section">
                <h1> Participant Details </h1>
                <div id="details">
                  Name : ${participant.name}<br>
                  Role : ${participant.role}<br>
                  Email : ${participant.email}<br>
                </p>
                <a href="/system/participants/resumes/000/000/${three_digit_id(participant.id)}/original/${participant.resume_file_name}" target="_blank" id="resume">Resume</a><br><br>
                <a href="#/participant_edit/${participant.id}" data-turbolinks="false"> Edit </a><br><br>
                <span style="cursor: pointer; text-decoration: underline;" id="delete"> Delete </span><br><br>
            </section>
        `
        return view
    }
    , after_render: async () => {
      var resume_link = document.getElementById("resume");
      var link = resume_link.getAttribute('href');
      if(link.endsWith("null")){
        resume_link.parentNode.removeChild(resume_link);
      }
      document.getElementById("delete").addEventListener("click",() => {
        let request = parseRequestURL();
        fetch('/participants/'+request.id, {method: 'DELETE'});
        alert("Participant was deleted successfully.");
        location.hash = "/participants";
      });
    }

}
