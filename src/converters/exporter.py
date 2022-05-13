from typing import Tuple
import networkx as nx

from src.models import Chromosome, Graph


def to_nx_graph(graph: Tuple[Graph, Chromosome]) -> nx.Graph:
    if isinstance(graph, Graph):
        return graph_to_nx_graph(graph)
    if isinstance(graph, Chromosome):
        return clique_to_nx_graph(graph)
    raise ValueError('Graph is not a Graph or Chromosome')

def graph_to_nx_graph(graph: Graph) -> nx.Graph:
    nx_graph = nx.Graph()
    nx_graph.add_nodes_from(graph.vertices)
    for node in graph.vertices:
        edges = [(node, g) for g in node.adjacency_list]
        nx_graph.add_edges_from(edges)
    return nx_graph

def clique_to_nx_graph(chromosome: Chromosome) -> nx.Graph:
    nx_graph = nx.Graph()
    nx_graph.add_nodes_from(chromosome)
    gen_set = set(chromosome)
    for node in chromosome:
        edges = [(node, g) for g in node.adjacency_list if g in gen_set]
        nx_graph.add_edges_from(edges)
    return nx_graph

