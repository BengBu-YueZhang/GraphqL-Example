<template>
  <div class="home">
    <mu-list>
      <mu-list-item v-for="item in userInfoList" button :ripple="false" :key="item.id ">
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

@Component
export default class Home extends Vue {
  private userInfoList: [UserInfo] = [];
  
  private created(): void {
    this.getUsers();
  }

  private async getUsers(): Promise<any> {
    try {
      const { users: { data } } = await getHomeInfo();
      this.userInfoList = data;
    } catch (error) {
    }
  }

  private handleDetail(id: string): void {
    this.$router.push({
      path: '/about',
      query: {
        id
      }
    })
  }
}
</script>
