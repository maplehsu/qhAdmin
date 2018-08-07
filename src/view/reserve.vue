<template>
  <el-container>
    <mNav></mNav>
    <el-container>
      <el-header height="70px">Header</el-header>
      <el-main>
        <div class="box">
          <el-row>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="creatTime" label="创建时间">
              </el-table-column>
              <el-table-column prop="title" label="标题">
              </el-table-column>
              <el-table-column prop="userName" label="游客姓名">
              </el-table-column>
              <el-table-column prop="phone" label="手机号">
              </el-table-column>
              <el-table-column prop="number" label="组团人数">
              </el-table-column>
              <el-table-column prop="startTime" label="出发时间">
              </el-table-column>
              <el-table-column prop="endTime" label="到达时间">
              </el-table-column>
              <el-table-column prop="remark" label="备注">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="openDelete(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import mNav from "@/components/nav";
  export default {
    components: {
      mNav
    },
    data() {
      return {
        tableData: null,
        formLabelWidth: '120px'
      };
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.axios.get(this.api.getReserve).then(res => {
          this.tableData = res.data
        })
      },
      openDelete(row) {
        this.$confirm('是否删除本条数据?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {          
          this.axios.post(this.api.deleteReserve, {
            _id: row._id
          }).then(res => {         
            if (res.status == 200) {
              this.$message('删除成功')
              this.init()
            }
          })
        })
      }
    }
  };
</script>
<style scoped>
  .btn-add {
    float: left;
    margin-bottom: 20px;
  }
</style>