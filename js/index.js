//Osztályok
class Mezo {
  sarok; //bool
  kincs; //null, Kincs
  jatekosok; //null, [Jatekos]
  tipus; //null, egyenes, kanyar, elagazas
  forgatas; //null, 0-3
  kiemelet; //bool
  neztekMarAjtokat; //bool

  constructor() {
    this.sarok = false
    this.kincs = null
    this.jatekosok = new Array()
    this.tipus = null
    this.forgatas = null
    this.kiemelet = false
    this.neztekMarAjtokat = false
  }
  isKiemelt() {
    return this.kiemelet
  }
  setKiemelt(allapot) {
    this.kiemelet = allapot
  }

  setSarok() {
    this.sarok = true
  }
  isSarok() {
    return this.sarok
  }

  setKincs(kincs) {
    this.kincs = kincs
  }
  vanRajtaKincs() {
    return this.kincs != null
  }
  remKincs() {
    this.kincs = null
  }

  setTipFor(tipus, forgatas) {
    this.tipus = tipus
    this.forgatas = forgatas
  }
  getKep() {
    let kep
    switch(this.tipus) {
      case "egyenes":
        kep = kepek.mezok.egyenes
        break
      case "kanyar":
        kep = kepek.mezok.kanyar
        break
      case "elagazas":
        kep = kepek.mezok.elagazas
        break
      default:
        kep = new Image()
        break
    }
    return kep
  }
  forgatni() {
    this.forgatas++
    if(this.forgatas == 4) {
      this.forgatas = 0
    }
  }
  
  addJatekos(jatekos) {
    this.jatekosok.push(jatekos)
  }
  vanRajtaJatekos() {
    return this.jatekosok.length != 0
  }
  rajtaVanJatekos(jatekos) {
    return this.jatekosok.find(j => j == jatekos) != undefined
  }
  getJatekosok() {
    return this.jatekosok
  }
  remJatekos(jatekos) {
    let index = this.jatekosok.indexOf(jatekos)
    this.jatekosok.splice(index, 1)
  }
  remJatekosok() {
    this.jatekosok = null
  }

  getAjtok() {
    switch (this.tipus) {
      case "egyenes":
        switch (this.forgatas) {
          case 0:
          case 2:
            return [1, 3]
          case 1:
          case 3:
            return [0, 2]
        }
        break
      case "kanyar":
        switch (this.forgatas) {
          case 0:
            return [2, 3]
          case 1:
            return [3, 0]
          case 2:
            return [0, 1]
          case 3:
            return [1, 2]
        }
        break
      case "elagazas":
        switch (this.forgatas) {
          case 0:
            return [3, 0, 1]
          case 1:
            return [0, 1, 2]
          case 2:
            return [1, 2, 3]
          case 3:
            return [2, 3, 0]
        }
        break
    }
  }
  setNeztekMarAjtokat(ertek) {
    this.neztekMarAjtokat = ertek
  }
}

class Jatekos {
  kezdopontX; kezdopontY;
  kincsek; //Kincs[]
  szin; //kek, piros, sarga, zold
  jelenlegi; //bool

  constructor(x, y) {
    this.kezdopontX = x
    this.kezdopontY = y
    this.kincsek = new Array()
    this.szin = veletlenElem(szabadSzinek)
    this.jelenlegi = false
  }

  toggleJelenlegi() {
    this.jelenlegi = !this.jelenlegi
  }
  isJelenlegi() {
    return this.jelenlegi
  }
  getJelenlegiKincs() {
    return this.kincsek.find(kincs => !kincs.megtalalt)
  }
  getKincs(index) {
    if(index < this.kincsek.length) {
      return this.kincsek[index]
    }
    return null
  }
  isJelenlegiKincs(kincs) {
    return kincs == this.getJelenlegiKincs()
  }
  megvanMindenKincs() {
    return this.kincsek.every(kincs => kincs.isMegtalalt())
  }
  isKezdoPonton(x, y) {
    return this.kezdopontX == x && this.kezdopontY == y
  }
  getKezdoPont() {
    return { x: this.kezdopontX, y: this.kezdopontY }
  }
  getSzin(){
    return this.szin
  }
}

class Kincs {
  id; //1-24
  megtalalt; //bool

