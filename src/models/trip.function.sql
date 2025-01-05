-- Create a PostgreSQL function in Supabase SQL editor
CREATE OR REPLACE FUNCTION get_available_routes(
    departure_stop_name TEXT,
    destination_stop_name TEXT
)
RETURNS TABLE (
    route_name VARCHAR,
    departure_stop VARCHAR,
    departure_city VARCHAR,
    departure_time TIME,
    arrival_stop VARCHAR,
    arrival_city VARCHAR,
    arrival_time TIME,
    total_seats INTEGER,
    price DECIMAL,
    booking_status TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH departure_stops AS (
        SELECT 
            r.route_id,
            r.name as route_name,
            b.bus_id,
            b.capacity,
            s1.name as departure_stop,
            s1.city as departure_city,
            dt.schedule_time as departure_time
        FROM routes r
        JOIN busroute br ON r.route_id = br.route_id
        JOIN buses b ON br.bus_id = b.bus_id
        JOIN deptime dt ON r.route_id = dt.route_id
        JOIN stops s1 ON dt.stop_id = s1.stop_id
        WHERE s1.name = departure_stop_name
    ),
    arrival_stops AS (
        SELECT 
            r.route_id,
            s2.name as arrival_stop,
            s2.city as arrival_city,
            at.schedule_time as arrival_time
        FROM routes r
        JOIN arrtime at ON r.route_id = at.route_id
        JOIN stops s2 ON at.stop_id = s2.stop_id
        WHERE s2.name = destination_stop_name
    )
    SELECT 
        d.route_name,
        d.departure_stop,
        d.departure_city,
        d.departure_time,
        a.arrival_stop,
        a.arrival_city,
        a.arrival_time,
        d.capacity as total_seats,
        50.00::DECIMAL as price,  -- Hardcoded price
        CASE 
            WHEN d.capacity > 0 THEN 'Available'
            ELSE 'Unavailable'
        END as booking_status
    FROM departure_stops d
    JOIN arrival_stops a ON d.route_id = a.route_id
    WHERE d.departure_time < a.arrival_time
    ORDER BY d.departure_time ASC;
END;
$$ LANGUAGE plpgsql;