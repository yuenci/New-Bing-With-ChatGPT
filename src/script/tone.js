export default function AddTone() {
    let content =
        `<div>Choose a conversation style</div>
      <div id="tone-con">
        <div class="tone-card">
          <div>More</div>
          <div>Creative</div>
        </div>
        <div class="tone-card">
          <div>More</div>
          <div>Balanced</div>
        </div>
        <div class="tone-card">
          <div>More</div>
          <div>Precise</div>
        </div>
      </div>`;

    let tone = document.createElement('div');
    tone.id = 'tone-container';
    tone.innerHTML = content;
    document.body.appendChild(tone);
    addEvent(tone);
}

function addEvent(dom) { }