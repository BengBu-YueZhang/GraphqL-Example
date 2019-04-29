<template>
  <div class="edit">
    <mu-text-field
      v-model="noteInfo.name"
      label="标题"
      label-float
      full-width
    ></mu-text-field>
    <mu-text-field
      v-model="noteInfo.detail"
      placeholder="详情"
      full-width
      multi-line :rows="3" :rows-max="6"
    ></mu-text-field>
    <mu-button color="success">取消</mu-button>
    <mu-button color="primary">保存</mu-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NoteInfo } from '../interface/note.interface.ts';

@Component
export default class Edit extends Vue {
  private noteInfo: NoteInfo = {
    title: '',
    detail: '',
  };
}
</script>
