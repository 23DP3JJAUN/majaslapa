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

let car = document.getElementById("car");
    let pos = 0;

    function moveCar() {
        pos += 2;  
        car.style.left = pos + 'px';

        if (pos < window.innerWidth) {
            requestAnimationFrame(moveCar);  
        }
    }

    moveCar();  

    const speletajs1 = "x";
const speletajs2 = "o";

let speletajs1Punkti = 0;
let speletajs2Punkti = 0;

let spelesLaukums = [];

let gajiens = speletajs1;

let speleBeigusies = true;

document.getElementById("speletajs1-punkti").innerText = speletajs1Punkti;
document.getElementById("speletajs2-punkti").innerText = speletajs2Punkti;


function iztiritSpelesLaukumu() {
  spelesLaukums = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  for (let rinda = 0; rinda < spelesLaukums.length; rinda++) {
    for (
      let kolonna = 0;
      kolonna < spelesLaukums[rinda].length;
      kolonna++
    ) {
      const id = `rinda-${rinda}-kolonna-${kolonna}`;

      document.getElementById(id).innerText = "";
    }
  }
}

function saktSpeli() {
  iztiritSpelesLaukumu();

  gajiens = speletajs1;

  speleBeigusies = false;

  document.getElementById("gajiens").innerText = "Spēlētājs 1";
  document.getElementById("gajiens").style.color = "blue";
  document.getElementById("statuss").innerText = "";
  document.getElementById("poga").classList.add("paslepta");
}

function pabeigtSpeli(statuss, speletajs) {
  speleBeigusies = true;

  if (statuss === "DRAW") {
    document.getElementById("statuss").innerText = "Neizšķirts";
  } else if (statuss === "WIN") {
    if (speletajs === speletajs1) {
      document.getElementById("statuss").innerText =
        "Uzvarētājs: Spēlētājs 1!";
    } else if (speletajs === speletajs2) {
      document.getElementById("statuss").innerText =
        "Uzvarētājs: Spēlētājs 2!";
    }
  }

  document.getElementById("speletajs1-punkti").innerText = speletajs1Punkti;
  document.getElementById("speletajs2-punkti").innerText = speletajs2Punkti;

  document.getElementById("poga").classList.remove("paslepta");
}

function parbauditHorizontaloKombinaciju(speletajs) {
  for (let rinda = 0; rinda < spelesLaukums.length; rinda++) {
    let uzvara = true;

    for (
      let kolonna = 0;
      kolonna < spelesLaukums[rinda].length;
      kolonna++
    ) {
      if (spelesLaukums[rinda][kolonna] !== speletajs) {
        uzvara = false;
      }
    }

    if (uzvara === true) {
      return uzvara;
    }
  }

  return false;
}

function parbauditVertikaloKombinaciju(speletajs) {
  for (let kolonna = 0; kolonna < spelesLaukums.length; kolonna++) {
    let uzvara = true;

    for (let rinda = 0; rinda < spelesLaukums[kolonna].length; rinda++) {
      if (spelesLaukums[rinda][kolonna] !== speletajs) {
        uzvara = false;
      }
    }
    if (uzvara === true) {
      return uzvara;
    }
  }
  return false;
}

function parbauditDiagonaloKombinaciju(speletajs) {
  let uzvara = true;

  for (
    let rindaUnKolonna = 0;
    rindaUnKolonna < spelesLaukums.length;
    rindaUnKolonna++
  ) {
    if (spelesLaukums[rindaUnKolonna][rindaUnKolonna] !== speletajs) {
      return false;
    }
  }

  return uzvara;
}

function parbauditDiagonaloKombinaciju2(speletajs) {
  let uzvara = true;

  for (let rinda = spelesLaukums.length - 1; rinda >= 0; rinda--) {
    const kolonna = (rinda - (spelesLaukums.length - 1)) * -1;

    if (spelesLaukums[rinda][kolonna] !== speletajs) {
      return false;
    }
  }

  return uzvara;
}

function parbauditKombinacijas(speletajs) {
  let uzvara = false;

  uzvara = parbauditHorizontaloKombinaciju(speletajs);

  if (uzvara === false) {
    uzvara = parbauditVertikaloKombinaciju(speletajs);
  }

  if (uzvara === false) {
    uzvara = parbauditDiagonaloKombinaciju(speletajs);
  }

  if (uzvara === false) {
    uzvara = parbauditDiagonaloKombinaciju2(speletajs);
  }

  return uzvara;
}

function parbauditNeizskirts() {
  let neizskirts = true;

  for (let rinda = 0; rinda < spelesLaukums.length; rinda++) {
    const rindaPilna = spelesLaukums[rinda].every(
      (lauks) => lauks.includes(speletajs1) || lauks.includes(speletajs2)
    );

    if (rindaPilna === false) {
      neizskirts = false;

      return neizskirts;
    }
  }

  return neizskirts;
}

function iezimetLauku(event) {
  const lauks = document.getElementById(event.target.id);

  if (lauks.innerText === "" && speleBeigusies === false) {
    lauks.innerText = gajiens;

    const rinda = event.target.id.split("-")[1];
    const kolonna = event.target.id.split("-")[3];

    spelesLaukums[rinda][kolonna] = gajiens;

    if (gajiens === speletajs1) {
      lauks.style.color = "blue";

      const uzvara = parbauditKombinacijas(speletajs1);
      const neizskirts = parbauditNeizskirts();

      if (uzvara === true) {
        speletajs1Punkti++;

        pabeigtSpeli("WIN", speletajs1);
      } else if (neizskirts === true) {
        pabeigtSpeli("DRAW");
      } else {
        gajiens = speletajs2;

        document.getElementById("gajiens").innerText = "Spēlētājs 2";
        document.getElementById("gajiens").style.color = "black";
      }
    } else if (gajiens === speletajs2) {
      lauks.style.color = "black";

      const uzvara = parbauditKombinacijas(speletajs2);
      const neizskirts = parbauditNeizskirts();

      if (uzvara === true) {
        speletajs2Punkti++;

        pabeigtSpeli("WIN", speletajs2);
      } else if (neizskirts === true) {
        pabeigtSpeli("DRAW");
      } else {
        gajiens = speletajs1;

        document.getElementById("gajiens").innerText = "Spēlētājs 1";
        document.getElementById("gajiens").style.color = "blue";
      }
    }
  }
}
window.onload = saktSpeli();