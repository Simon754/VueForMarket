<template>
  <div>
    <div id="left_menu">
      <div class="bar">
        <img class="img" src="../assets/Products.jpg" @click="show_content">
      </div>
      <div class="bar">
        <img class="img" src="../assets/Billing.jpg" @click="show_content">
      </div>
      <div class="bar">
        <img class="img" src="../assets/Account.jpg" @click="account_submit">
      </div>
    </div>
    <input id="search" type="text" placeholder="Search" v-model="search_name">
    <input id="new_item" type="button" value="ADD ITEM" @click="add_submit" >

    <div id="right_content">
      <ul v-if="content_show" >
        <li class="right-li" v-for="item in search">
          <h3>{{item.itemname}}</h3>
          <div class="a-wrap">
            <a>price:{{item.itemprice}}</a>
          </div>
          <img class="item_img" v-bind:src="'data:image/jpg;base64,'+item.itempic" alt="点击查看详情" @click="detail_submit(item.itemid,item.userid)">
        </li>
      </ul>
      <ul v-if="record_show">
        <li class="right-li" v-for="record in records">
          <div v-for="item in items" v-if="record.itemid===item.itemid">
            <img class="item_img" v-bind:src="'data:image/jpg;base64,'+item.itempic" alt="">
              <h3>{{item.itemname}}</h3>
            <div class="a-wrap" @click="billing_submit(record.recordid)">
              Comment
            </div>
          </div>

        </li>
      </ul>
    </div>

    <Add :show="add_show" :title="add_title" @hideModal="hideModal" @submit="add_submit">

    </Add>
    <Detail :show="detail_show" :title="detail_title" :id="detail_id" :sellerid="detail_seller" @hideModal="hideModal" @submit="detail_submit">
      <a style="" v-for="item in this.$store.state.itemsList" v-if="item.itemid===detail_id">
        <img id="detail_img" v-bind:src="'data:image/jpg;base64,'+item.itempic" alt="">
        <h2>{{item.itemname}}</h2>
        <a>价格:{{item.itemprice}}</a><br>
        <a>详细信息:{{item.iteminfo}}</a>
        <br>
      </a>
    </Detail>
    <Billing :show="billing_show" :title="billing_title" :itemid="item_id" @hideModal="hideModal" @submit="billing_submit">

    </Billing>
    <Account :show="account_show" :title="account_title" @hideModal="hideModal" @submit="account_submit">

    </Account>
  </div>
</template>

<script>
    import Add from "@/components/Add";
    import Detail from "@/components/Detail";
    import Billing from "@/components/Billing";
    import Account from "@/components/Account";
    export default {
      name: "Market",
      components: {Account, Billing, Detail, Add},
      data() {
        return {
          search_name:'',
          add_title: '创建商品',
          add_show: false,
          detail_show:false,
          detail_title:'详细信息',
          billing_show:false,
          billing_title:'填写评价',
          detail_id:'',
          content_show:true,
          record_show:false,
          detail_seller:'',
          account_show:false,
          account_title: '修改账户',
          item_id:''
        }
      },
      computed: {
        search() {
          if (!this.search_name) {
            return this.$store.state.itemsList.filter(v=>{
              return v.itemstatus==='online'
            });
          }
          return this.$store.state.itemsList.filter(v => {
            if(v.itemstatus==='online')
              return v.itemname.includes(this.search_name);
          });
        },
        records(){
          return this.$store.state.recordsList;
        },
        items(){
          return this.$store.state.itemsList;
        }
      },
      methods: {
        hideModal() {
          this.add_show = false;
          this.detail_show=false;
          this.account_show=false;
          this.billing_show=false;
        },
        add_submit() {
          this.add_show = true;
        },
        detail_submit:function(e1,e2) {
          this.detail_id=e1;
          this.detail_seller=e2;
          this.detail_show=true;
        },
        account_submit(){
          this.account_show=true;
        },
        show_content(){
          this.content_show = this.content_show !== true;
          this.record_show = this.record_show !== true;
        },
        billing_submit:function (e) {
          this.item_id=e;
          this.billing_show=true;
        }
      }
    }
</script>

<style scoped>
  #detail_img{
    width: 80px;
    height: auto;
  }
  li{
    list-style: none;
  }
  .right-li{
    padding: 20px;
    position: relative;
  }
  ul li{
    box-sizing: border-box;
    float: left;
    width: 300px;
    height: 150px;
  }
  ul li:nth-child(1),
  ul li:nth-child(2),
  ul li:nth-child(3){
    border-bottom: 1px dashed #ddd;
  }
  ul li:nth-child(1),
  ul li:nth-child(2),
  ul li:nth-child(4),
  ul li:nth-child(5){
    border-right: 1px dashed #ddd;
  }
  .right-li img{
    position: absolute;
    top:25px;
    right: 17px;
    width: 100px;
    height: 100px;
  }
  .a-wrap{
    color: white;
    background: rgb(20, 36, 103);
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-bottom: 20px;

  }
  .left-wrap a {
    color:rgb(26, 26, 25);
    padding-bottom: 20px;
  }

  #left_menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 9.3%;
    z-index: 21;
    text-align: center;
    background: #142467;
    box-shadow: 0 2px 24px rgba(11, 15, 20, 0.08);
    overflow-y: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  .img{
    display: table-cell;
    width: 90px;
    height: auto;
    padding: 60px 1px 16px 22px;/*top right bottom left*/
    vertical-align: middle;
    transition: all 500ms ease-in-out;
  }
  .img:hover{
    width: 110px;
    height: auto;
    transform-style: preserve-3d;
    transition: all 500ms ease-in-out;
  }
  .bar{
    display: table;
  }

  #right_content {
    width: 1100px;
    height: 600px;
    margin-left: 150px;
    margin-top: 40px;
    background-color: #fff;
    border-radius: 10px;
  }
  #search{
    margin-left: 300px;
    width: 500px;
    height: 40px;
    border-radius: 10px;
    border: none;
    vertical-align:middle;
  }
  #new_item{
    width: auto;
    height: 43px;
    display: inline-block;
    vertical-align: middle;
    padding: 12px 24px;
    margin-left: 150px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    color: #ffffff;
    background-color: #2f40df;
    border-radius: 10px;
    border: none;
    transition: all 500ms ease-in-out;
  }
  #new_item:hover{
    background-color: #092d67;
    transition: all 500ms ease-in-out;
  }
  .item_img{
    transition: all 500ms ease-in-out;
  }
  .item_img:hover{
    transform: scale(1.35);
    transition: all 500ms ease-in-out;
  }
</style>
