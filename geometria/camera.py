import numpy as np
from math import cos, sin, tan, pi

class Camera:

    def __init__(self, position=(0,0,0), fov=90, aspect=1.8, near=0.38, far=250):
        self.position = position
        self.set_fov_in_degrees(fov)            # Conversão para Radianos
        self.aspect = aspect
        self.near = near
        self.far = far
        self.r = 0
        self.l = 0
        self.t = 0
        self.b = 0

        self.look_at(1,0,0)                     # Look At inicial (inicialização)
    
    def set_fov_in_degrees(self, fov):
        self.fov = (fov/180)*pi
    
    def look_at(self, x,y,z):
        cam_pos = list(self.position)
        target_pos = [x,y,z]

        fr = np.array(cam_pos)
        to = np.array(target_pos)

        dist = fr-to
        fwd = dist/np.linalg.norm(dist)         # Descobre Forward

        tmp = [0,1,0]

        tmp = np.cross(tmp, fwd)
        right = tmp/np.linalg.norm(tmp)         # Descobre Right
        
        up = np.cross(fwd, right)               # Descobre Up

        self.fwd = fwd
        self.up = up
        self.right = right
    
    def get_view_matrix(self):
        fwd, up, right = self.fwd, self.up, self.right
        pos = np.array(list(self.position))
        
        view = np.mat([right, up, fwd, pos])            # Compoe a matriz usando fwd, up, right e pos
        view = np.transpose(view)
        view = np.vstack([view, [0,0,0,1]])
        
        view = np.linalg.inv(view)                      # Calcula a inversa
        view = np.mat(view).round(3)
        return view

    def update_projection_values(self):
        self.t = tan(self.fov/2) * self.near
        self.h = 2 * self.t
        self.w = self.h * self.aspect
        self.r = self.w/2
        self.l = -self.r
        self.b = -self.t

    def get_projection_matrix(self):
        self.update_projection_values()
        
        a = 2 * self.near / (self.r-self.l)
        b = (self.r+self.l)/(self.r-self.l)
        c = 2 * self.near / (self.t-self.b)
        d = (self.t+self.b)/(self.t-self.b)
        e = -(self.far+self.near)/(self.far-self.near)
        f = -(2 * self.far* self.near)/(self.far-self.near)
        projection = [[a, 0,  b, 0],
                    [0, c,  d, 0],
                    [0, 0,  e, f],
                    [0, 0, -1, 0]]
        return np.mat(projection).round(3)
