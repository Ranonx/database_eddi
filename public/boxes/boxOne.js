const boxOneElement = document.getElementById("box-one");

if (boxOneElement) {
  fetch("/table-data")
    .then((response) => response.json())
    .then((data) => {
      console.log("table-data fetch called");
      // Get the necessary elements
      const boxOneH2 = document.querySelector("#box-one h1");
      const boxOneP = document.querySelector("#box-one p");

      // Calculate the statistics
      let totalUsers = data.length;
      let maleUsers = 0;
      let femaleUsers = 0;

      data.forEach((user) => {
        if (user.gender === "男") {
          maleUsers++;
        } else if (user.gender === "女") {
          femaleUsers++;
        }
      });

      // Update the content of the elements
      boxOneH2.textContent = `${totalUsers}`;
    })
    .catch((error) => {
      console.error(error);
    });
}
