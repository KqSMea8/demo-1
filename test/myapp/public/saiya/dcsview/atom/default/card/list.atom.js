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
            }, [_c('Container', {
                staticClass: "bubble-container"
            }, [_c('ListItem', {
                staticClass: "bubble"
            }, [_vm._l((_vm.list), function(item, index) {
                return [(index == 0) ? _c('Link', {
                    attrs: {
                        "href": item.url
                    }
                }, [_c('Container', {
                    staticClass: "first"
                }, [(item.summary) ? [_c('Container', {
                    staticClass: "title text-content"
                }, [_vm._v(_vm._s(item.title))]), _c('Image', {
                    attrs: {
                        "src": item.image
                    }
                }), _c('Container', {
                    staticClass: "summary"
                }, [_vm._v(_vm._s(item.summary))])] : [(item.image) ? _c('Image', {
                    attrs: {
                        "src": item.image
                    }
                }) : _vm._e(), _c('Text', [_vm._v(_vm._s(item.title))])]], 2)], 1) : _c('Link', {
                    attrs: {
                        "href": item.url
                    }
                }, [_c('Container', {
                    staticClass: "other"
                }, [_c('Text', [_vm._v(_vm._s(item.title))]), (item.image) ? _c('Image', {
                    attrs: {
                        "src": item.image
                    }
                }) : _vm._e()])], 1)]
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
obj.props = ["list"];
obj.components = {
    "Section": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/duer/section.atom.js"),
    "ListItem": require("/Users/sufubo/code/baidu/dcs_view/static_build//saiya/dcsview/atom/webview/components/duer/listItem.atom.js"),
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