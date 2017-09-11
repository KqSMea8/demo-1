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
                staticClass: "avatar"
            }), _c('Container', {
                staticClass: "bubble-container"
            }, [_c('Text', {
                staticClass: "bubble guide"
            }, [_vm._v(_vm._s(_vm.abilityCard.title))])]), _c('Container', {
                staticClass: "intr-wrapper"
            }, [_c('Container', {
                staticClass: "intr-item-box"
            }, _vm._l((_vm.list), function(item, index) {
                return _c('ListItem', {
                    staticClass: "intr-item"
                }, [_c('Container', {
                    staticClass: "item-card",
                    nativeOn: {
                        "click": function($event) {
                            _vm.renderHint(index)
                        }
                    }
                }, [_c('Image', {
                    staticClass: "intr-icon",
                    attrs: {
                        "src": item.icon_src
                    }
                }), _c('Container', [_vm._v(_vm._s(item.title))]), _c('Container', {
                    staticClass: "intr-example"
                }, [_vm._v(_vm._s(item.content))])], 1)], 1)
            }))], 1)], 1)
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
            setItemBoxWidth: function setItemBoxWidth() {
                var len = this.list.length;
                $('.intr-item-box').width(len / 3.2 * 100 + '%');
            },
            setItemWitdh: function setItemWitdh() {
                var len = this.list.length;
                $('.intr-item').width(1 / len * 100 + '%');
            },
            addHoverStart: function addHoverStart() {
                $('.item-card').on('touchstart', function(e) {
                    $(this).addClass('hover');
                });
            },
            removeHoverEnd: function removeHoverEnd() {
                $('.item-card').on('touchend', function(e) {
                    $(this).removeClass('hover');
                });
            },
            // 渲染hint和引导话术
            renderHint: function renderHint(index) {

                // 统计说明卡片展现
                this.bridge.callHandler('httpRequest', {
                    url: '',
                    method: 'post',
                    data: {}
                });

                // 渲染引导话术
                var result = this.list[index].click_response.result;
                log(this.list[index].click_response);
                var str = result.title + result.content;
                log(this.feedContentData);

                this.feedContentData({
                    'type': 'guide',
                    'data': {
                        text: str
                    }
                });

                // 渲染hint
                this.feedHint({
                    cueWords: this.list[index].click_response.result.cuewords
                });

                // 统计说明卡片展现uv和pv
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
                            behavior: 'showGuide',
                            clickContent: 'guide_comment_card'
                        }
                    }
                });
            }
        },
        mounted: function mounted() {
            this.setItemBoxWidth();
            this.setItemWitdh();
            this.addHoverStart();
            this.removeHoverEnd();

            // 统计引导卡片展现uv和pv
            this.bridge.callHandler('httpRequest', {
                type: 'statistics',
                url: 'https://xiaodu.baidu.com/saiya/log',
                method: 'post',
                data: {
                    type: 13,
                    content: {
                        behavior: 'showGuide',
                        clickContent: 'guide_card'
                    }
                }
            });
        }
    };
})(_module2, _module2.exports);

var obj = _module2.exports.default || _module2.exports;
obj.render = obj.render || _module1.exports.render;
obj.staticRenderFns = _module1.exports.staticRenderFns;
obj.data = function() {
    return {
        "abilityCard": this["data"]["data"]["abilityCard"],
        "list": this["data"]["data"]["abilityCard"]["bot"]
    };
};
obj.props = ["bridge", "data", "feedHint", "feedContentData"];
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