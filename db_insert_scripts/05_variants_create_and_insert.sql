DROP TABLE IF EXISTS product_variants;

CREATE TABLE public.product_variants (
    pv_id SERIAL PRIMARY KEY,
    pv_pc_id INTEGER REFERENCES product_categories(pc_id) ON DELETE CASCADE,
    pv_variant_name VARCHAR(255) NOT NULL
);

INSERT INTO product_variants (pv_pc_id, pv_variant_name) VALUES
-- Electronics
(1, 'Wired'),
(1, 'Bluetooth'),

-- Furniture
(2, 'Wooden'),
(2, 'Metal'),
(2, 'Plastic'),

-- Clothing
(3, 'Small'),
(3, 'Medium'),
(3, 'Large'),
(3, 'X-Large'),

-- Books
(4, 'Hardcover'),
(4, 'Paperback'),
(4, 'E-book'),

-- Sports
(5, 'Small'),
(5, 'Medium'),
(5, 'Large'),

-- Toys
(6, 'Red'),
(6, 'Blue'),
(6, 'Green'),

-- Groceries
(7, '500g'),
(7, '1kg'),
(7, '2kg'),

-- Automotive
(8, 'Pack of 2'),
(8, 'Pack of 4'),
(8, 'Pack of 6'),

-- Health & Beauty
(9, '100ml'),
(9, '200ml'),
(9, '500ml'),

-- Home & Kitchen
(10, 'Single'),
(10, 'Set of 3'),
(10, 'Set of 5');
