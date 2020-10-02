let NewInterview = {
    render : async () => {
      let participants = await getDataJson(`http://localhost:3000/participants/`)
      let interviewers=[]
      let interviewees=[]
      participants.forEach((participant, i) => {
        if(participant.role === 'Interviewer'){
          interviewers.push({"name":participant.name,"id":participant.id});
        }
        else {
          interviewees.push({"name":participant.name,"id":participant.id});
        }
      });

        let view =  /*html*/`
            <section class="section" id="section">
                <h1> Create new interview </h1>
                <div id="errors"></div>
                <div class="">
                  Interviewer :
                  <select class="" id="interviewer_id">
                  ${ interviewers.map(interviewer =>
                      /*html*/`<option value="${interviewer.id}">${interviewer.name}</option>`
                      )
                  }
                  </select><br><br>
                  Interviewee :
                  <select class="" id="interviewee_id">
                  ${ interviewees.map(interviewee =>
                      /*html*/`<option value="${interviewee.id}">${interviewee.name}</option>`
                      )
                  }
                  </select><br><br>
                  Start Time :<input type="datetime-local" id="start_time" value=""><br><br>
                  End time : <input type="datetime-local" id="end_time" value=""><br><br>

                  <br>
                  <button type="button" id="submit_button" name="button">Submit</button>
                </div>
            </section><br><br>
        `
        return view
    }
    , after_render: async () => {
      document.getElementById("submit_button").addEventListener("click",() => {
        var interviewer_id = document.getElementById("interviewer_id").value;
        var interviewee_id = document.getElementById("interviewee_id").value;
        var start_time = document.getElementById("start_time").value;
        var end_time = document.getElementById("end_time").value;
        var formData = new FormData();
        formData.append('interviewer_id', interviewer_id);
        formData.append('interviewee_id', interviewee_id);
        formData.append('start_time', start_time);
        formData.append('end_time', end_time);
        fetch('/interviews', {
          method: 'POST',
          body: formData
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
          if(obj.status>=200 && obj.status<300)
          {
            var section = document.getElementById("section");
            section.innerHTML = "";
            var message_elem = document.createElement('p');
            var message = document.createTextNode("Interview was successfully created . Here are its details.");
            message_elem.appendChild(message);
            section.appendChild(message_elem);
            var details_elem = document.createElement('p');
            var details = document.createTextNode("Interviewer : "+obj.body.interviewer.name+", Interviewee : "+obj.body.interviewee.name+", Start Time : "+obj.body.start_time+", End Time : "+obj.body.end_time);
            details_elem.appendChild(details);
            section.appendChild(details_elem);
          }
          else {
            var errors = document.getElementById("errors");
            errors.innerHTML = "";
            var errors_elem = document.createElement('ul');
            var message = document.createTextNode("The following errors prevented the interview from being created : ");
            errors.appendChild(message);
            entries = Object.entries(obj.body);
            entries.forEach(([key,val]) => {
              var list_item = document.createElement('li');
              var list_message = document.createTextNode(key +" : "+val);
              list_item.appendChild(list_message);
              errors_elem.appendChild(list_item);
            });
            errors.appendChild(errors_elem);
            errors.appendChild(document.createElement('br'));
          }
        })
        .catch(error =>console.error('Error:', error))
      });
    }

}
