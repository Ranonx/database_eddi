fetch("/table-data")
  .then((response) => response.json())
  .then((data) => {
    console.log("CalcFlat.js: table-data fetch called");

    // Get the necessary elements
    const boxTwoH2 = document.querySelector("#box-two h2");
    const boxTwoP = document.querySelector("#box-two p");

    // Calculate the number of users with flatfoot
    const flatfootUsers = data.filter(
      (user) => (user.arch_ratio_right + user.arch_ratio_left) / 2 > 0.26
    );
    const mildFlatfootUsers = data.filter(
      (user) =>
        (user.arch_ratio_right + user.arch_ratio_left) / 2 >= 0.26 &&
        (user.arch_ratio_right + user.arch_ratio_left) / 2 < 0.28
    );
    const moderateFlatfootUsers = data.filter(
      (user) =>
        (user.arch_ratio_right + user.arch_ratio_left) / 2 >= 0.28 &&
        (user.arch_ratio_right + user.arch_ratio_left) / 2 < 0.3
    );
    const seriousFlatfootUsers = data.filter(
      (user) => (user.arch_ratio_right + user.arch_ratio_left) / 2 >= 0.3
    );

    // Update the content of the elements
    boxTwoH2.textContent = `扁平足人数：${flatfootUsers.length}`;
    boxTwoP.innerHTML = `其中，轻度扁平足${mildFlatfootUsers.length}人，中度扁平足${moderateFlatfootUsers.length}人，严重扁平足${seriousFlatfootUsers.length}人。`;
  })
  .catch((error) => {
    console.error(error);
  });
