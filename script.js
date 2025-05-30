const factsBtn = document.getElementById("facts-btn");
const imagesBtn = document.getElementById("images-btn");
const numFactsInput = document.getElementById("num-cats");
const numImagesInput = document.getElementById("img-cats");
const resultsContainer = document.getElementById("results-div");
const spinner = document.getElementById("spinner");

factsBtn.addEventListener("click", async () => {
  const numberOfFacts = parseInt(numFactsInput.value);
  if (numberOfFacts < 1 || numberOfFacts > 50) {
    alert("Please enter a number between 1 and 50.");
    return;
  }
  resultsContainer.innerHTML = "";
  await fetchCatFacts(numberOfFacts);
});

imagesBtn.addEventListener("click", async () => {
  const numberOfPhotos = parseInt(numImagesInput.value);
  if (numberOfPhotos < 1 || numberOfPhotos > 10) {
    alert("Please enter a number between 1 and 10.");
    return;
  }
  resultsContainer.innerHTML = "";
  await fetchCatPhotos(numberOfPhotos);
});

// Fetch Cat Facts 
const fetchCatFacts = async (count) => {
  const apiUrl = `https://meowfacts.herokuapp.com/?count=${count}`;
  spinner.style.display = "block";
  try {
    const response = await axios.get(apiUrl);
    const facts = response.data.data;

    const factsContainer = document.createElement("ol");
    factsContainer.className = "facts-container";
    facts.forEach((fact) => {
      const listItem = document.createElement("li");
      listItem.textContent = fact;
      factsContainer.appendChild(listItem);
    });

    resultsContainer.appendChild(factsContainer);
  } catch (error) {
    console.error("Error fetching cat facts:", error);
    resultsContainer.textContent =
      "Error fetching cat facts. Please try again later.";
  } finally {
    spinner.style.display = "none";
  }
};

// Fetch Cat Photos 
const fetchCatPhotos = async (count) => {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${count}`;
  spinner.style.display = "block";

  try {
    const response = await axios.get(apiUrl);
    const photos = response.data;

    const photosContainer = document.createElement("div");
    photosContainer.className = "photos-container";

    photos.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.url;
      img.alt = "Cute Cat";
      img.style.width = "350px";
      img.style.margin = "10px";
      img.style.borderRadius = "5px";
      photosContainer.appendChild(img);
    });

    resultsContainer.appendChild(photosContainer);
  } catch (error) {
    console.error("Error fetching cat photos:", error);
    resultsContainer.textContent =
      "Error fetching cat photos. Please try again later.";
  } finally {
    spinner.style.display = "none";
  }
};
