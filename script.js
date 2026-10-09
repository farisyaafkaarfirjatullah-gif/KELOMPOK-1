const themeToggle = document.querySelector("#theme-toggle");
const themeToggleIcon = document.querySelector("#theme-toggle-icon");
const themeToggleLabel = document.querySelector("#theme-toggle-label");
const memberFrame = document.querySelector(".member-embed iframe");
const themeStorageKey = "kelompok1-theme";

function syncEmbeddedTheme(theme) {
    if (!memberFrame) {
        return;
    }

    try {
        memberFrame.contentWindow.postMessage({ type: "theme-change", theme }, "*");
        const embeddedDocument = memberFrame.contentDocument;
        if (embeddedDocument && embeddedDocument.documentElement) {
            embeddedDocument.documentElement.dataset.theme = theme;
        }
    } catch {
    }
}

function applyTheme(theme, persist = false) {
    const activeTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = activeTheme;
    syncEmbeddedTheme(activeTheme);

    if (themeToggle && themeToggleIcon && themeToggleLabel) {
        const nextTheme = activeTheme === "dark" ? "Light Mode" : "Dark Mode";
        themeToggleIcon.textContent = activeTheme === "dark" ? "☼" : "☾";
        themeToggleLabel.textContent = nextTheme;
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme.toLowerCase()}`);
        themeToggle.title = `Switch to ${nextTheme.toLowerCase()}`;
    }

    if (persist) {
        try {
            window.localStorage.setItem(themeStorageKey, activeTheme);
        } catch {
        }
    }
}

const initialTheme = document.documentElement.dataset.theme || "dark";
applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
    });
}

if (memberFrame) {
    memberFrame.addEventListener("load", () => {
        syncEmbeddedTheme(document.documentElement.dataset.theme || "dark");
    });
}

if (window.parent !== window) {
    window.addEventListener("message", (event) => {
        if (event.source !== window.parent || !event.data || event.data.type !== "theme-change") {
            return;
        }

        if (event.data.theme === "light" || event.data.theme === "dark") {
            applyTheme(event.data.theme);
        }
    });
}

document.querySelectorAll(".meeting-photo").forEach((photo) => {
    const placeholder = photo.nextElementSibling;

    const showPhoto = () => {
        photo.classList.add("is-loaded");
        if (placeholder) {
            placeholder.hidden = true;
        }
    };

    const showPlaceholder = () => {
        photo.classList.remove("is-loaded");
        if (placeholder) {
            placeholder.hidden = false;
        }
    };

    photo.addEventListener("load", showPhoto);
    photo.addEventListener("error", showPlaceholder);

    if (photo.complete) {
        if (photo.naturalWidth > 0) {
            showPhoto();
        } else {
            showPlaceholder();
        }
    }
});

const heroImage = document.querySelector("#hero-image");
const heroImageIndex = document.querySelector(".hero-image-index");
const heroImages = [
    "kelompok 1.jpeg",
    "foto/heroimage2.jpeg",
    "foto/heroimage3.jpeg",
    "foto/heroimage4.jpeg"
];

if (heroImage && heroImageIndex) {
    let heroImageCurrent = 0;

    function showHeroImage(index) {
        heroImageCurrent = (index + heroImages.length) % heroImages.length;
        heroImage.src = heroImages[heroImageCurrent];
        heroImage.alt = `Foto Kelompok 1 ${heroImageCurrent + 1}`;
        heroImageIndex.textContent = String(heroImageCurrent + 1).padStart(2, "0");
    }

    setInterval(() => {
        showHeroImage(heroImageCurrent + 1);
    }, 3000);
}

const instagramProfiles = [
    { name: "Syifa Faujiyah Noor Fajrin", role: "Mentor", username: "syifflow" },
    { name: "Silfa Fauzani Budiman", role: "Mentor", username: "Silfafb_" },
    { name: "Rizky Pratama", role: "Ketua Kelompok", username: "rizkyprattama" },
    { name: "Annisa Zannati Qalbiah", role: "Anggota", username: "annizaqq" },
    { name: "Farisya Afkaar Firjatullah", role: "Anggota", username: "farisyaafkaar_" },
    { name: "Kameela jibrilafly", role: "Anggota", username: "ameljiblle" },
    { name: "M. Valda Valensi Sabala", role: "Anggota", username: "vldaasblaa_" },
    { name: "Muhammad Farrel Ihsanuddin Gunawan", role: "Anggota", username: "farrelihsanuddin" },
    { name: "Muhammad Syava A", role: "Anggota", username: "sapskrttt" },
    { name: "Nadif Ahmad Farhial", role: "Anggota", username: "nadifahriall" },
    { name: "Rafi akhdan winata", role: "Anggota", username: "akhdan.rf" },
    { name: "Rizki Sudiman Ramadhan", role: "Anggota", username: "rzkisr_" },
    { name: "Rully Indrawanta", role: "Anggota", username: "rllyndrwnt" }
];

const instagramProfilesContainer = document.querySelector("#instagram-profiles");
const instagramAccountCount = document.querySelector("#instagram-account-count");

function createInstagramProfileCard(profile) {
    const card = document.createElement("article");
    card.className = "instagram-profile-row";

    const initials = profile.name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toLocaleUpperCase("id");
    const avatar = document.createElement("span");
    avatar.className = "instagram-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = initials;

    const details = document.createElement("div");
    details.className = "instagram-profile-details";

    const name = document.createElement("h3");
    name.className = "instagram-profile-name";
    name.textContent = profile.name;

    const role = document.createElement("span");
    role.className = "instagram-profile-role";
    role.textContent = profile.role;

    details.append(name, role);
    card.append(avatar, details);

    const username = profile.username.trim().replace(/^@/, "");
    if (/^[a-zA-Z0-9._]+$/.test(username)) {
        const usernameLabel = document.createElement("span");
        usernameLabel.className = "instagram-profile-username";
        usernameLabel.textContent = `@${username}`;
        details.append(usernameLabel);

        const link = document.createElement("a");
        link.className = "instagram-profile-link";
        link.href = `https://www.instagram.com/${encodeURIComponent(username)}/`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Klik Disini";
        link.setAttribute("aria-label", `Buka Instagram ${profile.name}`);
        card.append(link);
    } else {
        const pending = document.createElement("span");
        pending.className = "instagram-profile-pending";
        pending.textContent = "Username belum diisi";
        details.append(pending);

        const unavailableLink = document.createElement("button");
        unavailableLink.className = "instagram-profile-link";
        unavailableLink.type = "button";
        unavailableLink.disabled = true;
        unavailableLink.title = "Isi username Instagram untuk mengaktifkan tautan";
        unavailableLink.textContent = "Klik Disini";
        card.append(unavailableLink);
    }

    return card;
}

