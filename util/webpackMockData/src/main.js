var $ = require('jquery');

$('.test').on('click', function () {
    $.ajax({
        url: '/api',
    })
    .done(function(res) {
        console.log(res);
    })
    .fail(function(err) {
        console.log(err);
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
})

