<template>
  <div class="home">
    <mu-list>
      <mu-sub-header>用户</mu-sub-header>
      <mu-list-item
        v-if="userInfoList"
        class="home-list-item"
        v-for="item in userInfoList"
        button
        :ripple="false"
        :key="item.id"
      >
        <mu-list-item-action>
          <mu-avatar>
            <img :src="getAvatar()">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{ item.name }}</mu-list-item-title>
          <mu-list-item-sub-title>{{ item.createDate }}</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="info" @click="handleDetail(item.id)"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserInfo } from '../interface/user.interface';
import { getHomeInfo } from '../http';
import avatar from '../util/avatar';

@Component
export default class Home extends Vue {
  private userInfoList: [UserInfo] | [] = [];

  private getAvatar: () => string = avatar;

  private created(): void {
    this.getUsers();
  }

  private async getUsers(): Promise<any> {
    const { users: { data } } = await getHomeInfo();
    this.userInfoList = data;
  }

  private handleDetail(id: string): void {
    this.$router.push({
      path: '/about',
      query: {
        id,
      },
    });
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .home-list-item {
    padding: 27px 0;
  }
}
</style>
