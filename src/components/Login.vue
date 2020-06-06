<template>
  <div id="login_container">
    <form method="post">
      <router-link to="/">
        <a id="logo"></a>
      </router-link>
      <hr color="#1e88e5">
      <br><br>
      <div id="login_name">
        <input name="user_name" class="input" type="text" placeholder="Account" v-model.trim="loginData.username" value
               required="required" autofocus>
      </div>
      <hr class="blank">
      <div id="login_password">
        <input name="user_password" class="input" type="password" placeholder="Password" v-model.trim="loginData.userpwd"
               required="required">
      </div>
      <br>
      <hr class="blank">
      <input type="button" value="Login" class="button" @click="doLogin">

      <hr class="blank">
      <hr class="blank">
      Not a member ?<router-link to="/signup">Sign Up now</router-link>
      <hr class="blank">
    </form>
  </div>
</template>

<script>
  import utils from '../utils/utils.js';
  export default {
    name: 'login',
    data() {
      return {
        loginData: {
          username: '',
          userpwd: ''
        }
      }
    },
    methods: {
      doLogin() {
        let success = (response) => {
          if(response.data.message==='登录失败'){
            alert('登录失败');
          }
          this.$store.dispatch('set_user',response.data.object);
          this.$store.dispatch('set_list', response.data.list);
          this.$store.dispatch('set_records',response.data.records)
          if(response.data.object.userauth===1){
            this.$router.push({path:'/market'})
          }else {
            this.$router.push({path:'/manage'})
          }
        };
        utils.axiosMethod({
          method: 'POST',
          url: 'http://localhost:8880/user/login/',
          data: this.loginData,
          callback: success
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login_container {
    width: 365px;
    height: 531px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background-color: #fff;
    border-radius: 5px 5px 5px 5px;
  }

  #logo {
    display: block;
    margin: 0 auto 30px auto;
    background-size: auto 89px;
    background-repeat: no-repeat;
    /*background-image: url("logo.png");*/
    border-radius: 5px;
    height: 89px;
  }

  input {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0 16px;
    font-size: 14px;
    color: #555555;
    width: 250px;
    background-color: #ffffff;
    font-family: "Raleway";
    font-weight: inherit;
  }

  .blank {
    height: 20px;
    border: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .button {
    width: 250px;
    display: inline-block;
    vertical-align: middle;
    padding: 12px 24px;
    margin: 0;
    font-size: 15px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    color: #ffffff;
    background-color: #1e88e5;
    border-radius: 3px;
    border: none;
    -webkit-appearance: none;
    transition: all ease-in .1s;
  }

</style>
