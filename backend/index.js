


const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

const products = require('./routes/product');
const orders = require('./routes/order');
const payment = require('./routes/payment');
connectDatabase();
const webhookRoute = require('./routes/webhook');
app.use(cors());

app.use(express.json());


// Stripe webhook endpoint must be before bodyParser middleware for raw body
app.use('/api/v1', webhookRoute);

app.use('/api/v1/', payment);
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

/*
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend',  'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
    });
}*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


/*
app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});
*/