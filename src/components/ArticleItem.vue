<template>
  <div class="article-item" @click="$router.push(articleItem?.path)">
    <h1>{{ matter?.title }}</h1>
    <div class="meta">
      <i class="iconfont icon-ctime"></i>{{ format(matter?.ctime) }}
      <i class="iconfont icon-atime"></i> {{ format(matter?.atime) }}
      <i class="iconfont icon-category" v-if="matter?.categories"></i>
      <span v-for="c in matter?.categories" :key="c">{{ c }}</span>
    </div>
    <p>{{ matter.desc }}</p>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const props = defineProps({ articleItem: Object });
const matter = props.articleItem?.meta?.frontmatter;
const format = (d: string) => moment(d).utcOffset(0).format("YYYY-MM-DD");
</script>
<style lang="scss" scoped>
.article-item {
  background-color: #fff;
  margin: 16px 0;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 6px 12px 0px rgba(0, 68, 193, 0.08);
  .meta {
    .iconfont {
      margin: 0 8px 0 16px;
    }
    span:not(:last-child)::after {
      content: ">";
      margin: 0 4px;
    }
  }
  h1 {
    cursor: pointer;
  }
  p {
    text-indent: 2em;
    text-align: left;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis; /* 文本溢出时显示省略号来代表被修剪的文本 */
    display: -webkit-box; /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
    -webkit-box-orient: vertical; /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-line-clamp: 2; /* 文本需要显示多少行 */
  }
}
</style>
