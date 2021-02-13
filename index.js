// @ts-check
const alfy = require("alfy");
const clipboardy = require("clipboardy");

runWorkflow();

/**
 * @param {string} input
 *
 * @returns {string[]}
 */
function splitToLowerCaseWords(input) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[\W_]/g);
}

/**
 * @param {string} word
 *
 * @returns {string}
 */
function capitalize(word) {
  if (word.length < 2) return word.toUpperCase();
  return word[0].toUpperCase() + word.slice(1);
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toPascalCase(words) {
  return words.map(capitalize).join("");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toCamelCase(words) {
  return words[0] + toPascalCase(words.slice(1));
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toConstantCase(words) {
  return words.map((word) => word.toUpperCase()).join("_");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toDotCase(words) {
  return words.join(".");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toKebabCase(words) {
  return words.join("-");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toLowerCase(words) {
  return words.join("");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toNoCase(words) {
  return words.join(" ");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toPathCase(words) {
  return words.join("/");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toSentenceCase(words) {
  return capitalize(toNoCase(words));
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toSnakeCase(words) {
  return words.join("_");
}

/**
 * @param {string[]} words
 *
 * @returns {string}
 */
function toTitleCase(words) {
  return words.map(capitalize).join(" ");
}

function getFromClipboard() {
  return clipboardy.read();
}

async function runWorkflow() {
  let input = alfy.input.trim();

  if (input.length === 0) {
    input = await getFromClipboard().then((x) => x.trim());
  }

  if (input.length === 0) {
    return;
  }

  const words = splitToLowerCaseWords(input);

  const transforms = {
    camel: toCamelCase(words),
    constant: toConstantCase(words),
    dot: toDotCase(words),
    kebab: toKebabCase(words),
    lower: toLowerCase(words),
    no: toNoCase(words),
    pascal: toPascalCase(words),
    path: toPathCase(words),
    sentence: toSentenceCase(words),
    snake: toSnakeCase(words),
    title: toTitleCase(words),
  };

  const elements = [
    {
      title: "camelCase",
      value: transforms.camel,
    },
    {
      title: "CONSTANT_CASE",
      value: transforms.constant,
    },
    {
      title: "dot.case",
      value: transforms.dot,
    },
    {
      title: "kebab-case",
      value: transforms.kebab,
    },
    {
      title: "lowercase",
      value: transforms.lower,
    },
    {
      title: "no case",
      value: transforms.no,
    },
    {
      title: "PascalCase",
      value: transforms.pascal,
    },
    {
      title: "path/case",
      value: transforms.path,
    },
    {
      title: "PascalCase",
      value: transforms.pascal,
    },
    {
      title: "Sentence case",
      value: transforms.sentence,
    },
    {
      title: "snake_case",
      value: transforms.snake,
    },
    {
      title: "Title case",
      value: transforms.title,
    },
  ];

  alfy.output(
    elements.map((element) => ({
      arg: element.value,
      title: `${element.title}: ${element.value}`,
      subtitle: `Paste ${element.value} at cursor position`,
      text: {
        copy: element.value,
        largetype: element.value,
      },
    }))
  );
}
