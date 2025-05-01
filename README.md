---
title: new3
emoji: 🐳
colorFrom: green
colorTo: gray
sdk: static
pinned: false
tags:
  - deepsite
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# Kho truyện Mã A Lềnh - Video Story Player

A beautiful story player system for displaying and playing Vietnamese folk stories with video support.

## Features

- Responsive design that works on desktop and mobile devices
- Beautiful card-based interface for browsing stories
- Video playback support with modal player
- Favorites system that persists between sessions (using localStorage)
- Filtering by story type

## Setup Instructions

### 1. Place your video files

Add your video files to the `videos` directory. The system is configured to use the following files:

- `videos/chuyen-con-suoi-muong-tien.mp4` - Story 1: Chuyện con suối Mường Tiên
- `videos/chiec-banh-trong-day-tui.mp4` - Story 2: Chiếc bánh trong đẩy túi
- `videos/vung-dam-cua-than-rong.mp4` - Story 3: Vũng đầm của thần rồng

### 2. Customize (Optional)

If you want to use different video files or paths:

1. Open `videos.js`
2. Modify the `videoSources` object to point to your video files

```javascript
const videoSources = {
  1: "your/custom/path/to/video1.mp4",
  2: "your/custom/path/to/video2.mp4",
  3: "your/custom/path/to/video3.mp4",
};
```

### 3. Launch the website

Open `index.html` in your web browser or deploy it to your web server.

## Adding More Stories

To add additional stories:

1. Duplicate one of the existing story card sections in `index.html`
2. Update the content (image, title, description, duration)
3. Update the `data-story` attribute to a new unique number
4. Add the corresponding video source in `videos.js`

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript
- Font Awesome for icons
- Google Fonts
