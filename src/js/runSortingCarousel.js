import data from './data';
import getTableBodyHTML from './getTableBodyHTML';

export default function runSortingCarousel() {
  const tBody = document.querySelector('tbody');

  tBody.insertAdjacentHTML('beforeend', getTableBodyHTML(data));

  const tHeadersArray = Array.from(document.getElementsByTagName('th'));
  const comparators = [];

  tHeadersArray.forEach((tHeader, index) => {
    const dataName = tHeader.textContent;
    const { type } = tHeader.dataset;
    let comparator;

    switch (type) {
      case 'number':
        comparator = (a, b) => a[dataName] - b[dataName];
        comparators.push({
          tHeaderIndex: index,
          order: ' ↑',
          comparator,
        });
        comparator = (a, b) => b[dataName] - a[dataName];
        comparators.push({
          tHeaderIndex: index,
          order: ' ↓',
          comparator,
        });
        break;
      case 'string':
        comparator = (a, b) => {
          if (a[dataName] > b[dataName]) {
            return 1;
          }
          return -1;
        };
        comparators.push({
          tHeaderIndex: index,
          order: ' ↑',
          comparator,
        });
        comparator = (a, b) => {
          if (b[dataName] > a[dataName]) {
            return 1;
          }
          return -1;
        };
        comparators.push({
          tHeaderIndex: index,
          order: ' ↓',
          comparator,
        });
        break;
      default:
        throw new Error(`Error! Unknown data type: ${type}.`);
    }
  });

  let currentIndex = 0;
  let lastTHeaderIndex = 0;

  setInterval(() => {
    currentIndex %= comparators.length;

    data.sort(comparators[currentIndex].comparator);

    tBody.textContent = '';
    tBody.insertAdjacentHTML('beforeend', getTableBodyHTML(data));

    tHeadersArray[lastTHeaderIndex].textContent = tHeadersArray[lastTHeaderIndex].textContent.replace(/ \S+/, '');
    tHeadersArray[comparators[currentIndex].tHeaderIndex].textContent
      += comparators[currentIndex].order;
    lastTHeaderIndex = comparators[currentIndex].tHeaderIndex;

    currentIndex += 1;
  }, 2000);
}
