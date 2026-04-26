const GITHUB_USER = "nybotic";
const profileUrl = `https://api.github.com/users/${GITHUB_USER}`;
const reposUrl = `${profileUrl}/repos?sort=updated&per_page=100`;

const avatar = document.querySelector("#avatar");
const profileName = document.querySelector("#profile-name");
const profileBio = document.querySelector("#profile-bio");
const repoCount = document.querySelector("#repo-count");
const repoList = document.querySelector("#repo-list");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

const fallbackProfile = {
  name: "Nybotic",
  bio: "Stuff I have put on GitHub.",
  avatar_url: "assets/hero-visual.png",
  public_repos: 1
};

const fallbackRepos = [
  {
    name: "nybotic.github.io",
    description: "A simple dark GitHub portfolio.",
    html_url: "https://github.com/nybotic/nybotic.github.io",
    language: "HTML",
    stargazers_count: 0,
    updated_at: new Date().toISOString()
  }
];

const repoDetails = {
  "Translation-Key-Exploit-Remover": {
    summary: "A small web tool for cleaning Minecraft mod jars so they leak fewer obvious translation-key fingerprints.",
    points: [
      "Uploads one or more .jar files in the browser.",
      "Looks for language files and mod-specific strings that can identify installed mods.",
      "Can strip, rename, or normalize those keys before downloading the processed jars."
    ]
  },
  AccountSwitcher: {
    summary: "An Equicord plugin for saving Discord accounts and switching between them faster.",
    points: [
      "Adds an account switcher in the user area.",
      "Saves accounts after you log into them once.",
      "Supports hotkeys and optional password encryption."
    ]
  },
  nybot: {
    summary: "An older Python Discord bot. Pretty simple, but it shows the basic command setup.",
    points: [
      "Uses discord.py and loads the token from an environment file.",
      "Has a few prefix commands like hello and help.",
      "Mostly a small starter bot / test project."
    ]
  },
  nybotic: {
    summary: "The GitHub profile repo for this account.",
    points: [
      "Right now it is basically just a tiny README.",
      "GitHub can show this repo on the profile page.",
      "Could become the main profile intro later."
    ]
  },
  "nybotic.github.io": {
    summary: "This page. A tiny GitHub Pages site that lists the profile and repos.",
    points: [
      "Plain HTML, CSS, and JavaScript.",
      "Pulls live data from the GitHub API.",
      "No framework or build step."
    ]
  }
};

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function renderProfile(profile) {
  avatar.src = profile.avatar_url || fallbackProfile.avatar_url;
  profileName.textContent = profile.name || GITHUB_USER;
  profileBio.textContent = profile.bio || fallbackProfile.bio;
  repoCount.textContent = profile.public_repos ?? fallbackProfile.public_repos;
}

function repoCard(repo) {
  const detail = repoDetails[repo.name] || {
    summary: repo.description || "A public repo from this account.",
    points: [
      "GitHub does not have much extra detail for this one.",
      "The repo link has the files and commit history.",
      "This card is filled from the GitHub API."
    ]
  };
  const article = createElement("article", "repo reveal");
  const title = createElement("h3", "", repo.name);
  const description = createElement("p", "repo-detail", detail.summary);
  const points = createElement("ul", "repo-points");
  const meta = createElement("div", "repo-meta");
  const link = createElement("a", "repo-link", "View repository");

  points.append(...detail.points.map((point) => createElement("li", "", point)));

  meta.append(
    createElement("span", "tag", repo.language || "Code"),
    createElement("span", "tag", `${repo.stargazers_count ?? 0} stars`),
    createElement("span", "tag", `Updated ${formatDate(repo.updated_at)}`)
  );

  link.href = repo.html_url;
  link.target = "_blank";
  link.rel = "noreferrer";

  article.append(title, description, points, meta, link);
  return article;
}

function renderRepos(repos) {
  repoList.replaceChildren(...repos.map(repoCard));
  observeReveals();
}

function observeReveals() {
  const revealElements = document.querySelectorAll(".reveal:not(.visible)");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

async function loadGithub() {
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(profileUrl),
      fetch(reposUrl)
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub request failed");
    }

    const [profile, repos] = await Promise.all([
      profileResponse.json(),
      reposResponse.json()
    ]);

    renderProfile(profile);
    renderRepos(repos.filter((repo) => !repo.fork && !repo.archived));
  } catch (error) {
    renderProfile(fallbackProfile);
    renderRepos(fallbackRepos);
  }
}

loadGithub();
observeReveals();