  constructor() {
    this.megtalalt = false
    this.id = veletlenElem(szabadKincsIdk)
    
    let talaltUresHely = false
    while(!talaltUresHely) {
      let x = veletlenSzam(1, 7)
      let y = veletlenSzam(1, 7)

      if(!palya[x][y].vanRajtaKincs() && !palya[x][y].isSarok()) {
        talaltUresHely = true
        palya[x][y].setKincs(this)
      }
    }
  }

  isMegtalalt() {
    return this.megtalalt
  }
  setMegtalalt() {
    this.megtalalt = true
  }
}

//Szelektorok
  //"Oldalak" (divek)
  const kezdolap = document.querySelector("#kezdolap")
  const leiras = document.querySelector("#leiras")
  const jatek = document.querySelector("#jatek")
  const ujJatek = document.querySelector("#ujJatek")

  //Gombok
  const leirasGombObj = document.querySelector("#leirasGomb")
  const inditasGombObj = document.querySelector("#inditasGomb")
  const ujJatekGombObj = document.querySelector("#ujJatekGomb")

  const nyertesObj = document.querySelector("#nyertes")

  //Beviteli mezők
  const jatekosokSzamaObj = document.querySelector("#jatekosokSzama")
  const kincsekSzamaObj = document.querySelector("#kincsekSzama") // játékosonként

  //Játéktér
  const vaszon = document.querySelector("#vaszon")
  const ctx = vaszon.getContext("2d")
  const beszurandoVaszon = document.querySelector("#beszurando")
  const beszurandoCtx = beszurandoVaszon.getContext("2d")

  const HTMLJatekosokObj = document.querySelector("#jatekosok")
  const HTMLKincsekObj = document.querySelector("#kincsek")
  const beszurandoObj = document.querySelector("#beszurando")
  const forgatasObj = document.querySelector("#forgatas")


//Hallgatók
jatekosokSzamaObj.addEventListener("change", function() {
  if(kincsekSzamaObj.value > 24 / jatekosokSzamaObj.value)
    kincsekSzamaObj.value = 24 / jatekosokSzamaObj.value
  kincsekSzamaObj.max = 24 / jatekosokSzamaObj.value
})
kincsekSzamaObj.addEventListener("input", function() {
  if(jatekosokSzamaObj.value * kincsekSzamaObj.value > 24) {
    kincsekSzamaObj.value = 24 / jatekosokSzamaObj.value
  }
})
leirasGombObj.addEventListener("click", function() {
  leirasGombObj.innerHTML = leirasGombObj.innerHTML == "Leírás megjelenítése" ? "Leírás elrejtése" : "Leírás megjelenítése" 
  leiras.toggleAttribute("hidden")
})
inditasGombObj.addEventListener("click", function() {
  kezdolap.hidden = true
  leiras.hidden = true
  jatek.hidden = false
  reset()
  jatekInditas()
})
ujJatekGombObj.addEventListener("click", function() {
  kezdolap.toggleAttribute("hidden")
  jatek.toggleAttribute("hidden")
  ujJatek.toggleAttribute("hidden")
  reset()
})

//Állapottér
const kepek = {
  jatekosok: {
    kek: new Image(),
    piros: new Image(),
    sarga: new Image(),
    zold: new Image(),
  },
  kincsek: [
    null,
    new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
    new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
    new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
    new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
  ],
  mezok: {
    kanyar: new Image(),
    egyenes: new Image(),
    elagazas: new Image(),
    nyil: new Image(),
  },
  kerdojel: new Image(),
  megvan: new Image(),
}
kepekBetoltese()

let szabadKincsIdk, szabadSzinek, szabadHelyek, szabadMezok, nyilak
let jatekosok, jatekosokSzama, kincsek, kincsekSzama
let beszurasJon, vege
let palya, beszurandoMezo

reset()

