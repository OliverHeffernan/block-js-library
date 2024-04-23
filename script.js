function submit() {
    setVar('name', document.getElementById('nameInput').value);
    copyBlock('egblock', 'body', 'this,is,copy');
}