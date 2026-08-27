const revealButton = document.getElementById('revealChecklist');
const checklistPanel = document.getElementById('checklistPanel');

revealButton.addEventListener('click', () => {
  const isOpen = revealButton.getAttribute('aria-expanded') === 'true';

  revealButton.setAttribute('aria-expanded', String(!isOpen));
  checklistPanel.hidden = isOpen;
  revealButton.textContent = isOpen
    ? 'Open the departure checklist'
    : 'Close the departure checklist';
});
