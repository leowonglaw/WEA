from typing import Set


class Node:
    ''' A node of undirected graph '''

    __slots__ = ['adjacency_list']

    def __init__(self):
        self.adjacency_list: Set["Node"] = set()

    def is_compatible(self, other: "Node"):
        return other in self.adjacency_list


class Graph:
    ''' Undirected graph '''

    __slots__ = ['vertices']

    def __init__(self):
        self.vertices = set()

    def add_edge(self, src: Node, dest: Node):
        self.vertices.add(src)
        self.vertices.add(dest)
        src.adjacency_list.add(dest)
        dest.adjacency_list.add(src)


class Chromosome(list):
    ''' Ensure there is only feasible gens.
        It does not contains None values.
        It has a dynamic length.
    '''

    def append_if_compatible(self, gen: Node):
        if self.is_gen_compatible(gen):
            self.append(gen)

    def is_gen_compatible(self, gen: Node):
        return all(gen.is_compatible(g) for g in self)

    @property
    def fitness(self):
        return len(self)

    def mutate(self, mutation_gen: Node):
        if mutation_gen in self:
            return self
        mutated_chromosome = self.filter_compatible_gens(mutation_gen)
        mutated_chromosome.append(mutation_gen)
        return mutated_chromosome

    def filter_compatible_gens(self, gen: Node) -> "Chromosome":
        filtered = (g for g in self if gen.is_compatible(g))
        return Chromosome(filtered)
