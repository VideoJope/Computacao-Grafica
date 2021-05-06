from transformations import scale, translation, rotation
import numpy as numpy

class Node:
    
    def __init__(self):
        self.parent = None
        self.position = (0,0,0)
        self.scale = (0,0,0)
        self.rotation = (0,0,0)

    def get_model_matrix(self):
        #if self.parent != None:
        #    parent_model = self.parent.get_model_matrix()
        #else:
        #    parent_model = np.identity(4)

        s_x, s_y, s_z = self.scale
        t_x, t_y, t_z = self.position
        r_x, r_y, r_z = self.rotation

        s = scale(s_x, s_y, s_z)                # Retorna matriz de Escalonamento
        t = translation(t_x, t_y, t_z)          # Retorna matriz de Translação
        r = rotation(r_x, r_y, r_z)             # Retorna matriz de Rotação

        model = np.matmul(r, s)                 # R * S
        model = np.matmul(t, model).round(3)    # T * R * S

        #return np.matmul(model, parent_model)
        return model
