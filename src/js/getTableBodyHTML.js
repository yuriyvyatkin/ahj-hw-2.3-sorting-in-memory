export default function getTableBodyHTML(data) {
  let html = '';

  for (const item of data) {
    const imdbDigits = String(item.imdb).split('.');
    imdbDigits[1] = imdbDigits[1] ? imdbDigits[1].padEnd(2, '0') : '00';

    html += `
      <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${imdbDigits.join('.')}</td>
      </tr>
    `;
  }

  return html;
}
