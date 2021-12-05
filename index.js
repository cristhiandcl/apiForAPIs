async function getAPIs() {
  const response = await fetch("https://api.publicapis.org/entries");
  const data = await response.json();
  return data.entries;
}

function getAPIhtml(myAPI) {
  return `<div class='apis-container'>
                                ${myAPI
                                  .map((api) => {
                                    return `<div class='my-api name'>
                                                <div class='my-api-name'><a class='link' href='${
                                                  api.Link
                                                }'><li class="name">${
                                      api.API
                                    } (${api.Category})</li></a></div>
                                                <div class='my-api-description'>${
                                                  api.Description
                                                }</div>
                                                <div class='my-api-auth'>Auth:${
                                                  api.Auth ? api.Auth : "None"
                                                }</div>
                                                <div class='my-api-https'>HTTPS support: ${
                                                  api.HTTPS
                                                }</div>
                                            </div>`;
                                  })
                                  .join("")}
                               </div>`;
}

function displayAPIs(myAPIs) {
  document.body.innerHTML += getAPIhtml(myAPIs);
  let allNamesDOMCollection = document.querySelectorAll("li.name");
  let allNamesDOMCollectionKey = document.querySelectorAll("div.my-api.name");
  console.log(allNamesDOMCollection);
  searchItems(allNamesDOMCollection, allNamesDOMCollectionKey);
}

getAPIs()
  .then(displayAPIs)
  .catch((e) => console.log(`Error: ${e}`));


  
function searchItems(allNamesDOMCollection, allNamesDOMCollectionKey) {
  document
    .getElementById("searchInput")
    .addEventListener("keyup", function (event) {
      let searchQuery = event.target.value.toLowerCase();
      console.log(searchQuery);

      for (let counter = 0; counter < allNamesDOMCollection.length; counter++) {
        const currentName =
          allNamesDOMCollection[counter].textContent.toLowerCase();
        console.log(currentName);
        if (currentName.includes(searchQuery)) {
          allNamesDOMCollectionKey[counter].style.display = "block";
        } else {
          allNamesDOMCollectionKey[counter].style.display = "none";
        }
      }
    });
}
