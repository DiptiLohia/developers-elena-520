from server.controller.BaseController import *
from server.model.Algorithms import AstarRoute

class AStarController(BaseController):
    def __init__(self):
        super().__init__()
        self.route_model = None  # The route model used for computing the shortest route
        self.observer = None  # The observer object
        self.elevation_strategy = None  # The elevation strategy used for considering elevation in the route
        self.start_location = None  # The starting location of the route
        self.end_location = None  # The ending location of the route
        self.path_limit = None  # The maximum number of paths to generate

    def set_route_model(self, route_model):
        """
        Sets the route model used for computing the shortest route.
        """
        self.route_model = route_model

    def set_elevation_strategy(self, elevation_strategy):
        """
        Sets the elevation strategy used for considering elevation in the route.
        """
        self.elevation_strategy = elevation_strategy

    def set_start_location(self, start_location):
        """
        Sets the starting location of the route.
        """
        self.start_location = start_location

    def set_end_location(self, end_location):
        """
        Sets the ending location of the route.
        """
        self.end_location = end_location

    def set_path_limit(self, path_limit):
        """
        Sets the maximum number of paths to generate.
        """
        self.path_limit = path_limit

    def manipulate_route_model(self):
        """
        Manipulates the route model by setting the algorithm and generating paths based on the provided parameters.
        """        
        self.route_model.update_algorithm(AstarRoute)
        self.route_model.compute_paths(self.start_location, self.end_location, self.path_limit, self.elevation_strategy)
