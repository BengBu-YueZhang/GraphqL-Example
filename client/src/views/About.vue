<template>
  <div class="about">
    <mu-sub-header>用户</mu-sub-header>
    <mu-list>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-avatar>
            <img :src="getAvatar()">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{ userInfo.name }}</mu-list-item-title>
          <mu-list-item-sub-title>{{ userInfo.createDate }}</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-sub-header>贴子</mu-sub-header>
    <mu-list>
      <mu-list-item v-if="notesList" v-for="item in notesList" :key="item.id" avatar :ripple="false" button>
        <mu-list-item-content>
          <mu-list-item-title>{{ item.title }}</mu-list-item-title>
          <mu-list-item-sub-title>
            {{ item.detail }}
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <div class="p-10">
      <mu-button
        full-width
        @click="handleAddNote"
        color="primary"
      >创建一条</mu-button>
    </div>
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

  private userInfo: UserInfo = {
    id: '',
    name: '',
    createDate: '',
  };

  private notesList: [NoteInfo] | [] = [];

  private getAvatar: () => string = avatar;

  private created(): void {
    const { id } = this.$route.query;
    if (typeof id === 'string') {
      this.getAbout(id);
    }
  }

  private async getAbout(id: string): Promise<any> {
    const { user: { data: userInfo }, notes: { data: notesList } } = await getAboutInfo(id);
    this.userInfo = userInfo;
    this.notesList = notesList;
  }

  private handleAddNote(): void {
    this.$router.push({
      path: '/edit',
    });
  }
}
</script>
