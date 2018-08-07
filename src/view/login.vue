<template>
  <div class="login">
    <el-form ref="form" :model="form" class="form">
      <h1>青海湖畔后台管理系统</h1>
      <el-form-item label="账号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        form: {
          name: null,
          password: null
        }
      };
    },
    mounted() {},
    methods: {
      onSubmit() {
        if (this.form.name == 'admin' && this.form.password == 'qinghaihupan') {
          this.$router.push({ path: 'index' })
        } else {
          this.$message({
            message: '账号密码错误，请重新输入',
            center: true
          });
        }
      }
    }
  };
</script>
<style scoped>
  .form h1 {
    font-size: 20px;
    text-align: center;
  }

  .form {
    width: 500px;
    background: #fff;
    margin: 50px auto;
    padding: 20px;
  }

  .login {
    overflow: hidden;
    height: 100%;
    background: #2979ff;
  }
</style>