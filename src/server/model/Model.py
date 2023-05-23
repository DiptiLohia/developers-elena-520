from server.model.utils import get_coordinates_from_address
from server.model.ModelManager import ModelManager
from server.model.OptimalPathCalculator import OptimalPathCalculator

class Model:
    def __init__(self):
        self.graph = None
        self.obj_algorithm = None
        self.path_limit = None
        self.elevation_strategy = None
        self.obj_elevation_path = None
        self.info_elevation_path = None
        self.optimal_path_object = None
        self.shortest_path_information = None
        self.observer = None
        self.algorithm = None

    def add_observer(self, observer):
        self.observer = observer

    def update_algorithm_object(self):
        self.obj_algorithm = self.algorithm(self.graph, self.shortest_path_information.get_distance(), self.path_limit, self.elevation_strategy, self.shortest_path_information.get_origin_location(), self.shortest_path_information.get_destination_location(), self.shortest_path_information.get_gain())

    def update_algorithm(self, algorithm):
        self.algorithm = algorithm

    def compute_paths(self, origin, destination, path_limit, elevation_strategy):
        # calculate shortest path
        self.update_shortest_route_information(origin, destination)
        self.display_route_information(self.shortest_path_information)
        if path_limit == 0:
            self.observer.notify_route_update(self.shortest_path_information, self.shortest_path_information, get_coordinates_from_address(origin), get_coordinates_from_address(destination))
            return
        self.path_limit = path_limit / 100.0
        self.elevation_strategy = elevation_strategy
        self.update_algorithm_object()
        self.info_elevation_path = self.obj_algorithm.fetch_optimal_route()
        self.display_route_information(self.info_elevation_path)
        self.observer.notify_route_update(self.shortest_path_information, self.info_elevation_path, get_coordinates_from_address(origin), get_coordinates_from_address(destination))

    def update_shortest_route_information(self, initial_node, target_node):
        self.graph = ModelManager().analyze_elevation_graph(target_node)
        self.optimal_path_object = OptimalPathCalculator(self.graph)
        self.shortest_path_information = self.optimal_path_object.fetch_optimal_route(initial_node, target_node)

    def display_route_information(self, route):
        print("---------------")
        print("Route Details")
        print("Approach: " + route.retrieve_algo_name())
        print("Route Distance: " + str(route.get_distance()))
        print("Elevation Gain: " + str(route.get_gain()))
        print("---------------")
