<template>
  <div class="decoration-container flexible">
    <div class="drag-content">
      <div class="content">
        <div class="drag-header">模块列表</div>
          <draggable class="drag-list clearfix" :value="listItems" :options="{ sort: false, animation: 300, handle: '.drag-item', group: 'move' }" :clone="cloneItem" :move="moveItem" @end="enddragList">
            <div class="drag-item" v-for="(item, index) in listItems" :key="index">
              <div class="m">
                <i :class="item.icon"></i>
              </div>
              <p class="n">{{item.name}}</p>
            </div>
          </draggable>
      </div>
    </div>
    <div class="phone-container">
      <div class="phone">
        <div class="page-title">{{ pageTitle }}</div>
          <draggable class="page-content" :list="showList" :options="{ sort: true, animation: 300, handle: '.config-container', group: 'move' }">
            <div class="config-container" v-for="(item, index) in showList" :key="index" @click="changethisconfig(item)">
              <Title :info="item" :index="index" v-if="item.id===1"/>
              <paragraph-title :info="item" :index="index" v-else-if="item.id===2"/>
              <Paragraph :info="item" :index="index" v-else-if="item.id===3"/>
              <Picture :info="item" :index="index" v-else-if="item.id===4"/>
            </div>
          </draggable>
      </div>
    </div>
    <div class="design-container flex">
      <div class="design-global">
        <div class="design-global-title">全局设置</div>
        <div class="design-global-content">
           <el-alert
            close-text=" "
            title="店铺装修编辑请使用Google Chrome浏览器进行操作，其他浏览器不完全保证兼容性问题。为避免遇到未知的兼容性问题，浪费您咨询客服的宝贵时间，请更换浏览器后再发布。"
            type="error">
          </el-alert>
          <div style="padding:10px 0;">
            <el-input placeholder="请输入内容" v-model="pageTitle">
              <template slot="prepend">页面标题</template>
            </el-input>
          </div>
          <div style="padding-top:10px;">
            <template>
              <el-radio v-model="radio" label="1">启用</el-radio>
              <el-radio v-model="radio" label="2">禁用</el-radio>
            </template>
          </div>
        </div>
        <div class="design-part">
          <div class="design-part-title">局部设置</div>
          <div class="design-part-content">
            <div class="design-title-content" v-if="configEdit.id === 1">
              <el-form label-position="top" label-width="80px">
                <el-form-item label="文章标题">
                  <el-input v-model="configEdit.config.title"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="design-title-content" v-if="configEdit.id === 2">
              <el-form label-position="top" label-width="80px">
                <el-form-item label="段落标题">
                  <el-input v-model="configEdit.config.title"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="design-paragraph-content" v-if="configEdit.id === 3">
              <el-form label-position="top" label-width="80px">
                <el-form-item label="内容">
                  <el-input type="textarea" v-model="configEdit.config.content"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="design-paragraph-content" v-if="configEdit.id === 4">
              <el-form label-position="top" label-width="80px">
                <el-form-item label="图片">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { Title, ParagraphTitle, Paragraph, Picture } from "./components";
// import originalList from "./components/dataList"
let originalList = [
    {
      name: "文章标题",
      icon: "fa fa-bold",
      id: 1,
      type: "title",
      config: {
        title:""
      }
    },
    {
      name: "段落标题",
      id: 2,
      icon: "fa fa-paragraph",
      type: "paragraph-title",
      config: {
        title:""
      }
    },
    {
      name: "段落",
      icon: "fa fa-file-text",
      id: 3,
      type: "paragraph",
      config: {
        paragraph:""
      }
    },
    {
      name: "图片",
      icon: "fa fa-file-image-o",
      id: 4,
      type: "image",
      config: {
        imgurl: ""
      }
    }
  ]
let originalShowList = [
    {
      name: "文章标题",
      icon: "fa fa-bold",
      id: 1,
      type: "title",
      config: {
        title:"塞班岛旅游怎么玩不枉此行，一篇攻略让你玩转塞班岛!"
      }
    },
    {
      name: "图片",
      icon: "fa fa-file-image-o",
      id: 4,
      type: "image",
      config: {
        imgurl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577276031906&di=784f1b573fa1ca40bcb1fdab484dcfed&imgtype=0&src=http%3A%2F%2Fvpic.video.qq.com%2F3388556%2Fi0332sy58em_ori_3.jpg"
      }
    }
  ]
export default {
  name: "Article",
  components: {
    draggable,
    Title,
    ParagraphTitle,
    Paragraph,
    Picture
  },
  data() {
    return {
      pageTitle: "页面装修",
      radio: "1",
      listItems: originalList,
      showList: originalShowList,
      configEdit: {
        name: "标题",
        icon: "fa fa-bold",
        id: 1,
        type: "title",
        config: {
          title: '这是一条神奇的天路'
        }
      },
      dragPhoneIndex: -1, // 拖动手机内部模块的下标
      isdeleteshowItem: false, // 是否移除手机内部模块
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  created() {
    return this.showList
  },
  methods:{
    cloneItem(item) {
      return item
    },
    moveItem(e) {
      return e
    },
    enddragList(e){
      if(e.to.classList[0] === 'page-content'){
        this.showList = this.showList
      }
      this.listItems = originalList
    },
    enddropList(){
      this.listItems = originalList
    },
    changethisconfig(item){
      this.configEdit = item
    },
    handleRemove(file, fileList) {
      return file + fileList
    },
    handlePreview(file) {
      return file
    }
  }
}
</script>>
<style>
  .drag-content{
    padding:20px;
  }
  .drag-content .content{
    width:240px;
    border:1px solid #eee;
    border-radius:5px;
  }
  .drag-header{padding:10px;background-color:#eee;}
  .drag-list{padding:10px 0;min-height:650px;}
  .drag-list .drag-item{
    width:33.33%;
    float:left;
    padding:5px 0;
    cursor: move;
  }
  .drag-list .drag-item .m{
    width:40px;height:40px;
    line-height:40px;
    border-radius:5px;
    background-color:#eee;
    color:#409eff;
    text-align:center;
    font-size:20px;
    font-weight:bold;
    margin:0 auto;
  }
  .drag-list .drag-item .n{padding-top:5px;color:#666;font-size:12px;text-align:center;}
  .phone-container{
    padding:20px;
  }
  .phone-container .phone{
    width:342px;height:699px;
    background-image:url("../../assets/phone.png");
    background-size:100%;
    background-repeat:no-repeat;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing: border-box;
    padding:0 20px;
  }
  .page-title{height:132px;text-align:center;font-size:16px;padding-top:104px;color:#fff;}
  .page-content{background-color:#fff;height:490px;overflow-y:scroll;}
  .page-content::-webkit-scrollbar{width:0;height:0;}
  .page-content .drag-item{
    height:30px;
    background-color:#eee;
    border:1px dashed #409eff;
    font-size: 0;
  }
  .config-container{cursor: move;}

  .design-container{padding:20px;}
  .design-global{
    border:1px solid #eee;
    border-radius:5px;
  }
  .design-global-title{padding:10px;background-color:#eee;}
  .design-global-content{padding:20px 10px;}

  .design-part{
    border:1px solid #eee;
    border-radius:5px;
  }
  .design-part-title{padding:10px;background-color:#eee;}
  .design-part-content{padding:20px 10px;}
</style>
