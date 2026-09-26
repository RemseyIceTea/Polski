// Logika i interaktywność platformy edukacyjnej MaturaPolski100

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initCkeCalculator();
  initEssayBlueprint();
  initSynthesisAnalyzer();
  initMaturaYears();
  initMandatoryBooks();
  initPunctuationTrainer();
  initEssayWizard();
  initSectionInspector();
  initEssayEvaluator();
  initQuiz();
});

// 1. ZARZĄDZANIE ZAKŁADKAMI
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      tabs.forEach(t => t.classList.remove("active", "bg-indigo-600", "text-white"));
      tab.classList.add("active");

      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.remove("hidden");
          content.classList.add("animate-fade-in");
        } else {
          content.classList.add("hidden");
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

// 2. INTERAKTYWNY KALKULATOR PUNKTÓW CKE (0-60 PKT)
function initCkeCalculator() {
  const p1Slider = document.getElementById("calc-p1");
  const p2Slider = document.getElementById("calc-p2");
  const sfwpSlider = document.getElementById("calc-sfwp");
  const klikSlider = document.getElementById("calc-klik");
  const kompSlider = document.getElementById("calc-komp");
  const jezykSlider = document.getElementById("calc-jezyk");
  const ortoSlider = document.getElementById("calc-orto");
  const interpSlider = document.getElementById("calc-interp");
  const cardinalCheckbox = document.getElementById("calc-cardinal");

  const totalPointsEl = document.getElementById("calc-total-points");
  const percentageEl = document.getElementById("calc-percentage");
  const essayPointsEl = document.getElementById("calc-essay-points");
  const statusBadgeEl = document.getElementById("calc-status-badge");
  const cardinalAlertEl = document.getElementById("calc-cardinal-alert");

  function calculate() {
    const isCardinal = cardinalCheckbox.checked;

    const p1 = parseInt(p1Slider.value) || 0;
    const p2 = parseInt(p2Slider.value) || 0;
    
    let sfwp = parseInt(sfwpSlider.value) || 0;
    let klik = parseInt(klikSlider.value) || 0;
    let komp = parseInt(kompSlider.value) || 0;
    let jezyk = parseInt(jezykSlider.value) || 0;
    let orto = parseInt(ortoSlider.value) || 0;
    let interp = parseInt(interpSlider.value) || 0;

    let essayTotal = 0;

    if (isCardinal) {
      // Błąd kardynalny zeruje całe wypracowanie!
      essayTotal = 0;
      cardinalAlertEl.classList.remove("hidden");
    } else {
      cardinalAlertEl.classList.add("hidden");
      // Jeśli KLiK wynosi 0, reszta kryteriów wypracowania również 0
      if (klik === 0) {
        komp = 0;
        jezyk = 0;
        orto = 0;
        interp = 0;
      }
      essayTotal = sfwp + klik + komp + jezyk + orto + interp;
    }

    const total = p1 + p2 + essayTotal;
    const pct = Math.round((total / 60) * 100);

    totalPointsEl.innerText = `${total}/60 pkt`;
    percentageEl.innerText = `${pct}%`;
    essayPointsEl.innerText = `${essayTotal}/35 pkt`;

    // Aktualizacja etykiet suwaków
    document.getElementById("calc-p1-val").innerText = `${p1}/10`;
    document.getElementById("calc-p2-val").innerText = `${p2}/15`;
    document.getElementById("calc-sfwp-val").innerText = `${sfwp}/1`;
    document.getElementById("calc-klik-val").innerText = `${klik}/16`;
    document.getElementById("calc-komp-val").innerText = `${komp}/7`;
    document.getElementById("calc-jezyk-val").innerText = `${jezyk}/7`;
    document.getElementById("calc-orto-val").innerText = `${orto}/2`;
    document.getElementById("calc-interp-val").innerText = `${interp}/2`;

    // Status zdawalności (próg 30% = 18 pkt)
    if (total >= 18) {
      statusBadgeEl.className = "px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      if (total >= 54) {
        statusBadgeEl.innerText = "🏆 Wynik Wybitny (90-100%) - Studia Top!";
      } else if (total >= 36) {
        statusBadgeEl.innerText = "✅ Egzamin Zdany Bardzo Dobrze (60%+)";
      } else {
        statusBadgeEl.innerText = "✓ Egzamin Zdany (Powyżej 30%)";
      }
    } else {
      statusBadgeEl.className = "px-3 py-1 text-xs font-semibold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30";
      statusBadgeEl.innerText = "❌ Egzamin Niezdany (Poniżej 18 pkt)";
    }
  }

  const inputs = [p1Slider, p2Slider, sfwpSlider, klikSlider, kompSlider, jezykSlider, ortoSlider, interpSlider, cardinalCheckbox];
  inputs.forEach(input => input.addEventListener("input", calculate));
  calculate();
}

// 3. ANALIZATOR NOTATKI SYNTETYZUJĄCEJ (60-90 SŁÓW)
function initSynthesisAnalyzer() {
  const textarea = document.getElementById("synthesis-input");
  const wordCountDisplay = document.getElementById("synthesis-word-count");
  const statusBadge = document.getElementById("synthesis-status-badge");
  const warningsContainer = document.getElementById("synthesis-warnings");
  const exampleButtons = document.querySelectorAll(".load-synthesis-example");

  function analyze() {
    const text = textarea.value.trim();
    if (!text) {
      wordCountDisplay.innerText = "0 słów";
      statusBadge.innerText = "Czekam na tekst...";
      statusBadge.className = "px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-400";
      warningsContainer.innerHTML = "";
      return;
    }

    // Liczenie słów (rozdzielenie spacjami i znakami interpunkcyjnymi)
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const count = words.length;
    wordCountDisplay.innerText = `${count} słów`;

    let warnings = [];

    // Sprawdzanie limitu słów CKE (60 - 90)
    if (count < 60) {
      statusBadge.innerText = `Za krótka (${count}/60 min) - utrata punktów!`;
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30";
      warnings.push("⚠️ Tekst liczy mniej niż 60 słów. Egzaminator odejmie punkty za warunki formalne polecenia.");
    } else if (count > 90) {
      statusBadge.innerText = `Za długa (${count}/90 max) - utrata punktów!`;
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30";
      warnings.push("⚠️ Tekst przekracza 90 słów! Zgodnie z wytycznymi CKE notatka powyżej limitu traci punkty.");
    } else {
      statusBadge.innerText = `Idealna długość (${count} słów) ✅`;
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    }

    // Wykrywanie błędów streszczania po kolei (zakaz CKE)
    const lower = text.toLowerCase();
    if (lower.includes("w pierwszym tekście") || lower.includes("w drugim tekście") || lower.includes("pierwszy tekst mówi") || lower.includes("drugi tekst mówi")) {
      warnings.push("🚨 Wykryto sformułowanie streszczające teksty po kolei ('w pierwszym tekście... w drugim tekście'). CKE wymaga uogólnionej syntezy porównawczej!");
    }

    if (!lower.includes("obaj") && !lower.includes("oboje") && !lower.includes("autorzy") && !lower.includes("twórcy") && !lower.includes("badacze")) {
      warnings.push("💡 Wskazówka spójności: Warto w pierwszym zdaniu odwołać się do obu autorów wspólnie (np. 'Autorzy obu tekstów podejmują refleksję nad...').");
    }

    // Renderowanie ostrzeżeń
    if (warnings.length > 0) {
      warningsContainer.innerHTML = warnings.map(w => `<div class="p-2 text-xs rounded bg-slate-800/80 border border-slate-700 text-slate-200">${w}</div>`).join("");
    } else {
      warningsContainer.innerHTML = `<div class="p-2 text-xs rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">Świetnie! Brak zakazanych konstrukcji streszczających. Pamiętaj o zachowaniu spójności logicznej.</div>`;
    }
  }

  textarea.addEventListener("input", analyze);

  exampleButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const example = MATURA_DATA.synthesisGuide.exampleTasks[index];
      if (example) {
        textarea.value = example.modelText;
        analyze();
      }
    });
  });
}

// 4. BANK 5 LAT MATUR (2021-2025)
function initMaturaYears() {
  const container = document.getElementById("matura-years-tabs");
  const contentArea = document.getElementById("matura-year-content");

  if (!container || !contentArea) return;

  function renderYear(yearData) {
    contentArea.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/70 border border-slate-700">
          <div>
            <span class="px-2.5 py-1 text-xs font-semibold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">${yearData.formula}</span>
            <h3 class="text-2xl font-bold text-white mt-1">Egzamin Maturalny CKE: Maj ${yearData.year}</h3>
          </div>
          <div class="text-right text-xs text-slate-400">
            Arkusze oryginalne CKE • Poziom podstawowy
          </div>
        </div>

        <!-- Tematy wypracowań -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${yearData.topics.map(t => `
            <div class="p-5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-indigo-500/40 transition">
              <span class="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">Temat ${t.id}</span>
              <h4 class="text-lg font-bold text-white mt-1 mb-3">„${t.title}”</h4>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">${t.analysis}</p>
              
              <div class="space-y-2 border-t border-slate-800 pt-3 text-xs">
                <div class="text-slate-400"><strong class="text-slate-300">Sugerowane lektury:</strong> ${t.suggestedReadings.join(", ")}</div>
                <div class="text-slate-400"><strong class="text-slate-300">Konteksty kluczowe:</strong> ${t.contexts.join(", ")}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Wzorcowe wypracowanie na 35/35 -->
        <div class="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">OCENA CKE: ${yearData.modelEssay.score} PKT</span>
                <span class="text-xs text-slate-400 font-mono">${yearData.modelEssay.wordCount} słów (optimum CKE)</span>
              </div>
              <h4 class="text-xl font-bold text-white mt-2">Wzorcowe Wypracowanie: „${yearData.modelEssay.topic}”</h4>
            </div>
            <div class="flex items-center gap-2">
              <button id="toggle-cke-markup" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5">
                <span>🎨 Włącz/Wyłącz Podświetlenie Kryteriów CKE</span>
              </button>
            </div>
          </div>

          <!-- Legenda oznaczeń -->
          <div id="cke-markup-legend" class="flex flex-wrap gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs mb-6">
            <span class="cke-thesis text-amber-300">■ Teza główna / Hipoteza</span>
            <span class="cke-argument text-indigo-300">■ Argument & Lektura</span>
            <span class="cke-context text-emerald-300">■ Kontekst funkcjonalny</span>
            <span class="cke-connector text-pink-300">■ Konektor spójności</span>
            <span class="cke-conclusion text-sky-300">■ Wniosek cząstkowy / Puenta</span>
          </div>

          <!-- Treść wypracowania z podziałem na akapity -->
          <div id="model-essay-text" class="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4 whitespace-pre-line font-light">
            ${highlightEssay(yearData.modelEssay.text)}
          </div>
        </div>
      </div>
    `;

    // Obsługa podświetlania kryteriów
    const toggleBtn = document.getElementById("toggle-cke-markup");
    const legend = document.getElementById("cke-markup-legend");
    const essayEl = document.getElementById("model-essay-text");

    let isHighlighted = true;
    toggleBtn.addEventListener("click", () => {
      isHighlighted = !isHighlighted;
      if (isHighlighted) {
        essayEl.innerHTML = highlightEssay(yearData.modelEssay.text);
        legend.classList.remove("hidden");
        toggleBtn.innerText = "🎨 Wyłącz Podświetlenie Kryteriów";
      } else {
        essayEl.innerText = yearData.modelEssay.text;
        legend.classList.add("hidden");
        toggleBtn.innerText = "🎨 Włącz Podświetlenie Kryteriów";
      }
    });
  }

  // Funkcja aplikująca podświetlenia kluczowych fraz CKE
  function highlightEssay(raw) {
    let text = raw;
    
    // Podświetlenie tez
    text = text.replace(/(Uważam, że najtrwalszym źródłem nadziei[^.]+\.)/g, '<span class="cke-thesis" title="Teza główna wypracowania">$1</span>');
    text = text.replace(/(Uważam, że bunt jest siłą ambiwalentną[^.]+\.)/g, '<span class="cke-thesis" title="Teza główna wypracowania">$1</span>');
    text = text.replace(/(Uważam, że człowiek jest z istoty bytem pełnym sprzeczności[^.]+\.)/g, '<span class="cke-thesis" title="Teza główna wypracowania">$1</span>');
    text = text.replace(/(Uważam, że tradycja jest dla człowieka przede wszystkim ostoją tożsamości[^.]+\.)/g, '<span class="cke-thesis" title="Teza główna wypracowania">$1</span>');
    text = text.replace(/(Uważam, że ambicja ma naturę dwoistą[^.]+\.)/g, '<span class="cke-thesis" title="Teza główna wypracowania">$1</span>');

    // Podświetlenie kontekstów
    text = text.replace(/(kontekst filozoficzny egzystencjalizmu laickiego[^.]+\.)/gi, '<span class="cke-context" title="Kontekst filozoficzny">$1</span>');
    text = text.replace(/(Kontekst historyczny związany ze zbrodniami systemu gułagów[^.]+\.)/gi, '<span class="cke-context" title="Kontekst historyczny">$1</span>');
    text = text.replace(/(Kontekst literacki i filozoficzny tego wątku odsyła nas do mitu o Prometeuszu[^.]+\.)/gi, '<span class="cke-context" title="Kontekst literacko-mitologiczny">$1</span>');
    text = text.replace(/(Kontekst historyczny represji carskich po powstaniu listopadowym[^.]+\.)/gi, '<span class="cke-context" title="Kontekst historyczny">$1</span>');
    text = text.replace(/(kontekst filozoficzny nawiązujący do koncepcji Fryderyka Nietzschego[^.]+\.)/gi, '<span class="cke-context" title="Kontekst filozoficzny">$1</span>');
    text = text.replace(/(kontekst biograficzno-emigracyjny powstania utworu[^.]+\.)/gi, '<span class="cke-context" title="Kontekst biograficzny">$1</span>');

    // Podświetlenie konektorów
    const connectors = [
      "Potwierdzeniem tej tezy jest",
      "Do refleksji nad",
      "Innym, jeszcze bardziej dramatycznym dowodem",
      "Podsumowując powyższe rozważania",
      "Wspaniałym przykładem buntu",
      "Drugim, klasycznym przykładem",
      "Niezwykle wnikliwe studium",
      "Drugą postacią, która stanowi",
      "Niezrównanym obrazem",
      "Zupełnie inne, krytyczne spojrzenie",
      "Złożony charakter ambicji",
      "Z kolei przykładem",
      "Warto przy tym"
    ];
    connectors.forEach(c => {
      const reg = new RegExp(`(${c})`, 'g');
      text = text.replace(reg, '<span class="cke-connector" title="Konektor spójności międzyakapitowej">$1</span>');
    });

    return text;
  }

  // Generowanie przycisków lat
  container.innerHTML = MATURA_DATA.maturaYears.map((y, index) => `
    <button class="year-btn px-4 py-2 text-sm font-semibold rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 transition ${index === 0 ? 'bg-indigo-600 text-white border-indigo-500' : ''}" data-year="${y.year}">
      Matura ${y.year}
    </button>
  `).join("");

  const yearButtons = container.querySelectorAll(".year-btn");
  yearButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      yearButtons.forEach(b => b.classList.remove("bg-indigo-600", "text-white", "border-indigo-500"));
      btn.classList.add("bg-indigo-600", "text-white", "border-indigo-500");
      renderYear(MATURA_DATA.maturaYears[index]);
    });
  });

  // Render pierwszego roku domyślnie
  renderYear(MATURA_DATA.maturaYears[0]);
}

