# WEA-Clique

An adaption of the [*Wong Evolutionary Algorithm* (WEA)](https://hdl.handle.net/20.500.12724/8723) for the maximum clique problem.
It results to be a simple genetic algorithm based on feasibility maintenance.

## Getting Started
- Download from the repository
- See prerequisites
- Follow the installation
- See running

### Prerequisites

- Official Python (CPython == 3.7, **MUST** for the snap-stanford package) and PIP
- OS: Linux, Mac, Windows

### Installation

Install the dependencies with pip

```
pip install -r requirements.txt
```

### Downloading a dataset
Optionally download any `.edges` or `.mtx` dataset:
- Download the dataset form http://snap.stanford.edu/data/index.html or https://networkrepository.com/dimacs.php
- Extract and copy the dataset to `data/input`

## Running

Add additional notes about how to deploy this on a live system

```
python main.py
```

Using a downloaded dataset:
```
python main.py --dataset=facebook/0.edges
```
**Note**: It's already indexed to `data/input`. You may need to change the WEAClique settings.

## Algorithm settings

| Option                | Description |
| --------------------- | ----------- |
| **Genotype**          | List of nodes of dynamic size. This forms a feasible clique. |
| **Crossover**         | Modified uniform crossover for feasible maintenance. |
| **Mutation**          | Modified random resetting for feasible maintenance. |
| **Life time adaption**| Lamarckian Model. |
| **Hill-Climbing**     | Stochastic local search. |
| **Parent selection**  | Tournament selection. |
| **Populational replacement**  | Generational replacement model. |
| **Stop condition**    | Unchanged fitness and maximum iteration based. |
| **Fitness function**  | Clique size. |

## Performance
Uncompared
