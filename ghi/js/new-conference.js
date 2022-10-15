window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);
    if (response.ok) {
        const selectTag = document.getElementById('location');
        const data = await response.json();
    
        for (let location of data.locations) {
            let option = document.createElement('option');
            option.value = location.id;
            option.innerHTML = location.name;
            selectTag.appendChild(option);

        }
    }
    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchOptions = {
            method: "POST",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const newResponse = await fetch(conferenceUrl, fetchOptions);
        if (newResponse.ok) {
            formTag.reset();
            const newConference = await newResponse.json();
            console.log(newConference);
        }

    });
});
