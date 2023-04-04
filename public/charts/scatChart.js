const scatterChart = document.getElementById("scatterChart");

if (scatterChart) {
  let scatterData = {
    datasets: [
      {
        label: "年龄与足弓关系",
        data: [],
      },
    ],
  };

  console.log("scatChart called");
  // Fetch the foot data from the server and add it to the scatter chart
  fetch("/table-data")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((row) => {
        let footIndex = (row.arch_index_left + row.arch_index_right) / 2;
        scatterData.datasets[0].data.push({
          x: row.age,
          y: footIndex,
        });
      });
      let myScatterChart = new Chart(scatterChart, {
        type: "scatter",
        data: scatterData,
        options: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "年龄",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "足弓比",
                },
              },
            ],
          },
        },
      });
    })
    .catch((err) => console.error(err));
}
