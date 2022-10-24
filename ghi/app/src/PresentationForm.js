import React from "react";

class PresentationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            presenter_name: '',
            company_name: '',
            presenter_email: '',
            title: '',
            synopsis: '',
            conference: '',
            conferences: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this)
        this.handleConferenceChange = this.handleConferenceChange.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)


    }
    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences';
        try {
           const response = await fetch(url);
           if (response.ok) {
            const data = await response.json();
            console.log("****data:", data)
            this.setState({
                conferences: data.conferences
            })
        } else {
            throw new Error('Response not ok')
        }
    }
        catch (e) {
            console.log("error::: ",e)
        }
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ presenter_name: value })
    }
    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({ presenter_email: value })
    }
    handleCompanyNameChange(event) {
        const value = event.target.value;
        this.setState({ company_name: value })
    }
    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({ title: value })
    }
    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({ synopsis: value })
    }
    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({ conference: value })
    }



    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log("***data1", data);
        delete data.conferences;

        const presentationUrl = `http://localhost:8000${this.state.conference}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);
            this.setState({
            presenter_name: '',
            company_name: '',
            presenter_email: '',
            title: '',
            synopsis: '',
            conference: '',
            })
        }

    }
    render() {
        return (
                <div className="container">
                  <div className="row">
                    <div className="offset-3 col-6">
                      <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit} id="create-presentation-form">
                          <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} value={this.state.presenter_name}placeholder="presenter_name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                            <label htmlFor="name">Presenter name</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input onChange={this.handleEmailChange} value={this.state.presenter_email}placeholder="presenter_email" required type="email" className="form-control" name="presenter_email" id="presenter_email" />
                            <label htmlFor="email" className="form-label">Presenter Email</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input onChange={this.handleCompanyNameChange} value={this.state.company_name} placeholder="company_name" type="text" name="company_name" id="company_name" className="form-control" />
                            <label htmlFor="company_name">Company name</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input onChange={this.handleTitleChange} value={this.state.title}placeholder="title" type="text" name="title" id="title" className="form-control" />
                            <label htmlFor="title">Title</label>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="synopsis">Synopsis</label>
                            <textarea onChange={this.handleSynopsisChange} value={this.state.synopsis} className="form-control" name="synopsis" id="synopsis" rows="3"></textarea>
                          </div>
                          <div className="form-floating mb-3">
                            <select onChange={this.handleConferenceChange} value={this.state.conference} required name="conference" id="conference" className="form-select">
                              <option value="">Choose a conference</option>
                              {Object.values(this.state.conferences).map(conference => {
                                        return (
                                            <option key={conference.href} value={conference.href}>
                                                {conference.name}
                                            </option>
                                        );
                                    })}
                            </select>
                          </div>
                          <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="result"></div>
                      </div>
                    </div>
                  </div>
                </div>
        );
      }

    }




export default PresentationForm;
