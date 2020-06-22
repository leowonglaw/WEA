import os
from pathlib import Path


# absolute directory where main.py is located
BASE_PATH = Path(__file__).resolve().parents[0]

DATA_INPUT_PATH = BASE_PATH.joinpath('data/input')