// 5. ENCYKLOPEDIA LEKTUR Z TARCZĄ ANTYKARDYNALNĄ
function initMandatoryBooks() {
  const container = document.getElementById("books-grid");
  const searchInput = document.getElementById("book-search");
  const epochFilter = document.getElementById("epoch-filter");

  if (!container) return;

  function renderBooks(books) {
    if (books.length === 0) {
      container.innerHTML = `<div class="col-span-full p-8 text-center text-slate-400">Nie znaleziono lektury spełniającej kryteria.</div>`;
      return;
    }

    container.innerHTML = books.map(b => `
      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition card-glow flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-slate-800 text-indigo-400 border border-indigo-500/20">${b.epoch}</span>
            <span class="text-xs text-slate-500 font-mono">${b.type}</span>
          </div>

          <h3 class="text-xl font-bold text-white mb-1">„${b.title}”</h3>
          <p class="text-xs font-medium text-slate-400 mb-3">${b.author}</p>

          <p class="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
            <strong>O czym jest:</strong> ${b.coreTheme}
          </p>

          <div class="space-y-3 mb-4">
            <div>
              <span class="text-xs font-semibold text-slate-400 block mb-1">Kluczowe postacie:</span>
              <div class="space-y-1">
                ${b.keyCharacters.map(c => `
                  <div class="text-xs text-slate-300"><span class="text-indigo-300 font-medium">${c.name}:</span> ${c.role}</div>
                `).join("")}
              </div>
            </div>

            <div>
              <span class="text-xs font-semibold text-slate-400 block mb-1">Uniwersalne motywy maturalne:</span>
              <div class="flex flex-wrap gap-1.5">
                ${b.universalThemes.map(m => `<span class="px-2 py-0.5 text-[11px] rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">${m}</span>`).join("")}
              </div>
            </div>
          </div>
        </div>

        <!-- Czerwona Tarcza Antykardynalna -->
        <div class="mt-4 pt-4 border-t border-slate-800">
          <div class="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs">
            <div class="flex items-center gap-1.5 text-rose-400 font-bold mb-1.5">
              <span>🛡️ TARCZA ANTYKARDYNALNA: CZEGO NIE POMYLIĆ!</span>
            </div>
            <ul class="list-disc list-inside space-y-1 text-rose-200/90 text-[11px]">
              ${b.antiCardinalShield.map(item => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `).join("");
  }

  function filter() {
    const query = searchInput.value.toLowerCase();
    const epoch = epochFilter.value;

    const filtered = MATURA_DATA.mandatoryBooks.filter(b => {
      const matchQuery = b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query) || b.universalThemes.some(t => t.toLowerCase().includes(query));
      const matchEpoch = epoch === "all" || b.epoch.toLowerCase().includes(epoch.toLowerCase());
      return matchQuery && matchEpoch;
    });

    renderBooks(filtered);
  }

  searchInput.addEventListener("input", filter);
  epochFilter.addEventListener("change", filter);

  renderBooks(MATURA_DATA.mandatoryBooks);
}

// 6. TRENER INTERPUNKCJI I SKŁADNI (KROPKA VS PRZECINEK)
function initPunctuationTrainer() {
  const container = document.getElementById("punctuation-exercises");
  if (!container) return;

  const exercises = MATURA_DATA.punctuationMastery.interactiveExercises;

  container.innerHTML = exercises.map(ex => {
    // Rozbicie zdania na segmenty
    return `
      <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 mb-4" id="ex-${ex.id}">
        <div class="text-xs text-slate-400 font-mono mb-2">Zadanie ${ex.id} z ${exercises.length}</div>
        <p class="text-base text-slate-200 mb-4 leading-loose">
          ${renderSentenceWithSelects(ex)}
        </p>
        <button class="check-punct-btn px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition" data-id="${ex.id}">
          Sprawdź Interpunkcję
        </button>
        <div class="feedback-area mt-3 hidden text-xs p-3 rounded-lg"></div>
      </div>
    `;
  }).join("");

  function renderSentenceWithSelects(ex) {
    let html = ex.sentence;
    ex.blanks.forEach(b => {
      const placeholder = `[${b.pos}]`;
      const selectHtml = `
        <select class="punct-select bg-slate-800 border border-slate-700 text-indigo-300 font-bold rounded px-2 py-0.5 text-sm mx-1 focus:outline-none focus:border-indigo-500" data-pos="${b.pos}">
          <option value="">(brak znaku)</option>
          <option value=",">, (przecinek)</option>
          <option value=".">. (kropka)</option>
        </select>
      `;
      html = html.replace(placeholder, selectHtml);
    });
    return html;
  }

  container.querySelectorAll(".check-punct-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const exercise = exercises.find(e => e.id === id);
      const parent = document.getElementById(`ex-${id}`);
      const selects = parent.querySelectorAll(".punct-select");
      const feedbackEl = parent.querySelector(".feedback-area");

      let allCorrect = true;
      let reasons = [];

      selects.forEach(sel => {
        const pos = parseInt(sel.getAttribute("data-pos"));
        const blank = exercise.blanks.find(b => b.pos === pos);
        const userVal = sel.value;

        if (userVal === blank.correct) {
          sel.classList.remove("border-rose-500", "bg-rose-950/30");
          sel.classList.add("border-emerald-500", "bg-emerald-950/30");
        } else {
          sel.classList.remove("border-emerald-500", "bg-emerald-950/30");
          sel.classList.add("border-rose-500", "bg-rose-950/30");
          allCorrect = false;
        }
        reasons.push(`Pozycja [${pos}]: ${blank.correct === "" ? "BRAK ZNAKU" : blank.correct} – ${blank.reason}`);
      });

      feedbackEl.classList.remove("hidden");
      if (allCorrect) {
        feedbackEl.className = "feedback-area mt-3 text-xs p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 space-y-1";
        feedbackEl.innerHTML = `<strong>Doskonale! Wszystkie znaki postawione prawidłowo.</strong><br>${reasons.join("<br>")}`;
      } else {
        feedbackEl.className = "feedback-area mt-3 text-xs p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 space-y-1";
        feedbackEl.innerHTML = `<strong>Zauważono błąd. Sprawdź uzasadnienie reguł CKE:</strong><br>${reasons.join("<br>")}`;
      }
    });
  });
}

