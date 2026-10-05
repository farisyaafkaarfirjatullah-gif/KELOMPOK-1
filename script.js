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

const instagramProfiles = [
    { name: "Nadif Ahmad Farhial", role: "Anggota", username: "nadifahriall" },
    { name: "Rizky Pratama", role: "Ketua Kelompok", username: "" },
    { name: "Muhammad Farrel Ihsanuddin Gunawan", role: "Anggota", username: "" },
    { name: "Syifa", role: "Mentor", username: "" },
    { name: "Silfa", role: "Mentor", username: "" },
    { name: "Anggota 06", role: "Anggota", username: "" },
    { name: "Anggota 07", role: "Anggota", username: "" },
    { name: "Anggota 08", role: "Anggota", username: "" },
    { name: "Anggota 09", role: "Anggota", username: "" },
    { name: "Anggota 10", role: "Anggota", username: "" },
    { name: "Anggota 11", role: "Anggota", username: "" }
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
            slide.hidden = !isActive;
            slide.setAttribute("aria-hidden", String(!isActive));
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

