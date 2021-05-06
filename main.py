from geometria.node import Node
from geometria.camera import Camera
from geometria.quaternion import Quaternion

# ---------------------------
# Teste de Camera
# ---------------------------

# 1. Define objetos da cena
box = Node()
box.position = (-6.1, 1.02, -4.24)
box.scale = (2, 2, 4)
box.rotation = (0, 1, 0)

camera = Camera(position=(-6.632, 6.492, 7.812),
                fov=75.14,
                aspect=1.8,
                near=0.38,
                far=250)

# 2. Look At

camera.look_at(-8, 1, -6)

# 3. Calcula matrizes de conversão

model = box.get_model_matrix()
view = camera.get_view_matrix()
projection = camera.get_projection_matrix()

# 4. Define um ponto
point = np.transpose(np.mat([0.5, 0.5, 0.5, 0]))

# 5. Calcula as coordenadas de Tela
point_clip = np.matmul(projection, np.matmul(view, np.matmul(model, point)))
print(point_clip)

# ---------------------------
# Teste de Quaternion
# ---------------------------

q1 = Quaternion.from_angle(120, [1, 1, 1])
q2 = Quaternion.from_angle(-30, [1, 0, 0])
q3 = q1.multiply(q2)
q3.to_rotation_matrix()
