<template>
  <div id="login_body">
    <router-view/>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Market from "@/components/Market";
import SignUp from "@/components/SignUp";
export default {
  name: 'App',
  components:{
    Login,
    Market,
    SignUp
  }
}
</script>

<style>
  #login_body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background: linear-gradient(0deg, #0b4182 1%, #1e88e5 100%),fixed;
  }
  body{
    margin:0;
    padding:0;
  }
</style>
