<template>
  <el-container>
    <mNav></mNav>
    <el-container>
      <el-header height="70px">后台管理系统</el-header>
      <el-main>
        <div class="box">
          <el-row>
            <el-button type="primary" @click="addForm = true" class="btn-add">添加车辆信息</el-button>
            <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'creatTime', order: 'descending'}">
              <el-table-column prop="creatTime" label="创建时间">
              </el-table-column>
              <el-table-column prop="title" label="车辆型号">
              </el-table-column>
              <el-table-column prop="cover" label="封面">
                　<template scope="scope">
              　　　　<img v-for="img in scope.row.cover" :src="img.url" width="50" height="50">
              　　</template>
              </el-table-column>
              <el-table-column prop="price" label="车辆价格">
              </el-table-column>
              <el-table-column prop="notice" label="车辆描述">
              </el-table-column>
              <el-table-column prop="zuoweiValue" label="几人座位">
              </el-table-column>
              <el-table-column prop="caozuoValue" label="操作方式">
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
    <el-dialog title="添加车辆信息" width="60%" :visible.sync="addForm">
      <el-form :model="form">
        <el-form-item label="车辆型号" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入车辆型号"></el-input>
        </el-form-item>
        <el-form-item label="车辆封面" :label-width="formLabelWidth">
          <el-upload :action="coverUrl" :limit="5" :on-success="coverSuccess" style="text-align:left">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，最多上传5张</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="每天单价" :label-width="formLabelWidth">
          <el-input type="number" placeholder="元为单位" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="车辆介绍" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" height="200px" placeholder="请输入车辆介绍" v-model="form.notice"></el-input>
        </el-form-item>
        <el-form-item label="几人座位" :label-width="formLabelWidth">
          <el-select v-model="form.zuoweiValue" placeholder="请选择">
            <el-option
              v-for="item in zuowei"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手动还是自动" :label-width="formLabelWidth">
          <el-select v-model="form.caozuoValue" placeholder="请选择">
            <el-option
              v-for="item in caozuo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addForm = false">取 消</el-button>
        <el-button type="primary" @click="addSave">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑路线" width="60%" :visible.sync="editForm">
      <el-form :model="formEdit">
        <el-form-item label="车辆型号" :label-width="formLabelWidth">
          <el-input v-model="formEdit.title" placeholder="请输入车辆型号"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload ref="editUpload" :action="coverUrl" :limit="5" :on-remove="coverClear" :on-success="coverEditSuccess" style="text-align: left" :file-list="formEdit.cover">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">如果需要替换图片，请先删除已上传图片。</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="每天单价" :label-width="formLabelWidth">
          <el-input type="number" placeholder="元为单位" v-model="formEdit.price"></el-input>
        </el-form-item>
        <el-form-item label="车辆介绍" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" height="200px" placeholder="请输入车辆介绍" v-model="formEdit.notice"></el-input>
        </el-form-item>
        <el-form-item label="几人座位" :label-width="formLabelWidth">
          <el-select v-model="formEdit.zuoweiValue" placeholder="请选择">
            <el-option
              v-for="item in zuowei"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手动还是自动" :label-width="formLabelWidth">
          <el-select v-model="formEdit.caozuoValue" placeholder="请选择">
            <el-option
              v-for="item in caozuo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
          notice: '',
          zuoweiValue: '',
          caozuoValue: '',
        },
        formEdit: {},
        formLabelWidth: '120px',
        zuowei:[{
          value: '1',
          label: '1人座位'
        },{
          value: '2',
          label: '2人座位'
        },{
          value: '3',
          label: '3人座位'
        },{
          value: '4',
          label: '4人座位'
        },{
          value: '5',
          label: '5人座位'
        },{
          value: '6',
          label: '6人座位'
        },{
          value: '7',
          label: '7人座位'
        },{
          value: '8',
          label: '8人座位'
        },{
          value: '9',
          label: '9人座位'
        }],
        caozuo: [{
          value: 'sd',
          label: '手动挡'
        },{
          value: 'zd',
          label: '自动挡'
        }]
      };
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.axios.get(this.api.getCarList).then(res => {   
          this.tableData = res.data
        })
      },
      addSave() {
        this.axios.post(this.api.addCar, this.form).then(res => {
          if (res.status == 200) {
            this.addForm = false
            this.$message('添加成功')
            this.init()
          }
        })
      },
      editSave() {
        this.axios.post(this.api.editCar, this.formEdit).then(res => {
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
          this.axios.post(this.api.deleteCar, {
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
        this.formEdit.cover = []
      },
      coverEditSuccess(res, file) {
        this.formEdit.cover.push({
          name: res.filename,
          url: process.env.API_ROOT + '/' + res.filename
        })
      },
      openEdit(row) {        
        this.axios.post(this.api.getCar, {
          carID: row.carID
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