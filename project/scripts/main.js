// articles data for the home page
const articles = [
  {
    id: 1,
    title: "Claude 4 Opus Sets New Records on MATH and Coding Benchmarks",
    summary: "Anthropic's latest flagship model scores 98.2% on the MATH benchmark and achieves 85% on SWE-bench, surpassing all previous public results. The model features a 1-million-token context window.",
    category: "models",
    date: "2026-06-12",
    source: "Anthropic Blog"
  },
  {
    id: 2,
    title: "EU AI Act High-Risk Provisions Enter Full Enforcement Phase",
    summary: "European regulators begin enforcement actions for high-risk AI systems, requiring conformity assessments and human oversight for applications in hiring, credit scoring, and healthcare.",
    category: "policy",
    date: "2026-06-10",
    source: "EU Commission"
  },
  {
    id: 3,
    title: "Google DeepMind's AlphaFold 4 Expands to Predict RNA Structures",
    summary: "The latest iteration of DeepMind's protein prediction system now models RNA and small molecules, opening new possibilities in drug discovery and synthetic biology.",
    category: "research",
    date: "2026-06-09",
    source: "DeepMind Blog"
  },
  {
    id: 4,
    title: "Meta Releases Llama 4 Scout Under Apache 2.0 License",
    summary: "Meta's new open-weight model supports 17 languages and a 10-million-token context window, making it the largest publicly available model to date approved for commercial use.",
    category: "models",
    date: "2026-06-07",
    source: "Meta AI Blog"
  },
  {
    id: 5,
    title: "Runway Gen-4 Launches with Consistent Character Control",
    summary: "Runway's Gen-4 video generation model lets users maintain character identity and scene consistency across multiple shots, a big improvement for filmmakers and content creators.",
    category: "tools",
    date: "2026-06-06",
    source: "Runway Blog"
  },
  {
    id: 6,
    title: "OpenAI o3 Achieves 91% on ARC-AGI-2 Benchmark",
    summary: "OpenAI's o3 model reaches human-level performance on ARC-AGI-2, designed to test novel problem-solving that cannot be solved by pattern memorization alone.",
    category: "research",
    date: "2026-06-04",
    source: "OpenAI Blog"
  },
  {
    id: 7,
    title: "Senate Passes AI Transparency Act for Frontier Models",
    summary: "US legislators pass a bill requiring companies releasing frontier AI models to publish standardized model cards detailing training data sources, safety evaluations, and known limitations.",
    category: "policy",
    date: "2026-06-03",
    source: "Reuters"
  },
  {
    id: 8,
    title: "Anthropic Publishes Responsible Scaling Policy v3",
    summary: "Anthropic updates its RSP with new evaluation thresholds for CBRN uplift and autonomous replication. The policy now includes mandatory third-party audits for models above ASL-3.",
    category: "safety",
    date: "2026-06-01",
    source: "Anthropic"
  },
  {
    id: 9,
    title: "Mistral Releases Codestral 3 with Real-Time IDE Integration",
    summary: "Mistral's new coding model achieves state-of-the-art scores on HumanEval and integrates natively with VS Code and JetBrains, offering full-file context for inline completions.",
    category: "tools",
    date: "2026-05-30",
    source: "Mistral AI Blog"
  }
];

let currentCategory = "all";

// build the html for a single article card
function buildCard(article, isFeatured) {
  const saved = isBookmarked(article.id);
  const icon = saved ? "🔖" : "🏷️";
  const featuredClass = isFeatured ? "article-featured" : "";

  return `
    <article class="article-card ${featuredClass}">
      <span class="card-category cat-${article.category}">${article.category}</span>
      <h2>${article.title}</h2>
      <p>${article.summary}</p>
      <div class="card-footer">
        <span class="card-meta">${formatDate(article.date)} &bull; ${article.source}</span>
        <button class="bookmark-btn ${saved ? "saved" : ""}" data-id="${article.id}" title="Bookmark">
          ${icon}
        </button>
      </div>
    </article>
  `;
}

// show articles using the layout from the site plan
function displayArticles(list) {
  const container = document.getElementById("articles-grid");
  const countDisplay = document.getElementById("article-count");

  if (list.length === 1) {
    countDisplay.textContent = "1 story";
  } else {
    countDisplay.textContent = `${list.length} stories`;
  }

  if (list.length === 0) {
    container.innerHTML = `<p class="no-results">No stories in this category yet. Check back soon.</p>`;
    return;
  }

  // when showing all articles, use the siteplan layout:
  // - featured story (left) + 3 stacked cards (right)
  // - then a row of remaining cards below
  if (currentCategory === "all" && list.length >= 4) {
    const featured = list[0];
    const sideCards = list.slice(1, 4);
    const bottomCards = list.slice(4);

    let sideHtml = "";
    for (let i = 0; i < sideCards.length; i++) {
      sideHtml += buildCard(sideCards[i], false);
    }

    let bottomHtml = "";
    for (let i = 0; i < bottomCards.length; i++) {
      bottomHtml += buildCard(bottomCards[i], false);
    }

    let html = `
      <div class="featured-row">
        ${buildCard(featured, true)}
        <div class="side-stack">${sideHtml}</div>
      </div>
    `;

    if (bottomCards.length > 0) {
      html += `<div class="bottom-grid">${bottomHtml}</div>`;
    }

    container.innerHTML = html;

  } else {
    // for filtered views, just show a simple grid
    let html = "";
    for (let i = 0; i < list.length; i++) {
      html += buildCard(list[i], false);
    }
    container.innerHTML = `<div class="simple-grid">${html}</div>`;
  }

  // add bookmark click events to all buttons
  const buttons = document.querySelectorAll(".bookmark-btn");
  buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      const id = parseInt(btn.dataset.id);
      const nowSaved = toggleBookmark(id);

      if (nowSaved) {
        btn.classList.add("saved");
        btn.textContent = "🔖";
      } else {
        btn.classList.remove("saved");
        btn.textContent = "🏷️";
      }
    });
  });
}

// filter articles by category and redisplay
function filterArticles(category) {
  currentCategory = category;

  if (category === "all") {
    displayArticles(articles);
  } else {
    const filtered = articles.filter(function(a) {
      return a.category === category;
    });
    displayArticles(filtered);
  }
}

// check if an article is bookmarked
function isBookmarked(id) {
  const saved = localStorage.getItem("aipulse-bookmarks");
  if (saved === null) return false;

  const bookmarks = JSON.parse(saved);
  return bookmarks.includes(id);
}

// add or remove a bookmark and save to localstorage
function toggleBookmark(id) {
  let bookmarks = [];
  const saved = localStorage.getItem("aipulse-bookmarks");

  if (saved !== null) {
    bookmarks = JSON.parse(saved);
  }

  const index = bookmarks.indexOf(id);
  if (index === -1) {
    bookmarks.push(id);
  } else {
    bookmarks.splice(index, 1);
  }

  localStorage.setItem("aipulse-bookmarks", JSON.stringify(bookmarks));
  return bookmarks.includes(id);
}

// turn a date string like "2026-06-12" into "June 12, 2026"
function formatDate(dateStr) {
  const d = new Date(`${dateStr}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
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

// when the page loads, run everything
document.addEventListener("DOMContentLoaded", function() {
  displayArticles(articles);

  // set up the filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      // remove active class from all buttons
      filterButtons.forEach(function(b) {
        b.classList.remove("active");
      });
      // add active class to the clicked one
      btn.classList.add("active");
      filterArticles(btn.dataset.category);
    });
  });

  setupNavToggle();
});
