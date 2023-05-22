import sys
sys.path.insert(0, "/Users/neeharikakaranam/Documents/Documents-icloud/Sem4/Project/developers-elena-520")

import unittest
import osmnx as ox
import networkx as nx
from src.server.backend import *
from src.server.model.OptimalPathCalculator import *
from src.server.model.utils import *



class Test(unittest.TestCase):

    graph = None

    def setUp(self):
        self.graph = nx.MultiDiGraph()
        for x in range(5):
            self.graph.add_node(x, elevation=0.0)
        node_node_lengths = [(0, 2, 4), (1, 4, 7), (1, 5, 2), (2, 3, 8), (4, 5, 3)]
        node_node_elevations = [(0, 2, 2.0), (1, 4, -1.0), (1, 5, 0.0), (2, 3, -4.0), (4, 5, 2.0)]
        node_node_abs_elevations = [(0, 2, 2.0), (1, 4, 1.0), (1, 5, 0.0), (2, 3, 4.0), (4, 5, 2.0)]
        self.graph.add_weighted_edges_from(node_node_lengths)
        self.graph.add_weighted_edges_from(node_node_elevations)
        self.graph.add_weighted_edges_from(node_node_abs_elevations)

        value_elevations = [1.0, 0.0, 2.0, 4.0]

        for i, elev in enumerate(value_elevations):
            self.graph.nodes[i]["Elevation"] = elev
    
    def test_map_render(self):

        graph = nx.MultiDiGraph()
        assert isinstance(graph, nx.classes.multidigraph.MultiDiGraph)
    
    def test_coordinates_from_address(self):

        lat_long = (42.391155, -72.526711)
        address = get_coordinates_from_address(lat_long)
        assert 'University of Massachusetts Amherst' in address

    def test_astar_max_elevation(self):

        start = (42.391155, -72.526711)
        destination = (42.3978, -72.5147)
        path_limit = 50
        elevation_strategy = 'max'
        controller = AStarController()
        model = Model()
        # view = View()
        # model.add_observer(view)
        controller.set_route_model(model)
        controller.set_start_location(start)
        controller.set_end_location(destination)
        controller.set_path_limit(path_limit)
        controller.set_elevation_strategy(elevation_strategy)
        controller.manipulate_route_model()
        out_json = json.loads(controller.get_output_json())
        shortest_path_dist = out_json['shortDist']
        elev_path_dist = out_json['elev_path_dist']
        shortest_path_elev = out_json['gainShort']
        elev_path_gain = out_json['elev_path_gain']
        assert elev_path_dist <= (1 + path_limit / 100) * shortest_path_dist
        assert elev_path_gain >= shortest_path_elev
    

if __name__ == '__main__':
    unittest.main()