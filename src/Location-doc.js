import React from "react";
import domtoimage from "dom-to-image";
import htmlDocx from "html-docx-js/dist/html-docx";

function convertImagesToBase64(targetDocumentElement) {
  var clonedDocumentElement = targetDocumentElement.cloneNode(true);

  var regularImages = targetDocumentElement.querySelectorAll("img");
  var clonedImages = clonedDocumentElement.querySelectorAll("img");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  for (var i = 0; i < regularImages.length; i++) {
    var regularImgElement = regularImages[i];
    var clonedImgElement = clonedImages[i];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = regularImgElement.width;
    canvas.height = regularImgElement.height;

    ctx.scale(
      regularImgElement.width / regularImgElement.naturalWidth,
      regularImgElement.height / regularImgElement.naturalHeight
    );
    ctx.drawImage(regularImgElement, 0, 0);

    // by default toDataURL() produces png image, but you can also export to jpeg
    // checkout function's documentation for more details
    var dataURL = canvas.toDataURL();

    clonedImgElement.setAttribute("src", dataURL);
  }

  canvas.remove();

  return clonedDocumentElement;
}

function exportDoc(e, elementId, filename) {
  e.preventDefault();
  if (!window.Blob) {
    alert("Your legacy browser does not support this action.");
    return;
  }

  elementId = "user_searched";
  var documentElement = document.getElementById(elementId);
  var blob, url, css;

  const docBasicCss =
    "<style>" +
    "@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}";
  css =
    docBasicCss +
    "div.WordSection1 {page: WordSection1;}" +
    "table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:2px;}" +
    "</style>";

  domtoimage
    .toPng(documentElement)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      img.id = "map_to_image";
      let el = document.createElement("div");
      el.appendChild(convertImagesToBase64(img).cloneNode(false));
      blob = htmlDocx.asBlob(el.innerHTML);

      url = URL.createObjectURL(blob);
      openOrDownloadBlob(blob, url, filename);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function exportHTML(elementId, filename) {
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML =
    header + document.getElementById(elementId).innerHTML + footer;

  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `${filename}.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

function openOrDownloadBlob(blob, url, filename) {
  let link = document.createElement("a");
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
      <button id="export" onClick={exportDoc}>
        Export
      </button>{" "}
      Click to open table in Microsoft Word
      <div id="another_docx">
        <div className="WordSection1">
          <table class="table table-bordered">
            <caption>Recent Search</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Location</th>
                <th scope="col">Lat</th>
                <th scope="col">Lng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Chand, Kaimur (Bhabua), Bihar, 821120, India</td>
                <td>25.109713749999997</td>
                <td>83.40720849758048</td>
              </tr>
            </tbody>
          </table>
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
