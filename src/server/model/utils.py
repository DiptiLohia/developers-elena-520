from geopy.geocoders import Nominatim
import networkx as nx
from heapq import heappush, heappop
from itertools import count
from networkx.algorithms.shortest_paths.weighted import _weight_function

def get_coordinates_from_address(coordinates):
    geolocator = Nominatim(user_agent="myGeocoder")
    return geolocator.reverse(coordinates).address

def compute_path_weight(graph, route, weight_attribute):
    total_weight = 0
    for i in range(len(route) - 1):
        total_weight += get_edge_weight(graph, route[i], route[i + 1], weight_attribute)
    return total_weight

def search_algorithm(graph, source, target, heuristic=None, weight="weight"):
    if source not in graph or target not in graph:
        print("Error: The source or target location is not found in the graph.")

    if heuristic is None:
        def heuristic(u, v):
            return 0

    push, pop = heappush, heappop
    weight_func = _weight_function(graph, weight)
    counter = count()
    queue = [(0, next(counter), source, 0, None)]
    enqueued, explored = {}, {}

    while queue:
        _, __, current_node, dist, parent = pop(queue)

        if current_node == target:
            path = [current_node]
            node = parent
            while node is not None:
                path.append(node)
                node = explored[node]
            path.reverse()
            return path

        if current_node in explored:
            if explored[current_node] is None:
                continue
            qcost, h = enqueued[current_node]
            if qcost < dist:
                continue

        explored[current_node] = parent

        for neighbor, edge_data in graph[current_node].items():
            neighbor_cost = dist + weight_func(current_node, neighbor, edge_data)

            if neighbor in enqueued:
                qcost, h = enqueued[neighbor]
                if qcost <= neighbor_cost:
                    continue

            else:
                h = heuristic(neighbor, target)

            enqueued[neighbor] = neighbor_cost, h
            push(queue, (neighbor_cost + h, next(counter), neighbor, neighbor_cost, current_node))

    raise nx.NetworkXNoPath(f"Node {target} not reachable from {source}")

def get_edge_weight(graph, node_1, node_2, weight_type="normal"):
    if weight_type == "normal":
        try:
            return graph.edges[node_1, node_2, 0]["length"]
        except KeyError:
            return graph.edges[node_1, node_2]["weight"]

    elif weight_type == "elevation_gain":
        return max(0.0, graph.nodes[node_2]["elevation"] - graph.nodes[node_1]["elevation"])
