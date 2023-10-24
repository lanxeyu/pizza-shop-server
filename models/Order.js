const db = require('../database/connect')

class Order {
    constructor({ order_id, order_number, revenue, notes, order_received, order_received_timestamp, order_pickedup, order_delivered, order_delivered_timestamp, order_pickedup_timestamp, order_claimed, order_claimed_timestamp}) {
        this.order_id = order_id;
        this.order_number = order_number;
        this.revenue = revenue;
        this.notes = notes;
        this.order_received = order_received;
        this.order_received_timestamp = order_received_timestamp;
        this.order_pickedup = order_pickedup;
        this.order_pickedup_timestamp = order_pickedup_timestamp;
        this.order_delivered = order_delivered;
        this.order_delivered_timestamp = order_delivered_timestamp;
        this.order_claimed = order_claimed;
        this.order_claimed_timestamp = order_claimed_timestamp; 
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM orders;");
        if (response.rows.length === 0) {
            throw new Error("No orders available.");
        }
        return response.rows.map(r => new Order(r));
    }
    

    static async findById(order_id) {
        const response = await db.query("SELECT * FROM orders WHERE order_id = $1", [order_id])

        if (response.rows.length !=1) {
            throw new Error('Unable to find that order.')
        }
        return new Order(response.rows[0])
    }
    

    async updateOrderDelivered(data) {
        const response = await db.query("UPDATE orders SET order_delivered = $1 WHERE order_id = $2 RETURNING *", [data.order_delivered, this.order_id])

        if (response.rows.length != 1) {
            throw new Error('Unable to update order')
        }
        return new Order(response.rows[0])
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