const express = require('express');
const app = express();
const articles = [{title: 'example'}];
const bodyParser = require('body-parser');
const Article = require('./models/db').Article;
const read = require('node-readability');
const url = 'http://www.manning.com/cantelon2';

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    '/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) {
            return next(err);
        }
        res.send(articles);
    })
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;

    res.format({
        html: () => {
            res.render('articels.ejs', {
                articles: articles
            })
        },
        json: () => {
            res.send(articles);
        }
    })

    read(url, (err, result) => {
        if (err || !result) {
            res.status(500).send('Error downloading article');
        }

        Article.create(
            {
                title: result.title,
                content: result.content
            },
            (err, article) => {
                if (err) {
                    return next(err);
                }

                res.send('ok');
            }
        )
    });
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('fetching: ', id);
    Article.find(id, (err, article) => {
        if (err) {
            return next(err);
        }
        res.send(article);
    })
});

app.delete('/articels/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('deleting:', id);
    Article.delete(id, (err) => {
        if (err) {
            return next(err);
        }

        res.send({message: 'Deleted'});
    })
})

app.listen(app.get('port'), () => {
    console.log(`express web app available at localhost:`, app.get('port'));
});

module.exports = app;

