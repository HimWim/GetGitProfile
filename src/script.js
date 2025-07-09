document.addEventListener("DOMContentLoaded", () => {
  const findButton = document.getElementById("find");
  const usernameInput = document.getElementById("username");
  findButton.addEventListener("click", () => {
    const userName = usernameInput.value.trim();
    if (userName === "") return;

    getData(userName);
    usernameInput.value = "";
  });

  usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      findButton.click();
    }
  });
});

async function getData(username) {
  const url = `https://api.github.com/users/${username}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
  } catch (error) {
    console.error("Can't fetch user", error);
  }
}

function displayData(data) {
  const profileDiv = document.getElementById("profile");
  profileDiv.innerHTML = ""; // clear previous data

  if (data.message === "Not Found") {
    profileDiv.innerHTML = `<p class="text-red-400 text-xl">❌ User not found.</p>`;
    return;
  }

  const card = document.createElement("div");
  card.className = "p-6 bg-gray-800 rounded-lg shadow-md text-center space-y-3";

  card.innerHTML = `
    <img src="${data.avatar_url}" alt="${
    data.login
  }" class="w-32 h-32 rounded-full mx-auto border-2 border-gray-500">
    <h3 class="text-2xl font-bold">${
      data.name ? data.name : "Name not available"
    }</h3>
    <p class="text-gray-300">@${data.login}</p>
    <p>${data.bio ? data.bio : "No bio available."}</p>
    <p class="text-sm">📍 ${
      data.location ? data.location : "Unknown location"
    }</p>
    <div class="flex justify-center space-x-4 mt-4">
      <span>👥 <b>${data.followers}</b> followers</span>
      <span>🔗 <b>${data.following}</b> following</span>
      <span>📦 <b>${data.public_repos}</b> repos</span>
    </div>
    <a href="${
      data.html_url
    }" target="_blank" class="inline-block mt-3 bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 text-gray-200">🔗 View Profile</a>
  `;

  profileDiv.appendChild(card);
}
