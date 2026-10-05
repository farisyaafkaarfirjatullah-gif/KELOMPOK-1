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

const missionButton = document.querySelector("#mission-button");
const missionPrompt = document.querySelector("#mission-prompt");
const missionTimer = document.querySelector("#mission-timer");
const missionProgress = document.querySelector("#mission-progress");
const missionStatus = document.querySelector("#mission-status");

const missions = [
    "Buat slogan kelompok dalam satu kalimat. Setiap anggota harus menyumbang satu kata.",
    "Pilih satu tujuan bersama, lalu sebutkan satu langkah kecil untuk mencapainya.",
    "Temukan tiga kesamaan yang dimiliki semua anggota kelompok.",
    "Buat ide kegiatan kelompok yang bisa dilakukan tanpa biaya.",
    "Secara bergiliran, sebutkan satu kekuatan yang membuat kelompok kalian kompak.",
    "Rancang nama dan konsep untuk proyek kelompok berikutnya."
];

const missionDuration = 60;
let remainingSeconds = missionDuration;
let previousMissionIndex = -1;
let countdownId;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remainder = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
}

function chooseMission() {
    let nextIndex = Math.floor(Math.random() * missions.length);

    while (missions.length > 1 && nextIndex === previousMissionIndex) {
        nextIndex = Math.floor(Math.random() * missions.length);
    }

    previousMissionIndex = nextIndex;
    return missions[nextIndex];
}

function startMission() {
    window.clearInterval(countdownId);
    remainingSeconds = missionDuration;
    missionPrompt.textContent = chooseMission();
    missionTimer.textContent = formatTime(remainingSeconds);
    missionProgress.style.width = "100%";
    missionStatus.textContent = "Misi dimulai. Kerjakan bersama sebelum waktunya habis!";
    missionButton.disabled = true;
    missionButton.textContent = "Misi sedang berjalan...";

    countdownId = window.setInterval(() => {
        remainingSeconds -= 1;
        missionTimer.textContent = formatTime(remainingSeconds);
        missionProgress.style.width = `${(remainingSeconds / missionDuration) * 100}%`;

        if (remainingSeconds === 0) {
            window.clearInterval(countdownId);
            missionStatus.textContent = "Waktu habis! Bagaimana hasil misi kalian?";
            missionButton.disabled = false;
            missionButton.textContent = "Ambil misi berikutnya";
        }
    }, 1000);
}

if (missionButton) {
    missionButton.addEventListener("click", startMission);
}

const musicAudio = document.querySelector("#music-audio");
const musicPlay = document.querySelector("#music-play");
const musicProgress = document.querySelector("#music-progress");
const musicCurrent = document.querySelector("#music-current");
const musicDuration = document.querySelector("#music-duration");

function formatAudioTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    return `${Math.floor(safeSeconds / 60).toString().padStart(2, "0")}:${(safeSeconds % 60).toString().padStart(2, "0")}`;
}

if (musicAudio && musicPlay && musicProgress) {
    const chorusStart = Number(musicAudio.dataset.start);
    const chorusEnd = Number(musicAudio.dataset.end);

    musicAudio.addEventListener("loadedmetadata", () => {
        musicAudio.currentTime = chorusStart;
        musicCurrent.textContent = formatAudioTime(chorusStart);
        musicDuration.textContent = formatAudioTime(chorusEnd);
    });

    musicPlay.addEventListener("click", async () => {
        if (musicAudio.paused) {
            if (musicAudio.currentTime < chorusStart || musicAudio.currentTime >= chorusEnd) {
                musicAudio.currentTime = chorusStart;
            }
            await musicAudio.play();
        } else {
            musicAudio.pause();
        }
    });

    musicAudio.addEventListener("timeupdate", () => {
        if (musicAudio.currentTime >= chorusEnd) {
            musicAudio.currentTime = chorusStart;
            if (!musicAudio.paused) {
                musicAudio.play();
            }
        }

        const chorusProgress = ((musicAudio.currentTime - chorusStart) / (chorusEnd - chorusStart)) * 100;
        musicProgress.value = Math.max(0, Math.min(100, chorusProgress));
        musicCurrent.textContent = formatAudioTime(musicAudio.currentTime);
    });

    musicAudio.addEventListener("play", () => {
        musicPlay.innerHTML = '<span aria-hidden="true">Ⅱ</span>';
        musicPlay.setAttribute("aria-label", "Jeda lagu");
        musicPlay.setAttribute("aria-pressed", "true");
    });

    musicAudio.addEventListener("pause", () => {
        musicPlay.innerHTML = '<span aria-hidden="true">▶</span>';
        musicPlay.setAttribute("aria-label", "Putar reff");
        musicPlay.setAttribute("aria-pressed", "false");
    });

    musicProgress.addEventListener("input", () => {
        musicAudio.currentTime = chorusStart + ((chorusEnd - chorusStart) * Number(musicProgress.value)) / 100;
    });
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

const memberCards = document.querySelectorAll(".container");
const selectedCount = document.querySelector("#selected-count");
const selectionStatus = document.querySelector("#selection-status");
const clearSelectionButton = document.querySelector("#clear-selection");
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

function updateSelection() {
    const totalSelected = document.querySelectorAll(".container.selected").length;
    selectedCount.textContent = totalSelected;
    selectionStatus.textContent = totalSelected === 0
        ? "Belum ada kartu anggota yang dipilih."
        : `${totalSelected} kartu anggota dipilih untuk tim diskusi.`;
}

function toggleMemberCard(card) {
    const isSelected = card.classList.toggle("selected");
    card.setAttribute("aria-checked", String(isSelected));
    updateSelection();
}

memberCards.forEach((card) => {
    card.setAttribute("role", "checkbox");
    card.setAttribute("aria-checked", "false");
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => toggleMemberCard(card));
    card.addEventListener("keydown", (event) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            toggleMemberCard(card);
        }
    });
});

if (clearSelectionButton) {
    clearSelectionButton.addEventListener("click", () => {
        memberCards.forEach((card) => {
            card.classList.remove("selected");
            card.setAttribute("aria-checked", "false");
        });
        updateSelection();
    });
}