//Létfüggvények
function jatekInditas() {
  vaszon.addEventListener("click", beszuras)
  forgatasObj.addEventListener("click", forgatas)

  //Két oszlopba szedés sok kincs esetén
  if(kincsekSzama > 12) {
    HTMLKincsekObj.style.columns = 2
  }

  //Játékosok létrehozása, kincsek létrehozása és játékoshoz kötése
  for (let i = 0; i < jatekosokSzama; i++) {
    let koords = veletlenElem(szabadHelyek)
    let ujJatekos = new Jatekos(koords[0], koords[1])

    jatekosok.push(ujJatekos)
    palya[koords[0]][koords[1]].addJatekos(ujJatekos)

    for (let j = 0; j < kincsekSzama; j++) {
      let ujKincs = new Kincs()
      ujJatekos.kincsek.push(ujKincs)
      kincsek.push(ujKincs)
    }
  }
  //kezdő játékos beállítása
  jatekosok[0].toggleJelenlegi()

  //Mezők beállítása
  //Fixek
  palya[1][1].setTipFor("kanyar", 3)
  palya[3][1].setTipFor("elagazas", 2)
  palya[5][1].setTipFor("elagazas", 2)
  palya[7][1].setTipFor("kanyar", 0)

  palya[1][3].setTipFor("elagazas", 1)
  palya[3][3].setTipFor("elagazas", 1)
  palya[5][3].setTipFor("elagazas", 2)
  palya[7][3].setTipFor("elagazas", 3)

  palya[1][5].setTipFor("elagazas", 1)
  palya[3][5].setTipFor("elagazas", 0)
  palya[5][5].setTipFor("elagazas", 3)
  palya[7][5].setTipFor("elagazas", 3)

  palya[1][7].setTipFor("kanyar", 2)
  palya[3][7].setTipFor("elagazas", 0)
  palya[5][7].setTipFor("elagazas", 0)
  palya[7][7].setTipFor("kanyar", 1)


  //Tolhatóak
  for(let x = 1; x < 8; x++) {
    for(let y = 1; y < 8; y++) {
      if(x % 2 == 0 || y % 2 == 0) {
        let tipus = veletlenElem(szabadMezok)
        let forgatas = veletlenSzam(0, 3)
        palya[x][y].setTipFor(tipus, forgatas)
      }
    }
  }

  //Beszúrandó elem
  beszurandoMezo.setTipFor(szabadMezok[0], veletlenSzam(0, 3))

  //Játékosok generálása HTML-ben
  HTMLGeneralJatekosok()

  //Kincsek generálása HTML-ben
  HTMLGeneralKincsek()
  
  //Elemek kirajzolása
  rajz()
}

//Nyílra kattintás
function beszuras(e) {
  let x = Math.floor(e.offsetX / 60);
  let y = Math.floor(e.offsetY / 60);

  //nyílra kattintás
  if((index = nyilak.findIndex(nyil => nyil[0] == x && nyil[1] == y)) != -1) {

    //beszúrás jön
    if(beszurasJon) {
      let nyil = nyilak[index]
      let irany
      switch (nyil[2]) {
        case 0:
          irany = [0, -1] //le
          break
        case 1:
          irany = [1, 0] //jobbra
          break
        case 2:
          irany = [0, 1] //fel
          break
        case 3:
          irany = [-1, 0] //balra
          break
      }

      let oszlopE = (irany[0] == 0)
      eltol(oszlopE, oszlopE ? nyil[0] : nyil[1], oszlopE ? irany[1] : irany[0])
      rajz()
      beszurasJon = false

      let jatekosPoz = getJatekosPozicio(getJelenlegiJatekos())
      kiemelMezok(tudMezoreLepni(jatekosPoz.x, jatekosPoz.y))
    }

    //Lépés jön
  } else if (!beszurasJon && x > 0 && x < 8 && y > 0 && y < 8) {

    //Ha tud a kattintott mezőre lépni
    if(getKiemeltMezok().includes(palya[x][y])){

      //Játékos átrakása
      let koords = getJatekosPozicio(getJelenlegiJatekos())
      palya[koords["x"]][koords["y"]].remJatekos(getJelenlegiJatekos())
      palya[x][y].addJatekos(getJelenlegiJatekos())
      
      //Kincs felszedése (amennyiben az következik a játékosnak)
      if(palya[x][y].vanRajtaKincs() && getJelenlegiJatekos().getJelenlegiKincs() == palya[x][y].kincs) {
        palya[x][y].kincs.setMegtalalt()
        palya[x][y].remKincs()
        HTMLGeneralKincsek()
      }

      //Ha megvan az összes kincse és visszalépett a kezdőmezejére
      if(getJelenlegiJatekos().megvanMindenKincs() && getJelenlegiJatekos().isKezdoPonton(x, y)) {
        vege = true
        nyertesObj.innerHTML = getJelenlegiJatekos().getSzin()
        ujJatek.toggleAttribute("hidden")
        vaszon.removeEventListener("click", beszuras)
        forgatasObj.removeEventListener("click", forgatas)
      }

      //Ha nem nyerte meg senki, folytatódik tovább
      if(!vege) {
        beszurasJon = true
        setKoviJatekos()
      }

      //elérhető mezők kijelölésének törlése
      torolKiemeltMezok()
    }
  }
}

