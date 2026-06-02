# Riassunto: Callback, Promise e Async/Await in JavaScript

# 1. Callback

Una **callback** è una funzione passata come argomento ad un'altra funzione, che verrà eseguita successivamente.

## Esempio del codice

La funzione `filter()` riceve:

- un array
- una funzione di confronto (`compareFn`)

```js
function filter(array, compareFn) {
  const filtered = [];

  for (let i = 0; i < array.length; i++) {
    if (compareFn(array[i], i, array)) {
      filtered.push(array[i]);
    }
  }

  return filtered;
}
```

Quando viene chiamata:

```js
filter(digits, elt => elt % 3 === 0);
```

la funzione freccia viene passata come callback ed eseguita per ogni elemento dell'array.

## Concetti chiave

- Le funzioni in JavaScript sono valori.
- Possono essere assegnate a variabili.
- Possono essere passate come parametri.
- Possono essere restituite da altre funzioni.

Esempio:

```js
function isEven(element) {
  return element % 2 === 0;
}

let isEven2 = isEven;
```

In questo caso la funzione viene trattata come un normale valore.

---

# 2. Promise

Una **Promise** rappresenta un'operazione asincrona che potrebbe completarsi:

- con successo → `resolve()`
- con errore → `reject()`

## Stati di una Promise

1. **Pending** → in attesa
2. **Fulfilled** → completata con successo
3. **Rejected** → terminata con errore

## Esempio del lancio del dado

```js
function lancerDe() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const valore = Math.floor(Math.random() * 6) + 1;

      if (valore === 6) {
        reject("Hai fatto 6!");
      } else {
        resolve(valore);
      }
    }, 0);
  });
}
```

### Consumo della Promise

```js
lancerDe()
  .then(valore => {
    console.log(valore);
  })
  .catch(errore => {
    console.log(errore);
  });
```

## Concetti chiave

- `then()` gestisce il successo.
- `catch()` gestisce gli errori.
- Il codice dopo la chiamata continua ad essere eseguito senza attendere il risultato.
- Una Promise permette di evitare il cosiddetto "callback hell".

---

# 3. Chaining delle Promise

Il chaining consente di eseguire più operazioni asincrone in sequenza.

## Esempio

```js
etape("A", 500)
  .then(resultatA => {
    console.log(resultatA);
    return etape("B", 5000);
  })
  .then(resultatB => {
    console.log(resultatB);
    return etape("C", 2000);
  })
  .then(resultatC => {
    console.log(resultatC);
  })
  .catch(errore => {
    console.error(errore);
  });
```

## Come funziona

1. Parte A.
2. Quando A termina viene eseguito il primo `then()`.
3. Viene restituita una nuova Promise (B).
4. Quando B termina viene eseguito il secondo `then()`.
5. Viene lanciata C.
6. Eventuali errori finiscono nel `catch()` finale.

## Vantaggi

- codice più leggibile;
- gestione centralizzata degli errori;
- esecuzione ordinata delle operazioni asincrone.

---

# 4. Async / Await

`async` e `await` sono una sintassi introdotta in ES2017 che rende il codice asincrono molto più simile a quello sincrono.

## Funzione async

```js
async function getValue() {
  const valore = await etape("AsyncFunc");
  console.log(valore);
}
```

### Cosa succede

- `async` fa sì che la funzione restituisca automaticamente una Promise.
- `await` mette in pausa l'esecuzione della funzione finché la Promise non viene risolta.
- Solo la funzione corrente viene sospesa, non l'intero programma.

---

## Gestione degli errori

Con `async/await` gli errori vengono gestiti tramite `try/catch`.

```js
(async () => {
  try {
    const valore = await etape("TryCatch");
    console.log(valore);
  }
  catch (errore) {
    console.log("Errore:", errore);
  }
})();
```

### Vantaggi

- sintassi più pulita;
- codice più facile da leggere;
- gestione degli errori simile a quella del codice sincrono.

---

# Differenze principali

| Callback | Promise | Async/Await |
|-----------|----------|-------------|
| Funzione passata come parametro | Oggetto che rappresenta un risultato futuro | Sintassi basata sulle Promise |
| Può generare callback hell | Più leggibile | Ancora più leggibile |
| Gestione errori complessa | `.catch()` | `try/catch` |
| Più vecchio approccio | Standard moderno | Approccio moderno consigliato |

---

# Riassunto finale

## Callback
- Funzione passata ad un'altra funzione.
- Viene eseguita in un secondo momento.
- Molto usata nelle API asincrone.

## Promise
- Rappresenta un'operazione asincrona.
- Può essere risolta (`resolve`) o rifiutata (`reject`).
- Si usa con `then()` e `catch()`.

## Async/Await
- Costruito sopra le Promise.
- Permette di scrivere codice asincrono come se fosse sincrono.
- Gestione degli errori tramite `try/catch`.
- È generalmente la soluzione più leggibile e consigliata oggi.
