from functools import wraps
from time import time


def timeit(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        end = time()
        elapsed_time = int(end - start)
        print(f'Elapsed time: {elapsed_time}s')
        return result
    return wrapper
