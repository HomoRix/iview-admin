<template>
  <div class='list'>
    <!-- 搜索 v-show='state.searchState.show'-->
    <Row class='search-filter' :class="{'active':searchState}">
      <Col>
        <Card>
          <Form :label-width='80' inline>
            <Form-item label='DAPP名称'>
              <Input v-model='formItem.searchText' placeholder='请输入' style='width:187px'/>
            </Form-item>
            <div
              class='clearfix'
              style='border-top:1px solid #eeemargin-top:-15pxpadding-top:10px'
            >
              <span class='pull-right'>
                <Button type='primary' icon='ios-search' shape='circle' @click='onSearchTextChange(formItem.searchText)'>查询</Button>
                <Button type='primary' icon='ios-close-empty' shape='circle' @click='clearSearchOptions()'>清除条件</Button>
                <Button
                  type='primary'
                  icon='ios-download-outline'
                  shape='circle'
                  @click='exportData(1)'
                >导出原始数据</Button>
                <Button
                  type='primary'
                  icon='ios-download-outline'
                  shape='circle'
                  @click='exportData(2)'
                >导出排序和过滤后数据</Button>
              </span>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
    <!-- 搜索 /-->
    <Row>
      <Col>
        <Card>
          <div slot='title'>
            <Icon type='ios-film-outline'></Icon>列表
            <Button type='dashed' @click.native='fixedHeader=!fixedHeader'>
              <Icon type='pin'></Icon>
            </Button>
            <Button type='success' @click.native='edit(-1)'>
              <Icon type='trash-a'></Icon>新增
            </Button>
            <Button type='primary' @click='searchShow' shape='circle'>
              <Icon type='funnel'></Icon>筛选
            </Button>
            <Button type='error' v-if='selection.length>0' @click='deleteTip=true'>
              <Icon type='trash-a'></Icon>批量删除
            </Button>
          </div>

          <a href='#' slot='extra' @click.prevent='refresh'>
            <Icon type='ios-loop-strong'></Icon>
          </a>
          <Table
            :loading='loading2'
            :show-header='showHeader'
            :height="fixedHeader ? 300 : ''"
            :size='tableSize'
            :data='listData'
            :columns='columns'
            ref='table'
            @on-select='onSelect'
            @on-selection-change='onSelectionChange'
          ></Table>
          <Page
            :total='page.total'
            show-sizer
            show-elevator
            @on-change='pageChange'
            style='margin-top: 10px'
            @on-page-size-change='PageSizeChange'
          ></Page>
        </Card>
      </Col>
    </Row>
    <!--删除提示  -->
    <Modal v-model='deleteTip' width='360'>
      <p slot='header' style='color:#f60text-align:center'>
        <Icon type='information-circled'></Icon>
        <span>删除确认</span>
      </p>
      <div style='text-align:center'>
        <p>此操作讲删除{{selection.length}}条数据,并不可恢复。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot='footer'>
        <Button type='error' size='large' long @click='deleteBatch'>删除</Button>
      </div>
    </Modal>
    <!--删除提示 / -->
    <!-- 编辑 -->
    <Modal v-model='editModal' v-if='DateReady' :style="{'z-index': 300}">
      <p slot='header' style='text-align:center'>
        <Icon type='information-circled'></Icon>
        <span v-if='currIndex==-1'>新增</span>
        <span v-if='currIndex!=-1'>编辑</span>
      </p>
      <div style='text-align:center'>
        <Form :model='formItem' :label-width='80'>
          <Form-item label='名称*'>
            <Input v-model='currDate.name' placeholder='请输入'/>
          </Form-item>
          <Form-item label='创建日期' v-if="currIndex!=-1">
            <!-- <Date-picker
              type='date'
              placeholder='选择日期'
              style='width:100%'
              v-model='currDate.createDate'
              :editable='false'
            ></Date-picker> -->
            <span>{{currDate.createDate}}</span>
          </Form-item>
          <Form-item label='邮箱*'>
            <Input v-model='currDate.email' placeholder='请输入'/>
          </Form-item>
          <Form-item label='作者*'>
            <Input v-model='processedAuthors' placeholder='请输入'/>
          </Form-item>
          <Form-item label='Slogan标语*'>
            <Input v-model='currDate.teaser' placeholder='请输入'/>
          </Form-item>
          <Form-item label='网站地址*'>
            <Input v-model='currDate.website' placeholder='请输入'/>
          </Form-item>
          <Form-item label='DAPP地址'>
            <Input v-model='currDate.dapp' placeholder='请输入'/>
          </Form-item>
          <Form-item label='选择分类*'>
            <Select v-model='currDate.category' placeholder='请选择'>
              <Option v-for="(item,index) in categories" :key="index" :value="item.slug">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label='选择状态*'>
            <Select v-model='currDate.status' placeholder='请选择'>
              <Option v-for="(item,index) in statuses" :key="index" :value="item">{{ item }}</Option>
            </Select>
          </Form-item>
          <Form-item label='标签*'>
            <!-- <Checkbox-group v-model='currDate.tags' @on-change="checkboxChange">
              <Checkbox v-for="(item,index) in tags" :key="index" :label="item.name"></Checkbox>
            </Checkbox-group> -->
            <Checkbox v-for="(item,index) in tags" :key="index" :label="item.name">{{item.name}}</Checkbox>
          </Form-item>
          <Form-item label='描述*'>
            <Input
              v-model='currDate.description'
              type='textarea'
              :autosize='{minRows: 2,maxRows: 5}'
              placeholder='请输入...'
            />
          </Form-item>
          <Form-item label='Logo*'>
            <!-- <Input v-model='currDate.logoUrl' placeholder='请输入'/> -->
            <BaseFileUpload
              :resize-width="192"
              message="<span class=dropzone-plus><img width=150 src=/images/upload-logo.png></span><br>Drop your icon here, or click to select"
              @uploadSuccess="setLogo"
              @removeFile="removeLogo"/>
            <img v-bind:src='currDate.logoUrl' v-if="currIndex!=-1"/>
          </Form-item>
          <Form-item label='Icon*'>
            <!-- <Input v-model='currDate.iconUrl' placeholder='请输入'/> -->
            <BaseFileUpload
              :resize-width="192"
              message="<span class=dropzone-plus><img width=150 src=/images/upload-icon.png></span><br>Drop your icon here, or click to select"
              @uploadSuccess="setIcon"
              @removeFile="removeIcon"/>
            <img v-bind:src='currDate.iconUrl' v-if="currIndex!=-1"/>
          </Form-item>
          <Form-item label='Product image'>
            <!-- <Input v-model='currDate.productImage' placeholder='请输入'/> -->
            <BaseFileUpload
              :resize-width="192"
              message="<span class=dropzone-plus><img width=150 src=/images/upload-product-image.png></span><br>Drop your icon here, or click to select"
              @uploadSuccess="setProductImage"
              @removeFile="removeProductImage"/>
            <img v-bind:src='currDate.productImage' v-if="currIndex!=-1"/>
          </Form-item>
          <Form-item label='Blog' v-if="currDate.socials">
            <Input v-model='currDate.socials.blog.path' placeholder='请输入'/>
          </Form-item>
          <Form-item label='Chat' v-if="currDate.socials">
            <Input v-model='currDate.socials.chat.path' placeholder='请输入'/>
          </Form-item>
          <Form-item label='Github' v-if="currDate.socials && currDate.socials.github">
            <Input v-model='currDate.socials.github.path' placeholder='请输入'/>
          </Form-item>
          <Form-item label='Reddit' v-if="currDate.socials && currDate.socials.reddit">
            <Input v-model='currDate.socials.reddit.path' placeholder='请输入'/>
          </Form-item>
          <Form-item label='Twitter' v-if="currDate.socials && currDate.socials.twitter">
            <Input v-model='currDate.socials.twitter.path' placeholder='请输入'/>
          </Form-item>
          <Form-item label='Facebook' v-if="currDate.socials && currDate.socials.facebook">
            <Input v-model='currDate.socials.facebook.path' placeholder='请输入'/>
          </Form-item>
        </Form>
      </div>
      <div slot='footer'>
        <Button
          type='success'
          size='large'
          long
          @click.native='saveBatch(currDate)'
          :loading='loading'
          :disabled='saveDisabled'
        >保存</Button>
      </div>
    </Modal>
    <!-- 编辑/ -->
  </div>