if (instagramProfilesContainer) {
    instagramProfilesContainer.replaceChildren(...instagramProfiles.map(createInstagramProfileCard));
}

if (instagramAccountCount) {
    const activeInstagramCount = instagramProfiles.filter((profile) => profile.username.trim()).length;
    instagramAccountCount.textContent = `${activeInstagramCount} / ${instagramProfiles.length} akun aktif`;
}


const memberSearch = document.querySelector("#member-search");
const memberSearchStatus = document.querySelector("#member-search-status");
const memberItems = document.querySelectorAll(".member-item");

if (memberSearch && memberSearchStatus) {
    memberSearch.addEventListener("input", () => {
        const query = memberSearch.value.trim().toLocaleLowerCase("id");
        let visibleCount = 0;

        memberItems.forEach((item) => {
            const matches = item.textContent.toLocaleLowerCase("id").includes(query);
            item.hidden = !matches;
            visibleCount += Number(matches);
        });

        memberSearchStatus.textContent = visibleCount === 0
            ? "Nama anggota tidak ditemukan."
            : `Menampilkan ${visibleCount} dari ${memberItems.length} anggota.`;
    });
}

const musicPlayer = document.querySelector("#music-player");
const groupAudio = document.querySelector("#group-audio");
const musicToggle = document.querySelector("#music-player-toggle");
const musicSeek = document.querySelector("#music-player-seek");
const musicCurrent = document.querySelector("#music-player-current");
const musicDuration = document.querySelector("#music-player-duration");
const musicStatus = document.querySelector("#music-player-status");
const musicTitle = document.querySelector("#music-player-title");
const musicPlaylist = document.querySelector("#music-player-playlist");
const musicPrevious = document.querySelector("#music-player-previous");
const musicNext = document.querySelector("#music-player-next");
const musicCollapse = document.querySelector("#music-player-collapse");

