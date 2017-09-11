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
                staticClass: "head fb-box app-fb-box",
                attrs: {
                    "data-from": "server"
                }
            }, [_vm._l((_vm.list), function(item) {
                return [(item.type === 'app') ? _c('Container', {
                    staticClass: "item",
                    nativeOn: {
                        "click": function($event) {
                            _vm.openApp(item)
                        }
                    }
                }, [_c('InlineText', {
                    staticClass: "ability-icon-left"
                }, [_vm._v("")]), _c('Link', {
                    staticClass: "fb-msg"
                }, [_vm._v("打开 " + _vm._s(item.appName))]), _c('InlineText', {
                    staticClass: "ability-icon-more"
                }, [_vm._v("")])], 1) : (item.type === 'url') ? _c('Container', {
                    staticClass: "item",
                    nativeOn: {
                        "click": function($event) {
                            _vm.openUrl(item)
                        }
                    }
                }, [_c('InlineText', {
                    staticClass: "ability-icon-left"
                }, [_vm._v("")]), _c('Link', {
                    staticClass: "fb-msg",
                    attrs: {
                        "href": item.url
                    }
                }, [_vm._v("打开"), _c('InlineText', {
                    staticClass: "open-url"
                }, [_vm._v(_vm._s(item.url))])], 1), _c('InlineText', {
                    staticClass: "ability-icon-more"
                }, [_vm._v("")])], 1) : _vm._e()]
            })], 2)
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
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        methods: {
            openApp: function openApp(item) {
                this.bridge.callHandler('openApp', {
                    appName: item.appName,
                    packageName: item.packageName,
                    deepLink: item.deepLink,
                    token: item.token
                });
            },

            openUrl: function openUrl(item) {
                this.bridge.callHandler('openUrl', {
                    url: item.url
                });
            }
        }
    };
})(_module2, _module2.exports);

var obj = _module2.exports.default || _module2.exports;
obj.render = obj.render || _module1.exports.render;
obj.staticRenderFns = _module1.exports.staticRenderFns;
obj.data = function() {
    return {};
};
obj.props = ["bridge", "list"];
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