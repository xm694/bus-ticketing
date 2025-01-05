CREATE TABLE arrTime (
    route_id INT NOT NULL,
    stop_id INT NOT NULL,
    bus_id INT NOT NULL,
    schedule_time TIME NOT NULL,
    FOREIGN KEY (route_id) REFERENCES routes(route_id),
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id),
    FOREIGN KEY (stop_id) REFERENCES stops(stop_id)
)