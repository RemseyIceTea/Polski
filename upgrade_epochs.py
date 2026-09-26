import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

epochs_data = [
    {
        "name": "Antyk (Starożytność)",
        "timeframe": "VIII w. p.n.e. – 476 r. n.e.",
        "desc": "Fundament kultury europejskiej. Opiera się na dwóch filarach: Biblii (światopogląd chrześcijański, teocentryzm) i mitologii grecko-rzymskiej (politeizm, humanizm).",
        "example": "<strong>Mitologia, Biblia, „Antygona”, „Iliada”, pieśni Horacego.</strong>",
        "concepts": [
            ("Stoicyzm", "Zakładał, że szczęście można osiągnąć jedynie poprzez cnotę, spokój umysłu (apatia) i dystans do emocji (zarówno radości, jak i smutku)."),
            ("Epikureizm", "Skupiał się na rozsądnym używaniu życia i minimalizowaniu cierpienia (słynne 'Carpe diem' - chwytaj dzień)."),
            ("Katharsis", "Oczyszczenie z negatywnych emocji (litości i trwogi) u widza teatru antycznego wskutek współprzeżywania tragedii bohatera."),
            ("Fatum", "Ślepy, bezwzględny los (przeznaczenie), przed którym nie ma ucieczki (np. losy Edypa i Antygony).")
        ]
    },
    {
        "name": "Średniowiecze",
        "timeframe": "V wiek – XV wiek",
        "desc": "Epoka teocentryczna. Dominuje anonimowość twórców i tworzenie 'na chwałę Boga'. Wykształciły się wzorce: asceta, idealny rycerz i władca.",
        "example": "<strong>„Bogurodzica”, „Pieśń o Rolandzie”, „Rozmowa Mistrza Polikarpa ze Śmiercią”</strong>",
        "concepts": [
            ("Teocentryzm", "Bóg w centrum całego wszechświata, życia, sztuki i zainteresowań człowieka."),
            ("Augustynizm", "Filozofia dramatyczna: człowiek zawieszony między aniołami a zwierzętami, wiecznie rozdarty między pokusami ciała a dążeniem duszy do Boga."),
            ("Tomizm", "Harmonijna wizja świata jako 'drabiny bytów' (od materii nieożywionej po anioły). Wszystko ma z góry wyznaczone, sensowne miejsce."),
            ("Danse macabre", "Taniec śmierci, motyw przypominający, że wobec śmierci wszyscy ludzie (chłopi i królowie) są absolutnie równi."),
            ("Asceza", "Wyrzeczenie się dóbr materialnych, dobrowolne cierpienie w celu osiągnięcia zbawienia (np. św. Aleksy).")
        ]
    },
    {
        "name": "Renesans (Odrodzenie)",
        "timeframe": "XV w. – koniec XVI w.",
        "desc": "Powrót do antyku i pochwała życia. Człowiek staje w centrum zainteresowania. Harmonia, humanizm i rozwój nauki.",
        "example": "<strong>Treny, pieśni i fraszki (J. Kochanowski), „Odprawa posłów greckich”</strong>",
        "concepts": [
            ("Antropocentryzm", "Człowiek (jego zdolności, uczucia, piękno) w centrum zainteresowania myślicieli i artystów."),
            ("Humanizm", "Prąd stawiający na rozwój intelektualny człowieka, znajomość języków klasycznych (łacina, greka) oraz postulat 'Człowiekiem jestem i nic co ludzkie...'."),
            ("Irenizm", "Nurt postulujący pokój między wyznaniami i narodami, potępiający okrucieństwo wojny (np. postulaty A. Frycza Modrzewskiego)."),
            ("Motyw Arkadii", "Mit o idyllicznej krainie spokoju, szczęścia i prostej egzystencji w harmonii z naturą (np. czarnoleska wieś u Kochanowskiego).")
        ]
    },
    {
        "name": "Barok",
        "timeframe": "koniec XVI w. – 1. poł. XVIII w.",
        "desc": "Koniec harmonii. Człowiek baroku jest pełen niepokoju, rozdarty między pokusami świata a pragnieniem zbawienia. Epoka kontrastów i wojny.",
        "example": "<strong>Poezja D. Naborowskiego i M. Sępa Szarzyńskiego, „Pamiętniki” (Pasek)</strong>",
        "concepts": [
            ("Motyw Vanitas", "Marność (Vanitas vanitatum et omnia vanitas) – silne poczucie kruchości i nietrwałości ludzkiego życia oraz wszelkich wartości materialnych."),
            ("Konceptyzm", "Nurt w poezji polegający na opieraniu wiersza na wybitnym pomyśle (koncepcie), szokowaniu odbiorcy i grze słów."),
            ("Sarmatyzm", "Polska ideologia szlachecka, wierząca w rzymskie pochodzenie polskiej szlachty, broniąca wolności szlacheckiej, często prowadząca do megalomanii i ksenofobii.")
        ]
    },
    {
        "name": "Oświecenie",
        "timeframe": "XVIII wiek",
        "desc": "Wiek Rozumu. Celem literatury jest edukacja społeczeństwa (dydaktyzm). W Polsce to czas walki o ocalenie i reformy państwa (Konstytucja 3 maja).",
        "example": "<strong>Bajki i satyry (I. Krasicki)</strong>",
        "concepts": [
            ("Racjonalizm", "Pogard (np. Kartezjusza) zakładający, że głównym i jedynym rzetelnym źródłem poznania prawdy jest rozum ('Myślę, więc jestem')."),
            ("Empiryzm", "Założenie, że prawdziwą wiedzę zdobywa się wyłącznie drogą doświadczeń zmysłowych i eksperymentów (J. Locke)."),
            ("Deizm", "Pogląd religijny uznający, że Bóg stworzył świat (jak zegarmistrz mechanizm), ale po akcie stworzenia przestał w niego ingerować."),
            ("Utylitaryzm", "Postulat użyteczności – wartość człowieka lub działania ocenia się po tym, na ile są one pożyteczne dla społeczeństwa.")
        ]
    },
    {
        "name": "Romantyzm",
        "timeframe": "1822 r. – 1863 r.",
        "desc": "Bunt przeciwko rozumowi. Ważne są: uczucia, wiara, indywidualizm i ludowość. W Polsce to epoka zrywów niepodległościowych i mesjanizmu.",
        "example": "<strong>„Dziady cz. III”, „Pan Tadeusz”, „Kordian”, „Cierpienia młodego Wertera”</strong>",
        "concepts": [
            ("Irracjonalizm", "Pogląd odrzucający potęgę rozumu. Romantycy wierzyli, że świat można poznać poprzez intuicję, wiarę, wizje i sny ('Czucie i wiara silniej mówi do mnie...')."),
            ("Mesjanizm", "Polska koncepcja przypisująca Polakom misję zbawienia innych narodów poddanych tyranii. Cierpienie Polski pod zaborami przyrównywano do męki Chrystusa na krzyżu."),
            ("Prometeizm", "Postawa bezinteresownego buntu przeciwko wyższym siłom (Bogu) w imię głębokiej miłości do ludzkości, wiążąca się z ogromnym, samotnym cierpieniem."),
            ("Winkelriedyzm", "Koncepcja Słowackiego (odpowiedź na mesjanizm) zakładająca aktywną i heroiczną walkę (Polska jako Winkelried narodów) przyjmująca ciosy, by inni mogli walczyć.")
        ]
    },
    {
        "name": "Pozytywizm",
        "timeframe": "1864 r. – 1890 r.",
        "desc": "Otrzeźwienie po powstaniu styczniowym. Zamiast zrywów zbrojnych – kult pracy, nauki i ratowanie polskości poprzez rozwój gospodarczy.",
        "example": "<strong>„Lalka” (B. Prus), nowele, „Zbrodnia i kara” (F. Dostojewski)</strong>",
        "concepts": [
            ("Scjentyzm", "Bezkrytyczna wiara w możliwości nauki i metod badawczych. Odrzucenie metafizyki na rzecz biologii, socjologii i twardych faktów."),
            ("Praca u podstaw", "Społeczny nakaz niesienia kaganek oświaty dla najbiedniejszych warstw (chłopów, biedoty miejskiej), by włączyć ich w świadome życie narodu."),
            ("Praca organiczna", "Pojmowanie społeczeństwa jako jednego wielkiego organizmu. Każda warstwa musi być rozwinięta, bogata i współpracować, aby 'organizm' przeżył."),
            ("Asymilacja Żydów", "Postulat zrównania praw obywatelskich mniejszości i włączenia ich w rozwój polskiego społeczeństwa.")
        ]
    },
    {
        "name": "Młoda Polska",
        "timeframe": "1890 r. – 1918 r.",
        "desc": "Bunt przeciwko pozytywistycznemu pragmatyzmowi. Zwrot ku sztuce, dekadentyzmowi i poszukiwaniu piękna. Nazywana neoromantyzmem.",
        "example": "<strong>„Wesele” (S. Wyspiański), „Chłopi” (W. Reymont), poezja Tetmajera</strong>",
        "concepts": [
            ("Dekadentyzm", "Poczucie skrajnego schyłku kultury, bezsensu istnienia ('ból istnienia', nuda, apatia) wynikające z kryzysu wartości. Uciekano przed nim w sztukę i używki."),
            ("Chłopomania", "Fascynacja warstwą chłopską przez znużoną inteligencję, połączona z idealizowaniem sił witalnych i prostoty polskiej wsi (widoczne m.in. w 'Weselu')."),
            ("Sztuka dla sztuki", "Słynny postulat (S. Przybyszewskiego) zdejmujący z literatury obowiązek edukacji czy walki politycznej. Sztuka miała być wolna, niezależna i służyć wyłączenie pięknu."),
            ("Impresjonizm i Symbolizm", "W sztuce: zatrzymywanie ulotnej, mgnieniowej chwili (impresjonizm) oraz wyrażanie niewyrażalnego za pomocą wieloznacznych symboli (symbolizm).")
        ]
    },
    {
        "name": "Dwudziestolecie międzywojenne",
        "timeframe": "1918 r. – 1939 r.",
        "desc": "Wybuch radości po odzyskaniu niepodległości, a następnie narodziny katastrofizmu. Epoka rozwoju awangardy, absurdu i nowej psychologii.",
        "example": "<strong>„Przedwiośnie” (S. Żeromski), „Ferdydurke” (W. Gombrowicz), „Sklepy cynamonowe” (B. Schulz)</strong>",
        "concepts": [
            ("Forma (Gombrowicz)", "U Gombrowicza ('Ferdydurke'): kulturowa i społeczna maska zakładana ludziom przez innych ('przyprawianie Gęby'). Walka człowieka o autentyczność w starciu z utartymi schematami."),
            ("Psychoanaliza", "Poglądy Z. Freuda wpływające na literaturę. Odkrycie ludzkiej podświadomości, popędów, kompleksów oraz mechanizmów działania snów i tłumionych lęków."),
            ("Katastrofizm", "Pesymistyczny prąd (narastający w latach 30.) przewidujący ostateczny, nieuchronny upadek cywilizacji, kultury oraz zbliżającą się nową, okrutną wojnę."),
            ("Groteska i Absurd", "Przedstawianie zjawisk wyolbrzymionych, absurdalnych, gdzie tragizm miesza się z komizmem (występuje masowo u Schulza, Gombrowicza, Witkacego).")
        ]
    },
    {
        "name": "Wojna i okupacja (oraz literatura powojenna)",
        "timeframe": "od 1939 r.",
        "desc": "Brutalna konfrontacja człowieczeństwa z totalitaryzmami, Holokaustem i absurdalnym zniewoleniem. Próba pisania o utraconych wartościach.",
        "example": "<strong>Poezja Kolumbów, „Inny świat” (Herling-Grudziński), „Rok 1984” (Orwell), „Tango” (Mrożek)</strong>",
        "concepts": [
            ("Apokalipsa spełniona", "Koniec świata u Kolumbów to nie proroctwo – to otaczająca ich wojenna rzeczywistość bombardowań, ruin i ludobójstwa, z którą muszą sobie radzić fizycznie i psychicznie."),
            ("Lagrowanie", "Wpływ obozu pracy (łagru/lagru) na psychikę ludzką – destrukcja moralności, instynkt samozachowawczy ponad wszystkim, konieczność przystosowania się do odwróconego dekalogu."),
            ("Egzystencjalizm", "Filozofia (J.P. Sartre, A. Camus) twierdząca, że życie jest absurdem bez z góry narzuconego sensu. Człowiek musi sam stworzyć wartości poprzez swoje czyny (np. walkę z 'dżumą')."),
            ("Postmodernizm i Teatr Absurdu", "Brak jednej prawdy obiektywnej. Literatura rozbija tradycyjne schematy, chętnie używa ironii, a w Teatrze Absurdu (Mrożek, Beckett) ukazuje się bezradność człowieka we współczesnym świecie.")
        ]
    }
]