if (
    musicPlayer && groupAudio && musicToggle && musicSeek && musicCurrent &&
    musicDuration && musicStatus && musicTitle && musicPlaylist &&
    musicPrevious && musicNext && musicCollapse
) {
    function formatAudioTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${remainder}`;
    }

    function getCurrentTrackName() {
        return musicPlaylist.selectedOptions[0].textContent.trim();
    }

    function updateAudioTimeline() {
        const duration = Number.isFinite(groupAudio.duration) ? groupAudio.duration : 0;
        const progress = duration > 0 ? (groupAudio.currentTime / duration) * 100 : 0;
        musicCurrent.textContent = formatAudioTime(groupAudio.currentTime);
        musicDuration.textContent = duration > 0 ? formatAudioTime(duration) : "--:--";
        musicSeek.max = String(duration);
        musicSeek.value = String(groupAudio.currentTime);
        musicSeek.style.setProperty("--seek-progress", `${progress}%`);
        musicSeek.disabled = duration <= 0;
    }

    function playCurrentTrack() {
        groupAudio.volume = 1;
        groupAudio.muted = false;
        groupAudio.play().catch(() => {
            musicStatus.textContent = "Lagu tidak dapat diputar.";
        });
    }

    function selectTrack(index, shouldPlay) {
        const trackCount = musicPlaylist.options.length;
        const nextIndex = (index + trackCount) % trackCount;
        musicPlaylist.selectedIndex = nextIndex;
        musicTitle.textContent = getCurrentTrackName();
        groupAudio.src = musicPlaylist.value;
        groupAudio.load();
        updateAudioTimeline();
        musicStatus.textContent = shouldPlay ? "Memuat lagu..." : "Siap diputar";

        if (shouldPlay) {
            playCurrentTrack();
        }
    }

    musicCollapse.addEventListener("click", () => {
        const isExpanded = musicCollapse.getAttribute("aria-expanded") === "true";
        musicPlayer.classList.toggle("is-minimized", isExpanded);
        musicCollapse.setAttribute("aria-expanded", String(!isExpanded));
        musicCollapse.setAttribute(
            "aria-label",
            isExpanded ? "Perbesar pemutar lagu" : "Minimalkan pemutar lagu"
        );
        musicCollapse.title = isExpanded ? "Perbesar pemutar lagu" : "Minimalkan pemutar lagu";
        musicCollapse.textContent = isExpanded ? "+" : "−";
    });

    musicToggle.addEventListener("click", () => {
        if (groupAudio.paused) {
            playCurrentTrack();
        } else {
            groupAudio.pause();
        }
    });

    musicPlaylist.addEventListener("change", () => {
        selectTrack(musicPlaylist.selectedIndex, !groupAudio.paused);
    });

    musicPrevious.addEventListener("click", () => {
        selectTrack(musicPlaylist.selectedIndex - 1, !groupAudio.paused);
    });

    musicNext.addEventListener("click", () => {
        selectTrack(musicPlaylist.selectedIndex + 1, !groupAudio.paused);
    });

    musicSeek.addEventListener("input", () => {
        groupAudio.currentTime = Number(musicSeek.value);
        updateAudioTimeline();
    });

    groupAudio.addEventListener("loadedmetadata", updateAudioTimeline);
    groupAudio.addEventListener("timeupdate", updateAudioTimeline);
    groupAudio.addEventListener("durationchange", updateAudioTimeline);
    groupAudio.addEventListener("play", () => {
        musicPlayer.classList.add("is-playing");
        musicToggle.setAttribute("aria-label", `Jeda ${getCurrentTrackName()}`);
        musicToggle.setAttribute("aria-pressed", "true");
        musicStatus.textContent = "Sedang diputar";
    });
    groupAudio.addEventListener("pause", () => {
        musicPlayer.classList.remove("is-playing");
        musicToggle.setAttribute("aria-label", `Putar ${getCurrentTrackName()}`);
        musicToggle.setAttribute("aria-pressed", "false");
        if (!groupAudio.ended) {
            musicStatus.textContent = "Dijeda";
        }
    });
    groupAudio.addEventListener("ended", () => {
        selectTrack(musicPlaylist.selectedIndex + 1, true);
    });
    groupAudio.addEventListener("error", () => {
        musicStatus.textContent = "File lagu tidak dapat dimuat.";
    });
}

const memberImages = document.querySelectorAll(".kiri");

if ("IntersectionObserver" in window) {
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    memberImages.forEach((image) => observer.observe(image));
} else {
    memberImages.forEach((image) => image.classList.add("show"));
}

const documentationSlider = document.querySelector("#documentation-slider");

if (documentationSlider) {
    const documentationSlides = Array.from(documentationSlider.querySelectorAll("[data-slide]"));
    const documentationDots = Array.from(documentationSlider.querySelectorAll("[data-slide-index]"));
    const documentationCurrent = document.querySelector("#documentation-current");
    const documentationTotal = document.querySelector("#documentation-total");
    let activeDocumentationIndex = 0;

    function showDocumentationSlide(index) {
        if (documentationSlides.length === 0) {
            return;
        }

        activeDocumentationIndex = (index + documentationSlides.length) % documentationSlides.length;
        documentationSlides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeDocumentationIndex;
            slide.classList.remove("is-active");
            slide.hidden = !isActive;
            slide.setAttribute("aria-hidden", String(!isActive));

            if (isActive) {
                requestAnimationFrame(() => slide.classList.add("is-active"));
            }
        });

        documentationDots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeDocumentationIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", String(isActive));
        });

        if (documentationCurrent) {
            documentationCurrent.textContent = String(activeDocumentationIndex + 1).padStart(2, "0");
        }
        if (documentationTotal) {
            documentationTotal.textContent = `/ ${String(documentationSlides.length).padStart(2, "0")}`;
        }
    }

    documentationSlider.querySelector("#documentation-previous")?.addEventListener("click", () => {
        showDocumentationSlide(activeDocumentationIndex - 1);
    });
    documentationSlider.querySelector("#documentation-next")?.addEventListener("click", () => {
        showDocumentationSlide(activeDocumentationIndex + 1);
    });

    documentationDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            showDocumentationSlide(Number(dot.dataset.slideIndex));
        });
    });

    documentationSlider.addEventListener("keydown", (event) => {
        if (event.target.closest("button")) {
            return;
        }

        if (event.key === "ArrowLeft") {
            showDocumentationSlide(activeDocumentationIndex - 1);
        } else if (event.key === "ArrowRight") {
            showDocumentationSlide(activeDocumentationIndex + 1);
        }
    });

    showDocumentationSlide(activeDocumentationIndex);
}

const modal = document.getElementById('member-modal');
const modalClose = document.getElementById('modal-close');

if (modal) {
  document.querySelectorAll('.member-item').forEach(item => {
    if (!item.dataset.nama) return;

    item.addEventListener('click', () => {
      const modalFoto = document.getElementById('modal-foto');
      const modalNama = document.getElementById('modal-nama');
      const modalNpm = document.getElementById('modal-npm');
      const modalHobi = document.getElementById('modal-hobi');

      if (modalFoto) modalFoto.src = item.dataset.foto;
      if (modalNama) modalNama.textContent = item.dataset.nama;
      if (modalNpm) modalNpm.textContent = item.dataset.npm;
      if (modalHobi) modalHobi.textContent = item.dataset.hobi;
      modal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('member-list');
  if (!list) return;

  // isi detail dari data-*
  list.querySelectorAll('.member-item[data-nama]').forEach(item => {
    item.querySelector('img').src = item.dataset.foto;
    item.querySelector('h3').textContent = item.dataset.nama;
    item.querySelector('.npm').textContent = item.dataset.npm;
    item.querySelector('.hobi').textContent = item.dataset.hobi;
  });

  // klik buka/tutup
  list.addEventListener('click', e => {
    const head = e.target.closest('.member-head');
    if (!head) return;

    const item = head.closest('.member-item');
    if (!item.dataset.nama) return;

    list.querySelectorAll('.member-item.open').forEach(o => {
      if (o !== item) o.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});