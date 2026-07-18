const btnElList = document.querySelectorAll('.btn');

btnElList.forEach(btnEl => {
  btnEl.addEventListener('click', () => {
   
    btnElList.forEach(btn => btn.classList.remove('special'));
    
    
    btnEl.classList.add('special');
  });
})