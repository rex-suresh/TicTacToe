// template pattern
const template = [
  'div#board',
  ['div#1', ' '],
  ['div#2', ' '],
  ['div#3', ' '],
  ['div#4', ' '],
  ['div#5', ' '],
  ['div#6', ' '],
  ['div#7', ' '],
  ['div#8', ' '],
  ['div#9', ' '],
];

const divOf = (tagSel, content) => {
  const [tag, id] = tagSel.split('#');
  const div = document.createElement(tag);
  div.id = id;
  div.innerText = content;

  return div;
};

const elementTree = (tree) => {
  const [tag, ...content] = tree;
  if (Array.isArray(content)) {
    return;
  }
};
