const express = require('express');
const app = express();
const articles = [{title: 'example'}];

app.set('port', process.env.PORT || 3000);

app.get('/articles', (req, res, next) => {
    res.send(articles);
});

app.post('/articels', (req, res, next) => {
    res.send('pk');
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('fetching: ', id);
    res.send(articles[id]);
});

app.delete('/articels/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('deleting:', id);
    delete articles[id];
    res.send({message: 'deleted'});
})

app.listen(app.get('port'), () => {
    console.log(`express web app available at localhost:`, app.get('port'));
});

module.exports = app;

