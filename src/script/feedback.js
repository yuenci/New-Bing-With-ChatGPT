export default function AddFeedback() {
    let content = `
    <img src="./image/feedback.svg" id="feedback-icon">
      <div>Feedback</div>
    `;
    let feedback = document.createElement('div');
    feedback.id = 'feedback-container';
    feedback.innerHTML = content;
    document.body.appendChild(feedback);
    addEvent(feedback);
}

function addEvent(dom) { }