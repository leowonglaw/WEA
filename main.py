import argparse
import src.loader as loader
from src.wea import WEAClique


parser = argparse.ArgumentParser()
parser.add_argument("-d", "--dataset", help="use an .edges dataset")

args = parser.parse_args()

if __name__ == "__main__":
    if args.dataset:
        sample_graph = loader.load_from_relative_path(args.dataset)
    else:
        sample_graph = loader.generate_sample()
    wea = WEAClique(sample_graph)
    wea.run()
