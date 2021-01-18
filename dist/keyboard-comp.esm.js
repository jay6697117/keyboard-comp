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
//
var script = {
  name: 'Keyboard',

  data() {
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
    chanValue() {
      return this.resultList[7].value;
    },

    getCarNumber() {
      let reMsg = [];

      for (let i = 0; i < this.resultList.length; i++) {
        let node = this.resultList[i];

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
      bind(el, binding, vnode) {
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

      update() {},

      unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }

    }
  },
  methods: {
    clickOutsideHandle(e) {
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

    getKey: function (type, index) {
      return type + index;
    },
    successCallback: function () {
      this.$emit('keyboardCallback', this.getCarNumber); //一层

      this.closeKeyword();
    },
    // eslint-disable-next-line
    deleteCallback: function (item) {
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
    clickKey: function (msg, boolState) {
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
    openKeyword: function (index, item) {
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
    closeKeyword: function () {
      this.show = false;
    },

    vehiclePlateHandle(newVal) {
      this.resultList.forEach((element, index) => {
        this.resultList[index].value = newVal.substr(0, 8).split('')[index] ? newVal.substr(0, 8).split('')[index] : '';
      });
    }

  },
  watch: {
    vehiclePlate: {
      handler(newVal) {
        this.vehiclePlateHandle(newVal);
      },

      immediate: true //刷新加载 立马触发一次handler

    },
    show: {
      handler(newVal) {
        this.$emit('keywordHandle', newVal);
      },

      immediate: true //刷新加载 立马触发一次handler

    }
  },

  mounted() {
    console.log('this :>> ', this);
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('h1', [_vm._v("键盘组件示例😊:")]), _vm._v(" "), _c('div', {
    staticClass: "result-body"
  }, _vm._l(_vm.resultList, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "result-list",
      class: {
        active: index == _vm.currentIndex && _vm.show,
        'result-list-new': item.type === 'chanType' && !_vm.chanValue && _vm.maxNum === 6,
        'result-list-new1': item.type === 'chanType' && !_vm.chanValue && _vm.maxNum === 7
      },
      on: {
        "click": function ($event) {
          return _vm.openKeyword(index, item);
        }
      }
    }, [_vm._v("\n      " + _vm._s(item.value) + "\n    ")]);
  }), 0), _vm._v(" "), _c('div', {
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
  }, [_c('div', {
    staticClass: "btn-body"
  }, [_c('div', {
    staticClass: "btn-sure",
    on: {
      "click": _vm.successCallback
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('div', {
    staticClass: "key-container"
  }, [_vm.keyboard == 'txt' ? _c('div', _vm._l(_vm.carTxt, function (item, rows) {
    return _c('div', {
      key: rows,
      staticClass: "keyboard-body"
    }, [_vm._l(item.name, function (i, index) {
      return _c('div', {
        key: index,
        staticClass: "keyboard-text",
        class: {
          'visibility-hidden': i.length === 0
        },
        on: {
          "click": function ($event) {
            return _vm.clickKey(i, false);
          }
        }
      }, [_vm._v("\n            " + _vm._s(i) + "\n          ")]);
    }), _vm._v(" "), rows == 3 ? _c('div', {
      staticClass: "btn-delete",
      on: {
        "click": function ($event) {
          return _vm.deleteCallback(item);
        }
      }
    }, [_vm._v("删除")]) : _vm._e()], 2);
  }), 0) : _vm._e(), _vm._v(" "), _vm.keyboard == 'num' ? _c('div', {
    staticClass: "keyboard-num-body"
  }, _vm._l(_vm.carNum, function (item, row) {
    return _c('div', {
      key: row,
      class: row === 1 ? 'keyboard-num-body-right' : 'keyboard-num-body-left'
    }, [_vm._l(item.name, function (i, index) {
      return _c('div', {
        key: index,
        staticClass: "keyboard-text num",
        class: {
          'visibility-hidden': i.length === 0,
          'disable-num': _vm.currentIndex == 1 && row == 1
        },
        on: {
          "click": function ($event) {
            return _vm.clickKey(i, _vm.currentIndex == 1 && row == 1);
          }
        }
      }, [_vm._v("\n            " + _vm._s(i) + "\n          ")]);
    }), _vm._v(" "), row == 1 ? _c('div', {
      staticClass: "btn-delete",
      on: {
        "click": function ($event) {
          return _vm.deleteCallback(item);
        }
      }
    }, [_vm._v("删除")]) : _vm._e()], 2);
  }), 0) : _vm._e()])])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-61961ea7_0", {
    source: ".keyboard-container[data-v-61961ea7]{width:100%;position:fixed;bottom:0;left:0;z-index:99}.keyboard-container.animationDown[data-v-61961ea7]{animation:slide_dowms-data-v-61961ea7 2s ease-out;animation-fill-mode:forwards}.keyboard-container.animationUp[data-v-61961ea7]{animation:slide_ups-data-v-61961ea7 .3s ease-out;animation-fill-mode:forwards}@keyframes slide_ups-data-v-61961ea7{from{bottom:-282px}to{bottom:0}}@keyframes slide_dowms-data-v-61961ea7{from{bottom:0}to{bottom:-282px}}.keyboard-container .btn-body[data-v-61961ea7]{background:#fff;padding:0 9px;height:42px;text-align:right}.keyboard-container .key-container[data-v-61961ea7]{box-sizing:border-box;padding:5px 9px 33px 5px;background:#dedede}.btn-delete[data-v-61961ea7]{position:absolute;display:inline-block;right:0;bottom:5px;min-width:calc(22% - 6px);width:calc(22% - 6px);height:46px;line-height:46px;background:#c8ceda;box-shadow:0 1px 0 0 rgba(0,0,0,.35);border-radius:5px;text-align:center}.keyboard-body[data-v-61961ea7]{position:relative;display:flex;display:-webkit-flex}.keyboard-text[data-v-61961ea7]{flex:1;background:#fff;text-align:center;border-radius:6px;margin-left:4px;box-shadow:0 1px 0 0 rgba(0,0,0,.35);font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#121212;margin-bottom:5px;padding:12px 0}.keyboard-text[data-v-61961ea7]:nth-child(4){margin-right:10px}.keyboard-text.num[data-v-61961ea7]:nth-child(4){margin-right:4px}.keyboard-num-body[data-v-61961ea7]{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start}.keyboard-num-body-right[data-v-61961ea7]{position:relative;width:30%}.keyboard-num-body-right .keyboard-text.num[data-v-61961ea7]{float:left;min-width:calc((1 / 3) * 100% - 4px);width:calc((1 / 3) * 100% - 4px)}.keyboard-num-body-right .keyboard-text.num[data-v-61961ea7]:nth-child(4){margin-right:0}.keyboard-num-body-right .btn-delete[data-v-61961ea7]{min-width:calc((2 / 3) * 100% - 4px);width:calc((2 / 3) * 100% - 4px)}.keyboard-num-body-left[data-v-61961ea7]{width:70%}.keyboard-num-body-left .keyboard-text.num[data-v-61961ea7]{float:left;min-width:calc((1 / 7) * 100% - 4px);width:calc((1 / 7) * 100% - 4px)}.keyboard-num-body-left .keyboard-text.num[data-v-61961ea7]:nth-child(4){margin-right:0}.btn-sure[data-v-61961ea7]{text-shadow:0 -6px 30px rgba(71,77,96,.06);height:42px;line-height:42px;font-size:16px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#e8374a}.result-body[data-v-61961ea7]{width:100%;box-sizing:border-box!important;display:flex;display:-webkit-flex}.result-list[data-v-61961ea7]{flex:1;font-size:18px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#121212;border-radius:4px;border:1px solid #f0f0f0;padding:0;text-align:center;margin-right:5px;height:54px;line-height:54px}.result-list.active[data-v-61961ea7]{border:1px solid rgba(232,55,73,.4)}.result-list-new[data-v-61961ea7]{background-image:url(asstes/images/carbg-add.png);background-repeat:no-repeat;background-position:center center;background-size:100% 100%}.result-list-new1[data-v-61961ea7]{background-image:url(asstes/images/carbg-new.png);background-repeat:no-repeat;background-position:center center;background-size:100% 100%}.result-list[data-v-61961ea7]:last-child{margin-right:0;max-width:calc(12.5% - 4.375px)}.visibility-hidden[data-v-61961ea7]{visibility:hidden}.disable-num[data-v-61961ea7]{background-color:#c8ceda}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-61961ea7";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installKeyboardComp(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('KeyboardComp', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