//Játékosok generálása HTML-ben
function HTMLGeneralJatekosok() {
  HTMLJatekosokObj.innerHTML = ""
  let sorszam = 1
  jatekosok.forEach(jatekos => {
    let ujLi = document.createElement("li")
    let ujImg = document.createElement("img")
    ujImg = kepek.jatekosok[jatekos.szin]
    ujImg.alt = "Játékos " + (sorszam++)
    ujImg.classList.add("jatekos")
    if(jatekos.isJelenlegi()) {
      ujImg.classList.add("soronLevoJatekos")
    } else {
      ujImg.classList.remove("soronLevoJatekos")
    }

    ujLi.appendChild(ujImg)
    HTMLJatekosokObj.appendChild(ujLi)
  })
}

//Kincsek generálása HTML-ben
function HTMLGeneralKincsek() {
  HTMLKincsekObj.innerHTML = ""

  for (let i = 0; i < kincsekSzama; i++) {
    let ujLi = document.createElement("li")
    for (let j = 0; j < jatekosokSzama; j++) {
      let ujImg
      let jat = jatekosok[j]

      //megtalált már
      if(jat.kincsek[i].isMegtalalt()) {
        ujImg = kepek.megvan.cloneNode(true)
        ujImg.alt = "Játékos" + (j+1) + " - Kincs" + (i+1) + " megszerezve"

      //jelenlegi
      } else if (jat.isJelenlegiKincs(jat.kincsek[i])) {
        ujImg = kepek.kincsek[jat.kincsek[i].id].cloneNode(true)
        ujImg.alt = "Játékos" + (j+1) + " - Kincs" + (i+1)

      //titosak
      } else {
        ujImg = kepek.kerdojel.cloneNode(true)
        ujImg.alt = "Játékos" + (j+1) + " - Kincs" + (i+1) + " titkos"
      }
      ujLi.appendChild(ujImg)
    }
    HTMLKincsekObj.appendChild(ujLi)
  }
}

//Mező beszúrása
function eltol(oszlopE, index, mertek) {
  let tmp
  let tmpJatekosok = new Array() 
  if (oszlopE) {
    //Oszlop tolás
    if(mertek == -1) {
      //fel
      //ha van rajta játékos, kiszedjük őket
      if (palya[index][1].vanRajtaJatekos()) {
        tmpJatekosok = palya[index][1].getJatekosok()
        palya[index][1].remJatekosok()
      }

      tmp = palya[index][1]
      for (let y = 1; y <= 7; y++) {
        palya[index][y] = palya[index][y+1]
      }
      palya[index][7] = beszurandoMezo
      palya[index][7].jatekosok = tmpJatekosok
      
    } else {
      //le
      //ha van rajta játékos, kiszedjük őket
      if (palya[index][7].vanRajtaJatekos()) {
        tmpJatekosok = palya[index][7].getJatekosok()
        palya[index][7].remJatekosok()
      }
      tmp = palya[index][7]

      for (let y = 7; y >= 1; y--) {
        palya[index][y] = palya[index][y-1]
      }

      palya[index][1] = beszurandoMezo
      palya[index][1]. jatekosok = tmpJatekosok
    }
  } else {
    //Sor tolása
    if(mertek == -1) {
      //balra
      //ha van rajta játékos, kiszedjük őket
      if (palya[1][index].vanRajtaJatekos()) {
        tmpJatekosok = palya[1][index].getJatekosok()
        palya[1][index].remJatekosok()
      }
      tmp = palya[1][index]

      for (let x = 1; x <= 7; x++) {
        palya[x][index] = palya[x+1][index]
      }

      palya[7][index] = beszurandoMezo
      palya[7][index].jatekosok = tmpJatekosok

    } else {
      //jobbra
      //ha van rajta játékos, kiszedjük őket
      if (palya[7][index].vanRajtaJatekos()) {
        tmpJatekosok = palya[7][index].getJatekosok()
        palya[7][index].remJatekosok()
      }
      tmp = palya[7][index]

      for (let x = 7; x >= 1; x--) {
        palya[x][index] = palya[x-1][index]
      }

      palya[1][index] = beszurandoMezo
      palya[1][index].jatekosok = tmpJatekosok
    }
  }
  beszurandoMezo = tmp
}

