# JavaScript — Reference Sheet
> Estratto dai tuoi esercizi del corso Full Stack JS

---

## Struttura base di ogni script

```js
// 🌱 1. Sélection des éléments DOM
// 🧠 2. Variables globales / état
// 🎊 3. Fonctions (logique métier)
// 🧲 4. Événements (interactions)
```

---

## DOM

### `querySelector` / `querySelectorAll`
Selezionare elementi HTML da JS.

**Quando usarlo:** All'inizio dello script, per "agganciare" elementi che ti servono dopo.

**Attenzione:** `querySelector` restituisce il primo match; `querySelectorAll` una NodeList. Se il selettore non esiste, restituisce `null`.

```js
const btn = document.querySelector('.btnAjouter')
const items = document.querySelectorAll('.movie')
```
*Visto in: revision1, create-cards, shopping-list, tutti gli altri*

---

### `textContent` / `innerHTML`
Leggere o scrivere il contenuto di un elemento.

**Quando usarlo:** Per aggiornare dinamicamente ciò che l'utente vede senza ricaricare la pagina.

**Attenzione:** `textContent` tratta tutto come testo (più sicuro). `innerHTML` interpreta i tag HTML — utile ma attento all'iniezione di codice se il contenuto viene dall'utente.

```js
el.textContent = 'Ciao!'
el.innerHTML = 'Ciao <strong>mondo</strong>'
```
*Visto in: revision1, revision2, movie-box*

---

### `createElement` / `appendChild`
Creare elementi HTML da zero e inserirli nel DOM.

**Quando usarlo:** Quando devi generare contenuto dinamicamente (carte, liste, elementi ripetuti). Pattern tipico: crea elemento → configuralo → appendilo al contenitore.

**Attenzione:** `appendChild` sposta un nodo se esiste già nel DOM. Il nodo va creato, configurato, e poi iniettato — l'ordine conta.

```js
const li = document.createElement('li')
li.textContent = 'Nuovo film'
myList.appendChild(li)
```
*Visto in: create-cards, shopping-list, forEach, libreria*

---

### `classList` — `add` / `remove` / `toggle`
Aggiungere, rimuovere, alternare classi CSS.

**Quando usarlo:** Per mostrare/nascondere elementi, applicare stili condizionali, animazioni. `toggle` è ideale per pulsanti on/off.

**Attenzione:** `toggle` restituisce `true` se la classe è stata aggiunta, `false` se rimossa.

```js
el.classList.add('active')
el.classList.remove('hidden')
el.classList.toggle('dark')
```
*Visto in: revision1, first-event, create-cards, film-list*

---

### `dataset` (data-attributes)
Leggere e scrivere attributi `data-*` HTML da JS.

**Quando usarlo:** Per collegare dati logici (index, tipo, id) ai nodi del DOM senza usare variabili globali. Utile con event delegation.

**Attenzione:** Tutti i valori di `dataset` sono stringhe — converti con `Number()` se fai calcoli.

```js
// HTML: <div data-index="3" data-genere="action">
div.dataset.index    // "3"
div.dataset.genere   // "action"
div.dataset.index = 5  // scrive
```
*Visto in: data-attributes (11), film-list (12)*

---

### `innerHTML = ''` (reset DOM)
Svuotare un contenitore prima di ridisegnarlo.

**Quando usarlo:** Prima di ricaricare una lista aggiornata, per evitare duplicati. Pattern tipico nella funzione `render()` o `displayList()`.

**Attenzione:** Distrugge tutti i figli inclusi event listener attaccati ai figli. Preferisci event delegation sul contenitore padre.

```js
myList.innerHTML = ''
items.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  myList.appendChild(li)
})
```
*Visto in: data-attributes, film-list, libreria, percentuale*

---

### `element.style.X`
Modificare stili CSS inline da JS.

**Quando usarlo:** Per valori calcolati (larghezza percentuale di una barra, colore di background). Per stili statici, preferisci classi CSS.

**Attenzione:** I nomi delle proprietà sono camelCase: `backgroundColor`, non `background-color`.

```js
document.body.style.backgroundColor = 'red'
divBar.style.width = `${perc}%`
```
*Visto in: conditions, percentuale*

---

## Events

### `addEventListener`
Ascoltare e reagire a interazioni utente.

**Quando usarlo:** Ogni volta che vuoi eseguire codice in risposta a un'azione (click, keydown, submit, input…).

**Attenzione:** Passa il nome della funzione senza `()` — altrimenti la esegui subito invece di programmarla.

```js
myBtn.addEventListener('click', function(e) {
  console.log(e.target)
})
```
*Visto in: revision1, tutti*

---

### `event.preventDefault()`
Bloccare il comportamento di default del browser.

**Quando usarlo:** Su form `submit` (evita il reload della pagina) e su keydown Enter.

**Attenzione:** Non impedisce la propagazione — per quello usa `stopPropagation()` (diverso!).

