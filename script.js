const gallery = document.getElementById("gallery");
const cardTemplate = document.getElementById("project-card-template");

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
