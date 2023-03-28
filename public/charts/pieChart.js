const pieChartElement = document.getElementById("pieChart");

if (pieChartElement) {
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
        type: "pie",
        data: {
          labels: ["男", "女"],
          datasets: [
            {
              label: "性别",
              data: [maleCount, femaleCount],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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
