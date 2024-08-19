
const textBox = document.querySelector('.cmt');
const showButton = document.getElementById('showButton');

showButton.addEventListener('click', function() { 
  // Show the text box by changing its display style
  textBox.style.display = 'flex';
});

const newCommentHandler= async (event) => {
  event.preventDefault();
  const description= document.getElementById('textBox').value.trim();
  const href = window.location.href.split('/');
  console.log(href);
  const post_id = href[href.length-1];
  console.log(description, post_id)
  if (description) {
    const response= await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON. stringify({ post_id, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload()
      console.log(comment);
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .getElementById('submit')
  .addEventListener('click', newCommentHandler);
  