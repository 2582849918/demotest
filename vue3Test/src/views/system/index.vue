<template>
  <div class="system flex flex-col">
    <v-header title="Test query" type="2" @request="request" />

    <div class="content flex flex-col">
      <div class="bg">
        <div class="tab container">
          <n-tabs
            type="card"
            placement="left"
            size="large"
            animated
            @update:value="tabClick"
          >
            <n-tab-pane
              v-for="item in tabs"
              :key="item.tit"
              @click="tabClick"
              :name="item.key"
              :tab="item.tit"
            >
              <div class="search">
                <n-input placeholder="Search" size="large">
                  <template #prefix> </template>
                </n-input>
              </div>
              <n-checkbox-group
                :value="checkbox"
                @update:value="handleUpdateValue"
              >
                <n-grid :y-gap="8" :cols="4">
                  <n-gi v-for="item in checkList" :key="item">
                    <n-checkbox :value="item" :label="item" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>

      <div class="list">
        <n-data-table
          :loading="loading"
          style="height: 100%"
          :flex-height="true"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :row-key="rowKey"
          @update:checked-row-keys="handleCheck"
        />
      </div>
    </div>

    <n-modal
      style="
        width: 60%;
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
      "
      v-model:show="showModal"
      preset="card"
      title="详情"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    >
      内容
    </n-modal>
  </div>
</template>

<script setup>
import { h, reactive, ref } from "vue";
import vHeader from "@/components/vHeader.vue";
import { NButton, useMessage } from "naive-ui";
import { useRouter } from "vue-router";

const tabs = ref([
  { tit: "New Module", key: "1" },
  { tit: "old Module", key: "2" },
  { tit: "Other Moduel", key: "3" },
]);
const currentTab = ref("最近更新");

const columns = [
  {
    type: "selection",
    // disabled(row) {
    //   return row.name === "Edward King 3";
    // },
  },
  {
    title: "Test Report",
    key: "name",
    className: "report",
  },
  {
    title: "Platform",
    key: "age",
    className: "platform",
  },
  {
    title: "Status",
    key: "address",
    className: "status",
  },
  {
    title: "Test Result (Pass/fal)",
    className: "result",
    key: "result",
    title(column) {
      const tit = [
        h("span", "Test Result ("),
        h("span", { style: { color: "#18a058" } }, "Pass"),
        h("span", "/"),
        h("span", { style: { color: "red" } }, "Fal"),
        h("span", ")"),
      ];
      return tit;
    },
    render(row) {
      const tit = [
        h("span", { style: { color: "#18a058" } }, row.result.split("/")[0]),
        h("span", "/"),
        h("span", { style: { color: "red" } }, row.result.split("/")[1]),
      ];
      return tit;
    },
  },
  {
    title: "Operation",
    key: "operation",
    className: "operation",
    render(row) {
      const btn = [
        h(
          NButton,
          {
            style: { marginRight: "10px" },
            size: "small",
            onClick: () => download(row),
          },
          { default: () => "下载" }
        ),
        h(
          NButton,
          {
            size: "small",
            onClick: () => getRowData(row),
          },
          { default: () => "查看" }
        ),
      ];
      return btn;
    },
  },
];

const loading = ref(false);
const showModal = ref(false);

const getRowData = (rowData) => {
  showModal.value = true;
  console.log("rowData::: ", rowData);
};
const download = (rowData) => {
  // console.log("rowData::: ", rowData);
};
const submitCallback = () => {};
const cancelCallback = () => {};

const checkList = Array.from({ length: 10 }).map(
  (_, index) => `Edward King ${index}`
);

const data = Array.from({ length: 46 }).map((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
  result: `25/8`,
}));

const rowKey = (row) => row.address;

const checkbox = ref([]);

const checkedRowKeysRef = ref([]);

const pagination = reactive({
  page: 2,
  pageSize: 12,
  onChange: (page) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});

const handleUpdateValue = (value) => {
  console.log("value::: ", value);
  checkbox.value = value;
};

const message = useMessage();
const router = useRouter();

function request() {
  if (!checkedRowKeysRef.value.length)
    return message.info("Please select data");
  router.push("/testing");
}

const tabClick = (tabName) => {
  if (typeof tabName !== "string") return;
  currentTab.value = tabName;
};

function handleCheck(rowKeys) {
  checkedRowKeysRef.value = rowKeys;
}

const formValue = reactive({
  message: "",
});
</script>

<style lang="scss" scoped>
.system {
  height: 100%;

  header {
    background-color: #e9edf0;
  }
  .bg {
    background-color: #e9edf0;
  }

  .content {
    flex: 1;
    .tab {
      background-color: #e9edf0;
      :deep(.n-checkbox-group) {
        margin-bottom: 15px;
      }
      ::v-deep
        .n-tabs
        .n-tabs-nav.n-tabs-nav--left.n-tabs-nav--card-type
        .n-tabs-tab {
        font-size: 18px !important;
        background-color: #e9edf0;
        border-right: 2px solid #18a058;
      }
      ::v-deep
        .n-tabs
        .n-tabs-nav.n-tabs-nav--card-type
        .n-tabs-tab.n-tabs-tab--active {
        border: 2px solid;
        border-right: none;
      }
      ::v-deep .n-tabs-tab-pad {
        height: 0 !important;
      }
      ::v-deep .n-tabs-tab {
        height: 70px !important;
      }

      ::v-deep .n-input {
        height: 50px !important;
        border: 1px solid #18a058;
        border-right: 3px solid #18a058;
        border-left: 3px solid #18a058;
      }
      .search {
        margin-bottom: 20px;
      }
    }

    .list {
      width: 80%;
      margin: 20px auto;
      flex: 1;
      :deep(.n-data-table-wrapper) {
        height: 100%;
      }
      :deep(.result),
      :deep(.operation) {
        text-align: center;
      }
      :deep(.status .n-data-table-th__title),
      :deep(.result) .n-data-table-th__title,
      :deep(.platform .n-data-table-th__title),
      :deep(.report) .n-data-table-th__title,
      :deep(.operation .n-data-table-th__title) {
        font-size: 18px !important;
      }
    }
  }
}
</style>
