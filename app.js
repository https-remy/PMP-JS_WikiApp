const form = document.querySelector("form");
const searchInput = document.querySelector("input");
const loader = document.querySelector(".loader");
const API_ENDPOINT =
	"https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=";
const errorMessage = document.querySelector(".error-message");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	loader.style.display = "flex";
	document.querySelector(".result-display").innerHTML = "";

	if (searchInput.value === "") {
		handleEmptyInput();
		return;
	}

	const searchResults = await fetch(API_ENDPOINT + searchInput.value)
		.then((res) => res.json())
		.then((data) => {
			loader.style.display = "none";
			const dataRes = data.query.search;
			return dataRes;
		});

	if (searchResults.length === 0) {
		errorMessage.style.display = "block";
		errorMessage.textContent = "No results found";
	} else {
		errorMessage.style.display = "none";
		createAndShowResult(searchResults);
	}
});
function handleEmptyInput() {
	errorMessage.style.display = "block";
	errorMessage.textContent = "Please enter a search term";
	loader.style.display = "none";
}

function createAndShowResult(searchResults) {
	searchResults.forEach((result) => {
		const linkResult = document.createElement("p");
		linkResult.classList.add("result-link");
		linkResult.textContent = `https://en.wikipedia.org?curid=${result.pageid}`;
		console.log(linkResult.textContent);

		const titleResult = document.createElement("a");
		titleResult.classList.add("result-title");
		titleResult.textContent = result.title;
		titleResult.href = `https://en.wikipedia.org?curid=${result.pageid}`;
		console.log(titleResult.href);

		const resultSnippet = document.createElement("p");
		resultSnippet.classList.add("result-snippet");
		resultSnippet.innerHTML = result.snippet;
		resultSnippet.style.marginBottom = "20px";

		showResult(titleResult, linkResult, resultSnippet);
	});
}

function showResult(titleResult, linkResult, resultSnippet) {
	var parentElement = document.querySelector(".result-display");
	parentElement.appendChild(titleResult);
	parentElement.appendChild(linkResult);
	parentElement.appendChild(resultSnippet);
}
