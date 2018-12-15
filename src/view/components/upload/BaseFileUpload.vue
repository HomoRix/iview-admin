<template>
  <div class="component-base-file-upload">
    <dropzone
      id="dropzone"
      ref="el"
      :options="options"
      :destroy-dropzone="true"
      :duplicate-check="true"
      @vdropzone-error="uploadError"
      @vdropzone-success="uploadSuccess"/>
    <div
      v-if="disabled"
      class="disable"
      @click="remove">Remove or change this image</div>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone/dist/vue2Dropzone.js'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export default {
  components: {
    Dropzone
  },
  props: {
    message: {
      type: String,
      default: 'Drop file here'
    },
    resizeWidth: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      disabled: false,
      options: {
        url: baseUrl + '/upload', // 'http://httpbin.org/anything', // 'http://localhost:8080/dapp-store/api/dappStore/upload',
        autoProcessQueue: true,
        dictDefaultMessage: this.message,
        resizeWidth: this.resizeWidth,
        maxFiles: 1,
        maxFilesize: 2,
        thumbnailWidth: 300,
        thumbnailMethod: 'contain'
      }
    }
  },
  mounted () {
    // const instance = this.$refs.el.dropzone
  },
  methods: {
    disable () {
      this.$refs.el.dropzone.disable()
      this.disabled = true
    },
    remove () {
      this.$refs.el.dropzone.removeAllFiles()
      this.$refs.el.dropzone.enable()
      this.disabled = false
      this.$emit('removeFile')
    },
    uploadError (errorMessage) {
      console.log(errorMessage)
    },
    uploadSuccess (file, response) {
      // console.log('file:' + JSON.stringify(file))
      // console.log('response:' + JSON.stringify(response))
      // Added by LvQS
      this.disabled = true
      this.$emit('uploadSuccess', response)
    }
  }
}
</script>

<style>
.vue-dropzone .dz-preview .dz-details,
.dropzone .dz-preview.dz-image-preview .dz-details {
  background-color: rgba(#333, 0.8);
}

.dz-message {
  padding-left: 20px;
  padding-right: 20px;
}

.dropzone-plus {
  line-height: 1;
  font-size: 2.5rem;
  font-weight: 700;
  color: darken(#eee, 20%);
  img {
    padding-bottom: 5px;
  }
}
</style>

<style>
#dropzone {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.2px;
  font-family: 'Overpass';
  color: #333;
  transition: background-color 0.2s linear;
  padding: 5px;
  border: 2px solid transparent;
  &.dz-clickable {
    border: 2px dashed darken(#eee, 15%);
  }
}

.disable {
  text-align: center;
  text-decoration: underline;
  background: #524375;
  color: #fafafa;
  padding: 10px;
  cursor: pointer;
}
</style>
