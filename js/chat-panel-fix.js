// Chat panel debugging and fix
document.addEventListener('DOMContentLoaded', () => {
  const chatOpen = document.getElementById('chat-open');
  const chatClose = document.getElementById('chat-close');
  const chatPanel = document.getElementById('chat-panel');

  console.log('Chat panel elements found:', {
    chatOpen: !!chatOpen,
    chatClose: !!chatClose,
    chatPanel: !!chatPanel
  });

  // Test if elements exist and are properly connected
  if (chatOpen && chatClose && chatPanel) {
    // Force remove any existing event listeners by cloning
    const newChatClose = chatClose.cloneNode(true);
    chatClose.parentNode.replaceChild(newChatClose, chatClose);
    
    // Add fresh event listener
    newChatClose.addEventListener('click', (e) => {
      console.log('Chat close button clicked!', e);
      chatPanel.classList.remove('is-open');
      chatPanel.setAttribute('aria-hidden', 'true');
      
      // Verify the panel actually closed
      setTimeout(() => {
        console.log('Chat panel state after close:', {
          isOpen: chatPanel.classList.contains('is-open'),
          ariaHidden: chatPanel.getAttribute('aria-hidden')
        });
      }, 100);
    });

    // Also add click outside to close functionality
    document.addEventListener('click', (e) => {
      if (chatPanel.classList.contains('is-open') && 
          !chatPanel.contains(e.target) && 
          !chatOpen.contains(e.target)) {
        console.log('Clicked outside chat panel, closing...');
        chatPanel.classList.remove('is-open');
        chatPanel.setAttribute('aria-hidden', 'true');
      }
    });

    console.log('Chat panel fix applied successfully');
  } else {
    console.error('Chat panel elements not found:', {
      chatOpen,
      chatClose,
      chatPanel
    });
  }
});
