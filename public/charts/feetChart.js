fetch("/flatness.txt")
  .then((response) => response.text())
  .then((data) => {
    const flatness = data.split("\n").map((row) => row.split(" "));

    const n_points = flatness.length;
    const x_min = (y_min = 0);
    const x_max = (y_max = 1);
    const x = Array.from(
      { length: n_points },
      (_, i) => x_min + ((x_max - x_min) / (n_points - 1)) * i
    );
    const y = Array.from(
      { length: n_points },
      (_, i) => y_min + ((y_max - y_min) / (n_points - 1)) * i
    );

    const chartData = {
      labels: y,
      datasets: [
        {
          data: flatness
            .reduce((acc, val) => acc.concat(val), [])
            .map((value) => parseFloat(value)),
          borderWidth: 1,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          x: x,
        },
      ],
    };

    const ctx = document.getElementById("feetChart").getContext("2d");
    new Chart(ctx, {
      type: "heatmap",
      data: chartData,
      options: {
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
            title: {
              display: true,
              text: "X Axis",
            },
          },
          y: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
            title: {
              display: true,
              text: "Y Axis",
            },
          },
        },

        responsive: true,
        maintainAspectRatio: false,
      },
    });
  });
