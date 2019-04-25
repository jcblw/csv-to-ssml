import test from "ava";
import { decodeCSV, createSSML, INSTRUCTIONS } from "../";

test("decodeCSV should not throw an error when passed an empty string", t => {
  t.deepEqual(decodeCSV(), []);
});

test("decodeCSV should encode a json object with the proper instructions", t => {
  const csv = `${INSTRUCTIONS.TEXT}, foo
  ${INSTRUCTIONS.BREAK}, 1
  ${INSTRUCTIONS.AUDIO}, https://foo.bar
  ${INSTRUCTIONS.LANGUAGE}, en-US
  ${INSTRUCTIONS.PROSODY}, slow
  `;
  const jsonInstructions = [
    { type: INSTRUCTIONS.TEXT, text: "foo" },
    { type: INSTRUCTIONS.BREAK, break: "1" },
    { type: INSTRUCTIONS.AUDIO, audio: "https://foo.bar" },
    { type: INSTRUCTIONS.LANGUAGE, language: "en-US" },
    { type: INSTRUCTIONS.PROSODY, prosody: "slow" }
  ];
  t.deepEqual(decodeCSV(csv), jsonInstructions);
});

test("createSSML should take instructions created by decodeCSV and spit out SSML", t => {
  const jsonInstructions = [
    { type: INSTRUCTIONS.LANGUAGE, language: "en-US" },
    { type: INSTRUCTIONS.TEXT, text: "foo" },
    { type: INSTRUCTIONS.BREAK, break: "1" },
    { type: INSTRUCTIONS.AUDIO, audio: "https://foo.bar" },
    { type: INSTRUCTIONS.PROSODY, prosody: "slow" }
  ];
  t.is(
    createSSML(jsonInstructions),
    `<?xml version="1.0"?>
<speak xmlns="http://www.w3.org/2001/10/synthesis" version="1.0" xml:lang="en-US">
  foo
  <break time="1"/>
  <audio src="https://foo.bar"/>
  <prosody rate="slow"/>
</speak>`
  );
});

test("createSSML spit out nothing if no instuctions are given", t => {
  const jsonInstructions = [];
  t.is(
    createSSML(jsonInstructions),
    `<?xml version="1.0"?>
<speak xmlns="http://www.w3.org/2001/10/synthesis" version="1.0" xml:lang="en-US"/>`
  );
});

test("toSSML should combine", t => {
  const jsonInstructions = [];
  t.is(
    createSSML(jsonInstructions),
    `<?xml version="1.0"?>
<speak xmlns="http://www.w3.org/2001/10/synthesis" version="1.0" xml:lang="en-US"/>`
  );
});
