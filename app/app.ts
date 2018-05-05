import * as express from 'express'
import * as bodyParser from 'body-parser'
import {Api} from '../api/api'

export class App {
  app: express.Application
  apiRoutes:Api
  constructor() {
    this.apiRoutes = new Api();
    this.app = express();
    this.middleWare(this.app)
    this.mountRoutes(this.app)
  }

    mountRoutes(app) {
    app.use('/api', this.apiRoutes.apiRoutes());
    }

    middleWare(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  }

}