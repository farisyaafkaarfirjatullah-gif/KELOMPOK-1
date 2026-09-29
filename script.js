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

missionButton.addEventListener("click", startMission);