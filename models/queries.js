const db = require("./db");

const getFootData = (searchQuery, callback) => {
  let sql = "SELECT * FROM foot_data_ext";

  if (searchQuery) {
    // Add a WHERE clause to filter the results based on the search query
    sql += ` WHERE name LIKE '%${searchQuery}%' OR id_num LIKE '%${searchQuery}%'`;
  }

  if (typeof callback === "function") {
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        const tableData = result.map((row) => {
          return {
            id: row.id,
            id_num: row.id_num,
            name: row.name,
            gender: row.gender,
            age: row.age,
            feet_length_left: row.feet_length_left,
            feet_length_right: row.feet_length_right,
            arch_length_left: row.arch_length_left,
            arch_length_right: row.arch_length_right,
            shoe_size_left: row.shoe_size_left,
            shoe_size_right: row.shoe_size_right,
            arch_index_left: row.arch_index_left,
            arch_index_right: row.arch_index_right,
          };
        });
        callback(null, tableData);
      }
    });
  } else {
    console.error("callback is not a function");
  }
};

module.exports = {
  getFootData,
};
