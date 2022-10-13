function createCard(title, location, description, pictureUrl, starts, ends) {
    return `
    <div>
       <div class="shadow p-3 mb-5 bg-body rounded">
          <img src="${pictureUrl}" class="card-img-top" alt="elephant">
            <div class="card-body">
             <h5 class="card-title">${title}</h5>
             <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
             <p class="card-text">${description}</p>
            </div>
            <div class="card-footer">
             ${starts} - ${ends}
            </div>
       </div>
      </div>
    </div>
    `;
  }

function aler() {
  return `
  <div class="alert alert-primary" role="alert"> Something's going wrong</div>
  `
}


window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log("got an error");
    } else {
      const data = await response.json();
      let counter = 0;
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000/${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const location = details.conference.location.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const starts = new Date(details.conference.starts).toLocaleDateString();
          const ends = new Date(details.conference.ends).toLocaleDateString();
          const html = createCard(title, location, description, pictureUrl, starts, ends);
          const column = document.querySelector(`#col-${counter % 3}`);
          column.innerHTML += html;
        }
        counter += 1;
      }
    }
  } catch (e) {
    console.log("error", e);

    const newHtml = alert();
    const somethingWrong = document.querySelector('#something-wrong');
    somethingWrong.innerHTML = newHtml
  }
});
