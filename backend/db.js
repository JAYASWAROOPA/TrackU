const mongoose = require('mongoose');

const uri = 'mongodb+srv://jayaswaroopaec23_db_user:Jayamom22@campuscluster.yy3bg2n.mongodb.net/TrackUDB?retryWrites=true&w=majority&appName=CampusCluster';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
