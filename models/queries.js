const db = require("./db");

const getFootData = (callback) => {
  const sql = "SELECT * FROM foot_data";
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
            shoe_size_left: row.shoe_size_left,
            arch_length_left: row.arch_length_left,
            arch_width_left: row.arch_width_left,
            heel_width_left: row.heel_width_left,
            foot_length_left: row.foot_length_left,
            foot_width_left: row.foot_width_left,
            ball_girth_left: row.ball_girth_left,
            arch_index_left: row.arch_index_left,
            arch_ratio_left: row.arch_ratio_left,
            shoe_size_right: row.shoe_size_right,
            arch_length_right: row.arch_length_right,
            arch_width_right: row.arch_width_right,
            heel_width_right: row.heel_width_right,
            foot_length_right: row.foot_length_right,
            foot_width_right: row.foot_width_right,
            ball_girth_right: row.ball_girth_right,
            arch_index_right: row.arch_index_right,
            arch_ratio_right: row.arch_ratio_right,
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