</template>
<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import { getSuggestionSubmitListData, deleteSuggestionSubmit, updateSuggestionSubmit, addSuggestionSubmit } from '@/api/data'
import BaseFileUpload from '../upload/BaseFileUpload'
var erd = elementResizeDetectorMaker()
export default {
  name: 'list',
  components: {
    BaseFileUpload: BaseFileUpload
  },
  data () {
    return {
      errorCheckFields: [
        'authors',
        'category',
        'description',
        'email',
        'name',
        'status',
        'tags',
        'teaser',
        'website',
        'icon',
        'logo'
      ],
      formItem: {
        searchText: ''
      },
      searchState: false,
      editModal: false,
      detailModal: false,
      deleteTip: false,
      showHeader: true, // 是否显示表头 @:show-header
      loading2: false, // 分页loading
      fixedHeader: false, // 是否固定表头 @:height
      tableSize: 'small', // @:size
      DateReady: false, // 判断异步数据加载完成，避免报错
      loading: false, // save
      currDate: {}, // 当前编辑和新增的行数据
      categories: [], // 分类集合
      tags: [], // 标签集合
      statuses: [], // 状态集合
      currIndex: 0, // 当前编辑和新增的行号
      saveDisabled: false,
      params: {
        page: 1,
        limit: 10,
        category: '',
        searchText: ''
      },
      selection: [], // 表格选中项
      listData: [], // @:data
      page: {},
      columns: [
        {
          // @:columns
          type: 'selection', // 开启checkbox
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '创建日期',
          key: 'createDate',
          sortable: true,
          fixed: 'left',
          width: 130
        },
        {
          title: '名称',
          key: 'name',
          // className: 'min-width',
          fixed: 'left',
          width: 130
        },
        {
          title: '邮箱',
          key: 'email',
          // className: 'min-width',
          width: 130
        },
        {
          title: 'slogan标语',
          key: 'teaser',
          // className: 'min-width',
          width: 130
        },
        {
          title: '许可证',
          key: 'license',
          // className: 'min-width',
          width: 130
        },
        {
          title: '分类',
          key: 'category',
          // className: 'min-width',
          width: 130
        },
        {
          title: '平台',
          key: 'platform',
          // className: 'min-width',
          width: 130
        },
        {
          title: '状态',
          key: 'status',
          // className: 'min-width',
          width: 130
        },
        {
          title: '操作',
          key: 'action',
          width: 170,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ff3300'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id, params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  watch: {
    /**
     * @params 监听参数变化重新获取数据
     * */
    params: {
      handler (val) {
        this.getData(val)
      },
      deep: true
    },
    fixedHeader: {
      handler (val) {
        if (val) {
          this.$Message.info('表头已固定')
        }
      }
    },
    currDate: {
      handler (val) {
        // console.log('val:' + JSON.stringify(val))
        // console.log('val:' + JSON.stringify(Object.keys(val)))
        let keys = Object.keys(val)
        for (let i = 0; i < keys.length; i++) {
          if (this.errorCheckFields && (this.errorCheckFields.indexOf(keys[i]) > -1)) {
            // console.log('valddd:' + keys[i] + ',' + Object.values(val)[i])
            if (Object.values(val)[i] === '') {
              this.saveDisabled = true
              return
            } else {
              this.saveDisabled = false
            }
          }
        }
      },
      deep: true
    }
  },
  computed: {
    state () {
      return this.$store.state.app
    },
    processedAuthors: {
      get () {
        if (this.currDate && this.currDate.authors) {
          const values = this.currDate.authors.slice()
          return values.join(', ')
        }
        return ''
      },
      set (value) {
        const values = value.split(', ')
        this.currDate.authors = values
      }
    }
  },
  methods: {
    setLogo (response) {
      if (response) {
        this.currDate.logoUrl = response.url || ''
      }
    },
    removeLogo () {
      this.currDate.logoUrl = ''
    },
    setIcon (response) {
      if (response) {
        this.currDate.iconUrl = response.url || ''
      }
    },
    removeIcon () {
      this.currDate.iconUrl = ''
    },
    setProductImage (response) {
      if (response) {
        this.currDate.productImage = response.url || ''
      }
    },
    removeProductImage () {
      this.currDate.productImage = ''
    },
    checkboxChange (data) {
      console.log('CheckboxChanged:' + data)
    },
    searchShow () {
      this.searchState = !this.searchState
    },
    /**
     * 刷新页面请求
     * */
    refresh () {
      this.getData(this.params)
    },
    /**
     * @params:searchText 分类 page：页码 limit:条数
     * */
    getData (params) {
      this.loading2 = true
      getSuggestionSubmitListData(params).then(res => {
        let responseData = res.data
        if (!responseData) {
          return
        }
        if (responseData.type && responseData.type === 'success') {
          this.result = responseData.result
          if (this.result) {
            this.listData = this.result.list
            this.categories = this.result.categories
            this.tags = this.result.tags
            this.statuses = this.result.statuses
            this.DateReady = true
            this.loading2 = false
          }
        } else {
          this.$Message.error(responseData.message)
          this.loading2 = false
        }
      })
    },
    /**
     * @on-change 页码改变的回调，返回改变后的页码
     * */
    pageChange (page) {
      this.params.page = page
    },
    /**
     * @on-page-size-change 切换每页条数时的回调，返回切换后的每页条数
     * */
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    /**
     * 表格对应操作方法
     * @show 查看
     * @remove 删除
     * @edit
     */
    show (index) {
      this.currIndex = index
      this.currDate = this.listData[index]
      this.detailModal = true
      this.$Modal.info({
        title: '详情',
        content: `名称：${this.listData[index].name}<br>邮箱：${
          this.listData[index].email
        }<br>分类：${this.listData[index].category}<br>状态：${
          this.listData[index].status
        }<br>Slogan标语：${
          this.listData[index].teaser
        }<br>Logo：<image src='${
          this.listData[index].logoUrl
        }'/><br>Icon：<image src='${
          this.listData[index].iconUrl
        }'/><br>ProductImage：<image src='${
          this.listData[index].productImage
        }'/><br>Blog：${
          this.listData[index].socials.blog.path
        }<br>Chat：${
          this.listData[index].socials.chat.path
        }<br>Github：${
          this.listData[index].socials.github.path
        }<br>Reddit：${
          this.listData[index].socials.reddit.path
        }<br>Twitter：${
          this.listData[index].socials.twitter.path
        }<br>Facebook：${
          this.listData[index].socials.facebook.path
        }`
      })
    },
    remove (tagId, index) {
      let params = {}
      params.ids = tagId
      deleteSuggestionSubmit(params).then(res => {
        let responseData = res.data
        if (!responseData) {
          return
        }
        if (responseData.type && responseData.type === 'success') {
          this.listData.splice(index, 1)
        } else {
          this.$Message.error(responseData.message)
        }
      })
    },
    edit (index) {
      this.editModal = true
      this.currIndex = index
      if (index === -1) {
        // 新增
        this.currDate = {
          socials: {
            blog: { path: null },
            chat: { path: null },
            reddit: { path: null },
            twitter: { path: null },
            github: { path: null },
            facebook: { path: null }
          },
          createDate: '',
          name: '',
          description: '',
          status: '',
          teaser: '',
          email: '',
          category: '',
          dapp: '',
          website: '',
          authors: '',
          tags: '',
          badges: '',
          audits: '',
          license: '',
          logoUrl: '',
          iconUrl: '',
          productImage: '',
          platform: '',
          imageKeyVisual: '',
          submitReason: ''
        }
      } else {
        // 编辑
        this.currDate = this.listData[index]
      }
    },
    /**
     * 批量删除
     */
    deleteBatch () {
      this.deleteTip = false
      // console.log('selection:' + JSON.stringify(this.selection))
      let tagIds = []
      if (this.selection && this.selection.length > 0) {
        for (var index = 0; index < this.selection.length; index++) {
          let tagObj = this.selection[index]
          if (tagObj) {
            tagIds.push(tagObj.id)
          }
        }
      }
      // ...
      let params = {}
      params.ids = tagIds.join()
      deleteSuggestionSubmit(params).then(res => {
        let responseData = res.data
        if (!responseData) {
          return
        }
        if (responseData.type && responseData.type === 'success') {
          this.listData.splice(index, 1)
        } else {
          this.$Message.error(responseData.message)
        }
      })
    },
    transferParams (params) {
      // for (var i in params) {
      //   if (Array.isArray(params[i])) {
      //     let newValue = params[i].join()
      //     params[i] = newValue
      //   }
      // }
      var self = this
      for (var i in params) {
        if (typeof (params[i]) === 'undefined') {
          continue
        }
        if (typeof (params[i]) === 'string' || typeof (params[i]) === 'number' || typeof (params[i]) === 'boolean') {
          params[i] = params[i] // encodeURIComponent(params[i])
        } else if (Array.isArray(params[i])) { // Array.isArray(params[i])
          params[i].forEach(function (item, index) {
            var key = i
            var k = key == null ? index : key + (params[i] instanceof Array ? '[' + index + ']' : '.' + index)
            params[i] = self.parseParam(params[i], k)
          })
        } else if (typeof (params[i]) === 'object') {
          params[i] = self.parseParam(params[i], i)
        }
      }
    },
    parseParam (param, key) {
      // if (!param) {
      //   return ''
      // }
      var self = this
      var paramStr = ''
      if (typeof (param) === 'string' || typeof (param) === 'number' || typeof (param) === 'boolean') {
        paramStr += '&' + key + '=' + param // encodeURIComponent(param)
      } else if (Array.isArray(param)) { // Array.isArray(param)
        param.forEach(function (item, index) {
          var k = key == null ? index : key + (param instanceof Array ? '[' + index + ']' : '.' + index)
          paramStr += '&' + self.parseParam(this, k)
        })
      } else if (typeof (param) === 'object') {
        for (var index in param) {
          var k = key == null ? index : key + (typeof (param) === 'object' ? '.' + index : '')
          paramStr += '&' + self.parseParam(param[index], k)
        }
      }
      return paramStr.substr(1)
    },
    saveBatch (suggestionSubmit) {
      if (!suggestionSubmit) {
        return
      }
      this.loading = true
      let params = {}
      // params.name = suggestionSubmit.name
      // params = Object.assign({}, suggestionSubmit)
      // this.transferParams(params) // For GET method
      if (this.currIndex !== -1) { // 编辑模式
        params.id = suggestionSubmit.id
        updateSuggestionSubmit(suggestionSubmit).then(res => {
          let responseData = res.data
          if (!responseData) {
            return
          }
          if (responseData.type && responseData.type === 'success') {
            setTimeout(() => {
              this.refresh()
              this.loading = false
              this.$Message.info('更新成功')
              this.editModal = false
            }, 3000)
          } else {
            this.loading = false
            this.$Message.error(responseData.message)
            this.editModal = false
          }
        })
      } else {
        addSuggestionSubmit(suggestionSubmit).then(res => {
          let responseData = res.data
          if (!responseData) {
            return
          }
          if (responseData.type && responseData.type === 'success') {
            setTimeout(() => {
              this.refresh()
              this.loading = false
              this.$Message.info('保存成功')
              this.editModal = false
            }, 3000)
          } else {
            this.loading = false
            this.$Message.error(responseData.message)
            this.editModal = false
          }
        })
      }
    },
    /**
     * 搜索
     */
    onSearchTextChange (text) {
      this.params.searchText = text
      // this.getData(this.params)
    },
    clearSearchOptions () {
      this.formItem.searchText = ''
    },
    /**
     * 数据导出
     * @ type 1 原始数据 2过滤数据
     */
    exportData (type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: '原始数据'
        })
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: '排序和过滤后的数据',
          original: false
        })
      }
    },
    /**
     * 多选
     * selection：已选项数据 row：刚选择的项数据
     */
    onSelect (selection, row) {
      // console.log(selection,row)
    },
    onSelectionChange (selection) {
      this.selection = selection
    }
  },
  created () {
    this.getData(this.params)
  },
  mounted () {
    erd.listenTo(window, 'resize', this.handleResize)
  }
}
</script>
<style lang='less' scoped>
.search-filter {
  opacity: 0;
  display: none;
  overflow: hidden;
  transition: all 0.28s ease-out;
  &.active {
    opacity: 1;
    display: block;
  }
}
.ivu-select-dropdown-list {
    min-width: 100%;
    list-style: none;
    max-height: 60px;
}
</style>
