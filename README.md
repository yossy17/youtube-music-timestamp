<p align="center">
  <img src="./images/icons/icon-128.webp" height="128" alt="Logo">
  <h1 align="center">Youtube Music Timestamp</h1>
</p>

<p align="center">
  <img src="./images/assets/cover.webp" height="512" alt="Cover">
</p>

<table>
	<thead>
    	<tr>
      		<th style="text-align:center">English</th>
      		<th style="text-align:center"><a href="README-ja.md">日本語</a></th>
    	</tr>
  	</thead>
</table>

## Overview

**YouTube Music Timestamp** is easily add timestamps to YouTube Music and automatically create `.LRC` files.

<!-- ## Download -->

## Works Best With

This script was inspired by [Better Lyrics](https://chromewebstore.google.com/detail/better-lyrics-lyrics-for/effdbpeggelllpfkjppbokhmmiinhlmg) and created to make it even more convenient and user-friendly.  
Please give it a try! 🤝

[![Better Lyrics](https://developer.chrome.com/static/docs/webstore/branding/image/206x58-chrome-web-bcb82d15b2486.png)](https://chromewebstore.google.com/detail/better-lyrics-lyrics-for/effdbpeggelllpfkjppbokhmmiinhlmg)

Also, by using [Genius Lyrics Copy](https://greasyfork.org/ja/scripts/549204-genius-lyrics-copy), you can easily copy lyrics from Genius.

[![Genius Lyrics Copy](https://raw.githubusercontent.com/yossy17/genius-lyrics-copy/master/images/icons/icon-48.webp)](https://greasyfork.org/ja/scripts/549204-genius-lyrics-copy)

## Features

### 🎵 Create `.LRC` Files Instantly

Just play a song, look at the lyrics, and press buttons!

### 🔍 Easy Lyrics Search & 📂 File Export

Easy lyrics search using [Genius](https://genius.com) and [ChatGPT](https://chatgpt.com), with instant `.LRC` file export functionality

### 🧩 Complete Operations in One Panel

All features combined in a small panel!  
Draggable for easy positioning

### ⌨️ Convenient Shortcut Keys

Creating `.LRC` files takes just [**3 steps**](#usage)!  
Smooth workflow for uploading lyrics to [LRCLIBup](https://lrclibup.boidu.dev)

### 🌏 Multi-language Support

Supports English / Japanese / Chinese / Korean

### ⚙️ Useful Extra Features

Automatically reset timestamps when songs change (toggleable on/off)  
No worries if you make a mistake! **Just right** playback

---

- ⏱️ **Timestamps (Controllable via panel or shortcut keys)**

- Add timestamp at current playback position
- Insert space
- Go back to previous timestamp
- Copy all timestamps
- Delete all timestamps

- 🔗 **Genius (Controllable via panel or shortcut keys)**

- Search by song title and artist
- Search by song title only
- Search by artist only

- 🔗 **ChatGPT (Controllable via panel or shortcut keys)**  
  When you open the ChatGPT link with timestamps present, the prompt is automatically entered.  
  Then paste the copied lyrics and send to output `.LRC` format files and plain lyrics files.

- ⚙️ **Automatic Timestamp Reset (Controllable via panel or shortcut keys)**  
  When the song changes, saved timestamps are automatically deleted after 5 seconds. Default is off.

- ⌨️ **Perfect Playback (Controllable shortcut keys)**  
  Adjust the playback position of the video using the `W` , `E` , `←` , and `→` keys.  
  Pressing `W` or `E` moves the playback by 3 seconds, while the `←` and `→` keys adjust it by 5 seconds.

> [!TIP]
> When navigating to the ChatGPT link, if there's any content in the new page's text box, auto-insertion won't work.  
> Clear all input content and try opening again.

> [!WARNING]
> The output content of ChatGPT is not 100% accurate. Please check the content before use.

## Shortcut List

| Key | Type         | Description                                   |
| --- | ------------ | --------------------------------------------- |
| 1   | ⏱️ Timestamp | Add timestamp at current playback position    |
| 2   | ⏱️ Timestamp | Insert space                                  |
| 3   | ⏱️ Timestamp | Go back to previous timestamp                 |
| 4   | 🔗 Link      | Open Genius and search by song title & artist |
| 5   | 🔗 Link      | Open ChatGPT with auto-input prompt           |
| 6   | 🔗 Link      | Open LRCLIBup for this song                   |
| 7   | ⏱️ Timestamp | Copy all timestamps                           |
| 8   | ⏱️ Timestamp | Delete all timestamps                         |
| 9   | ⚙️ Toggle    | Toggle automatic timestamp reset feature      |
| 0   | ⚙️ Toggle    | Open/close panel                              |
| W   | ⌨️ Playback  | Rewind 3 seconds                              |
| E   | ⌨️ Playback  | Fast forward 3 seconds                        |
| ←   | ⌨️ Playback  | Rewind 5 seconds                              |
| →   | ⌨️ Playback  | Fast forward 5 seconds                        |

## Usage

The basic workflow is like this 👉

1. When playing a song, open the panel from the bottom player bar or shortcut keys

2. Search for the song on Genius and enter timestamps while viewing the lyrics

3. Open ChatGPT, paste the lyrics, and it will be created automatically!

That's all you need!

Plus, use the `6` key for smooth uploading to LRCLIBup

## License

This project is licensed under the [GNU GPLv3 License](LICENCE).
