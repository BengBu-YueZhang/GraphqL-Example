module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    // "autoprefixer": {},
    // 元素的宽高比的插件
    "postcss-aspect-ratio-mini": {},
    // 1px的问题
    "postcss-write-svg": {
      utf8: false
    },
    // 使用css的未来的特性
    "postcss-cssnext": {},
    // px单位转换为vw
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 视窗的宽度（设计稿750， iphone6）
      viewportHeight: 1334,
      unitPrecision: 3, // vw的小数位数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      // 不转换vw的类名(这个类名下的px不会转为px)
      selectorBlackList: [
        '.ignore',
        '.hairlines',
        '.mu-input',
        '.mu-input-label',
        '.mu-text-field',
        '.mu-input-content',
        '.mu-text-field-input'
      ],
      // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值著作权归作者所有。
      minPixelValue: 1, 
      // 允许在媒体查询中转换`px`
      mediaQuery: false
    },
    // CSS的属性添加content的属性
    // 配合viewport-units-buggyfill插件使用, viewport-units-buggyfill解决部分低端安卓机的兼容问题
    // viewport-units-buggyfill 需要在css中添加content
    // postcss-viewport-units 这个插件，将帮助我们自动添加content，进行适配
    // 最后需要在全局引入这一段css
    // img { content: normal !important; }
    // 解决content伪类的问题
    "postcss-viewport-units":{},
    // 压缩css代码
    "cssnano": {
      preset: "advanced",
      autoprefixer: false,
      // postcss-zindex一定要关闭
      "postcss-zindex": false,
      removeAll: true
    }
  }
}
