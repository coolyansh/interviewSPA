let Interviews = {
    render : async () => {
        let interviews = await getDataJson(`http://localhost:3000/interviews`)
        let view =  /*html*/`
            <section class="section">
                <h1> Interviews List </h1>
                <ul>
                    ${ interviews.map(interview =>
                        /*html*/
                        `<li>
                          <a href="#/interview/${interview.id}" data-turbolinks="false">
                            Interviewer : ${interview.interviewer.name} , Interviewee : ${interview.interviewee.name}<br><br>
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
