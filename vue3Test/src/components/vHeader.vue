<template>
  <header class="flex-center">
    <div class="logo">
      <img src="https://www.naiveui.com/assets/naivelogo-93278402.svg" alt="" />
    </div>
    <div class="title">{{ title }}</div>
    <div class="operation">
      <template v-if="type">
        <n-dropdown :options="options" v-if="type == 1">
          <span>ADMIN</span>
        </n-dropdown>

        <div
          class="btn flex y-center x-center"
          v-else
          @click="$emit('request')"
        >
          Request For Testing
        </div></template
      >
    </div>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: [String, Number],
      default: 1,
    },
  },
  setup() {
    return {
      options: [
        {
          label: "退出登录",
          key: "logout",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  padding: 15px;
  font-size: 18px;

  .logo {
    width: 50px;
    height: 50px;
  }

  .btn {
    cursor: pointer;
    background-color: #557a82;
    height: 50px;
    padding: 0 20px;
  }
}
</style>
