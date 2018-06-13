<template>
  <el-container>
    <mNav></mNav>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-row>
          <el-button type="primary" @click="addForm = true">添加路线</el-button>
          <el-dialog title="添加路线" width="60%" :visible.sync="addForm">
            <el-form :model="form">
              <el-form-item label="路线标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="路线价格" :label-width="formLabelWidth">
                <el-input type="number" placeholder="元为单位" v-model="form.price"></el-input>
              </el-form-item>
              <el-form-item label="路线公告" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" placeholder="请输入公告" v-model="form.notice"></el-input>
              </el-form-item>
              <el-form-item label="线路介绍" :label-width="formLabelWidth">
                <quill-editor ref="myTextEditor"
                  v-model="form.content"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
                </quill-editor>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addForm = false">取 消</el-button>
              <el-button type="primary" @click="addSave">保 存</el-button>
            </div>
          </el-dialog>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="时间">
            </el-table-column>
            <el-table-column prop="name" label="标题">
            </el-table-column>
            <el-table-column prop="province" label="封面">
            </el-table-column>
            <el-table-column prop="city" label="价格">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
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
        addForm: false,
        tableData: null,
        route: null,
        editorOption: {
          modules: {
            toolbar: [
              [{ 'align': [] }],
              ['image']
            ],
          }
        },
        form: {
          title: '',
          price: '',
          notice: '',
          content: ''
        },
        formLabelWidth: '120px'
      };
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
      },
      addSave() {
        this.axios.post(this.api.addPath, this.form).then(res => {
          console.log(res);
        })
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      handleClick(row) {
        console.log(row);
      }
    }
  };
</script>
<style scoped>
</style>