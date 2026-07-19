document.getElementById('login-btn').addEventListener('click', () => {
  const nameInput = document.getElementById('username-input');
  const userName = nameInput.value;
  console.log(userName);

  const passwordInput = document.getElementById('password-input');
  const password = passwordInput.value;
  console.log(password);

  if (userName == 'admin' && password == 'admin123') {
    alert('Login Succesfully')
    window.location.assign("index.html")
    
  }
  else {
    alert('invalid info')
    return;
  };
})