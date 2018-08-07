<template>
  <el-container>
    <mNav></mNav>
    <el-container>
      <el-header height="70px">后台管理系统</el-header>
      <el-main>
        <div class="box">
          <el-row>
            <el-button type="primary" @click="addForm = true" class="btn-add">添加轮播图</el-button>
            <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'creatTime', order: 'descending'}">
              <el-table-column prop="title" label="标题">
              </el-table-column>
              <el-table-column prop="des" label="描述">
              </el-table-column>
              <el-table-column prop="url" label="封面">
                　<template scope="scope">
              　　　　<img :src="scope.row.url" width="50" height="50">
              　　</template>
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
    <el-dialog title="添加轮播图" width="60%" :visible.sync="addForm">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" height="500px" placeholder="请输入描述" v-model="form.des"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload :action="coverUrl" :limit="1" :on-success="coverSuccess" style="text-align:left">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addForm = false">取 消</el-button>
        <el-button type="primary" @click="addSave">保 存</el-button>
      </div>
    </el-dialog>
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
        addForm: false,
        editForm: false,
        tableData: null,
        route: null,
        coverUrl: this.api.upload,
        editorOption: {
          modules: {
            toolbar: [
              [{
                'align': []
              }],
              ['image']
            ],
          }
        },
        form: {
          title: '',
          url: '',
          des: ''
        },
        formEdit: {},
        formLabelWidth: '120px'
      };
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.axios.get(this.api.getBannerList).then(res => {  
          this.tableData = res.data
        })
      },
      addSave() {
        this.axios.post(this.api.addBanner, this.form).then(res => {
          if (res.status == 200) {
            this.addForm = false
            this.$message('添加成功')
            this.init()
          }
        })
      },
      editSave() {
        this.axios.post(this.api.editPath, this.formEdit).then(res => {
          if (res.status == 200) {
            this.editForm = false
            this.$message('修改成功')
            this.init()
          }
        })
      },
      openDelete(row) {        
        this.$confirm('是否删除本条数据?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {    
          this.axios.post(this.api.deleteBanner, {
            _id: row._id
          }).then(res => {      
            if (res.status == 200) {
              this.$message('删除成功')
              this.init()
            }
          })
        })
      },
      coverSuccess(res, file) {        
        this.form.url = process.env.API_ROOT + '/' + res.filename
      },
      coverClear(file, fileList)  {
        this.$refs.editUpload.clearFiles();
      },
      coverEditSuccess(res, file) {
        this.formEdit.cover = []
        this.formEdit.cover.push({
          name: res.filename,
          url: process.env.API_ROOT + '/' + res.filename
        })
      },
      openEdit(row) {
        this.axios.post(this.api.getBanner, {
          bannerID: row.bannerID
        }).then(res => {
          console.log(typeof(res.data[0].url));
          
          this.editForm = true
          this.formEdit = res.data[0]
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