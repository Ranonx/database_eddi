const pieChartElement = document.getElementById("pieChart");

if (pieChartElement) {
  const maleColor = "rgba(255, 159, 64, 0.2)";
  const maleBorderColor = "rgb(255, 165, 0)";
  const femaleColor = "rgba(255, 192, 203, 0.2)";
  const femaleBorderColor = "rgb(255, 99, 132)";

  fetch("/table-data")
    .then((response) => response.json())
    .then((data) => {
      let maleCount = 0;
      let femaleCount = 0;

      data.forEach((row) => {
        if (row.gender === "男") {
          maleCount++;
        } else if (row.gender === "女") {
          femaleCount++;
        }
      });

      const ctx = document.getElementById("pieChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["男", "女"],
          datasets: [
            {
              label: "性别",
              data: [maleCount, femaleCount],
              backgroundColor: [maleColor, femaleColor],
              borderColor: [maleBorderColor, femaleBorderColor],
              borderWidth: 1,
            },
          ],
        },
        options: {
          aspectRatio: 2,
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "性别分布",
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
