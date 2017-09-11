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
                staticClass: "head fb-box sms-fb-wrapper",
                attrs: {
                    "data-from": "server"
                },
                nativeOn: {
                    "click": function($event) {
                        _vm.callHandler($event)
                    }
                }
            }, [(_vm.type === 'sms') ? [_c('InlineText', {
                staticClass: "ability-icon-left"
            }, [_vm._v("")]), _c('InlineText', {
                staticClass: "fb-msg"
            }, [_vm._v("发短信给 \n            " + _vm._s(_vm.list[0].name) + " \n            " + _vm._s(_vm.list[0].numbers[0].type)), _c('InlineText', {
                staticClass: "number"
            }, [_vm._v(_vm._s(_vm.list[0].numbers[0].number))])], 1)] : (_vm.type === 'phone') ? [_c('InlineText', {
                staticClass: "ability-icon-left"
            }, [_vm._v("")]), _c('InlineText', {
                staticClass: "fb-msg"
            }, [_vm._v("打电话给 \n            " + _vm._s(_vm.list[0].name) + " \n            " + _vm._s(_vm.list[0].numbers[0].type)), _c('InlineText', {
                staticClass: "number"
            }, [_vm._v(_vm._s(_vm.list[0].numbers[0].number))])], 1)] : _vm._e(), _c('InlineText', {
                staticClass: "ability-icon-more"
            }, [_vm._v("")])], 2)
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
            callHandler: function callHandler() {
                console.log('callHandler type is: ' + this.type);

                var number = this.list[0].numbers[0].number;

                if (this.type === 'sms') {
                    this.bridge.callHandler("sms", {
                        number: number,
                        content: this.content ? this.content : ""
                    });
                } else if (this.type === 'phone') {
                    this.bridge.callHandler("phone", {
                        number: number
                    });
                }
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
obj.props = ["bridge", "type", "list", "content"];
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