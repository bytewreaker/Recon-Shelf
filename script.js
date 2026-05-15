let tools = [];
let activeTag = "all";
let searchQuery = "";

async function loadTools() {
  const res = await fetch("tools.json");
  tools = await res.json();
  buildTagFilters();
  renderTools();
}

function buildTagFilters() {
  const tagSet = new Set();
  tools.forEach((t) => t.tags.forEach((tag) => tagSet.add(tag)));

  const container = document.getElementById("tag-filters");

  tagSet.forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-tag me-2 mb-2";
    btn.dataset.tag = tag;
    btn.textContent = `#${tag}`;
    btn.addEventListener("click", () => setTag(tag, btn));
    container.appendChild(btn);
  });

  document.querySelector('[data-tag="all"]').addEventListener("click", (e) => {
    setTag("all", e.currentTarget);
  });
}

function setTag(tag, btn) {
  activeTag = tag;
  document
    .querySelectorAll(".btn-tag")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderTools();
}

function renderTools() {
  const grid = document.getElementById("tools-grid");
  const emptyState = document.getElementById("empty-state");
  const countEl = document.getElementById("tool-count");

  const filtered = tools.filter((tool) => {
    const matchesTag = activeTag === "all" || tool.tags.includes(activeTag);
    const matchesSearch =
      searchQuery === "" ||
      tool.name.toLowerCase().includes(searchQuery) ||
      tool.description.toLowerCase().includes(searchQuery) ||
      tool.tags.some((t) => t.includes(searchQuery));
    return matchesTag && matchesSearch;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("d-none");
    countEl.textContent = "0 tools";
    return;
  }

  emptyState.classList.add("d-none");
  countEl.textContent = `${filtered.length} tool${filtered.length !== 1 ? "s" : ""}`;

  filtered.forEach((tool) => {
    const tagsHTML = tool.tags
      .map(
        (tag) =>
          `<span class="tag-badge me-1" onclick="filterByTag('${tag}')">#${tag}</span>`,
      )
      .join("");

    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="tool-card card p-3 d-flex flex-column">
        <div class="card-body d-flex flex-column p-0">
          <h6 class="card-title mb-1">${tool.name}</h6>
          <p class="card-text flex-grow-1 mb-3">${tool.description}</p>
          <div class="mb-3">${tagsHTML}</div>
          <a href="${tool.website}" target="_blank" rel="noopener" class="btn btn-visit align-self-start">
            <i class="bi bi-box-arrow-up-right me-1"></i> Visit
          </a>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

function filterByTag(tag) {
  activeTag = tag;
  document.querySelectorAll(".btn-tag").forEach((b) => {
    b.classList.toggle("active", b.dataset.tag === tag);
  });
  renderTools();
}

document.getElementById("search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderTools();
});

loadTools();
