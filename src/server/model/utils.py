from geopy.geocoders import Nominatim
import networkx as nx
from heapq import heappush, heappop
from itertools import count
from networkx.algorithms.shortest_paths.weighted import _weight_function

def get_coordinates_from_address(coordinates):
    return Nominatim(user_agent="myGeocoder").reverse(coordinates).address

def compute_path_wt(graph, route, weight_attribute):
    total = 0
    for i in range(len(route) - 1):
        total += get_weight(graph, route[i], route[i + 1], weight_attribute)
    return total

def search_algo(G, source, target, heuristic, weight):
    if source not in G or target not in G:
        print("Either the source or target location is not present in the graph.")

    if heuristic is None:
        def heuristic(u, v):
            return 0
    push, pop = heappush, heappop
    weight = _weight_function(G, weight)
    c = count()
    queue = [(0, next(c), source, 0, None)]
    enqueued, explored = {}, {}
    while queue:
        _, __, curnode, dist, parent = pop(queue)
        if curnode == target:
            path = [curnode]
            node = parent
            while node is not None:
                path.append(node)
                node = explored[node]
            path.reverse()
            return path
        if curnode in explored:
            if explored[curnode] is None:
                continue
            qcost, h = enqueued[curnode]
            if qcost < dist:
                continue
        explored[curnode] = parent
        for neighbor, w in G[curnode].items():
            ncost = dist + weight(curnode, neighbor, w)
            if neighbor in enqueued:
                qcost, h = enqueued[neighbor]
                if qcost <= ncost:
                    continue
            else:
                h = heuristic(neighbor, target)
            enqueued[neighbor] = ncost, h
            push(queue, (ncost + h, next(c), neighbor, ncost, curnode))
    raise nx.NetworkXNoPath(f"Node {target} not reachable from {source}")

def get_weight(graph, node_1, node_2, weight_type="normal"):
    if weight_type == "normal":
        try:
            return graph.edges[node_1, node_2, 0]["length"]
        except:
            return graph.edges[node_1, node_2]["weight"]
    elif weight_type == "elevation_gain":
        return max(0.0, graph.nodes[node_2]["elevation"] - graph.nodes[node_1]["elevation"])
