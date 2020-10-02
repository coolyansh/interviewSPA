let Error404 = {

    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> 404 ERROR, Page Not Found </h1>
                <p> Sorry, the page you are looking for does not exist. </p>
            </section><br><br>
        `
        return view
    }
    , after_render: async () => {
    }
}
