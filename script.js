document.addEventListener('DOMContentLoaded', () => {
 const form = document.querySelector('form');
 const inputs = document.querySelectorAll('.cats');

//  let catFactsInput = document.getElementsById(num-cats)
//  let catPhotosInput =document.getElementById(img-cats) 

 const messageContainer = document.createElement('p');
 messageContainer.className = 'message';
 document.body.appendChild(messageContainer);

 const factsContainer = document.createElement('ul');
 const photosContainer = document.createElement('div');
 photosContainer.classList.add('image-container');

 document.body.appendChild(factsContainer);
 document.body.appendChild(photosContainer);

 form.addEventListener('submit', (e) => {
   e.preventDefault();

   const numFacts = parseInt(document.getElementById('num-cats').value);
   const numPhotos = parseInt(document.getElementById('img-cats').value);

   factsContainer.innerHTML = '';
   photosContainer.innerHTML = '';
   messageContainer.textContent = '';


   if (!(numFacts && numFacts <= 50)) {
     messageContainer.textContent += ' Enter a valid number of facts (1-50). ';
   }

   if (!(numPhotos && numPhotos <= 10)) {
     messageContainer.textContent += ' Enter a valid number of photos (1-10). ';
   }

   axios.get(`https://meowfacts.herokuapp.com/?count=${numFacts}`)
     .then(res => {
       res.data.data.forEach(fact => {
         const li = document.createElement('li');
         li.textContent = fact;
         factsContainer.appendChild(li);
       });
     })
     .catch(err => {
       messageContainer.textContent = 'Error fetching facts. Try again later.';
       console.error('Error fetching facts:', err);
     });

   axios.get(`https://api.thecatapi.com/v1/images/search?limit=${numPhotos}`)
     .then(res => {
       res.data.forEach(image => {
         const img = document.createElement('img');
         img.src = image.url;
         img.alt = 'A cute cat';
         img.style.width = '200px';
         img.style.margin = '5px';
         img.style.borderRadius = '8px';
         photosContainer.appendChild(img);
       });
     })
     .catch(err => {
       messageContainer.textContent = 'Error fetching images. Try again later.';
       console.error('Error fetching images:', err);
     });
 });
});
