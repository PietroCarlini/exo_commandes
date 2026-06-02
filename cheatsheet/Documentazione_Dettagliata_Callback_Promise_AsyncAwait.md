# JavaScript Asincrono: Callback, Promise e Async/Await

## Guida dettagliata per VS Code

Questa documentazione approfondisce Callback, Promise e Async/Await con spiegazioni ed esempi commentati.

### Callback

Una callback è una funzione passata come argomento ad un'altra funzione.

```js
function saluta(nome) {
  console.log('Ciao ' + nome);
}

function eseguiCallback(callback) {
  callback('Marco');
}

eseguiCallback(saluta);
```

**Spiegazione:**
- `saluta` è una funzione normale.
- `eseguiCallback` riceve una funzione come parametro.
- `callback('Marco')` esegue la funzione ricevuta.

### Callback Hell

```js
step1(() => {
  step2(() => {
    step3(() => {
      step4(() => {});
    });
  });
});
```

Problemi: codice annidato, difficile da leggere e mantenere.

---

### Promise

Una Promise rappresenta un risultato futuro.

```js
function lancerDe() {
  return new Promise((resolve, reject) => {
    const valore = Math.floor(Math.random() * 6) + 1;

    if (valore === 6) {
      reject('Hai fatto 6');
    } else {
      resolve(valore);
    }
  });
}
```

**Analisi:**
- `resolve()` => successo.
- `reject()` => errore.
- La Promise può essere Pending, Fulfilled o Rejected.

Consumo:

```js
lancerDe()
  .then(valore => {
    console.log(valore);
  })
  .catch(errore => {
    console.error(errore);
  });
```

---

### Promise Chaining

```js
etape('A')
  .then(() => etape('B'))
  .then(() => etape('C'))
  .catch(err => console.error(err));
```

Permette di concatenare operazioni asincrone mantenendo il flusso ordinato.

---

### Async / Await

```js
async function play() {
  try {
    const result = await lancerDe();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

**Analisi:**
- `async` rende la funzione una Promise.
- `await` aspetta il risultato.
- `try/catch` gestisce gli errori.

---

### Confronto Finale

| Callback | Promise | Async/Await |
|----------|----------|-------------|
| Funzione passata come parametro | Risultato futuro | Sintassi sopra le Promise |
| Può creare callback hell | Più leggibile | Più leggibile ancora |
| Errori difficili | `.catch()` | `try/catch` |

### Regola pratica

Nel JavaScript moderno, preferisci Async/Await quando possibile.
