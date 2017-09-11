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
                staticClass: "avatar head-sitting"
            }), (_vm.list[0].image.src && _vm.list.length >= 4) ? _c('Container', {
                staticClass: "bubble-container bubble-list"
            }, [_c('ListItem', [_c('Container', {
                staticClass: "list-box"
            }, _vm._l((_vm.list), function(item, index) {
                return (index < 4) ? _c('Link', {
                    staticClass: "other",
                    attrs: {
                        "href": item.url
                    }
                }, [(item.image.src) ? _c('Container', {
                    staticClass: "item-box"
                }, [_c('DcsImage', {
                    staticClass: "item-img",
                    attrs: {
                        "item": item.image
                    }
                })], 1) : _c('Container', {
                    staticClass: "item-box"
                }, [_c('Image', {
                    staticClass: "item-img",
                    attrs: {
                        "src": "http://duer.bdstatic.com/saiya/dcsview/img/default.png"
                    }
                })]), _c('Container', {
                    staticClass: "item-title"
                }, [_vm._v(_vm._s(item.title))]), _c('Container', {
                    staticClass: "item-content"
                }, [_vm._v(_vm._s(item.content))])], 1) : _vm._e()
            }))], 1), (_vm.link.url) ? _c('Link', {
                staticClass: "stand-more",
                attrs: {
                    "href": _vm.link.url
                }
            }, [_c('InlineText', [_vm._v(_vm._s(_vm.link.anchorText))]), _c('InlineText', {
                staticClass: "ability-icon-more"
            }, [_vm._v("")])], 1) : _vm._e()], 1) : _c('Container', {
                staticClass: "text-box"
            }, [_vm._l((_vm.list), function(item, index) {
                return _c('Link', {
                    attrs: {
                        "href": item.url
                    }
                }, [_c('Container', {
                    staticClass: "list"
                }, [_c('Text', {
                    staticClass: "item-title"
                }, [_vm._v(_vm._s(item.title))]), _c('Text', {
                    staticClass: "item-content"
                }, [_vm._v(_vm._s(item.content))])])], 1)
            }), (_vm.link.url) ? _c('Link', {
                staticClass: "stand-more",
                attrs: {
                    "href": _vm.link.url
                }
            }, [_vm._v(_vm._s(_vm.link.anchorText)), _c('InlineText', {
                staticClass: "ability-icon-more"
            }, [_vm._v("")])], 1) : _vm._e()], 2)], 1)
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