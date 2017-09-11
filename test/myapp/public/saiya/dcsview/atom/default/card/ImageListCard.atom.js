/* get render function */
var _module1 = {
    exports: {}
};
(function(module, exports) {


    module.exports = {
        render: function() {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c('Section', {
                staticClass: "head",
                attrs: {
                    "data-from": "server"
                }
            }, [_c('Container', {
                staticClass: "avatar"
            }), _c('Container', {
                staticClass: "bubble-container"
            }, [_c('Link', {
                staticClass: "imageViewer",
                attrs: {
                    "href": _vm.imageList[0].src
                }
            }, [_c('Container', {
                staticClass: "bubble img img-card"
            }, [_c('DcsImage', {
                attrs: {
                    "item": _vm.imageList[0]
                }
            }), _c('Container', {
                staticClass: "img-num"
            }, [_c('Image', {
                attrs: {
                    "src": "http://duer.bdstatic.com/saiya/dcsview/img/photos.png"
                }
            }), _c('InlineText', [_vm._v(_vm._s(_vm.imageList.length))])], 1)], 1), _vm._l((_vm.imageList), function(item) {
                return _c('Container', {
                    staticClass: "imagevie-box"
                }, [_c('DcsImage', {
                    staticClass: "imagevieweritem",
                    attrs: {
                        "item": item
                    }
                })], 1)
            })], 2)], 1)], 1)
        },
        staticRenderFns: [

        ]
    };


})(_module1, _module1.exports);

/* get script output data */
var _module2 = {
    exports: {}
};
(function(module, exports) {
    "use strict";
})(_module2, _module2.exports);

var obj = _module2.exports.default || _module2.exports;
obj.render = obj.render || _module1.exports.render;
obj.staticRenderFns = _module1.exports.staticRenderFns;
obj.data = function() {
    return {};
};
obj.props = ["imageList"];
obj.components = {
    "Section": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/duer/section.atom.js"),
    "ListItem": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/duer/listItem.atom.js"),
    "DcsImage": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/duer/dcsImage.atom.js"),
    "Container": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/container.atom.js"),
    "Link": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/link.atom.js"),
    "Image": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/image.atom.js"),
    "Text": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/text.atom.js"),
    "InlineText": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/inlineText.atom.js")
};

obj.created = function() {
    var self = this;
    self.$super = {
        render: function() {
            return _module1.exports.render.apply(self, arguments);
        }
    };
};



module.exports = obj;