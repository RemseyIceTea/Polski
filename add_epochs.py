import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add nav button
nav_btn = '''<button class="nav-tab px-3.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-2" data-tab="tab-epochs">
          <span>⏳ Charakterystyka Epok</span>
        </button>'''

if 'data-tab="tab-contexts"' in text and 'Charakterystyka Epok' not in text:
    text = re.sub(
        r'(<button class="nav-tab[^>]*data-tab="tab-contexts"[^>]*>.*?</button>)',
        r'\1\n        ' + nav_btn,
        text,
        flags=re.DOTALL
    )

# 2. Add section
epochs_data = [
    {
        "name": "Antyk (Starożytność)",
        "timeframe": "VIII w. p.n.e. – 476 r. n.e.",
        "desc": "Fundament kultury europejskiej. Opiera się na dwóch filarach: Biblii (światopogląd chrześcijański, teocentryzm) i mitologii grecko-rzymskiej (politeizm, humanizm). W sztuce dominuje klasyczne piękno, harmonia, proporcja (mimesis). To epoka narodzin demokracji, teatru i filozofii (stoicyzm, epikureizm).",
        "example": "<strong>Mitologia</strong>, <strong>Biblia</strong>, <strong>„Antygona”</strong>, <strong>„Iliada” / „Odyseja”</strong>, utwory Horacego."
    },
    {
        "name": "Średniowiecze",
        "timeframe": "V wiek – XV wiek",
        "desc": "Epoka teocentryczna (Bóg w centrum wszystkiego). Dominuje anonimowość twórców (sztuka tworzona na chwałę Boga – ad maiorem Dei gloriam). Wykształciły się wzorce osobowe: asceta (św. Aleksy), idealny rycerz (Roland), idealny władca (król Artur). Filozofie to głównie augustynizm (człowiek rozdarty) i tomizm (drabina bytów).",
        "example": "<strong>„Bogurodzica”</strong>, <strong>„Lament świętokrzyski”</strong>, <strong>„Pieśń o Rolandzie”</strong>, <strong>„Rozmowa Mistrza Polikarpa ze Śmiercią”</strong>."
    },
    {
        "name": "Renesans (Odrodzenie)",
        "timeframe": "XV w. – koniec XVI w.",
        "desc": "Powrót do antyku i humanizmu („Człowiekiem jestem i nic co ludzkie, nie jest mi obce”). Antropocentryzm stawia człowieka w centrum zainteresowania. Harmonia, pochwała życia ziemskiego, rozwój nauki (Kopernik) i sztuki. Popularny staje się motyw Arkadii i irenizm (pokój między ludźmi).",
        "example": "<strong>Treny, pieśni i fraszki (J. Kochanowski)</strong>, <strong>„Odprawa posłów greckich”</strong>, <strong>„Makbet” (Szekspir to przełom renesansu i baroku)</strong>."
    },
    {
        "name": "Barok",
        "timeframe": "koniec XVI w. – 1. poł. XVIII w.",
        "desc": "Koniec harmonii. Człowiek baroku jest pełen niepokoju, rozdarty między pokusami świata (szatan) a pragnieniem zbawienia (Bóg). Epoka kontrastów, przepychu (konceptyzm) i nietolerancji (wojny religijne). Dominuje motyw vanitas (marność) i uświadomienie sobie kruchości ludzkiego życia.",
        "example": "<strong>Wiersze J.A. Morsztyna, D. Naborowskiego i M. Sępa Szarzyńskiego</strong>, <strong>„Pamiętniki” (J.Ch. Pasek)</strong>, <strong>„Skąpiec” (Molier)</strong>."
    },
    {
        "name": "Oświecenie",
        "timeframe": "XVIII wiek (w Polsce: 1764 - 1822)",
        "desc": "Wiek Rozumu. Dominuje racjonalizm, empiryzm i deizm. Celem literatury jest edukacja i wychowanie (dydaktyzm, utylitaryzm) – „ucząc bawi, bawiąc uczy”. W Polsce to czas walki o reformy państwa (Sejm Wielki, Konstytucja 3 maja) oraz walki z sarmackim zacofaniem.",
        "example": "<strong>Bajki, satyry i hymny (I. Krasicki)</strong>."
    },
    {
        "name": "Romantyzm",
        "timeframe": "1822 r. – 1863 r. (powstanie styczniowe)",
        "desc": "Bunt przeciwko rozumowi. Najważniejsze to: irracjonalizm (wiara w czucie i wiarę), indywidualizm, miłość romantyczna (często nieszczęśliwa, prowadząca do samobójstwa), mistycyzm, bunt i fascynacja ludowością (prawa moralne prostego ludu). W Polsce to epoka wielkich zrywów niepodległościowych i mesjanizmu.",
        "example": "<strong>„Dziady cz. III”</strong>, <strong>„Pan Tadeusz”</strong>, <strong>„Kordian”</strong>, <strong>„Cierpienia młodego Wertera”</strong>."
    },
    {
        "name": "Pozytywizm",
        "timeframe": "1864 r. – 1890 r.",
        "desc": "Czas otrzeźwienia po klęsce powstania styczniowego. Zamiast walki zbrojnej – praca u podstaw (edukacja najbiedniejszych) i praca organiczna (rozwój gospodarczy całego społeczeństwa jako organizmu). Kult scjentyzmu (nauki), emancypacja kobiet, asymilacja Żydów. W literaturze króluje realizm i naturalizm.",
        "example": "<strong>„Lalka” (B. Prus)</strong>, <strong>„Zbrodnia i kara” (F. Dostojewski)</strong>, nowele (np. „Gloria victis”)."
    },
    {
        "name": "Młoda Polska",
        "timeframe": "1890 r. – 1918 r.",
        "desc": "Powrót do założeń romantyzmu (neoromantyzm). Dekadentyzm (poczucie schyłku, upadku kultury, zniechęcenie do życia). Sztuka dla sztuki – literatura ma być absolutna, a nie służyć celom społecznym (jak w pozytywizmie). Fascynacja chłopomanią (ucieczka na wieś) i impresjonizmem (chwytanie ulotnej chwili).",
        "example": "<strong>„Wesele” (S. Wyspiański)</strong>, <strong>„Chłopi” (W. Reymont)</strong>, wiersze K. Przerwy-Tetmajera."
    },
    {
        "name": "Dwudziestolecie międzywojenne",
        "timeframe": "1918 r. – 1939 r.",
        "desc": "Polska odzyskuje niepodległość. Wiosna i radość, ale potem nadciąga katastrofizm (przeczucie wybuchu nowej, straszliwej wojny). Rozwój awangardy (nowoczesnej poezji, odrzucenie tradycji). W literaturze obok optymizmu Skamandrytów pojawia się mroczna groteska, psychoanaliza (Freud) i absurd.",
        "example": "<strong>„Przedwiośnie” (S. Żeromski)</strong>, <strong>„Ferdydurke” (W. Gombrowicz)</strong>, <strong>„Sklepy cynamonowe” (B. Schulz)</strong>, <strong>„Szewcy” (S.I. Witkiewicz)</strong>."
    },
    {
        "name": "Wojna i okupacja",
        "timeframe": "1939 r. – 1945 r.",
        "desc": "Czas próby (tzw. apokalipsa spełniona). Brutalna konfrontacja przedwojennych ideałów z barbarzyństwem wojny. Literaci to często żołnierze (Pokolenie Kolumbów). Główne tematy to heroizm, tragizm wyborów moralnych w nieludzkich czasach, Holokaust oraz działalność obozów koncentracyjnych.",
        "example": "<strong>Poezja K.K. Baczyńskiego</strong>, <strong>„Inny świat” (G. Herling-Grudziński)</strong>, <strong>„Zdążyć przed Panem Bogiem” (H. Krall - literatura powojenna o wojnie)</strong>."
    },
    {
        "name": "Współczesność",
        "timeframe": "od 1945 r.",
        "desc": "Literatura po Holokauście. Pytanie: „jak pisać po Auschwitz?”. Podejmowanie problemów totalitaryzmu (komunizm, zniewolenie jednostki), absurdu i groteski w życiu społecznym, alienacji człowieka w wielkim mieście oraz moralności (jak zachować się przyzwoicie). Poszukiwanie tożsamości w świecie bez stałych wartości.",
        "example": "<strong>„Tango” (S. Mrożek)</strong>, <strong>„Rok 1984” (G. Orwell)</strong>, <strong>„Dżuma” (A. Camus)</strong>, wiersze Z. Herberta, W. Szymborskiej."
    }
]

