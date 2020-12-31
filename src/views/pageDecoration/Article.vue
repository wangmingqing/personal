<template>
<div>
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
        <div class="page-title"><span>{{ pageTitle }}</span></div>
          <draggable class="page-content" :list="showList" :options="{ sort: true, animation: 300, handle: '.config-container', group: 'move' }">
            <div class="config-container" v-for="(item, index) in showList" :key="index" @click="changethisconfig(item)">
              <Title :info="item" :index="index" v-if="item.id===1"/>
              <paragraph-title :info="item" :index="index" v-else-if="item.id===2"/>
              <Paragraph :info="item" :index="index" v-else-if="item.id===3"/>
              <Picture :info="item" :index="index" v-else-if="item.id===4"/>
              <demo-title :info="item" :index="index" v-else-if="item.id===5"/>
              <demo-paragraph :info="item" :index="index" v-else-if="item.id===6"/>
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
          <el-form label-width="80px" style="padding-top:20px;">
            <el-form-item label="文章标题">
              <el-input v-model="pageTitle"></el-input>
            </el-form-item>
            <el-form-item label="国内/境外">
              <el-radio-group v-model="internationaltype" @change="selectcountry">
                <el-radio :label="1">国内</el-radio>
                <el-radio :label="2">境外</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="省份/大洲">
              <el-select v-model="province" placeholder="请选择" @change="selectprovince">
                <el-option
                  v-for="item in provinces"
                  :key="item.id"
                  :label="item.country"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市/国家">
              <el-select v-model="city" placeholder="请选择" @change="selectcity">
                <el-option
                  v-for="item in cities"
                  :key="item.id"
                  :label="item.country"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章属性">
              <el-select v-model="cate" placeholder="请选择" @change="selectattr">
                <el-option
                  v-for="item in cates"
                  :key="item.article_cate_id"
                  :label="item.arricle_cate_name"
                  :value="item.article_cate_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章封面">
              <el-input placeholder="封面图路径" v-model="coverimage" readonly="readonly">
                <el-button slot="append" style="position:relative">
                  上传<i class="el-icon-upload el-icon--right"></i>
                  <input type="file" @change="uploadcoverimage" class="uploadFile">
                </el-button>
              </el-input>
              <div class="coverimage-box">
                <img :src="coverimage || 'http://www.yzbtrip.com/Public/Mp/img/nopic.jpg'" alt="">
              </div>
            </el-form-item>
          </el-form>
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
                    <el-input type="textarea" v-model="configEdit.config.content" resize="none" rows="5"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="design-picture-content" v-if="configEdit.id === 4">
                <el-form label-position="top" label-width="80px">
                  <el-form-item label="图片">
                    <el-input placeholder="请选择图片" v-model="configEdit.config.imgurl" readonly="readonly">
                      <el-button slot="append" style="position:relative">
                        上传<i class="el-icon-upload el-icon--right"></i>
                        <input type="file" @change="uploadarticleimage" class="uploadFile">
                      </el-button>
                    </el-input>
                    <div class="coverimage-box">
                      <img :src="configEdit.config.imgurl || 'http://www.yzbtrip.com/Public/Mp/img/nopic.jpg'" alt="">
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div class="design-title-content" v-if="configEdit.id === 5">
                <el-form label-position="top" label-width="80px">
                  <el-form-item label="标题">
                    <el-input v-model="configEdit.config.title"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="design-paragraph-content" v-if="configEdit.id === 6">
                <el-form label-position="top" label-width="80px">
                  <el-form-item label="内容(保留格式)">
                    <el-input type="textarea" v-model="configEdit.config.content" resize="none" rows="5"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="decoration-footer">
      <el-button size="mini">取消</el-button>
      <el-button size="mini" type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { Title, ParagraphTitle, Paragraph, Picture, DemoTitle, DemoParagraph } from "./components";
