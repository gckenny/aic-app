import ensureArray from 'ensure-array';

/**
 * Util to export CSV file.
 * @param {Array} data - CSV content, should be a two-dimension array. Each array element represents a row
 *   for example:
 *   [
 *     ['column1', 'column2', 'column3'],
 *     ['row2-1', 'row2-2', 'row2-3'],
 *     ['row3-1', 'row3-2', 'row3-3']
 *   ]
 * @param {string} exportFilename - Target file name of csv file. Default value is 'download.csv'
 */
export const exportCSV = (data, exportFilename = 'download.csv') => {
  data = ensureArray(data).slice();
  if (data.length === 0) {
    return;
  }

  for (let i = 0; i < data.length; ++i) {
    const row = ensureArray(data[i]);
    for (let j = 0; j < row.length; ++j) {
      const col = String(row[j]);
      row[j] = `"${col.replace(/"/g, '""')}"`;
    }
    data[i] = row.join(',');
  }
  const str = '\ufeff' + data.join('\r\n');

  // UTF-8 with BOM
  // https://github.com/mholt/PapaParse/issues/175#issuecomment-201308792

  const csvData = new Blob([str], { type: 'text/csv;charset=utf-8;' });

  // IE11 & Edge
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(csvData, exportFilename);
  } else {
    //In FF link must be added to DOM to be clicked
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(csvData);
    console.log('link.href', link.href);
    link.setAttribute('download', exportFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const getCSVHyperLink = (href, displayText) => {
  return `=HYPERLINK("${href}","${displayText}")`;
};

window.exportCSV = exportCSV;
window.getCSVHyperLink = getCSVHyperLink;
