from typing import Tuple
import networkx as nx

from src.models import Chromosome, Graph


def to_nx_graph(graph: Tuple[Graph, Chromosome]) -> nx.Graph:
    nx_graph = nx.Graph()
    if isinstance(graph, Graph):
        nx_graph.add_nodes_from(graph.vertices)
        for node in graph.vertices:
            edges = [(node, g) for g in node.adjacency_list]
            nx_graph.add_edges_from(edges)
        return nx_graph
    else:
        raise NotImplementedError
