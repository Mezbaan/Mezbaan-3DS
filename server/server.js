const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      config        = require("./config"),
      fakeDB        = require("./seed-db"),
      Rental        = require("./models/rental"),
      Venue        = require("./models/venue"),
      path          = require("path");

const venuesRoutes = require("./routes/venues"),
      reservationRoutes = require("./routes/reservations"),
      authRoutes    = require("./routes/auth"),
      fileRoutes    = require("./routes/file-upload");


const url = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URI}`;

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  if (process.env.NODE_ENV != 'production') {
    fakeDB.seed();
  }
});

app.use(bodyParser.json()); // use od body parser to get values from get req

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", fileRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/venues", venuesRoutes);

if (process.env.NODE_ENV == 'production') {
  const appPath = path.join(__dirname, "..", "dist");
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || '3001';

app.listen(PORT, function(){
    console.log("Node server started on port " + PORT);
});