```js
form.addEventListener('submit', function(e) {
  e.preventDefault()
  // ora puoi gestire i dati
})
```
*Visto in: shopping-list, guess-the-number, libreria, battaglie*

---

### Event delegation
Un solo listener sul padre per gestire molti figli.

**Quando usarlo:** Quando hai elementi creati dinamicamente (non esistono al caricamento) o molti elementi simili.

**Attenzione:** `e.target` è l'elemento esatto cliccato. `e.currentTarget` è sempre l'elemento a cui hai attaccato il listener.

```js
myList.addEventListener('click', function(e) {
  if (e.target.matches('.delete')) {
    // gestisci click su .delete
  }
})
```
*Visto in: create-cards, shopping-list, data-attributes, participants*

---

### `e.target.closest()`
Risalire l'albero DOM al primo antenato con quel selettore.

**Quando usarlo:** In combinazione con event delegation, per raggiungere il "contenitore" di ciò che è stato cliccato.

**Attenzione:** Restituisce `null` se non trova il match.

```js
myList.addEventListener('click', function(e) {
  if (e.target.matches('.close')) {
    e.target.closest('.items').remove()
  }
})
```
*Visto in: create-cards, shopping-list, data-attributes, participants*

---

### `keydown` — `event.key`
Reagire a tasti specifici della tastiera.

**Quando usarlo:** Per eseguire azioni al tasto Enter senza bisogno di un pulsante.

**Attenzione:** `event.key === 'Enter'` — attenzione alle maiuscole.

```js
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    // azione
    e.preventDefault()
  }
})
```
*Visto in: movie-box, favorites-list*

---

## Array

### `push` / `unshift`
Aggiungere elementi a un array.

**Quando usarlo:** `push` aggiunge in fondo (il più comune). `unshift` in testa, quando l'ordine richiede che il nuovo elemento sia primo.

**Attenzione:** Entrambi modificano l'array originale e restituiscono la nuova lunghezza.

```js
const heroes = []
heroes.push('Ahri')      // ['Ahri']
heroes.unshift('Thresh') // ['Thresh', 'Ahri']
```
*Visto in: favorites, champions, participants, battaglie*

---

### `splice`
Rimuovere (o inserire) elementi in una posizione specifica.

**Quando usarlo:** Per cancellare un elemento dall'array in base al suo indice. Tipicamente abbinato a `indexOf()`.

**Attenzione:** Modifica l'array originale. `splice(index, 1)` rimuove 1 elemento alla posizione `index`.

```js
let pos = list.indexOf('Ahri')
list.splice(pos, 1)
// rimuove 'Ahri' dall'array
```
*Visto in: data-attributes, participants*

---

### `indexOf`
Trovare la posizione di un valore in un array.

**Quando usarlo:** Per verificare se un valore esiste (`-1` = assente), o trovarne la posizione per `splice`.

**Attenzione:** Confronto stretto (`===`) — non funziona per oggetti (confronta riferimento, non valore).

```js
const arr = ['Darius', 'Ahri']
arr.indexOf('Ahri')   // 1
arr.indexOf('Jinx')   // -1

// pattern anti-duplicati:
if (arr.indexOf(val) === -1) { arr.push(val) }
```
*Visto in: champions, participants*

---

### `forEach`
Iterare su ogni elemento di un array.

**Quando usarlo:** Per eseguire un'azione per ogni elemento (es. creare un nodo DOM per ciascuno). Alternativa leggibile al `for` classico.

**Attenzione:** Non restituisce niente (`undefined`). Non puoi usarlo per trasformare un array — per quello usa `map`.

```js
films.forEach(function(film, i) {
  const li = document.createElement('li')
  li.textContent = `${i+1}. ${film}`
  myList.appendChild(li)
})
```
*Visto in: forEach (13), percentuale, libreria*

---

### `map`
Trasformare ogni elemento di un array in un nuovo valore.

**Quando usarlo:** Per creare un nuovo array derivato da uno esistente (calcoli, trasformazioni, oggetti). Non modifica l'array originale.

**Attenzione:** Devi sempre usare `return` dentro la callback. Se lo dimentichi, ottieni un array di `undefined`.

```js
const perc = notes.map(function(note) {
  return Math.round((note / 20) * 100)
})
// [70, 40, 85, ...]
```
*Visto in: map (14), percentuale, libreria*

---

### `filter`
Creare un nuovo array con solo gli elementi che soddisfano una condizione.

**Quando usarlo:** Per estrarre sottoinsiemi: studenti promossi, libri preferiti, eroi disponibili.

**Attenzione:** La callback deve restituire `true` o `false`. Se nessun elemento passa, restituisce `[]`.

```js
const promossi = eleves.filter(function(eleve, i) {
  return notes[i] >= 10
})
```
*Visto in: percentuale, libreria*

---

### `sort`
Ordinare gli elementi di un array.