//Beállítja a játékos által ekérhető mezőket (kiemelt)
function tudMezoreLepni(x, y) {
  //Mező összes ajtáójának kigyűjtése
  let vanAjto = palya[x][y].getAjtok()

  palya[x][y].setNeztekMarAjtokat(true)
  let joMezok = new Array()

  //Mező ajtajainak szelektálása (szomszédos mezőnek is van-e a jelenlegi mezőre ajtaja és nem vizsáltam-e már meg)
  vanAjto.forEach(ajto => {
    switch (ajto) {
      //fel lépés lehet-e?
      case 0:
        if(palya[x][y-1].tipus != null) {
          let ajtok = palya[x][y-1].getAjtok()
          if(ajtok.includes(2) && !palya[x][y-1].neztekMarAjtokat) {
            joMezok.push(palya[x][y-1])
            joMezok.concat(tudMezoreLepni(x, y-1))
          }
        }
        break
      //jobbra lépés lehet-e?
      case 1:
        if(palya[x+1][y].tipus != null) {
          let ajtok = palya[x+1][y].getAjtok()
          if(ajtok.includes(3) && !palya[x+1][y].neztekMarAjtokat) {
            joMezok.push(palya[x+1][y])
            joMezok.concat(tudMezoreLepni(x+1, y))
          }
        }
        break
      //le lépés lehet-e?
      case 2:
        if(palya[x][y+1].tipus != null) {
          let ajtok = palya[x][y+1].getAjtok()
          if(ajtok.includes(0) && !palya[x][y+1].neztekMarAjtokat) {
            joMezok.push(palya[x][y+1])
            joMezok.concat(tudMezoreLepni(x, y+1))
          }
        }
        break
      //balra lépés lehet-e?
      case 3:
        if(palya[x-1][y].tipus != null) {
          let ajtok = palya[x-1][y].getAjtok()
          if(ajtok.includes(1) && !palya[x-1][y].neztekMarAjtokat) {
            joMezok.push(palya[x-1][y])
            joMezok.concat(tudMezoreLepni(x-1, y))
          }
        }
        break
    }
  })
  palya[x][y].setKiemelt(true)
  joMezok.push(palya[x][y])
  return joMezok
}

//Értékek visszaállítása alaphelyzetbe
function reset() {
  szabadKincsIdk = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  szabadSzinek = ["kek", "piros", "sarga", "zold"]
  szabadHelyek = [[1,1], [1,7], [7,1], [7,7]]
  szabadMezok =  ["egyenes", "egyenes", "egyenes", "egyenes", "egyenes",
                  "egyenes", "egyenes", "egyenes", "egyenes", "egyenes", 
                  "egyenes", "egyenes", "egyenes",
                  "kanyar", "kanyar", "kanyar", "kanyar", "kanyar",
                  "kanyar", "kanyar", "kanyar", "kanyar", "kanyar",
                  "kanyar", "kanyar", "kanyar", "kanyar", "kanyar",
                  "elagazas", "elagazas", "elagazas", "elagazas", "elagazas", "elagazas"]
  nyilak = [[2, 0, 2], [4, 0, 2], [6, 0, 2], [0, 2, 1], [0, 4, 1], [0, 6, 1], [8, 2, 3], [8, 4, 3], [8, 6, 3], [2, 8, 0], [4, 8, 0], [6, 8, 0]]
  jatekosok = new Array()
  jatekosokSzama = jatekosokSzamaObj.value
  kincsek = new Array()
  kincsekSzama = kincsekSzamaObj.value
  beszurasJon = true
  vege = false
  palya = mezokLetrehozasa(9, 9) //Meők létrehozása
  beszurandoMezo = new Mezo()
  tudRaLepniMezok = new Array()
}


//Segédfüggvények
function veletlenSzam(tol, ig) {
  return Math.floor(Math.random() * (ig+1-tol)) + tol
}

//Tömbből véletlen elem kivétele, visszaadása
function veletlenElem(tomb) {
  let elem = tomb[veletlenSzam(0, tomb.length-1)]
  let index = tomb.indexOf(elem)
  return tomb.splice(index, 1)[0]
}

