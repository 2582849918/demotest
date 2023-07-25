<template>
  <div class="system flex flex-col">
    <v-header title="Request For Testing" :type="0" @request="request" />

    <div class="content flex flex-col">
      <div class="tab container">
        <n-tabs
          type="card"
          placement="top"
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

      <div class="list flex-col flex">
        <div class="search">
          <div class="tit">Applicant Information Registration</div>
          <div class="input flex">
            <span>Purpose of Application：</span>
            <n-input v-model:value="formValue.desc" type="textarea" />
          </div>
        </div>
        <n-data-table
          :loading="loading"
          style="flex: 1"
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
import { NButton, useDialog, useMessage } from "naive-ui";

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
    title: "Text",
    key: "name",
    className: "report",
  },
  {
    title: "Operation",
    key: "operation",
    className: "operation",
    render(row) {
      return h(
        NButton,
        {
          style: { width: "100px", background: "#dfe7e9" },
          onClick: () => getRowData(row),
        },
        { default: () => "Detail" }
      );
    },
  },
  {
    // title: "Operation",
    title(column) {
      return h(
        NButton,
        {
          style: { width: "100px", background: "#dfe7e9" },
          onClick: () => apply(),
        },
        { default: () => "Apply" }
      );
    },
    key: "operation",
    className: "operation",
  },
];
const dialog = useDialog();

const apply = () => {
  if (!checkedRowKeysRef.value.length)
    return message.info("Please select data");
  dialog.success({
    title: "提示",
    content: "你确定？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      message.success("确定");
    },
    onNegativeClick: () => {
      message.error("不确定");
    },
  });
};

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
  page: 1,
  pageSize: 7,
  onChange: (page) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});

const checkList = Array.from({ length: 10 }).map(
  (_, index) => `Edward King ${index}`
);

const handleUpdateValue = (value) => {
  console.log("value::: ", value);
  checkbox.value = value;
};

const message = useMessage();
function request() {
  if (!checkedRowKeysRef.value.length)
    return message.info("Please select data");
}

const tabClick = (tabName) => {
  if (typeof tabName !== "string") return;
  currentTab.value = tabName;
};

function handleCheck(rowKeys) {
  checkedRowKeysRef.value = rowKeys;
}

const formValue = reactive({
  desc: "",
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
    background-color: #f6f6f6;
    .tab {
      margin-top: 30px;
      :deep(.n-checkbox-group) {
        margin-bottom: 15px;
      }
      :deep(.n-tab-pane) {
        margin-bottom: 10px;
      }
      :deep(.n-tabs-nav-scroll-content) {
        border-bottom: 2px solid #18a058;
      }
      ::v-deep
        .n-tabs
        .n-tabs-nav.n-tabs-nav--card-type
        .n-tabs-tab.n-tabs-tab--active {
        border: 2px solid;
        border-bottom: none;
      }
      ::v-deep .n-tabs-tab-pad {
        height: 0 !important;
      }
      ::v-deep .n-tabs-tab {
        font-size: 18px !important;
        background-color: #f6f6f6;
        height: 70px !important;
      }
    }

    .list {
      width: 80%;
      margin: 0 auto 30px;
      flex: 1;

      .search {
        .tit {
          font-size: 18px;
          border-top: 2px solid #18a058;
          padding-top: 15px;
        }
        .input {
          margin: 20px 0;
          span {
            width: 15%;
          }

          :deep(.n-input) {
            // flex: 1;ss
          }
        }
      }
      :deep(.status .n-data-table-th__title),
      :deep(.result) .n-data-table-th__title,
      :deep(.platform .n-data-table-th__title),
      :deep(.report) .n-data-table-th__title,
      :deep(.operation .n-data-table-th__title) {
        font-size: 18px !important;
      }

      :deep(.operation) {
        text-align: center;
      }
    }
  }
}
</style>
