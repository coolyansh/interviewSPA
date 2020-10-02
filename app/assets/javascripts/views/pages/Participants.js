let Participants = {
    render : async () => {
        let participants = await getDataJson(`http://localhost:3000/participants`)
        let view =  /*html*/`
            <section class="section">
                <h1> Participants List </h1>
                <ul>
                    ${ participants.map(participant =>
                        /*html*/
                        `<li>
                          <a href="#/participant/${participant.id}" data-turbolinks="false">
                            ${participant.name} : ${participant.role} ( ${participant.email} )<br><br>
                          </a>
                        </li>`
                        ).join('\n ')
                    }
                </ul>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }

}