**Quando usarlo:** Per visualizzare dati in ordine (classifica, ranking, alfabetico).

**Attenzione:** Modifica l'array originale. Per numeri devi sempre passare una funzione comparatrice — il sort di default è alfabetico (10 < 9 !). `b - a` = decrescente; `a - b` = crescente.

```js
classe.sort(function(a, b) {
  return b.note - a.note
})
// ordine decrescente per .note
```
*Visto in: percentuale (bonus)*

---

### `concat` / `slice`
Unire e dividere array senza modificarli.

**Quando usarlo:** Per ricostruire un array con un elemento inserito in una posizione specifica (pattern del battaglie-game).

**Attenzione:** `slice(0, i+1)` — il secondo argomento è escluso. `concat` non modifica gli originali — ricorda di riassegnare.

```js
let first = arr.slice(0, i+1)
let second = arr.slice(i+1)
arr = first.concat(newVal).concat(second)
```
*Visto in: battaglie (17)*

---

## Flow

### `if` / `else if` / `else`
Eseguire codice in base a condizioni.

**Quando usarlo:** Logica di controllo di base. Pattern frequente: primo check "campo vuoto?", poi logica effettiva.

**Attenzione:** I valori degli input sono sempre stringhe — converti con `Number()` prima di fare confronti numerici.

```js
if (input.value === '') {
  result.textContent = 'Campo vuoto'
} else if (Number(input.value) >= 18) {
  result.textContent = 'Maggiorenne'
} else {
  result.textContent = 'Minorenne'
}
```
*Visto in: conditions, revision2, exoSuppConditions*

---

### `for` loop
Ripetere un blocco N volte con un contatore.

**Quando usarlo:** Quando devi iterare su un array e ti serve l'indice, o costruire qualcosa N volte. Per calcolare somme, trovare min/max.

**Attenzione:** `i < array.length` — non `<=` (sforerebbe). L'indice parte da 0.

```js
for (let i = 0; i < films.length; i++) {
  const li = document.createElement('li')
  li.textContent = films[i]
  myList.appendChild(li)
}
```
*Visto in: film-list, libreria, percentuale, battaglie*

---

### `setTimeout`
Eseguire codice dopo un ritardo in millisecondi.

**Quando usarlo:** Per nascondere messaggi temporanei, creare pause nell'interfaccia.

**Attenzione:** È asincrono — il codice dopo di esso esegue subito, non aspetta.

```js
result.textContent = 'Numero troppo alto!'
setTimeout(() => {
  result.textContent = ''
}, 8000)
```
*Visto in: guess-the-number*

---

### `Math.random` / `Math.floor`
Generare numeri casuali interi.

**Quando usarlo:** Per giochi, selezioni casuali.

**Attenzione:** `Math.random() * 100` dà da 0 a 99.999... — senza `+ 1` non raggiungi 100.

```js
let n = Math.floor(Math.random() * 100) + 1
// n è un intero tra 1 e 100 inclusi
```
*Visto in: guess-the-number*

---

## String / Valori

### Template literals (backtick)
Costruire stringhe con valori JS incorporati.

**Quando usarlo:** Quasi sempre, al posto della concatenazione con `+`. Permette interpolazione con `${}` e stringhe multiriga.

**Attenzione:** Usare i backtick `` ` `` e non apici singoli o doppi.

```js
const msg = `Ciao ${nome}, hai ${età} anni`
// 'Ciao Pietro, hai 34 anni'
```
*Visto in: revision1, tutti*

---

### `.value` / `.length` / `.toFixed()`
Proprietà fondamentali di stringhe e numeri.

**Quando usarlo:**
- `.value` → leggere il contenuto di un input (sempre stringa)
- `.length` → contare caratteri o elementi di un array
- `.toFixed(2)` → arrotondare con N decimali (restituisce stringa)

**Attenzione:** Frequente errore: `input.value + 1` = `'51'` invece di `6` quando value è `'5'`. Converti sempre con `Number()`.

```js
input.value           // '42' (stringa)
Number(input.value)   // 42
password.length       // 8
moyenne.toFixed(2)    // '11.75'
```
*Visto in: revision2, percentuale, libreria*

---

## Oggetti

### Array di oggetti `[{}, {}, {}]`
Struttura dati per elementi con più proprietà.

**Quando usarlo:** Quando ogni elemento della lista ha più campi (titolo, autore, nota, genere…). Si accede alle proprietà con il punto: `libro.titre`.

**Attenzione:** `forEach`, `map`, `filter` funzionano identicamente — il parametro della callback è l'intero oggetto.

```js
const livres = [
  { titre: 'Dune', auteur: 'Herbert', note: 18 },
  { titre: '1984', auteur: 'Orwell', note: 15 }
]

livres.forEach(function(livre) {
  console.log(livre.titre, livre.note)
})
```
*Visto in: libreria, percentuale (classe con sort)*

---