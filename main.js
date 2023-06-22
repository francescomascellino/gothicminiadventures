/* --------------------
  OPERAZIONI INIZIALI
---------------------- */

// Configurazione di ChatGPT
const ApiButton = document.querySelector("#invia");
const API_BASE_URL = "https://api.openai.com/v1";
let apiKeyValue = ApiButton.addEventListener("click", function () {
	API_KEY = document.querySelector("#apiKey").value;
	console.log("API KEY=", API_KEY);
});
let API_KEY = apiKeyValue;

const GPT_MODEL = "gpt-3.5-turbo";

// Recuperiamo gli elementi principali dalla pagina
const loader = document.querySelector(".loader");
const genreButtons = document.querySelectorAll(".genre");
const placeholder = document.querySelector("#placeholder");
const stageTemplate = document.querySelector("#stage-template");
const gameoverTemplate = document.querySelector("#gameover-template");

// Preparo una variabile per tenere tutta la chat
const completeChat = [];

// Preparo una variabile per il genere selezionato
let selectedGenre;

// Preparouna variabile per decidere il fato delle azioni
let destiny;
let grugno;

let infoBtn = document.querySelector("#info-btn");
let closeBtn = document.querySelector("#close-btn");
let infoCard = document.querySelector("#info-card");

/* --------------------
  LOGICA DI GIOCO
--------------------- */

// Per ogni bottone dei generi...
genreButtons.forEach(function (button) {
	// Al click...
	button.addEventListener("click", function () {
		// 1. recuperiamo il genere cliccato
		// 2. Lo impostiamo come selectedGenre
		selectedGenre = button.dataset.genre;
		console.log(selectedGenre);
		// 3. Avviamo la partita
		startGame();
	});
});

