document.addEventListener("DOMContentLoaded", () => {
  console.log("search.js called");
  const searchInput = document.getElementById("search-input");
  const tableBody = document.getElementById("data-table");

  searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value;
    console.log(`searchValue: ${searchValue}`); // Check if search value is being captured correctly
    fetch(`/table-data?searchTerm=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`data: ${data}`);
        // Clear existing table rows
        tableBody.innerHTML = "";

        // Render new table rows based on the filtered data
        tableBody.innerHTML = data
          .map((row) => {
            return `
              <tr>
                <td>${row.id}</td>
                <td>${row.id_num}</td>
                <td>${row.name}</td>
                <td>${row.gender}</td>
                <td>${row.shoe_size_left}</td>
                <td>${row.arch_length_left}</td>
                <td>${row.arch_width_left}</td>
                <td>${row.heel_width_left}</td>
                <td>${row.foot_length_left}</td>
                <td>${row.foot_width_left}</td>
                <td>${row.ball_girth_left}</td>
                <td>${row.arch_index_left}</td>
                <td>${row.arch_ratio_left}</td>
                <td>${row.shoe_size_right}</td>
                <td>${row.arch_length_right}</td>
                <td>${row.arch_width_right}</td>
                <td>${row.heel_width_right}</td>
                <td>${row.foot_length_right}</td>
                <td>${row.foot_width_right}</td>
                <td>${row.ball_girth_right}</td>
                <td>${row.arch_index_right}</td>
                <td>${row.arch_ratio_right}</td>
              </tr>
            `;
          })
          .join("");
      });
  });
});
