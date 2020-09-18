import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";

import Mainroute from "./routes";


createConnection().then( connection => {

    // create express app
    const app = express();

    //body-parser
    app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:false}));


    // register express routes from defined application routes
    app.use('/api', Mainroute);

    
    // start express server
    const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
  });

    

    console.log("Database is Up and running");

}).catch(error => console.log(error));