// 7. KREATOR ROZPRAWKI NA ZAMÓWIENIE (OBSŁUGA SCHEMATÓW, WŁASNYCH TEMATÓW I STRUKTUR)
function initEssayWizard() {
  const topicSelect = document.getElementById("wizard-topic-select");
  const customTopicWrapper = document.getElementById("wizard-custom-topic-wrapper");
  const customTopicInput = document.getElementById("wizard-custom-topic");
  const book1Select = document.getElementById("wizard-book1-select");
  const book2Select = document.getElementById("wizard-book2-select");
  const contextSelect = document.getElementById("wizard-context-select");
  const schemeSelect = document.getElementById("wizard-scheme-select");
  const schemeBadge = document.getElementById("wizard-scheme-badge");
  const schemeDesc = document.getElementById("wizard-scheme-desc");
  const customConfig = document.getElementById("wizard-custom-config");
  const customParagraphs = document.getElementById("wizard-custom-paragraphs");
  const customThesis = document.getElementById("wizard-custom-thesis");
  const customStyle = document.getElementById("wizard-custom-style");
  const generateBtn = document.getElementById("wizard-generate-btn");
  const outputEl = document.getElementById("wizard-output");

  if (!topicSelect || !generateBtn) return;

  // Wypełnienie tematów (oficjalne tematy CKE + opcja własnego tematu)
  const allTopics = [];
  MATURA_DATA.maturaYears.forEach(y => {
    y.topics.forEach(t => allTopics.push({ id: t.id, title: `(${y.year}) ${t.title}` }));
  });
  allTopics.push({ id: "custom", title: "✍️ Własny temat (wpisz poniżej)..." });
  topicSelect.innerHTML = allTopics.map(t => `<option value="${t.id}">${t.title}</option>`).join("");

  // Obsługa pokazywania pola własnego tematu
  topicSelect.addEventListener("change", () => {
    if (customTopicWrapper) {
      if (topicSelect.value === "custom") {
        customTopicWrapper.classList.remove("hidden");
        if (customTopicInput) customTopicInput.focus();
      } else {
        customTopicWrapper.classList.add("hidden");
      }
    }
  });

  // Wypełnienie lektur
  book1Select.innerHTML = MATURA_DATA.mandatoryBooks.map(b => `<option value="${b.id}">[Lektura Obowiązkowa] ${b.title} – ${b.author}</option>`).join("");
  book2Select.innerHTML = MATURA_DATA.mandatoryBooks.map(b => `<option value="${b.id}">${b.title} – ${b.author}</option>`).join("");

  // Obsługa wyboru schematu kompozycyjnego
  if (schemeSelect) {
    schemeSelect.addEventListener("change", () => {
      const selectedId = schemeSelect.value;
      const scheme = MATURA_DATA.essayBlueprint.schemes.find(s => s.id === selectedId);
      if (scheme) {
        if (schemeBadge) schemeBadge.innerText = scheme.badge;
        if (schemeDesc) schemeDesc.innerText = scheme.desc;
      }
      if (customConfig) {
        if (selectedId === "wlasny") {
          customConfig.classList.remove("hidden");
        } else {
          customConfig.classList.add("hidden");
        }
      }
    });
  }

  generateBtn.addEventListener("click", () => {
    const topicId = topicSelect.value;
    let chosenTopic = null;

    if (topicId === "custom") {
      const customVal = (customTopicInput && customTopicInput.value.trim()) ? customTopicInput.value.trim() : "";
      if (!customVal) {
        alert("Wpisz pełną treść swojego tematu wypracowania!");
        if (customTopicInput) customTopicInput.focus();
        return;
      }
      chosenTopic = { id: "custom", title: customVal };
    } else {
      MATURA_DATA.maturaYears.forEach(y => {
        const found = y.topics.find(t => t.id === topicId);
        if (found) chosenTopic = found;
      });
      if (!chosenTopic) chosenTopic = MATURA_DATA.maturaYears[0].topics[0];
    }

    const b1 = MATURA_DATA.mandatoryBooks.find(b => b.id === book1Select.value) || MATURA_DATA.mandatoryBooks[0];
    const b2 = MATURA_DATA.mandatoryBooks.find(b => b.id === book2Select.value) || MATURA_DATA.mandatoryBooks[1];
    const contextType = contextSelect.value;
    const selectedSchemeId = schemeSelect ? schemeSelect.value : "klasyczny";

    // Oczyszczenie tematu do formowania zdań
    const rawTitle = chosenTopic.title.replace(/[„”"]/g, '').trim();
    const cleanTopic = rawTitle.endsWith('.') ? rawTitle.slice(0, -1) : rawTitle;

    outputEl.classList.remove("hidden");

    let outlineHtml = "";

    if (selectedSchemeId === "dialektyczny") {
      outlineHtml = `
        <!-- Akapit 1 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-amber-400">AKAPIT 1: WSTĘP PROBLEMOWY (ok. 65 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Hipoteza badawcza + dylemat</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Zarysowanie dylematu:</strong> Kwestia: „${cleanTopic}” od wieków wymyka się jednoznacznym ocenom moralnym i filozoficznym.</p>
            <p><strong class="text-slate-200">Hipoteza badawcza:</strong> Czy omawiane zjawisko jest dla człowieka źródłem życiowego ocalenia i siły, czy też prowadzi do nieuchronnego upadku i destrukcji?</p>
            <p><strong class="text-slate-200">Zapowiedź toku analizy:</strong> Złożoność tej ambiwalencji rozważę, konfrontując ze sobą postawy bohaterów dzieł „${b1.title}” ${b1.author}a oraz „${b2.title}” ${b2.author}a.</p>
          </div>
        </div>

        <!-- Akapit 2 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 2: ROZWINIĘCIE I – ARGUMENT / PRO (ok. 130 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Jasna strona medalu: „${b1.title}”</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Teza cząstkowa:</strong> Z jednej strony zagadnienie to może stanowić impuls do heroicznej obrony wartości, co ukazuje postawa: ${b1.keyCharacters[0].name}.</p>
            <p><strong class="text-slate-200">Analiza problemowa:</strong> W dziele „${b1.title}” bohater podejmuje walkę, w której ${b1.coreTheme.toLowerCase()}. Jego determinacja świadczy o...</p>
            <p><strong class="text-slate-200">Kontekst cząstkowy (${contextType}):</strong> Warto zauważyć, że uwarunkowania epoki unaoczniają konieczność takiego wyboru...</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy I:</strong> W tym ujęciu ludzkie dążenia jawią się jako triumf moralnej godności.</p>
          </div>
        </div>

        <!-- Akapit 3 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 3: ROZWINIĘCIE II – ANTYTEZA / CONTRA (ok. 130 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Ciemna strona medalu: „${b2.title}”</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Konektor antytetyczny:</strong> Zgoła odmienne, dramatyczne konsekwencje ujawnia jednak lektura „${b2.title}” ${b2.author}a.</p>
            <p><strong class="text-slate-200">Analiza wątku:</strong> Postać ${b2.keyCharacters[0].name} dowodzi, że gdy człowiek zatraci umiar lub ulegnie iluzjom, ${b2.coreTheme.toLowerCase()}. Konsekwencją staje się cierpienie i kryzys tożsamości.</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy II:</strong> Powyższy przykład uwypukla niszczycielski potencjał analizowanego zjawiska.</p>
          </div>
        </div>

        <!-- Akapit 4 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-purple-400">AKAPIT 4: KONTEKST SYNTEZUJĄCY (ok. 50 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Filozoficzna podbudowa</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Kontekst funkcjonalny:</strong> Rozdarcie to doskonale koresponduje z kontekstem filozoficznym badającym dualistyczną naturę człowieka, który jest rozpięty między dążeniem do dobra a uleganiem słabościom.</p>
          </div>
        </div>

        <!-- Akapit 5 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-emerald-400">AKAPIT 5: ZAKOŃCZENIE – SYNTEZA & TEZA KOŃCOWA (ok. 70 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Rozstrzygnięcie hipotezy</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Rozstrzygnięcie i Teza:</strong> Zestawienie obu perspektyw pozwala ostatecznie rozstrzygnąć postawioną we wstępie hipotezę: człowiek nie jest istotą jednowymiarową, a konfrontacja z problemem: „${cleanTopic}” staje się sprawdzianem jego dojrzałości.</p>
            <p><strong class="text-slate-200">Puenta:</strong> Ostateczny bilans nie zależy od samej sytuacji, lecz od wewnętrznego kodeksu etycznego, którym jednostka kieruje się w obliczu życiowych prób.</p>
          </div>
        </div>
      `;
    } else if (selectedSchemeId === "porownawczy") {
      outlineHtml = `
        <!-- Akapit 1 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-amber-400">AKAPIT 1: WSTĘP SYNCHRONICZNY (ok. 65 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Uniwersalny topos + Teza łącząca</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Wprowadzenie:</strong> Motyw ten w literaturze różnych epok stanowi uniwersalne zwierciadło ludzkich zmagań z losem.</p>
            <p><strong class="text-slate-200">Teza:</strong> Niezależnie od epoki i kultury, zagadnienie: „${cleanTopic}” zmusza człowieka do zdefiniowania fundamentów swojego istnienia.</p>
            <p><strong class="text-slate-200">Zapowiedź porównania:</strong> Zbieżność i odmienność tych doświadczeń przeanalizuję poprzez paralelne zestawienie losów bohaterów „${b1.title}” ${b1.author}a oraz „${b2.title}” ${b2.author}a.</p>
          </div>
        </div>

        <!-- Akapit 2 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 2: ASPEKT I – GENEZA I MOTYWACJE (ok. 140 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Porównanie motywów obu bohaterów</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Teza aspektu I:</strong> Zarówno u ${b1.author}a, jak i u ${b2.author}a punktem wyjścia do działania staje się głębokie poczucie niezgody na zastany porządek.</p>
            <p><strong class="text-slate-200">Bohater 1 w „${b1.title}”:</strong> Postać ${b1.keyCharacters[0].name} kieruje się pragnieniem ${b1.coreTheme.toLowerCase().slice(0, 80)}...</p>
            <p><strong class="text-slate-200">Paralela z Bohaterem 2 w „${b2.title}”:</strong> Podobny mechanizm psychologiczny unaocznia postać ${b2.keyCharacters[0].name}, która również...</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy I:</strong> Wspólnym źródłem ich decyzji okazuje się niezbywalna potrzeba wolności i samostanowienia.</p>
          </div>
        </div>

        <!-- Akapit 3 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 3: ASPEKT II – KONSEKWENCJE I CENA WYBORÓW (ok. 140 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Zderzenie skutków i przemiany bohaterów</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Teza aspektu II:</strong> Konsekwencje podejmowanych kroków obnażają jednak różnicę w moralnym bilansie obu postaci.</p>
            <p><strong class="text-slate-200">Skutki dla postaci z „${b1.title}”:</strong> Podczas gdy ${b1.keyCharacters[0].name} ponosi cenę...</p>
            <p><strong class="text-slate-200">Skutki dla postaci z „${b2.title}”:</strong> Losy ${b2.keyCharacters[0].name} dowodzą natomiast, że...</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy II:</strong> Porównanie to dobitnie uwypukla, że ocalenie przynosi jedynie pokora i solidarność z innymi.</p>
          </div>
        </div>

        <!-- Akapit 4 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-purple-400">AKAPIT 4: KONTEKST KULTUROWY / MOTYWICZNY (ok. 50 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Wspólny archetyp</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Topos literacki:</strong> W obu dziełach odnajdujemy uniwersalny topos wędrowca (homo viator) zmagającego się z własnym losem, co nadaje analizowanym zjawiskom ponadczasowy wymiar.</p>
          </div>
        </div>

        <!-- Akapit 5 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-emerald-400">AKAPIT 5: ZAKOŃCZENIE (ok. 65 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Syntetyczny bilans porównania</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Synteza:</strong> Reasumując, zestawienie „${b1.title}” oraz „${b2.title}” dowodzi, że choć realia historyczne ulegają zmianie, dylematy ludzkiego serca pozostają niezmienne.</p>
            <p><strong class="text-slate-200">Puenta:</strong> Ostateczną miarą wielkości człowieka nie jest brak potknięć, lecz gotowość do wzięcia odpowiedzialności za własne czyny.</p>
          </div>
        </div>
      `;
    } else if (selectedSchemeId === "egzystencjalny") {
      outlineHtml = `
        <!-- Akapit 1 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-amber-400">AKAPIT 1: WSTĘP EGZYSTENCJALNY (ok. 65 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Sytuacja graniczna + Teza o godności</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Refleksja o kondycji człowieka:</strong> W konfrontacji z problemem: „${cleanTopic}” człowiek staje w obliczu sytuacji granicznej, która bezlitośnie obnaża kruchość ludzkiego bytu.</p>
            <p><strong class="text-slate-200">Teza egzystencjalna:</strong> Uważam, że jedynym skutecznym ocaleniem w świecie kryzysu wartości jest bezkompromisowa obrona wewnętrznej godności oraz etyka solidarności z cierpiącym bliźnim.</p>
            <p><strong class="text-slate-200">Zapowiedź utworów:</strong> Prawdę tę unaoczniają dramatyczne losy bohaterów „${b1.title}” ${b1.author}a oraz „${b2.title}” ${b2.author}a.</p>
          </div>
        </div>

        <!-- Akapit 2 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 2: ROZWINIĘCIE I – DOŚWIADCZENIE ZŁA I KRYZYS (ok. 135 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">„${b1.title}” – Konfrontacja z nieludzkim światem</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Teza cząstkowa I:</strong> W pierwszej kolejności należy wskazać, jak w utworze „${b1.title}” człowiek zostaje poddany niszczycielskiemu działaniu sił zewnętrznych.</p>
            <p><strong class="text-slate-200">Analiza postawy bohatera:</strong> Postać ${b1.keyCharacters[0].name} staje w obliczu dramatu, w którym ${b1.coreTheme.toLowerCase()}. Doświadczenie to stawia pod znakiem zapytania dotychczasowy sens istnienia.</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy I:</strong> Obraz ten dowodzi, że w obliczu skrajnego zagrożenia jednostka musi dokonać radykalnego samookreślenia.</p>
          </div>
        </div>

        <!-- Akapit 3 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 3: ROZWINIĘCIE II – BUNT MORALNY I OCALENIE WARTOŚCI (ok. 135 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">„${b2.title}” – Triumf człowieczeństwa</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Konektor i teza cząstkowa II:</strong> Odpowiedzią na paraliżujące poczucie absurdu staje się aktywny opór moralny, co ukazuje „${b2.title}” ${b2.author}a.</p>
            <p><strong class="text-slate-200">Analiza wątku:</strong> Postawa postaci: ${b2.keyCharacters[0].name} unaocznia, że ${b2.coreTheme.toLowerCase()}. Zamiast ulec rozpaczy, bohater wybiera wierność zasadom.</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy II:</strong> Świadczy to dobitnie o tym, że nawet w najbardziej nieludzkich okolicznościach człowiek ma moc ocalenia swego człowieczeństwa.</p>
          </div>
        </div>

        <!-- Akapit 4 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-purple-400">AKAPIT 4: KONTEKST EGZYSTENCJALNO-ETYCZNY (ok. 55 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Filozofia sytuacji granicznych</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Kontekst funkcjonalny:</strong> Powyższe wnioski znajdują uzasadnienie w filozofii egzystencjalizmu (Camus, Jaspers), według której to w sytuacjach granicznych rodzi się autentyczna wolność i odpowiedzialność człowieka za kształt świata.</p>
          </div>
        </div>

        <!-- Akapit 5 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-emerald-400">AKAPIT 5: ZAKOŃCZENIE I PUENTA (ok. 65 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Przesłanie humanistyczne</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Podsumowanie:</strong> Konkludując, czasy trudne i doświadczenie cierpienia nie muszą prowadzić do nihilizmu, jeśli człowiek zachowa zdolność do miłości i wierności prawdzie.</p>
            <p><strong class="text-slate-200">Puenta:</strong> Zarówno dzieło ${b1.author}a, jak i ${b2.author}a przypominają, że największym zwycięstwem jednostki jest ocalenie godności wbrew otaczającemu mrokowi.</p>
          </div>
        </div>
      `;
    } else if (selectedSchemeId === "wlasny") {
      const numP = customParagraphs ? customParagraphs.value : "2";
      const thesisType = customThesis ? customThesis.value : "intro_deductive";
      const styleType = customStyle ? customStyle.value : "block";

      const thesisText = thesisType === "intro_deductive"
        ? "Uważam jednoznacznie, że omawiane zjawisko w kluczowy sposób definiuje tożsamość i dojrzałość człowieka."
        : (thesisType === "intro_hypothesis"
            ? "Pytanie brzmi: czy zjawisko to jest dla jednostki szansą na rozwój, czy też źródłem życiowej klęski?"
            : "Moim zdaniem prawda leży pośrodku – zjawisko to łączy w sobie zarówno szlachetne porywy serca, jak i ryzyko destrukcji.");

      outlineHtml = `
        <div class="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 mb-4">
          ⚙️ <strong>Konfiguracja Własnego Schematu:</strong> ${numP} akapity rozwinięcia • Układ: ${styleType === "block" ? "Blokowy" : "Problemowy (Paralelny)"} • Teza: ${thesisType}
        </div>

        <!-- Akapit 1 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-amber-400">AKAPIT 1: WSTĘP (ok. 60 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Wprowadzenie + Stanowisko</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Zagadnienie:</strong> Problem: „${cleanTopic}” od wieków stanowi jedno z najważniejszych wyzwań ludzkiego bytu.</p>
            <p><strong class="text-slate-200">Stanowisko / Teza:</strong> ${thesisText}</p>
            <p><strong class="text-slate-200">Zapowiedź utworów:</strong> Wywód oprę na analizie utworów „${b1.title}” ${b1.author}a oraz „${b2.title}” ${b2.author}a.</p>
          </div>
        </div>

        <!-- Rozwinięcia -->
        ${styleType === "block" ? `
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-indigo-400">AKAPIT 2: ROZWINIĘCIE I – LEKTURA OBOWIĄZKOWA (ok. 130 słów)</span>
              <span class="text-[11px] text-slate-500 font-mono">„${b1.title}”</span>
            </div>
            <div class="text-xs text-slate-300 space-y-2">
              <p><strong class="text-slate-200">Teza cząstkowa:</strong> W pierwszej kolejności należy przeanalizować postawę bohatera: ${b1.keyCharacters[0].name}.</p>
              <p><strong class="text-slate-200">Analiza problemowa:</strong> W utworze „${b1.title}” autor ukazuje, jak ${b1.coreTheme.toLowerCase()}. Postawa ta dowodzi...</p>
              <p><strong class="text-slate-200">Wniosek cząstkowy:</strong> Fragment ten potwierdza, że podejmowane wybory niosą za sobą fundamentalne konsekwencje.</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-indigo-400">AKAPIT 3: ROZWINIĘCIE II – DRUGI UTWÓR (ok. 130 słów)</span>
              <span class="text-[11px] text-slate-500 font-mono">„${b2.title}”</span>
            </div>
            <div class="text-xs text-slate-300 space-y-2">
              <p><strong class="text-slate-200">Konektor i teza cząstkowa:</strong> Dopełnieniem tej refleksji są losy bohaterów w dziele „${b2.title}” ${b2.author}a.</p>
              <p><strong class="text-slate-200">Analiza problemowa:</strong> Postać ${b2.keyCharacters[0].name} ilustruje, że ${b2.coreTheme.toLowerCase()}.</p>
              <p><strong class="text-slate-200">Wniosek cząstkowy:</strong> Przypadek ten unaocznia uniwersalny wymiar analizowanego motywu.</p>
            </div>
          </div>
        ` : `
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-indigo-400">AKAPIT 2: ROZWINIĘCIE I – PROBLEM: ŹRÓDŁA I MOTYWACJE (ok. 130 słów)</span>
              <span class="text-[11px] text-slate-500 font-mono">Zestawienie „${b1.title}” i „${b2.title}”</span>
            </div>
            <div class="text-xs text-slate-300 space-y-2">
              <p><strong class="text-slate-200">Teza cząstkowa:</strong> Przyczyny analizowanych zachowań u obu twórców tkwią w niezgodzie na zastaną rzeczywistość.</p>
              <p><strong class="text-slate-200">Zderzenie motywacji:</strong> W „${b1.title}” postać ${b1.keyCharacters[0].name} podejmuje działanie, podczas gdy w „${b2.title}” postać ${b2.keyCharacters[0].name}...</p>
              <p><strong class="text-slate-200">Wniosek cząstkowy:</strong> Obaj autorzy wskazują na determinację jako motor ludzkich poczynań.</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-indigo-400">AKAPIT 3: ROZWINIĘCIE II – PROBLEM: SKUTKI I PRZEMIANA (ok. 130 słów)</span>
              <span class="text-[11px] text-slate-500 font-mono">Wnioski egzystencjalne z obu dzieł</span>
            </div>
            <div class="text-xs text-slate-300 space-y-2">
              <p><strong class="text-slate-200">Teza cząstkowa:</strong> Bilans tych wyborów prowadzi do głębokiego przewartościowania życia bohaterów.</p>
              <p><strong class="text-slate-200">Analiza porównawcza:</strong> Doświadczenie ${b1.keyCharacters[0].name} z „${b1.title}” w zestawieniu z drogą ${b2.keyCharacters[0].name} z „${b2.title}” dowodzi...</p>
              <p><strong class="text-slate-200">Wniosek cząstkowy:</strong> Świadczy to o konieczności ponoszenia odpowiedzialności za własne wybory.</p>
            </div>
          </div>
        `}

        ${numP === "3" ? `
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-indigo-400">AKAPIT DODATKOWY: ROZWINIĘCIE III – POGŁĘBIENIE PROBLEMU (ok. 110 słów)</span>
              <span class="text-[11px] text-slate-500 font-mono">Trzecia perspektywa</span>
            </div>
            <div class="text-xs text-slate-300 space-y-2">
              <p><strong class="text-slate-200">Poszerzenie wywodu:</strong> Istotnym dopełnieniem analizy jest zwrócenie uwagi na społeczny odbiór postawy bohaterów.</p>
              <p><strong class="text-slate-200">Wniosek cząstkowy:</strong> Jednostka w starciu ze zbiorowością zmuszona jest do heroizmu lub samotności.</p>
            </div>
          </div>
        ` : ''}

        <!-- Kontekst -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-purple-400">AKAPIT KONTEKSTOWY: KONTEKST FUNKCJONALNY (ok. 50 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Typ: ${contextType}</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Kontekst funkcjonalny:</strong> Należy podkreślić rolę kontekstu (${contextType}), który bezpośrednio tłumaczy motywacje postaci i oświetla ideową wymowę dzieła.</p>
          </div>
        </div>

        <!-- Zakończenie -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-emerald-400">AKAPIT KOŃCOWY: ZAKOŃCZENIE & PUENTA (ok. 65 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Synteza</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Podsumowanie:</strong> Reasumując, przeprowadzone rozważania dowodzą słuszności przyjętego toku myślenia.</p>
            <p><strong class="text-slate-200">Końcowa puenta humanistyczna:</strong> Człowiek w konfrontacji z problemem: „${cleanTopic}” odnajduje prawdę o samym sobie i swoim miejscu w świecie.</p>
          </div>
        </div>
      `;
    } else {
      // Domyślny klasyczny
      outlineHtml = `
        <!-- Akapit 1 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-amber-400">AKAPIT 1: WSTĘP DEDUKCYJNY (ok. 60 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Teza jednoznaczna + wprowadzenie</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Zdanie wprowadzające:</strong> Zagadnienie: „${cleanTopic}” stanowi jeden z najbardziej fundamentalnych problemów ludzkiej egzystencji w obliczu prób dziejowych.</p>
            <p><strong class="text-slate-200">Teza jednoznaczna:</strong> Uważam, że omawiane zjawisko w decydujący sposób weryfikuje moralną dojrzałość człowieka i determinuje jego tożsamość.</p>
            <p><strong class="text-slate-200">Zapowiedź toku wywodu:</strong> Słuszność powyższego twierdzenia wykażę na przykładzie postawy bohaterów dzieła „${b1.title}” ${b1.author}a oraz „${b2.title}” ${b2.author}a.</p>
          </div>
        </div>

        <!-- Akapit 2 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 2: ROZWINIĘCIE I – LEKTURA OBOWIĄZKOWA (ok. 130 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">„${b1.title}”</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Teza cząstkowa:</strong> W pierwszej kolejności należy zauważyć, że w utworze „${b1.title}” problem ten ujawnia się w losach postaci: ${b1.keyCharacters[0].name}.</p>
            <p><strong class="text-slate-200">Analiza sytuacji:</strong> Bohater ten staje w obliczu sytuacji granicznej, w której ${b1.coreTheme.toLowerCase()}.</p>
            <p><strong class="text-slate-200">Kontekst funkcjonalny:</strong> Warto w tym miejscu przywołać kontekst (${contextType}), który unaocznia, że postawa bohatera była uwarunkowana...</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy:</strong> Doświadczenie to jednoznacznie dowodzi, że postawa przyjęta przez bohatera potwierdza tezę o kluczowym znaczeniu podejmowanych wyborów.</p>
          </div>
        </div>

        <!-- Akapit 3 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-400">AKAPIT 3: ROZWINIĘCIE II – DRUGI UTWÓR (ok. 130 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">„${b2.title}”</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Konektor i teza cząstkowa 2:</strong> Zgoła odmienną (lub komplementarną) perspektywę na analizowane zjawisko przynosi lektura „${b2.title}” ${b2.author}a.</p>
            <p><strong class="text-slate-200">Analiza wątku:</strong> W tym dziele uwaga twórcy koncentruje się na ${b2.coreTheme.toLowerCase()}. Postać ${b2.keyCharacters[0].name} ilustruje proces...</p>
            <p><strong class="text-slate-200">Wniosek cząstkowy 2:</strong> Zestawienie to uświadamia uniwersalny charakter zmagania się człowieka z wyzwaniami losu.</p>
          </div>
        </div>

        <!-- Akapit 4 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-purple-400">AKAPIT 4: ZASTOSOWANIE KONTEKSTU (ok. 50 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Kontekst ${contextType}</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Pogłębienie kontekstowe:</strong> Odwołanie do kontekstu (${contextType}) pozwala zrozumieć, że problematyka ta nie była odosobnionym motywem, lecz wyrazem epokowych przemian mentalności.</p>
          </div>
        </div>

        <!-- Akapit 5 -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-emerald-400">AKAPIT 5: PODSUMOWANIE & PUENTA (ok. 60 słów)</span>
            <span class="text-[11px] text-slate-500 font-mono">Zakończenie</span>
          </div>
          <div class="text-xs text-slate-300 space-y-2">
            <p><strong class="text-slate-200">Parafraza tezy:</strong> Reasumując powyższe rozważania, należy skonstatować, że człowiek w konfrontacji z problemem: „${cleanTopic}” odnajduje prawdę o swoich rzeczywistych wartościach.</p>
            <p><strong class="text-slate-200">Końcowa puenta humanistyczna:</strong> Zarówno dzieło ${b1.author}a, jak i utwór ${b2.author}a przypominają, że to nie zewnętrzne okoliczności, lecz wewnętrzna wierność zasadom moralnym stanowi ostateczną miarę człowieczeństwa.</p>
          </div>
        </div>
      `;
    }

    const schemeObj = MATURA_DATA.essayBlueprint.schemes.find(s => s.id === selectedSchemeId) || MATURA_DATA.essayBlueprint.schemes[0];

    outputEl.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            🎯 <strong>Wygenerowany Szablon Kompozycyjny na 35/35 PKT</strong><br>
            Schemat: <span class="text-amber-300 font-bold">${schemeObj.name}</span><br>
            Temat: „${cleanTopic}” • Lektura obowiązkowa: „${b1.title}” • Drugi utwór: „${b2.title}”
          </div>
          <span class="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">${schemeObj.badge}</span>
        </div>

        ${outlineHtml}
      </div>
    `;
    outputEl.scrollIntoView({ behavior: "smooth" });
  });
}

// 8. INSPEKTOR POSZCZEGÓLNYCH CZĘŚCI ROZPRAWKI (MIKRO-AUDYT CKE)
function initSectionInspector() {
  const partTabs = document.querySelectorAll(".inspector-part-btn");
  const infoTitle = document.getElementById("inspector-info-title");
  const infoDesc = document.getElementById("inspector-info-desc");
  const infoWords = document.getElementById("inspector-info-words");
  const loadGoodBtn = document.getElementById("inspector-load-good");
  const loadBadBtn = document.getElementById("inspector-load-bad");
  const clearBtn = document.getElementById("inspector-clear");
  const textInput = document.getElementById("inspector-input");
  const wordCountEl = document.getElementById("inspector-word-count");
  const charCountEl = document.getElementById("inspector-char-count");
  const lengthBadge = document.getElementById("inspector-length-badge");
  const runBtn = document.getElementById("inspector-run-btn");
  const resultsContainer = document.getElementById("inspector-results");

  if (!textInput || !runBtn) return;

  let currentPart = "wstep";

  function updatePartInfo() {
    const data = MATURA_DATA.sectionInspectorData[currentPart];
    if (!data) return;

    if (infoTitle) infoTitle.innerText = `${data.icon} ${data.name}`;
    if (infoDesc) infoDesc.innerText = data.description;
    if (infoWords) infoWords.innerText = data.targetWords.optimal;

    // Reset results and input
    resultsContainer.classList.add("hidden");
    updateLiveMetrics();
  }

  function updateLiveMetrics() {
    const text = textInput.value || "";
    const words = text.trim() ? text.trim().split(/\s+/).filter(w => w.length > 0) : [];
    const count = words.length;
    const chars = text.length;

    if (wordCountEl) wordCountEl.innerText = `${count} ${count === 1 ? 'słowo' : (count >= 2 && count <= 4 ? 'słowa' : 'słów')}`;
    if (charCountEl) charCountEl.innerText = chars;

    const data = MATURA_DATA.sectionInspectorData[currentPart];
    if (!data || !lengthBadge) return;

    if (count === 0) {
      lengthBadge.className = "px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-400";
      lengthBadge.innerText = "Wpisz tekst do zbadania";
    } else if (count < data.targetWords.min) {
      lengthBadge.className = "px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30";
      lengthBadge.innerText = `Za krótki (${count}/${data.targetWords.min} min. słów)`;
    } else if (count > data.targetWords.max) {
      lengthBadge.className = "px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30";
      lengthBadge.innerText = `Za długi (${count}/${data.targetWords.max} max. słów)`;
    } else {
      lengthBadge.className = "px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      lengthBadge.innerText = `Optymalna długość (${count} słów)`;
    }
  }

  // Obsługa zakładek części
  partTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      partTabs.forEach(t => {
        t.classList.remove("active", "bg-indigo-600", "text-white", "border-indigo-400");
        t.classList.add("bg-slate-950", "text-slate-300", "border-slate-800");
      });
      tab.classList.add("active", "bg-indigo-600", "text-white", "border-indigo-400");
      tab.classList.remove("bg-slate-950", "text-slate-300", "border-slate-800");

      currentPart = tab.getAttribute("data-part");
      updatePartInfo();
    });
  });

  // Przyciski próbek
  if (loadGoodBtn) {
    loadGoodBtn.addEventListener("click", () => {
      const data = MATURA_DATA.sectionInspectorData[currentPart];
      if (data && data.sampleGood) {
        textInput.value = data.sampleGood.text;
        updateLiveMetrics();
        runAnalysis();
      }
    });
  }

  if (loadBadBtn) {
    loadBadBtn.addEventListener("click", () => {
      const data = MATURA_DATA.sectionInspectorData[currentPart];
      if (data && data.sampleBad) {
        textInput.value = data.sampleBad.text;
        updateLiveMetrics();
        runAnalysis();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      textInput.value = "";
      updateLiveMetrics();
      resultsContainer.classList.add("hidden");
    });
  }

  textInput.addEventListener("input", updateLiveMetrics);

  // Funkcja analizy
  function runAnalysis() {
    const text = textInput.value.trim();
    if (!text) {
      alert("Wpisz lub załaduj tekst do sprawdzenia!");
      return;
    }

    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const lower = text.toLowerCase();
    const data = MATURA_DATA.sectionInspectorData[currentPart];

    // === ZAAWANSOWANY FILTR GIBBERISH (ZABEZPIECZENIE PRZED "a a a") ===
    let isGibberish = false;
    let gibberishReason = "";
    
    if (wordCount < 3) {
      isGibberish = true;
      gibberishReason = "Tekst jest za krótki, by był sensowną wypowiedzią (minimum 3 słowa).";
    } else {
      const longestWord = Math.max(...words.map(w => w.length));
      const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
      const diversity = uniqueWords / words.length;
      
      const stopWords = ["i", "w", "z", "na", "nie", "do", "że", "to", "jak", "o", "się", "jest", "od", "ale", "za", "ma", "czy", "tak", "co"];
      const foundStopWords = words.filter(w => stopWords.includes(w.toLowerCase())).length;
      
      const letters = text.match(/[a-zżźćńśłóęą]/gi) || [];
      const vowels = text.match(/[aeiouyąęó]/gi) || [];
      const vowelRatio = letters.length > 0 ? vowels.length / letters.length : 0;
      
      const avgWordLength = letters.length / wordCount;
      const hasPunctuation = /[.!?]/.test(text);
      const verbRegex = /([a-ząćęłńóśźż]{2,}(uje|ują|ał|ała|ali|ały|ać|eć|ić|yć|am|em|asz|esz|isz|ysz|imy|emy|icie|ecie|ą|e|ąc|no|to))$/i;
      const verbCount = words.filter(w => verbRegex.test(w)).length;
      
      if (longestWord > 25) {
        isGibberish = true;
        gibberishReason = "Wykryto nienaturalnie długie słowo (powyżej 25 znaków).";
      } else if (wordCount >= 8 && diversity <= 0.3) {
        isGibberish = true;
        gibberishReason = "Wykryto spam (nienaturalnie powtarzające się słowa, np. wpisano tę samą literę wielokrotnie).";
      } else if (wordCount >= 10 && avgWordLength < 3.5) {
        isGibberish = true;
        gibberishReason = "Nienaturalnie niska średnia długość słowa. Tekst wygląda na zbiór luźnych liter alfabetu lub skrótów.";
      } else if (wordCount >= 15 && !hasPunctuation) {
        isGibberish = true;
        gibberishReason = "Tekst nie zawiera żadnych znaków interpunkcyjnych (kropek, pytajników). Brak logicznego podziału na zdania.";
      } else if (wordCount >= 20 && verbCount < 2) {
        isGibberish = true;
        gibberishReason = "Tekst jest pozbawiony orzeczeń (czasowników). Wygląda na wyliczankę słów, a nie sensowną wypowiedź.";
      } else if (wordCount >= 15 && foundStopWords === 0) {
        isGibberish = true;
        gibberishReason = "Tekst nie wygląda na poprawny język polski (brak jakichkolwiek przyimków, zaimków lub spójników).";
      } else if (letters.length > 15 && (vowelRatio < 0.15 || vowelRatio > 0.8)) {
        isGibberish = true;
        gibberishReason = "Wykryto zbitki przypadkowych znaków (nienaturalny stosunek samogłosek do spółgłosek).";
      }
    }

    let score = 0;
    let maxScore = 10;
    const checklistResults = [];
    const clichesFound = [];
    let diagnosis = "";
    let isContextVerdict = null;

    if (isGibberish) {
      score = 0;
      diagnosis = "❌ ZABLOKOWANO ANALIZĘ: " + gibberishReason + " Wpisz autentyczny, sensowny tekst maturalny, aby system mógł uczciwie zweryfikować kryteria CKE.";
      checklistResults.push({ label: "Analiza Lingwistyczna (Anty-Spam)", passed: false, pts: "0/" + maxScore + " pkt", note: "Tekst został odrzucony przez algorytm. Brak możliwości merytorycznej oceny." });
    } else if (currentPart === "wstep") {
      maxScore = 10;
      
      const sentences = text.split(/[.?!]+/).filter(s => s.trim().length > 0);
      
      if (wordCount < 15) {
          // Garbage / Too short protection
          score = 0;
          checklistResults.push({ label: "Jasno sformułowana teza", passed: false, pts: "0/3 pkt", note: "Tekst jest za krótki, by nakreślić tezę." });
          checklistResults.push({ label: "Zdefiniowanie problemu / pojęć", passed: false, pts: "0/2 pkt", note: "Brak refleksji ogólnej. Minimum to ok. 30 słów." });
          checklistResults.push({ label: "Wprowadzenie lektur (Opcjonalnie)", passed: false, pts: "0/2 pkt", note: "Zbyt mało tekstu, by to ocenić." });
          checklistResults.push({ label: "Wystarczająca objętość", passed: false, pts: "0/2 pkt", note: `Tylko ${wordCount} słów. To nie jest pełnoprawny wstęp.` });
          checklistResults.push({ label: "Brak uczniowskich banałów językowych", passed: false, pts: "0/1 pkt", note: "Tekst za krótki do oceny stylu." });
          diagnosis = "Tekst jest zdecydowanie za krótki. Poprawny wstęp maturalny powinien mieć co najmniej 3-4 rozbudowane zdania (ok. 40-80 słów).";
      } else {
          // 1. Teza
          const hasExplicitThesis = data.thesisMarkers.some(m => lower.includes(m)) || lower.includes("teza") || lower.includes("uważam") || lower.includes("twierdzę") || lower.includes("sądzę");
          const hasImplicitThesis = sentences.length >= 2 && wordCount >= 20;

          if (hasExplicitThesis) {
            score += 3;
            checklistResults.push({ label: "Jasno sformułowana teza", passed: true, pts: "3/3 pkt", note: "Wykryto wyraziste stanowisko wobec problemu (użyto znaczników)." });
          } else if (hasImplicitThesis) {
            score += 3;
            checklistResults.push({ label: "Jasno sformułowana teza", passed: true, pts: "3/3 pkt", note: "Zauważono dłuższą wypowiedź. CKE nie wymaga słów 'Uważam, że...'. Upewnij się jedynie, że jedno z powyższych zdań jasno odpowiada na temat!" });
          } else {
            score += 1;
            checklistResults.push({ label: "Jasno sformułowana teza", passed: false, pts: "1/3 pkt", note: "Tekst nie ma jasnej tezy lub jest to zaledwie jedno proste zdanie." });
          }

          // 2. Definicja problemu
          const abstractNouns = ["człowiek", "życi", "wartoś", "sytuacj", "histor", "ludz", "świat", "postaw", "los", "prawd", "dobr", "zł", "miłoś", "cierpien", "wybor", "wolnoś", "moraln", "etyk", "społeczeń"];
          let foundAbstract = abstractNouns.filter(n => lower.includes(n)).length;

          if (wordCount >= 25 && foundAbstract >= 2) {
            score += 2;
            checklistResults.push({ label: "Zdefiniowanie problemu / pojęć", passed: true, pts: "2/2 pkt", note: "Wstęp osadza temat w szerszym wymiarze (użyto odpowiedniego słownictwa problemowego)." });
          } else if (wordCount >= 20 && foundAbstract >= 1) {
            score += 1;
            checklistResults.push({ label: "Zdefiniowanie problemu / pojęć", passed: false, pts: "1/2 pkt", note: "Wstęp zaledwie dotyka problemu. Warto dodać jedno zdanie ogólnej refleksji." });
          } else {
            checklistResults.push({ label: "Zdefiniowanie problemu / pojęć", passed: false, pts: "0/2 pkt", note: "Brak refleksji ogólnej. Wstęp zbyt lakoniczny." });
          }

          // 3. Zapowiedź utworów (Opcjonalna w CKE)
          const hasQuotes = text.includes("„") || text.includes('"') || lower.includes("dżum") || lower.includes("lalk") || lower.includes("dziad") || lower.includes("wesel") || lower.includes("pan tadeusz") || lower.includes("utwór") || lower.includes("dzieł");
          if (hasQuotes) {
            score += 2;
            checklistResults.push({ label: "Wprowadzenie lektur (Opcjonalnie we wstępie)", passed: true, pts: "2/2 pkt", note: "Zapowiedziano dzieła we wstępie. Bardzo dobrze, ułatwia to czytanie egzaminatorowi." });
          } else {
            score += 2; 
            checklistResults.push({ label: "Wprowadzenie lektur (Opcjonalnie we wstępie)", passed: true, pts: "2/2 pkt", note: "Brak zapowiedzi utworów we wstępie. To w pełni poprawne – możesz przywołać je dopiero w rozwinięciu." });
          }

          // 4. Długość
          if (wordCount >= 30) {
            score += 2;
            checklistResults.push({ label: "Wystarczająca objętość (min. ok. 30 słów)", passed: true, pts: "2/2 pkt", note: `Długość: ${wordCount} słów. Idealnie, by nakreślić problem i tezę. (CKE ocenia długość tylko całej pracy).` });
          } else {
            score += 1;
            checklistResults.push({ label: "Wystarczająca objętość (min. ok. 30 słów)", passed: false, pts: "1/2 pkt", note: `Długość: ${wordCount} słów. Wstęp jest krótki, może brakować mu głębi. (Zalecane ok. 40-70 słów).` });
          }

          // 5. Banały
          data.cliches.forEach(c => {
            if (lower.includes(c)) clichesFound.push(c);
          });
          if (clichesFound.length === 0) {
            score += 1;
            checklistResults.push({ label: "Brak uczniowskich banałów językowych", passed: true, pts: "1/1 pkt", note: "Język dojrzały, erudycyjny i pozbawiony sztampowych formułek." });
          } else {
            checklistResults.push({ label: "Brak uczniowskich banałów językowych", passed: false, pts: "0/1 pkt", note: `Wykryto szkolny banał: „${clichesFound.join('”, „')}”! Unikaj ich na maturze.` });
          }

          if (score >= 9) {
            diagnosis = "Wzorcowy wstęp maturalny! Precyzyjnie definiuje problem, zawiera wyrazistą tezę i unika szkolnych klisz.";
          } else if (score >= 6) {
            diagnosis = "Dobry wstęp, ale wymaga drobnego szlifu. Sprawdź uwagi w powyższej tabeli (np. pogłębienie refleksji).";
          } else {
            diagnosis = "Wstęp wymaga rozbudowy. Pamiętaj, aby nakreślić ogólne ramy problemu zanim przejdziesz do argumentacji.";
          }
      }
    } else if (currentPart === "rozwiniecie") {
      maxScore = 10;

      // 1. Teza cząstkowa / Zdanie wprowadzające
      const firstSentence = text.split(/[.!?]/)[0] || "";
      const hasTopicSentence = firstSentence.length > 30;
      if (hasTopicSentence) {
        score += 2;
        checklistResults.push({ label: "Zdanie wprowadzające / teza cząstkowa akapitu", passed: true, pts: "2/2 pkt", note: "Akapit zaczyna się od myśli przewodniej, a nie od suchej relacji fabularnej." });
      } else {
        checklistResults.push({ label: "Zdanie wprowadzające / teza cząstkowa akapitu", passed: false, pts: "0/2 pkt", note: "Brak wyraźnej tezy cząstkowej otwierającej akapit." });
      }

      // 2. Analiza vs Streszczenie
      let summaryCount = 0;
      data.summaryVerbs.forEach(v => {
        if (lower.includes(v)) summaryCount++;
      });
      let analyticalCount = 0;
      data.analyticalVerbs.forEach(v => {
        if (lower.includes(v)) analyticalCount++;
      });

      if (analyticalCount > summaryCount && analyticalCount >= 2) {
        score += 3;
        checklistResults.push({ label: "Analiza problemowa zamiast czystego streszczenia fabuły", passed: true, pts: "3/3 pkt", note: `Świetna robota: akapit koncentruje się na motywacjach bohatera i wymowie ideowej (wykryto ${analyticalCount} zwrotów analitycznych).` });
      } else if (summaryCount >= 3 && analyticalCount <= 1) {
        checklistResults.push({ label: "Analiza problemowa zamiast czystego streszczenia fabuły", passed: false, pts: "1/3 pkt", note: `Uwaga! Egzaminator CKE oceni ten fragment jako STRESZCZENIE FABUŁY (wykryto słowa relacjonujące: ${summaryCount}). Zamiast pisać, co bohater zrobił, wyjaśnij, DLACZEGO to zrobił i co z tego wynika!` });
        score += 1;
      } else {
        score += 2;
        checklistResults.push({ label: "Analiza problemowa zamiast czystego streszczenia fabuły", passed: true, pts: "2/3 pkt", note: "Wywód poprawny, ale warto nasycić go większą liczbą wniosków o wymowie dzieła." });
      }

      // 3. Słownictwo analityczne
      if (analyticalCount >= 2) {
        score += 2;
        checklistResults.push({ label: "Obecność czasowników analitycznych (świadczy, uwypukla, dowodzi)", passed: true, pts: "2/2 pkt", note: "Bogaty język interpretacji literackiej." });
      } else {
        checklistResults.push({ label: "Obecność czasowników analitycznych (świadczy, uwypukla, dowodzi)", passed: false, pts: "0/2 pkt", note: "Użyj czasowników interpretacyjnych: 'unaocznia to', 'świadczy o', 'jest wyrazem', 'symbolizuje'." });
      }

      // 4. Wniosek cząstkowy
      const hasMicroConn = data.microConnectors.some(c => lower.includes(c));
      if (hasMicroConn) {
        score += 2;
        checklistResults.push({ label: "Wniosek cząstkowy spinający akapit z tezą", passed: true, pts: "2/2 pkt", note: "Akapit ma wyraźną klamrę kompozycyjną łączącą go z tematem." });
      } else {
        checklistResults.push({ label: "Wniosek cząstkowy spinający akapit z tezą", passed: false, pts: "0/2 pkt", note: "Akapit urywa się bez podsumowującej myśli (użyj np. 'Doświadczenie to jednoznacznie dowodzi, że...')." });
      }

      // 5. Długość
      if (wordCount >= data.targetWords.min && wordCount <= data.targetWords.max) {
        score += 1;
        checklistResults.push({ label: "Optymalna długość akapitu (100–160 słów)", passed: true, pts: "1/1 pkt", note: `${wordCount} słów – idealna proporcja dla pojedynczego argumentu.` });
      } else {
        checklistResults.push({ label: "Optymalna długość akapitu (100–160 słów)", passed: false, pts: "0/1 pkt", note: `Akapit liczy ${wordCount} słów (zalecane: 100–160 słów).` });
      }

      if (score >= 9) {
        diagnosis = "Doskonały akapit rozwinięcia! Spełnia kluczowe kryterium KLiK CKE: analizuje postawę bohatera, nie streszcza fabuły i kończy się trafnym wnioskiem.";
      } else if (score >= 6) {
        diagnosis = "Poprawny akapit, ale grozi mu zarzut powierzchowności. Zastąp zdania opisujące bieg wydarzeń zdaniami o znaczeniu motywów i decyzji postaci.";
      } else {
        diagnosis = "Akapit niebezpieczny na maturze. Zbyt przypomina streszczenie lektury. Egzaminator CKE nie przyzna za to punktów za pogłębioną argumentację!";
      }

    } else if (currentPart === "kontekst") {
      maxScore = 10;

      let fakeFound = [];
      data.fakePatterns.forEach(f => {
        if (lower.includes(f)) fakeFound.push(f);
      });

      let functionalFound = [];
      data.functionalLinkers.forEach(fl => {
        if (lower.includes(fl)) functionalFound.push(fl);
      });

      const mentionsWork = lower.includes("bohater") || lower.includes("postaw") || lower.includes("utwór") || lower.includes("powieś") || lower.includes("dramat") || lower.includes("dzieł") || lower.includes("losy");

      if (functionalFound.length > 0 && mentionsWork) {
        isContextVerdict = "FUNKCJONALNY";
        score = 10;
        checklistResults.push({ label: "Funkcjonalność kontekstu (Kryterium KLiK CKE)", passed: true, pts: "2/2 PKT CKE (10/10)", note: "Kontekst idealnie funkcjonalny! Wyjaśnia sens utworu lub motywację bohatera." });
        checklistResults.push({ label: "Konektory funkcjonalne ('co tłumaczy', 'znajduje odzwierciedlenie')", passed: true, pts: "ZALICZONE", note: `Wykryto zwroty: „${functionalFound.join('”, „')}”.` });
        checklistResults.push({ label: "Brak jałowej notki biograficznej", passed: true, pts: "ZALICZONE", note: "Fragment nie jest mechaniczną datą czy ciekawostką z Wikipedii." });
        checklistResults.push({ label: "Związek z lekturą i problemem", passed: true, pts: "ZALICZONE", note: "Kontekst bezpośrednio oświetla analizowane dzieło." });
        diagnosis = "🏆 MAKSIMUM PUNKTÓW CKE (2/2 pkt)! Kontekst jest w 100% FUNKCJONALNY. Egzaminator bez wahania przyzna 2 punkty, ponieważ użyłeś wiedzy pozafabularnej do objaśnienia sensu postępowania postaci.";
      } else if (fakeFound.length > 0 && functionalFound.length === 0) {
        isContextVerdict = "POZORNY";
        score = 0;
        checklistResults.push({ label: "Funkcjonalność kontekstu (Kryterium KLiK CKE)", passed: false, pts: "0/2 PKT CKE (0/10)", note: "KONTEKST POZORNY! Sucha wzmianka biograficzna lub historyczna bez powiązania z wymową dzieła." });
        checklistResults.push({ label: "Konektory funkcjonalne", passed: false, pts: "BRAK", note: "Brak zwrotów tłumaczących wpływ kontekstu na bohatera lub ideę utworu." });
        checklistResults.push({ label: "Brak jałowej notki biograficznej", passed: false, pts: "BŁĄD", note: `Wykryto schemat encyklopedyczny: „${fakeFound.join('”, „')}”. Sama data urodzenia czy Nobla to 0 pkt na maturze!` });
        checklistResults.push({ label: "Związek z lekturą i problemem", passed: false, pts: "POZORNY", note: "Brak wyjaśnienia, jak ten fakt pomaga zrozumieć utwór." });
        diagnosis = "❌ 0 PUNKTÓW CKE! Egzaminator zakwalifikuje ten fragment jako KONTEKST POZORNY. Sama informacja o dacie urodzenia pisarza, zaborach czy tytule innego dzieła NIE jest kontekstem funkcjonalnym, jeśli nie wyjaśnia zachowania bohatera ani wymowy tekstu!";
      } else if (functionalFound.length > 0 || mentionsWork) {
        isContextVerdict = "CZĘŚCIOWO FUNKCJONALNY";
        score = 6;
        checklistResults.push({ label: "Funkcjonalność kontekstu (Kryterium KLiK CKE)", passed: true, pts: "1/2 PKT CKE (6/10)", note: "Kontekst częściowo funkcjonalny. Powiązanie z utworem jest widoczne, ale wymaga silniejszego wyakcentowania." });
        checklistResults.push({ label: "Konektory funkcjonalne", passed: true, pts: "ZALICZONE", note: "Warto dodać zwrot: 'co bezpośrednio tłumaczy postawę...'." });
        checklistResults.push({ label: "Brak jałowej notki biograficznej", passed: true, pts: "ZALICZONE", note: "Nie wykryto rażących banałów encyklopedycznych." });
        checklistResults.push({ label: "Związek z lekturą i problemem", passed: true, pts: "DO POPRAWY", note: "Wskaż dokładniej, jak kontekst zmienia odbiór sceny lub dylematu." });
        diagnosis = "⚠️ RYZYKO 1 PKT CKE (lub 0 pkt przy surowym egzaminatorze). Kontekst jest zarysowany, ale brakuje 'mostu logicznego' pokazującego, jak dokładnie wpłynął on na wybory bohatera.";
      } else {
        isContextVerdict = "NIEJASNY / ZA KRÓTKI";
        score = 2;
        checklistResults.push({ label: "Funkcjonalność kontekstu", passed: false, pts: "0/2 PKT CKE (2/10)", note: "Zbyt lakoniczny lub oderwany od tematu fragment." });
        diagnosis = "Zbyt krótki fragment, by uznać go za pełnowartościowy kontekst maturalny.";
      }

    } else if (currentPart === "zakonczenie") {
      maxScore = 10;

      // 1. Parafraza tezy
      const hasClosingConnector = lower.includes("podsumowuj") || lower.includes("reasumuj") || lower.includes("konkluduj") || lower.includes("należy stwierdzić") || lower.includes("powyższy") || lower.includes("rozważan");
      if (hasClosingConnector) {
        score += 3;
        checklistResults.push({ label: "Parafraza tezy głównej i spięcie kompozycyjne", passed: true, pts: "3/3 pkt", note: "Obecność eleganckiego konektora podsumowującego i powrót do tezy." });
      } else {
        checklistResults.push({ label: "Parafraza tezy głównej i spięcie kompozycyjne", passed: false, pts: "0/3 pkt", note: "Brak wyraźnego spięcia wywodu z tezą (użyj np. 'Reasumując powyższe rozważania...')." });
      }

      // 2. Synteza obu utworów
      const hasSynthesis = data.synthesisMarkers.some(m => lower.includes(m)) || (lower.includes("obu") || lower.includes("obaj") || lower.includes("zarówno"));
      if (hasSynthesis) {
        score += 3;
        checklistResults.push({ label: "Synteza wniosków z obu utworów (wspólny mianownik)", passed: true, pts: "3/3 pkt", note: "Zakończenie zestawia ze sobą oba omówione dzieła, unikając omawiania ich od nowa." });
      } else {
        checklistResults.push({ label: "Synteza wniosków z obu utworów (wspólny mianownik)", passed: false, pts: "1/3 pkt", note: "Brak wyraźnego zestawienia obu lektur w jednym uogólniającym zdaniu." });
        score += 1;
      }

      // 3. Puenta humanistyczna
      const hasPunchline = data.punchlineMarkers.some(p => lower.includes(p)) || lower.includes("człowiek") || lower.includes("sens") || lower.includes("życi");
      if (hasPunchline) {
        score += 2;
        checklistResults.push({ label: "Ponadczasowa puenta humanistyczna / filozoficzna", passed: true, pts: "2/2 pkt", note: "Wypracowanie kończy się głęboką refleksją o naturze człowieka." });
      } else {
        checklistResults.push({ label: "Ponadczasowa puenta humanistyczna / filozoficzna", passed: false, pts: "0/2 pkt", note: "Brak uniwersalnej puenty – zakończenie jest zbyt szkolne lub urywa się." });
      }

      // 4. Banały
      data.cliches.forEach(c => {
        if (lower.includes(c)) clichesFound.push(c);
      });
      if (clichesFound.length === 0) {
        score += 1;
        checklistResults.push({ label: "Brak banałów ('I to by było na tyle', 'Wyczerpałem temat')", passed: true, pts: "1/1 pkt", note: "Brak potocznych, nieeleganckich formułek." });
      } else {
        checklistResults.push({ label: "Brak banałów ('I to by było na tyle', 'Wyczerpałem temat')", passed: false, pts: "0/1 pkt", note: `Wykryto kolokwializm: „${clichesFound.join('”, „')}”! Natychmiast go usuń!` });
      }

      // 5. Długość
      if (wordCount >= data.targetWords.min && wordCount <= data.targetWords.max) {
        score += 1;
        checklistResults.push({ label: "Optymalna długość zakończenia (50–85 słów)", passed: true, pts: "1/1 pkt", note: `${wordCount} słów – wzorcowa proporcja.` });
      } else {
        checklistResults.push({ label: "Optymalna długość zakończenia (50–85 słów)", passed: false, pts: "0/1 pkt", note: `Długość: ${wordCount} słów (zalecane: 50–85 słów).` });
      }

      if (score >= 9) {
        diagnosis = "Wzorowe zakończenie! Dokonuje syntezy obu utworów, parafrazuje tezę bogatszym słownictwem i wieńczy pracę piękną puentą humanistyczną.";
      } else if (score >= 6) {
        diagnosis = "Dobre zakończenie, ale brakuje mu ostatecznego filozoficznego szlifu. Zepnij oba utwory w jedno zdanie syntetyzujące.";
      } else {
        diagnosis = "Zakończenie wadliwe. Zbyt krótkie, schematyczne lub potoczne. Nie pisz 'Mam nadzieję, że udowodniłem tezę'!";
      }
    }

    // Generowanie HTML raportu
    let scoreColor = "emerald";
    let scoreBadgeText = "WZOROWY FRAGMENT (MAX PKT CKE)";
    if (score < 5) {
      scoreColor = "rose";
      scoreBadgeText = "WYMAGA PILNEJ POPRAWY (RYZYKO STRATY PUNKTÓW)";
    } else if (score < 8) {
      scoreColor = "amber";
      scoreBadgeText = "DOBRY, ALE WYMAGA SZLIFU";
    }

    let contextVerdictHtml = "";
    if (isContextVerdict) {
      const isGood = isContextVerdict === "FUNKCJONALNY";
      contextVerdictHtml = `
        <div class="p-4 rounded-2xl ${isGood ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-200' : 'bg-rose-950/70 border-2 border-rose-600 text-rose-100'} text-xs space-y-1">
          <div class="flex items-center gap-2 font-bold text-sm">
            <span>${isGood ? '🟢 WERDYKT CKE: KONTEKST W PEŁNI FUNKCJONALNY (2/2 PKT)' : '🔴 WERDYKT CKE: KONTEKST POZORNY (0/2 PKT)'}</span>
          </div>
          <p>${isGood ? 'Ten fragment bezpośrednio objaśnia sens dzieła lub motywację postaci. Egzaminator bez wahania przyznaje 2 punkty w kryterium KLiK!' : 'Egzaminator CKE przyznaje 0 punktów za ten kontekst! Czyste podanie daty urodzenia, biogramu czy tytułu innego utworu bez wyjaśnienia, jak oświetla on problem wypracowania, to szkolny błąd!'}</p>
        </div>
      `;
    }

    resultsContainer.classList.remove("hidden");
    resultsContainer.innerHTML = `
      <!-- Baner Wyniku -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-${scoreColor}-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 text-xs font-bold rounded-full bg-${scoreColor}-500/20 text-${scoreColor}-300 border border-${scoreColor}-500/30">${scoreBadgeText}</span>
            <span class="text-xs text-slate-400 font-mono">${wordCount} słów</span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white">Ocena Fragmentu: <span class="text-${scoreColor}-400">${score}/${maxScore} pkt</span></h3>
          <p class="text-xs text-slate-300 mt-1">${diagnosis}</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-black text-white">${Math.round((score / maxScore) * 100)}%</div>
          <span class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Zgodność z CKE</span>
        </div>
      </div>

      ${contextVerdictHtml}

      <!-- Alert Banałów -->
      ${clichesFound.length > 0 ? `
        <div class="p-4 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-200 text-xs">
          🚨 <strong>WYKRYTO SZKOLNE BANAŁY JĘZYKOWE:</strong> „${clichesFound.join('”, „')}”<br>
          <span class="text-rose-300 mt-1 block">Tego typu zwroty natychmiast obniżają ocenę za styl u każdego egzaminatora CKE. Zastąp je dojrzałym językiem eseistycznym!</span>
        </div>
      ` : ''}

      <!-- Tabela Checklisty Kryteriów -->
      <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 class="text-xs font-bold text-white uppercase tracking-wider">Szczegółowa Weryfikacja Kryteriów CKE dla tej części:</h4>
        <div class="space-y-2">
          ${checklistResults.map(cr => `
            <div class="p-3 rounded-xl ${cr.passed ? 'bg-emerald-950/30 border border-emerald-800/40 text-emerald-200' : 'bg-rose-950/30 border border-rose-800/40 text-rose-200'} text-xs flex items-start justify-between gap-3">
              <div class="space-y-0.5">
                <div class="font-bold flex items-center gap-2">
                  <span>${cr.passed ? '✅' : '❌'}</span>
                  <span>${cr.label}</span>
                </div>
                <p class="text-[11px] ${cr.passed ? 'text-emerald-300/80' : 'text-rose-300/90'} pl-6">${cr.note}</p>
              </div>
              <span class="font-mono text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded bg-slate-900 border border-slate-800 ${cr.passed ? 'text-emerald-400' : 'text-rose-400'}">${cr.pts}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Wskazówka Tuningowa -->
      <div class="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-300 space-y-2">
        <h4 class="font-bold text-indigo-300 text-sm flex items-center gap-2">
          <span>💡 Jak Ulepszyć Ten Fragment na 100% (Wskazówka Egzaminatora CKE):</span>
        </h4>
        <p class="leading-relaxed">${data.sampleGood.explanation}</p>
        <div class="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
          <strong class="text-emerald-400 block mb-1">Porównaj z Wzorcem na 10/10 pkt:</strong>
          <em>„${data.sampleGood.text}”</em>
        </div>
      </div>
    `;

    resultsContainer.scrollIntoView({ behavior: "smooth" });
  }

  runBtn.addEventListener("click", runAnalysis);

  // Inicjalny stan
  updatePartInfo();
}

// 8. QUIZ EGZAMINACYJNY OD ZERA DO 100%
function initQuiz() {
  const container = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("quiz-result");

  if (!container) return;

  const questions = MATURA_DATA.quizQuestions;
  let userAnswers = {};

  function renderQuiz() {
    container.innerHTML = questions.map((q, qIndex) => `
      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 mb-6" id="q-card-${q.id}">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Pytanie ${qIndex + 1} z ${questions.length}</span>
        </div>
        <h4 class="text-base font-bold text-white mb-4">${q.question}</h4>
        
        <div class="space-y-2">
          ${q.options.map((opt, oIndex) => `
            <label class="quiz-option flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/60 cursor-pointer transition text-xs text-slate-300">
              <input type="radio" name="question-${q.id}" value="${oIndex}" class="mt-0.5 text-indigo-600 focus:ring-indigo-500">
              <span>${opt}</span>
            </label>
          `).join("")}
        </div>

        <div class="quiz-explanation mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 hidden"></div>
      </div>
    `).join("");

    container.querySelectorAll("input[type=radio]").forEach(radio => {
      radio.addEventListener("change", (e) => {
        const qName = e.target.name;
        const qId = parseInt(qName.replace("question-", ""));
        userAnswers[qId] = parseInt(e.target.value);
      });
    });
  }

  const submitBtn = document.getElementById("quiz-submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      let score = 0;
      questions.forEach(q => {
        const card = document.getElementById(`q-card-${q.id}`);
        const explanationEl = card.querySelector(".quiz-explanation");
        const selected = userAnswers[q.id];

        explanationEl.classList.remove("hidden");

        if (selected === q.correct) {
          score++;
          card.classList.add("border-emerald-500/50");
          explanationEl.className = "quiz-explanation mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300";
          explanationEl.innerHTML = `✅ <strong>Prawidłowa odpowiedź!</strong><br>${q.explanation}`;
        } else {
          card.classList.add("border-rose-500/50");
          explanationEl.className = "quiz-explanation mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300";
          explanationEl.innerHTML = `❌ <strong>Błąd!</strong> Prawidłowa odpowiedź to: „${q.options[q.correct]}”.<br>${q.explanation}`;
        }
      });

      const pct = Math.round((score / questions.length) * 100);
      resultContainer.classList.remove("hidden");
      resultContainer.innerHTML = `
        <div class="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/70 to-slate-900 border border-indigo-500/40 text-center">
          <h3 class="text-2xl font-bold text-white mb-2">Twój Wynik: ${score}/${questions.length} (${pct}%)</h3>
          <p class="text-xs text-slate-300 max-w-md mx-auto">
            ${pct >= 80 ? '🏆 Gratulacje! Twoja wiedza z kryteriów CKE i lektur jest na poziomie 100%! Pamiętaj o zasadach interpunkcji i spokojnym pisaniu na maturze.' : '💡 Warto powtórzyć zasady błędu kardynalnego i przeczytać fiszki z lektur obowiązkowych, aby nie stracić punktów na arkuszu!'}
          </p>
        </div>
      `;
      resultContainer.scrollIntoView({ behavior: "smooth" });
    });
  }

  renderQuiz();
}

function initEssayBlueprint() {
  // Dodatkowe interakcje z blueprintem (np. kopiowanie konektorów do schowka)
  const copyButtons = document.querySelectorAll(".copy-connector-btn");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-text");
      if (text) {
        navigator.clipboard.writeText(text);
        const original = btn.innerText;
        btn.innerText = "Skopiowano! ✓";
        setTimeout(() => { btn.innerText = original; }, 2000);
      }
    });
  });
}

