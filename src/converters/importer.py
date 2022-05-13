import networkx as nx
import snap
from collections import defaultdict

from src.models import Graph, Node


def import_nx_graph(nx_graph: nx.Graph) -> Graph:
    graph = Graph()
    nodes = defaultdict(Node)
    for node_id in nx_graph.nodes():
        node = nodes[node_id]
        for adjacent_node_id in nx_graph.neighbors(node_id):
            adjacent_node = nodes[adjacent_node_id]
            graph.add_edge(node, adjacent_node)
    return graph

def import_snap_graph(snap_graph: snap.PUNGraph) -> Graph:
    graph = Graph()
    nodes = defaultdict(Node)
    for snap_node in snap_graph.Nodes():
        _id = snap_node.GetId()
        node = nodes[_id]
        for adjacent_node_id in snap_node.GetOutEdges():
            adjacent_node = nodes[adjacent_node_id]
            graph.add_edge(node, adjacent_node)
    return graph
