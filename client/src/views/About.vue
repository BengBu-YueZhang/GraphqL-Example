<template>
  <div class="about">
    <mu-sub-header>用户</mu-sub-header>
    <mu-list-item class="home-list-item" button :ripple="false">
      <mu-list-item-action>
        <mu-avatar>
          <img :src="getAvatar()">
        </mu-avatar>
      </mu-list-item-action>
      <!-- <mu-list-item-content>
        <mu-list-item-title>{{ item.name }}</mu-list-item-title>
        <mu-list-item-sub-title>{{ item.createDate }}</mu-list-item-sub-title>
      </mu-list-item-content> -->
      <mu-list-item-action>
        <mu-icon value="info" @click="handleDetail(item.id)"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
    <mu-sub-header>贴子</mu-sub-header>
    <mu-list textline="three-line">
      <mu-list-item avatar :ripple="false" button>
        <mu-list-item-content>
          <mu-list-item-title>这个周末一起吃饭么?</mu-list-item-title>
          <mu-list-item-sub-title>
            周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getAboutInfo } from '../http';
import avatar from '../util/avatar';
import { UserInfo } from '../interface/user.interface';
import { NoteInfo } from '../interface/note.interface';

@Component
export default class About extends Vue {

  private userInfo!: UserInfo;

  private getAvatar: () => string = avatar;

  private created(): void {
    const { id } = this.$route.query;
    if (typeof id === 'string') {
      this.getAbout(id);
    }
  }

  private async getAbout(id: string): Promise<any> {
    const { user: { data: userInfo }, notes: { data: notesList } } = await getAboutInfo(id);
  }
}
</script>
