function createCard(title, description, pictureUrl) {
    return `
        <div class="card">
          <div class="card mb-3 shadow">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
             <h5 class="card-title">${title}</h5>
             <p class="card-text">${description}</p>
            </div>
           </div>
        </div>
    `;
  }


window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log("got an error");
    } else {
      const data = await response.json();
      let index = 0;
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000/${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const html = createCard(title, description, pictureUrl);
          const column = document.querySelector(`#col-${index % 3}`);
          column.innerHTML += html;
          index += 1;
        }
      }
    }
  } catch (e) {
    console.log("error", e);
  }
});
