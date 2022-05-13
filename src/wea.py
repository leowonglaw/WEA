import random
from typing import List, Tuple
import heapq

from .utils import timeit
from .models import Graph, Chromosome


class WEAClique:
    ''' A simple generic algorithm for the maximum clique problem
        with a feasibility maintenance approach
    '''

    # STOP CONDITIONS
    ITERATIONS = 1000
    MAX_UNCHANGED_FITTEST = 20

    # SETTINGS
    POPULATION_SIZE = 1000
    BIAS_PROBABILITY = 0.5 # UNIFORM CROSSOVER
    MUTATION = 0.15
    TOURNAMENT_SIZE = int(POPULATION_SIZE * 0.2)
    MAX_HILLED = 3
    ELITE_SIZE = int(POPULATION_SIZE * 0.1)

    def __init__(self, graph: Graph):
        if not graph.vertices:
            raise ValueError("No data in graph")
        self.graph = graph
        self.generation = 0
        self.fittest = Chromosome()
        self._unchanged_fittest_count = 0
        self.population = list()

    @timeit
    def run(self) -> List[Chromosome]:
        self.population = self.create_initial_population()
        while not self.stop_condition:
            self.generation += 1
            self.population = self.population_replacement()
            fittest = self.population[0]
            self.__update_fittest(fittest)
            if self.generation % 10 == 0:
                print(f'{self.generation}: fittest {fittest.fitness}')
        print(f'STOP {self.generation}: fittest {self.fittest.fitness}')
        return self.population

    @property
    def stop_condition(self) -> bool:
        return any((
            self.generation > self.ITERATIONS,
            self._unchanged_fittest_count > self.MAX_UNCHANGED_FITTEST,
        ))

    def population_replacement(self) -> List[Chromosome]:
        ''' Generational replacement model ELITE_SIZE based on fitness'''
        NON_ELITE_SIZE = self.POPULATION_SIZE - self.ELITE_SIZE
        self.population.sort(key=lambda x: -x.fitness)
        new_population = self.population[:self.ELITE_SIZE]
        for _ in range(0, NON_ELITE_SIZE, 2):
            parents = self.select_parents(self.population)
            children = self.crossover(*parents)
            children = [self.mutate(child)
                      if random.random() < self.MUTATION
                      else child
                      for child in children]
            new_population.extend(children)
        new_population = [self.hill_climb(child) for child in new_population]
        return new_population

    def crossover(self, parent_a: Chromosome, parent_b: Chromosome) -> Tuple[Chromosome, Chromosome]:
        ''' Uniform crossover. Only generates feasible offsprings
            - input: two feasible parents (may be different length)
            - output: two feasible offsprings
        '''
        random.shuffle(parent_a)
        random.shuffle(parent_b)
        offspring_a, offspring_b = Chromosome(), Chromosome()
        for gen_a, gen_b in zip(parent_a, parent_b):
            if random.random() > self.BIAS_PROBABILITY:
                gen_a, gen_b = gen_b, gen_a
            offspring_a.append_if_compatible(gen_a)
            offspring_b.append_if_compatible(gen_b)
        # add left elements by zip
        parent_left = max((parent_a, parent_b), key=lambda p: len(p))
        for gen_left in parent_left[len(offspring_a):]:
            offspring_a.append_if_compatible(gen_left)
            offspring_b.append_if_compatible(gen_left)
        return offspring_a, offspring_b

    def mutate(self, chromosome: Chromosome) -> Chromosome:
        ''' Random resseting. Mantains feasibility '''
        mutation_gen = random.choice(list(self.graph.vertices))
        mutation = chromosome.mutate(mutation_gen)
        return mutation

    def hill_climb(self, chromosome: Chromosome) -> Chromosome:
        ''' Stochastic local search
            insert MAX_HILLED genes to the chromosome
            limited with a MAX_HILLED parameter to avoid premature convergence
        '''
        improved_chromosome = chromosome
        hilled_count = 0
        possible_improvements = set(chromosome[0].adjacency_list) - set(chromosome)
        possible_improvements = [gen for gen in possible_improvements
                                if chromosome.is_gen_compatible(gen)]
        random.shuffle(possible_improvements)
        while possible_improvements and hilled_count < self.MAX_HILLED:
            hilled_count += 1
            improvement = possible_improvements[0]
            improved_chromosome.append(improvement)
            possible_improvements = [gen for gen in possible_improvements
                                    if gen.is_compatible(improvement)]
        return improved_chromosome

    def create_initial_population(self) -> List[Chromosome]:
        ''' Random initialization '''
        nodes = list(self.graph.vertices)
        population = [Chromosome([gen]) for gen in nodes[:self.POPULATION_SIZE]]
        missing_qt = self.POPULATION_SIZE - len(population)
        if missing_qt:
            random.shuffle(nodes)
            addition = [Chromosome([gen]) for gen in nodes[:missing_qt]]
            population.extend(addition)
        return [self.hill_climb(a) for a in population]

    def select_parents(self, population) -> Tuple[Chromosome, Chromosome]:
        ''' Tournament selection '''
        tournament = random.sample(population, self.TOURNAMENT_SIZE)
        return heapq.nlargest(2, tournament, key=lambda x: x.fitness)

    def __update_fittest(self, fittest: Chromosome):
        if fittest.fitness <= self.fittest.fitness:
            self._unchanged_fittest_count += 1
        else:
            self.fittest = fittest
            self._unchanged_fittest_count = 0
