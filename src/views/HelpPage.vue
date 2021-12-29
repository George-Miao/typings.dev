<template>
  <dev id="help-page">
    <div class="help">
      <h1>这是什么?</h1>
      <span
        >受 <a href="https://barneyzhao.gitee.io/typing-cn">typing-cn</a> 启发，
        typings.dev 是一个给双拼（和全拼）用户使用的打字练习网站。
      </span>
    </div>

    <div class="help">
      <h1>怎么用？</h1>
      <span
        ><b>不需要选字，只需要输入双拼（或拼音）然后空格即可。</b>
        在左上角可以选择你使用的双拼方案、喜欢的主题、拼音开关、词数后就可以开始练习啦。
        每次练习结束后都可以看到一个统计页面，然后摁 R
        键重新开始。<b>注意：</b>如果在打字的过程中输入框失焦，<b>打字计时会暂停</b>（页面模糊），重新聚焦到输入框即可。</span
      >
    </div>

    <div class="help">
      <h1>灵感</h1>
      <span>
        <a href="https://barneyzhao.gitee.io/typing-cn/">Typing-cn</a><br />
        <a href="https://monkeytype.com">MonkeyType</a>
      </span>
    </div>
  </dev>
</template>
<style lang="less">
#help-page {
  .help {
    text-align: left;
    margin-bottom: 2rem;
    box-sizing: border-box;

    h1 {
      color: var(--major);
      font-weight: bold;
    }

    span {
      color: var(--major);
      line-height: 1.5rem;

      a {
        color: var(--highlight);
      }
    }
  }
}
</style>
