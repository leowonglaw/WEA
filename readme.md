# WEA-Clique

An adaption of the [*Wong Evolutionary Algorithm* (WEA)](http://repositorio.ulima.edu.pe/handle/ulima/8723) for the maximum clique problem.
It results to be a simple but slow genetic algorithm based on feasibility maintenance.

## Getting Started
- Download from the repository
- See prerequisites
- Follow the instalation
- See running

### Prerequisites

- Oficial Python (CPython == 3.7, **MUST**) and PIP
- OS: Linux, Mac, Windows

### Instalation

Install the dependencies with pip

```
pip install -r requirements.txt
```

### Downloading a dataset
Optionally download any `.edges` dataset:
- Download the dataset form http://snap.stanford.edu/data/index.html
- Extract and copy the dataset to `data/input`

## Running

Add additional notes about how to deploy this on a live system

```
python main.py
```

Using a downloaded `.edges` dataset:
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
| **Stop condition**    | Unchange fitness and maximum iteration based. |
| **Fitness function**  | Clique size. |

## Performance
Uncompared, but it may be very slow
