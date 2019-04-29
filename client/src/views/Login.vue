<template>
  <div class="login">
    <img src="../public/image/logo.png" />
    <mu-text-field
      v-model="userInfo.name"
      label="UserName"
      label-float
    ></mu-text-field>
    <mu-text-field
      v-model="userInfo.password"
      label="Password"
      label-float
      type="password"
    ></mu-text-field>
    <mu-button
      @click="handleLogin"
      color="primary"
    >登录</mu-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserInfo } from '../interface/user.interface';
import { login } from '../http';

@Component
export default class Login extends Vue {
  // 用户信息
  private userInfo: UserInfo = {
    name: '',
    password: '',
  };

  private created(): void {
  }

  private async handleLogin(): Promise<any> {
    await login(this.userInfo);
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  img {
    width: 200px;
    margin-top: -200px;
    margin-bottom: 40px;
  }
}
</style>
