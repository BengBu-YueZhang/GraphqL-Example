<template>
  <div class="detail">
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
      <mu-card-header title="Myron Avatar" sub-title="sub title">
        <mu-avatar slot="avatar">
        </mu-avatar>
      </mu-card-header>
      <mu-card-media>
        <img src="https://unsplash.it/1280/768?random">
      </mu-card-media>
      <mu-card-title title="Content Title"></mu-card-title>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
    </mu-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Detail extends Vue {}
</script>
