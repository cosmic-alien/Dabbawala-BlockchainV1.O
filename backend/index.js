const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { web3, contract, account } = require('./contract');

const app = express();
const PORT = 5000; // You can change the port if needed

// Middlewares
app.use(cors());
app.use(bodyParser.json());

const providerRoutes = require('./routes/provider');
app.use('/api', providerRoutes);

const collectorRoutes = require('./routes/collector');
app.use('/api', collectorRoutes);

const residentialRoutes = require('./routes/residentialSorter');
app.use('/api', residentialRoutes);

const transporterRoutes = require('./routes/transporter');
app.use('/api', transporterRoutes);

const destinationRoutes = require('./routes/destinationSorter');
app.use('/api', destinationRoutes);

const distributorRoutes = require('./routes/distributor');
app.use('/api', distributorRoutes);

const customerRoutes = require('./routes/customer');
app.use('/api', customerRoutes);

const qrRoutes = require('./routes/qr');
app.use('/api', qrRoutes);

const trackRoutes = require('./routes/track');
app.use('/api', trackRoutes);


// Health check route
app.get('/', (req, res) => {
  res.send('✅ Dabba Blockchain Backend is Running!');
});

// Test connection to blockchain + account
app.get('/status', async (req, res) => {
  try {
    const balance = await web3.eth.getBalance(account.address);
    res.json({
      address: account.address,
      balanceInEth: web3.utils.fromWei(balance, 'ether'),
      network: await web3.eth.net.getNetworkType()
    });
  } catch (error) {
    console.error('Error in /status:', error);
    res.status(500).send('Blockchain connection failed.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server started on http://localhost:${PORT}`);
});
