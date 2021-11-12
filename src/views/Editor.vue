<template>
  <div id="vditor"></div>
  <el-button type="primary" @click="dialogVisible = true" class="save">
    保存
  </el-button>
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
    </el-form>
    <el-form-item>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm"> 确 定 </el-button>
    </el-form-item>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { inject, onMounted } from "@vue/runtime-core";
import Vditor from "vditor";
import { useStore } from "vuex";
import axios from "axios";
import { getCurrentInstance } from "vue";
const http: any = inject("$http");
const mdEditor = ref<Vditor>();
const dialogVisible = ref(false);
const store = useStore();
const meta = reactive({
  title: "",
  category: "",
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

const proxy = getCurrentInstance()?.proxy

onMounted(() => {
  mdEditor.value = new Vditor("vditor", {
    placeholder: "请这里创作",
    icon: "material",
    counter: {
      enable: true,
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
});
const ruleForm = ref();
const confirm = () => {
  ruleForm.value.validate(async (valid: any) => {
    if (valid) {
      dialogVisible.value = false;
      if (mdEditor.value)
      proxy.$http.saveArticle({
            title: meta.title,
            dir: meta.category,
            content: mdEditor.value.getValue(),
          }).then((res: any) => console.log(res))
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
.el-button.save {
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
