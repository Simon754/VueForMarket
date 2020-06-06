<template>
  <div id="login_container">
    <form method="post">
      <router-link to="/signup">
        <a id="logo"></a>
      </router-link>
      <hr color="#1e88e5">
      <br><br>
      <div id="login_name">
        <input name="user_name" class="input" type="text" placeholder="Account" v-model.trim="signUpData.username" value
               required="required" autofocus>
      </div>
      <hr class="blank">
      <div id="login_password">
        <input name="user_password" class="input" type="password" placeholder="Password" v-model.trim="signUpData.userpwd"
               required="required">
      </div>
      <hr class="blank">
      <div>
        Choose to be:
        <input id="item1" type="radio" value="1" v-model="signUpData.userauth" checked>
        <span>User</span>
        <input id="item2" type="radio" value="2" v-model="signUpData.userauth">
        <span>Admin</span>
      </div>
      <hr class="blank">
      <input type="button" value="SignUp" class="button" @click="doSign">
      <hr class="blank">
      <hr class="blank">
      Already a member ? <router-link to="/">Log In</router-link>
      <hr class="blank">
    </form>
  </div>
</template>

<script>
  import utils from '../utils/utils.js'
  export default {
    name: 'signup',
    data() {
      return {
        signUpData: {
          username: '',
          userpwd: '',
          userauth:''
        }
      }
    },
    methods: {
      doSign() {
        let success = (response) => {
          alert(response.data.message);
          this.$router.push({path:'/'})
        };
        utils.axiosMethod({
          method: 'POST',
          url: 'http://localhost:8880/user/signUp/',
          data: this.signUpData,
          callback: success
        })
      },
    }
  }
</script>

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

  .input {
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
