const boxOneElement = document.getElementById("box-one");

if (boxOneElement) {
  fetch("/table-data")
    .then((response) => response.json())
    .then((data) => {
      console.log("table-data fetch called");
      // Get the necessary elements
      const boxOneH2 = document.querySelector("#box-one h2");
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
      boxOneH2.textContent = `扫描用户总数: ${totalUsers}`;
      boxOneP.textContent = `其中男性用户${maleUsers}人，女性用户${femaleUsers}人。`;
    })
    .catch((error) => {
      console.error(error);
    });
}
