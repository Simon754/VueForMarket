<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        {{ title }}
      </div>
      <div class="modal-main">
        <slot>

        </slot><br>
        <label>约定相关信息:<br>
          <input type="text" v-model="param.item.iteminfo"/>
        </label>
      </div>
      <div class="modal-footer">
        <button @click="hideModal">取消</button>
        <button @click="detail_submit">购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../utils/utils.js';
  export default {
      name: "Detail",
      props: {
        show: {
          type: Boolean,
          default: false
        },
        title: {
          type: String,
          default: ''
        },
        id: '',
        sellerid:'',
        info:''
      },
      data(){
        return {
          param:{
            item:{
              itemid:'',
              itemstatus:'sold',
              iteminfo:''
            },
            record:{
              itemid:'',
              sellerid:'',
              buyerid: this.$store.state.user.userid,
            }
          }
        }
      },
      watch:{
        id(newid){
          this.param.item.itemid=newid;
          this.param.record.itemid=newid
        },
        sellerid(seller){
          this.param.record.sellerid=seller
        },
        info(newinfo){
          this.param.item.iteminfo=newinfo
        }
      },
      computed:{

      },
      methods: {
        hideModal() {
          this.$emit('hideModal')
        },

        detail_submit() {
          let success = (response) => {
            if(response.data===false){
              this.show=false;
              alert('购买失败');
            }else {
              this.show=false;
              alert("购买成功");
              this.$store.dispatch('update_item',this.param.item);
            }
          };
          utils.axiosMethod({
            method: 'POST',
            url: 'http://localhost:8880/change/buy',
            data: this.param,
            callback: success
          });
          this.$emit('detail_submit');
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

