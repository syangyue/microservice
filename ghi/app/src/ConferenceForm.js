import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            max_presentations: '',
            max_attendees: '',
            locations: [],


        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionsChange = this.handleDescriptionsChange.bind(this);
        this.handlePresentationsChange = this.handlePresentationsChange.bind(this);
        this.handleAttendeesChange = this.handleAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    // onChange events: to register new values when inupts are changed


    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            this.setState({ locations: data.locations })

        }

    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        delete data.locations;

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);
            this.setState({
            name: '',
            starts: '',
            ends: '',
            description: '',
            max_presentations: '',
            max_attendees: '',
            location: '',
        });
    }
}
    handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value })
    console.log(value)
}
    handleStartsChange(event) {
    const value = event.target.value;
    this.setState({ starts: value })
}
    handleEndsChange(event) {
    const value = event.target.value;
    this.setState({ ends: value })
}
    handleDescriptionsChange(event) {
    const value = event.target.value;
    this.setState({ description: value })

}
    handlePresentationsChange(event) {
    const value = event.target.value;
    this.setState({ max_presentations: value });
}
    handleAttendeesChange(event) {
    const value = event.target.value;
    this.setState({ max_attendees: value });
}
    handleLocationChange(event) {
    const value = event.target.value;
    this.setState({ location: value });
}
    // to populate location drop down

    // to render the html
    render() {
        return (
            <div className="my-5 container">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleStartsChange} value={this.state.starts} className="form-control" placeholder="Starts" required type="date" id="starts" name="starts" />
                                <label>Starts</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEndsChange} value={this.state.ends} className="form-control" placeholder="Ends" required type="date" id="ends" name="ends" />
                                <label>Ends</label>
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="description">Description</label>
                                <textarea onChange={this.handleDescriptionsChange} value={this.state.description} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePresentationsChange} value={this.state.max_presentations} className="form-control" placeholder="max_presentations" required type="number" id="max_presentations" name="max_presentations" />
                                <label htmlFor="max_presentations">Maximum presentations</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleAttendeesChange} value={this.state.max_attendees} type="number" className="form-control" id="max_attendees" name="max_attendees" placeholder="max_attendees" />
                                <label htmlFor="max_attendees">Maximum attendees</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleLocationChange} required name="location" id="location" className="form-select">
                                    <option value="">Choose a location</option>
                                    {this.state.locations.map(location => {
                                        return (
                                            <option key={location.id} value={location.id}>
                                                {location.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}
export default ConferenceForm;
