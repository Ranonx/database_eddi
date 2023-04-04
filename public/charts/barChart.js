const barChartElement = document.getElementById("barChart");

if (barChartElement) {
  const maleColor = "rgba(255, 159, 64, 0.2)";
  const maleBorderColor = "rgb(255, 165, 0)";
  const femaleColor = "rgba(255, 192, 203, 0.2)";
  const femaleBorderColor = "rgb(255, 99, 132)";

  console.log("barChart called");
  fetch("/table-data")
    .then((response) => response.json())
    .then((data) => {
      // Calculate the number of participants in each category of flatfootedness
      const flatfootednessCounts = {
        mild: 0,
        moderate: 0,
        severe: 0,
      };
      data.forEach((participant) => {
        const archRatio =
          (participant.arch_ratio_left + participant.arch_ratio_right) / 2;
        if (archRatio < 0.28) {
          flatfootednessCounts.mild++;
        } else if (archRatio < 0.3) {
          flatfootednessCounts.moderate++;
        } else {
          flatfootednessCounts.severe++;
        }
      });

      // Group the participants by gender
      const participantsByGender = {
        male: [],
        female: [],
      };
      data.forEach((participant) => {
        const genderLower = participant.gender === "男" ? "male" : "female";
        participantsByGender[genderLower].push(participant);
      });

      // Calculate the number of male and female participants in each category of flatfootedness
      const flatfootednessCountsByGender = {
        mild: { male: 0, female: 0 },
        moderate: { male: 0, female: 0 },
        severe: { male: 0, female: 0 },
      };
      Object.entries(participantsByGender).forEach(([gender, participants]) => {
        participants.forEach((participant) => {
          const archRatio =
            (participant.arch_index_left + participant.arch_index_right) / 2;
          if (archRatio < 0.28) {
            flatfootednessCountsByGender.mild[gender]++;
          } else if (archRatio < 0.3) {
            flatfootednessCountsByGender.moderate[gender]++;
          } else {
            flatfootednessCountsByGender.severe[gender]++;
          }
        });
      });

      // Render the bar chart
      const ctx = document.getElementById("barChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["轻度", "中度", "重度"],
          datasets: [
            {
              label: "男",
              data: [
                flatfootednessCountsByGender.mild.male,
                flatfootednessCountsByGender.moderate.male,
                flatfootednessCountsByGender.severe.male,
              ],

              backgroundColor: maleColor,
              borderColor: maleBorderColor,
              borderWidth: 1,
              borderRadius: 30,
            },
            {
              label: "女",
              data: [
                flatfootednessCountsByGender.mild.female,
                flatfootednessCountsByGender.moderate.female,
                flatfootednessCountsByGender.severe.female,
              ],
              backgroundColor: femaleColor,
              borderColor: femaleBorderColor,
              borderWidth: 1,
              borderRadius: 30,
            },
          ],
        },
        options: {
          aspectRatio: 2,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "扁平足人数",
              },
            },
            x: {
              title: {
                display: true,
                text: "扁平足程度",
              },
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
