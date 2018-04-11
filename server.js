var cluster = require('cluster');
var Cobuild = require('cobuild2')


if (cluster.isMaster) {

    //Bootstrap the database and any other initialization    
    var db = require('./app/init/db');
    
    // Count the machine's CPUs
    var cpuCount = 1 // require('os').cpus().length;
    var workerIds = [];
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
      var worker = cluster.fork();
      workerIds[worker.id] = worker.id;
      
    }

    cluster.on('exit', function (worker) {
        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker %d died :(', worker.id);
        delete workerIds[worker.id];
        var worker = cluster.fork();
        workerIds[worker.id] = worker.id;
    });


} else {
  // Code to run if we're in a worker process 
   
  
  var expressInitializer = require('./app/init/express');
  expressInitializer();

  process.on('message', function(message){

    switch(message.type){
      
      case 'shutdown':
        process.exit(0);
      break;
      default:
        break;
    }
    
  });

  
}
