const { supabase } = require('../config/db');

async function getAvailableRoutes(departureStop, destinationStop) {
    try {
        let { data: departureData, error: depError } = await supabase
            .from('deptime')
            .select(`
                route_id,
                schedule_time,
                stop_id,
                stops (
                    name,
                    city
                )
            `)
            .eq('stops.name', departureStop);
        
        departureData = departureData.filter( dat => dat.stops != null);

        if (depError) throw depError;

        let { data: arrivalData, error: arrError } = await supabase
            .from('arrtime')
            .select(`
                route_id,
                schedule_time,
                stop_id,
                stops (
                    name,
                    city
                )
            `)
            .eq('stops.name', destinationStop);
        arrivalData = arrivalData.filter( dat => dat.stops != null)

        if (arrError) throw arrError;

        const { data: busData, error: busError } = await supabase
            .from('busroute')
            .select(`
                route_id,
                bus_id,
                buses (
                    capacity
                )
            `);

        if (busError) throw busError;

        // 4. Get route names
        const { data: routeData, error: routeError } = await supabase
            .from('routes')
            .select('route_id, name');

        if (routeError) throw routeError;

        // Combine the data
        const availableRoutes = [];

        // Create a map for faster lookups
        const routeMap = new Map(routeData.map(route => [route.route_id, route]));
        const busMap = new Map(busData.map(bus => [bus.route_id, bus]));
        const arrivalMap = new Map(arrivalData.map(arr => [arr.route_id, arr]));

        // Process each departure time
        for (const dep of departureData) {
            const arr = arrivalMap.get(dep.route_id);
            const route = routeMap.get(dep.route_id);
            const bus = busMap.get(dep.route_id);

            // Only include routes where departure is before arrival
            if (arr && route && bus && dep.schedule_time < arr.schedule_time) {
                availableRoutes.push({
                    route_id: route.route_id,
                    route_name: route.name,
                    departure_stop: dep.stops.name,
                    departure_city: dep.stops.city,
                    departure_time: dep.schedule_time,
                    arrival_stop: arr.stops.name,
                    arrival_city: arr.stops.city,
                    arrival_time: arr.schedule_time,
                    total_seats: bus.buses?.capacity || 0,
                    price: 50.00,
                    booking_status: (bus.buses?.capacity || 0) > 0 ? 'Available' : 'Unavailable'
                });
            }
        }

        // Sort by departure time
        return availableRoutes.sort((a, b) => 
            new Date('1970/01/01 ' + a.departure_time) - 
            new Date('1970/01/01 ' + b.departure_time)
        );

    } catch (error) {
        console.error('Error in getAvailableRoutes:', error);
        throw error;
    }
}

module.exports = getAvailableRoutes;