from server.model.utils import get_coordinates_from_address

class Model:
    def __init__(self):
        self.graph = None
        self.obj_algorithm = None
        self.path_limit = None
        self.elevation_strategy = None
        self.obj_elevation_path = None
        self.info_elevation_path = None
        self.obj_shortest_path = None
        self.shortest_path_information = None
        self.observer = None
        self.algorithm = None

    def add_observer(self, observer):
        self.observer = observer

    def compute_paths(self, origin, destination, path_limit, elevation_strategy):
        # calculate shortest path
        self.update_shortest_route_information(origin, destination)
        self.display_route_information(self.shortest_path_information)
        if path_limit == 0:
            self.observer.update_notifier(self.shortest_path_information, self.shortest_path_information, get_coordinates_from_address(origin), get_coordinates_from_address(destination))
            return
        self.path_limit = path_limit / 100.0
        self.elevation_strategy = elevation_strategy
        self.update_algorithm_object()
        self.info_elevation_path = self.obj_algorithm.fetch_optimal_route()
        self.display_route_information(self.info_elevation_path)
        self.observer.update_notifier(self.shortest_path_information, self.info_elevation_path, get_coordinates_from_address(origin), get_coordinates_from_address(destination))

    def update_shortest_route_information(self, coord_start, coord_end):
        self.shortest_path_information = self.obj_shortest_path.fetch_optimal_route(coord_start, coord_end)

    def update_algorithm_object(self):
        self.obj_algorithm = self.algorithm(self.graph, self.shortest_path_information.retrieve_distance(), self.path_limit, self.elevation_strategy, self.shortest_path_information.retrieve_starting_point(), self.shortest_path_information.retrieve_ending_point(), self.shortest_path_information.retrieve_gain())

    def update_algorithm(self, algorithm):
        self.algorithm = algorithm

    def display_route_information(self, route):
        print("---------------")
        print("Route Details")
        print("Approach: " + route.get_algorithm_name())
        print("Route Distance: " + str(route.retrieve_distance()))
        print("Elevation Gain: " + str(route.retrieve_gain()))
        print("---------------")
