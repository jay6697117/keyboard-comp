<template>
  <div>
    <h1>键盘组件示例😊:</h1>
    <div class="result-body">
      <div
        @click="openKeyword(index, item)"
        class="result-list"
        :class="{
          active: index == currentIndex && show,
          'result-list-new': item.type === 'chanType' && !chanValue && maxNum === 6,
          'result-list-new1': item.type === 'chanType' && !chanValue && maxNum === 7
        }"
        v-for="(item, index) in resultList"
        :key="index"
      >
        {{ item.value }}
      </div>
    </div>
    <div
      v-click-outside="clickOutsideHandle"
      v-show="show"
      class="keyboard-container"
      :class="{ animationDown: !show, animationUp: show }"
    >
      <div class="btn-body">
        <div @click="successCallback" class="btn-sure">确定</div>
      </div>
      <div class="key-container">
        <div v-if="keyboard == 'txt'">
          <div class="keyboard-body" v-for="(item, rows) in carTxt" :key="rows">
            <div
              class="keyboard-text"
              @click="clickKey(i, false)"
              :class="{ 'visibility-hidden': i.length === 0 }"
              v-for="(i, index) in item.name"
              :key="index"
            >
              {{ i }}
            </div>
            <div v-if="rows == 3" @click="deleteCallback(item)" class="btn-delete">删除</div>
          </div>
        </div>
        <div v-if="keyboard == 'num'" class="keyboard-num-body">
          <div
            :class="row === 1 ? 'keyboard-num-body-right' : 'keyboard-num-body-left'"
            v-for="(item, row) in carNum"
            :key="row"
          >
            <div
              class="keyboard-text num"
              @click="clickKey(i, currentIndex == 1 && row == 1)"
              :class="{ 'visibility-hidden': i.length === 0, 'disable-num': currentIndex == 1 && row == 1 }"
              v-for="(i, index) in item.name"
              :key="index"
            >
              {{ i }}
            </div>
            <div v-if="row == 1" @click="deleteCallback(item)" class="btn-delete">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  data() {
    return {
      initCount: 0,
      show: false,
      keyboard: 'txt', //num,txt
      currentIndex: 0,
      maxNum: 6, //从0开始 普通6位。新能源7位
      resultList: [
        {
          type: 'j',
          value: ''
        },
        {
          type: 'j',
          value: ''
        },
        {
          type: 'j',
          value: ''
        },
        {
          type: 'j',
          value: ''
        },
        {
          type: 'j',
          value: ''
        },
        {
          type: 'j',
          value: ''
        },
        {
          type: 'j',
          value: ''
        },
        {
          type: 'chanType',
          value: ''
        }
      ],
      carTxt: [
        {
          name: ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂']
        },
        {
          name: ['黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏']
        },
        {
          name: ['皖', '浙', '闽', '赣', '湘', '鄂', '粤', '琼', '甘']
        },
        {
          name: ['陕', '贵', '云', '川', '港', '澳', '临', '', '']
        }
      ],
      carNum: [
        {
          name: [
            'Q',
            'W',
            'E',
            'R',
            'T',
            'Y',
            'U',
            'P',
            'A',
            'S',
            'D',
            'F',
            'G',
            'H',
            'J',
            'K',
            'L',
            'Z',
            'X',
            'C',
            'V',
            'B',
            'N',
            'M',
            '领',
            '学',
            '警',
            '使'
          ]
        },
        {
          name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '', '']
        }
      ]
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
    getKey: function(type, index) {
      return type + index;
    },
    successCallback: function() {
      this.$emit('keyboardCallback', this.getCarNumber); //一层
      this.closeKeyword();
    },
    // eslint-disable-next-line
    deleteCallback: function(item) {
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
    clickKey: function(msg, boolState) {
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
    openKeyword: function(index, item) {
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
    closeKeyword: function() {
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
</script>

<style lang="less" scoped>
.keyboard-container {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
}

.keyboard-container.animationDown {
  animation: slide_dowms 2s ease-out;
  animation-fill-mode: forwards;
}

.keyboard-container.animationUp {
  animation: slide_ups 0.3s ease-out;
  animation-fill-mode: forwards;
}

@keyframes slide_ups {
  from {
    bottom: -282px;
  }

  to {
    bottom: 0px;
  }
}

@keyframes slide_dowms {
  from {
    bottom: 0px;
  }

  to {
    bottom: -282px;
  }
}

.keyboard-container .btn-body {
  background: #ffffff;
  padding: 0px 9px;
  height: 42px;
  text-align: right;
}

.keyboard-container .key-container {
  box-sizing: border-box;
  padding: 5px 9px 33px 5px;
  background: #dedede;
}

.btn-delete {
  position: absolute;
  display: inline-block;
  right: 0;
  bottom: 5px;
  min-width: calc(22% - 6px);
  width: calc(22% - 6px);
  height: 46px;
  line-height: 46px;
  background: #c8ceda;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.35);
  border-radius: 5px;
  text-align: center;
}

.keyboard-body {
  position: relative;
  display: flex; //可能就为下面的flex: 1
  display: -webkit-flex; //感觉没用
}

.keyboard-text {
  flex: 1;
  background: #ffffff;
  text-align: center;
  border-radius: 6px;
  margin-left: 4px;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.35);
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
  margin-bottom: 5px;
  padding: 12px 0px;
}

/* 车牌首个字母必须是中文 */
.keyboard-text:nth-child(4) {
  margin-right: 10px;
}

/* 数字键盘还原 */
.keyboard-text.num:nth-child(4) {
  margin-right: 4px;
}

.keyboard-num-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.keyboard-num-body-right {
  position: relative;
  width: 30%;

  .keyboard-text.num {
    float: left;
    min-width: calc((1 / 3) * 100% - 4px);
    width: calc((1 / 3) * 100% - 4px);
    // height: 46px;
  }

  .keyboard-text.num:nth-child(4) {
    margin-right: 0;
  }

  .btn-delete {
    min-width: calc((2 / 3) * 100% - 4px);
    width: calc((2 / 3) * 100% - 4px);
  }
}

.keyboard-num-body-left {
  width: 70%;

  .keyboard-text.num {
    float: left;
    min-width: calc((1 / 7) * 100% - 4px);
    width: calc((1 / 7) * 100% - 4px);
    // height: 46px;
  }

  .keyboard-text.num:nth-child(4) {
    margin-right: 0;
  }
}

.btn-sure {
  text-shadow: 0px -6px 30px rgba(71, 77, 96, 0.06);
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8374a;
}

.result-body {
  width: 100%;
  box-sizing: border-box !important;
  display: flex;
  display: -webkit-flex;
}

.result-list {
  flex: 1;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  padding: 0;
  text-align: center;
  margin-right: 5px;
  height: 54px;
  line-height: 54px;
}

.result-list.active {
  border: 1px solid rgba(232, 55, 73, 0.4);
}

.result-list-new {
  background-image: url('./asstes/images/carbg-add.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

.result-list-new1 {
  background-image: url('./asstes/images/carbg-new.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

.result-list:last-child {
  margin-right: 0;
  max-width: calc(12.5% - 4.375px);
}

.visibility-hidden {
  visibility: hidden;
}

.disable-num {
  background-color: #c8ceda;
}
</style>
