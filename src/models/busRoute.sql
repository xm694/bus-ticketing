CREATE TABLE busRoute (
    route_id BIGINT(20) NOT NULL,
    bus_id INT NOT NULL,
    stop_id INT NOT NULL,
    FOREIGN KEY (route_id) REFERENCES routes(route_id),
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id),
    FOREIGN KEY (stop_id) REFERENCES stops(stop_id)
)