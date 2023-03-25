export default function AddLoading() {
    let content =
        `<div id="loading-con">
        <div id="loading-icon"></div>
        <div>Stop Responding</div>
      </div>`;

    let loading = document.createElement('div');
    loading.id = 'loading-container';
    loading.innerHTML = content;
    document.body.appendChild(loading);
    addEvent(loading);
}

function addEvent(dom) { }
