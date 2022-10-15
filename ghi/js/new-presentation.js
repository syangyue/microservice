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
            option.value = conference.id
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }
    }
});
// Getting the conference id number to send to the url link:
const selectElement = document.getElementById('conference');

selectElement.addEventListener('change', (event) => {
    const urlV = event.target.value;
    // below: code to create new form / POST
    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const presentationUrl = `http://localhost:8000/api/conferences/${urlV}/presentations/`;
        console.log(presentationUrl)
        const fetchOptions = {
            method: "POST",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const newResponse = await fetch(presentationUrl, fetchOptions);
        if (newResponse.ok) {
            formTag.reset();
            const newPresentation = await newResponse.json();
            console.log(newPresentation);
        }
    })

});
