function init() {
    var one = $('.J_one');
    var two = $('.J_two');
    var three = $('.J_three');
    var four = $('.J_four');
    var box = $('.J_box');

    box.addEventListener('keydown', function(event) {
        var keyCode = event.keyCode;
        var target = event.target; //目标元素
        var tarName = target.getAttribute('data-name');
        if(keyCode === 13){
            save(tarName, target);
        }
    })

    window.onload = function  () {
         setText('one', one);
         setText('two', two);
         setText('three', three);
         setText('four', four);
    }
}


init();