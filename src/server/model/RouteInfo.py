class RouteInfo:
    def __init__(self):
        # Initialize the class variables
        self.algoName = "AStar"  # Algorithm name
        self.origin_location = None, None  # Origin location coordinates
        self.destination_location = None, None  # Destination location coordinates
        self.path = []  # Route path
        self.altitude_gain = 0  # Altitude gain
        self.altitude_drop = 0  # Altitude drop
        self.distance = 0.0  # Distance

    def retrieve_algo_name(self):
        # Return the algorithm name
        return self.algoName
    
    def get_gain(self):
        # Return the altitude gain
        return self.altitude_gain

    def get_drop(self):
        # Return the altitude drop
        return self.altitude_drop

    def get_route(self):
        # Return the route path
        return self.path

    def get_distance(self):
        # Return the distance
        return self.distance

    def get_origin_location(self):
        # Return the origin location coordinates
        return self.origin_location

    def get_destination_location(self):
        # Return the destination location coordinates
        return self.destination_location
    
    def modify_algo_name(self, algoName):
        # Modify the algorithm name
        self.algoName = algoName

    def modify_gain(self, altitude_gain):
        # Modify the altitude gain
        self.altitude_gain = altitude_gain

    def modify_drop(self, altitude_drop):
        # Modify the altitude drop
        self.altitude_drop = altitude_drop

    def modify_path(self, path):
        # Modify the route path
        self.path = path

    def modify_distance(self, distance):
        # Modify the distance
        self.distance = distance

    def modify_origin_location(self, origin_location):
        # Modify the origin location coordinates
        self.origin_location = origin_location

    def modify_destination_location(self, destination_location):
        # Modify the destination location coordinates
        self.destination_location = destination_location
