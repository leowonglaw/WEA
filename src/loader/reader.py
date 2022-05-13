from settings import DATA_INPUT_PATH
from scipy.io import mmread
import networkx as nx
import snap
from pathlib import Path

from src import converters
from src.models import Graph


def load_from_relative_path(relative_path: str) -> Graph:
    path = _to_path(relative_path)
    path_str, ext = str(path), path.suffix
    if ext == '.mtx':
        return load_mtx(path_str)
    if ext == '.edges':
        return load_edge(path_str)
    raise KeyError(f'The extension {ext} is not supported')

def load_mtx(path: str) -> Graph:
    scipy_mtx = mmread(path)
    b = scipy_mtx.todense()
    nx_graph = nx.Graph(b)
    return converters.import_nx_graph(nx_graph)

def load_edge(path: str) -> Graph:
    mapping = snap.TStrIntSH()
    snap_graph = snap.LoadEdgeListStr(snap.PUNGraph, path, 0, 1, mapping)
    snap_graph.Dump()
    return converters.import_snap_graph(snap_graph)

def _to_path(relative_path: str) -> Path:
    return DATA_INPUT_PATH.joinpath(relative_path)
