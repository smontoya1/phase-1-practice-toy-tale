//variables

let addToy = false;

//selectors

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const cardContainer = document.querySelector(".card");
const addToyForm = document.querySelector('.add-toy-form')
const inputText = document.querySelector('.input-text')

//functions

function fetchToys () {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      const newDiv = document.createElement('div')
      newDiv.classList.add('card')
      toyCollection.appendChild(newDiv)

      const newH2 = document.createElement('h2')
      newDiv.appendChild(newH2)
      newH2.innerText = toy.name

      const newImg = document.createElement('img')
      newImg.src = toy.image
      newImg.classList.add('toy-avatar')
      newDiv.appendChild(newImg)

      const newP = document.createElement('p')
      newDiv.appendChild(newP)
      newP.innerText = toy.likes + (toy.likes === 1 ? " like" : " likes")

      const newButton = document.createElement('button')
      newButton.classList.add('like-btn')
      newButton.id = toy.id
      newDiv.appendChild(newButton)
      newButton.innerText = 'Like ❤️'
      newButton.addEventListener("click", (event) => {
        const newLikes = toy.likes + 1; 
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({likes: newLikes})
        })
        .then((res) => res.json())
        .then((data) => {
          newP.innerText = data.likes + (data.likes === 1 ? " like" : " likes");
          toy.likes = data.likes;
        })

      })
    })
  })
}


//event listeners

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = addToyForm.elements["name"].value;
    const imageInput = addToyForm.elements["image"].value;
    const newToy = {
      name: nameInput,
      image: imageInput,
      likes: 0
    };

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newToy)
    })
    .then((res) => res.json())
  })    
})


