<template>
  <div class="about">
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

@Component({
})
export default class About extends Vue {
}
</script>
