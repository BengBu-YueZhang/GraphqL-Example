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

@Component({
})
export default class Home extends Vue {}
</script>
