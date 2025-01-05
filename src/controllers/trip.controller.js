const { supabase } = require("../config/db");
const getAvailableRoutes = require('../repository/routes');

/* user request handlers */
// function handle user search for available bus
exports.getBusList = async(req, res) => {
    try {
        let {departure, destination} = req.query;

        if (!departure || !destination){
            return res.status(400).json({
                error:'Departure and destination stops are required.'
            });
        };

        const availableBuses = await getAvailableRoutes(departure, destination);
        res.render("trip",{departure, destination, availableBuses: availableBuses});

    } catch(error){
        console.error('Error searching routes:', error);
        res.status(500).json({
            error: 'Failed to search routes'
        });
    }

    
    // res.send(res.json(availBuses));
}

// user books ticket
exports.bookTicket = async(req, res) => {
    const newbooking = {
        u_id: req.body.u_id,
        depart_stop: req.body.depart_stop,
        arr_stop: req.body.arr_stop,
        depTime: req.body.depTime,
        arrTime: req.body.arrTime,
        
    };
    res.status(201).send(
        {
            message: "Booking successfully made",
            ticket: {
                newbooking
            }
        }
    )
}


/* admin request handlers */


// dummy data
// const availableBuses =[
//     {
//         "from":"Wollongong",
//         "to":"Shellhabour",
//         "Departing": "09:00:00",
//         "Arriving": "10:00:00",
//         "price": "AUD$20",
//         "Available": "false"
//     },
//     {
//         "from":"Wollongong",
//         "to":"Shellhabour",
//         "Departing": "09:20:00",
//         "Arriving": "10:20:00",
//         "price": "AUD$20",
//         "Available": "true"
//     },
//     {
//         "from":"Wollongong",
//         "to":"Shellhabour",
//         "Departing": "09:40:00",
//         "Arriving": "10:40:00",
//         "price": "AUD$20",
//         "Available": "true"
//     },
//     {
//         "from":"Wollongong",
//         "to":"Shellhabour",
//         "Departing": "10:00:00",
//         "Arriving": "11:00:00",
//         "price": "AUD$20",
//         "Available": "true"
//     },
//     {
//         "from":"Wollongong",
//         "to":"Shellhabour",
//         "Departing": "10:20:00",
//         "Arriving": "11:20:00",
//         "price": "AUD$20",
//         "Available": "false"
//     }
// ]