// 9. AUTOMATYCZNY EGZAMINATOR CKE (OCENA WYPRACOWANIA UŻYTKOWNIKA)
function initEssayEvaluator() {
  const topicSelect = document.getElementById("eval-topic-select");
  const customTopicWrapper = document.getElementById("eval-custom-topic-wrapper");
  const customTopicInput = document.getElementById("eval-custom-topic");
  const textarea = document.getElementById("eval-essay-text");

  const btnTop = document.getElementById("eval-load-top");
  const btnMid = document.getElementById("eval-load-mid");
  const btnCardinal = document.getElementById("eval-load-cardinal");
  const btnClear = document.getElementById("eval-clear");
  const btnRun = document.getElementById("eval-run-btn");

  const metricWords = document.getElementById("eval-metric-words");
  const metricParagraphs = document.getElementById("eval-metric-paragraphs");
  const metricBooks = document.getElementById("eval-metric-books");
  const metricStatus = document.getElementById("eval-metric-status");

  const resultsArea = document.getElementById("eval-results");
  const finalScoreEl = document.getElementById("eval-final-score");
  const percentageEl = document.getElementById("eval-percentage");
  const badgeStatusEl = document.getElementById("eval-badge-status");

  const cardinalAlert = document.getElementById("eval-cardinal-alert");
  const cardinalDesc = document.getElementById("eval-cardinal-desc");

  const sfwpScoreEl = document.getElementById("eval-sfwp-score");
  const sfwpBarEl = document.getElementById("eval-sfwp-bar");
  const sfwpNoteEl = document.getElementById("eval-sfwp-note");

  const klikScoreEl = document.getElementById("eval-klik-score");
  const klikBarEl = document.getElementById("eval-klik-bar");
  const klikNoteEl = document.getElementById("eval-klik-note");

  const kompScoreEl = document.getElementById("eval-komp-score");
  const kompBarEl = document.getElementById("eval-komp-bar");
  const kompNoteEl = document.getElementById("eval-komp-note");

  const langScoreEl = document.getElementById("eval-lang-score");
  const langBarEl = document.getElementById("eval-lang-bar");
  const langNoteEl = document.getElementById("eval-lang-note");

  const strengthsList = document.getElementById("eval-strengths");
  const improvementsList = document.getElementById("eval-improvements");
  const tasiemceList = document.getElementById("eval-tasiemce-list");

  if (!textarea || !btnRun) return;

  // Przełączanie własnego tematu
  topicSelect.addEventListener("change", () => {
    if (topicSelect.value === "custom") {
      customTopicWrapper.classList.remove("hidden");
    } else {
      customTopicWrapper.classList.add("hidden");
    }
  });

  // Próbka Średnia (~20-22 pkt)
  const sampleMid = `Człowiek wielokrotnie w życiu staje w obliczu trudnych wyborów, w których musi zdefiniować swoje wartości i cele. Uważam, że ambicja może prowadzić do wielkich sukcesów, ale czasami prowadzi człowieka do klęski.

Dobrym przykładem jest Stanisław Wokulski, główny bohater powieści Bolesława Prusa pod tytułem Lalka. Wokulski był człowiekiem ambitnym, który zdobył ogromny majątek na dostawach wojskowych podczas wojny rosyjsko-tureckiej, a także wspierał biednych ludzi z Powiśla, ponieważ uważał, że trzeba pomagać społeczeństwu, co jest zgodne z pracą organiczną, jednak jego obsesyjna miłość do arystokratki Izabeli Łęckiej doprowadziła go do nieszczęścia, bo kobieta nim gardziła i bawiła się jego uczuciami. Wokulski kupił dla niej kamienicę i zorganizował klakierów dla włoskiego skrzypka, a gdy dowiedział się o jej zdradzie ze Starskim w pociągu, załamał się całkowicie i próbował popełnić samobójstwo w Skierniewicach.

Innym bohaterem, który miał wielkie ambicje był Makbet z dramatu Williama Szekspira. Makbet usłyszał przepowiednię czarownic, że zostanie królem Szkocji, co obudziło w nim żądzę władzy, więc razem ze swoją żoną Lady Makbet zamordował króla Dunkana, chociaż wiedział, że łamie zasady rycerskie. Po zdobyciu tronu musiał popełniać kolejne zbrodnie, by utrzymać władzę, zabił Banka i rodzinę Macduffa, przez co popadł w obłęd i ostatecznie zginął w walce.

Podsumowując powyższe przykłady można stwierdzić, że ambicja jest niebezpieczna. Zarówno Wokulski jak i Makbet ponieśli klęskę, ponieważ ich ambicja nie była kontrolowana przez rozsądek i doprowadziła ich do samotności.`;

  // Próbka z Błędem Kardynalnym (0 pkt)
  const sampleCardinal = `Człowiek od zawsze jest istotą pełną sprzeczności, co można zaobserwować w literaturze różnych epok. Uważam, że ludzka natura łączy w sobie pragnienie dobra ze złem.

Wspaniałym przykładem jest powieść Bolesława Prusa pt. Lalka. Główny bohater Stanisław Wokulski po wielu staraniach wreszcie ożenił się z Izabelą Łęcką i wspólnie prowadzili sklep galanteryjny w Warszawie, ciesząc się szacunkiem całej arystokracji. Jednak Wokulski miał sprzeczną naturę, bo z jednej strony kochał Izabelę, a z drugiej strony tęsknił za dawnymi czasami studenckimi.

Z kolei w dramacie Kordian Juliusza Słowackiego tytułowy bohater dokonał zamachu na cara Mikołaja I i zastrzelił cara w jego sypialni na Zamku Królewskim, co dowodzi, że człowiek potrafi być bezwzględny, mimo że wcześniej Kordian był wrażliwym poetą cierpiącym na ból istnienia.

Podsumowując powyższe rozważania, bohaterowie ci pokazują, że człowiek potrafi zmieniać swoje poglądy pod wpływem okoliczności.`;

  // Ładowanie próbek
  btnTop.addEventListener("click", () => {
    topicSelect.value = "bunt";
    customTopicWrapper.classList.add("hidden");
    textarea.value = MATURA_DATA.maturaYears[1].modelEssay.text;
    updateLiveMetrics();
  });

  btnMid.addEventListener("click", () => {
    topicSelect.value = "ambicja";
    customTopicWrapper.classList.add("hidden");
    textarea.value = sampleMid;
    updateLiveMetrics();
  });

  btnCardinal.addEventListener("click", () => {
    topicSelect.value = "sprzecznosci";
    customTopicWrapper.classList.add("hidden");
    textarea.value = sampleCardinal;
    updateLiveMetrics();
  });

  btnClear.addEventListener("click", () => {
    textarea.value = "";
    updateLiveMetrics();
    resultsArea.classList.add("hidden");
  });

  // Aktualizacja metryk na żywo podczas pisania
  function updateLiveMetrics() {
    const text = textarea.value.trim();
    if (!text) {
      metricWords.innerText = "0 słów";
      metricParagraphs.innerText = "0";
      metricBooks.innerText = "Brak";
      metricStatus.innerText = "Wpisz minimum 300 słów";
      metricStatus.className = "px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400";
      return;
    }

    const words = text.split(/\s+/).filter(Boolean);
    const count = words.length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    metricWords.innerText = `${count} słów`;
    metricParagraphs.innerText = `${paragraphs} akap.`;

    // Wykrywanie lektur
    const lower = text.toLowerCase();
    const foundBooks = [];
    const bookKeywords = [
      { name: "Lalka", keys: ["lalk", "wokulsk", "rzeck", "łęck"] },
      { name: "Dziady cz. III", keys: ["dziad", "konrad", "nowosilcow", "ksiądz piotr"] },
      { name: "Wesele", keys: ["wesel", "gospodarz", "jasiek", "chochoł"] },
      { name: "Zbrodnia i kara", keys: ["zbrodni", "raskolnikow", "marmieładow", "porfir"] },
      { name: "Przedwiośnie", keys: ["przedwiośn", "baryk", "szklan"] },
      { name: "Antygona", keys: ["antygon", "kreon", "hajmon"] },
      { name: "Makbet", keys: ["makbet", "dankan", "dunkan", "banko"] },
      { name: "Dżuma", keys: ["dżum", "rieux", "tarrou", "paneloux"] },
      { name: "Tango", keys: ["tango", "stomil", "artur", "edek"] },
      { name: "Inny świat", keys: ["inny świat", "jercew", "kostylew", "herling"] },
      { name: "Pan Tadeusz", keys: ["pan tadeusz", "soplic", "robak"] },
      { name: "Kordian", keys: ["kordian", "mikołaj", "strach i imaginacja"] },
      { name: "Zdążyć przed Panem Bogiem", keys: ["zdążyć przed panem bogiem", "edelman", "żob", "getto"] },
      { name: "Rok 1984", keys: ["rok 1984", "winston", "wielki brat", "oceania"] }
    ];

    bookKeywords.forEach(b => {
      if (b.keys.some(k => lower.includes(k))) {
        foundBooks.push(b.name);
      }
    });

    metricBooks.innerText = foundBooks.length > 0 ? foundBooks.slice(0, 3).join(", ") : "Brak rozpoznanych";

    if (count < 300) {
      metricStatus.innerText = `Za mało słów (${count}/300 min)!`;
      metricStatus.className = "px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30";
    } else if (count >= 350 && count <= 550) {
      metricStatus.innerText = `Optymalna długość CKE (${count} słów) ✅`;
      metricStatus.className = "px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    } else {
      metricStatus.innerText = `Przekroczono 300 słów (${count}) ✓`;
      metricStatus.className = "px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";
    }
  }

  textarea.addEventListener("input", updateLiveMetrics);

  // Główna analiza wypracowania
  btnRun.addEventListener("click", () => {
    const rawText = textarea.value.trim();
    if (!rawText) {
      alert("Proszę wkleić lub napisać tekst wypracowania przed uruchomieniem oceny.");
      return;
    }

    const words = rawText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const paragraphs = rawText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const pCount = paragraphs.length;
    const lower = rawText.toLowerCase();

    // 0. ZAAWANSOWANY FILTR GIBBERISH (ZABEZPIECZENIE)
    let isGibberish = false;
    let gibberishReason = "";
    
    if (wordCount < 3) {
      isGibberish = true;
      gibberishReason = "Tekst jest za krótki.";
    } else {
      const longestWord = Math.max(...words.map(w => w.length));
      const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
      const diversity = uniqueWords / words.length;
      
      const stopWords = ["i", "w", "z", "na", "nie", "do", "że", "to", "jak", "o", "się", "jest", "od", "ale", "za", "ma", "czy", "tak", "co"];
      const foundStopWords = words.filter(w => stopWords.includes(w.toLowerCase())).length;
      
      const letters = rawText.match(/[a-zżźćńśłóęą]/gi) || [];
      const vowels = rawText.match(/[aeiouyąęó]/gi) || [];
      const vowelRatio = letters.length > 0 ? vowels.length / letters.length : 0;
      
      const avgWordLength = letters.length / wordCount;
      const hasPunctuation = /[.!?]/.test(rawText);
      const verbRegex = /([a-ząćęłńóśźż]{2,}(uje|ują|ał|ała|ali|ały|ać|eć|ić|yć|am|em|asz|esz|isz|ysz|imy|emy|icie|ecie|ą|e|ąc|no|to))$/i;
      const verbCount = words.filter(w => verbRegex.test(w)).length;
      
      if (longestWord > 25) {
        isGibberish = true;
        gibberishReason = "Wykryto nienaturalnie długie słowo (powyżej 25 znaków).";
      } else if (wordCount >= 10 && diversity <= 0.25) {
        isGibberish = true;
        gibberishReason = "Wykryto spam (nienaturalnie powtarzające się słowa, np. wpisano tę samą literę wielokrotnie).";
      } else if (wordCount >= 10 && avgWordLength < 3.5) {
        isGibberish = true;
        gibberishReason = "Nienaturalnie niska średnia długość słowa. Tekst wygląda na zbiór luźnych liter alfabetu lub skrótów.";
      } else if (wordCount >= 15 && !hasPunctuation) {
        isGibberish = true;
        gibberishReason = "Tekst nie zawiera żadnych znaków interpunkcyjnych (kropek, pytajników). Brak logicznego podziału na zdania.";
      } else if (wordCount >= 20 && verbCount < 2) {
        isGibberish = true;
        gibberishReason = "Tekst jest pozbawiony orzeczeń (czasowników). Wygląda na wyliczankę słów, a nie sensowną wypowiedź.";
      } else if (wordCount >= 15 && foundStopWords === 0) {
        isGibberish = true;
        gibberishReason = "Tekst nie wygląda na język polski (brak podstawowych przyimków/spójników).";
      } else if (letters.length > 15 && (vowelRatio < 0.15 || vowelRatio > 0.8)) {
        isGibberish = true;
        gibberishReason = "Wykryto zbitki przypadkowych znaków (nienaturalny stosunek samogłosek).";
      }
    }

    if (isGibberish) {
      // OVERRIDE CAŁEJ OCENY
      cardinalAlert.classList.remove("hidden");
      cardinalAlert.className = "mt-6 p-5 rounded-2xl bg-rose-950/80 border-2 border-rose-600 animate-pulse";
      cardinalAlert.querySelector("h4").innerText = "❌ ODRZUCONO Z POWODU SPAMU";
      cardinalDesc.innerText = "System zablokował ocenę: " + gibberishReason + " Wpisz prawdziwy tekst maturalny w języku polskim!";
      
      sfwpBarEl.style.width = "0%"; sfwpScoreEl.innerText = "0/1 pkt"; sfwpNoteEl.innerText = "Tekst odrzucony.";
      klikBarEl.style.width = "0%"; klikScoreEl.innerText = "0/16 pkt"; klikNoteEl.innerText = "Tekst odrzucony.";
      kompBarEl.style.width = "0%"; kompScoreEl.innerText = "0/7 pkt"; kompNoteEl.innerText = "Tekst odrzucony.";
      langBarEl.style.width = "0%"; langScoreEl.innerText = "0/11 pkt"; langNoteEl.innerText = "Tekst odrzucony.";
      
      finalScoreEl.innerText = "0/35 pkt";
      percentageEl.innerText = "0%";
      badgeStatusEl.className = "px-4 py-2 rounded-xl text-sm font-black bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]";
      badgeStatusEl.innerText = "ODRZUCONY (SPAM)";
      resultsArea.classList.remove("hidden");
      resultsArea.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 1. SKANER BŁĘDU KARDYNALNEGO
    let isCardinal = false;
    let cardinalReason = "";

    const cardinalBlunders = [
      {
        pattern: /wokulski.{0,40}(ożenił|poślubił|wziął ślub|małżeństw).{0,40}łęck/i,
        reason: "Stwierdzenie, że Stanisław Wokulski ożenił się z Izabelą Łęcką. (Wokulski nigdy nie poślubił Łęckiej; odrzucony i rozczarowany jej zdradą, próbował popełnić samobójstwo w Skierniewicach)."
      },
      {
        pattern: /kordian.{0,40}(zabił|zamordował|zastrzelił|dokonał zamachu na).{0,20}car/i,
        reason: "Stwierdzenie, że Kordian zabił cara Mikołaja I. (Kordian zemdlał pod drzwiami sypialni cara w wyniku walki Strachu i Imaginacji, nie oddając ani jednego strzału)."
      },
      {
        pattern: /raskolnikow.{0,40}(zabił|zamordował|uśmiercił).{0,20}porfir/i,
        reason: "Stwierdzenie, że Rodion Raskolnikow zabił sędziego Porfirego Pietrowicza. (Raskolnikow zabił lichwiarkę Alonę i jej siostrę Lizawietę. Porfiry prowadził śledztwo i skłonił go do przyznania się do winy)."
      },
      {
        pattern: /roland.{0,40}(uciekł|skazał się na ucieczkę|tchórz)/i,
        reason: "Stwierdzenie, że Roland uciekł z pola bitwy. (Roland zginął w wąwozie Roncevaux, broniąc do końca honoru rycerskiego i wiary)."
      },
      {
        pattern: /gospodarz.{0,30}zgubił.{0,20}róg/i,
        reason: "Stwierdzenie, że Gospodarz zgubił złoty róg w 'Weselu'. (Złoty róg zgubił Jasiek, schylając się po czapkę z pawich piór)."
      },
      {
        pattern: /antygon.{0,40}(podporządkow|posłuchała|uległa|zrezygnowała z pogrzebu).{0,20}kreon/i,
        reason: "Stwierdzenie, że Antygona podporządkowała się zakazowi Kreona. (Antygona złamała zakaz władcy i pogrzebała brata Polinika, wybierając odwieczne prawo boskie)."
      },
      {
        pattern: /makbet.{0,30}(zabił|zamordował).{0,20}macduff/i,
        reason: "Stwierdzenie, że Makbet zabił Macduffa. (To Macduff zabił w pojedynku Makbeta w finale tragedii)."
      }
    ];

    for (const b of cardinalBlunders) {
      if (b.pattern.test(rawText)) {
        isCardinal = true;
        cardinalReason = b.reason;
        break;
      }
    }

    // 2. KRYTERIA CKE
    let sfwp = 0;
    let klik = 0;
    let komp = 0;
    let lang = 0;

    let strengths = [];
    let improvements = [];

    if (isCardinal) {
      // Błąd kardynalny zeruje całe wypracowanie!
      sfwp = 0;
      klik = 0;
      komp = 0;
      lang = 0;
      cardinalAlert.classList.remove("hidden");
      cardinalDesc.innerText = cardinalReason;
      improvements.push(`🚨 Błąd kardynalny unieważnia całe wypracowanie (0/35 pkt): ${cardinalReason}`);
    } else {
      cardinalAlert.classList.add("hidden");

      // A) SFWP (0-1 pkt)
      if (wordCount < 30) {
        sfwp = 0;
        improvements.push(`Tekst jest zbyt krótki (${wordCount} słów), aby uznać go za wypracowanie. Wymaga on rozbudowy do minimum 300 słów.`);
      } else {
        sfwp = 1; // Zakładamy, że uczeń pisze na temat
        if (wordCount >= 300) {
          strengths.push(`SFWP przyznane (praca na temat). Odpowiednia objętość: ${wordCount} słów (minimum to 300).`);
        } else {
          improvements.push(`UWAGA: Zbyt krótka praca (${wordCount}/300 słów)! CKE przyzna punkty za SFWP i KLiK, ale otrzymasz 0 pkt za Kompozycję oraz Język i Styl!`);
        }
      }

      // B) KLiK (0-16 pkt)
      let detectedBooks = 0;
      let hasMandatoryBook = false;
      let contextScore = 0;

      const mandatoryList = ["lalk", "dziad", "wesel", "zbrodni", "przedwiośn", "antygon", "makbet", "dżum", "tango", "kordian", "pan tadeusz", "zdążyć przed panem bogiem", "rok 1984"];
      mandatoryList.forEach(m => {
        if (lower.includes(m)) {
          hasMandatoryBook = true;
        }
      });

      // Zliczanie utworów
      const allBooks = ["lalka", "dziady", "wesele", "zbrodnia i kara", "przedwiośnie", "antygona", "makbet", "dżuma", "tango", "kordian", "pan tadeusz", "inny świat", "zdążyć przed panem bogiem", "rok 1984", "ferdydurke", "boska komedia", "mitologia", "biblia"];
      allBooks.forEach(b => {
        if (lower.includes(b)) detectedBooks++;
      });

      // Konteksty
      const contextKeywords = ["kontekst historyczn", "kontekst filozoficzn", "kontekst biograficzn", "kontekst literack", "kontekst mitologiczn", "kontekst społeczn", "egzystencjaliz", "pozytywiz", "romantyz", "gułag", "holokaust", "prometeus", "mit o syzyfie", "nietzsche", "utylitaryzm", "powstanie listopadowe", "powstanie styczniowe"];
      let foundContexts = 0;
      contextKeywords.forEach(ck => {
        if (lower.includes(ck)) foundContexts++;
      });

      if (foundContexts >= 2) {
        contextScore = 4;
        strengths.push("Znakomite, funkcjonalne wplecenie kontekstów (min. 2 konteksty wykryte w pracy: +4 pkt).");
      } else if (foundContexts === 1) {
        contextScore = 2;
        improvements.push("Wykryto tylko jeden kontekst (+2 pkt). CKE wymaga minimum DWÓCH kontekstów, aby otrzymać komplet 4 punktów!");
      } else {
        contextScore = 0;
        improvements.push("Brak wyraźnego kontekstu zewnętrznego (historycznego, filozoficznego lub biograficznego). Tracisz 4 punkty w kryterium KLiK!");
      }

      if (hasMandatoryBook) {
        strengths.push("Prawidłowo odwołano się do lektury z kanonu obowiązkowego CKE.");
        if (detectedBooks >= 2) {
          klik = 6 + 6 + contextScore; // 16 pkt
          strengths.push("Odwołano się do dwóch niezależnych utworów literackich (pełna argumentacja).");
        } else {
          klik = 6 + 2 + contextScore;
          improvements.push("Odwołano się tylko do jednej lektury. CKE wymaga drugiego utworu literackiego do pełnej noty!");
        }
      } else {
        klik = Math.min(6, contextScore + 2);
        improvements.push("Nie rozpoznano lektury obowiązkowej wymienionej w arkuszu CKE!");
      }

      if (wordCount < 300) {
        klik = Math.min(klik, 6);
      }

      // C) Kompozycja (0-7 pkt)
      if (wordCount < 300) {
        komp = 0;
      } else {
        let structScore = pCount >= 4 ? 3 : (pCount === 3 ? 2 : 1);
        if (pCount >= 4) {
          strengths.push(`Wzorowa kompozycja trójdzielna: praca podzielona na ${pCount} akapitów.`);
        } else {
          improvements.push(`Praca ma tylko ${pCount} akapity. Zalecany jest klasyczny schemat 5-akapitowy (wstęp, min. 2 rozwinięcia, zakończenie).`);
        }

        // Spójność i konektory
        const connectors = ["uważam, że", "potwierdzeniem", "świadczy to o", "warto zauważyć", "z kolei", "w odróżnieniu", "z jednej strony", "z drugiej strony", "ponadto", "jednakże", "reasumując", "podsumowując", "konkludując", "należy stwierdzić", "inną perspektywę", "dlatego", "ponieważ", "co więcej", "zatem", "w konsekwencji", "przykładem", "ilustruje to", "dowodzi tego", "w pierwszej kolejności"];
        let connCount = 0;
        connectors.forEach(c => {
          if (lower.includes(c)) connCount++;
        });

        let connScore = connCount >= 4 ? 3 : (connCount >= 2 ? 2 : 1);
        if (connCount >= 4) {
          strengths.push("Wysoka spójność międzyakapitowa: użyto dojrzałych konektorów logicznych.");
        } else {
          improvements.push("Wzbogać przejścia między akapitami za pomocą zwrotów łączących (np. 'Zgoła odmienną perspektywę prezentuje...', 'Potwierdzeniem powyższej tezy są...').");
        }

        komp = structScore + connScore + 1; // max 7
      }

      // D) Język i Styl (0-11 pkt)
      if (wordCount < 300) {
        lang = 0;
      } else {
        let langBase = 7;
        let orto = 2;
        let interp = 2;

        // Błędy ortograficzne typowe
        const typoList = ["na prawdę", "napewno", "wogóle", "wziąść", "z przed", "spowrotem", "dlatego bo"];
        let foundTypos = 0;
        typoList.forEach(t => {
          if (lower.includes(t)) foundTypos++;
        });
        if (foundTypos > 2) orto = 0;
        else if (foundTypos > 0) orto = 1;

        // Błędy interpunkcyjne (brak przecinka przed że, który, ale, bo, ponieważ)
        const missingCommaRegex = [
          /\b(wiedział|sądził|uważał|stwierdził|widział|myślał)\s+(że|iż)\b/i,
          /\b(bohater|człowiek|postać|dzieło|utwór)\s+(który|która|które|jaki)\b/i,
          /\b(chciał|zrobił|poszedł|postąpił)\s+(ale|lecz|jednak|natomiast)\b/i
        ];
        let interpIssues = 0;
        missingCommaRegex.forEach(r => {
          if (r.test(rawText)) interpIssues++;
        });

        if (interpIssues > 2) interp = 0;
        else if (interpIssues > 0) interp = 1;

        lang = langBase + orto + interp; // max 11
      }
    }

    const total = sfwp + klik + komp + lang;
    const pct = Math.round((total / 35) * 100);

    // Renderowanie wyników
    resultsArea.classList.remove("hidden");
    finalScoreEl.innerText = `${total}/35 pkt`;
    percentageEl.innerText = `${pct}%`;

    // Status i etykiety
    if (isCardinal) {
      badgeStatusEl.innerText = "🚨 ZEROWANIE PRACY (BŁĄD KARDYNALNY)";
      badgeStatusEl.className = "px-3 py-1 text-xs font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40";
    } else if (total >= 30) {
      badgeStatusEl.innerText = "🏆 POZIOM MISTRZOWSKI CKE (85-100%)";
      badgeStatusEl.className = "px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
    } else if (total >= 20) {
      badgeStatusEl.innerText = "✅ BARDZO DOBRY WYNIK (60-80%)";
      badgeStatusEl.className = "px-3 py-1 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40";
    } else {
      badgeStatusEl.innerText = "⚠️ WYMAGA POPRAWY PRZED MATURĄ";
      badgeStatusEl.className = "px-3 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40";
    }

    // Kryteria słupki i notatki
    sfwpScoreEl.innerText = `${sfwp}/1 pkt`;
    sfwpBarEl.style.width = `${(sfwp / 1) * 100}%`;
    sfwpNoteEl.innerText = sfwp === 1 ? "Praca spełnia formalne warunki objętości." : "Niespełnione warunki formalne (<300 słów lub błąd kardynalny).";

    klikScoreEl.innerText = `${klik}/16 pkt`;
    klikBarEl.style.width = `${(klik / 16) * 100}%`;
    klikNoteEl.innerText = `Lektury & konteksty: ${klik}/16 pkt. ${klik >= 14 ? 'Wybitna argumentacja literacka.' : 'Wzbogać liczbę utworów lub pogłęb konteksty.'}`;

    kompScoreEl.innerText = `${komp}/7 pkt`;
    kompBarEl.style.width = `${(komp / 7) * 100}%`;
    kompNoteEl.innerText = `Układ tekstu: ${pCount} akapity. ${komp >= 6 ? 'Płynna, trójdzielna struktura.' : 'Zadbaj o wyraźny podział i konektory.'}`;

    langScoreEl.innerText = `${lang}/11 pkt`;
    langBarEl.style.width = `${(lang / 11) * 100}%`;
    langNoteEl.innerText = `Język: ${lang}/11 pkt (w tym ortografia i interpunkcja).`;

    // Listy mocnych stron i ulepszeń
    strengthsList.innerHTML = strengths.map(s => `<li class="flex items-start gap-2"><span class="text-emerald-400 font-bold">✓</span><span>${s}</span></li>`).join("");
    improvementsList.innerHTML = improvements.map(i => `<li class="flex items-start gap-2"><span class="text-amber-400 font-bold">•</span><span>${i}</span></li>`).join("");

    // 3. ANALIZA ZDAŃ-TASIEMCÓW (WYKRYWACZ PRZEWLEKŁYCH ZDAŃ)
    const sentences = rawText.match(/[^.!?]+[.!?]+/g) || [rawText];
    const runOns = [];

    sentences.forEach((s, idx) => {
      const sTrim = s.trim();
      const sWords = sTrim.split(/\s+/).filter(Boolean);
      const commaCount = (sTrim.match(/,/g) || []).length;

      if (sWords.length > 34 || commaCount >= 4) {
        runOns.push({
          num: idx + 1,
          wordCount: sWords.length,
          commaCount: commaCount,
          snippet: sTrim
        });
      }
    });

    if (runOns.length > 0) {
      tasiemceList.innerHTML = runOns.map(r => `
        <div class="p-3 rounded-xl bg-slate-900 border border-rose-900/40 text-xs">
          <div class="flex items-center justify-between text-rose-300 font-bold mb-1.5">
            <span>🚨 Zdanie ${r.num}: Wykryto Zdanie-Tasiemiec (${r.wordCount} słów, ${r.commaCount} przecinki)</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-800">Ryzyko utraty punktów za spójność</span>
          </div>
          <p class="text-slate-300 italic mb-2">„${r.snippet}”</p>
          <p class="text-emerald-300 text-[11px]">
            💡 <strong>Rekomendacja Egzaminatora CKE:</strong> Postaw kropkę po drugim orzeczeniu, a kolejną myśl rozpocznij od konektora (np. <em>„W konsekwencji tego...”, „Świadczy to o fakcie, że...”, „Z tego powodu...”</em>).
          </p>
        </div>
      `).join("");
    } else {
      tasiemceList.innerHTML = `
        <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300">
          ✅ <strong>Świetnie!</strong> Nie wykryto niebezpiecznych zdań-tasiemców. Twoje zdania mają odpowiednią długość i zachowują przejrzystą strukturę składniową.
        </div>
      `;
    }

    resultsArea.scrollIntoView({ behavior: "smooth" });
  });
}

