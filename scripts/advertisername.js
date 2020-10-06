const checkbox = document.getElementById('advertisernamecheckbox');

checkbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('advertisernametext').readOnly = false
    document.getElementById('advertisernametext').value="";
  } else {
    document.getElementById('advertisernametext').readOnly = true
    document.getElementById('advertisernametext').value="Müüdh-barthilas";
  }
})
