(function  (window, undefined) {
    /**
    * 点击游戏说明显示提示
    */
    function  creatmask() {
        var init = document.querySelector('.init');
        var mask = document.createElement('div');   
        mask.className = 'mask';    
        init.appendChild(mask);
    }
    /**
    * 创建游戏说明
    */
    function createGame () {
        var init = document.querySelector('.init');
        var game = document.createElement('div');
        game.className = 'gameDescription';
        // game.innerHTML = 'safdsa';
        game.innerHTML = "<h2>游戏说明</h2><div class='close'>X</div><p>21点扑克牌游戏,两家的点数都小于21点时，如果玩家的点数大于庄家的点数时，则赢，获得积分。如果玩家的点数小于庄家的点数时,则输。如果两家都大于21点时，不管谁大谁小，都打平，玩家点数大于21点时,庄家没大于21点时，则输。玩家点数小于21点，庄家大于21点时, 则赢，获得获得积分</p>";
        init.appendChild(game);
        //把他放在页面正中央
        var desktop = document.querySelector('.desktop');
        var width = desktop.offsetWidth;
        var height = desktop.offsetHeight;
        game.style.left = (width-game.offsetWidth)/2 + 'px';
        game.style.top = (height-game.offsetHeight)/2 + 'px';
    }
    //删除弹出层
    function removeChild () {
        var init = document.querySelector('.init');
        var mask = document.querySelector('.mask');
        var game = document.querySelector('.gameDescription');
        var close = document.querySelector('.close');
        close.onclick = function  () {
            console.log('关闭游戏说明');
            init.removeChild(mask);
            init.removeChild(game);
        }
    }
    //游戏说明弹出效果
    document.getElementById('describe').onclick = function  () {
        creatmask();
        createGame();
        removeChild ();
    }
})();
