DROP TABLE IF EXISTS merchant_products;

CREATE TABLE public.merchant_products (
    mp_id SERIAL PRIMARY KEY NOT NULL,
    mp_name VARCHAR(255),
    mp_color VARCHAR(255),
    mp_usage_frequency VARCHAR(255),
    mp_image_url VARCHAR(255),
    mp_currency VARCHAR(255),
    mp_price NUMERIC(10,2),
    mp_weight_kg NUMERIC(10,1),
    mp_merchant_user_id VARCHAR(255),
    mp_c_id_production INTEGER,
    mp_pc_id INTEGER,
    CONSTRAINT fk_country_production
    FOREIGN KEY(mp_c_id_production) 
    REFERENCES countries(c_id)
    ON DELETE SET NULL,
    CONSTRAINT fk_category
    FOREIGN KEY(mp_pc_id)
    REFERENCES product_categories(pc_id)
    ON DELETE SET NULL
)