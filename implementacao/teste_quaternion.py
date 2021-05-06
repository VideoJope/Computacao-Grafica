from geometria.quaternion import Quaternion

# ---------------------------
# Teste de Quaternion
# ---------------------------

q1 = Quaternion.from_angle(120, [1, 1, 1])
q2 = Quaternion.from_angle(-30, [1, 0, 0])
q3 = q1.multiply(q2)
q3.to_rotation_matrix()
