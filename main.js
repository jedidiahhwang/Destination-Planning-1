  
const destinationsContainer = document.querySelector('#destinations-container')
const form = document.querySelector('form')
const baseUrl = process.env.baseURL || "http://localhost:5001/api/destinations"

// const baseURL = `http://localhost:${port}/api/destinations`
// const baseURL = `https://jh-destination-planning.herokuapp.com`

const destinationsCallback = ({ data: destinations }) => displayDestinations(destinations)
const errCallback = err => console.log(err)

const getAllDestinations = () => axios.get(`/api/destinations`).then(destinationsCallback).catch(errCallback)
const createDestination = body => axios.post(baseURL, body).then(destinationsCallback).catch(errCallback)
const deleteDestination = id => axios.delete(`${baseURL}/${id}`).then(destinationsCallback).catch(errCallback)
const updateDestinationPrice = (id, type) => axios.put(`${baseURL}/price/${id}`, {type}).then(destinationsCallback).catch(errCallback)
const updateDestinationPassengers = (id, type) => axios.put(`${baseURL}/passengers/${id}`, {type}).then(destinationsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let destination = document.querySelector('#destination')
    let price = document.querySelector('#price')
    let passengers = document.querySelector('#passengers')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        destination: destination.value,
        price: price.value,
        passengers: passengers.value,
        imageURL: imageURL.value
    }

    createDestination(bodyObj)

    destination.value = ''
    price.value = ''
    passengers.value = ''
    imageURL.value = ''
}

function createDestinationCard(destinations) {
    const destinationCard = document.createElement('div')
    destinationCard.classList.add('destination-card')
    let totalPrice = destinations.price * destinations.passengers

    destinationCard.innerHTML = `<img alt='destination cover image' src=${destinations.imageURL} class="destination-cover-image"/>
    <p class="destination">${destinations.destination}</p>

    <div class="btns-container">
        <button onclick="updateDestinationPrice(${destinations.id}, 'minus')">-</button>
        <p class="price">$${destinations.price}</p>
        <button onclick="updateDestinationPrice(${destinations.id}, 'plus')">+</button>

        <button onclick="updateDestinationPassengers(${destinations.id}, 'minus')">-</button>
        <p class="passengers">${destinations.passengers}</p>
        <button onclick="updateDestinationPassengers(${destinations.id}, 'plus')">+</button>
    </div>

    <p class="totalPrice">Total Price: $${totalPrice}</p>
    <button onclick="deleteDestination(${destinations.id})">Delete</button>
    `

    destinationsContainer.appendChild(destinationCard)
}

function displayDestinations(arr) {
    destinationsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createDestinationCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

window.onload = getAllDestinations()