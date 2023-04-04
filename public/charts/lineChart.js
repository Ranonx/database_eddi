// Check if the dashboard page is active
const lineChartElement = document.getElementById("myChart");

if (lineChartElement) {
  fetch("/table-data")
    .then((response) => response.json())
    .then((data) => {
      // Sort the data by average shoe size
      data.sort(
        (a, b) =>
          (a.shoe_size_left + a.shoe_size_right) / 2 -
          (b.shoe_size_left + b.shoe_size_right) / 2
      );

      // Extract the shoe sizes and arch ratios into separate arrays
      const shoeSizes = data.map(
        (row) => (row.shoe_size_left + row.shoe_size_right) / 2
      );
      const archRatios = data.map(
        (row) => (row.arch_index_left + row.arch_index_right) / 2
      );

      // Render the line chart
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: shoeSizes,
          datasets: [
            {
              label: "扁平足程度",
              data: archRatios,
              borderColor: "rgb(255, 159, 64)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.3,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "平均鞋码",
              },
              ticks: {
                stepSize: 1,
              },
            },
            y: {
              title: {
                display: true,
                text: "扁平足程度",
              },
              suggestedMin: 0,
              suggestedMax: 0.5,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
