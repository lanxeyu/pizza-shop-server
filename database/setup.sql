DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    order_id INT GENERATED ALWAYS AS IDENTITY,
    cart VARCHAR(50) NOT NULL,
    revenue DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id)
);

INSERT INTO orders 
	(cart, revenue)
VALUES
    ('Cart A', 17.99),
    ('Cart B', 23.99)
