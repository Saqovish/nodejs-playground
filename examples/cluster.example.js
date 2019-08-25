const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} had died`);
    });
    
    cluster.on('disconnect', function onWorkerDisconnect (worker) {
        let w = cluster.fork(); // replace the dead worker

        console.log('[%s] [master:%s] worker:%s disconnect! new worker:%s fork', new Date(), process.pid, worker.process.pid, w.process.pid);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        throw new Error("Error");
    }).listen(8000)

    console.log(`Worker ${process.pid} started`)
}