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
      multi-line
      :rows="4"
      full-width
    ></mu-text-field><br/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NoteInfo } from '../interface/note.interface.ts';

@Component({
})
export default class Edit extends Vue {
  private noteInfo: NoteInfo = {
    title: '',
    detail: '',
  };
}
</script>
