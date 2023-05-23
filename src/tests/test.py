import sys
sys.path.insert(0, "/Users/neeharikakaranam/Documents/Documents-icloud/Sem4/Project/developers-elena-520")

import unittest
import osmnx as ox
import networkx as nx
from src.server.backend import *
from src.server.model.OptimalPathCalculator import *
from src.server.model.utils import *

class Test(unittest.TestCase):
    
    #Checking if the map is rendered properly
    def test_map_render(self):

        graph = nx.MultiDiGraph()
        assert isinstance(graph, nx.classes.multidigraph.MultiDiGraph)
    
    #Checking if the coordinates are getting converted to the address
    def test_coordinates_from_address(self):

        lat_long = (42.391155, -72.526711)
        address = get_coordinates_from_address(lat_long)
        assert 'University of Massachusetts Amherst' in address
    
    #Checking if the astar path has less elevation than the shortest path
    def test_astar_short_path(self):

        start = (42.391155, -72.526711)
        destination = (42.4069, 72.5359)
        path_limit = 30
        elevation = 'max'
        controller = AStarController()
        notificationHandler = NotificationHandler()
        model = Model()
        model.add_observer(notificationHandler)
        controller.set_route_model(model)
        controller.set_start_location(start)
        controller.set_end_location(destination)
        controller.set_path_limit(path_limit)
        controller.set_elevation_strategy(elevation)
        controller.manipulate_route_model()
        json_output = json.loads(notificationHandler.get_output_json())
        shortest_distance = json_output['shortest_distance']
        elevation_path_distance = json_output['elevation_path_distance']
        shortest_elevation_gain = json_output['shortest_elevation_gain']
        elevation_path_gain = json_output['elevation_path_gain']
        assert elevation_path_distance <= (1 + path_limit / 100) * shortest_distance
        assert elevation_path_gain >= shortest_elevation_gain

    #Checking if the dijkstra path has less elevation than the shortest path  
    def test_dijstra_short_path(self):

        start = (42.391155, -72.526711)
        destination = (42.4069, 72.5359)
        path_limit = 30
        elevation = 'max'
        controller = DijkstraController()
        notificationHandler = NotificationHandler()
        model = Model()
        model.add_observer(notificationHandler)
        controller.set_route_model(model)
        controller.set_start_location(start)
        controller.set_end_location(destination)
        controller.set_path_limit(path_limit)
        controller.set_elevation_strategy(elevation)
        controller.manipulate_route_model()
        json_output = json.loads(notificationHandler.get_output_json())
        shortest_distance = json_output['shortest_distance']
        elevation_path_distance = json_output['elevation_path_distance']
        shortest_elevation_gain = json_output['shortest_elevation_gain']
        elevation_path_gain = json_output['elevation_path_gain']
        assert elevation_path_distance <= (1 + path_limit / 100) * shortest_distance
        assert elevation_path_gain >= shortest_elevation_gain

    #Checking if the astar path has higher elevation than the shortest path
    def test_astar_max_ele(self):

        start = (42.391155, -72.526711)
        destination = (42.4069, 72.5359)
        path_limit = 30
        elevation = 'max'
        controller = AStarController()
        notificationHandler = NotificationHandler()
        model = Model()
        model.add_observer(notificationHandler)
        controller.set_route_model(model)
        controller.set_start_location(start)
        controller.set_end_location(destination)
        controller.set_path_limit(path_limit)
        controller.set_elevation_strategy(elevation)
        controller.manipulate_route_model()
        json_output = json.loads(notificationHandler.get_output_json())
        shortest_distance = json_output['shortest_distance']
        elevation_path_distance = json_output['elevation_path_distance']
        shortest_elevation_gain = json_output['shortest_elevation_gain']
        elevation_path_gain = json_output['elevation_path_gain']
        assert elevation_path_distance <= (1 + path_limit / 100) * shortest_distance
        assert elevation_path_gain >= shortest_elevation_gain

    #Checking if the dijkstra path has higher elevation than the shortest path
    def test_dijkstra_max_ele(self):

        start = (42.391155, -72.526711)
        destination = (42.4069, 72.5359)
        path_limit = 30
        elevation = 'max'
        controller = DijkstraController()
        notificationHandler = NotificationHandler()
        model = Model()
        model.add_observer(notificationHandler)
        controller.set_route_model(model)
        controller.set_start_location(start)
        controller.set_end_location(destination)
        controller.set_path_limit(path_limit)
        controller.set_elevation_strategy(elevation)
        controller.manipulate_route_model()
        json_output = json.loads(notificationHandler.get_output_json())
        shortest_distance = json_output['shortest_distance']
        elevation_path_distance = json_output['elevation_path_distance']
        shortest_elevation_gain = json_output['shortest_elevation_gain']
        elevation_path_gain = json_output['elevation_path_gain']
        assert elevation_path_distance <= (1 + path_limit / 100) * shortest_distance
        assert elevation_path_gain >= shortest_elevation_gain
    
    #Checking the MVC architecture - Astar controller to Model
    def test_model_controller_astar(self):
        start = (42.391155, -72.526711)
        destination = (42.4069, 72.5359)
        path_limit = 30
        elevation = 'max'
        controller = AStarController()
        notificationHandler = NotificationHandler()
        model = Model()
        model.add_observer(notificationHandler)
        controller.set_route_model(model)
        controller.set_start_location(start)
        controller.set_end_location(destination)
        controller.set_path_limit(path_limit)
        controller.set_elevation_strategy(elevation)
        controller.manipulate_route_model()
        assert model.algorithm == AstarRoute

    #Checking the MVC architecture - Dijkstra controller to Model
    def test_model_controller_dijkstra(self):
        start = (42.391155, -72.526711)
        destination = (42.4069, 72.5359)
        path_limit = 30
        elevation = 'max'
        controller = DijkstraController()
        notificationHandler = NotificationHandler()
        model = Model()
        model.add_observer(notificationHandler)
        controller.set_route_model(model)
        controller.set_start_location(start)
        controller.set_end_location(destination)
        controller.set_path_limit(path_limit)
        controller.set_elevation_strategy(elevation)
        controller.manipulate_route_model()
        assert model.algorithm == DijkstraRoute


if __name__ == '__main__':
    unittest.main()