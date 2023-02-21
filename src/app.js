const express = require("express");
const cors = require('cors');

class App {
    constructor() {
        
        this.app = express();

        // this.middleware();

        /* body parsing */
        this.bodyParsing();
        
        this.cors();

        /* router */
        this.getRouting();

        /* 404 error */
        this.status404();

        /* error handling */
        this.errorHandler();
    }

    middleware() {
        /* Add your middleware */
    }

    cors() {
        const corsOptions = ({
            origin: "*",
            credentials: true,
        });
        this.app.use(cors(corsOptions));
    }
    
    bodyParsing() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    getRouting() {
        this.app.use(require("./routes"));
    }

    status404() {
        this.app.use((req, res, _) => {
            res.status(404).send("Error Code 400");
        });
    }

    errorHandler() {
        this.app.use((errreq, res, _) => {
            res.status(500).send("Error Code 400");
        });
    }
}

module.exports = new App().app;