// # Funzione per avviare la partita
function startGame() {
	// 1 Inserisco la classe "game-started"
	document.body.classList.add("game-started");
	// 2. Preparo le istruzioni iniziali per Chat GPT
	if (selectedGenre === "Horror") {
		/* --------------------
  GENERAZIONE DELLE VARIABILI AMBIENTALI
--------------------- */

		// Genero la location
		const locations = [
			"in un luogo lugubre della nazione di Terrabruna",
			"nella città coloniale di Nebelbug, governata dall'avido Barone Aaron Van Kaster",
			"nella città fortificata di Roccafredda, governata dal Consiglio Cittadino",
			"nella città Førstone della Nazione di Terrabruna, governata dal Barone Magnus Coumont",
			"in un vallone pieno di alberi contorti e cadaveri",
			"in una miniera abbandonata nei pressi di Roccafredda",
			"in una villa abbandonata nella foresta di Terrabruna",
			"nelle rovine di una città senza più nome distrutta dall'Inquisizione di Varna",
			"in una cittá sconosciuta piena di spaventapasseri avvolta in una nebbia inquietante",
		];
		const location = Math.floor(Math.random() * locations.length);
		console.log("Sei " + locations[location]);

		// Genero una minaccia
		const enemies = [
			"I nemici saranno vampiri che indossano maschere bianche",
			"I nemici saranno malvagi maghi eretici",
			"I nemici saranno ombre",
			"I nemici saranno zombie",
			"I nemici saranno fantasmi",
			"Il nemico sarà un ghoul",
			"Il nemico sarà un cavaliere coperto da un'armatura nera e bruciata, armato di un grosso spadone e ammantato da una nebbia scura",
			"Il nemico sarà un wendigo",
		];
		const enemy = Math.floor(Math.random() * enemies.length);
		console.log(enemies[enemy]);

		// Genero un alleato
		const allies = [
			"Un Cacciatore di Nonmorti della Chiesa di Irith sarà mio alleato",
			"Un Inquisitore della Chiesa di Varna sarà mio alleato",
			"Un Crociato della Chiesa di Eol sarà mio alleato",
			"Un cacciatore di bestie errante sarà mio alleato",
			"In questa avventura non avrò alleati",
		];
		const ally = Math.floor(Math.random() * allies.length);
		console.log(allies[ally]);

		// Invio il prompt a ChatGPT
		completeChat.push({
			role: `system`, // ? come si deve omportare chatGPT
			content: `Voglio che ti comporti come se fossi un classico gioco di avventura testuale. Io sarò il protagonista e giocatore principale. Non ho poteri magici di alcun tipo o altre caratteristiche soprannaturali. In questo mondo non esistono oggetti o artefatti magici. In questo mondo non esistono oggetti moderni. Non fare riferimento a te stesso. Questo gioco si svolgerà nell'Impero di Lothar, nella nazione di Terrabruna. In questo Impero si venerano tre Dei: Varna, la dea della legge, Irith il dio della conoscenza e Eol il dio della guerra. Non fare rifermento a elementi religiosi reali. L'avventura sarà a tema horror e si svolgerà ${locations[location]}. ${enemies[enemy]}. ${allies[ally]}. Ogni ambientazione ha una descrizione di 150 caratteri seguita da una array di 3 azioni possibili che io posso compiere. Non aggiungere spiegazioni extra o fare riferimenti a te stesso. Le tue risposte sono solo in formato JSON come questo esempio: ### {"description":"descrizione ambientazione", "actions":["azione 1", "azione 2", "azione 3"]} ### Non dare altro testo che non sia un oggetto JSON.`,
		});
		console.log(completeChat);
		// 3. Genero il primo livello
		setStage();
	} else if (selectedGenre === "Cittadino") {
		/* --------------------
  GENERAZIONE DELLE VARIABILI AMBIENTALI
--------------------- */

		// Genero la location
		const locations = [
			"nella città coloniale di Nebelbug, governata dall'avido Barone Aaron Van Kaster",
			"nella città fortificata di Roccafredda, governata dal Consiglio Cittadino",
			"nella città Førstone della Nazione di Terrabruna, governata dal Barone Magnus Coumont",
			"nella città commerciale di Aegerberg, governata dal buon Lord Istvàn Vajk",
			"nel villaggio di confine di Vakenber, gestito dallo Sceriffo Herbert Gaston",
		];
		const location = Math.floor(Math.random() * locations.length);
		console.log("Sei " + locations[location]);

		// Genero una minaccia
		const enemies = [
			"Sono un eretico l'Inquisizione di Varna mi da la caccia. Nessuno vorrà aiutarmi. Descrivi chi sono e che mi cercano per mettermi al rogo",
			"I nemici saranno vampiri che indossano maschere bianche",
			"I nemici saranno malvagi cultisti eretici della setta dei Custodi degli Astri",
			"I nemici saranno malviventi",
			"I nemici saranno spie del malvagio esercito invasore chiamato Corvo Nero",
			"Il nemico sarà un assassino che indossa un vestito e un cappuccio di iuta che assale le vittime nei vicoli bui",
		];
		const enemy = Math.floor(Math.random() * enemies.length);
		console.log(enemy, enemies[enemy]);

		// Genero un alleato. Se sonoi il nemico le scelte cambiano
		let role;
		function amIHeretic() {
			if (enemy == 0) {
				const allies = [
					"In questa avventura non avrò alleati, descrivi che le guardie e l'Inquisizione di Varna mi danno la caccia per mettermi al rogo. Descrivi che sono un mago eretico e che mi vogliono morto",
					"In questa avventura non avrò alleati, oltre all'Inquisizione altri maghi eretici, nemici sia miei che dell'Inquisizione, che vogliono carpire i miei segreti mi danno la caccia. Descrivi che sono un mago eretico e che mi vogliono morto",
				];
				const ally = Math.floor(Math.random() * allies.length);
				let role = allies[ally];
				console.log(role);
				return role;
			} else {
				const allies = [
					"Gli alleati saranno sacerdoti della Chiesa di Irith",
					"Gli alleati saranno sacerdoti della Chiesa di Varna",
					"Gli alleati saranno sacerdoti della Chiesa di Eol",
					"Gli alleati saranno guardie cittadine",
					"Il mio alleato sarà un colono in cerca di avventure",
					"In questa avventura non avrò alleati",
				];
				const ally = Math.floor(Math.random() * allies.length);
				let role = allies[ally];
				console.log(role);
				return role;
			}
		}

		amIHeretic();

		// Invio il prompt a ChatGPT
		completeChat.push({
			role: `system`, // ? come si deve omportare chatGPT
			content: `Voglio che ti comporti come se fossi un classico gioco di avventura testuale. Io sarò il protagonista e giocatore principale. Non ho poteri magici di alcun tipo o altre caratteristiche soprannaturali. In questo mondo non esistono oggetti o artefatti magici. In questo mondo non esistono oggetti moderni. I maghi e la magia sono eresie illegali. Non fare riferimento a te stesso. Questo gioco si svolgerà nell'Impero di Lothar, nella nazione di Terrabruna. In questo Impero si venerano tre Dei: Varna, la dea della legge, Irith il dio della conoscenza e Eol il dio della guerra. Non fare rifermento a elementi religiosi reali. L'avventura sarà a tema cittadino e si svolgerà ${locations[location]}. ${enemies[enemy]}. ${role}.  Ogni ambientazione ha una descrizione di 150 caratteri seguita da una array di 3 azioni possibili che io posso compiere. Non aggiungere spiegazioni extra o fare riferimenti a te stesso. Le tue risposte sono solo in formato JSON come questo esempio: ###	{"description":"descrizione ambientazione", "actions":["azione 1", "azione 2", "azione 3"]} ### Non dare altro testo che non sia un oggetto JSON.`,
		});

		// // 3. Genero il primo livello
		setStage();
		console.log(completeChat);
	} else if (selectedGenre === "Selvaggio") {
		/* --------------------
  GENERAZIONE DELLE VARIABILI AMBIENTALI
--------------------- */

		// Genero la location
		const locations = [
			"in una fitta foresta della nazione di Terrabruna",
			"in una zona montuosa della nazione di Terrabruna",
			"in una zona naturale innevata della nazione di Terrabruna",
			"in un campo di battaglia coperto di cadaveri dopo un tremendo scontro fra l'esercito dell'Impero e l'esercito invasore del Corvo Nero",
			"in una serie di fitte caverne in cui ho cercato riparo dalla tempesta",
			"nelle rovine di un vecchio villaggio Cryf inghiottito dalla natura",
			"vicino a un lago su cui si riversa una grande cascata",
		];
		const location = Math.floor(Math.random() * locations.length);
		console.log("Sei " + locations[location]);

		// Genero una minaccia
		const enemies = [
			"I nemici saranno briganti",
			"I nemici saranno soldati del malvagio esercito invasore chiamato Corvo Nero",
			"I nemici saranno animali feroci",
			"I nemici saranno zombie",
			"I nemici saranno barbari Cryf che odiano gli imperiali perché hanno conquistato le loro terre",
			"I nemici saranno guerrieri demonisti provenienti dal malvagio Impero orientale di Ates-Kara",
			"I nemici saranno briganti cannibali appartenenti alla Banda del Macellaio",
			"Il nemico sarà un enorme cinghiale nero feroce dalle zanne aguzze e dalla forza incredibile",
			"I nemici saranno degli umani infettati da vistose escrescenze fungine totalmente pazzi e mossi da intenti omicidi",
			"I nemici saranno vampiri scarni e selvaggii e dalle orecchie appuntite e gli incisivi affilati",
		];
		const enemy = Math.floor(Math.random() * enemies.length);
		console.log(enemies[enemy]);

		// Genero un alleato
		const allies = [
			"Un cacciatore sarà mio alleato",
			"Un Cavaliere ramingo della Chiesa di Eol sarà mio alleato",
			"In questa avventura non avrò alleati",
			"In questa avventura non avrò alleati",
			"In questa avventura non avrò alleati",
		];
		const ally = Math.floor(Math.random() * allies.length);
		console.log(allies[ally]);

		// Invio il prompt a ChatGPT

		completeChat.push({
			role: `system`, // ? come si deve omportare chatGPT
			content: `Voglio che ti comporti come se fossi un classico gioco di avventura testuale. Io sarò il protagonista e giocatore principale. Non ho poteri magici di alcun tipo o altre caratteristiche soprannaturali. In questo mondo non esistono oggetti o artefatti magici. In questo mondo non esistono oggetti moderni. Non fare riferimento a te stesso. Questo gioco si svolgerà nell'Impero di Lothar, nella nazione di Terrabruna. In questo Impero si venerano tre Dei: Varna, la dea della legge, Irith il dio della conoscenza e Eol il dio della guerra. Non fare rifermento a elementi religiosi reali. L'avventura sarà a tema sopravvivenza e si svolgerà ${locations[location]}. ${enemies[enemy]}. ${allies[ally]}.  Ogni ambientazione ha una descrizione di 150 caratteri seguita da una array di 3 azioni possibili che io posso compiere. Non aggiungere spiegazioni extra o fare riferimenti a te stesso. Le tue risposte sono solo in formato JSON come questo esempio: ### {"description":"descrizione ambientazione",	"actions":["azione 1", "azione 2", "azione 3"]} ### Non dare altro testo che non sia un oggetto JSON.`,
		});
		setStage();
	}
}

