import React from "react";

function exportDoc(e, elementId, filename) {
  e.preventDefault();
  if (!window.Blob) {
    alert("Your legacy browser does not support this action.");
    return;
  }

  var html, link, blob, url, css;

  // EU A4 use: size: 841.95pt 595.35pt;
  // US Letter use: size:11.0in 8.5in;

  css =
    "<style>" +
    "@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}" +
    "div.WordSection1 {page: WordSection1;}" +
    "table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:2px;}" +
    "</style>";

  const el = document.getElementById(elementId);
  html = el.innerHTML;
  blob = new Blob(["\ufeff", css + html], {
    type: "application/msword",
  });
  url = URL.createObjectURL(blob);
  link = document.createElement("A");
  link.href = url;
  // Set default file name.
  // Word will append file extension - do not add an extension here.
  link.download = filename;
  document.body.appendChild(link);
  if (navigator.msSaveOrOpenBlob)
    navigator.msSaveOrOpenBlob(blob, `${filename}.doc`);
  // IE10-11
  else link.click(); // other browsers
  document.body.removeChild(link);
}

export default function LocationDOC(props) {
  return (
    <div>
      <button id="export" onClick={exportDoc}>Export</button> Click to open table in Microsoft
      Word
      <div id="another_docx">
        <div className="WordSection1">
          <table class="table table-bordered"><caption>Recent Search</caption><thead><tr><th scope="col">#</th><th scope="col">Location</th><th scope="col">Lat</th><th scope="col">Lng</th></tr></thead><tbody><tr><th scope="row">1</th><td>Chand, Kaimur (Bhabua), Bihar, 821120, India</td><td>25.109713749999997</td><td>83.40720849758048</td></tr></tbody></table>
        </div>
      </div>
    </div>
  );
}

export function DOCDownloadLink(props) {
  let { fileName, elementId } = props;
  return (
    <a
      role="button"
      href={void 0}
      id="export"
      onClick={(e) => exportDoc(e, elementId, fileName)}
      style={{ color: "#007bff" }}
    >
      Export as Doc
    </a>
  );
}