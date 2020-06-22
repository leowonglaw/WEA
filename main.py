import argparse
from src.sampler import GraphSampler
from src.wea import WEAClique


parser = argparse.ArgumentParser()
parser.add_argument("-d", "--dataset", help="use an .edges dataset")

args = parser.parse_args()

if __name__ == "__main__":
    sampler = GraphSampler()
    if args.dataset:
        sample_graph = sampler.from_data_set(args.dataset)
    else:
        sample_graph = sampler.generate_sample()
    wea = WEAClique(sample_graph)
    wea.run()