// # Funzione per generare un livello
async function setStage() {
	// 0. Svuotare il placeholder
	placeholder.innerHTML = "";

	// 1. mostrare il loader
	loader.classList.remove("hidden");

	// 2. Chiedere a chatGPT di inventare il livello
	const gptResponse = await makeRequest("/chat/completions", {
		temperature: 0.5,
		model: GPT_MODEL,
		messages: completeChat,
	});

	// 3. Nascondere il loader
	loader.classList.add("hidden");

	// 4. Prendiamo il messaggio di chatGPT e lo inseriamo nello storico chat
	const message = gptResponse.choices[0].message;
	completeChat.push(message);

	// 5. Recuperare il contenuto del messaggio per estrapolare le azioni e la descrizione del livello
	const content = JSON.parse(message.content);
	const actions = content.actions;
	const description = content.description;
	console.log(actions);
	console.log(description);

	if (actions.length === 0) {
		setGameOver(description);
	} else {
		// 6. Mostriamo la descrizione del livello
		setStageDescription(description);

		// 7. Generiamo e mostriamo un'immagine per il livello
		await setStagePicture(description);

		// 8. Mostriamo le azioni disponibili per questo livello
		setStageActions(actions);
	}
}

// # Funzione per effettuare richieste
async function makeRequest(endpoint, payload) {
	const url = API_BASE_URL + endpoint;

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + API_KEY,
		},
	});

	const jsonResponse = await response.json();
	return jsonResponse;
}

