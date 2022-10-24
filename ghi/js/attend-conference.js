window.addEventListener("DOMContentLoaded", async () => {
    const selectTag = document.getElementById('conference')
    // get conferences list data
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
        // assgin selectButton value

        //change data to json object
        const data = await response.json();

        for (let conference of data.conferences) {

            const option = document.createElement('option');
            option.value = conference.href
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        selectTag.className = "form-select";
        const tag1 = document.getElementById('loading-conference-spinner');
        tag1.className = "d-flex justify-content-center mb-3 d-none";
    }
});
const selectTag = document.getElementById('conference');
selectTag.addEventListener('change', (event) => {
    const urlValue = event.target.value;
    console.log("Value: ", urlValue);

window.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formTag = document.getElementById('create-attendee-form');
    const formData = new FormData(formTag);
    const json = JSON.stringify(Object.fromEntries(formData));
    console.log("JSON:", json)
    const attendeeUrl = `http://localhost:8001${urlValue}attendees/`;
    console.log(attendeeUrl)
    const fetchOptions = {
        method: "POST",
        body: json,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(attendeeUrl, fetchOptions);
    if (response.ok) {
        formTag.reset();
        const newAttendee = await response.json();

        const formOkTag = document.getElementById('success-message');
        formOkTag.classList.remove("d-done");
        formTag.classList.add("d-none");

    }



});

});
