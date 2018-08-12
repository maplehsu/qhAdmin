<template>
  <el-container>
    <mNav></mNav>
    <el-container>
      <el-header height="70px">环线介绍</el-header>
      <el-main>
        <div class="box">
          <el-row>
            <el-button type="primary" @click="addLoopModal" class="btn-add">添加环线</el-button>
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
    <el-dialog title="添加环线" width="60%" :visible.sync="addForm">
      <el-form :model="form">
        <el-form-item label="环线标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload ref="addupload" :action="coverUrl" :limit="1" :on-success="coverSuccess" style="text-align:left">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="环线简介" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" height="200px" placeholder="请输入简介" v-model="form.notice"></el-input>
        </el-form-item>
        <el-form-item label="环线价格" :label-width="formLabelWidth">
          <el-input type="number" placeholder="元为单位" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="环线环节" :label-width="formLabelWidth">
          <el-button size="small" @click="addLook" type="primary">添加环节</el-button>
        </el-form-item>
        <el-form-item label="环节" :label-width="formLabelWidth" v-show="link">
          <div><el-input v-model="linkData.title" placeholder="请输入标题"></el-input></div>
          <div style="margin-top:10px;margin-bottom:10px"><el-input v-model="linkData.content" type="textarea" placeholder="请输入详情"></el-input></div>
          <el-upload ref="linkupload" :action="coverUrl" :limit="1" :on-success="linkSuccess" style="text-align:left">
            <el-button size="small" type="primary">上传环节封面</el-button>
          </el-upload>
          <div style="text-align: center; margin-top:10px">
            <el-button type="primary" class="el-button--small" @click="addLink">添加</el-button>
            <el-button class="el-button--small" @click="resetLink">重置</el-button>
          </div>
          <ul class="look-info">
            <li class="clearfix" v-for="(link, index) in form.loopList" :key="index">
              <img :src="link.url" alt="">
              <div>{{link.title}}</div>
              <div>{{link.content}}</div>
            </li>
          </ul>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-checkbox v-model="advertising">是否是广告</el-checkbox>
          <div v-show="advertising">
            <el-input style="margin-top:10px" v-model="form.adData.name" placeholder="请输入广告主姓名"></el-input>
            <el-input style="margin-top:10px" v-model="form.adData.wechat" placeholder="请输入广告主微信号"></el-input>
            <el-input style="margin-top:10px" v-model="form.adData.phone" placeholder="请输入广告主手机号"></el-input>
            <el-input style="margin-top:10px" v-model="form.adData.email" placeholder="请输入广告主邮箱"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addForm = false">取 消</el-button>
        <el-button type="primary" @click="addSave">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑环线" width="60%" :visible.sync="editForm">
      <el-form :model="formEdit">
        <el-form-item label="环线标题" :label-width="formLabelWidth">
          <el-input v-model="formEdit.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload ref="addupload" :action="coverUrl" :limit="1" :on-remove="coverClear" :on-success="coverEditSuccess" style="text-align:left" :file-list="formEdit.cover">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="环线简介" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" height="200px" placeholder="请输入简介" v-model="formEdit.notice"></el-input>
        </el-form-item>
        <el-form-item label="环线价格" :label-width="formLabelWidth">
          <el-input type="number" placeholder="元为单位" v-model="formEdit.price"></el-input>
        </el-form-item>
        <el-form-item label="环线环节" :label-width="formLabelWidth">
          <el-button size="small" @click="addLook" type="primary">添加环节</el-button>
        </el-form-item>
        <el-form-item label="环节" :label-width="formLabelWidth" v-show="link">
          <div><el-input v-model="linkEditData.title" placeholder="请输入标题"></el-input></div>
          <div style="margin-top:10px;margin-bottom:10px"><el-input v-model="linkEditData.content" type="textarea" placeholder="请输入详情"></el-input></div>
          <el-upload ref="linkupload" :action="coverUrl" :limit="1" :on-success="linkEditSuccess" style="text-align:left">
            <el-button size="small" type="primary">上传环节封面</el-button>
          </el-upload>
          <div style="text-align: center; margin-top:10px">
            <el-button type="primary" class="el-button--small" @click="addEditLink">添加</el-button>
            <el-button class="el-button--small" @click="resetLink">重置</el-button>
          </div>
          <ul class="look-info">
            <li class="clearfix" v-for="(link, index) in formEdit.loopList" :key="index">
              <img :src="link.url" alt="">
              <div>{{link.title}}</div>
              <div>{{link.content}}</div>
            </li>
          </ul>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" v-if="formEdit.adData">
          <el-checkbox v-model="advertising">是否是广告</el-checkbox>
          <div v-show="advertising">
            <el-input style="margin-top:10px" v-model="formEdit.adData.name" placeholder="请输入广告主姓名"></el-input>
            <el-input style="margin-top:10px" v-model="formEdit.adData.wechat" placeholder="请输入广告主微信号"></el-input>
            <el-input style="margin-top:10px" v-model="formEdit.adData.phone" placeholder="请输入广告主手机号"></el-input>
            <el-input style="margin-top:10px" v-model="formEdit.adData.email" placeholder="请输入广告主邮箱"></el-input>
          </div>
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
        link: false,
        advertising: false,
        tableData: null,
        route: null,
        coverUrl: this.api.upload,
        form: {
          title: '',
          cover: [],
          price: '',
          notice: '',
          loopList: [],
          adData: {
            name: '',
            wechat: '',
            phone: '',
            email: ''
          }
        },
        linkData: {
          title: '',
          content: '',
          url: ''
        },
        linkEditData: {
          title: '',
          content: '',
          url: ''
        },
        formEdit: {},
        formLabelWidth: '120px'
      };
    },
    mounted() {
      this.init()
    },
    methods: {
      addLoopModal () {
        this.addForm = true
        if(this.form.title != '') {
          this.form = {
            title: '',
            cover: [],
            price: '',
            notice: '',
            loopList: []
          }
          this.$refs.addupload.clearFiles()
          this.resetLink()
          this.link = false
        }
      },
      init() {
        this.axios.get(this.api.getLoopList).then(res => {          
          this.tableData = res.data
        })
      },
      addLook() {
        if(this.link) {
          this.link = false
          this.resetLink()
        } else {
          this.link = true
        }
      },
      resetLink () {
        this.form.loopList = []
        this.linkData = {}
        this.$refs.linkupload.clearFiles()
      },
      addLink() {
        this.form.loopList.push(Object.assign({}, this.linkData))
      },
      addEditLink() {
        this.formEdit.loopList.push(Object.assign({}, this.linkEditData))
      },
      openEdit(row) {        
        console.log(row);
        this.axios.post(this.api.getLoop, {
          loopID: row.loopID
        }).then(res => {
          this.editForm = true
          this.formEdit = res.data[0]
        })
      },
      linkEditSuccess(res, file) {        
        this.linkEditData.url = process.env.API_ROOT + '/' + res.filename
      },
       linkSuccess(res, file) {        
        this.linkData.url = process.env.API_ROOT + '/' + res.filename
      },
      addSave() {
        this.axios.post(this.api.addLoop, this.form).then(res => {
          if (res.status == 200) {
            this.addForm = false
            this.$message('添加成功')
            this.init()
          }
        })
      },
      editSave() {
        this.axios.post(this.api.editLoop, this.formEdit).then(res => {
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
          this.axios.post(this.api.deleteLoop, {
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
      }
    }
  };
</script>
<style scoped>
  .btn-add {
    float: left;
    margin-bottom: 20px;
  }

  .look-info {
    margin-top: 20px;
  }

  .look-info img {
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }

  .look-info li {
    display: flex;
    margin-bottom: 10px;
  }

  .look-info div {
    flex: 1;
    height: 42px;
    overflow: hidden;
    line-height: 1.6;
  }
</style>