// list of ai tools for the directory page
const tools = [
  {
    id: 1,
    name: "Claude",
    developer: "Anthropic",
    description: "Advanced AI assistant known for long context, nuanced reasoning, and strong coding ability. Available via API and claude.ai.",
    category: "writing",
    tags: ["chat", "coding", "analysis"],
    color: "#312e81",
    textColor: "#a5b4fc",
    letter: "C"
  },
  {
    id: 2,
    name: "ChatGPT",
    developer: "OpenAI",
    description: "The most widely used AI chatbot. Supports web browsing, code execution, image generation, and real-time voice.",
    category: "writing",
    tags: ["chat", "image", "voice"],
    color: "#14532d",
    textColor: "#86efac",
    letter: "G"
  },
  {
    id: 3,
    name: "Cursor",
    developer: "Anysphere",
    description: "An AI-first code editor built on VS Code. Chat with your entire codebase, apply multi-file edits, and generate code with full context.",
    category: "coding",
    tags: ["editor", "completions", "chat"],
    color: "#1e3a5f",
    textColor: "#93c5fd",
    letter: "Cu"
  },
  {
    id: 4,
    name: "GitHub Copilot",
    developer: "GitHub / OpenAI",
    description: "In-editor AI completions for all major IDEs. The enterprise version includes codebase chat and security vulnerability detection.",
    category: "coding",
    tags: ["completions", "IDE", "enterprise"],
    color: "#1e3a5f",
    textColor: "#93c5fd",
    letter: "Co"
  },
  {
    id: 5,
    name: "Midjourney",
    developer: "Midjourney Inc.",
    description: "High-quality image generation via the web app or Discord. Known for artistic style, photorealism, and fine-grained control.",
    category: "image",
    tags: ["image gen", "art", "design"],
    color: "#4a1942",
    textColor: "#f0abfc",
    letter: "M"
  },
  {
    id: 6,
    name: "Stable Diffusion",
    developer: "Stability AI",
    description: "Open-source image generation model. Run it locally or via API. Huge ecosystem of fine-tunes and community extensions.",
    category: "image",
    tags: ["open source", "local", "fine-tuning"],
    color: "#4a1942",
    textColor: "#f0abfc",
    letter: "SD"
  },
  {
    id: 7,
    name: "Runway Gen-4",
    developer: "Runway",
    description: "State-of-the-art AI video generation with consistent characters across shots, camera controls, and integrated scene editing.",
    category: "video",
    tags: ["video gen", "editing", "film"],
    color: "#7c2d12",
    textColor: "#fdba74",
    letter: "R"
  },
  {
    id: 8,
    name: "ElevenLabs",
    developer: "ElevenLabs",
    description: "Realistic AI voice cloning and text-to-speech in 30+ languages. Create custom voices from scratch or clone an existing one.",
    category: "audio",
    tags: ["TTS", "voice clone", "multilingual"],
    color: "#1e3a5f",
    textColor: "#93c5fd",
    letter: "E"
  },
  {
    id: 9,
    name: "Perplexity",
    developer: "Perplexity AI",
    description: "AI-powered search engine that always cites its sources. Great for research, current events, and answers with verifiable references.",
    category: "search",
    tags: ["search", "citations", "research"],
    color: "#14532d",
    textColor: "#86efac",
    letter: "P"
  },
  {
    id: 10,
    name: "Suno",
    developer: "Suno AI",
    description: "Generate full songs with vocals, instrumentation, and lyrics from a text prompt. Supports many genres and custom lyric input.",
    category: "audio",
    tags: ["music gen", "vocals", "creative"],
    color: "#4a1942",
    textColor: "#f0abfc",
    letter: "S"
  }
];

let selectedCategory = "all";
let searchText = "";

// show the tools on the page
function displayTools(list) {
  const grid = document.getElementById("tools-grid");
  const countEl = document.getElementById("tool-count");

  if (list.length === 1) {
    countEl.textContent = "1 tool";
  } else {
    countEl.textContent = `${list.length} tools`;
  }

  if (list.length === 0) {
    grid.innerHTML = `<p class="no-results">No tools match your search. Try a different term or category.</p>`;
    return;
  }

  let html = "";
  for (let i = 0; i < list.length; i++) {
    const tool = list[i];

    // build tags html
    let tagsHtml = "";
    for (let j = 0; j < tool.tags.length; j++) {
      tagsHtml += `<span class="tool-tag">${tool.tags[j]}</span>`;
    }

    html += `
      <div class="tool-card">
        <div class="tool-icon" style="background-color: ${tool.color}; color: ${tool.textColor};">${tool.letter}</div>
        <div>
          <h3>${tool.name}</h3>
          <span class="tool-developer">${tool.developer}</span>
        </div>
        <p>${tool.description}</p>
        <div class="tool-tags">${tagsHtml}</div>
      </div>
    `;
  }

  grid.innerHTML = html;
}

// return tools that match the current category and search text
function getMatchingTools() {
  const results = tools.filter(function(tool) {
    // check category first
    let categoryMatch = false;
    if (selectedCategory === "all") {
      categoryMatch = true;
    } else if (tool.category === selectedCategory) {
      categoryMatch = true;
    }

    // check if search text matches name, description, or tags
    let searchMatch = false;
    if (searchText === "") {
      searchMatch = true;
    } else if (tool.name.toLowerCase().includes(searchText)) {
      searchMatch = true;
    } else if (tool.description.toLowerCase().includes(searchText)) {
      searchMatch = true;
    } else {
      // check tags
      for (let i = 0; i < tool.tags.length; i++) {
        if (tool.tags[i].toLowerCase().includes(searchText)) {
          searchMatch = true;
        }
      }
    }

    return categoryMatch && searchMatch;
  });

  return results;
}

function setupNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle !== null) {
    toggle.addEventListener("click", function() {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        menu.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // show all tools at start
  displayTools(tools);

  // filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      filterButtons.forEach(function(b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      selectedCategory = btn.dataset.category;
      displayTools(getMatchingTools());
    });
  });

  // search input
  const searchInput = document.getElementById("tool-search");
  searchInput.addEventListener("input", function() {
    searchText = searchInput.value.toLowerCase().trim();
    displayTools(getMatchingTools());
  });

  setupNavToggle();
});