// # Funzione per mostrare la descrizione del livello
function setStageDescription(description) {
	// 1. Clonare il template dello stage
	const stageElement = stageTemplate.content.cloneNode(true);

	// 2. Inseriamo la descrizione
	stageElement.querySelector(".stage-description").innerText = description;

	// 3. Montiamo in pagina il template
	placeholder.appendChild(stageElement);
}

// # Funzione per generare e mostrare l'immagine del livello
async function setStagePicture(description) {
	// 1. Chiedo a OpenAI di generare un'immagine
	const generatedImage = await makeRequest("/images/generations", {
		n: 1,
		size: "512x512",
		response_format: "url",
		prompt: `questa immagine è un disegno a matita in bianco e nero ambiantato nel 1600 ed è basata su ${description}. Non disegnare elementi moderni a parte i mostri.`,
	});

	// 2. Recuperiamo l'url dell'immagine
	const imageUrl = generatedImage.data[0].url;

	// 3. Creiamo un tag immagine
	const image = `<img alt="${description}" src="${imageUrl}">`;

	// 4. Lo inseriamo in pagina
	document.querySelector(".stage-picture").innerHTML = image;
}

// # Funzione per mostrare le azioni del livello
function setStageActions(actions) {
	// 1. Costruiamo l'HTML delle azioni
	let actionsHTML = "";
	actions.forEach(function (action) {
		actionsHTML += `<button>${action}</button>`;
	});

	// 2. Montiamoli in pagina
	document.querySelector(".stage-actions").innerHTML = actionsHTML;

	// 3. Li recuperiamo
	const actionButtons = document.querySelectorAll(".stage-actions button");

	// 4. Per ciascuno di essi...
	actionButtons.forEach(function (button) {
		// al click...
		button.addEventListener("click", function () {
			// 1. Recuperiamo l'azione scelta
			const selectedAction = button.innerText;

			// 2. Prepariamo un messaggio per chatGPT
			ringTheBell();
			console.log(destiny);
			completeChat.push({
				role: `user`,
				content: `${selectedAction}. ${destiny}`,
			});

			// 3. Richiediamo la generazione di un nuovo livello
			setStage();
		});
	});

	console.log(actionsHTML);
}

