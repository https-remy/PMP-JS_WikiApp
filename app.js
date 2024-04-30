// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const searchInput = document.querySelector("#search-input");

form.addEventListener("submit", (e) => {
	e.preventDefault();
});
