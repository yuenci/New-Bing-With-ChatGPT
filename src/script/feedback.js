import { pubsub } from "./StatusContainer.js";


export default function AddFeedback() {
  let content = `
    <div id="feedback-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path d="M2048 128v1408H731l-475 475v-475H0V128h2048z"></path>
  </svg>
    </div>
          <div>Feedback</div>
    `;
  let feedback = document.createElement('div');
  feedback.id = 'feedback-container';
  feedback.innerHTML = content;
  document.body.appendChild(feedback);
  addEvent(feedback);
}

pubsub.subscribe('tone', function (data) {
  $("#feedback-icon svg").attr("class", `arrow-icon-${data.message}`);
  $("#feedback-container").css("border-color", icon[data.message]);
});


function addEvent(dom) { }