import networkx as nx
import osmnx as ox
import math
import logging
from server.model.RouteInfo import RouteInfo
from server.model.utils import compute_path_weight, search_algorithm

class DijkstraRoute:
    def __init__(self, graph, closest_route, path_limit, elevation_strategy, initial_location, target_location, shortest_elevation_gain):
        self.logger = logging.getLogger(__name__)  # Initialize logger
        self.graph = graph  # Assign graph object
        self.initial_location = initial_location  # Assign starting location
        self.target_location = target_location  # Assign ending location
        self.closest_route = closest_route  # Assign shortest distance
        self.elevation_strategy = elevation_strategy  # Assign elevation strategy
        self.factor_of_scaling = 100  # Initialize scaling factor
        self.shortest_elevation_gain = shortest_elevation_gain  # Assign shortest elevation gain
        self.path_of_elevation = None  # Initialize path of elevation
        self.path_limit = path_limit  # Assign path limit
        self.elevation_distance = None  # Initialize elevation distance

    def fetch_optimal_route(self):
        graph = self.graph
        if self.elevation_strategy == "min":
            min_max_factor = 1
        else:
            min_max_factor = -1
        self.path_of_elevation = nx.shortest_path(graph, source=self.initial_location, target=self.target_location, weight='length')  # Compute shortest path based on edge length
        while self.factor_of_scaling < 10000:
            # Dijkstra is a special case of AStar algorithm when the heuristic is set to None
            path_of_elevation = search_algorithm(graph, source=self.initial_location, target=self.target_location, heuristic=None, weight=lambda u, v, d: math.exp(min_max_factor * d[0]['length'] * (d[0]['grade'] + d[0]['grade_abs']) / 2) + math.exp(1/self.factor_of_scaling * (d[0]['length'])))
            elevation_distance = sum(ox.utils_graph.get_route_edge_attributes(graph, path_of_elevation, 'length'))
            elevation_gain = compute_path_weight(self.graph, path_of_elevation, "elevation_gain")
            if elevation_distance <= (1 + self.path_limit) * self.closest_route and \
                    min_max_factor*elevation_gain <= min_max_factor*self.shortest_elevation_gain:
                self.path_of_elevation = path_of_elevation
                self.shortest_elevation_gain = elevation_gain
            self.factor_of_scaling *= 5

        recompute_path_metrics = RouteInfo()
        recompute_path_metrics.modify_algo_name("Dijkstra")
        recompute_path_metrics.modify_gain(compute_path_weight(self.graph, self.path_of_elevation, "elevation_gain"))
        recompute_path_metrics.modify_drop(0)
        recompute_path_metrics.modify_path([[graph.nodes[route_node]['x'], graph.nodes[route_node]['y']] for route_node in self.path_of_elevation])
        recompute_path_metrics.modify_distance(sum(ox.utils_graph.get_route_edge_attributes(graph, self.path_of_elevation, 'length')))

        return recompute_path_metrics

class AstarRoute:
    def __init__(self, graph, closest_route, path_limit, elevation_strategy, initial_location, target_location, shortest_elevation_gain):
        self.logger = logging.getLogger(__name__)  # Initialize logger
        self.graph = graph  # Assign graph object
        self.initial_location = initial_location  # Assign starting location
        self.target_location = target_location  # Assign ending location
        self.closest_route = closest_route  # Assign shortest distance
        self.elevation_strategy = elevation_strategy  # Assign elevation strategy
        self.factor_of_scaling = 100  # Initialize scaling factor
        self.shortest_elevation_gain = shortest_elevation_gain  # Assign shortest elevation gain
        self.path_of_elevation = None  # Initialize path of elevation
        self.path_limit = path_limit  # Assign path limit
        self.elevation_distance = None  # Initialize elevation distance

    def distance(self, a, b):
        # Distance function used for A* algorithm
        return self.graph.nodes[a]['dist_from_dest'] * 1 / self.factor_of_scaling
    
    def fetch_optimal_route(self):
        graph = self.graph  # Assign graph object to local variable
        if self.elevation_strategy == "min":
            min_max_factor = 1
        else:
            min_max_factor = -1
        self.path_of_elevation = nx.shortest_path(graph, source=self.initial_location, target=self.target_location, weight='length')  # Compute shortest path based on edge length
        while self.factor_of_scaling < 10000:
            # Returns the shortest route from the starting location to the ending location based on distance
            path_of_elevation = search_algorithm(graph, source=self.initial_location, target=self.target_location,heuristic=self.distance, weight=lambda u, v, d: math.exp(min_max_factor * d[0]['length'] * (d[0]['grade'] + d[0]['grade_abs']) / 2) + math.exp((1 / self.factor_of_scaling) * d[0]['length']))  # Compute elevation-aware shortest path
            elevation_distance = sum(ox.utils_graph.get_route_edge_attributes(graph, path_of_elevation, 'length'))  # Compute total distance of elevation route
            elevation_gain = compute_path_weight(self.graph, path_of_elevation, "elevation_gain")  # Compute elevation gain of elevation route
            if elevation_distance <= (1 + self.path_limit) * self.closest_route and \
                    min_max_factor * elevation_gain <= min_max_factor * self.shortest_elevation_gain:
                self.path_of_elevation = path_of_elevation  # Update elevation route
                self.shortest_elevation_gain = elevation_gain  # Update shortest elevation gain
            self.factor_of_scaling *= 5  # Increase scaling factor

        recompute_path_metrics = RouteInfo()  # Create RouteInfo object
        recompute_path_metrics.modify_algo_name("AStar")
        recompute_path_metrics.modify_gain(compute_path_weight(self.graph, self.path_of_elevation, "elevation_gain"))
        recompute_path_metrics.modify_drop(0)
        recompute_path_metrics.modify_path([[graph.nodes[route_node]['x'], graph.nodes[route_node]['y']] for route_node in self.path_of_elevation])
        recompute_path_metrics.modify_distance(sum(ox.utils_graph.get_route_edge_attributes(graph, self.path_of_elevation, 'length')))

        return recompute_path_metrics
