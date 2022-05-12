from collections import defaultdict
import snap

from .models import Node, Graph
from settings import DATA_INPUT_PATH


class GraphSampler:

    def __init__(self):
        self.graph = Graph()
        self.nodes = defaultdict(Node)

    def generate_sample(self, nodes=1000, edges=100) -> Graph:
        snap_graph = snap.GenRndGnm(snap.PUNGraph, nodes, edges)
        return self._process_graph(snap_graph)

    def from_data_set(self, relative_path: str):
        path = str(DATA_INPUT_PATH.joinpath(relative_path))
        mapping = snap.TStrIntSH()
        snap_graph = snap.LoadEdgeListStr(snap.PUNGraph, path, 0, 1, mapping)
        snap_graph.Dump()
        return self._process_graph(snap_graph)

    def _process_graph(self, snap_graph: snap.PUNGraph):
        for snap_node_a in snap_graph.Nodes():
            _id = snap_node_a.GetId()
            node_a = self.nodes[_id]
            node_a.value = _id
            for snap_node_b_id in snap_node_a.GetOutEdges():
                node_b = self.nodes[snap_node_b_id]
                self.graph.add_edge(node_a, node_b)
        return self.graph
