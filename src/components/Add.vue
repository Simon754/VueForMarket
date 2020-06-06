<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        {{ title }}
      </div>
      <div class="modal-main">
        <slot>
          商品图片
          <input type="file" id="image" accept="image/jpeg" @change="picToBase64" required="required"/><br>
          <label >
            商品名   :
            <input type="text" v-model="new_item.itemname" required="required"/>
          </label>
          <br>
          <label>
            商品价格:
            <input type="text" v-model="new_item.itemprice" required="required"/>
          </label><br>
          <label>
            商品信息:
            <input type="text" v-model="new_item.iteminfo" required="required"/>
          </label>
        </slot>
      </div>
      <div class="modal-footer">
        <button @click="hideModal">取消</button>
        <button @click="add_submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../utils/utils.js';
  export default {
      name: "Add",
      data() {
        return {
          new_item:{
            itemname: '',
            itemprice: '',
            itemstatus: 'verifying',
            iteminfo: '',
            itempic: '',
            userid: this.$store.state.user.userid,
          },
          new_user:{
            userid: this.$store.state.user.userid,
            username: '',
            userpwd: '',
            userauth: ''
          }
        }
      },
      props: {
        show: {
          type: Boolean,
          default: false
        },
        title: {
          type: String,
          default: ''
        },
      },
      methods: {
        hideModal() {
          this.$emit('hideModal')
        },

        add_submit() {
          let success = (response) => {
            if(response.data===false){
              this.show=false;
              alert('添加失败');
            }else {
              this.show=false;
              alert("添加成功");
              this.$store.dispatch("add_item",this.new_item);
            }
          };
          utils.axiosMethod({
            method: 'POST',
            url: 'http://localhost:8880/change/item',
            data: this.new_item,
            callback: success
          });
          this.$emit('add_submit');
        },
        picToBase64() {
          let files = document.getElementById("image").files[0];
          //转码base64
          let reader = new FileReader();
          let imgFile;
          reader.readAsDataURL(files);
          reader.onload = e => {
            imgFile = e.target.result;
            let arr = imgFile.split(",");
            // arr[1] 就是图片的 Base64编码字符串
            this.new_item.itempic=arr[1];
            //这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
            //this.picPath = 'data:image/png;base64,' + arr[1]
          }
        }
      }
    }
</script>

<style scoped>
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
  }
  .modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .modal-header {
    height: 56px;
    background: #409EFF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;
  }
  .modal-footer button {
    width: 100px;
  }
  .modal-main {
    padding: 15px 40px;
  }
</style>
