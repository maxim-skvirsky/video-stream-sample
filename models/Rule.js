const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
  appname: {
    type: Schema.Types.String,
    required: true
  },
  geo_include: [{ type: Schema.Types.String }],
  geo_exclude: [{ type: Schema.Types.String }],
  ad: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = Rule = mongoose.model("rule", RuleSchema);
