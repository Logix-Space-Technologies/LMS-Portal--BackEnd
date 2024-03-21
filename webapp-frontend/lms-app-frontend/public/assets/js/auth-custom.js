function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("!hidden");
  } else {
    console.error("Loader element not found");
  }
}
