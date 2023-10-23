const db = require('../database/connect')

class Order {
    constructor({ order_id, order_number, cart, revenue, notes}) {
        this.id = order_id;
        this.order_number = order_number;
        this.cart = cart;
        this.revenue = revenue;
        this.notes = notes;
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM orders;")
        if (response.rows.length === 0) {
            throw new Error("No orders available.")
        }
        return response.rows.map(r => new Order(r))
    }


    static async create(orderData) {
        const { order_number, revenue, notes, cart } = orderData;

        try {
        await db.query('BEGIN');
        
        // Orders table query
        const orderQuery = await db.query(
            'INSERT INTO orders (order_number, revenue, notes) VALUES ($1, $2, $3) RETURNING order_id;',
            [order_number, revenue, notes]
        );

        const { order_id } = orderQuery.rows[0];

        // Pizzas table query
        for (const pizza of cart) {
            const { size, toppings } = pizza;

            const pizzaQuery = await db.query(
                'INSERT INTO pizzas (order_id, size) VALUES ($1, $2) RETURNING pizza_id;',
                [order_id, size]
            );

            const { pizza_id } = pizzaQuery.rows[0];


            // Toppings table query
            for (const toppingName of toppings) {
                await db.query(
                    'INSERT INTO toppings (order_id, pizza_id, topping_name) VALUES ($1, $2, $3);',
                    [order_id, pizza_id, toppingName]
                );
            }
        }

        await db.query('COMMIT');

        return new Order({ order_id, order_number, cart, revenue, notes });
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        }
    }
}

module.exports = Order;