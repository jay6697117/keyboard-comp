'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'Keyboard',
  data: function data() {
    return {
      initCount: 0,
      show: false,
      keyboard: 'txt',
      //num,txt
      currentIndex: 0,
      maxNum: 6,
      //从0开始 普通6位。新能源7位
      resultList: [{
        type: 'j',
        value: ''
      }, {
        type: 'j',
        value: ''
      }, {
        type: 'j',
        value: ''
      }, {
        type: 'j',
        value: ''
      }, {
        type: 'j',
        value: ''
      }, {
        type: 'j',
        value: ''
      }, {
        type: 'j',
        value: ''
      }, {
        type: 'chanType',
        value: ''
      }],
      carTxt: [{
        name: ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂']
      }, {
        name: ['黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏']
      }, {
        name: ['皖', '浙', '闽', '赣', '湘', '鄂', '粤', '琼', '甘']
      }, {
        name: ['陕', '贵', '云', '川', '港', '澳', '临', '', '']
      }],
      carNum: [{
        name: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '领', '学', '警', '使']
      }, {
        name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '', '']
      }]
    };
  },
  props: {
    //传入车牌号
    vehiclePlate: {
      type: String,
      default: ''
    },
    //是否开启键盘禁用
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    chanValue: function chanValue() {
      return this.resultList[7].value;
    },
    getCarNumber: function getCarNumber() {
      var reMsg = [];

      for (var i = 0; i < this.resultList.length; i++) {
        var node = this.resultList[i];

        if (node.type == 'chanType') {
          if (node.value.trim().length > 0) {
            reMsg.push(node.value);
          }
        } else {
          if (node.value.trim().length > 0) {
            reMsg.push(node.value);
          }
        }
      }

      return reMsg.join('');
    }
  },
  directives: {
    clickOutside: {
      bind: function bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }

          if (binding.expression) {
            binding.value(e);
          }
        }

        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
      },
      update: function update() {},
      unbind: function unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  methods: {
    clickOutsideHandle: function clickOutsideHandle(e) {
      console.log('clickOutsideHandle');
      e.preventDefault();

      if (e.target.className.indexOf('result-list') >= 0) {
        return;
      } else {
        // 键盘开启的情况下，如果clickOutside键盘关闭
        if (this.show) {
          this.show = false;
        }
      }
    },
    getKey: function getKey(type, index) {
      return type + index;
    },
    successCallback: function successCallback() {
      this.$emit('keyboardCallback', this.getCarNumber); //一层

      this.closeKeyword();
    },
    // eslint-disable-next-line
    deleteCallback: function deleteCallback(item) {
      //如果有值 删除自己操作序列不变。如没有值就删除上一个。
      this.resultList[this.currentIndex].value = '';

      if (this.currentIndex - 1 <= 0) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = this.currentIndex - 1;
      }

      if (this.currentIndex == 0) {
        this.keyboard = 'txt';
      } else {
        this.keyboard = 'num';
      }

      this.$emit('keyboardCallback', this.getCarNumber);
    },
    clickKey: function clickKey(msg, boolState) {
      if (boolState) {
        return;
      }

      this.resultList[this.currentIndex].value = msg;

      if (this.currentIndex + 1 >= this.maxNum) {
        this.currentIndex = this.maxNum;
      } else {
        this.currentIndex = this.currentIndex + 1;
      }

      if (this.currentIndex == 0) {
        this.keyboard = 'txt';
      } else {
        this.keyboard = 'num';
      }

      this.$emit('keyboardCallback', this.getCarNumber);
    },
    openKeyword: function openKeyword(index, item) {
      if (this.isDisable) {
        return;
      }

      if (item.type == 'chanType') {
        this.maxNum = 7;
      }

      this.currentIndex = index;

      if (this.currentIndex == 0) {
        this.keyboard = 'txt';
      } else {
        this.keyboard = 'num';
      }

      this.show = true;
    },
    closeKeyword: function closeKeyword() {
      this.show = false;
    },
    vehiclePlateHandle: function vehiclePlateHandle(newVal) {
      var _this = this;

      this.resultList.forEach(function (element, index) {
        _this.resultList[index].value = newVal.substr(0, 8).split('')[index] ? newVal.substr(0, 8).split('')[index] : '';
      });
    }
  },
  watch: {
    vehiclePlate: {
      handler: function handler(newVal) {
        this.vehiclePlateHandle(newVal);
      },
      immediate: true //刷新加载 立马触发一次handler

    },
    show: {
      handler: function handler(newVal) {
        this.$emit('keywordHandle', newVal);
      },
      immediate: true //刷新加载 立马触发一次handler

    }
  },
  mounted: function mounted() {
    console.log('this :>> ', this);
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<h1 data-v-1f0897dc>键盘组件示例😊:</h1> <div class=\"result-body\" data-v-1f0897dc>" + _vm._ssrList(_vm.resultList, function (item, index) {
    return "<div" + _vm._ssrClass("result-list", {
      active: index == _vm.currentIndex && _vm.show,
      'result-list-new': item.type === 'chanType' && !_vm.chanValue && _vm.maxNum === 6,
      'result-list-new1': item.type === 'chanType' && !_vm.chanValue && _vm.maxNum === 7
    }) + " data-v-1f0897dc>" + _vm._ssrEscape("\n      " + _vm._s(item.value) + "\n    ") + "</div>";
  }) + "</div> "), _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.clickOutsideHandle,
      expression: "clickOutsideHandle"
    }, {
      name: "show",
      rawName: "v-show",
      value: _vm.show,
      expression: "show"
    }],
    staticClass: "keyboard-container",
    class: {
      animationDown: !_vm.show,
      animationUp: _vm.show
    }
  }, [_vm._ssrNode("<div class=\"btn-body\" data-v-1f0897dc><div class=\"btn-sure\" data-v-1f0897dc>确定</div></div> <div class=\"key-container\" data-v-1f0897dc>" + (_vm.keyboard == 'txt' ? "<div data-v-1f0897dc>" + _vm._ssrList(_vm.carTxt, function (item, rows) {
    return "<div class=\"keyboard-body\" data-v-1f0897dc>" + _vm._ssrList(item.name, function (i, index) {
      return "<div" + _vm._ssrClass("keyboard-text", {
        'visibility-hidden': i.length === 0
      }) + " data-v-1f0897dc>" + _vm._ssrEscape("\n            " + _vm._s(i) + "\n          ") + "</div>";
    }) + " " + (rows == 3 ? "<div class=\"btn-delete\" data-v-1f0897dc>删除</div>" : "<!---->") + "</div>";
  }) + "</div>" : "<!---->") + " " + (_vm.keyboard == 'num' ? "<div class=\"keyboard-num-body\" data-v-1f0897dc>" + _vm._ssrList(_vm.carNum, function (item, row) {
    return "<div" + _vm._ssrClass(null, row === 1 ? 'keyboard-num-body-right' : 'keyboard-num-body-left') + " data-v-1f0897dc>" + _vm._ssrList(item.name, function (i, index) {
      return "<div" + _vm._ssrClass("keyboard-text num", {
        'visibility-hidden': i.length === 0,
        'disable-num': _vm.currentIndex == 1 && row == 1
      }) + " data-v-1f0897dc>" + _vm._ssrEscape("\n            " + _vm._s(i) + "\n          ") + "</div>";
    }) + " " + (row == 1 ? "<div class=\"btn-delete\" data-v-1f0897dc>删除</div>" : "<!---->") + "</div>";
  }) + "</div>" : "<!---->") + "</div>")])], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1f0897dc_0", {
    source: ".keyboard-container[data-v-1f0897dc]{width:100%;position:fixed;bottom:0;left:0;z-index:99}.keyboard-container.animationDown[data-v-1f0897dc]{animation:slide_dowms-data-v-1f0897dc 2s ease-out;animation-fill-mode:forwards}.keyboard-container.animationUp[data-v-1f0897dc]{animation:slide_ups-data-v-1f0897dc .3s ease-out;animation-fill-mode:forwards}@keyframes slide_ups-data-v-1f0897dc{from{bottom:-282px}to{bottom:0}}@keyframes slide_dowms-data-v-1f0897dc{from{bottom:0}to{bottom:-282px}}.keyboard-container .btn-body[data-v-1f0897dc]{background:#fff;padding:0 9px;height:42px;text-align:right}.keyboard-container .key-container[data-v-1f0897dc]{box-sizing:border-box;padding:5px 9px 33px 5px;background:#dedede}.btn-delete[data-v-1f0897dc]{position:absolute;display:inline-block;right:0;bottom:5px;min-width:calc(22% - 6px);width:calc(22% - 6px);height:46px;line-height:46px;background:#c8ceda;box-shadow:0 1px 0 0 rgba(0,0,0,.35);border-radius:5px;text-align:center}.keyboard-body[data-v-1f0897dc]{position:relative;display:flex;display:-webkit-flex}.keyboard-text[data-v-1f0897dc]{flex:1;background:#fff;text-align:center;border-radius:6px;margin-left:4px;box-shadow:0 1px 0 0 rgba(0,0,0,.35);font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#121212;margin-bottom:5px;padding:12px 0}.keyboard-text[data-v-1f0897dc]:nth-child(4){margin-right:10px}.keyboard-text.num[data-v-1f0897dc]:nth-child(4){margin-right:4px}.keyboard-num-body[data-v-1f0897dc]{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start}.keyboard-num-body-right[data-v-1f0897dc]{position:relative;width:30%}.keyboard-num-body-right .keyboard-text.num[data-v-1f0897dc]{float:left;min-width:calc((1 / 3) * 100% - 4px);width:calc((1 / 3) * 100% - 4px)}.keyboard-num-body-right .keyboard-text.num[data-v-1f0897dc]:nth-child(4){margin-right:0}.keyboard-num-body-right .btn-delete[data-v-1f0897dc]{min-width:calc((2 / 3) * 100% - 4px);width:calc((2 / 3) * 100% - 4px)}.keyboard-num-body-left[data-v-1f0897dc]{width:70%}.keyboard-num-body-left .keyboard-text.num[data-v-1f0897dc]{float:left;min-width:calc((1 / 7) * 100% - 4px);width:calc((1 / 7) * 100% - 4px)}.keyboard-num-body-left .keyboard-text.num[data-v-1f0897dc]:nth-child(4){margin-right:0}.btn-sure[data-v-1f0897dc]{text-shadow:0 -6px 30px rgba(71,77,96,.06);height:42px;line-height:42px;font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#e8374a}.result-body[data-v-1f0897dc]{width:100%;box-sizing:border-box!important;display:flex;display:-webkit-flex}.result-list[data-v-1f0897dc]{flex:1;font-size:18px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#121212;border-radius:4px;border:1px solid #f0f0f0;padding:0;text-align:center;margin-right:5px;height:54px;line-height:54px}.result-list.active[data-v-1f0897dc]{border:1px solid rgba(232,55,73,.4)}.result-list-new[data-v-1f0897dc]{background-image:url(data:image/png;base64,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);background-repeat:no-repeat;background-position:center center;background-size:100% 100%}.result-list-new1[data-v-1f0897dc]{background-image:url(data:image/png;base64,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);background-repeat:no-repeat;background-position:center center;background-size:100% 100%}.result-list[data-v-1f0897dc]:last-child{margin-right:0;max-width:calc(12.5% - 4.375px)}.visibility-hidden[data-v-1f0897dc]{visibility:hidden}.disable-num[data-v-1f0897dc]{background-color:#c8ceda}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-1f0897dc";
/* module identifier */

var __vue_module_identifier__ = "data-v-1f0897dc";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installKeyboardComp(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('KeyboardComp', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;