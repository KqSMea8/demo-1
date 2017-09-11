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
            }, [_c('Text', {
                staticClass: "bubble"
            }, [_c('Text', {
                staticClass: "text-content"
            }, [_c('InlineText', [_vm._v(_vm._s(_vm.guideCard.title))]), _vm._l((_vm.guideCard.query), function(query) {
                return _c('InlineText', [_vm._v("“" + _vm._s(query) + "”")])
            })], 2), _c('Container', {
                nativeOn: {
                    "click": function($event) {
                        _vm.render($event)
                    }
                }
            }, [_c('InlineText', {
                staticClass: "stand-more-left"
            }, [_vm._v(_vm._s(_vm.guideCard.subcontent))]), _c('InlineText', {
                staticClass: "stand-more"
            }, [_c('InlineText', [_vm._v(_vm._s(_vm.guideCard.link.text))]), _c('InlineText', {
                staticClass: "ability-icon-more"
            }, [_vm._v("")])], 1)], 1)], 1)])], 1)
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
            render: function render() {
                this.bridge.callHandler('explore');
                log('introductionGuide is:' + this.feedContentData);
                log('renderIntroduction is:' + this.renderIntroduction);

                // 统计去探索点击次数和点击uv
                this.bridge.callHandler('httpRequest', {
                    type: 'statistics',
                    url: 'https://xiaodu.baidu.com/saiya/log',
                    method: 'post',
                    data: {
                        from: 'assistantandroid',
                        type: 13,
                        appid: '',
                        cuid: '',
                        content: {
                            behavior: 'click',
                            clickContent: 'guide_speechcraft'
                        }
                    }
                });

                this.renderIntroduction(this.data, this.feedHint, this.feedContentData);
            }
        }
    };
})(_module2, _module2.exports);

var obj = _module2.exports.default || _module2.exports;
obj.render = obj.render || _module1.exports.render;
obj.staticRenderFns = _module1.exports.staticRenderFns;
obj.data = function() {
    return {
        "guideCard": this["data"]["data"]["guideCard"]
    };
};
obj.props = ["bridge", "data", "renderIntroduction", "feedHint", "feedContentData"];
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