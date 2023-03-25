import { color } from "./StatusContainer.js";

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

let container, creativeBtn, balancedBtn, preciseBtn;

function addEvent(dom) {
  container = $(dom).find('#tone-con');
  creativeBtn = $(container).find('.tone-card').eq(0);
  balancedBtn = $(container).find('.tone-card').eq(1);
  preciseBtn = $(container).find('.tone-card').eq(2);

  clearBGC();

  $(".tone-card").on('click', function () {
    clearBGC();
    $(this).css('background', color[$(this).find('div').eq(1).text().toLowerCase()]);
    $(this).css('color', 'white');
  });
}

function clearBGC() {
  let btns = [creativeBtn, balancedBtn, preciseBtn];

  for (let i = 0; i < btns.length; i++) {
    $(btns[i]).css('background', 'white');
    $(btns[i]).css('color', 'black');
  }
}