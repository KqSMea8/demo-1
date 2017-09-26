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
            }), _vm._l((_vm.list), function(item) {
                return _c('Container', {
                    staticClass: "reminder-wrapper"
                }, [_c('Container', [_c('InlineText', {
                    staticClass: "ability-icon-remind"
                }, [_vm._v("")]), _c('InlineText', {
                    staticClass: "remind-title"
                }, [_vm._v(_vm._s(item.name))])], 1), _c('Container', {
                    staticClass: "time-box"
                }, [_c('InlineText', {
                    staticClass: "remind-time"
                }, [_vm._v(_vm._s(_vm._f("getTime")(item.time)))]), _c('InlineText', {
                    staticClass: "remind-week"
                }, [_vm._v("星期" + _vm._s(_vm._f("getWeek")(item.time)))])], 1), (item.management) ? _c('Container', {
                    staticClass: "stand-more",
                    nativeOn: {
                        "click": function($event) {
                            _vm.management(item.management)
                        }
                    }
                }, [_c('InlineText', [_vm._v("管理")]), _c('InlineText', {
                    staticClass: "ability-icon-more"
                }, [_vm._v("")])], 1) : _vm._e()], 1)
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
        filters: {
            getTime: function getTime(val) {
                var date = new Date(val);
                var hours = date.getHours();
                var minutes = date.getMinutes();
                return hours + ':' + minutes;
            },

            getWeek: function getWeek(val) {
                var weekArr = ['天', '一', '二', '三', '四', '五', '六'];
                var date = new Date(val);
                var week = date.getDay();
                return weekArr[week];
            }
        },
        methods: {
            management: function management(obj) {
                this.bridge.callHandler('openApp', obj);
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