epochs_html_cards = ""
for epoch in epochs_data:
    epochs_html_cards += f'''
    <div class="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col h-full hover:border-indigo-500/50 transition duration-300">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-[15px] font-bold text-amber-300">{epoch["name"]}</h3>
        <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">{epoch["timeframe"]}</span>
      </div>
      <p class="text-xs text-slate-300 mb-4 leading-relaxed flex-grow">
        {epoch["desc"]}
      </p>
      <div class="pt-3 border-t border-slate-800/50">
        <p class="text-[11px] text-slate-400">
          <strong class="text-emerald-400 block mb-1">Główne lektury z tej epoki:</strong>
          {epoch["example"]}
        </p>
      </div>
    </div>
    '''

epochs_section = f'''
<section id="tab-epochs" class="tab-content hidden space-y-6 max-w-7xl mx-auto pb-12">
  <div class="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/20 shadow-xl flex flex-col md:flex-row items-center gap-6">
    <div class="flex-grow">
      <h2 class="text-2xl font-black text-white mb-3">⏳ Charakterystyka Epok Literackich</h2>
      <p class="text-slate-300 text-sm leading-relaxed mb-4">
        Zrozumienie założeń danej epoki pozwala na głębszą analizę każdego utworu. Bohaterowie nie działają w próżni – ich wybory są niemal zawsze uwarunkowane prądami filozoficznymi i historycznymi ich czasów (np. <em>Kordian</em> myśli jak romantyk, a <em>Wokulski</em> jest rozdarty między dwiema epokami).
      </p>
      <div class="inline-flex gap-2 text-xs font-medium px-4 py-2 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-200">
        💡 <strong>Wskazówka:</strong> Możesz użyć założeń epoki we wstępie (jako tło dla zdefiniowania problemu) lub potraktować je jako pełnoprawny kontekst w rozwinięciu (np. kontekst historyczno-literacki).
      </div>
    </div>
    <div class="text-[60px] opacity-80 shrink-0">🕰️</div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {epochs_html_cards}
  </div>
</section>
'''

if '<section id="tab-epochs"' not in text:
    text = text.replace('</main>', epochs_section + '\n</main>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Epochs tab added to HTML successfully!")
