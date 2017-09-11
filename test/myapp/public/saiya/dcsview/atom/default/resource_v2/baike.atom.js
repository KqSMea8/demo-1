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
            }), _c('Container', {
                staticClass: "ency-box"
            }, [(_vm.data.title) ? _c('Container', {
                staticClass: "ency-title"
            }, [_vm._v(_vm._s(_vm.data.title))]) : _vm._e(), _c('Container', {
                staticClass: "c-row c-abstract c-gap-top-small"
            }, [_c('Container', {
                staticClass: "c-span4"
            }, [_c('Container', {
                staticClass: "c-img c-img-s"
            }, [_c('Image', {
                attrs: {
                    "src": _vm.data.image
                }
            })])], 1), _c('Container', {
                staticClass: "c-span8"
            }, [_c('Container', {
                staticClass: "c-line-clamp4 c-color ency-intr"
            }, [_vm._v("简介：" + _vm._s(_vm.data.introduction))])], 1)], 1), _c('Link', {
                attrs: {
                    "href": _vm.data.url
                }
            }, [(_vm.data.url) ? _c('Container', {
                staticClass: "stand-more"
            }, [_c('InlineText', [_vm._v("百度百科")]), _c('InlineText', {
                staticClass: "ability-icon-more"
            }, [_vm._v("")])], 1) : _vm._e()], 1)], 1)], 1)
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
    return {
        "data": this["resource"]["data"]
    };
};
obj.props = ["resource"];
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