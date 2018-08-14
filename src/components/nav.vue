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
           title: '微信-路线管理',
           path: '/index',
           index: 1,
           icon: 'el-icon-location fc-purple'
         }, {
           title: '微信-预约订单',
           path: '/reserve',
           index: 2,
           icon: 'el-icon-tickets fc-green'
         }, {
           title: '我是分割线',
           path: '',
           index: 3,
           icon: ''
         }, {
           title: 'pc-环线介绍',
           path: '/loop',
           index: 4,
           icon: 'el-icon-picture fc-green'
         }, {
           title: 'pc-旅游攻略',
           path: '/strategy',
           index: 5,
           icon: 'el-icon-picture fc-green'
         }, {
           title: 'pc-环线预定',
           path: '/loopReserve',
           index: 6,
           icon: 'el-icon-picture fc-green'
         }, {
           title: 'pc-联系我们',
           path: '/contact',
           index: 7,
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