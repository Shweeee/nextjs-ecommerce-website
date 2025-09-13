# Mini E-commerce Website

A full-stack web application built with **Next.js, React, Node.js, Express, and MongoDB**.  
It allows users to browse products, manage cart items, and make payments securely using **Stripe**.

---

## Features

- Browse and search products
- Add/remove items to/from the cart
- Update item quantities in the cart
- Checkout with Stripe payment integration
- Order history for users
- Responsive design for desktop and mobile devices

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS / Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (if implemented)
- **Payment Gateway:** Stripe
- **Version Control:** Git/GitHub

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shweeee/nextjs-ecommerce-website.git
cd nextjs-ecommerce-website ```bash

### 2. Install Dependencies
bash
Copy code
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
3. Setup Environment Variables
Create a .env file in the backend folder:

env
Copy code
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
Note: Do not commit your .env file to GitHub. Use a .gitignore file to keep it private.

4. Run the Application
bash
Copy code
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
Open your browser and go to http://localhost:3000.

Stripe Integration
Stripe is used for checkout and secure payments.

Use test cards in test mode (e.g., 4242 4242 4242 4242 with any future expiry and CVC).

Webhooks can be configured to listen to payment events locally using the Stripe CLI.

Example webhook endpoint: http://localhost:5000/api/v1/stripe-webhook

Folder Structure
bash
Copy code
frontend/     # React/Next.js frontend
backend/      # Node.js/Express backend
Database Schemas
Product Schema
javascript
Copy code
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  ratings: Number,
  images: Array,
  category: String,
  seller: String,
  stock: Number
}, { collection: 'ecommerce_db' });

module.exports = mongoose.model('Product', productSchema);
Order Schema
javascript
Copy code
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: Array,
  amount: String,
  status: String,
  createdAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
Security
Sensitive data like Stripe keys, passwords, and database URIs are stored in environment variables.

Payment methods are handled securely using Stripe.

No sensitive information is exposed in the frontend or GitHub.
