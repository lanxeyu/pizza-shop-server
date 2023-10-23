const db = require('../database/connect')

class Order {

    constructor ({ order_id, cart, revenue}) {
        this.id = order_id;
        this.cart = cart;
        this.revenue = revenue
    }


    static async getAll() {
        console.log('model')
        const response = await db.query("SELECT * FROM orders;")
        if (response.rows.length === 0) {
            throw new Error("No orders available.")
        }
        return response.rows.map(r => new Order(r))
    }


    static async create(data) {
        const { cart: cart, revenue: revenue} = data;
    
        const response = await db.query('INSERT INTO orders (cart, revenue) VALUES ($1, $2) RETURNING *;', [cart, revenue]);
    
        return new Order(response.rows[0]);
    }
}

module.exports = Order;