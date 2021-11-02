const destinations = require('./db.json');
let globalID = 4


module.exports = {
    getDestinations: (req, res) => res.status(200).send(destinations),

    deleteDestination: (req, res) =>{
        let index = destinations.findIndex(elem => elem.id === +req.params.id)
        destinations.splice(index, 1)
        res.status(200).send(destinations)
    },

    createDestination: (req, res) => {
        let {destination, price, passengers, imageURL} = req.body
        let newDestination = {
            id: globalID,
            destination,
            price,
            passengers,
            imageURL
        }
        destinations.push(newDestination)
        res.status(200).send(destinations)
        globalID++
    },

    updateDestinationPrice: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        
        let index = destinations.findIndex(elem => +elem.id === +id)
        // price adjuster
        if (destinations[index].price - 50 < 0 && type === 'minus') {
            res.status(200).send('cant go below zero')
        } else if (type === 'minus') {
            destinations[index].price = +destinations[index].price - 50
            res.status(200).send(destinations)
        } else if (type === 'plus') {
            destinations[index].price = +destinations[index].price + 50
            res.status(200).send(destinations)
        } else {
            res.sendStatus(400).send('error')
        }
       
    },

    updateDestinationPassengers: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        
        let index = destinations.findIndex(elem => +elem.id === +id)
        // passenger adjuster
        if (destinations[index].passengers - 1 < 0 && type === 'minus') {
            res.status(200).send('cant go below zero')
        } else if (type === 'minus') {
            destinations[index].passengers = +destinations[index].passengers - 1
            res.status(200).send(destinations)
        } else if (type === 'plus') {
            destinations[index].passengers = +destinations[index].passengers + 1
            res.status(200).send(destinations)
        } else {
            res.sendStatus(400).send('error')
        }
    }
}