// # Funzione per gestire il gameover

function ringTheBell() {
	let fate = Math.floor(Math.random() * 3 + 1);
	console.log(fate);

	if (fate === 3) {
		chooseYourDestiny();
	} else {
		destiny = `Questa azione non è mortale e porta avanti la storia.`;
		return destiny;
	}
}

function chooseYourDestiny() {
	let grugno = Math.floor(Math.random() * 3 + 1);
	console.log(grugno);
	if (grugno === 3) {
		destiny = `Questa azione è mortale l'elenco delle azioni è vuoto. Descrivi come stavo per morire e come un cucciolo di cinghiale di nome Grugno mi salverà esplodendo e ricoprendo tutto di frattaglie. Usa al massimo 200 caratteri. Non dare altro testo che non sia un oggetto JSON. Le tue risposte sono solo in formato JSON come questo esempio: ### {"description": "descrizione", "actions": []}, ###`;
	} else {
		destiny = `Questa azione è mortale l'elenco delle azioni è vuoto. Descrivi come perdo la vita. Usa al massimo 200 caratteri. Non dare altro testo che non sia un oggetto JSON. Le tue risposte sono solo in formato JSON come questo esempio: ### {"description": "descrizione", "actions": []}, ###`;
		return destiny;
	}
}

function setGameOver(description) {
	// 1. Clonare il template del gameover
	const gameoverElement = gameoverTemplate.content.cloneNode(true);

	// 2. Inseriamo la descrizione nel template
	gameoverElement.querySelector(".gameover-message").innerText = description;

	// 3. Inserire il template in pagina
	placeholder.appendChild(gameoverElement);

	// 4. Recupero il bottone dal template
	const replayButton = document.querySelector(".gameover button");

	// 5. Al click...
	replayButton.addEventListener("click", function () {
		// Riavviamo la pagina e di conseguenza ripartiamo da capo
		window.location.reload();
	});
}

infoBtn.onclick = function getInfo() {
	switch (infoCard.className) {
		// case "":
		// 	infoCard.className = "info-hidden";
		// 	break;
		case "info-hidden":
			infoCard.className = "";
			break;
	}
};

closeBtn.onclick = function getInfo() {
	switch (infoCard.className) {
		case "":
			infoCard.className = "info-hidden";
			break;
		// case "info-hidden":
		// 	infoCard.className = "";
		// 	break;
	}
};
