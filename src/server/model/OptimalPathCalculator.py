import logging
import networkx as nx
import osmnx as ox
from server.model.RouteInfo import RouteInfo
from server.model.utils import compute_path_weight

class OptimalPathCalculator:
    def __init__(self, graph):
        self.logger = logging.getLogger(__name__)
        self.graph = graph
        self.initial_location = None
        self.target_location = None

    def fetch_optimal_route(self, starting_point, ending_point):
        graph = self.graph
        self.initial_location, self.target_location = None, None
        self.initial_location= ox.distance.nearest_nodes(graph, starting_point[1], starting_point[0])
        self.target_location = ox.distance.nearest_nodes(graph, ending_point[1], ending_point[0])
        self.closest_route = nx.shortest_path(graph, source=self.initial_location, target=self.target_location, weight='length')
        print("Shortest route between source and destination has been calculated.")

        recompute_route_metrics = RouteInfo()
        recompute_route_metrics.modify_origin_location(self.initial_location)
        recompute_route_metrics.modify_destination_location(self.target_location)
        recompute_route_metrics.modify_algo_name("Shortest Route")
        recompute_route_metrics.modify_gain(compute_path_weight(self.graph, self.closest_route, "elevation_gain"))
        recompute_route_metrics.modify_drop(0)
        recompute_route_metrics.modify_path([[graph.nodes[route_node]['x'], graph.nodes[route_node]['y']] for route_node in self.closest_route])
        recompute_route_metrics.modify_distance(sum(ox.utils_graph.get_route_edge_attributes(graph, self.closest_route, 'length')))

        return recompute_route_metrics
