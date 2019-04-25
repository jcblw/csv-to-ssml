const util = require("util");
const SSML = require("ssml");

const INSTRUCTIONS = {
  AUDIO: "AUDIO",
  BREAK: "BREAK",
  LANGUAGE: "LANGUAGE",
  PROSODY: "PROSODY",
  TEXT: "TEXT"
};

const decodeCSV = (csv = "") =>
  csv
    .split("\n")
    .map(row => row.split(",").map(x => x.trim()))
    .filter(row => row.length >= 2)
    .map(row => ({
      type: row[0],
      [row[0].toLowerCase()]: row[1]
    }));

const createSSML = seq =>
  seq
    .reduce((_ssml, item) => {
      switch (item.type) {
        // NOTE: language creates a new SSML instance.
        case INSTRUCTIONS.LANGUAGE:
          return new SSML({ language: item.language });
        case INSTRUCTIONS.TEXT:
          _ssml.say(item.text);
          break;
        case INSTRUCTIONS.PROSODY:
          _ssml.prosody({ rate: item.prosody });
          break;
        case INSTRUCTIONS.AUDIO:
          _ssml.audio({ src: item.audio });
          break;
        case INSTRUCTIONS.BREAK:
          _ssml.break(item.break);
          break;
        default:
          break;
      }
      return _ssml;
    }, new SSML())
    .toString({ pretty: true });

const toSSML = csv => createSSML(decodeCSV(csv));

module.exports = { toSSML, decodeCSV, createSSML, INSTRUCTIONS };
