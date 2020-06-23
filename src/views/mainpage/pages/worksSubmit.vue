<template>
  <!-- 作品提交 -->
  <div class="works_submit_container">
    <!-- <PublicTitle title="作品提交"/>
    <div class="submit_container">
      <div class="submit_item">
        <div class="submit_left flex_center">作品说明书</div>
        <div class="submit_center">
          <div class="center_left">
            <div class="tip_item">队伍介绍</div>
            <div class="tip_item">作品描述</div>
            <div class="tip_item">设计创意说明:明确指出作品的创新关键点</div>
          </div>
          <div class="center_right">
            <div class="file_item"
              v-for="(item, index) in file"
              :key="index">
              <span>{{item.attachmentFileName}}</span>
              <i class="iconfont icon-xiazai1 download_btn"
                @click="download(item.attachmentId)"></i>
            </div>
            <span v-if="!file.length">暂无数据</span>
          </div>
        </div>
        <div class="submit_right flex_center">
          <PublicButton @clickHandle="clickUploadBtn('0')">上传</PublicButton>
          <input type="file" v-show="false" :multiple="false" ref="file0" @change="fileChange">
        </div>
      </div>
      <div class="submit_item">
        <div class="submit_left flex_center">作品介绍</div>
        <div class="submit_center">
          <div class="center_left">
            <div class="tip_item title">包含以下但不限于:</div>
            <div class="tip_item">该产品的设计背景和市场现状分析（1-2p）</div>
            <div class="tip_item">方案展示</div>
            <div class="tip_item">设计亮点</div>
            <div class="tip_item">方案的可实施性说明</div>
          </div>
          <div class="center_right">
            <div class="file_item"
              v-for="(item, index) in file1"
              :key="index">
              <span>{{item.attachmentFileName}}</span>
              <i class="iconfont icon-xiazai1 download_btn"
                @click="download(item.attachmentId)"></i>
            </div>
            <span v-if="!file1.length">暂无数据</span>
          </div>
        </div>
        <div class="submit_right flex_center">
          <PublicButton @clickHandle="clickUploadBtn('1')">上传</PublicButton>
          <input type="file" v-show="false" :multiple="false" ref="file1" @change="fileChange1">
        </div>
      </div>
      <div class="submit_item">
        <div class="submit_left flex_center">作品附件</div>
        <div class="submit_center">
          <div class="center_left">
            <div class="tip_item">作品相关附件</div>
          </div>
          <div class="center_right">
            <div class="file_item"
              v-for="(item, index) in file2"
              :key="index">
              <span>{{item.attachmentFileName}}</span>
              <i class="iconfont icon-xiazai1 download_btn"
                @click="download(item.attachmentId)"></i>
            </div>
            <span v-if="!file2.length">暂无数据</span>
          </div>
        </div>
        <div class="submit_right flex_center">
          <PublicButton @clickHandle="clickUploadBtn('2')">上传</PublicButton>
          <input type="file" v-show="false" :multiple="true" ref="file2" @change="fileChange2">
        </div>
      </div>
    </div> -->
    <PublicTitle title="作品进度"/>
    <div class="current_progress">
      <span class="progress">当前进度</span>
      <span class="bold process">{{processTxt}}</span>
    </div>
    <div class="work_submit">
      <span>作品提交</span>
      <PublicButton @clickHandle="clickUploadBtn('2')">上传</PublicButton>
      <input type="file" v-show="false" :multiple="true" ref="file2" @change="fileChange2">
    </div>
    <div class="work_list">
      <p>队伍作品</p>
      <div class="file_item"
        v-for="(item, index) in file2"
        :key="index">
        <span>{{item.attachmentFileName}}</span>
        <i class="iconfont icon-xiazai1 download_btn"
          @click="download(item.attachmentId)"></i>
      </div>
      <span class="no_data" v-if="!file2.length">暂未上传作品</span>
    </div>
    <div class="work_needing">
      <p class="title">作品要求</p>
      <p class="work_tips">作品文件名使用统一格式：“队伍名称+队长姓名+作品名称” </p>
      <p class="work_tips">初赛：以PDF形式提交，字数不限。方案需包含以下所有部分：1)标题；2)目录；3)正文，其中包括①现状分析（需包括沃尔玛线上线下考察照片、调研数据及分析）、②方案目标、③设计方案；4)结语。</p>
      <p class="work_tips">复赛：以PDF形式提交，字数不少于3000字。复赛现场进行PPT完整方案展示及现场答辩。方案需在初赛作品基础之上进行升华，增加①创新性、②商业价值说明、③可行性分析、④参赛队伍介绍。</p>
      <p class="work_tips">决赛：以PDF形式提交。决赛现场进行PPT完整方案展示及现场答辩。方案需在复赛作品基础之上进行升华，增加①方案亮点。 </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