import { uploadcover, getprovincelist, getcitylist, articleInit, saveArticle } from "@/api/article";
// import originalList from "./components/dataList"
let originalList = [
    {
      name: "文章标题",
      icon: "fa fa-bold",
      id: 1,
      type: "title",
      config: {
        title:"这里是文章标题"
      }
    },
    {
      name: "段落标题",
      id: 2,
      icon: "fa fa-paragraph",
      type: "paragraph-title",
      config: {
        title:"这里是段落标题"
      }
    },
    {
      name: "段落文本",
      icon: "fa fa-file-text",
      id: 3,
      type: "paragraph",
      config: {
        content:"这里是段落文本"
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
    },
    {
      name: "明细标题",
      icon: "fa fa-bars",
      id: 5,
      type: "demotitle",
      config: {
        title: ""
      }
    },
    {
      name: "明细内容",
      icon: "fa fa-file-text",
      id: 6,
      type: "paragraph",
      config: {
        content:"这里可以输入格式化的段落"
      }
    }
  ]
let originalShowList = []
export default {
  name: "Article",
  components: {
    draggable,
    Title,
    ParagraphTitle,
    Paragraph,
    Picture,
    DemoTitle,
    DemoParagraph
  },
  data() {
    return {
      pageTitle: "页面装修",
      internationaltype: "",
      provinces: [],
      province: "",
      cities: [],
      city: "",
      cates: [],
      cate: "",
      coverimage: "",
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
      isdeleteshowItem: false // 是否移除手机内部模块
    }
  },
  created() {
    articleInit({ uid: 1, id: "" }).then(res => {
      if(res.data.code === 200) {
        this.cates = res.data.result.cate
      } else {
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
      }
    })
  },
  methods:{
    cloneItem(item) {
      return JSON.parse(JSON.stringify(item))
    },
    moveItem(e) {
      return e
    },
    enddragList(){
      this.listItems = originalList
    },
    enddropList(){
      this.listItems = originalList
    },
    changethisconfig(item){
      this.configEdit = item
    },
    // 选择国内/境外
    selectcountry(id) {
      getprovincelist({ id: id }).then(res => {
        if(res.data.code === 200) {
          this.provinces = res.data.result
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    // 选择省份/大洲
    selectprovince(id) {
      this.province = id
      getcitylist({ id: id }).then( res => {
        if(res.data.code === 200) {
          this.cities = res.data.result
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    // 选择城市/国家
    selectcity(id){
      this.city = id
    },
    // 选择文章分类
    selectattr(id) {
      this.cate = id
    },
    // 上传封面图
    uploadcoverimage(e) {
      var formData = new FormData()
      formData.append('type', 1)
      formData.append('file', e.target.files[0])
      uploadcover(formData).then(res => {
        if(res.data.code === 200) {
          this.coverimage = res.data.result.img
        }
      })
    },
    // 上传文章内容图
    uploadarticleimage(e) {
      var formData = new FormData()
      formData.append('type', 2)
      formData.append('file', e.target.files[0])
      uploadcover(formData).then(res => {
        if(res.data.code === 200) {
          this.configEdit.config.imgurl = res.data.result.img
        }
      })
    },
    // 保存配置
    save() {
      var data = {}
      data.article_title = this.pageTitle
      data.article_dsc = this.cate
      data.article_bourn_type = this.internationaltype
      data.article_bourn_province = this.province
      data.article_bourn = this.city
      var bourn_text = ''
      for(var i = 0; i< this.cities.length; i++){
        if(this.cities[i].id == this.city) {
          bourn_text = this.cities[i].country
        }
      }
      data.article_bourn_text = bourn_text,
      data.uid = '1'
      data.article_photo = this.coverimage
      data.article_text = this.showList
      data.article_id = ''
      saveArticle(data).then(res => {
        return res
      })
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
  .page-title span{display:inline-block;width:150px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
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
  .coverimage-box{position: relative; width:180px;padding:5px;border:1px solid #ddd;}
  .coverimage-box img{display:block;width:100%;}
  .uploadFile{
    display:block;
    position:absolute;
    top:0;left:0;
    width:100%;
    height:100%;
    opacity:0;
    background-color:transparent;
  }


  .design-part{
    border:1px solid #eee;
    border-radius:5px;
  }
  .design-part-title{padding:10px;background-color:#eee;}
  .design-part-content{padding:20px 10px;}

  .decoration-footer{
    border-top:1px solid #ddd;
    padding:20px 0;
    text-align:center;
    background-color:#fff;
  }
</style>
