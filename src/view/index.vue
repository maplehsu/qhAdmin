<template>
  <el-container>
    <mNav></mNav>
    <el-container>
      <el-header height="70px">后台管理系统</el-header>
      <el-main>
        <div class="box">
          <el-row>
            <el-button type="primary" @click="addForm = true" class="btn-add">添加路线</el-button>
            <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'creatTime', order: 'descending'}">
              <el-table-column prop="creatTime" label="时间">
              </el-table-column>
              <el-table-column prop="title" label="标题">
              </el-table-column>
              <el-table-column prop="cover" label="封面">
                　<template scope="scope">
              　　　　<img v-for="img in scope.row.cover" :src="img.url" width="50" height="50">
              　　</template>
              </el-table-column>
              <el-table-column prop="price" label="价格">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="openEdit(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="openDelete(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="添加路线" width="60%" :visible.sync="addForm">
      <el-form :model="form">
        <el-form-item label="路线标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload :action="coverUrl" :limit="1" :on-success="coverSuccess" style="text-align:left">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="路线价格" :label-width="formLabelWidth">
          <el-input type="number" placeholder="元为单位" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="路线公告" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" height="200px" placeholder="请输入公告" v-model="form.notice"></el-input>
        </el-form-item>
        <el-form-item label="线路介绍" :label-width="formLabelWidth">
          <quill-editor v-model="form.content" :options="editorOption">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addForm = false">取 消</el-button>
        <el-button type="primary" @click="addSave">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑路线" width="60%" :visible.sync="editForm">
      <el-form :model="formEdit">
        <el-form-item label="路线标题" :label-width="formLabelWidth">
          <el-input v-model="formEdit.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload ref="editUpload" :action="coverUrl" :limit="1" :on-remove="coverClear" :on-success="coverEditSuccess" style="text-align: left" :file-list="formEdit.cover">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">如果需要替换图片，请先删除已上传图片。</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="路线价格" :label-width="formLabelWidth">
          <el-input type="number" placeholder="元为单位" v-model="formEdit.price"></el-input>
        </el-form-item>
        <el-form-item label="路线公告" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" height="200px" placeholder="请输入公告" v-model="formEdit.notice"></el-input>
        </el-form-item>
        <el-form-item label="线路介绍" :label-width="formLabelWidth">
          <quill-editor v-model="formEdit.content" :options="editorOption">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm = false">取 消</el-button>
        <el-button type="primary" @click="editSave">保 存</el-button>
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
          cover: [],
          price: '',
          notice: '本产品同样适用于公司单位独立成团，如您的出行人数大于9人，又或者您有特殊的订制需求，那么请将您的详细需求发送到指定邮箱：xxxxxxxxxxx@xxx.com，稍后将有专业的产品旅游规划师亲自为您处理，感谢选择与信赖！',
          content: ''
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
        this.axios.get(this.api.getPathList).then(res => {   
          console.log(res, "ressss")       
          this.tableData = res.data
        })
      },
      addSave() {
        this.axios.post(this.api.addPath, this.form).then(res => {
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
          this.axios.post(this.api.deletePath, {
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
        this.form.cover.push({
          name: res.filename,
          url: process.env.API_ROOT + '/' + res.filename
        })
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
        this.axios.post(this.api.getPath, {
          pathID: row.pathID
        }).then(res => {
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