function getCatFact() {
  fetch('https://catfact.ninja/fact') 
      .then(response => response.json())  
      .then(data => {

          document.getElementById('cat-fact').innerText = data.fact;
      })
      .catch(error => {

          document.getElementById('cat-fact').innerText = 'Neizdevās iegūt kaķu faktu. Lūdzu, mēģiniet vēlreiz!';
      });
}

getCatFact();