import PublicButton from '@/components/public_button.vue'
export default {
  components: {
    PublicTitle,
    PublicButton
  },
  data () {
    return {
      // 作品说明书
      file: [],
      // 作品介绍
      file1: [],
      // 作品附件
      file2: [],
      processTxt: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions(['POST_FILE_UPLOAD', 'GET_MY_TEAM_INFO', 'GET_DOWNLOAD_FILE']),
    clickUploadBtn (type) {
      console.log('上传类型', type)
      const ref = `file${type}`
      const dom = this.$refs[ref]
      dom && dom.click()
    },
    delFile (type, index) {
      const key = `file${type}`
      console.log(key, type)
      type === '2' ? this[key].splice(index, 1) : (this[key] = { name: '', file: null })
    },
    async fileChange (e) {
      const file = e.target.files[0]
      console.log('file:', file)
      try {
        const form = new FormData()
        form.append('attachmentTypeEnum', 'OPUS_INSTRUCTION_BOOK')
        form.append('multipartFile', file)
        const res = await this.POST_FILE_UPLOAD(form)
        console.log('res:', res)
        if (res.result === '0' && res.data) {
          this.getData()
          console.log('作品说明书上传成功:', res.data)
        }
      } catch (e) {
        console.log(e)
      }
      const dom = this.$refs.file0
      dom.value = ''
    },
    async fileChange1 (e) {
      const file = e.target.files[0]
      console.log('file1:', file)
      try {
        const form = new FormData()
        form.append('attachmentTypeEnum', 'OPUS_INTRODUCE')
        form.append('multipartFile', file)
        const res = await this.POST_FILE_UPLOAD(form)
        console.log('res:', res)
        if (res.result === '0' && res.data) {
          this.getData()
          console.log('作品介绍上传成功:', res.data)
        }
      } catch (e) {
        console.log(e)
      }
      const dom = this.$refs.file1
      dom.value = ''
    },
    async fileChange2 (e) {
      const files = e.target.files
      console.log('file2:', files)
      try {
        const form = new FormData()
        form.append('attachmentTypeEnum', 'OPUS_ATTACHMENT')
        files.forEach(file => {
          form.append('multipartFile', file)
        })
        const res = await this.POST_FILE_UPLOAD(form)
        console.log('res:', res)
        if (res.result === '0' && res.data) {
          this.getData()
          console.log('作品附件上传成功:', res.data)
        }
      } catch (e) {
        console.log(e)
      }
      const dom = this.$refs.file2
      dom.value = ''
    },
    // 下载附件
    async download (attachmentId) {
      this.GET_DOWNLOAD_FILE(attachmentId)
    },
    // 查页面数据
    async getData () {
      try {
        const res = await this.GET_MY_TEAM_INFO()
        if (res.result === '0' && res.data) {
          console.log(res.data)
          const process = res.data.progress
          process === 0 && (this.processTxt = '组队中')
          process === 1 && (this.processTxt = '初选')
          process === 2 && (this.processTxt = '半决赛')
          process === 3 && (this.processTxt = '决赛')
          const files = res.data.attachments
          this.file = []
          this.file1 = []
          this.file2 = []
          files.forEach(file => {
            const type = file.attachmentType
            const key = `file${type === 0 ? '' : type === 1 ? '1' : '2'}`
            type === 2 ? this[key].push(file) : (this[key] = [file])
          })
        }
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
  color: #dc1e32;
}
.works_submit_container {
  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submit_container {
    margin-top: 30px;
    margin-bottom: 50px;
    box-shadow: 1px 2px 5px 1px #fff;
    .submit_item {
      display: flex;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: unset;
      }
      .submit_left,
      .submit_right {
        display: flex;
        align-items: center;
        width: 20%;
        padding: 0 20px;
        color: $card_font_color;
      }
      .submit_left {
        border-right: 1px solid #ddd;
      }
      .submit_center {
        display: flex;
        width: 60%;
        .tip_item {
          line-height: 28px;
          &.title {
            font-weight: bold;
          }
        }
        .center_left {
          flex-grow: 1;
          padding: 20px;
          color: $card_font_color;;
        }
        .center_right {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          flex-flow: row wrap;
          padding: 20px;
          width: 320px;
          height: 100%;
          border-left: 1px solid #ddd;
          .file_item {
            width: 100%;
            span {
              width: 80%;
              overflow: hidden;
              display: inline-block;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: $card_font_color;;
            }
          }
          .del_btn {
            margin-left: 20px;
            cursor: pointer;
            font-size: 24px;
            color: red;
          }
          .download_btn {
            margin-left: 20px;
            cursor: pointer;
            font-size: 20px;
            color: #333;
          }
        }
      }
      .submit_right {
        width: 20%;
        border-left: 1px solid #ddd;
        .del_btn {
          user-select: none;
          cursor: pointer;
          margin-left: 20px;
          font-size: 16px;
        }
      }
    }
  }
  .current_progress {
    margin-top: 30px;

    font-size: 16px;
    .progress {
      color: $card_font_color;;
    }
    .process {
      margin-left: 10%;
    }
  }
  .work_submit {
    margin-top: 20px;
    span {
      font-size: 16px;
      font-weight: bold;
      margin-right: 10%;
    }
  }
  .work_list {
    margin-top: 20px;
    display: flex;
    align-items: center;
    p {
      font-size: 16px;
      font-weight: bold;
      margin-right: 10%;
    }
    .file_item {
      font-size: 14px;
      i {
        margin-left: 5px;
        font-size: 18px;
        cursor: pointer;
      }
      .no_data {
        font-size: 14px;
      }
    }
  }
  .work_needing {
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .work_tips {
      margin-top: 10px;

      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
