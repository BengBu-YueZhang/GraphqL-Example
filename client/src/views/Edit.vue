<template>
  <div class="edit p-20">
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
    <div class="flex-center-center">
      <div class="p-10">
        <mu-button @click="handleCancel" color="success">取消</mu-button>
      </div>
      <div class="p-10">
        <mu-button @click="handleSave" color="primary">保存</mu-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NoteInfo } from '../interface/note.interface';

@Component
export default class Edit extends Vue {
  private noteInfo: NoteInfo = {
    title: '',
    detail: '',
  };

  private handleCancel(): void {
    this.$router.back();
  }

  private async handleSave(): Promise<any> {
  }
}
</script>
