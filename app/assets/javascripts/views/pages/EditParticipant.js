let EditParticipant = {
    render : async () => {
        let view =  /*html*/`
          <section class="section" id="section">
              <h1> Edit participant </h1>
              <div id="errors"></div>
              <div class="">
                Name : <input type="text" id="name" value=""><br><br>
                Email : <input type="text" id="email" value=""><br><br>
                Role :
                <select class="" id="role">
                  <option value="Interviewer">Interviewer</option>
                  <option value="Interviewee">Interviewee</option>
                </select>
                <br><br>
                Resume : <input type="file" id="resume" value=""><br><br>
                <button type="button" id="submit_button" name="button">Submit</button>
              </div>
          </section><br><br>
        `
        return view
    }
    , after_render: async () => {
      let request = parseRequestURL();
      let participant = await getDataJson(`http://localhost:3000/participants/` + request.id);
      document.getElementById("name").value = participant.name;
      document.getElementById("email").value = participant.email;
      document.getElementById("role").value = participant.role;
      document.getElementById("submit_button").addEventListener("click",() => {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var fileField = document.querySelector("input[type='file']");
        var role = document.getElementById("role").value;
        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        if(fileField.files.length > 0){
          formData.append('resume', fileField.files[0]);
        }
        fetch('/participants/'+request.id, {
          method: 'PATCH',
          body: formData
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
          if(obj.status>=200 && obj.status<300)
          {
            var section = document.getElementById("section");
            section.innerHTML = "";
            var message_elem = document.createElement('p');
            var message = document.createTextNode("Participant was successfully edited . Here are it's details.");
            message_elem.appendChild(message);
            section.appendChild(message_elem);
            var details_elem = document.createElement('p');
            var details = document.createTextNode("Name : "+obj.body.name+", Email : "+obj.body.email+", Role : "+obj.body.role);
            details_elem.appendChild(details);
            section.appendChild(details_elem);
          }
          else {
            var errors = document.getElementById("errors");
            errors.innerHTML = "";
            var errors_elem = document.createElement('ul');
            var message = document.createTextNode("The following errors prevented the participant from being edited : ");
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
