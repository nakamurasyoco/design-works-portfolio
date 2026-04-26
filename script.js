const gallery = document.getElementById("gallery");
const cardTemplate = document.getElementById("project-card-template");
const openVideoButton = document.getElementById("open-video");
const closeVideoButton = document.getElementById("close-video");
const videoModal = document.getElementById("video-modal");
const portfolioVideo = document.getElementById("portfolio-video");
const imageModal = document.getElementById("image-modal");
const expandedImage = document.getElementById("expanded-image");
const closeImageButton = document.getElementById("close-image");

const normalizeText = (value, fallback = "") => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const createCard = (project) => {
  const fragment = cardTemplate.content.cloneNode(true);
  const image = fragment.querySelector(".card-image");

  image.src = project.image;
  image.alt = normalizeText(project.title, "作品画像");
  image.addEventListener("click", () => openImageModal(project.image, image.alt));

  return fragment;
};

const renderProjects = (projects) => {
  gallery.innerHTML = "";
  projects.forEach((project) => gallery.appendChild(createCard(project)));
};

const renderError = (message) => {
  gallery.innerHTML = `<p>${message}</p>`;
};

const loadProjects = () => {
  try {
    const projects = window.PROJECTS;
    if (!Array.isArray(projects)) {
      throw new Error("window.PROJECTS is not an array.");
    }
    renderProjects(projects);
  } catch (error) {
    console.error(error);
    renderError(
      "作品データを読み込めませんでした。data/projects.js を確認してください。"
    );
  }
};

loadProjects();

const openVideoModal = () => {
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  portfolioVideo.currentTime = 0;
  portfolioVideo.play().catch(() => {});
};

const closeVideoModal = () => {
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  portfolioVideo.pause();
};

const openImageModal = (src, altText) => {
  expandedImage.src = src;
  expandedImage.alt = altText || "拡大画像";
  imageModal.classList.add("is-open");
  imageModal.setAttribute("aria-hidden", "false");
};

const closeImageModal = () => {
  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  expandedImage.src = "";
};

openVideoButton?.addEventListener("click", openVideoModal);
closeVideoButton?.addEventListener("click", closeVideoModal);
videoModal?.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    closeVideoModal();
  }
});
closeImageButton?.addEventListener("click", closeImageModal);
imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});
