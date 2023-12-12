const themeFun = (theme) => {
  const html = document.querySelector("html");
  if (theme === "light") {
    html.classList.add("light");
    html.classList.remove("Dim");
    html.classList.remove("dark");
  } else if (theme === "Dim") {
    html.classList.add("Dim");
    html.classList.remove("light");
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
    html.classList.remove("light");
    html.classList.remove("Dim");
  }
};
export default themeFun;
