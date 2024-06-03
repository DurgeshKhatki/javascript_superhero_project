/* Fetch data from an API */

const publicKey = '49d83f8473b7373a9f94599716277704';
const privateKey = '893f07b33c3b676b488b926ff677cf0ae4c656ac';
const timestamp = new Date().getTime();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
const baseUrl = 'https://gateway.marvel.com/v1/public/';
const charactersEndpoint = 'characters';
const url = `${baseUrl}${charactersEndpoint}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const characters = data.data.results;
    characters.forEach(character => {
      //card for each character
      var cardItemHome = createCard(character);
      var mainTag = document.getElementById("mainTag");
      mainTag.appendChild(cardItemHome);
    });
  })
  .catch(error => {
    console.error('problem with the fetch operation:', error);
  });


// Function to create a card
function createCard(character) {
  const id = character.id;
  const name = character.name;
  const imageAPI = character.thumbnail.path +'.'+ character.thumbnail.extension;
  const characterDesc = character.description;

  var cardItem = document.createElement('div');
  cardItem.className = "card";

  var img = document.createElement('img');
  img.src = imageAPI;
  img.alt = 'image unavailable...';

  var cardContent = document.createElement('div');
  cardContent.className = "card-content";

  var para = document.createElement('p');
  para.setAttribute('id', 'paraCard')
  para.innerHTML = name;

  var anchor = document.createElement('a');
  anchor.setAttribute('href', '#');
  anchor.className = "more";
  anchor.textContent = "more...";
  anchor.addEventListener("click", function(event) {
    event.preventDefault(); 
    openModal(imageAPI, name, characterDesc);
  });

  para.appendChild(anchor);
  cardContent.appendChild(para);
  cardItem.appendChild(img);
  cardItem.appendChild(cardContent);

  var button = document.createElement('button');
  button.textContent = "favorite";
  button.setAttribute('class', 'like-btn');
  button.addEventListener("click", function() {
    if(!isIdPresent(id)){
      addToFavorites(id, name, imageAPI);
    }
  });
  cardItem.appendChild(button);

  return cardItem;
}

function isIdPresent(id) {
  for (var i = 0; i < favorites.length; i++) {
    if (favorites[i].id === id) {
      return true;
    }
  }
  return false;
}

/* Function to create & open modal for more detail */
function openModal(imageURL, name, characterDesc) {
  var modal = document.getElementById("myModal");
  var modalContent = document.getElementById("modal-content");

 
  const modalContentInner = document.createElement('div');
  modalContentInner.className = 'modal-content-inner';
  modalContent.appendChild(modalContentInner);
  modal.appendChild(modalContent);
  
  image = document.createElement('img');
  modalContentInner.appendChild(image);
  
  descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'description';
  modalContentInner.appendChild(descriptionDiv);
  

  descriptionParagraph = document.createElement('p');
  descriptionDiv.appendChild(descriptionParagraph);
  

  // Update modal content with specific data
  image.src = imageURL;
  descriptionParagraph.textContent = `Name: ${name} `+ " " + `About:  ${characterDesc}`;

  // Display modal
  modal.style.display = "block";

  // should have option to close the modal
  var closeSpan = document.createElement('span');
  closeSpan.id = 'close';
  closeSpan.textContent = 'X';
  closeSpan.addEventListener('click', function() {
    modalContent.innerHTML ="";
  modal.style.display = "none"; 
  });
  modalContentInner.appendChild(closeSpan);
}

/* Function to add to favorites */ 

var favorites = [];

function addToFavorites(id, name, imageAPI) {
  var favoritesList = document.getElementById('favorites-list');

  // Create card for favorites
  var listItem = document.createElement('div');
  listItem.className = "card";

  var img = document.createElement('img');
  img.src = imageAPI;
  img.alt = 'image unavailable...';

  var para = document.createElement('p');
  para.innerHTML = name;


  var button = document.createElement('button');
  button.textContent = "remove";

  button.addEventListener("click", () => {
    button.parentNode.parentNode.remove();
  });

  para.appendChild(button);

  listItem.appendChild(img);
  listItem.appendChild(para);

  // Append the item to favorites list
  favoritesList.appendChild(listItem);

  // Add the item to favorites array
  favorites.push({id: id, name: name, imageAPI: imageAPI});
}

/* Search cards with matching name */

  const searchBtn = document.getElementById("searchButton");
  searchBtn.addEventListener("click", searchCards);

function searchCards() {
  
  var input = document.getElementById("searchInput").value.trim().toLowerCase();
  var cards = document.getElementsByClassName("card");
   console.log("clicked and function called");
   console.log(input);
  for (var i = 0; i < cards.length; i++) {
    var description = cards[i].querySelector("div > p").innerText.toLowerCase();
    if (description.includes(input)) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

/*switch from home to favorites and vice versa */

function showHomePage() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('favorites-section').style.display = 'none';
  }

function showFavorites() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('favorites-section').style.display = 'block';
  }

  


