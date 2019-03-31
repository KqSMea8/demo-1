const express = require('express');
const app = express();
const articles = [{title: 'example'}];
const bodyParser = require('body-parser');
const Article = require('./models/db').Article;

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) {
            return next(err);
        }
        res.send(articles);
    })
    // res.send(articles);
});

app.post('/articles', (req, res, next) => {
    const article = {title: req.body.title};
    articles.push(article);
    res.send(article);
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

