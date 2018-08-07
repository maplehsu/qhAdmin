<template>
  <el-aside width="270px">
    <el-menu router :default-active="this.$route.path">
      <el-menu-item  v-for="item in url" :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
         url: [{
           title: '路线管理',
           path: '/index',
           index: 1,
           icon: 'el-icon-location fc-purple'
         }, {
           title: '预约订单',
           path: '/reserve',
           index: 2,
           icon: 'el-icon-tickets fc-green'
         }, {
           title: '轮播图',
           path: '/banner',
           index: 2,
           icon: 'el-icon-picture fc-green'
         }]
      };
    },
    mounted() {
    },
    methods: {
    }
  };
</script>
<style scoped>
</style>