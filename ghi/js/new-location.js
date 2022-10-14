window.addEventListener("DOMContentLoaded", async () => {

    const url='http://localhost:8000/api/states/';

    const response = await fetch(url);

    if (response.ok) {
        const stateTag = document.getElementById('state')
        const data = await response.json()
        for (let state of data.states) {
            let option = document.createElement('option');
            option.value = state.abbreviation;
            option.innerHTML = state.name;
            stateTag.appendChild(option);
        }

    }
    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchOptions = {
            method: "POST",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const newResponse = await fetch(locationUrl, fetchOptions);
        if (newResponse.ok) {
            formTag.reset();
            const newLocation = await newResponse.json();
        }


    });

})