//Képek betöltése
function kepekBetoltese() {
  //kincsek
  for(let i = 1; i < kepek.kincsek.length; i++) {
    let url = "./kepek/kincsek/kincs" + i + ".png"
    kepek.kincsek[i].src = url
    kepek.kincsek[i].classList.add("kincs")
  }
  kepek.kerdojel.src = "./kepek/kincsek/kerdojel.png"
  kepek.kerdojel.classList.add("kincs")
  kepek.megvan.src = "./kepek/kincsek/megvan.png"
  kepek.megvan.classList.add("kincs")

  //játékosok
  kepek.jatekosok.kek.src = "./kepek/jatekosok/kek.png"
  kepek.jatekosok.kek.classList.add("jatekos")
  kepek.jatekosok.piros.src = "./kepek/jatekosok/piros.png"
  kepek.jatekosok.piros.classList.add("jatekos")
  kepek.jatekosok.sarga.src = "./kepek/jatekosok/sarga.png"
  kepek.jatekosok.sarga.classList.add("jatekos")
  kepek.jatekosok.zold.src = "./kepek/jatekosok/zold.png"
  kepek.jatekosok.zold.classList.add("jatekos")
  
  //mezők
  kepek.mezok.kanyar.src = "./kepek/mezok/kanyar.png"
  kepek.mezok.egyenes.src = "./kepek/mezok/egyenes.png"
  kepek.mezok.elagazas.src = "./kepek/mezok/elagazas.png"
  kepek.mezok.nyil.src = "./kepek/mezok/nyil.png"
}

//Mezők létrehozása
function mezokLetrehozasa(n, m) {
  const matrix = []
  for(let x = 0; x < n; x++) {
    const sor = []
    for(let y = 0; y < m; y++) {
      sor.push(new Mezo())

      //Sarkok beállítása
      if((x == 1 && y == 1) || (x == 1 && y == 7) || (x == 7 && y == 1) || (x == 7 && y == 7)) {
        sor[sor.length-1].setSarok()
      }
    }
    matrix.push(sor)
  }
  return matrix
}

//Fok -> radián átalakítás
function FtoR(fok) {
  return (fok * Math.PI) / 180.0
}

//Jelenlegi játékos visszaadása
function getJelenlegiJatekos() {
  return jatekosok.find(jatekos => jatekos.isJelenlegi())
}

//Játékos koordinátinak lekérdezése
function getJatekosPozicio(jatekos) {
  for(let x = 0; x < palya.length; x++) {
    for(let y = 0; y < palya[0].length; y++) {
      if(palya[x][y].rajtaVanJatekos(jatekos)) {
        return {x, y}
      }
    }
  }
  return null
}

//Mező kordinátáinak lekérdezése
function getMezoPozicio(mezo) {
  for(let x = 0; x < palya.length; x++) {
    for(let y = 0; y < palya[0].length; y++) {
      if(palya[x][y] == mezo) {
        return {x, y}
      }
    }
  }
}

//Következő játékos beállítása
function setKoviJatekos() {
  let index = jatekosok.findIndex(jatekos => jatekos == getJelenlegiJatekos())
  getJelenlegiJatekos().toggleJelenlegi()
  if(++index == jatekosokSzama) {
    index = 0
  }
  jatekosok[index].toggleJelenlegi()
  HTMLGeneralJatekosok()
}

//Beyzúrandó mező forgatása
function forgatas() {
  beszurandoMezo.forgatni()
  rajzBeszurando()
}

//Elérhető mezők kiemelésének beállítása
function kiemelMezok(mezok) {
  mezok.forEach(mezo => {
    mezo.setKiemelt(true)
  })
  rajz()
}

//Kiemelt mezők kiemelésének törlése
function torolKiemeltMezok() {
  for(let x = 1; x < 8; x++) {
    for(let y = 1; y < 8; y++) {
      palya[x][y].setKiemelt(false)
      palya[x][y].setNeztekMarAjtokat(false)
    }
  }
  rajz()
}

//Kiemelt mezők lekérdezése
function getKiemeltMezok() {
  let joMezok = new Array()
  for(let x = 1; x < 8; x++) {
    for(let y = 1; y < 8; y++) {
      if(palya[x][y].isKiemelt()) {
        joMezok.push(palya[x][y])
      }
    }
  }
  return joMezok
}

//elem törlése a tömbből
function remove(tomb, ertek) {
  let index = tomb.indexOf(ertek)
  if (index > -1) {
    tomb.splice(index, 1)
  }
}

