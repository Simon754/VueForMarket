<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        {{ title }}
      </div>
      <div class="modal-main">
        <slot>

        </slot>
        <label>更改用户密码:<br>
          <input type="text" v-model="new_user.userpwd"/>
        </label><br>
        <label>更改用户权限:<br>
          <input type="text" v-model="new_user.userauth"/>
        </label>
      </div>
      <div class="modal-footer">
        <button @click="hideModal">取消</button>
        <button @click="account_submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
    import utils from '../utils/utils.js';
    export default {
        name: "Account",
        props: {
          show: {
            type: Boolean,
            default: false
          },
          title: {
            type: String,
            default: ''
          }
        },
        data() {
          return {
            new_user:{
              userid:this.$store.state.user.userid,
              userpwd:'',
              userauth:''
            }
          }
        },
        methods:{
          hideModal() {
            this.$emit('hideModal');
          },
          account_submit() {
            let success = (response) => {
              if(response.data===false){
                this.show=false;
                alert('修改失败');
              }else {
                this.show=false;
                alert("修改成功，请重新登录");
                this.$router.push({path:'/'})
              }
            };
            utils.axiosMethod({
              method: 'POST',
              url: 'http://localhost:8880/change/user',
              data: this.new_user,
              callback: success
            });
            this.$emit('account_submit');
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


