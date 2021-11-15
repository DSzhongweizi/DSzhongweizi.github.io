<template>
  <div id="vditor"></div>
  <el-button type="primary" @click="dialogVisible = true" class="submit"
    >提交</el-button
  >
  <el-dialog title="文章元数据" v-model="dialogVisible" width="30%">
    <el-form ref="ruleForm" :model="meta" :rules="rules" label-width="80px">
      <el-form-item label="标题" label-width="4em" prop="title">
        <el-input v-model="meta.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="类别" label-width="4em" prop="category">
        <el-cascader
          v-model="meta.category"
          :options="store.state.categories"
          placeholder="请选择文章类别"
          filterable
        ></el-cascader>
        <!-- <el-input v-model="meta.tags"></el-input> -->
      </el-form-item>
      <el-form-item label="描述" label-width="4em" prop="desc">
        <el-input
          v-model="meta.desc"
          autosize
          rows="3"
          type="textarea"
          :placeholder="meta.desc"
        />
        <!-- <el-input v-model="meta.tags"></el-input> -->
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit('saved')" plain>保 存</el-button>
      <el-button type="primary" @click="submit('released')">发 布</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import {
  onMounted,
  getCurrentInstance,
  watchEffect,
  watch,
  computed,
} from "@vue/runtime-core";
import Vditor from "vditor";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import moment from "moment";
const route = useRoute();
const proxy = getCurrentInstance()?.proxy;
const mdEditor = ref<Vditor>();
const content = computed(() => mdEditor.value?.getValue());
const props = defineProps<{
  id: string;
}>();
// watch(content, (val) => console.log(val));
const dialogVisible = ref(false);
const store = useStore();
const meta = reactive({
  title: "",
  category: "",
  desc: computed(() =>
    content.value?.slice(0, 100)
      ? content.value?.slice(0, 100) + " ..."
      : "阿斯顿飞过"
  ),
});
const rules = reactive({
  title: [
    {
      required: true,
      message: "文章标题不能为空",
      trigger: "blur",
    },
  ],
  category: [
    {
      required: true,
      message: "文章类别不能为空",
      trigger: "blur",
    },
  ],
});
onMounted(async () => {
  mdEditor.value = new Vditor("vditor", {
    placeholder: "请这里创作",
    icon: "material",
    counter: {
      enable: true,
    },
    cache: {
      enable: true,
      id: "editing-article",
    },
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "|",
      "line",
      "quote",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "code",
      "inline-code",
      "insert-after",
      "insert-before",
      "undo",
      "redo",
      "upload",
      "link",
      "table",
      "record",
      "edit-mode",
      "both",
      "preview",
      "outline",
      "fullscreen",
      "code-theme",
      "content-theme",
      "export",
      "devtools",
      "info",
      "help",
      "br",
    ],
  });
  // await proxy.$http.queryArticle({ _id: props.id }).then((res) => {
  //   console.log(res);
  //   mdEditor.value.setValue(res.data);
  // });

  console.log(mdEditor.value);
});
const ruleForm = ref();
const submit = (op: string) => {
  ruleForm.value.validate(async (valid: any) => {
    if (valid && mdEditor.value) {
      let result = Promise.resolve();

      const data = Object.assign(
        {
          utime: moment().format("YYYY-MM-DD"),
          status: op,
          tags: [],
          content,
        },
        meta
      );
      if (props.id) {
        // 更新文章
        result = await proxy.$http.updateArticle({
          condition: props.id,
          data,
        });
      } else {
        // 新增文章
        result = await proxy.$http.addArticle(
          Object.assign({ ctime: moment().format("YYYY-MM-DD") }, data)
        );
      }
      console.log(result);
      // result.then((res) => {
      //   res.status == 200 &&
      //     ElMessage.success(op == "saved" ? "保存成功" : "发布成功");
      //   dialogVisible.value = false;
      // });
    }
  });
};
</script>
<style lang="scss" scoped>
#vditor {
  margin-top: 0.5em;
  height: 100%;
}
.meta {
  position: absolute;
  background-color: #aaa;
  padding: 16px;
  width: 200px;
  left: -220px;
}
.el-button.submit {
  position: absolute;
  z-index: 102;
  bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
}
</style>
<style>
.el-dialog__body {
  padding-bottom: 1px;
}
.el-cascader {
  width: 100%;
}
</style>
