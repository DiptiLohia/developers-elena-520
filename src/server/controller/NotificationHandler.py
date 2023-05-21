import json

FEATURE = "Feature"
LINESTRING = "LineString"
PROPERTIES = "properties"
GEOMETRY = "geometry"
TYPE = "type"
COORDINATES = "coordinates"
ELEV_ROUTE = "elev_path_route"
SHORTEST_ROUTE = "shortest_route"
SHORTEST_DIST = "shortDist"
SHORTEST_GAIN = "gainShort"
SHORTEST_DROP = "dropShort"
START = "start"
END = "end"
ELEV_DIST = "elev_path_dist"
ELEV_GAIN = "elev_path_gain"
ELEV_DROP = "elev_path_drop"
BOOL_FLAG = "bool_pop"

def create_route_json(coordinates):
    route_json = {PROPERTIES: {}, GEOMETRY: {}, TYPE: FEATURE}
    route_json[GEOMETRY][TYPE] = LINESTRING
    route_json[GEOMETRY][COORDINATES] = coordinates
    return route_json

class NotificationHandler:
    def __init__(self):
        self.output_data = {}

    def notify_route_update(self, optimal_route=None, elevation_route=None, initial_location=None, destination_location=None):
        self.output_data = {ELEV_ROUTE: create_route_json(elevation_route.modify_path()), SHORTEST_ROUTE: create_route_json(optimal_route.modify_path()),
                            SHORTEST_DIST: optimal_route.modify_distance(), SHORTEST_GAIN: optimal_route.modify_gain(),
                            SHORTEST_DROP: optimal_route.modify_drop(), START: initial_location, END: destination_location,
                            ELEV_DIST: elevation_route.modify_distance(), ELEV_GAIN: elevation_route.modify_gain(), ELEV_DROP: elevation_route.modify_drop()}
        
        if len(elevation_route.modify_path()) == 0:
            self.output_data[BOOL_FLAG] = 1
        else:
            self.output_data[BOOL_FLAG] = 2

    def get_output_json(self):
        """
        Returns the output data as a JSON object.
        Returns:
            JSON object
        """
        print('Output data: ', self.output_data)
        return json.dumps(self.output_data)
