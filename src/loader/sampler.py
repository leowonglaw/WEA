import snap

from src import converters
from src.models import Graph


def generate_sample(self, nodes=1000, edges=100) -> Graph:
    snap_graph = snap.GenRndGnm(snap.PUNGraph, nodes, edges)
    return converters.import_snap_graph(snap_graph)
