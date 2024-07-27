DROP TABLE IF EXISTS product_categories;

CREATE TABLE public.product_categories (
    pc_id SERIAL PRIMARY KEY,
    pc_category_name VARCHAR(255) NOT NULL
);

INSERT INTO product_categories (pc_category_name) VALUES
('Electronics'),
('Furniture'),
('Clothing'),
('Books'),
('Sports'),
('Toys'),
('Groceries'),
('Automotive'),
('Health & Beauty'),
('Home & Kitchen');
