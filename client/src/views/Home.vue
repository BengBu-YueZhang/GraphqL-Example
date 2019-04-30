<template>
  <div class="home">
    <mu-list>
      <mu-list-item button :ripple="false">
        <mu-list-item-content>
          <mu-list-item-title>Photos</mu-list-item-title>
          <mu-list-item-sub-title>Jan 9, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-content>
          <mu-list-item-title>Photos</mu-list-item-title>
          <mu-list-item-sub-title>Jan 9, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-content>
          <mu-list-item-title>Photos</mu-list-item-title>
          <mu-list-item-sub-title>Jan 9, 2014</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
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
      await getHomeInfo();
    } catch (error) {
    }
  }
}
</script>
