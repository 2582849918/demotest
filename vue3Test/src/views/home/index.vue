<template>
  <div class="system flex flex-col">
    <v-header title="MTS System" />

    <div class="container flex flex-col">
      <div class="desc">
        <img src="@/assets/home/desc.png" alt="" />
      </div>

      <div class="nav">
        <div class="nav-tit">Click here to access the service</div>
        <div class="nav-list flex x-between">
          <div
            class="item flex y-center x-center"
            v-for="item in navs"
            :key="item.url"
          >
            <router-link :to="item.url">{{ item.tit }}</router-link>
          </div>
        </div>
      </div>

      <div class="list">
        <n-tabs
          type="line"
          size="large"
          class="flex flex-col"
          animated
          @update:value="tabClick"
        >
          <n-tab-pane
            v-for="item in tabs"
            :key="item"
            @click="tabClick"
            :name="item"
            :tab="item"
          >
            <div class="article" v-if="currentTab == '最近更新'">
              <ol>
                <li v-for="i in 15" :key="i">
                  <span>{{ i }}. </span>
                  <span
                    >Generate Test Suite From Document新增preview pdf文件功能
                  </span>
                  <span class="time"> (2023/7/20) </span>
                </li>
              </ol>
            </div>
            <div class="msg flex flex-col" v-else>
              <n-input
                v-model:value="formValue.message"
                placeholder="请输入评价"
                type="textarea"
              />
              <div class="btn flex x-end">
                <n-button style="margin-right: 15px">重置</n-button>
                <n-button type="primary">提交</n-button>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import vHeader from "@/components/vHeader.vue";
import { reactive, ref } from "vue";

const navs = ref([
  { tit: "Test Request & TestReport System", url: "/system" },
  { tit: "Generate Test SuiteFrom Document", url: "" },
  { tit: "Generate Test SuiteFrom Test Design", url: "" },
]);
const tabs = ref(["最近更新", "评价反馈"]);
const currentTab = ref("最近更新");

const tabClick = (tabName) => {
  if (typeof tabName !== "string") return;
  currentTab.value = tabName;
};

const options = ref([
  {
    label: "退出登录",
    key: "logout",
  },
]);

const formValue = reactive({
  message: "",
});
</script>

<style lang="scss" scoped>
.system {
  height: 100%;
  background-color: #e9edf0;

  .container {
    flex: 1;
    .nav {
      margin: 30px 0 15px;
      &-tit {
        font-size: 16px;
        margin-bottom: 10px;
      }
      &-list {
        gap: 20px;
        .item {
          width: 25%;
          min-height: 70px;
          padding: 15px 0;
          text-align: center;
          background: linear-gradient(to top, #ffffff, #e9edf6);
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
        }
      }
    }

    .list {
      flex: 1;
      // background-color: pink;
      ::v-deep
        .n-tabs
        .n-tabs-nav.n-tabs-nav--line-type.n-tabs-nav--top
        .n-tabs-nav-scroll-content {
        border-bottom: 1px solid gray;
      }

      .article {
        height: 400px;
        overflow-y: scroll;
        // &::-webkit-scrollbar {
        //   width: 0.5em;
        // }

        // &::-webkit-scrollbar-track {
        //   background: transparent;
        // }

        // &::-webkit-scrollbar-thumb {
        //   background: transparent;
        // }

        // &::-webkit-scrollbar-thumb:hover {
        //   background: transparent;
        // }
        li {
          margin-bottom: 15px;
          .time {
            font-size: 13px;
            margin-left: 10px;
          }
        }
      }

      .msg {
        height: 400px;
        ::v-deep .n-input.n-input--textarea {
          flex: 1;
        }
        .btn {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
