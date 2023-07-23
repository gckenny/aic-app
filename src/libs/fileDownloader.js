export function download(link) {
  const element = window.parent.document.createElement('a');
  element.setAttribute('href', link);
  element.setAttribute('download', '');
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function downloadFile({ filename, data, type = 'text/plain' }) {
  const file = new Blob([data], { type });

  if (window.navigator.msSaveOrOpenBlob) {
    // IE 10
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    // others
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
