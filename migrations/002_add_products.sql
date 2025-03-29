CREATE TABLE products_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INT NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES products_categories(id)
);