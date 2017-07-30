<?php
//include("../../webroot/route.php");

trait Singleton {
    private static $_instance;
    public static function getInstance(){
        if(!self::$_instance){
            self::$_instance=new self();
        }
        return self::$_instance;
    }
}
require("Display.class.php");
\Dcsview\Display::getInstance()->setTemplateDir(__DIR__."/build//app/Dcsview/build/");

$output=\Dcsview\Display::getInstance()->atomRender("default","card/StandardTemplate",[
	"type"=> "StandardTemplate",
    "title"=> "忠友麻辣烫",
    "content"=> "￥25/人",
    "link"=>[
        "url"=> "http://duer.baidu.com/midpage/meishi?&id=528912&location=39.93153512350000,116.38817112350000",
        "anchorText"=> "查看更多",
    ],
    "image"=> ["src"=>"http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/14ce36d3d539b600e8c8bb3ce150352ac65cb733.jpg"]
]);
echo "standard: $html\n\n\n";



$html=\Dcsview\Display::getInstance()->atomRender("default","card/ListTemplate",[
	"type"=> "ListTemplate",
	"list"=> [
		[
			"title"=> "忠友麻辣烫",
			"content"=> "￥25/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=528912&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=>"http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/14ce36d3d539b600e8c8bb3ce150352ac65cb733.jpg"]
		],
		[
			"title"=> "老诚一锅",
			"content"=> "￥71/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=842195&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=>"http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/30adcbef76094b36171f9c66abcc7cd98c109da8.jpg"]
		],
		[
			"title"=> "李连贵熏肉大饼",
			"content"=> "￥46/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=148105&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=>"http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/4a36acaf2edda3cc30aba9ab09e93901203f92e9.jpg"],
		],
		[
			"title"=> "惠丰老北京饺子楼",
			"content"=> "￥65/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=843282&location=39.93153512350000,116.38817112350000",
			"image"=>  ["src"=>"http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/a08b87d6277f9e2f8f90af831730e924b999f390.jpg"]
		],
		[
			"title"=> "庆丰包子铺",
			"content"=> "￥15/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=184200&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/c995d143ad4bd1137b305fb452afa40f4afb05b2.jpg"]
		],
		[
			"title"=> "华天延吉餐厅",
			"content"=> "￥29/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=726340&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/faf2b2119313b07ec96e3e8004d7912396dd8c62.jpg"]
		],
		[
			"title"=> "宽板凳老灶火锅",
			"content"=> "￥104/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=3352918&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/c2cec3fdfc039245c4a167838f94a4c27d1e2521.jpg"]
		],
		[
			"title"=> "大地西餐厅",
			"content"=> "￥92/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=731619&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/d833c895d143ad4bd6bdae468a025aafa50f06a0.jpg"]
		],
		[
			"title"=> "仿膳饭庄",
			"content"=> "￥204/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=904510&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/6a63f6246b600c33e3be364e124c510fd8f9a175.jpg"]
		],
		[
			"title"=> "丽江庭院之爱在路上",
			"content"=> "￥141/人",
			"url"=> "http://duer.baidu.com/midpage/meishi?&id=838499&location=39.93153512350000,116.38817112350000",
			"image"=> ["src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/5243fbf2b2119313ba39993b6d380cd790238dc6.jpg"]
		]
	]
]);
echo "list: $html\n\n\n";
$html=\Dcsview\Display::getInstance()->atomRender("default","card/ImageTemplate",[
	"type"=> "ImageTemplate",
	"list"=> [
		[
			"src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/14ce36d3d539b600e8c8bb3ce150352ac65cb733.jpg"
		],
		[
			"src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/30adcbef76094b36171f9c66abcc7cd98c109da8.jpg"
		],
		[
			"src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/4a36acaf2edda3cc30aba9ab09e93901203f92e9.jpg"
		],
		[
			"src"=> "http://ss3.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/xiaodu/pic/item/a08b87d6277f9e2f8f90af831730e924b999f390.jpg"
		],
	]
]);
echo "image: $html\n\n\n";

$html=\Dcsview\Display::getInstance()->atomRender("default","card/TextTemplate",[
    "type"=>"TextTemplate",
    "content"=>"为你推荐如下热门资讯",
	"link"=>[
        "url"=>"http://www.baidu.com",
        "anchorText"=>"查看更多",
    ],
]);
echo $html;
