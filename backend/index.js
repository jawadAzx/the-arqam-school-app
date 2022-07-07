'use-strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const announcementRoutes = require('./routes/announcement-routes');
const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/announcement', announcementRoutes);

app.listen(config.port, () => console.log('App is listening on url http://10.130.10.16:' + config.port));
