document.addEventListener("DOMContentLoaded", function () {
  const videoModal = document.getElementById("video-modal");
  const videoPlayer = document.getElementById("video-player");
  const closeModalBtn = document.getElementById("close-modal");
  const playButtons = document.querySelectorAll(".play-btn");
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  // Updated video sources using local video files
  const videoSources = {
    1: "videos/chuyen-con-suoi-muong-tien.mp4",
    2: "videos/chiec-banh-trong-day-tui.mp4",
    3: "videos/vung-dam-cua-than-rong.mp4",
  };

  // Play button click handler
  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const storyId = this.getAttribute("data-story");
      const videoSrc = videoSources[storyId];

      // Set video source
      videoPlayer.src = videoSrc;

      // Show modal
      videoModal.classList.remove("hidden");
      videoModal.classList.add("flex");

      // Play video
      videoPlayer.load();
      videoPlayer.play();
    });
  });

  // Close modal button
  closeModalBtn.addEventListener("click", function () {
    // Pause video
    videoPlayer.pause();

    // Hide modal
    videoModal.classList.add("hidden");
    videoModal.classList.remove("flex");
  });

  // Pressing escape key also closes the modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !videoModal.classList.contains("hidden")) {
      videoPlayer.pause();
      videoModal.classList.add("hidden");
      videoModal.classList.remove("flex");
    }
  });

  // Clicking outside the video container closes the modal
  videoModal.addEventListener("click", function (e) {
    if (e.target === videoModal) {
      videoPlayer.pause();
      videoModal.classList.add("hidden");
      videoModal.classList.remove("flex");
    }
  });

  // Favorite button click handler
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const heartIcon = this.querySelector("i");
      const storyId = this.getAttribute("data-story");

      if (heartIcon.classList.contains("far")) {
        // Add to favorites
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        heartIcon.classList.add("text-red-500");

        // Save to localStorage
        saveFavorite(storyId);
      } else {
        // Remove from favorites
        heartIcon.classList.remove("fas");
        heartIcon.classList.remove("text-red-500");
        heartIcon.classList.add("far");

        // Remove from localStorage
        removeFavorite(storyId);
      }
    });
  });

  // Load favorites from localStorage
  function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach((id) => {
      const button = document.querySelector(
        `.favorite-btn[data-story="${id}"]`
      );
      if (button) {
        const heartIcon = button.querySelector("i");
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        heartIcon.classList.add("text-red-500");
      }
    });
  }

  // Save a favorite to localStorage
  function saveFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }

  // Remove a favorite from localStorage
  function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Initialize favorites
  loadFavorites();

  // Handle tab switching (All Stories / Favorites)
  const allStoriesBtn = document.getElementById("all-stories-btn");
  const favoritesBtn = document.getElementById("favorites-btn");
  const allStoriesSection = document.getElementById("all-stories");

  allStoriesBtn.addEventListener("click", function () {
    // Show all stories
    allStoriesBtn.classList.add("bg-amber-700", "text-white");
    allStoriesBtn.classList.remove("hover:bg-amber-200");

    favoritesBtn.classList.remove("bg-amber-700", "text-white");
    favoritesBtn.classList.add("hover:bg-amber-200");

    // Show all story cards
    document.querySelectorAll(".story-card").forEach((card) => {
      card.classList.remove("hidden");
    });
  });

  favoritesBtn.addEventListener("click", function () {
    // Show only favorites
    favoritesBtn.classList.add("bg-amber-700", "text-white");
    favoritesBtn.classList.remove("hover:bg-amber-200");

    allStoriesBtn.classList.remove("bg-amber-700", "text-white");
    allStoriesBtn.classList.add("hover:bg-amber-200");

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Hide/show cards based on favorites
    document.querySelectorAll(".story-card").forEach((card) => {
      const storyId = card
        .querySelector(".play-btn")
        .getAttribute("data-story");
      if (favorites.includes(storyId)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});
