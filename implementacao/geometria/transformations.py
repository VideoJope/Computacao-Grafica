from math import cos, sin, pi
import numpy as np

def scale(x,y,z):
    scale = [[x,0,0,0],
             [0,y,0,0],
             [0,0,z,0],
             [0,0,0,1]]
    return np.mat(scale)

def translation(x,y,z):
    trans = [[1,0,0,x],
             [0,1,0,y],
             [0,0,1,z],
             [0,0,0,1]]
    return np.mat(trans)

def rotationX(x):
    rotX = [[1,      0,       0, 0],
            [0, cos(x), -sin(x), 0],
            [0, sin(x),  cos(x), 0],
            [0,      0,       0, 1]]
    return np.mat(rotX)

def rotationY(y):
    rotY = [[ cos(y), 0,  sin(y), 0],
            [      0, 1,       0, 0],
            [-sin(y), 0,  cos(y), 0],
            [      0, 0,       0, 1]]
    return np.mat(rotY)

def rotationZ(z):
    rotZ = [[cos(z), -sin(z), 0, 0],
            [sin(z),  cos(z), 0, 0],
            [     0,       0, 1, 0],
            [     0,       0, 0, 1]]
    return np.mat(rotZ)

def rotation(x,y,z, order = 'xyz'):
    matrix = {
        'x' : rotationX(x),
        'y' : rotationY(y),
        'z' : rotationZ(z)
    }
    result = matrix[order[0]]
    result = np.matmul(matrix[order[1]], result)
    result = np.matmul(matrix[order[2]], result)
    return result
