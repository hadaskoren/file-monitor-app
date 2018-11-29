const express = require('express');
const bodyParser = require('body-parser');
// communications between ports
const cors = require('cors');
const db = require('./database');
const PORT = process.env.PORT || 3128;
const app = express();
let logs = [];
var watcher;
var chokidar = require('chokidar');
var path = require('path');

app.use(cors ({
    origin:true,
    credentials: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, function(){
    console.log(`App running on localhost:${PORT}`);
});

app.post('/login', (req, res) => {
    db.validateCredentials([req.body.username, req.body.password]).then((users) => {
        res.json({
            message: users
        })
    }).catch((err) => {
        console.error(err);
        res.status(500).json({message: err.message});
    })
});

app.post('/logout', (req, res) => {
    logs = [];
    res.json({})
    .catch((err) => {
        console.error(err);
        res.status(500).json({message: err.message});
    })
});

app.post('/start', (req, res) => {
    watcher = chokidar.watch(req.body.folder, {ignoreInitial: true});

    watcher.on('add', filePath => {
            logs.push({
                event: 'added',
                file: path.basename(filePath),
                time: Date.now()
            });
        })
        .on('change', filePath => {
            logs.push({
                event: 'changed',
                file: path.basename(filePath),
                time: Date.now()
            });
        })
        .on('unlink', filePath => {
            logs.push({
                event: 'removed',
                file: path.basename(filePath),
                time: Date.now()
            });
        });
    res.sendStatus(200);
});

app.post('/stop', (req, res) => {
    if(watcher) {
        watcher.close();
    }
    logs = [];
    res.sendStatus(200);
});

app.get('/status', (req,res) => {
    res.json({
        logs: logs
    });
});