epochs_html_cards = ""
for epoch in epochs_data:
    concepts_html = ""
    for c_name, c_desc in epoch["concepts"]:
        concepts_html += f'''
        <div class="mb-3">
          <h4 class="text-xs font-bold text-emerald-400 mb-1">🔸 {c_name}</h4>
          <p class="text-[11px] text-slate-300 leading-relaxed">{c_desc}</p>
        </div>
        '''

    epochs_html_cards += f'''
    <div class="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col h-full hover:border-amber-500/50 transition duration-300">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-[15px] font-bold text-amber-300">{epoch["name"]}</h3>
        <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-right">{epoch["timeframe"]}</span>
      </div>
      <p class="text-xs text-slate-300 mb-4 leading-relaxed">
        {epoch["desc"]}
      </p>
      <div class="mb-4">
        <p class="text-[11px] text-slate-400">
          <strong class="text-indigo-300 block mb-1">📚 Główne lektury z tej epoki:</strong>
          {epoch["example"]}
        </p>
      </div>
      
      <!-- Interactive Area -->
      <div class="mt-auto pt-3 border-t border-slate-800/50">
        <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('span').innerText = this.nextElementSibling.classList.contains('hidden') ? '▼ Rozwiń główne myśli i nurty' : '▲ Zwiń szczegóły'" class="w-full text-left text-xs font-bold text-amber-500/80 hover:text-amber-400 transition outline-none">
          <span>▼ Rozwiń główne myśli i nurty</span>
        </button>
        <div class="hidden mt-4 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
          {concepts_html}
        </div>
      </div>
    </div>
    '''

