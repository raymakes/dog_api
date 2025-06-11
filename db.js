// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = process.env.port || 4000;

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const dogRoutes = require('./routes/dogRoutes');

// // Middleware
// app.use(express.json());
// app.use('/api/users', userRoutes);
// app.use('/api/dogs', dogRoutes);

// // Connect to MongoDB
// mongoose
//     .connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log('Error connecting to MongoDB:', err));

// // Basic route test
// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to the API' });
// });

// // Start the server if this file is run directly
// if (require.main === module) {
//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     })
// }

// module.exports = app;