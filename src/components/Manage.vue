<template>
  <div>
    <input id="search" type="text" placeholder="Search" v-model="search_name">

    <div id="right_content">
      <table style="margin-left: 200px" border="1">
        <tr>
          <th>商品图片</th>
          <th>商品编号</th>
          <th>商品名称</th>
          <th>商品信息</th>
          <th>商品价格</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in search">
          <th><img class="item_img" v-bind:src="'data:image/jpg;base64,'+item.itempic" alt=""></th>
          <th>{{item.itemid}}</th>
          <th>{{item.itemname}}</th>
          <th>{{item.iteminfo}}</th>
          <th>{{item.itemprice}}</th>
          <th>
            <button @click="delete_(item.itemid)">删除</button>
            <button @click="pass(item.itemid)">通过</button>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import utils from '../utils/utils.js';
  export default {
      name: "Manage",
      data(){
        return{
          item:{
            itemid:'',
            itemstatus:'online',
          }
        }
      },
      computed:{
        search() {
          if (!this.search_name) {
            return this.$store.state.itemsList.filter(v=>{
              return v.itemstatus==='verifying'
            })
          }
          return this.$store.state.itemsList.filter(v => {
            if(v.itemstatus==='verifying')
              return v.itemname.includes(this.search_name);
          });
        },
      },
      methods:{
        pass:function (e) {
          this.item.itemid=e;
          let success = (response) => {
            if(response.data===false){
              alert('通过失败');
            }else {
              alert("通过成功");
              this.$store.dispatch('update_item',this.item);
            }
          };
          utils.axiosMethod({
            method: 'POST',
            url: 'http://localhost:8880/manage/pass',
            data: this.item,
            callback: success
          });
        },
        delete_:function (e) {
          this.item.itemid=e;
          let success = (response) => {
            if(response.data===false){
              alert('删除失败');
            }else {
              alert("删除成功");
              this.$store.dispatch('delete_item',this.item);
            }
          };
          utils.axiosMethod({
            method: 'POST',
            url: 'http://localhost:8880/manage/delete',
            data: this.item,
            callback: success
          });
        }
      }
    }
</script>

<style scoped>
  #right_content {
    width: 1100px;
    height: 600px;
    margin-top: 40px;
    background-color: #fff;
    border-radius: 10px;
  }
  #search{
    margin-left: 250px;
    width: 500px;
    height: 40px;
    border-radius: 10px;
    border: none;
    vertical-align:middle;
  }
  .item_img{
    width: 50px;
    height: auto;
    transition: all 500ms ease-in-out;
  }
</style>
