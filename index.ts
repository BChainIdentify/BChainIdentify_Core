import { App } from './app/app';
require('http').globalAgent.maxSockets = 5

process.on('uncaughtException', function(err){
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  console.log("in process.on(unhandledRejection)")
});

const app = new App().app;

const port = 3003

app.listen(port,'localhost',(err) => {  
  if (err) {
    return console.log(err)
  }
  return console.log(`server is listening on ${port}`)
})