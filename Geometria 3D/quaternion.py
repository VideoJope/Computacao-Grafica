import numpy as np
import random
from math import cos, sin, pi

class Quaternion:
    def __init__(self, w, x, y, z):
        self.w = w 
        self.x = x 
        self.y = y 
        self.z = z
        
    @classmethod
    def from_angle(self, angle, axis):
        angle = pi*(angle/180)
        axis = np.array(axis)
        x, y, z = axis/np.linalg.norm(axis)
        
        w = cos(angle/2)
        x = sin(angle/2)*x
        y = sin(angle/2)*y
        z = sin(angle/2)*z

        return Quaternion(w, x, y, z)

    def to_list(self):
        return [self.w, self.x, self.y, self.z]

    def multiply(self, other):
        w0, x0, y0, z0 = self.w, self.x, self.y, self.z
        w1, x1, y1, z1 = other.to_list()

        Q0Q1_w = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1
        Q0Q1_x = w0 * x1 + x0 * w1 + y0 * z1 - z0 * y1
        Q0Q1_y = w0 * y1 - x0 * z1 + y0 * w1 + z0 * x1
        Q0Q1_z = w0 * z1 + x0 * y1 - y0 * x1 + z0 * w1
        
        return Quaternion(Q0Q1_w, Q0Q1_x, Q0Q1_y, Q0Q1_z)

    def to_rotation_matrix(self):
        a1, a2, a3, a4 = self.to_list()
        return np.mat([[1 - 2*a3**2 - 2*a4**2,     2*a2*a3 - 2*a4*a1,     2*a2*a4 + 2*a3*a1, 0], 
                       [    2*a2*a3 + 2*a4*a1, 1 - 2*a2**2 - 2*a4**2,     2*a3*a4 - 2*a2*a1, 0],
                       [    2*a2*a4 - 2*a3*a1,     2*a3*a4 + 2*a2*a1, 1 - 2*a2**2 - 2*a3**2, 0],
                       [                    0,                     0,                     0, 1]])

    def __repr__(self):
        return "({},{},{},{})".format(self.w, self.x, self.y, self.z)
