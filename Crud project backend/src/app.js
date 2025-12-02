const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const postsRoutes = require('./api/routes/post');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '500mb' })); 
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());
// Important: MongoDB connection string
const uri = 'mongodb+srv://lelongleader_db_user:15092003@cluster0.gbtf1zx.mongodb.net/posts?appName=Cluster0';
mongoose.connect(uri)
  .then(() => console.log("Connection Succeeded"))
  .catch(err => console.error("Connection Error", err));
app.use('/posts', postsRoutes);

app.listen(process.env.PORT || 8081);