// aboutme js code

document.addEventListener ("DOMContentLoaded" , () => {
	const body = document.body; 
	const toggle = document.getElementById("theme-switch");

	if (localStorage.getItem("aboutTheme") === "dark") {
		body.classList.add ("dark");
		toggle.checked = true;
	}

	toggle.addEventListener ("change" , () => {
		if(toggle.checked) {
			body.classList.add("dark") ;
			localStorage.setItem("aboutTheme" ,"dark");
		} else {
			body.classList.remove("dark");
			localStorage.setItem("aboutTheme", "light");
		}
	});
});

