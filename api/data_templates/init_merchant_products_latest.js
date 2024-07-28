const template = `
INSERT INTO merchant_products(mp_name, mp_color, mp_usage_frequency, mp_image_url, mp_currency, mp_price, mp_weight_kg, mp_merchant_user_id, mp_c_id_production, mp_pc_id) VALUES
-- Electronics
('Smartphone', '#000000', 'Daily', 'https://picsum.photos/seed/1/200/300', 'EUR', 699.99, 0.2, $1, 101, 1),
('Laptop', '#FFFFFF', 'Daily', 'https://picsum.photos/seed/2/200/300', 'EUR', 1299.99, 1.5, $1, 102, 1),
('Tablet', '#FF5733', 'Daily', 'https://picsum.photos/seed/3/200/300', 'EUR', 499.99, 0.5, $1, 103, 1),
('Smartwatch', '#C70039', 'Daily', 'https://picsum.photos/seed/4/200/300', 'EUR', 199.99, 0.1, $1, 104, 1),
('Headphones', '#900C3F', 'Daily', 'https://picsum.photos/seed/5/200/300', 'EUR', 149.99, 0.3, $1, 105, 1),
('Camera', '#581845', 'Weekly', 'https://picsum.photos/seed/6/200/300', 'EUR', 899.99, 1.2, $1, 106, 1),
('Gaming Console', '#FFC300', 'Weekly', 'https://picsum.photos/seed/7/200/300', 'EUR', 499.99, 3.0, $1, 107, 1),
('Bluetooth Speaker', '#FF5733', 'Monthly', 'https://picsum.photos/seed/8/200/300', 'EUR', 79.99, 0.8, $1, 108, 1),
('Drone', '#C70039', 'Seldom', 'https://picsum.photos/seed/9/200/300', 'EUR', 999.99, 1.5, $1, 109, 1),
('External Hard Drive', '#900C3F', 'Monthly', 'https://picsum.photos/seed/10/200/300', 'EUR', 129.99, 0.4, $1, 110, 1),

-- Furniture
('Sofa', '#581845', 'Yearly', 'https://picsum.photos/seed/11/200/300', 'EUR', 799.99, 50.0, $1, 111, 2),
('Dining Table', '#FFC300', 'Yearly', 'https://picsum.photos/seed/12/200/300', 'EUR', 599.99, 70.0, $1, 112, 2),
('Bed Frame', '#FF5733', 'Yearly', 'https://picsum.photos/seed/13/200/300', 'EUR', 499.99, 80.0, $1, 113, 2),
('Office Chair', '#C70039', 'Yearly', 'https://picsum.photos/seed/14/200/300', 'EUR', 199.99, 15.0, $1, 114, 2),
('Bookshelf', '#900C3F', 'Yearly', 'https://picsum.photos/seed/15/200/300', 'EUR', 149.99, 20.0, $1, 115, 2),
('Coffee Table', '#581845', 'Yearly', 'https://picsum.photos/seed/16/200/300', 'EUR', 99.99, 25.0, $1, 116, 2),
('Wardrobe', '#FFC300', 'Yearly', 'https://picsum.photos/seed/17/200/300', 'EUR', 699.99, 90.0, $1, 117, 2),
('TV Stand', '#FF5733', 'Yearly', 'https://picsum.photos/seed/18/200/300', 'EUR', 149.99, 30.0, $1, 118, 2),
('Recliner', '#C70039', 'Yearly', 'https://picsum.photos/seed/19/200/300', 'EUR', 399.99, 45.0, $1, 119, 2),
('Dresser', '#900C3F', 'Yearly', 'https://picsum.photos/seed/20/200/300', 'EUR', 299.99, 40.0, $1, 120, 2),

-- Clothing
('T-shirt', '#581845', 'Weekly', 'https://picsum.photos/seed/21/200/300', 'EUR', 19.99, 0.2, $1, 121, 3),
('Jeans', '#FFC300', 'Weekly', 'https://picsum.photos/seed/22/200/300', 'EUR', 49.99, 0.6, $1, 122, 3),
('Jacket', '#FF5733', 'Monthly', 'https://picsum.photos/seed/23/200/300', 'EUR', 89.99, 1.0, $1, 123, 3),
('Sneakers', '#C70039', 'Weekly', 'https://picsum.photos/seed/24/200/300', 'EUR', 79.99, 1.2, $1, 124, 3),
('Sweater', '#900C3F', 'Monthly', 'https://picsum.photos/seed/25/200/300', 'EUR', 39.99, 0.8, $1, 125, 3),
('Dress', '#581845', 'Monthly', 'https://picsum.photos/seed/26/200/300', 'EUR', 59.99, 0.5, $1, 126, 3),
('Hat', '#FFC300', 'Seldom', 'https://picsum.photos/seed/27/200/300', 'EUR', 19.99, 0.3, $1, 127, 3),
('Scarf', '#FF5733', 'Seldom', 'https://picsum.photos/seed/28/200/300', 'EUR', 14.99, 0.2, $1, 128, 3),
('Belt', '#C70039', 'Seldom', 'https://picsum.photos/seed/29/200/300', 'EUR', 24.99, 0.3, $1, 129, 3),
('Socks', '#900C3F', 'Weekly', 'https://picsum.photos/seed/30/200/300', 'EUR', 9.99, 0.1, $1, 130, 3),

-- Books
('Fiction Book', '#581845', 'Monthly', 'https://picsum.photos/seed/31/200/300', 'EUR', 14.99, 0.5, $1, 131, 4),
('Non-fiction Book', '#FFC300', 'Monthly', 'https://picsum.photos/seed/32/200/300', 'EUR', 19.99, 0.6, $1, 132, 4),
('Children\'s Book', '#FF5733', 'Monthly', 'https://picsum.photos/seed/33/200/300', 'EUR', 9.99, 0.4, $1, 133, 4),
('Cookbook', '#C70039', 'Seldom', 'https://picsum.photos/seed/34/200/300', 'EUR', 24.99, 0.8, $1, 134, 4),
('Travel Guide', '#900C3F', 'Seldom', 'https://picsum.photos/seed/35/200/300', 'EUR', 29.99, 0.7, $1, 135, 4),
('Biography', '#581845', 'Monthly', 'https://picsum.photos/seed/36/200/300', 'EUR', 19.99, 0.6, $1, 136, 4),
('Graphic Novel', '#FFC300', 'Monthly', 'https://picsum.photos/seed/37/200/300', 'EUR', 12.99, 0.5, $1, 137, 4),
('Textbook', '#FF5733', 'Yearly', 'https://picsum.photos/seed/38/200/300', 'EUR', 79.99, 1.5, $1, 138, 4),
('Science Fiction Book', '#C70039', 'Monthly', 'https://picsum.photos/seed/39/200/300', 'EUR', 15.99, 0.5, $1, 139, 4),

-- Sports
('Football', '#006400', 'Weekly', 'https://picsum.photos/seed/40/200/300', 'EUR', 25.99, 0.45, $1, 201, 5),
('Basketball', '#FF4500', 'Weekly', 'https://picsum.photos/seed/41/200/300', 'EUR', 29.99, 0.62, $1, 202, 5),
('Tennis Racket', '#FFD700', 'Monthly', 'https://picsum.photos/seed/42/200/300', 'EUR', 89.99, 0.3, $1, 203, 5),
('Golf Clubs', '#008000', 'Yearly', 'https://picsum.photos/seed/43/200/300', 'EUR', 299.99, 10.0, $1, 204, 5),
('Yoga Mat', '#800080', 'Daily', 'https://picsum.photos/seed/44/200/300', 'EUR', 19.99, 1.0, $1, 205, 5),
('Running Shoes', '#000080', 'Weekly', 'https://picsum.photos/seed/45/200/300', 'EUR', 99.99, 0.8, $1, 206, 5),
('Baseball Glove', '#8B4513', 'Monthly', 'https://picsum.photos/seed/46/200/300', 'EUR', 49.99, 0.5, $1, 207, 5),
('Swimming Goggles', '#4682B4', 'Weekly', 'https://picsum.photos/seed/47/200/300', 'EUR', 14.99, 0.2, $1, 208, 5),
('Cycling Helmet', '#B22222', 'Yearly', 'https://picsum.photos/seed/48/200/300', 'EUR', 59.99, 0.4, $1, 209, 5),
('Fitness Tracker', '#000000', 'Daily', 'https://picsum.photos/seed/49/200/300', 'EUR', 129.99, 0.1, $1, 210, 5),

-- Toys
('Action Figure', '#FF69B4', 'Monthly', 'https://picsum.photos/seed/50/200/300', 'EUR', 15.99, 0.3, $1, 211, 6),
('Doll', '#FFB6C1', 'Monthly', 'https://picsum.photos/seed/51/200/300', 'EUR', 19.99, 0.4, $1, 212, 6),
('Puzzle', '#8A2BE2', 'Weekly', 'https://picsum.photos/seed/52/200/300', 'EUR', 12.99, 0.5, $1, 213, 6),
('Board Game', '#D2691E', 'Monthly', 'https://picsum.photos/seed/53/200/300', 'EUR', 29.99, 1.2, $1, 214, 6),
('Toy Car', '#1E90FF', 'Seldom', 'https://picsum.photos/seed/54/200/300', 'EUR', 9.99, 0.2, $1, 215, 6),
('Building Blocks', '#FFD700', 'Weekly', 'https://picsum.photos/seed/55/200/300', 'EUR', 24.99, 1.5, $1, 216, 6),
('Stuffed Animal', '#FFC0CB', 'Monthly', 'https://picsum.photos/seed/56/200/300', 'EUR', 14.99, 0.4, $1, 217, 6),
('Toy Train Set', '#000080', 'Yearly', 'https://picsum.photos/seed/57/200/300', 'EUR', 39.99, 2.0, $1, 218, 6),
('Remote Control Car', '#DC143C', 'Monthly', 'https://picsum.photos/seed/58/200/300', 'EUR', 49.99, 1.0, $1, 219, 6),
('Lego Set', '#FF4500', 'Monthly', 'https://picsum.photos/seed/59/200/300', 'EUR', 59.99, 2.5, $1, 220, 6),

-- Groceries
('Milk', '#FFFFFF', 'Daily', 'https://picsum.photos/seed/60/200/300', 'EUR', 0.99, 1.0, $1, 221, 7),
('Bread', '#F5DEB3', 'Daily', 'https://picsum.photos/seed/61/200/300', 'EUR', 1.99, 0.5, $1, 222, 7),
('Eggs', '#FFFACD', 'Daily', 'https://picsum.photos/seed/62/200/300', 'EUR', 2.99, 0.7, $1, 223, 7),
('Cheese', '#FFD700', 'Weekly', 'https://picsum.photos/seed/63/200/300', 'EUR', 4.99, 0.5, $1, 224, 7),
('Chicken Breast', '#FF6347', 'Weekly', 'https://picsum.photos/seed/64/200/300', 'EUR', 6.99, 1.0, $1, 225, 7),
('Apples', '#FF0000', 'Weekly', 'https://picsum.photos/seed/65/200/300', 'EUR', 3.99, 1.5, $1, 226, 7),
('Bananas', '#FFFF00', 'Weekly', 'https://picsum.photos/seed/66/200/300', 'EUR', 2.49, 1.2, $1, 227, 7),
('Orange Juice', '#FFA500', 'Daily', 'https://picsum.photos/seed/67/200/300', 'EUR', 2.99, 1.0, $1, 228, 7),
('Cereal', '#DAA520', 'Daily', 'https://picsum.photos/seed/68/200/300', 'EUR', 3.99, 0.8, $1, 229, 7),
('Coffee', '#6F4E37', 'Daily', 'https://picsum.photos/seed/69/200/300', 'EUR', 4.99, 0.5, $1, 230, 7),

-- Automotive
('Car Battery', '#000000', 'Yearly', 'https://picsum.photos/seed/70/200/300', 'EUR', 79.99, 10.0, $1, 231, 8),
('Tire', '#2F4F4F', 'Yearly', 'https://picsum.photos/seed/71/200/300', 'EUR', 99.99, 12.0, $1, 232, 8),
('Engine Oil', '#8B4513', 'Monthly', 'https://picsum.photos/seed/72/200/300', 'EUR', 29.99, 5.0, $1, 233, 8),
('Brake Pads', '#A52A2A', 'Yearly', 'https://picsum.photos/seed/73/200/300', 'EUR', 49.99, 3.0, $1, 234, 8),
('Car Wash Soap', '#1E90FF', 'Monthly', 'https://picsum.photos/seed/74/200/300', 'EUR', 9.99, 2.0, $1, 235, 8),
('Windshield Wipers', '#00CED1', 'Yearly', 'https://picsum.photos/seed/75/200/300', 'EUR', 19.99, 1.0, $1, 236, 8),
('Spark Plugs', '#DC143C', 'Yearly', 'https://picsum.photos/seed/76/200/300', 'EUR', 29.99, 0.2, $1, 237, 8),
('Car Air Freshener', '#FF4500', 'Monthly', 'https://picsum.photos/seed/77/200/300', 'EUR', 4.99, 0.1, $1, 238, 8),
('Car Wax', '#FFFF00', 'Monthly', 'https://picsum.photos/seed/78/200/300', 'EUR', 14.99, 1.0, $1, 239, 8),

-- Health & Beauty
('Shampoo', '#FFB6C1', 'Daily', 'https://picsum.photos/seed/80/200/300', 'EUR', 5.99, 0.5, $1, 301, 9),
('Conditioner', '#FFE4E1', 'Daily', 'https://picsum.photos/seed/81/200/300', 'EUR', 6.49, 0.5, $1, 302, 9),
('Toothpaste', '#FFFFFF', 'Daily', 'https://picsum.photos/seed/82/200/300', 'EUR', 2.99, 0.2, $1, 303, 9),
('Body Lotion', '#FFDAB9', 'Daily', 'https://picsum.photos/seed/83/200/300', 'EUR', 8.99, 0.4, $1, 304, 9),
('Face Cream', '#FAFAD2', 'Daily', 'https://picsum.photos/seed/84/200/300', 'EUR', 12.99, 0.3, $1, 305, 9),
('Sunscreen', '#FFFACD', 'Weekly', 'https://picsum.photos/seed/85/200/300', 'EUR', 9.99, 0.3, $1, 306, 9),
('Perfume', '#FF69B4', 'Occasionally', 'https://picsum.photos/seed/86/200/300', 'EUR', 49.99, 0.2, $1, 307, 9),
('Lipstick', '#FF6347', 'Daily', 'https://picsum.photos/seed/87/200/300', 'EUR', 14.99, 0.1, $1, 308, 9),
('Hair Dryer', '#FF4500', 'Monthly', 'https://picsum.photos/seed/88/200/300', 'EUR', 29.99, 1.0, $1, 309, 9),
('Electric Toothbrush', '#FF1493', 'Daily', 'https://picsum.photos/seed/89/200/300', 'EUR', 39.99, 0.3, $1, 310, 9),

-- Home & Kitchen
('Blender', '#8A2BE2', 'Weekly', 'https://picsum.photos/seed/90/200/300', 'EUR', 49.99, 2.0, $1, 311, 10),
('Coffee Maker', '#A52A2A', 'Daily', 'https://picsum.photos/seed/91/200/300', 'EUR', 59.99, 3.0, $1, 312, 10),
('Microwave Oven', '#DAA520', 'Daily', 'https://picsum.photos/seed/92/200/300', 'EUR', 89.99, 10.0, $1, 313, 10),
('Toaster', '#B22222', 'Daily', 'https://picsum.photos/seed/93/200/300', 'EUR', 24.99, 2.0, $1, 314, 10),
('Dishwasher', '#FF4500', 'Weekly', 'https://picsum.photos/seed/94/200/300', 'EUR', 399.99, 30.0, $1, 315, 10),
('Vacuum Cleaner', '#8B4513', 'Weekly', 'https://picsum.photos/seed/95/200/300', 'EUR', 149.99, 8.0, $1, 316, 10),
('Air Purifier', '#00CED1', 'Daily', 'https://picsum.photos/seed/96/200/300', 'EUR', 199.99, 5.0, $1, 317, 10),
('Iron', '#2F4F4F', 'Weekly', 'https://picsum.photos/seed/97/200/300', 'EUR', 29.99, 1.5, $1, 318, 10),
('Refrigerator', '#4682B4', 'Daily', 'https://picsum.photos/seed/98/200/300', 'EUR', 799.99, 50.0, $1, 319, 10),
('Washing Machine', '#5F9EA0', 'Weekly', 'https://picsum.photos/seed/99/200/300', 'EUR', 499.99, 60.0, $1, 320, 10)
RETURNING *;`

module.exports = template;