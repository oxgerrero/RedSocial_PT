-- Insertar usuarios de prueba
INSERT INTO users (nombre, apellido, alias, fecha_nacimiento, email, password) VALUES
('Juan', 'Pérez', 'juanp', '1990-01-01', 'juan@example.com', 'hashed_password_juan'),
('Ana', 'Martínez', 'anam', '1992-03-15', 'ana@example.com', 'hashed_password_ana'),
('Carlos', 'Gómez', 'carlosg', '1988-07-20', 'carlos@example.com', 'hashed_password_carlos'),
('Lucía', 'Torres', 'luciat', '1995-11-25', 'lucia@example.com', 'hashed_password_lucia');

-- Insertar publicaciones de prueba
INSERT INTO posts (user_id, contenido, fecha_publicacion) VALUES
(1, '¡Hola mundo desde Juan!', CURRENT_DATE),
(2, 'Ana está disfrutando su día.', CURRENT_DATE),
(3, 'Carlos posteando sobre programación.', CURRENT_DATE),
(4, 'Lucía ama el café y los libros.', CURRENT_DATE);

-- Insertar reacciones de prueba
INSERT INTO reactions (user_id, post_id, type) VALUES
(2, 1, 'love'),
(3, 1, 'like'),
(1, 2, 'laugh'),
(4, 3, 'wow');

-- Insertar comentarios de prueba
INSERT INTO comments (user_id, post_id, content) VALUES
(2, 1, '¡Muy buen post Juan!'),
(3, 2, '¡Me alegra Ana!'),
(1, 3, '¡Qué interesante Carlos!'),
(4, 4, 'Totalmente de acuerdo Lucía.');

-- Insertar reposts de prueba
INSERT INTO reposts (user_id, original_post_id) VALUES
(2, 1),
(3, 2),
(4, 3),
(1, 4);