//Vászonra rajzolás
function rajz() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, vaszon.width, vaszon.height)
  beszurandoCtx.fillStyle = "white"
  beszurandoCtx.fillRect(0,0, beszurandoVaszon.width, beszurandoVaszon.height)
  setTimeout(() => {}, 100)

  rajzMezok()
  rajzKeret()
  rajzNyilak()
  rajzBeszurando()
}

function rajzKeret() {
  ctx.fillStyle = "burlywood"
  ctx.fillRect(0, 0, 540, 60)
  ctx.fillRect(0, 480, 540, 540)
  ctx.fillRect(0, 0, 60, 540)
  ctx.fillRect(480, 0, 540, 540)
}

function rajzBeszurando() {
  vaszonraKep(beszurandoMezo.getKep(), 0, 0, beszurandoMezo.forgatas, 60, 60, 30, 30, beszurandoCtx)
  if (beszurandoMezo.vanRajtaKincs()) {
    vaszonraKep(kepek.kincsek[beszurandoMezo.kincs.id], 0, 0, 0, 30, 30, 70, 70, beszurandoCtx)
  }
}

function rajzMezok() {
  for(let x = 1; x < 8; x++) {
    for(let y = 1; y < 8; y++) {
      let mezo = palya[x][y]

      //mező kirajzolása
      vaszonraKep(mezo.getKep(), x, y, mezo.forgatas)

      //kiemelés ha rá tud lépni a játékos
      if(mezo.isKiemelt()) {
        ctx.lineWidth = 5
        ctx.strokeStyle = "purple"
        ctx.strokeRect(x*60, y*60, 60, 60)
      }

      //kincs ha van rajta
      if(palya[x][y].vanRajtaKincs()) {
        vaszonraKep(kepek.kincsek[mezo.kincs.id], x, y, 0, 30, 30, 70, 70) //utolsó 2: 35 volt
      }

      //játékos ha van rajta
      ctx.lineWidth = 1
      if (palya[x][y].vanRajtaJatekos()) {
        let tobben = palya[x][y].getJatekosok().length > 1
        palya[x][y].jatekosok.forEach(jatekos => {
          let extra = {x: 0, y: 0}
          switch (jatekos.szin) {
            case "kek":
              ctx.fillStyle = "blue"
              if(tobben) { extra.x = 11 }
              break
            case "piros":
              ctx.fillStyle = "red"
              if(tobben) { extra.x = -11 }
              break
            case "sarga":
              ctx.fillStyle = "yellow"
              if(tobben) { extra.y = 11 }
              break
            case "zold":
              ctx.fillStyle = "green"
              if(tobben) { extra.y = -11 }
              break
          }
          ctx.beginPath()
          ctx.arc(x*60+30+extra.x, y*60+30+extra.y, 16, 0, 2 * Math.PI)
          ctx.fill()
          ctx.strokeStyle = "black"
          ctx.stroke()
        })
      }

      //játékosok kezdőpontjai
      jatekosok.forEach(jatekos => {
        let {x, y} = jatekos.getKezdoPont()
        let extra = {x: 0, y: 0 }
        if (x == 7) extra.x += 50
        if (y == 7) extra.y += 50

        switch (jatekos.szin) {
          case "kek":
            ctx.fillStyle = "blue"
            break
          case "piros":
            ctx.fillStyle = "red"
            break
          case "sarga":
            ctx.fillStyle = "yellow"
            break
          case "zold":
            ctx.fillStyle = "green"
            break
        }
        ctx.fillRect(x*60 + extra.x, y*60+ extra.y, 10, 10)
        ctx.strokeStyle = "black"
        ctx.stroke()
      })
    }
  }
}

function rajzNyilak() {
  nyilak.forEach(nyil => {
    vaszonraKep(kepek.mezok.nyil, nyil[0], nyil[1], nyil[2])
  })
}

//kép, xKoord, yKoord, forgatás, (szélesség, magasság, xElcsusztatas, yElcsusztatas, vászon)
function vaszonraKep(kep, x, y, forgatas, szelesseg = kep.width, magassag = kep.height, xCsusztat = 30, yCsusztat = 30, vaszon = ctx) {
  vaszon.save()
  vaszon.translate(x * 60 + xCsusztat, y * 60 + yCsusztat)
  vaszon.rotate(FtoR(forgatas*90))
  vaszon.drawImage(kep, -(kep.width/2), -(kep.height/2), szelesseg, magassag)
  vaszon.restore()
}