new_section_html = f'''<section id="tab-epochs" class="tab-content hidden space-y-6 max-w-7xl mx-auto pb-12">
  <div class="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/20 shadow-xl flex flex-col md:flex-row items-center gap-6">
    <div class="flex-grow">
      <h2 class="text-2xl font-black text-white mb-3">⏳ Charakterystyka Epok i Głównych Nurtów</h2>
      <p class="text-slate-300 text-sm leading-relaxed mb-4">
        Zrozumienie założeń danej epoki pozwala na głębszą analizę każdego utworu. Poniżej znajdziesz rozwinięte <strong>najważniejsze myśli, idee i prądy filozoficzne</strong> charakterystyczne dla konkretnych okresów. 
      </p>
      <div class="inline-flex gap-2 text-xs font-medium px-4 py-2 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-200">
        💡 <strong>Wskazówka:</strong> Kliknij „Rozwiń” na karcie epoki, aby błyskawicznie przypomnieć sobie, czym dokładnie były np. mesjanizm, winkelriedyzm, praca u podstaw czy dekadentyzm!
      </div>
    </div>
    <div class="text-[60px] opacity-80 shrink-0">🕰️</div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {epochs_html_cards}
  </div>
</section>'''

# Replace the old tab-epochs section entirely
text = re.sub(r'<section id="tab-epochs".*?</section>', new_section_html, text, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Epochs tab upgraded to interactive accordion style successfully!")
