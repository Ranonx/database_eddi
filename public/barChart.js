document.addEventListener("DOMContentLoaded", function () {
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
            (participant.arch_ratio_left + participant.arch_ratio_right) / 2;
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
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgb(54, 162, 235)",
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
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
              borderRadius: 30,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Participants",
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
});
