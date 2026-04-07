// Works JavaScript

"use strict";

const PROJECTS = [
	{ 
		id: "branding",
		title: "Branding",
		category: "branding",
		image: "images/branding.png",
		href: "branding.html",
		tags: ["identity", "logo", "packaging"],
		year: 2025,
	},
	{
		id: "socialmedia",
		title: "Social Media",
		category: "social",
		image: "images/socialmedia.png",
		href:"#",
		tags: ["content", "campaign"],
		year: 2025,
	},
	{
		id:"playground",
		title: "playground",
		category: "playground",
		image: "images/playground.png",
		href:"#",
		tags: ["experiments", "interactive"],
		year: 2025,
	},
];

class Gallery {
	constructor(projects, containerId) {
		this.projects = projects;
		this.container = document.getElementById(containerId);

		this.searchInput = document.getElementById("works-search");
		this.filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
		this.sortSelect = document.getElementById("works-sort");
		
		this.modal = document.getElementById("modal");
		this.modalImg = document.getElementById("modal-img");
		this.modalTitle = document.getElementById("modal-title");
		this.modalLink = document.getElementById("modal-link");
		this.modalClose = document.getElementById("modal-close");

		this.state = {
			filter: localStorage.getItem("works.filter") || "all",
			query: localStorage.getItem("works.query") || "",
			sort:"default",
		};
	}

	init() {
		if (!this.container || !this.searchInput || this.filterButtons.length === 0) return;

		this.searchInput.value = this.state.query;
		this.setActiveFilterButton(this.state.filter);

		this.searchInput.addEventListener("input", () => {
			this.state.query = this.searchInput.value.trim().toLowerCase();
			localStorage.setItem("works.query", this.state.query);
			
			this.render();
		});

		this.filterButtons.forEach((btn) => {
			btn.addEventListener("click", () => {
				this.state.filter = btn.dataset.filter || "all";
				localStorage.setItem("works.filter", this.state.filter);
				this.setActiveFilterButton(this.state.filter);
				this.render();
			});
		});

		if(this.sortSelect) {
			this.sortSelect.addEventListener("change", () => {
				this.state.sort = this.sortSelect.value;
				this.render();
			});
	}

	if(this.modalClose) {
		this.modalClose.addEventListener("click",() => {
			this.modal.classList.add("hidden");
		});
	}

	if(this.modal) {
		this.modal.addEventListener("click",(e) => {
			if(e.target ===this.modal) {
				this.modal.classList.add("hidden");
		
			}
		});
	}

	this.render();

}
	
	setActiveFilterButton(filter) {
		this.filterButtons.forEach((btn) => {
	    const isActive = (btn.dataset.filter || "all") === filter;
		btn.classList.toggle("is-active", isActive);
		btn.setAttribute("aria-pressed", String(isActive));
		});
	}
	
	getFilteredProjects() {
		const { filter, query, sort } = this.state;

		let results = this.projects.filter((p) => {
			const matchesFilter = filter === "all" || p.category === filter;

			const haystack = `${p.title} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();
			const matchesQuery = query.length === 0 || haystack.includes(query);

			return matchesFilter && matchesQuery;

		});
	
	
	
	if (sort ==="az") {
		results.sort((a,b) => a.title.localeCompare(b.title));
	}

	if (sort === "za") {
		results.sort((a,b) => b.title.localeCompare(a.title));
	}
	return results;
}
	
	render() {
		const list = this.getFilteredProjects();
		this.container.innerHTML = "";

		if(list.length === 0) {
			const empty = document.createElement("p");
			empty.textContent = "No works match your search.";
			empty.className = "works-empty";
			this.container.appendChild(empty);
			return;
		}

		for (const project of list) {
			const card = document.createElement("a");
			card.className ="work-card";
			card.href= "#";

			card.addEventListener("click", (e) => {
				e.preventDefault();

				this.modalImg.src = project.image;
				this.modalImg.alt = project. title;
				this.modalTitle.textContent = project.title;
				this.modalLink.href = project.href;
				this.modal.classList.remove("hidden");
			});

			const img = document.createElement("img");
			img.className = "thumb";
			img.src = project.image;
			img.alt= project.title;

			const label = document.createElement("div");
			label.className = "label";
			label.textContent =  project.title;

			card.appendChild(img);
			card.appendChild(label);

			this.container.appendChild(card);
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const gallery = new Gallery(PROJECTS, "works-container");
	gallery.init();
});