# typings.dev

Yet another typing tool for Shuang users, inspired by [Monkeytype.com](https://Monkeytype.com), [typings.gg](https://typings.gg) and [typing-cn](https://barneyzhao.gitee.io/typing-cn/), without the need of selecting words. You only need to enter the letters!

## Usage

- Go to [typings.dev](https://typings.dev)
- Select your preferred scheme at left-top corner
- Start tying! Remember: _don't type in Chinese. Only Pinyin is required._

## TODOs and DONEs

- [x] Basic functionalities
  - [x] Validate
  - [x] Load themes (Instead of loading themes from remote, I hard code them into one theme file, and change with css variable and h5 data attribute)
  - [x] Refresh on config
  - [x] Buttons to change config
  - [x] Change number of counted mode
- [ ] More content
  - [x] Normal Pinyin
  - [ ] English
  - [ ] Chinese direct input
- [ ] Stats after typing
- [ ] Performance
  - [x] Optimize typekit loading - done by removing it entirely
  - [ ] Optimize first screen loading
  - [ ] PWA support
- [ ] More input mode
  - [x] Counted mode
  - [ ] Timed mode
  - [ ] Zen mode
  - [ ] Coding mode
- [ ] More themes
  - [x] Olivia
  - [x] BoW
  - [x] WoB
  - [x] Bearded
  - [x] Nord
  - [x] 8002
  - [x] Press
- [ ] Toggle input content
  - [ ] Punctuation
  - [ ] Numbers
- [ ] Hotkey
  - [ ] Hotkey customization
  - [x] R for quick restart
- [x] Animation
  - [x] Word list pinyin animation fine-tuning
- [x] Stats
  - [x] Chart provided by chart.js
