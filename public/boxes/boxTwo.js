// Check if the dashboard page is active
const boxTwoElement = document.getElementById("box-two");

if (boxTwoElement) {
  fetch("/table-data")
    .then((response) => response.json())
    .then((data) => {
      console.log("CalcFlat.js: table-data fetch called");

      // Get the necessary elements
      const boxTwoH2 = document.querySelector("#box-two h1");

      // Calculate the number of users with flatfoot
      const flatfootUsers = data.filter(
        (user) => (user.arch_ratio_right + user.arch_ratio_left) / 2 >= 0.26
      );

      // Update the content of the elements
      boxTwoH2.textContent = `${flatfootUsers.length}`;
    })
    .catch((error) => {
      console.error(error);
    });
}
