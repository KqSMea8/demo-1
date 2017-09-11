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
                staticClass: "no-head",
                attrs: {
                    "data-from": "server"
                }
            }, [(_vm.title == '为你找到以下图片') ? [_c('Container', {
                staticClass: "avatar"
            }), _c('Container', {
                staticClass: "bubble-container"
            }, [_c('Link', {
                attrs: {
                    "href": _vm.link.url
                }
            }, [_c('Container', {
                staticClass: "bubble img"
            }, [_c('DcsImage', {
                attrs: {
                    "item": _vm.image
                }
            })], 1)], 1)], 1)] : [_c('Container', {
                staticClass: "avatar head-sitting"
            }), _c('Container', {
                staticClass: "img-text"
            }, [_c('Link', {
                attrs: {
                    "href": _vm.link.url
                }
            }, [_c('Container', {
                staticClass: "img-wrap"
            }, [_c('DcsImage', {
                staticClass: "main-img",
                attrs: {
                    "item": _vm.image
                }
            })], 1), _c('Text', {
                staticClass: "st-title"
            }, [_vm._v(_vm._s(_vm.title))]), _c('Container', {
                staticClass: "des-text clearfix"
            }, [_c('Container', {
                staticClass: "summary"
            }, [_vm._v(_vm._s(_vm.content))]), (_vm.link) ? _c('InlineText', {
                staticClass: "stand-more",
                attrs: {
                    "href": _vm.link.url
                }
            }, [_vm._v(_vm._s(_vm.link.anchorText)), _c('InlineText', {
                staticClass: "ability-icon-more"
            }, [_vm._v("")])], 1) : _vm._e()], 1)], 1)], 1)]], 2)
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
obj.props = ["list"];
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