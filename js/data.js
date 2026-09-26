// Baza wiedzy i danych merytorycznych platformy MaturaPolski100
// Oparta na oficjalnych informatorach, aneksach i arkuszach CKE (Formuła 2023 i 2015)

const MATURA_DATA = {
  // 1. KRYTERIA OCENIANIA CKE
  ckeCriteria: {
    totalPoints: 60,
    passingThreshold: 18, // 30%
    parts: [
      {
        id: "part1",
        title: "Część 1: Język polski w użyciu",
        points: 10,
        desc: "Czytanie ze zrozumieniem 2 tekstów niefikcjonalnych (publicystycznych lub naukowych) oraz zadania z wiedzy o języku.",
        keyTask: "Notatka syntetyzująca (4 pkt, 60–90 słów) – klucz do wysokiego wyniku w tej części.",
        tasksBreakdown: [
          "Rozpoznawanie intencji autora, perswazji, manipulacji i środków retorycznych (epitety, pytania retoryczne, ironia).",
          "Wskazywanie związków frazeologicznych, synonimów i relacji logicznych (przyczyna-skutek, teza-argument).",
          "Notatka syntetyzująca: uogólnienie myśli obu autorów w limitowanym tekście 60–90 wyrazów."
        ]
      },
      {
        id: "part2",
        title: "Część 2: Test historycznoliteracki",
        points: 15,
        desc: "Zadania otwarte i zamknięte sprawdzające znajomość epok literackich, motywów, toposów i lektur obowiązkowych od starożytności po współczesność.",
        keyTask: "Rozpoznawanie autorów i utworów po fragmencie, analiza postaw bohaterów i powiązań między epokami.",
        tasksBreakdown: [
          "Antyk i Średniowiecze (Biblia, mitologia, Antygona, Bogurodzica, Lament świętokrzyski).",
          "Renesans, Barok, Oświecenie (Kochanowski, Morsztyn, Krasicki).",
          "Romantyzm i Pozytywizm (Mickiewicz – Dziady cz. III i Pan Tadeusz, Słowacki – Kordian, Prus – Lalka, Dostojewski – Zbrodnia i kara).",
          "Młoda Polska, XX wiek i Współczesność (Wyspiański – Wesele, Żeromski – Przedwiośnie, Camus – Dżuma, Borowski, Herling-Grudziński, Krall, Mrożek – Tango, Orwell – Rok 1984)."
        ]
      },
      {
        id: "part3",
        title: "Część 3: Wypracowanie (Rozprawka argumentacyjna)",
        points: 35,
        desc: "Wypowiedź argumentacyjna na jeden z dwóch podanych tematów bez tekstu źródłowego. Minimalna objętość: 300 słów.",
        keyTask: "Odwołanie do co najmniej jednej lektury obowiązkowej, innego utworu literackiego oraz dwóch kontekstów.",
        criteria: [
          {
            name: "Spełnienie formalnych warunków polecenia (SFWP)",
            max: 1,
            desc: "Czy praca liczy co najmniej 300 słów, jest na temat, odwołuje się do lektury obowiązkowej i nie zawiera błędu kardynalnego.",
            note: "0 pkt w SFWP z powodu braku lektury lub błędu kardynalnego oznacza 0 pkt za CAŁE wypracowanie!"
          },
          {
            name: "Kompetencje literackie i kulturowe (KLiK)",
            max: 16,
            desc: "Funkcjonalna analiza utworów literackich (w tym lektury obowiązkowej) oraz min. 2 kontekstów. Oceniana jest głębia wywodu, trafność argumentacji i brak błędów rzeczowych.",
            subCriteria: [
              { label: "Utwór 1 (lektura obowiązkowa)", max: 6, desc: "Trafny dobór i funkcjonalna analiza wątków/postaw bohatera." },
              { label: "Utwór 2 (inny utwór literacki)", max: 6, desc: "Pogłębiona argumentacja na drugim przykładzie literackim." },
              { label: "Konteksty (min. dwa)", max: 4, desc: "Funkcjonalne wplecenie kontekstu historycznego, biograficznego, filozoficznego itp. (po 2 pkt za każdy)." }
            ]
          },
          {
            name: "Kompozycja wypowiedzi",
            max: 7,
            desc: "Układ graficzny i logiczny pracy (trójdzielna struktura), spójność wewnątrz- i międzyakapitowa oraz styl.",
            subCriteria: [
              { label: "Struktura tekstu (wstęp, rozwinięcie, zakończenie)", max: 3 },
              { label: "Spójność tekstu (płynne przejścia, konektory, brak przeskoków myślowych)", max: 3 },
              { label: "Styl wypowiedzi (stosowny do rangi wypracowania, jednolity)", max: 1 }
            ]
          },
          {
            name: "Język wypowiedzi",
            max: 11,
            desc: "Bogactwo słownictwa, precyzja składniowa, poprawność gramatyczna, ortograficzna i interpunkcyjna.",
            subCriteria: [
              { label: "Zakres i poprawność środków językowych (gramatyka, leksyka, frazeologia)", max: 7 },
              { label: "Poprawność ortograficzna (max 2 pkt: 0-1 błąd = 2 pkt, 2-3 błędy = 1 pkt, 4+ = 0 pkt)", max: 2 },
              { label: "Poprawność interpunkcyjna (max 2 pkt: 0-4 błędy = 2 pkt, 5-8 błędów = 1 pkt, 9+ = 0 pkt)", max: 2 }
            ]
          }
        ]
      }
    ],
    cardinalError: {
      definition: "Błąd kardynalny to błąd rzeczowy świadczący o całkowitej nieznajomości treści i problematyki LEKTURY OBOWIĄZKOWEJ, do której odwołuje się zdający, w zakresie: fabuły utworu (losów głównych bohaterów), konstrukcji świata przedstawionego lub wymowy utworu.",
      consequences: "Egzaminator przyznaje 0 punktów w kryterium KLiK, co automatycznie skutkuje przyznaniem 0 punktów za CAŁE wypracowanie (0/35 pkt)!",
      examplesOfCardinalErrors: [
        { bad: "Stanisław Wokulski ożenił się z Izabelą Łęcką i wspólnie prowadzili sklep.", why: "Wokulski nigdy nie poślubił Łęckiej; zdrada i rozczarowanie doprowadziły go do próby samobójczej i zniknięcia." },
        { bad: "Kordian dokonał zamachu na cara Mikołaja I i został zabity w carskiej sypialni.", why: "Kordian zemdlał pod drzwiami sypialni cara w wyniku walki Strachu i Imaginacji, nie oddając strzału." },
        { bad: "Rodion Raskolnikow zamordował sędziego śledczego Porfirego Pietrowicza, by zatrzeć ślady.", why: "Zabił starą lichwiarkę Alonę Iwanowną i jej siostrę Lizawietę. Porfiry prowadził śledztwo i skłonił go do przyznania się." },
        { bad: "Roland uciekł z pola bitwy w wąwozie Roncevaux, aby ratować swoje życie.", why: "Roland walczył do końca w obronie honoru i wiary; odmówił zadęcia w róg, by nie splamić swego rycerskiego imienia." },
        { bad: "Antygona podporządkowała się rozkazowi Kreona i zrezygnowała z pochowania brata Polinika.", why: "Postawiła prawo boskie ponad prawem ludzkim i pogrzebała brata, za co została skazana na zamurowanie żywcem." },
        { bad: "Jacek Soplica przez całe życie był wiernym sojusznikiem Moskali i nigdy nie żałował zabójstwa Stolnika.", why: "Jacek odkupił winę jako cichy emisariusz Ksiądz Robak, ratując Tadeusza i Hrabiego oraz zyskując pośmiertną rehabilitację." }
      ],
      nonCardinalErrors: [
        { item: "Pomylenie drugorzędnego imienia bohatera (np. nazwanie subiekta Lisieckiego 'Laskowskim') -> Zwykły błąd rzeczowy (strata drobnego ułamka w KLiK, NIE zeruje pracy!)." },
        { item: "Błąd w utworze NIEBĘDĄCYM lekturą obowiązkową (np. pomylenie fabuły filmu lub wiersza) -> Zwykły błąd rzeczowy, NIGDY błąd kardynalny!" },
        { item: "Błąd w dacie wydania utworu -> Błąd w kontekście historycznoliterackim, nie błąd kardynalny." }
      ]
    }
  },

  // 2. TEMATY I ANALIZY Z OSTATNICH 5 LAT (2021-2025)
  maturaYears: [
    {
      year: 2025,
      formula: "Formuła 2023 (Uszczuplona Podstawa)",
      topics: [
        {
          id: "2025-1",
          title: "Źródło nadziei w czasach trudnych dla człowieka.",
          suggestedReadings: ["Dżuma (Albert Camus)", "Inny świat (Gustaw Herling-Grudziński)", "Dziady cz. III (Adam Mickiewicz)"],
          contexts: ["Filozoficzny (egzystencjalizm, bunt metafizyczny Camusa)", "Historyczny (realia sowieckich łagrów w Jercewie, Holokaust)"],
          analysis: "Temat wymaga zdefiniowania, czym dla człowieka jest sytuacja graniczna (wojna, zaraza, zniewolenie) oraz co pozwala mu zachować godność i sens istnienia. Nadzieja może mieć źródło w solidarności z innymi (dr Rieux), wierze w wartości moralne mimo nieludzkich warunków (Kostylew) lub wierze religijnej i mesjanizmie (Dziady cz. III)."
        },
        {
          id: "2025-2",
          title: "Jak błędna ocena sytuacji wpływa na życie człowieka?",
          suggestedReadings: ["Zbrodnia i kara (Fiodor Dostojewski)", "Lalka (Bolesław Prus)", "Kordian (Juliusz Słowacki)"],
          contexts: ["Psychologiczny (mechanizm samousprawiedliwienia, uleganie iluzjom)", "Społeczno-historyczny (podziały klasowe XIX-wiecznej Warszawy)"],
          analysis: "Błędna ocena może dotyczyć własnych możliwości moralnych (Raskolnikow i jego teoria jednostek niezwykłych), intencji drugiego człowieka (zaślepienie Wokulskiego salonową pozą Izabeli Łęckiej) lub sytuacji politycznej narodu (samotny spisek Kordiana). Konsekwencją jest upadek, kryzys tożsamości, a wreszcie konieczność przewartościowania życia."
        }
      ],
      modelEssay: {
        topic: "Źródło nadziei w czasach trudnych dla człowieka.",
        wordCount: 428,
        score: "35/35",
        text: `Człowiek wielokrotnie w historii stawał w obliczu sytuacji granicznych – wojen, totalitaryzmów, kataklizmów czy epidemii, które burzyły dotychczasowy porządek świata. W takich momentach naturalną reakcją bywa poczucie bezradności, nihilizm oraz lęk przed nicością. Jednak to właśnie w mrocznych epokach najpełniej ujawnia się potrzeba poszukiwania oparcia. Uważam, że najtrwalszym źródłem nadziei w czasach próby jest bezinteresowna solidarność międzyludzka oraz wierność elementarnym zasadom moralnym, które pozwalają ocalić godność nawet w świecie pozbawionym sensu.

Potwierdzeniem tej tezy jest postawa bohaterów powieści parabolicznej Alberta Camusa pt. „Dżuma”. Akcja utworu, rozgrywająca się w odciętym kordonem sanitarnym algierskim Oranie, stanowi metaforę zmagania się ludzkości ze złem metafizycznym oraz totalitarnym zniewoleniem. Główny bohater, doktor Bernard Rieux, staje twarzą w twarz z bezwzględną epidemią, która odbiera mieszkańcom wolność i poczucie bezpieczeństwa. Rieux nie ulega jednak rozpaczy ani nie ucieka w religijne uzasadnienia cierpienia. Źródłem jego nadziei i siły do walki staje się imperatyw moralny: lekarz uznaje, że jedynym godnym sposobem przeciwstawienia się absurdowi istnienia jest rzetelne wykonywanie swoich obowiązków i niesienie ulgi chorym. Wspólnie z Jeanem Tarrou oraz grupą ochotników tworzy formacje sanitarne. Ich solidarna współpraca dowodzi, że w obliczu zagłady człowiek odnajduje nadzieję nie w wielkich ideologiach, lecz w drugim człowieku i we wspólnym stawianiu oporu złu.

Do refleksji nad źródłami nadziei w warunkach ekstremalnych warto włączyć kontekst filozoficzny egzystencjalizmu laickiego Alberta Camusa. W swoim eseju „Mit Syzyfa” francuski myśliciel przekonywał, że świat jest ze swej natury absurdalny, a człowiek przypomina mitycznego Syzyfa wtaczającego głaz pod górę. Mimo to bunt przeciwko absurdowi i podejmowanie wysiłku nadają życiu sens. Postawa Rieux jest realizacją tej filozofii: walka z dżumą może być z góry skazana na porażkę, ale sama gotowość do niesienia pomocy stanowi triumf człowieczeństwa.

Innym, jeszcze bardziej dramatycznym dowodem na to, że nadzieja wypływa z obrony własnego człowieczeństwa, jest autobiograficzne dzieło Gustawa Herlinga-Grudzińskiego „Inny świat”. Pisarz ukazał w nim dehumanizującą rzeczywistość sowieckiego łagru w Jercewie, gdzie system planowo niszczył więźniów głodem, katorżniczą pracą i donosicielstwem. W świecie, w którym „człowiek był ludzki tylko w ludzkich warunkach”, zachowanie nadziei wymagało heroicznego wysiłku. Przykładem bezkompromisowej obrony godności jest postać Michaiła Kostylewa. Więzień ten, uświadomiwszy sobie, że padł ofiarą stalinowskiej mistyfikacji, postanowił każdego dnia opalać rękę w ogniu, by uniknąć pracy na rzecz oprawców. Cierpienie fizyczne stało się dla niego jedynym sposobem na zachowanie wolności wewnętrznej i odmowę współudziału w zbrodni. Kostylew wolał zginąć w męczarniach, niż pozwolić, by obóz odebrał mu duszę. Jego heroizm dowodzi, że wierność samemu sobie jest najpotężniejszą tarczą chroniącą człowieka przed rezygnacją.

Kontekst historyczny związany ze zbrodniami systemu gułagów uświadamia, że obozy pracy miały na celu całkowite złamanie psychiczne więźniów. Świadectwo Herlinga-Grudzińskiego unaocznia, że nawet w warunkach skrajnego terroru pojedyncze akty solidarności – jak potajemne dzielenie się chlebem czy czytanie ocalałych książek – stanowiły zarzewie nadziei na odrodzenie wolnego świata.

Podsumowując powyższe rozważania, należy stwierdzić, że czasy trudne obnażają kruchość ludzkiego bytu, lecz nie odbierają człowiekowi prawa do nadziei. Zarówno postawa doktora Rieux w „Dżumie”, jak i niezłomność Kostylewa w „Innym świecie” pokazują, że źródło ocalenia tkwi w nas samych. Nie zależy ono od zewnętrznych okoliczności, lecz od wyboru: solidarności z cierpiącymi oraz bezwzględnej wierności moralnemu kodeksowi. Dopóki człowiek potrafi współczuć i walczyć o swoją godność, dopóty żadna ciemność nie zdoła ugasić światła nadziei.`
      }
    },
    {
      year: 2024,
      formula: "Formuła 2023",
      topics: [
        {
          id: "2024-1",
          title: "Bunt i jego konsekwencje dla człowieka.",
          suggestedReadings: ["Dziady cz. III (Adam Mickiewicz)", "Antygona (Sofokles)", "Tango (Sławomir Mrożek)"],
          contexts: ["Historyczny (represje carskie po powstaniu listopadowym)", "Mitologiczny / filozoficzny (topos prometeizmu)"],
          analysis: "Bunt to jeden z najważniejszych motywów w literaturze. Może być wymierzony w Boga i porządek świata (bunt metafizyczny Konrada w Wielkiej Improwizacji), w niesprawiedliwe prawo ludzkie w imię wyższych wartości (Antygona sprzeciwiająca się Kreonowi) lub w tradycję i normy obyczajowe (Artur w Tangu). Konsekwencjami bywają samotność, klęska jednostki, ale też moralne zwycięstwo i ocalenie godności."
        },
        {
          id: "2024-2",
          title: "Jak relacja z drugą osobą kształtuje człowieka?",
          suggestedReadings: ["Lalka (Bolesław Prus)", "Zbrodnia i kara (Fiodor Dostojewski)", "Pan Tadeusz (Adam Mickiewicz)"],
          contexts: ["Biograficzny (nieszczęśliwa miłość romantyczna)", "Filozoficzny (chrześcijańskie miłosierdzie i przebaczenie)"],
          analysis: "Relacja międzyludzka może działać destrukcyjnie lub zbawczo. W przypadku Wokulskiego obsesyjne uczucie do Izabeli Łęckiej prowadzi do załamania psychicznego i porzucenia ideałów pozytywistycznych. Z kolei w 'Zbrodni i karze' miłość Soni Marmieładowej staje się dla Raskolnikowa jedyną drogą do moralnego zmartwychwstania i odrzucenia zbrodniczej pychy."
        }
      ],
      modelEssay: {
        topic: "Bunt i jego konsekwencje dla człowieka.",
        wordCount: 442,
        score: "35/35",
        text: `Bunt jest jedną z najbardziej fundamentalnych i nieodłącznych postaw człowieka. Zdolność do sprzeciwu wobec niesprawiedliwości, narzuconych reguł czy nawet samego Stwórcy leży u podstaw rozwoju cywilizacji oraz definiuje ludzką tożsamość. Decyzja o podjęciu walki wiąże się jednak z ogromną odpowiedzialnością i nieuchronnymi skutkami. Uważam, że bunt jest siłą ambiwalentną: choć nierzadko przynosi jednostce cierpienie, alienację, a nawet śmierć fizyczną, to jednocześnie pozwala ocalić wyższe wartości moralne i stanowi dowód duchowej wielkości człowieka.

Wspaniałym przykładem buntu o charakterze metafizycznym i narodowym jest postawa Konrada z III części „Dziadów” Adama Mickiewicza. Bohater dramatu przechodzi głęboką metamorfozę z nieszczęśliwego romantycznego kochanka Gustawa w bojownika o wolność ojczyzny. W słynnej „Wielkiej Improwizacji” Konrad występuje w imieniu ciemiężonego narodu polskiego, rzucając wyzwanie samemu Bogu. Zarzuca Stwórcy obojętność wobec cierpienia niewinnych ludzi i brak miłości do stworzenia, domagając się „rządu dusz”, aby własną mocą uszczęśliwić rodaków. Bunt Konrada cechuje się bezgraniczną pychą, która niemal doprowadza go do wiecznego potępienia – od bluźnierczego nazwania Boga carem powstrzymuje go omdlenie, a jego duszę opadają złe duchy. Konsekwencją tego sprzeciwu jest głębokie cierpienie i kryzys duchowy, jednak to ten sam heroiczny zryw czyni z Konrada wielkiego przywódcę duchowego, gotowego cierpieć „za miliony”.

Kontekst literacki i filozoficzny tego wątku odsyła nas do mitu o Prometeuszu. Konrad uosabia topos prometeizmu – postawy poświęcenia własnego dobra i spokoju dla dobra ogółu. Podobnie jak mityczny tytan skradł bogom ogień, by pomóc ludziom, i poniósł za to karę przykucia do skał Kaukazu, tak Konrad ryzykuje zbawienie dla ratowania narodu polskiego przed uciskiem caratu. Kontekst historyczny represji carskich po powstaniu listopadowym (proces filomatów i filaretów) unaocznia, że bunt Mickiewiczowskiego bohatera był artystycznym krzykiem pokolenia skazanego na wynarodowienie.

Drugim, klasycznym przykładem buntu w imię praw uniwersalnych jest postawa tytułowej bohaterki tragedii Sofoklesa pt. „Antygona”. Córka Edypa staje przed tragicznym dylematem: podporządkować się prawu państwowemu ustanowionemu przez króla Kreona, zakazującemu grzebania zwłok jej brata Polinika, czy też dochować wierności odwiecznym prawom boskim nakazującym pochówek każdego zmarłego. Antygona bez wahania wybiera bunt przeciw władzy ziemskiej. Konsekwencją jej czynu jest natychmiastowy wyrok śmierci – zostaje skazana na zamurowanie w grobowcu, gdzie ostatecznie odbiera sobie życie. Z perspektywy doczesnej ponosi więc całkowitą klęskę. Jednak w wymiarze etycznym to Antygona okazuje się zwyciężczynią. Jej bezkompromisowy sprzeciw obnaża tyranię Kreona, który za swoją pychę i despotyzm płaci samobójstwem żony Eurydyki i syna Hajmona.

Podsumowując, bunt jest nieodwracalną próbą ludzkiego charakteru. Jak dowodzą losy Konrada z dramatu Mickiewicza oraz greckiej Antygony, człowiek buntujący się niemal zawsze płaci wysoką cenę – zostaje odrzucony, cierpi i doświadcza samotności. Mimo to bunt jest konieczny, aby przeciwstawić się złu i bezprawiu. To właśnie gotowość do poniesienia ofiary w imię wyższych racji sprawia, że zbuntowana jednostka, mimo fizycznej przegranej, odnosi ponadczasowe zwycięstwo moralne.`
      }
    },
    {
      year: 2023,
      formula: "Formuła 2023 (Debiut nowego egzaminu)",
      topics: [
        {
          id: "2023-1",
          title: "Człowiek – istota pełna sprzeczności.",
          suggestedReadings: ["Zbrodnia i kara (Fiodor Dostojewski)", "Lalka (Bolesław Prus)", "Kordian (Juliusz Słowacki)"],
          contexts: ["Filozoficzny (idea nadczłowieka Nietzschego vs etyka chrześcijańska)", "Społeczny (konflikt romantycznych marzeń z pozytywistyczną pracą organiczną)"],
          analysis: "Temat dotyczy wewnętrznego rozdarcia ludzkiej natury. Człowiek łączy w sobie pragnienie dobra z podatnością na zło, dumę z pokorą, racjonalizm z porywami serca. Raskolnikow jest wrażliwy na cudze nieszczęście (pomaga Marmieładowom), a jednocześnie planuje zimne morderstwo. Wokulski to racjonalny kupiec i pozytywista, a zarazem ślepo zakochany romantyk."
        },
        {
          id: "2023-2",
          title: "Co sprawia, że człowiek staje się dla drugiego człowieka bohaterem?",
          suggestedReadings: ["Dżuma (Albert Camus)", "Zdążyć przed Panem Bogiem (Hanna Krall)", "Lalka (Bolesław Prus)"],
          contexts: ["Historyczny (powstanie w getcie warszawskim 1943)", "Filozoficzny (pojęcie bohaterstwa powszedniego u Marka Edelmana)"],
          analysis: "Bohaterstwo nie musi oznaczać spektakularnych czynów militarnych. Może polegać na cichej, codziennej służbie i ratowaniu jednostkowego życia (dr Rieux, Marek Edelman jako kardiolog) lub na wierności zasadom moralnym w warunkach poniżenia."
        }
      ],
      modelEssay: {
        topic: "Człowiek – istota pełna sprzeczności.",
        wordCount: 435,
        score: "35/35",
        text: `Natura ludzka od zarania dziejów wymyka się jednoznacznym definicjom i uproszczonym klasyfikacjom. W człowieku nieustannie ścierają się przeciwstawne siły: rozum i namiętność, skłonność do wzniosłych poświęceń oraz mroczne egoistyczne instynkty. Ta wewnętrzna polifonia sprawia, że jednostka jest zdolna zarówno do bezinteresownego dobra, jak i do porażającego okrucieństwa. Uważam, że człowiek jest z istoty bytem pełnym sprzeczności, a próba pogodzenia skrajnych motywacji stanowi źródło jego największych dramatów oraz duchowego rozwoju.

Niezwykle wnikliwe studium psychologicznego rozdarcia przynosi powieść Fiodora Dostojewskiego pt. „Zbrodnia i kara”. Główny bohater, ubogi petersburski student Rodion Raskolnikow, jest postacią skonstruowaną na fundamencie wewnętrznych antynomii. Z jednej strony cechuje go niezwykła empatia i wrażliwość na krzywdę innych: bez wahania oddaje ostatnie kopiejki na pogrzeb potrąconego przez powóz Marmieładowa oraz broni młodej dziewczyny przed napastnikiem na bulwarze. Z drugiej strony ten sam wrażliwy młodzieniec ulega chorej fascynacji własną pychą i tworzy pseudofilozoficzną teorię dzielącą ludzkość na „ludzi zwykłych” oraz „niezwykłych”. Uznając siebie za jednostkę pokroju Napoleona, mającą prawo przekraczać bariery moralne w imię wyższych celów, z zimną krwią morduje starą lichwiarkę Alonę Iwanowną. Sprzeczność między bezwzględnym intelektualnym zamysłem a głęboko zakorzenionym sumieniem doprowadza go po zbrodni do gorączki i obłędu. Dopiero u boku głęboko wierzącej Soni Marmieładowej Raskolnikow odrzuca racjonalną pychę i wstępuje na drogę pokory.

Warto przy tym przywołać kontekst filozoficzny nawiązujący do koncepcji Fryderyka Nietzschego i jego idei „nadczłowieka”, który stoi „poza dobrem i złem”. Raskolnikow jest prekursorem tego myślenia, lecz Dostojewski bezlitośnie obnaża jego fałsz. Człowiek nie może uciec przed wrodzonym prawem moralnym; rozdarcie między pragnieniem bycia bezkarnym władcą a głosem sumienia prowadzi do nieuchronnej destrukcji.

Drugą postacią, która stanowi kwintesencję sprzeczności epoki przełomu, jest Stanisław Wokulski – protagonista „Lalki” Bolesława Prusa. Bohater łączy w sobie dwie skrajnie odmienne formacje duchowe: romantyzm oraz pozytywizm. Z pozytywistycznego ducha czerpie zamiłowanie do nauki, szacunek dla pracy, talent handlowy i chęć reformowania polskiego społeczeństwa przez pracę u podstaw. Jest pragmatycznym kupcem, który zdobył fortunę na dostawach wojskowych. Jednak całe to racjonalne życie zostaje podporządkowane romantycznej, niszczącej pasji – idealistycznej miłości do arystokratki Izabeli Łęckiej. Wokulski dla kobiety gotów jest rzucić wszystko, cierpi katusze upokorzenia, kupuje kamienicę i przegrywa w wyścigu o jej serce z powierzchownym Starskim. Wewnętrzny konflikt między trzeźwym umysłem a ślepym porywem serca ostatecznie niszczy bohatera i prowadzi go do dramatycznego finału.

Podsumowując, człowiek jest istotą nierozerwalnie związaną ze sprzecznościami. Ani Raskolnikow, ani Wokulski nie dają się zamknąć w czarno-białych schematach. To właśnie współistnienie światła i cienia, porywów altruizmu i egoistycznych ambicji czyni ludzką egzystencję tak fascynującą, a zarazem tragicznie skomplikowaną.`
      }
    },
    {
      year: 2022,
      formula: "Formuła 2015",
      topics: [
        {
          id: "2022-1",
          title: "Czym dla człowieka może być tradycja? (na podstawie Pana Tadeusza)",
          suggestedReadings: ["Pan Tadeusz (Adam Mickiewicz)", "Przedwiośnie (Stefan Żeromski)", "Wesele (Stanisław Wyspiański)"],
          contexts: ["Historyczny (utrata niepodległości, tęsknota emigracyjna)", "Kulturowy (etos szlachecki, sarmatyzm)"],
          analysis: "Tradycja w literaturze może pełnić rolę scalającą wspólnotę i chroniącą tożsamość narodową w czasach niewoli (Soplicowo jako mała ojczyzna w Panu Tadeuszu) lub stać się skostniałym balastem hamującym rozwój cywilizacyjny (krytyka sarmatyzmu w Weselu, spór o kształt odrodzonej Polski w Przedwiośniu)."
        }
      ],
      modelEssay: {
        topic: "Czym dla człowieka może być tradycja?",
        wordCount: 410,
        score: "35/35",
        text: `Tradycja stanowi fundament tożsamości każdej społeczności oraz punkt odniesienia dla indywidualnego życia człowieka. Składają się na nią obyczaje, rytuały, pamięć historyczna oraz wartości przekazywane z pokolenia na pokolenie. W zależności od sytuacji dziejowej może ona pełnić zróżnicowane funkcje: bywa tarczą chroniącą wspólnotę przed wynarodowieniem, bezpieczną przystanią dającą poczucie ładu, ale niekiedy także przeszkodą na drodze ku nowoczesności. Uważam, że tradycja jest dla człowieka przede wszystkim ostoją tożsamości i spoiwem łączącym jednostkę z narodem, bez którego gubi ona swoje korzenie.

Niezrównanym obrazem tradycji jako źródła siły i harmonii jest epopeja narodowa Adama Mickiewicza pt. „Pan Tadeusz”. Soplicowo, w którym toczy się akcja utworu, zostało wykreowane jako mityczna, arkadyjska ostoja polskości pod zaborami. Życie mieszkańców dworku sędziego Soplicy jest ściśle uregulowane przez odwieczny ceremoniał szlachecki. Sędzia dba o to, by młodzież szanowała starszych, celebruje wspólne posiłki, polowania i grzybobrania, a także strzeże narodowego obyczaju w stroju i gościnności. W świecie, w którym Polska została wymazana z map Europy, to właśnie wierność tradycji pozwala ocalić narodowego ducha. Tradycja w Soplicowie nie jest martwym rytuałem, lecz żywą więzią – uczy odpowiedzialności za ojczyznę i przygotowuje szlachtę do wspólnej walki u boku wojsk napoleońskich.

Warto przy tym uwzględnić kontekst biograficzno-emigracyjny powstania utworu. Mickiewicz pisał „Pana Tadeusza” w Paryżu, doświadczając goryczy tułaczki i kłótni wśród polskiej emigracji polistopadowej. Tęsknota za krajem lat dziecinnych skłoniła poetę do idealizacji tradycyjnego ładu wiejskiego, który w jego oczach urastał do symbolu utraconej, niepodległej ojczyzny.

Zupełnie inne, krytyczne spojrzenie na tradycję odnajdujemy w „Przedwiośniu” Stefana Żeromskiego. Główny bohater, Cezary Baryka, po przybyciu do odrodzonej po 123 latach niewoli Polski trafia do dworku w Nawłoci. Miejscowa szlachta żyje w sposób łudząco przypominający Soplicowo – dni upływają im na ucztach, piknikach, przejażdżkach i flirtach. Baryka dostrzega jednak, że ten beztroski sielankowy tryb życia opiera się na wyzysku komorników i chłopów z Chłodka, którzy żyją w skrajnej nędzy. Tradycja ziemiańska okazuje się w tym ujęciu anachronicznym anachronizmem, znieczulającym elity na palące problemy społeczne odbudowującego się państwa.

Podsumowując, tradycja może być postrzegana dwojako. Jak ukazał Mickiewicz, jest ona bezcennym rezerwuarem pamięci i moralnego ładu, który pozwala przetrwać najcięższe próby dziejowe. Z drugiej strony, jak przestrzegał Żeromski, bezrefleksyjne trzymanie się przeszłości może prowadzić do stagnacji. Człowiek mądry powinien zatem pielęgnować tradycję jako duchowy korzeń, nie zapominając o konieczności reagowania na wyzwania współczesności.`
      }
    },
    {
      year: 2021,
      formula: "Formuła 2015",
      topics: [
        {
          id: "2021-1",
          title: "Ambicja – niszczy czy prowadzi do celu? (na podstawie Lalki)",
          suggestedReadings: ["Lalka (Bolesław Prus)", "Makbet (William Szekspir)", "Zbrodnia i kara (Fiodor Dostojewski)"],
          contexts: ["Filozoficzny (etyka cnoty vs makiawelizm)", "Społeczno-historyczny (feudalne przesądy arystokracji a kapitalizm)"],
          analysis: "Ambicja jest motorem ludzkiego działania. Gdy opiera się na szlachetnych pobudkach i pracy, może budować dobrobyt (Wokulski rozwijający handel, fundujący stypendia). Gdy jednak zostaje pozbawiona hamulców moralnych lub ulega chorobliwej obsesji, niszczy zarówno otoczenie, jak i samego człowieka (zbrodnicza ambicja Makbeta i Lady Makbet)."
        }
      ],
      modelEssay: {
        topic: "Ambicja – niszczy czy prowadzi do celu?",
        wordCount: 422,
        score: "35/35",
        text: `Ambicja jest jedną z najpotężniejszych sił napędowych w życiu człowieka. To ona motywuje do przekraczania własnych ograniczeń, zdobywania wiedzy i zmieniania świata. Zdolność do stawiania sobie ambitnych celów może jednak stać się niebezpieczną pułapką, jeśli zostanie zdominowana przez chorobliwą żądzę sukcesu lub pozbawiona barier etycznych. Uważam, że ambicja ma naturę dwoistą: potrafi wynieść jednostkę na szczyt i przynieść pożytek społeczeństwu, lecz w skrajnych formach prowadzi do całkowitej destrukcji moralnej i osobistej.

Złożony charakter ambicji znakomicie ilustrują losy Stanisława Wokulskiego, głównego bohatera „Lalki” Bolesława Prusa. Wokulski to człowiek o niezwykłym potencjale i żelaznej woli. Od najmłodszych lat dążył do samorozwoju – mimo sprzeciwu ojca i pracy subiekta w winiarni Hopfera uczył się po nocach, by wstąpić do Szkoły Głównej. Jako dojrzały człowiek ambicję przekuł w spektakularny sukces ekonomiczny: zaryzykował, wyjechał na wojnę rosyjsko-turecką i pomnożył majątek. Ta racjonalna ambicja służyła nie tylko jemu, lecz także społeczeństwu – bohater tworzył nowe miejsca pracy, pomagał biedocie Powiśla oraz finansował badania naukowe profesora Geista i Juliana Ochockiego. Jednak obok szlachetnej ambicji pozytywisty w sercu Wokulskiego rozwinęła się obsesyjna ambicja zdobycia arystokratki Izabeli Łęckiej. Aby wkupić się w łaski zdegenerowanego salonu warszawskiego, zaprzepaścił własną niezależność i godność. Ostateczne rozczarowanie fałszem Izabeli zniszczyło go psychicznie, dowodząc, że ambicja podporządkowana złudnym celom przynosi klęskę.

Z kolei przykładem ambicji bezwzględnie niszczącej, prowadzącej do katastrofy moralnej, jest tragedia Williama Szekspira pt. „Makbet”. Tytułowy bohater na początku utworu jawi się jako dzielny i prawy wódz wojsk szkockich. Jednak po usłyszeniu przepowiedni czarownic budzi się w nim uśpiona dotąd, niepohamowana żądza władzy. Podsycany przez bezwzględną żonę Lady Makbet, decyduje się na zamordowanie króla Dunkana, łamiąc odwieczne prawa lojalności rycerskiej i gościnności. Makbet osiąga zamierzony cel i zasiada na tronie, lecz cena okazuje się potworna. Ambicja popycha go do kolejnych krwawych zbrodni – uśmiercenia przyjaciela Banka oraz bezbronnej rodziny Macduffa. Władca staje się krwawym tyranem, popada w paranoję i traci wszelkie ludzkie uczucia. Jego życie traci sens, a on sam ginie zhańbiony w pojedynku.

Podsumowując, ambicja jest siłą moralnie neutralną, a o jej owocach decydują motywacje człowieka. Jak dowodzi przykład Wokulskiego, ambicja oparta na pracy i rozwoju może budować wielkie dzieła, o ile nie przerodzi się w ślepą obsesję. Natomiast zbrodnicza ambicja Makbeta przypomina, że sukces zdobyty kosztem zasad etycznych prowadzi do nieodwracalnej ruiny duchowej i samotności.`
      }
    }
  ],

  // 3. ŻELAZNY SCHEMAT ROZPRAWKI NA 35/35 PKT
  essayBlueprint: {
    title: "Żelazny 5-Akapitowy Algorytm Rozprawki CKE",
    minWords: 300,
    optimalWords: "350–450 słów",
    architecture: [
      {
        part: "Akapit 1: Wstęp",
        targetLength: "50–70 słów",
        steps: [
          { step: "Zdanie 1: Refleksja ogólna", desc: "Zarysowanie problemu na poziomie ogólnoludzkim lub filozoficznym. Zakaz pustych frazesów typu 'Od wieków ludzie...'." },
          { step: "Zdanie 2: Odniesienie do pytania z tematu", desc: "Sformułowanie problemu badawczego i wyostrzenie konfliktu wartości." },
          { step: "Zdanie 3: Jasna teza (lub hipoteza)", desc: "Jednoznaczna, dojrzała odpowiedź na temat (np. 'Uważam, że...')." },
          { step: "Zdanie 4: Zapowiedź toku wywodu", desc: "Krótka zapowiedź dzieł, które posłużą jako argumenty." }
        ],
        templates: [
          "Zagadnienie [temat] od zarania dziejów stanowi jeden z najważniejszych węzłów problemowych ludzkiej egzystencji...",
          "W obliczu [sytuacja z tematu] człowiek zmuszony jest do zdefiniowania własnego systemu wartości...",
          "Stawiam tezę, że [teza], co postaram się dowieść na podstawie analizy [utwór 1] oraz [utwór 2]."
        ]
      },
      {
        part: "Akapit 2: Rozwinięcie I (Lektura Obowiązkowa)",
        targetLength: "110–140 słów",
        steps: [
          { step: "Zdanie tematyczne (Teza cząstkowa)", desc: "Nazwanie pierwszego argumentu potwierdzającego tezę główną." },
          { step: "Wprowadzenie bohatera i sytuacji", desc: "Przywołanie konkretnego utworu i sytuacji fabularnej (bez streszczania całej książki!)." },
          { step: "Pogłębiona analiza motywacji i postawy", desc: "Wskazanie, dlaczego bohater tak postąpił i jakie były tego konsekwencje." },
          { step: "Funkcjonalny kontekst (opcjonalnie w tym lub osobnym akapicie)", desc: "Wplecenie kontekstu historycznego, biograficznego lub filozoficznego oświetlającego utwór." },
          { step: "Wniosek cząstkowy", desc: "Kropka nad 'i' – jak ta sytuacja dowodzi słuszności tezy głównej." }
        ]
      },
      {
        part: "Akapit 3: Rozwinięcie II (Drugi Utwór Literacki)",
        targetLength: "110–140 słów",
        steps: [
          { step: "Zdanie łączące / Teza cząstkowa 2", desc: "Płynne przejście ('Inną perspektywę na omawiane zjawisko ukazuje...', 'Z kolei z odmienną konsekwencją spotykamy się w...')." },
          { step: "Analiza drugiego dzieła", desc: "Lektura obowiązkowa lub inny utwór literacki (wiersz, dramat, opowiadanie)." },
          { step: "Zestawienie / Kontrast", desc: "Porównanie losów bohaterów obu utworów pod kątem zadanego tematu." },
          { step: "Wniosek cząstkowy 2", desc: "Domknięcie argumentu i powiązanie z tezą wypracowania." }
        ]
      },
      {
        part: "Akapit 4: Zastosowanie Kontekstów (lub wplecione w rozwinięcia)",
        targetLength: "60–80 słów",
        rules: "CKE wymaga minimum DWÓCH kontekstów. Mogą to być: historyczny, filozoficzny, biograficzny, literacki/motywiczny, kulturowy.",
        goldenRule: "KONTEKST MUSI BYĆ FUNKCJONALNY! Nie wystarczy napisać 'Mickiewicz żył w XIX wieku'. Należy wykazać, JAK ten fakt wpływa na wymowę dzieła."
      },
      {
        part: "Akapit 5: Zakończenie",
        targetLength: "50–70 słów",
        steps: [
          { step: "Parafraza tezy głównej", desc: "Przypomnienie stanowiska innymi słowami (nie kopiuj słowo w słowo ze wstępu!)." },
          { step: "Syntetyczne zebranie wniosków", desc: "Podsumowanie tego, co wynika z zestawienia obu analizowanych lektur." },
          { step: "Uniwersalna puenta humanistyczna", desc: "Końcowa myśl o człowieku, świecie lub naturze ludzkiej." }
        ]
      }
    ],
    connectorsBank: {
      intro: [
        "Jednym z najbardziej frapujących zagadnień literatury jest...",
        "W dziejach myśli humanistycznej szczególne miejsce zajmuje problem...",
        "Refleksja nad [motyw] nieodłącznie towarzyszy człowiekowi w sytuacjach granicznych..."
      ],
      transition: [
        "Potwierdzeniem powyższej tezy są losy bohatera powieści...",
        "Z analogiczną sytuacją egzystencjalną mamy do czynienia w dziele...",
        "W odróżnieniu od wyżej wymienionej postawy, zgoła odmienną perspektywę prezentuje...",
        "Warto w tym miejscu odwołać się do kontekstu historycznego, który unaocznia, że...",
        "Rozważania te warto pogłębić o wymiar filozoficzny..."
      ],
      concluding: [
        "Reasumując powyższe rozważania, należy skonstatować, że...",
        "Zestawienie obu przywołanych dzieł pozwala sformułować jednoznaczny wniosek...",
        "Konkludując, losy bohaterów literackich dowodzą uniwersalnej prawdy, że..."
      ]
    },
    contextGuide: {
      whatIsContext: "Kontekst to punkt odniesienia spoza samego tekstu lektury, który pozwala głębiej zrozumieć jej sens.",
      types: [
        { type: "Kontekst historyczny", desc: "Wydarzenia historyczne (wojny, zabory, powstania, totalitaryzmy), w których osadzony jest utwór lub w których żył autor.", example: "Powstanie listopadowe i carskie represje (proces filomatów) jako tło martyrologii w 'Dziadach cz. III'." },
        { type: "Kontekst filozoficzny", desc: "Nurty filozoficzne (np. stoicyzm, egzystencjalizm Camusa, etyka chrześcijańska, koncepcja nadczłowieka Nietzschego).", example: "Koncepcja buntu przeciwko absurdowi w 'Micie Syzyfa' Camusa jako podbudowa postawy dr. Rieux w 'Dżumie'." },
        { type: "Kontekst biograficzny", desc: "Doświadczenia życiowe pisarza, które wpłynęły bezpośrednio na kształt utworu.", example: "Uwięzienie Gustawa Herlinga-Grudzińskiego w obozie w Jercewie jako podstawa autentyzmu 'Innego świata'." },
        { type: "Kontekst literacki / motywiczny (topos)", desc: "Odwołanie do innego utworu, mitu lub uniwersalnego toposu kulturowego.", example: "Topos buntu prometejskiego (mit o Prometeuszu) w analizie Wielkiej Improwizacji Konrada." }
      ],
      fakeVsReal: [
        { bad: "ZŁY KONTEKST (POZORNY - 0 pkt): Bolesław Prus naprawdę nazywał się Aleksander Głowacki i pisał w XIX wieku.", good: "DOBRY KONTEKST (FUNKCJONALNY - 2 pkt): Pozytywistyczna koncepcja pracy organicznej i pracy u podstaw wpłynęła na postawę Wokulskiego, który zamiast jałowych dyskusji starał się podnieść z nędzy mieszkańców Powiśla." },
        { bad: "ZŁY KONTEKST (POZORNY - 0 pkt): Sofokles napisał Antygonę w starożytnej Grecji w Atenach.", good: "DOBRY KONTEKST (FUNKCJONALNY - 2 pkt): Wierzenia starożytnych Greków zakładały, że brak pochówku uniemożliwia duszy zmarłego przejście przez rzekę Styks do Hadesu, co tłumaczy bezkompromisową determinację Antygony w pogrzebaniu Polinika." }
      ]
    },
    schemes: [
      {
        id: "klasyczny",
        name: "1. Klasyczny Dedukcyjny (Teza we wstępie ➔ Rozwinięcie 1 ➔ Rozwinięcie 2 ➔ Konteksty ➔ Zakończenie)",
        badge: "Najbezpieczniejszy na 100% CKE",
        desc: "Wstęp kończy się jednoznaczną tezą będącą bezpośrednią odpowiedzią na temat. W rozwinięciach udowadniasz słuszność tezy lekturą obowiązkową i drugim utworem, a konteksty funkcjonalnie dopełniają wywód.",
        structure: [
          { p: "Akapit 1: Wstęp", role: "Refleksja ogólna + Zdefiniowanie problemu + Jednoznaczna Teza + Zapowiedź utworów" },
          { p: "Akapit 2: Rozwinięcie I (Lektura Obowiązkowa)", role: "Teza cząstkowa + Analiza wyboru/postawy bohatera + Wniosek cząstkowy" },
          { p: "Akapit 3: Rozwinięcie II (Drugi Utwór)", role: "Konektor przejścia + Druga perspektywa/kontrast + Wniosek cząstkowy" },
          { p: "Akapit 4: Zastosowanie Kontekstów", role: "Funkcjonalny kontekst historyczny / filozoficzny / biograficzny oświetlający wymowę dzieł" },
          { p: "Akapit 5: Zakończenie", role: "Parafraza tezy głównej + Syntetyczny bilans wniosków + Uniwersalna puenta humanistyczna" }
        ]
      },
      {
        id: "dialektyczny",
        name: "2. Dialektyczny / Problemowy (Hipoteza ➔ Pro & Contra ➔ Kontekst syntezujący ➔ Teza w zakończeniu)",
        badge: "Dla tematów o sprzecznościach i dylematach",
        desc: "We wstępie nie stawiasz gotowej tezy, lecz hipotezę badawczą. Rozwinięcie 1 pokazuje jedną stronę medalu (argument), Rozwinięcie 2 pokazuje drugą stronę lub kontrargument, a ostateczna teza (synteza) rodzi się w zakończeniu.",
        structure: [
          { p: "Akapit 1: Wstęp Badawczy", role: "Zarysowanie dylematu moralnego + Postawienie Hipotezy (pytania otwartego) + Zapowiedź dzieł" },
          { p: "Akapit 2: Rozwinięcie I (Teza cząstkowa - Jedna strona medalu)", role: "Lektura ukazująca pozytywne lub szlachetne oblicze zjawiska + Wniosek cząstkowy" },
          { p: "Akapit 3: Rozwinięcie II (Antyteza cząstkowa - Druga strona medalu)", role: "Drugi utwór ukazujący mroczne konsekwencje, klęskę lub destrukcję + Wniosek cząstkowy" },
          { p: "Akapit 4: Kontekst Filozoficzno-Problemowy", role: "Kontekst filozoficzny wyjaśniający dwoistą naturę świata i człowieka" },
          { p: "Akapit 5: Zakończenie (Synteza)", role: "Rozstrzygnięcie hipotezy + Sformułowanie dojrzałej Tezy Końcowej godzącej sprzeczności" }
        ]
      },
      {
        id: "porownawczy",
        name: "3. Porównawczo-Synchroniczny (Zderzenie obu dzieł w każdym akapicie problemowym)",
        badge: "Wysoka erudycja i elegancja kompozycyjna",
        desc: "Zamiast omawiać utwory po kolei w osobnych blokach, dzielisz wypracowanie na dwa kluczowe aspekty problemu i w każdym akapicie zderzasz ze sobą losy obu bohaterów.",
        structure: [
          { p: "Akapit 1: Wstęp", role: "Uniwersalny topos kulturowy + Teza o wspólnym mianowniku ludzkich dążeń" },
          { p: "Akapit 2: Aspekt I – Geneza i motywacje bohaterów", role: "Porównanie przyczyn działań bohaterów z obu utworów (wspólne korzenie wyborów)" },
          { p: "Akapit 3: Aspekt II – Cena i konsekwencje wyborów", role: "Zderzenie skutków postępowania bohaterów w obu dziełach (sukces vs klęska)" },
          { p: "Akapit 4: Kontekst Kulturowy / Motywiczny", role: "Topos literacki łączący oba dzieła (np. topos homo viator, theatrum mundi)" },
          { p: "Akapit 5: Zakończenie", role: "Syntetyczny bilans porównania + Ponadczasowa prawda o naturze ludzkiej" }
        ]
      },
      {
        id: "egzystencjalny",
        name: "4. Egzystencjalny / Sytuacja Graniczna (Dramat człowieka & Obrona człowieczeństwa)",
        badge: "Dla tematów o nadziei, cierpieniu i kryzysie wartości",
        desc: "Struktura nastawiona na analizę człowieka rzuconego w wir historii, totalitaryzmu, zarazy lub wojny i poszukującego ocalenia godności.",
        structure: [
          { p: "Akapit 1: Wstęp", role: "Refleksja o kruchości bytu ludzkiego w sytuacjach granicznych + Teza o ocaleniu poprzez wierność zasadom" },
          { p: "Akapit 2: Rozwinięcie I (Doświadczenie Zła / Próba)", role: "Konfrontacja bohatera z absurdem, cierpieniem lub opresją + Analiza kryzysu wewnętrznego" },
          { p: "Akapit 3: Rozwinięcie II (Ocalenie Wartości / Bunt moralny)", role: "Drugi bohater dokonujący heroicznego wyboru solidarności lub obrony godności" },
          { p: "Akapit 4: Kontekst Egzystencjalny", role: "Egzystencjalizm Camusa (bunt przeciw absurdowi) lub etyka solidarności" },
          { p: "Akapit 5: Zakończenie", role: "Podsumowanie: Człowiek to istota, która nawet w ciemności potrafi odnaleźć sens poprzez miłość i prawość" }
        ]
      },
      {
        id: "wlasny",
        name: "5. Własny / Spersonalizowany Schemat Ucznia",
        badge: "Pełna kontrola",
        desc: "Samodzielnie konfigurujesz liczbę akapitów rozwinięcia, pozycję tezy oraz układ argumentacji.",
        structure: []
      }
    ]
  },

  // 4. MISTRZOSTWO NOTATKI SYNTETYZUJĄCEJ (4 PUNKTY)
  synthesisGuide: {
    title: "Algorytm Notatki Syntetyzującej (Część I arkusza – 4 pkt)",
    rules: [
      "LIMIT SŁÓW: Bezwzględnie od 60 do 90 słów! Jeśli napiszesz 59 lub 91 słów – tracisz punkty za warunki formalne!",
      "ZAKAZ STRESZCZANIA PO KOLEI: Nie pisz: 'W pierwszym tekście autor pisze to i to. Natomiast w drugim tekście autor mówi to i to'. Za takie ujęcie egzaminator obetnie punkty za spójność i syntezę!",
      "MISTRZOWSKA SYNTEZA: Zestaw ze sobą myśli obu autorów w odniesieniu do ZADANEGO TEMATU. Pokaż podobieństwo, różnicę lub uzupełnianie się ich tez."
    ],
    fourSentenceFormula: [
      { num: 1, purpose: "Zdanie wprowadzające", content: "Wskazanie wspólnego zagadnienia podejmowanego w obu tekstach." },
      { num: 2, purpose: "Stanowisko tekstu 1", content: "Sformułowanie głównej tezy/aspektu pierwszego autora." },
      { num: 3, purpose: "Stanowisko tekstu 2 (porównanie)", content: "Wskazanie, jak drugi autor odnosi się do tego problemu (kontrast lub poszerzenie)." },
      { num: 4, purpose: "Zdanie syntetyzujące (konkluzja)", content: "Uogólniający wniosek łączący obie perspektywy." }
    ],
    exampleTasks: [
      {
        topic: "Rola czytania tradycyjnego i cyfrowego w rozwoju człowieka",
        sourceContext: "Tekst 1 mówi o głębokim skupieniu przy czytaniu papieru; Tekst 2 mówi o dynamice i szybkim wyszukiwaniu danych w sieci.",
        modelText: "Obaj autorzy analizują wpływ nośnika tekstu na proces poznawczy człowieka. Pierwszy badacz podkreśla, że lektura tradycyjnych książek sprzyja głębokiemu skupieniu, empatii oraz lepszemu zapamiętywaniu treści. Z kolei drugi autor zwraca uwagę na zalety czytania cyfrowego, akcentując szybkość weryfikacji danych i wielozadaniowość. Ostatecznie obaj publicyści dochodzą do wniosku, że optymalny rozwój intelektualny wymaga harmonijnego łączenia obu form lektury.",
        wordCount: 65,
        score: "4/4 pkt",
        breakdown: "Treść: 2/2 (oddano myśli obu tekstów bez wypaczeń), Spójność: 1/1 (eleganckie konektory 'Z kolei', 'Ostatecznie'), Język/Orto/Interp: 1/1 (bezbłędna forma, limit 65 słów mieści się idealnie w przedziale 60-90)."
      },
      {
        topic: "Znaczenie podróży w życiu współczesnego człowieka",
        sourceContext: "Tekst 1 traktuje podróż jako ucieczkę od rutyny; Tekst 2 traktuje podróż jako trud poznawczy i konfrontację z odmiennością.",
        modelText: "Autorzy obu tekstów podejmują refleksję nad motywacjami i skutkami podróżowania. Pierwszy publicysta postrzega wyprawę jako formę ucieczki od codziennej rutyny oraz sposób na regenerację psychiczną. Drugi z autorów traktuje podróżowanie znacznie głębiej, definiując je jako wymagający proces poznawczy i konfrontację z odmiennością kulturową. Mimo odmiennych akcentów obaj twórcy zgadzają się, że podróż przekształca wewnętrznie człowieka i poszerza horyzonty myślowe.",
        wordCount: 66,
        score: "4/4 pkt",
        breakdown: "Idealna struktura porównawcza, zwięzłość, brak streszczenia zdarzeń, 66 słów."
      }
    ]
  },

  // 5. WARSZTAT JĘZYKOWY, SKŁADNIA I INTERPUNKCJA (Kiedy kropka, kiedy przecinek)
  punctuationMastery: {
    title: "Kodeks Interpunkcji i Składni: Kiedy Kropka, a Kiedy Przecinek?",
    philosophy: "Głównym powodem, dla którego maturzyści tracą punkty za język i kompozycję, są tzw. zdania-tasiemce. Uczeń próbuje upchnąć pięć myśli w jednym zdaniu, gubi podmiot, orzeczenie i logikę, a egzaminator stawia czerwone podkreślenie za brak spójności i anakolut.",
    theGoldenPeriodRule: {
      title: "Żelazna Zasada Kropki (Cięcie Tasiemców)",
      rule: "Jedno zdanie złożone powinno liczyć maksymalnie DWA orzeczenia (jedno zdanie nadrzędne i jedno podrzędne). Jeśli masz ochotę dodać trzecie 'który' albo 'ponieważ' – BEZWZGLĘDNIE POSTAW KROPKĘ i zacznij nowe zdanie z konektorem logicznym!",
      example: {
        bad: "Wokulski był postacią skomplikowaną, ponieważ kochał Izabelę, która nim gardziła, co doprowadziło go do załamania psychicznego, dlatego postanowił wyjechać z Warszawy i rzucić handel. (ZŁE – tasiemiec, utrata punktów za styl)",
        good: "Wokulski był postacią niezwykle skomplikowaną. Jego tragizm wynikał z bezgranicznej miłości do Izabeli Łęckiej, która demonstracyjnie nim gardziła. W konsekwencji tego upokorzenia bohater doświadczył głębokiego załamania psychicznego. Postanowił wówczas zerwać z dotychczasowym życiem i opuścić Warszawę. (DOSKONAŁE – rytm, elegancja, 7/7 za język)"
      }
    },
    commaRules: [
      {
        id: "rule1",
        category: "Spójniki podrzędne (ZAWSZE przecinek)",
        words: "że, żeby, aby, iż, bo, ponieważ, gdyż, albowiem, skoro, chociaż, choć, mimo że, jeśli, jeżeli, gdyby, jakkolwiek, dopóki, odkąd",
        desc: "Zdanie podrzędne ZAWSZE oddzielamy od zdania nadrzędnego przecinkiem.",
        examples: [
          "Bohater wiedział, że popełnił błąd.",
          "Zdecydował się na walkę, mimo że nie miał szans na zwycięstwo.",
          "Jeśli nie podejmiesz próby, nigdy nie poznasz prawdy."
        ]
      },
      {
        id: "rule2",
        category: "Zaimki względne wprowadzające zdanie (ZAWSZE przecinek)",
        words: "który, jaka, czyje, kto, co, gdzie, dokąd, skąd, kiedy, jak",
        desc: "Przecinek stawiamy przed wyrazem, który zaczyna zdanie wyjaśniające lub dookreślające.",
        examples: [
          "Dzieło, które porusza ten problem, to 'Lalka' Prusa.",
          "Raskolnikow udał się na policję, gdzie przyznał się do winy.",
          "Nie wiedział, jak ma postąpić w obliczu próby."
        ]
      },
      {
        id: "rule3",
        category: "Spójniki przeciwstawne (ZAWSZE przecinek)",
        words: "ale, lecz, a (w znaczeniu ale), jednak, natomiast, zaś",
        desc: "Wszelkie zderzenia myśli i przeciwieństwa wymagają postawienia przecinka.",
        examples: [
          "Chciał pomóc społeczeństwu, ale napotkał opór arystokracji.",
          "Nie był człowiekiem złym, lecz zagubionym we własnych ambicjach.",
          "Kreon kierował się prawem państwowym, natomiast Antygona wybrała nakaz sumienia."
        ]
      },
      {
        id: "rule4",
        category: "Spójniki wynikowe (ZAWSZE przecinek)",
        words: "więc, zatem, toteż, dlatego",
        desc: "Wskazanie skutku i wniosku w zdaniu współrzędnym.",
        examples: [
          "Złamał prawo moralne, więc musiał ponieść karę.",
          "Działał w afekcie, dlatego nie przewidział konsekwencji."
        ]
      },
      {
        id: "rule5",
        category: "Spójniki łączne i rozłączne (BEZ przecinka!)",
        words: "i, oraz, tudzież, albo, lub, czy, bądź, ani, ni",
        desc: "Przed pojedynczymi spójnikami łączącymi równorzędne części zdania NIE stawiamy przecinka!",
        warning: "UWAGA NA POWTÓRZENIA: Jeśli spójnik występuje dwa razy w tej samej funkcji, stawiamy przecinek przed drugim: 'Nie miał ani siły, ani ochoty do walki.'",
        examples: [
          "Wokulski kochał Izabelę i wspierał ubogich. (BRAK PRZECINKA PRZED 'i')",
          "Mógł wybrać poddanie się lub podjęcie walki. (BRAK PRZECINKA PRZED 'lub')"
        ]
      },
      {
        id: "rule6",
        category: "Zbieg spójników (Gdzie postawić przecinek?)",
        words: "że gdy, że jeśli, a ponieważ, i chociaż",
        desc: "Gdy obok siebie stoją dwa spójniki, przecinek stawiamy PRZED całym zestawieniem, a NIE pomiędzy nimi!",
        examples: [
          "Wiedział, że jeśli ucieknie, straci szacunek do samego siebie. (PRAWIDŁOWO: przecinek przed 'że')",
          "BŁĄD: Wiedział że, jeśli ucieknie... LUB Wiedział, że, jeśli ucieknie..."
        ]
      },
      {
        id: "rule7",
        category: "Wtrącenia (Obustronny przecinek)",
        words: "zdania wtrącone, imiesłowy przysłówkowe (-ąc, -wszy, -łszy)",
        desc: "Wszelkie wtrącenia oraz imiesłowy przysłówkowe oddzielamy z OBU stron!",
        examples: [
          "Konrad, przekonany o własnej potędze, wyzwał Boga na pojedynek.",
          "Raskolnikow, wychodząc z pokoju lichwiarki, omal nie został zauważony."
        ]
      }
    ],
    interactiveExercises: [
      {
        id: 1,
        sentence: "Bohater wiedział [1] że postąpił wbrew regułom [2] i dlatego obawiał się konsekwencji.",
        blanks: [
          { pos: 1, correct: ",", reason: "Przecinek przed spójnikiem podrzędnym 'że'." },
          { pos: 2, correct: "", reason: "Brak przecinka przed 'i dlatego' łączącym równorzędne skutki (lub opcjonalnie przed 'dlatego' jeśli traktowane jako wynikowe; w tym układzie spójnik 'i' łączy zdania)." }
        ]
      },
      {
        id: 2,
        sentence: "Wokulski [1] który zainwestował cały majątek w spółkę handlową [2] odniósł wielki sukces.",
        blanks: [
          { pos: 1, correct: ",", reason: "Początek zdania podrzędnego przydawkowego (wtrąconego) przed 'który'." },
          { pos: 2, correct: ",", reason: "Koniec zdania wtrąconego – domknięcie przecinkiem przed orzeczeniem zdania głównego." }
        ]
      },
      {
        id: 3,
        sentence: "Nie uległ rezygnacji [1] ale podjął nierówną walkę z losem.",
        blanks: [
          { pos: 1, correct: ",", reason: "Zawsze stawiamy przecinek przed spójnikiem przeciwstawnym 'ale'." }
        ]
      },
      {
        id: 4,
        sentence: "Raskolnikow uważał [1] że jeśli człowiek jest geniuszem [2] to wolno mu przekroczyć prawo.",
        blanks: [
          { pos: 1, correct: ",", reason: "Przecinek przed całym zbiegiem spójników 'że jeśli'." },
          { pos: 2, correct: ",", reason: "Przecinek przed członem wynikowym 'to' zamykającym zdanie warunkowe." }
        ]
      },
      {
        id: 5,
        sentence: "Doktor Rieux walczył z epidemią dżumy [1] i nigdy nie stracił wiary w ludzką solidarność.",
        blanks: [
          { pos: 1, correct: "", reason: "Brak przecinka przed pojedynczym spójnikiem łącznym 'i' łączącym dwa orzeczenia tego samego podmiotu." }
        ]
      }
    ]
  },

  // 6. ENCYKLOPEDIA LEKTUR OBOWIĄZKOWYCH Z TARCZĄ ANTYKARDYNALNĄ
  mandatoryBooks: [
    {
      id: "lalka",
      title: "Lalka",
      author: "Bolesław Prus",
      epoch: "Pozytywizm",
      type: "Powieść realistyczna / społeczno-obyczajowa",
      coreTheme: "Rozdarcie jednostki między romantyczną miłością a pozytywistycznym etosem pracy; krytyczny obraz społeczeństwa polskiego XIX w.",
      keyCharacters: [
        { name: "Stanisław Wokulski", role: "Kupiec, były powstaniec styczniowy, naukowiec amator. Łączy cechy romantyka (idealistyczna, niszcząca miłość do Łęckiej) i pozytywisty (praca organiczna, kult wiedzy)." },
        { name: "Izabela Łęcka", role: "Arystokratka, wyrachowana, żyjąca w świecie pozorów i salonowych iluzji. Traktuje Wokulskiego z wyższością jako 'kupca galanteryjnego'." },
        { name: "Ignacy Rzecki", role: "Stary subiekt, reprezentant dawnego romantyzmu politycznego (bonapartysta), symbol wierności, skromności i sumiennej pracy." },
        { name: "Julian Ochocki", role: "Młody arystokrata-naukowiec marzący o skonstruowaniu machiny latającej, reprezentant czystej pasji poznawczej." }
      ],
      universalThemes: ["Miłość niszcząca", "Ambicja i kariera", "Konflikt pokoleń i epok", "Miasto (Warszawa i Paryż)", "Nierówności społeczne i praca u podstaw"],
      contexts: [
        "Historyczny: Powstanie styczniowe 1863 r. i zsyłka Wokulskiego do Irkucka.",
        "Społeczno-filozoficzny: Pozytywistyczna praca organiczna i praca u podstaw w zderzeniu z anachroniczną pychą arystokracji."
      ],
      antiCardinalShield: [
        "Wokulski NIGDY nie ożenił się z Izabelą Łęcką!",
        "Wokulski NIE umiera na torach kolejowych – próbuje popełnić samobójstwo w Skierniewicach, lecz ratuje go dróżnik Wysocki.",
        "Losy Wokulskiego po wysadzeniu ruin zamku w Zasławiu pozostają tajemnicą (nie wiadomo na 100%, czy zginął, czy wyjechał do Paryża/Ameryki)."
      ]
    },
    {
      id: "dziady3",
      title: "Dziady cz. III",
      author: "Adam Mickiewicz",
      epoch: "Romantyzm",
      type: "Dramat romantyczny",
      coreTheme: "Martyrologia narodu polskiego pod zaborem rosyjskim, walka dobra ze złem o duszę człowieka i narodu, bunt metafizyczny i mesjanizm.",
      keyCharacters: [
        { name: "Gustaw-Konrad", role: "Przechodzi metamorfozę z nieszczęśliwego kochanka w narodowego wieszcza i bojownika. W Wielkiej Improwizacji wyzywa Boga w imię miłości do ojczyzny." },
        { name: "Ksiądz Piotr", role: "Pokorny bernardyn, przeciwieństwo pysznego Konrada. W Widzeniu otrzymuje od Boga proroctwo zmartwychwstania Polski ('Polska Chrystusem narodów')." },
        { name: "Senator Nowosilcow", role: "Okrutny carski namiestnik, uosobienie bezwzględności, cynizmu i tyranii caratu." }
      ],
      universalThemes: ["Bunt prometejski", "Cierpienie i martyrologia", "Mesjanizm ('Polska Chrystusem narodów')", "Władza despotyczna i zdrada", "Walka dobra ze złem"],
      contexts: [
        "Historyczny: Proces filomatów i filaretów w Wilnie (1823–1824), represje carskie po powstaniu listopadowym.",
        "Biblijno-mesjanistyczny: Paralela między męką Jezusa Chrystusa a cierpieniem rozbiorowej Polski."
      ],
      antiCardinalShield: [
        "Konrad w Wielkiej Improwizacji NIE nazywa Boga carem! Mdleje, a bluźniercze słowo dopowiada diabeł!",
        "Konrad NIE zostaje potępiony – jego duszę ratuje wstawiennictwo Ewy i egzorcyzmy Księdza Piotra.",
        "Ksiądz Piotr NIE jest pyszny – jego siła wynika z całkowitej pokory ('Panie! czymże ja jestem przed Twoim obliczem? Prochem i niczem')."
      ]
    },
    {
      id: "wesele",
      title: "Wesele",
      author: "Stanisław Wyspiański",
      epoch: "Młoda Polska",
      type: "Dramat symboliczny / narodowy",
      coreTheme: "Diagnoza niezdolności narodu polskiego do walki o niepodległość; konflikt między inteligencją a chłopstwem; demaskacja mitów narodowych.",
      keyCharacters: [
        { name: "Gospodarz", role: "Inteligent, który ożenił się z chłopką i osiadł na wsi. Otrzymuje od Wernyhory złoty róg, lecz z lenistwa przekazuje go Jaśkowi." },
        { name: "Jasiek", role: "Młody chłopak z wiejskiej gromady. Gubi złoty róg, schylając się po czapkę z pawimi piórami – symbol prywaty i próżności." },
        { name: "Poeta", role: "Reprezentant młodopolskiego dekadentyzmu i niemocy twórczej, któremu ukazuje się Rycerz (Zawisza Czarny)." },
        { name: "Chochoł", role: "Krzak róży owinięty słomą. Symbol uśpionych sił narodu, a zarazem reżyser hipnotycznego tańca niemocy w finale." }
      ],
      universalThemes: ["Niemoc narodowa i utracona szansa", "Mity narodowe (solidaryzm, mit kosyniera)", "Konflikt klasowy (chłopi i inteligencja)", "Sztuka a odpowiedzialność społeczna"],
      contexts: [
        "Historyczny: Rabacja galicyjska 1846 r. (rzeź szlachty przez chłopów pod wodzą Jakuba Szeli) jako pamięć blokująca porozumienie.",
        "Biograficzny: Prawdziwy ślub poety Lucjana Rydla z Jadwigą Mikołajczykówną w Bronowicach pod Krakowem (1900 r.)."
      ],
      antiCardinalShield: [
        "Złoty róg gubi Jasiek, a NIE Gospodarz!",
        "Jasiek gubi róg, bo schyla się po czapkę z PAWICH piór (nie bażancich ani orlich)!",
        "W finale nikt nie ginie – wszyscy goście wpadają w hipnotyczny letarg (chocholi taniec), z którego budzi ich dopiero pianie koguta."
      ]
    },
    {
      id: "zbrodnia_i_kara",
      title: "Zbrodnia i kara",
      author: "Fiodor Dostojewski",
      epoch: "Pozytywizm / Realizm psychologiczny",
      type: "Powieść polifoniczna / traktat moralny",
      coreTheme: "Upadek człowieka w pychę racjonalizmu, psychologiczne i metafizyczne konsekwencje zbrodni oraz droga do zmartwychwstania moralnego przez wiarę i cierpienie.",
      keyCharacters: [
        { name: "Rodion Raskolnikow", role: "Były student prawa, autor artykułu o 'ludziach niezwykłych'. Zabija lichwiarkę, by dowieść, że stoi ponad prawem, lecz załamuje się pod ciężarem sumienia." },
        { name: "Sonia Marmieładowa", role: "Czysta duchem dziewczyna zmuszona do prostytucji przez nędzę rodziny. Uosobienie chrześcijańskiej ofiarności, miłości i wiary." },
        { name: "Porfiry Pietrowicz", role: "Sędzia śledczy prowadzący wyrafinowaną grę psychologiczną z Raskolnikowem, skłaniający go do dobrowolnego przyznania się do winy." },
        { name: "Świdrygajłow", role: "Cyniczny podwójnik Raskolnikowa, żyjący całkowicie poza moralnością. Kończy życie samobójstwem z poczucia pustki." }
      ],
      universalThemes: ["Wina i kara", "Pycha intelektualna vs sumienie", "Miłosierdzie i zmartwychwstanie duchowe", "Miasto jako przestrzeń degradacji (Petersburg)", "Nędza i degradacja moralna"],
      contexts: [
        "Filozoficzny: Krytyka utylitaryzmu i zapowiedź idei nadczłowieka; prymat etyki chrześcijańskiej nad czystym rozumem.",
        "Biblijny: Przypowieść o wskrzeszeniu Łazarza czytana Raskolnikowowi przez Sonię jako zapowiedź odrodzenia bohatera."
      ],
      antiCardinalShield: [
        "Raskolnikow zabił siekierą lichwiarkę Alonę Iwanowną ORAZ jej ciężarną, niewinną siostrę Lizawietę (przypadkową świadkinię)!",
        "Raskolnikow NIE zabił sędziego Porfirego ani Soni!",
        "Raskolnikow NIE zostaje skazany na karę śmierci – otrzymuje 8 lat katorgi na Syberii dzięki okolicznościom łagodzącym (przyznanie się, pomoc innym)."
      ]
    },
    {
      id: "przedwiosnie",
      title: "Przedwiośnie",
      author: "Stefan Żeromski",
      epoch: "Dwudziestolecie międzywojenne",
      type: "Powieść polityczno-społeczna",
      coreTheme: "Rozczarowanie kształtem odrodzonej po 1918 r. Polski; poszukiwanie drogi reform dla młodego państwa; krytyka rewolucji i anachronizmu ziemiaństwa.",
      keyCharacters: [
        { name: "Cezary Baryka", role: "Młody Polak urodzony w Baku. Doświadcza krwawej rewolucji bolszewickiej, przybywa do Polski i staje się świadkiem jej słabości i sporów ideowych." },
        { name: "Seweryn Baryka", role: "Ojciec Cezarego, twórca mitu o 'szklanych domach' – wizji nowoczesnej, czystej i sprawiedliwej Polski." },
        { name: "Szymon Gajowiec", role: "Wysoki urzędnik państwowy, zwolennik ewolucyjnych, spokojnych reform gospodarczych i edukacyjnych." },
        { name: "Antoni Lulek", role: "Młody komunista o chorowitej posturze, fanatyczny zwolennik zbrojnej rewolucji proletariatu." }
      ],
      universalThemes: ["Dojrzewanie ideowe i tożsamość", "Rozczarowanie niepodległością", "Mit a brutalna rzeczywistość (szklane domy)", "Rewolucja bolszewicka i jej okrucieństwo", "Spór o drogi naprawy Rzeczypospolitej"],
      contexts: [
        "Historyczny: Wojna polsko-bolszewicka 1920 r. (udział Baryki w bitwie) oraz zabójstwo prezydenta Gabriela Narutowicza (1922 r.).",
        "Społeczny: Nędza polskich robotników i bezrobocie w zderzeniu z sielanką w Nawłoci."
      ],
      antiCardinalShield: [
        "Mit o szklanych domach wymyślił Seweryn Baryka (ojciec), a NIE Cezary!",
        "Szklane domy NIE istniały w Polsce – były jedynie ułudą mającą skłonić Cezarego do powrotu do ojczyzny.",
        "W finale Baryka idzie w pochodzie na Belweder, lecz idzie 'oddzielnie, w ubraniu żołnierskim' – jego gest to krzyk rozpaczy, a nie bezkrytyczny akces do partii komunistycznej!"
      ]
    },
    {
      id: "antygona",
      title: "Antygona",
      author: "Sofokles",
      epoch: "Starożytność (Antyk)",
      type: "Tragedia grecka",
      coreTheme: "Konflikt tragiczny: zderzenie odwiecznego prawa boskiego z prawem państwowym ustanowionym przez władcę; pycha władzy (hybris).",
      keyCharacters: [
        { name: "Antygona", role: "Córka Edypa, wybiera prawo boskie i miłość siostrzaną ('Współkochać przyszłam, nie współnienawidzić')." },
        { name: "Kreon", role: "Król Teb, kieruje się racją stanu i autorytetem władzy, popada w pychę (hybris) i despotyzm." },
        { name: "Hajmon", role: "Syn Kreona i narzeczony Antygony, próbuje przemówić ojcu do rozsądku, popełnia samobójstwo przy ciele ukochanej." }
      ],
      universalThemes: ["Konflikt tragiczny", "Prawo boskie vs prawo ludzkie", "Pycha władcy (hybris) i jej konsekwencje", "Fatum i nieuchronność losu"],
      contexts: [
        "Kulturowo-religijny: Wierzenia Greków o zakazie bezczeszczenia ciał zmarłych i konieczności rytuału pochówku dla spokoju duszy w Hadesie."
      ],
      antiCardinalShield: [
        "Antygona NIE została ścięta ani ukamienowana – Kreon skazał ją na zamurowanie żywcem w grobowcu, gdzie powiesiła się na chuście!",
        "Kreon NIE uniknął kary – stracił syna Hajmona i żonę Eurydykę (oboje odebrali sobie życie)."
      ]
    },
    {
      id: "makbet",
      title: "Makbet",
      author: "William Szekspir",
      epoch: "Renesans / Barok (teatr elżbietański)",
      type: "Tragedia szekspirowska",
      coreTheme: "Niszczący wpływ niepohamowanej żądzy władzy; mechanizm tyranii i stopniowa degradacja psychiczna mordercy.",
      keyCharacters: [
        { name: "Makbet", role: "Początkowo prawy rycerz, ulega żądzy władzy po przepowiedni czarownic i staje się krwawym tyranem." },
        { name: "Lady Makbet", role: "Bezwzględna inspiratorka pierwszej zbrodni, ostatecznie popada w obłęd i popełnia samobójstwo pod ciężarem winy." },
        { name: "Banko", role: "Przyjaciel Makbeta, który nie ulega pokusie zła i zostaje zamordowany na zlecenie nowego króla." }
      ],
      universalThemes: ["Żądza władzy i tyrania", "Wina, kara i wyrzuty sumienia (plamy krwi)", "Zło rodzące kolejne zło", "Rola losu vs wolna wola"],
      contexts: [
        "Kulturowo-historyczny: Wiara elżbietańskiej Anglii w czary i demony oraz koncepcja zabójstwa króla jako grzechu przeciwko boskiemu porządkowi świata (królobójstwo)."
      ],
      antiCardinalShield: [
        "Makbeta NIE zabija król Dunkan (bo to Makbet zabił Dunkana!). Makbeta zabija w pojedynku Macduff!",
        "Przepowiednia czarownic głosiła, że nie pokona go nikt 'zrodzony z niewiasty' – Macduff urodził się przez cesarskie cięcie, co wyjaśnia spełnienie proroctwa."
      ]
    },
    {
      id: "dzuma",
      title: "Dżuma",
      author: "Albert Camus",
      epoch: "Współczesność (XX wiek)",
      type: "Powieść paraboliczna",
      coreTheme: "Zmaganie się człowieka ze złem metafizycznym i historycznym; bunt przeciwko absurdowi poprzez codzienną solidarność i humanitaryzm.",
      keyCharacters: [
        { name: "dr Bernard Rieux", role: "Lekarz, narrator kroniki. Nie wierzy w Boga, lecz walczy z zarazą z poczucia elementarnej przyzwoitości." },
        { name: "Jean Tarrou", role: "Przyjaciel Rieux, syn prokuratora. Pragnie 'być świętym bez Boga' i organizuje ochotnicze formacje sanitarne." },
        { name: "Ojciec Paneloux", role: "Jezuita, który początkowo widzi w dżumie karę bożą za grzechy, lecz po bolesnej śmierci małego synka sędziego Othona przewartościowuje swoją wiarę." },
        { name: "Raymond Rambert", role: "Dziennikarz z Paryża, który początkowo chce uciec z Oranu do ukochanej, lecz ostatecznie zostaje, by pomagać chorym." }
      ],
      universalThemes: ["Sytuacja graniczna", "Solidarność i braterstwo", "Heroizm powszedni i przyzwoitość", "Metafora zła (totalitaryzm, faszyzm, zaraza moralna)"],
      contexts: [
        "Filozoficzny: Egzystencjalizm laicki Camusa i koncepcja buntu przeciw absurdowi (odwołanie do 'Mitu Syzyfa').",
        "Historyczny: Dżuma jako alegoria brunatnej zarazy – okupacji hitlerowskiej i francuskiego ruchu oporu (Resistance)."
      ],
      antiCardinalShield: [
        "Dżuma NIE jest wyłącznie opowieścią medyczną – to parabola o naturze zła i totalitaryzmie!",
        "Doktor Rieux NIE ucieka z miasta – trwa na posterunku do końca epidemii!",
        "W finale dżuma cofa się, lecz Rieux przypomina, że bakcyl dżumy nigdy nie umiera i może powrócić, by uderzyć w uśpione miasto."
      ]
    },
    {
      id: "tango",
      title: "Tango",
      author: "Sławomir Mrożek",
      epoch: "Współczesność",
      type: "Dramat groteskowy",
      coreTheme: "Kryzys kultury i upadek tradycyjnych wartości; anarchia awangardy rodząca brutalny totalitaryzm (dyktaturę prymitywa).",
      keyCharacters: [
        { name: "Artur", role: "Młody syn dążący do przywrócenia tradycyjnych form i zasad moralnych w zdemoralizowanym, libertyńskim domu rodziców." },
        { name: "Stomil i Eleonora", role: "Rodzice Artura, starzy awangardziści hołdujący całkowitej wolności od wszelkich norm, sztuce eksperymentalnej i rozwiązłości." },
        { name: "Edek", role: "Prymityw z wąsami, lokaj i kochanek matki. Uosobienie chamstwa i surowej siły fizycznej, który w finale przejmuje władzę." }
      ],
      universalThemes: ["Bunt pokoleniowy a rebours (młody buntuje się ku tradycji)", "Groteska i absurd", "Zwycięstwo chamstwa nad kulturą", "Mechanizm powstawania dyktatury"],
      contexts: [
        "Historyczno-polityczny: Aluzja do totalitaryzmów XX wieku (faszyzm, stalinizm), które wyrosły z chaosu i nihilizmu moralnego elit."
      ],
      antiCardinalShield: [
        "Artur NIE zostaje dyktatorem – zostaje zdradziecko zabity ciosem w kark przez Edka!",
        "W słynnym finale Edek tańczy tango 'La Cumparsita' z wujem Eugeniuszem, co symbolizuje pełne podporządkowanie starych elit nowemu prymitywnemu władcy!"
      ]
    },
    {
      id: "zdazyc_przed_panem_bogiem",
      title: "Zdążyć przed Panem Bogiem",
      author: "Hanna Krall",
      epoch: "Współczesność",
      type: "Reportaż / wywiad-rzeka",
      coreTheme: "Prawda o powstaniu w getcie warszawskim; demitologizacja heroizmu; walka lekarza o każde ludzkie życie jako 'wyścig z Bogiem'.",
      keyCharacters: [
        { name: "Marek Edelman", role: "Ostatni żyjący przywódca powstania w getcie warszawskim (z ramienia ŻOB), po wojnie wybitny kardiochirurg ratujący ludzi na stole operacyjnym." }
      ],
      universalThemes: ["Pamięć o Holokauście", "Godna śmierć a prawo do życia", "Bohaterstwo odbrązowione", "Służba lekarska jako powołanie"],
      contexts: [
        "Historyczny: Likwidacja getta warszawskiego przez Niemców w 1943 r. i zbrojny zryw Żydowskiej Organizacji Bojowej."
      ],
      antiCardinalShield: [
        "Powstanie w getcie warszawskim (kwiecień 1943 r.) to NIE to samo co powstanie warszawskie (sierpień 1944 r.)! Pomylenie tych dwóch zrywów to kompromitacja rzeczowa!",
        "Marek Edelman NIE zginął w getcie – przeżył wojnę i zmarł w 2009 r. jako lekarz kardiochirurg w Łodzi."
      ]
    },
    {
      id: "rok_1984",
      title: "Rok 1984",
      author: "George Orwell",
      epoch: "Współczesność (XX wiek)",
      type: "Antyutopia / dystopia",
      coreTheme: "Totalitaryzm doskonały niszczący ludzką psychikę, kontrola myśli przez nowomowę, fałszowanie przeszłości i wszechobecną inwigilację.",
      keyCharacters: [
        { name: "Winston Smith", role: "Pracownik Ministerstwa Prawdy, który buntuje się przeciwko Partii, pisze nielegalny dziennik i zakochuje się w Julii." },
        { name: "Wielki Brat", role: "Mityczny wódz Oceanii, którego twarz spogląda z plakatów z napisem 'Wielki Brat patrzy'." },
        { name: "O'Brien", role: "Funkcjonariusz Policji Myśli, który udaje członka ruchu oporu, by uwięzić i poddać praniu mózgu Winstona." }
      ],
      universalThemes: ["Wszechwładza państwa i inwigilacja", "Język jako narzędzie manipulacji (nowomowa)", "Zniszczenie indywidualizmu i miłości", "Fałszowanie historii ('Kto rządzi przeszłością...')"],
      contexts: [
        "Historyczny: Doświadczenia stalinizmu i faszyzmu w Europie jako inspiracja dla wizji Oceanii."
      ],
      antiCardinalShield: [
        "Winston Smith w finale NIE zwycięża Partii – zostaje złamany torturami w Pokoju 101, zdradza Julię i 'z miłością' ulega Wielkiemu Bratu!"
      ]
    },
    {
      id: "pan_tadeusz",
      title: "Pan Tadeusz",
      author: "Adam Mickiewicz",
      epoch: "Romantyzm",
      type: "Epopeja narodowa",
      coreTheme: "Kraj lat dziecinnych jako ostoja tradycji i polskości; motyw winy i odkupienia (Jacek Soplica); nadzieja na odzyskanie niepodległości u boku Napoleona.",
      keyCharacters: [
        { name: "Jacek Soplica (Ksiądz Robak)", role: "W młodości dumny zawadiaka, zabójca Stolnika Horeszki. Pokutuje jako cichy emisariusz polityczny i poświęca życie, ratując Tadeusza i Hrabiego." },
        { name: "Tadeusz Soplica", role: "Młody szlachcic, patriota, który po ślubie z Zosią uwłaszcza chłopów." },
        { name: "Sędzia Soplica", role: "Gospodarz Soplicowa, strażnik etykiety, polskich obyczajów i gościnności." }
      ],
      universalThemes: ["Wina i odkupienie (bohater dynamiczny)", "Tradycja i obyczaj szlachecki", "Arkadia narodowa", "Patriotyzm i nadzieja na wolność"],
      contexts: [
        "Historyczny: Kampania napoleońska 1812 r. i przemarsz wojsk francusko-polskich przez Litwę na Moskwę."
      ],
      antiCardinalShield: [
        "Jacek Soplica NIE zabił Stolnika w zmowie z Moskalami – strzelił w afekcie pod wpływem zranionej dumy, gdy zamek zaatakowali Rosjanie!",
        "Ksiądz Robak i Jacek Soplica to TA SAMA osoba!"
      ]
    },
    {
      id: "wedrowka_na_zachod",
      title: "Wędrówka na Zachód (Małpi Król)",
      author: "Wu Cheng'en",
      epoch: "Renesans (XVI w. / Dynastia Ming) • Klasyka Literatury Światowej",
      type: "Powieść mitologiczno-filozoficzna / epos przygodowy",
      coreTheme: "Duchowa ewolucja człowieka (homo viator), poszukiwanie mądrości i oświecenia, przemiana moralna aroganckiego buntownika w pokornego obrońcę dobra, przezwyciężanie demonów uosabiających ludzkie wady oraz siła przyjaźni i wierności.",
      keyCharacters: [
        { name: "Sun Wukong (Małpi Król)", role: "Kamienna małpa obdarzona nadludzką siłą i magią. Z pychy wywołał bunt w Niebiosach, żądając boskiej pozycji, za co Budda uwięził go na 500 lat pod Górą Pięciu Żywiołów. Uratowany przez mnicha Xuanzanga wstępuje na drogę pokory, służby i odkupienia win. Mimo porywczości staje się najwierniejszym obrońcą pielgrzymki, a złota obręcz na jego głowie symbolizuje konieczność samokontroli i poskromienia ego." },
        { name: "Xuanzang (Tripitaka)", role: "Świątobliwy mnich buddyjski zmierzający do Indii po święte sutry. Uosobienie czystego serca, miłosierdzia, pacyfizmu, a jednocześnie ludzkiej bezbronności wobec zła i pokus." },
        { name: "Zhu Bajie (Wieprzowaty)", role: "Były niebiański dowódca przemieniony w potwora o cechach świni. Uosabia ziemskie słabości ciała: łakomstwo, lenistwo i pożądanie, które musi nieustannie przezwyciężać." },
        { name: "Sha Wujing (Piaskowy Mnich)", role: "Nawrócony demon rzeczny, uosobienie spokoju, równowagi duchowej, pracowitości i niezłomnej lojalności." }
      ],
      universalThemes: [
        "Motyw drogi i dojrzewania wewnętrznego (homo viator)",
        "Bunt przeciwko bóstwom i jego konsekwencje (pycha, upadek i pokuta)",
        "Wina i odkupienie moralne (przemiana Sun Wukonga)",
        "Zmaganie dobra ze złem (demony jako metafory ludzkich namiętności)",
        "Przyjaźń, lojalność i odpowiedzialność za wspólnotę",
        "Dążenie do prawdy duchowej i oświecenia"
      ],
      contexts: [
        "Filozoficzno-religijny: Synteza buddyzmu, taoizmu i konfucjanizmu. Podróż na Zachód to alegoria wędrówki ludzkiego umysłu przez pokusy ku zniszczeniu ego i osiągnięciu harmonii.",
        "Historyczny: Autentyczna, 16-letnia pielgrzymka chińskiego mnicha Xuanzanga jedwabnym szlakiem do Indii (629–645 n.e.) w celu sprowadzenia sanskryckich tekstów buddyjskich."
      ],
      antiCardinalShield: [
        "Status na maturze: 'Wędrówka na Zachód' doskonale nadaje się jako DRUGI UTWÓR LITERACKI lub pogłębiony kontekst literacki/kulturowy (nie jest lekturą obowiązkową MEN, więc błąd w niej nie jest kardynalny, lecz błąd rzeczowy zabiera punkty w KLiK)!",
        "Sun Wukong NIE pokonał Buddy – to Budda ukarał go za pychę i zamknął pod Górą Pięciu Żywiołów na 500 lat!",
        "Pielgrzymi NIE wędrowali po złoto, władzę ani ziemię – ich celem były święte pisma buddyjskie (sutry), mające przynieść wybawienie i ulgę w cierpieniu ludziom!"
      ]
    }
  ],

  // 7. DANE DLA INSPEKTORA CZĘŚCI ROZPRAWKI
  sectionInspectorData: {
    wstep: {
      name: "Wstęp (Wprowadzenie + Teza + Zapowiedź utworów)",
      icon: "📝",
      targetWords: { min: 30, optimal: "Minimum 30 słów", max: 150 },
      description: "Wstęp powinien nakreślić problem (wskazany w temacie) oraz wyrazić Twoje stanowisko (tezę). Wymienienie lektur na tym etapie nie jest wymogiem CKE, ale dopuszczalną opcją.",
      checklist: [
        { id: "thesis", label: "Jasno sformułowana teza (nie wymaga słowa 'uważam')", weight: 3 },
        { id: "problemDef", label: "Zdefiniowanie problemu / pojęć kluczowych tematu", weight: 2 },
        { id: "worksPreview", label: "Wprowadzenie lektur (Opcjonalnie we wstępie)", weight: 2 },
        { id: "wordCount", label: "Wystarczająca objętość (min. ok. 30 słów)", weight: 2 },
        { id: "noCliche", label: "Brak banalnych zwrotów ('Od zarania dziejów', 'W tej pracy postaram się...')", weight: 1 }
      ],
      cliches: [
        "od zarania dziejów",
        "od zawsze",
        "w mojej pracy postaram się",
        "w tej rozprawce postaram się",
        "moim zdaniem uważam",
        "chciałbym udowodnić",
        "w dzisiejszych czasach",
        "jak powszechnie wiadomo"
      ],
      thesisMarkers: [
        "uważam, że",
        "twierdzę, że",
        "jestem przekonany",
        "należy stwierdzić",
        "śmiało można uznać",
        "stanowi dowód",
        "prowadzi do wniosku",
        "jest fundamentem",
        "okazuje się, że",
        "determinuje",
        "decyduje o",
        "weryfikuje"
      ],
      sampleGood: {
        title: "Wzorowy wstęp (10/10 pkt - CKE Formuła 2023)",
        topic: "Źródło nadziei w czasach trudnych dla człowieka.",
        text: "Człowiek wielokrotnie w historii stawał w obliczu sytuacji granicznych – wojen, kataklizmów czy systemów totalitarnych, które burzyły poczucie ładu i bezpieczeństwa. W takich momentach naturalną pokusą staje się rezygnacja i nihilizm. Uważam jednak, że najtrwalszym źródłem nadziei w czasach próby jest bezinteresowna solidarność z drugim człowiekiem oraz wierność elementarnym wartościom moralnym, które pozwalają ocalić godność. Słuszność tej tezy wykażę na przykładzie postawy doktora Rieux w „Dżumie” Alberta Camusa oraz losów Kostylewa w „Innym świecie” Gustawa Herlinga-Grudzińskiego.",
        explanation: "Spełnia 100% wymogów: zarysowuje problem (sytuacja graniczna), stawia wyrazistą tezę, zapowiada oba utwory i autorów, nie zawiera banałów, liczy 82 słowa."
      },
      sampleBad: {
        title: "Wstęp wadliwy (3/10 pkt - Błędy typowe dla maturzystów)",
        topic: "Źródło nadziei w czasach trudnych dla człowieka.",
        text: "Od zarania dziejów ludzie zmagali się z różnymi problemami. W mojej pracy postaram się udowodnić, że nadzieja jest bardzo ważna w życiu każdego człowieka, bo bez niej człowiek nie może żyć. Każdy z nas ma chwile zwątpienia, ale trzeba mieć nadzieję. O tym właśnie pisał Albert Camus w swojej książce Dżuma.",
        explanation: "Błędy: banał na starcie ('Od zarania dziejów'), szkolna zapowiedź ('W mojej pracy postaram się udowodnić'), brak zapowiedzi drugiego utworu, płytka i tautologiczna teza, brak cudzysłowu przy tytule, za mała objętość (58 słów, z czego większość to banały)."
      }
    },
    rozwiniecie: {
      name: "Rozwinięcie (Akapit argumentacyjny z analizą utworu)",
      icon: "📖",
      targetWords: { min: 80, optimal: "100–160 słów", max: 220 },
      description: "Każdy akapit rozwinięcia to zamknięta logicznie całość: teza cząstkowa ➔ pogłębiona analiza motywacji bohatera (nie streszczenie!) ➔ słownictwo analityczne ➔ wniosek cząstkowy.",
      checklist: [
        { id: "topicSentence", label: "Zdanie wprowadzające / teza cząstkowa", weight: 2 },
        { id: "noSummary", label: "Analiza problemowa zamiast czystego streszczenia fabuły", weight: 3 },
        { id: "analyticalVerbs", label: "Użycie czasowników analitycznych (świadczy, uwypukla, unaocznia, dowodzi)", weight: 2 },
        { id: "microConclusion", label: "Wniosek cząstkowy łączący akapit z tezą główną", weight: 2 },
        { id: "wordCount", label: "Optymalna długość akapitu (100–160 słów)", weight: 1 }
      ],
      summaryVerbs: [
        "poszedł", "poszła", "zrobił", "zrobiła", "powiedział", "powiedziała", "i wtedy", "później", "następnie", "potem"
      ],
      analyticalVerbs: [
        "świadczy", "dowodzi", "uwypukla", "unaocznia", "ilustruje", "emanuje", "podkreśla", "symbolizuje", "manifestuje", "odzwierciedla", "wskazuje na", "reprezentuje", "determinuje"
      ],
      microConnectors: [
        "zatem", "w konsekwencji", "powyższy przykład dowodzi", "świadczy to o", "prowadzi to do wniosku", "w rezultacie", "z tego względu"
      ],
      sampleGood: {
        title: "Wzorowy akapit rozwinięcia (10/10 pkt - KLiK + Kompozycja)",
        topic: "Źródło nadziei w czasach trudnych dla człowieka.",
        text: "Potwierdzeniem tezy o ocalającej sile etyki i solidarności jest postawa doktora Bernarda Rieux w „Dżumie” Alberta Camusa. W obliczu śmiercionośnej zarazy trawiącej Oran bohater nie ulega paraliżującemu lękowi ani nie szuka metafizycznych usprawiedliwień dla masowego cierpienia. Rieux traktuje walkę z epidemią nie w kategoriach heroicznego poświęcenia, lecz jako oczywisty imperatyw moralny i elementarną ludzką uczciwość. Decydując się na współtworzenie formacji sanitarnych wraz z Jeanem Tarrou, lekarz dowodzi, że jedyną godną odpowiedzią na absurd zła jest bezinteresowna służba drugiemu człowiekowi. Aktywny opór oraz współczucie stają się dla niego trwałym źródłem wewnętrznej nadziei. Doświadczenie oraneńskiego medyka unaocznia zatem, że w czasach próby człowiek odnajduje ocalenie nie w biernej rezygnacji, lecz w solidarnej obronie elementarnych wartości.",
        explanation: "Perfekcyjna struktura: mocna teza cząstkowa, funkcjonalne odwołanie do postawy (brak pustego streszczania), bogate słownictwo analityczne ('unaocznia', 'dowodzi', 'traktuje w kategoriach'), wyraźny wniosek cząstkowy (134 słowa)."
      },
      sampleBad: {
        title: "Akapit wadliwy (3/10 pkt - Puste streszczenie fabuły)",
        topic: "Źródło nadziei w czasach trudnych dla człowieka.",
        text: "W Dżumie Camusa też widać nadzieję. Był tam doktor Rieux, który leczył ludzi, bo w mieście wybuchła dżuma i ludzie umierali. Wszędzie leżały martwe szczury na ulicach. Potem zamknęli bramy miasta i nikt nie mógł wyjechać. Rieux dużo pracował i pomagał mu Tarrou oraz dziennikarz Rambert. Na koniec epidemia się skończyła i bramy otwarto, ale zmarła żona doktora. To pokazuje, że trzeba pomagać chorym.",
        explanation: "Typowy błąd CKE: relacja fabularna ('leżały szczury', 'zamknęli bramy', 'potem przyszedł Tarrou') zamiast analizy postawy. Płytki wniosek, brak terminologii i refleksji nad motywacjami bohatera."
      }
    },
    kontekst: {
      name: "Kontekst (Automatyczny Weryfikator: Funkcjonalny vs Pozorny)",
      icon: "🌐",
      targetWords: { min: 25, optimal: "40–80 słów", max: 120 },
      description: "Kontekst na 2 pkt CKE MUSI być funkcjonalny – to znaczy wyjaśniać sens utworu, motywacje bohatera lub wymowę sceny. Czysta ciekawostka biograficzna, data czy suchy fakt historyczny to kontekst pozorny (0 pkt CKE)!",
      checklist: [
        { id: "isFunctional", label: "Kontekst funkcjonalny (tłumaczy sens utworu/motywacje bohatera)", weight: 4 },
        { id: "relevance", label: "Ścisły związek z tematem wypracowania", weight: 2 },
        { id: "contextLinkers", label: "Użycie konektorów funkcjonalnych ('co tłumaczy', 'znajduje odzwierciedlenie w', 'koresponduje z')", weight: 2 },
        { id: "noTriviaOnly", label: "Brak 'suchej notki encyklopedycznej' (data urodzenia, biogram bez związku z problemem)", weight: 2 }
      ],
      fakePatterns: [
        "urodził się w",
        "urodziła się w",
        "zmarł w roku",
        "napisał tę książkę w roku",
        "żył w xix wieku",
        "żył w xx wieku",
        "jest polskim pisarzem",
        "jest francuskim pisarzem",
        "otrzymał nagrodę nobla"
      ],
      functionalLinkers: [
        "co tłumaczy",
        "rzuca to światło na",
        "znajduje odzwierciedlenie w",
        "koresponduje z",
        "stanowi filozoficzną podbudowę",
        "pozwala zrozumieć",
        "wpłynęło bezpośrednio na",
        "jest bezpośrednim echem",
        "nadaje utworowi wymiar",
        "uwarunkowania te wyjaśniają"
      ],
      sampleGood: {
        title: "Wzorowy kontekst funkcjonalny (2/2 pkt CKE)",
        topic: "Źródło nadziei / postawa w obliczu próby",
        text: "Rozważania nad postawą doktora Rieux warto wzbogacić o kontekst filozoficzny egzystencjalizmu laickiego Alberta Camusa, wyłożony w eseju „Mit Syzyfa”. Filozof przekonywał, że świat jest ze swej natury absurdalny, a ludzki los przypomina bezowocne wtaczanie głazu. Mimo to bunt przeciw nicości i solidarny wysiłek nadają istnieniu sens. Koncepcja ta bezpośrednio oświetla postawę Rieux: walka z zarazą nie wynika z wiary w ostateczny triumf, lecz stanowi akt moralnego buntu, który przywraca człowiekowi godność i nadzieję.",
        explanation: "Kontekst idealnie funkcjonalny: nie ogranicza się do wzmianki o eseju, lecz precyzyjnie wyjaśnia, DLACZEGO bohater Camusa zachowuje się w dany sposób."
      },
      sampleBad: {
        title: "Zły kontekst pozorny (0/2 pkt CKE - Błąd Egzaminacyjny)",
        topic: "Źródło nadziei / postawa w obliczu próby",
        text: "Kontekstem do Dżumy jest to, że Albert Camus był francuskim pisarzem i filozofem egzystencjalnym, który urodził się w 1913 roku w Algierii, a w 1957 roku zdobył Nagrodę Nobla. Napisał też książkę Obcy i zginął w wypadku samochodowym.",
        explanation: "Kontekst pozorny (0 pkt CKE): zbiór suchych danych encyklopedycznych, które w żaden sposób nie wyjaśniają problemu nadziei ani nie oświetlają wymowy 'Dżumy'."
      }
    },
    zakonczenie: {
      name: "Zakończenie (Parafraza tezy + Synteza wniosków + Puenta)",
      icon: "🏁",
      targetWords: { min: 40, optimal: "50–85 słów", max: 120 },
      description: "Zakończenie nie może być mechanicznym powtórzeniem wstępu! Musi sparafrazować tezę w świetle przeprowadzonych dowodów, dokonać syntezy obu dzieł i zakończyć uniwersalną puentą humanistyczną.",
      checklist: [
        { id: "paraphrase", label: "Parafraza tezy głównej (dojrzalsza, bogatsza w słownictwo)", weight: 3 },
        { id: "synthesis", label: "Synteza wniosków z obu utworów (wspólny mianownik lub kontrast)", weight: 3 },
        { id: "punchline", label: "Ponadczasowa puenta humanistyczna / filozoficzna", weight: 2 },
        { id: "noCliche", label: "Brak banalnych formułek ('I to by było na tyle', 'Wyczerpałem temat')", weight: 1 },
        { id: "wordCount", label: "Optymalna długość (50–85 słów)", weight: 1 }
      ],
      cliches: [
        "i to by było na tyle",
        "uważam że temat wyczerpałem",
        "mam nadzieję że udowodniłem",
        "na tym kończę moją rozprawkę",
        "jak wynika z mojej pracy",
        "kończąc to wypracowanie"
      ],
      synthesisMarkers: [
        "zarówno", "jak i", "zestawienie obu", "oba dzieła", "wspólnym mianownikiem", "losy bohaterów unaoczniają", "w ostatecznym rozrachunku"
      ],
      punchlineMarkers: [
        "kondycja ludzka", "człowieczeństwo", "godność", "wierność sobie", "sens istnienia", "uniwersalna prawda", "ponadczasowy", "wartości moralne"
      ],
      sampleGood: {
        title: "Wzorowe zakończenie (10/10 pkt - CKE Formuła 2023)",
        topic: "Źródło nadziei w czasach trudnych dla człowieka.",
        text: "Podsumowując powyższy wywód, należy stwierdzić, że czasy skrajnej próby nie muszą oznaczać moralnej klęski człowieka. Zarówno postawa doktora Rieux w „Dżumie”, jak i heroiczny bunt Kostylewa w „Innym świecie” dowodzą, że źródło nadziei nie zależy od zewnętrznych okoliczności, lecz bije z wnętrza ludzkiej jednostki. Ostatecznym ocaleniem okazuje się zdolność do międzyludzkiej solidarności oraz niezłomna obrona własnej godności. Dopóki człowiek przedkłada wierność wartościom nad wygodę przetrwania, dopóty żadna ciemność nie zdoła pozbawić go sensu istnienia.",
        explanation: "Perfekcyjna synteza: parafraza tezy bez powtórzeń, synteza obu bohaterów (Rieux i Kostylew), głęboka puenta humanistyczna (79 słów)."
      },
      sampleBad: {
        title: "Zakończenie wadliwe (2/10 pkt - Płytkie i banalne)",
        topic: "Źródło nadziei w czasach trudnych dla człowieka.",
        text: "I to by było na tyle w mojej rozprawce. Uważam, że udowodniłem swoją tezę, że nadzieja jest bardzo potrzebna. Pokazali to bohaterowie Dżumy i Innego świata. Mam nadzieję, że temat wyczerpałem i dostałem dobrą ocenę.",
        explanation: "Porażka stylistyczna: potoczne banały ('to by było na tyle', 'dostałem dobrą ocenę'), brak syntezy, brak puenty filozoficznej, urwanie myśli."
      }
    }
  },

  // 8. QUIZ WERYFIKACYJNY OD ZERA DO 100%
  quizQuestions: [
    {
      id: 1,
      question: "Co według kryteriów CKE oznacza popełnienie błędu kardynalnego w wypracowaniu maturalnym?",
      options: [
        "Utratę 2 punktów za poprawność rzeczową w kryterium KLiK.",
        "Całkowite wyzerowanie wypracowania (0/35 punktów).",
        "Konieczność powtórzenia egzaminu w terminie poprawkowym w sierpniu.",
        "Obniżenie oceny za język do zera."
      ],
      correct: 1,
      explanation: "Błąd kardynalny świadczy o całkowitej nieznajomości lektury obowiązkowej i skutkuje przyznaniem 0 pkt za całe wypracowanie!"
    },
    {
      id: 2,
      question: "Jaki jest żelazny limit słów w notatce syntetyzującej (Część 1 arkusza)?",
      options: [
        "Minimum 100 słów bez górnego limitu.",
        "Od 40 do 80 słów.",
        "Od 60 do 90 słów.",
        "Dokładnie 50 słów."
      ],
      correct: 2,
      explanation: "CKE rygorystycznie wymaga od 60 do 90 słów. Praca poniżej 60 lub powyżej 90 słów traci punkty za warunki formalne!"
    },
    {
      id: 3,
      question: "Jak kończą się losy Stanisława Wokulskiego w powieści 'Lalka' Bolesława Prusa?",
      options: [
        "Żeni się z Izabelą Łęcką i prowadzi sklep w Paryżu.",
        "Ginie pod kołami pociągu w Skierniewicach.",
        "Wysadza ruiny zamku w Zasławiu i znika w niewyjaśnionych okolicznościach.",
        "Zostaje aresztowany przez carską policję i zesłany na Sybir."
      ],
      correct: 2,
      explanation: "Wokulski próbuje popełnić samobójstwo w Skierniewicach, lecz zostaje uratowany. Następnie wysadza zamek w Zasławiu i jego los pozostaje tajemnicą."
    },
    {
      id: 4,
      question: "Przed którym z poniższych spójników ZAWSZE stawiamy przecinek w języku polskim?",
      options: [
        "oraz",
        "albo",
        "ponieważ",
        "tudzież"
      ],
      correct: 2,
      explanation: "'Ponieważ' to spójnik podrzędny przyczynowy – zawsze oddzielamy zdanie podrzędne przecinkiem!"
    },
    {
      id: 5,
      question: "Kto gubi złoty róg w finale 'Wesela' Stanisława Wyspiańskiego?",
      options: [
        "Gospodarz",
        "Jasiek",
        "Dziennikarz",
        "Chochoł"
      ],
      correct: 1,
      explanation: "Złoty róg gubi Jasiek, gdy schyla się po czapkę z pawich piór."
    },
    {
      id: 6,
      question: "Czym różni się kontekst funkcjonalny od pozornego w wypracowaniu maturalnym CKE?",
      options: [
        "Kontekst funkcjonalny musi liczyć co najmniej 100 słów.",
        "Kontekst funkcjonalny bezpośrednio wyjaśnia sens i motywacje bohaterów utworu, a pozorny jest tylko 'suchą ciekawostką'.",
        "Kontekst funkcjonalny może dotyczyć tylko biografii autora.",
        "CKE nie różnicuje kontekstów – każdy kontekst daje maksymalną liczbę punktów."
      ],
      correct: 1,
      explanation: "Egzaminator CKE nagradza kontekst tylko wtedy, gdy uczeń wyjaśni, JAK wpływa on na rozumienie utworu i problemu z tematu."
    },
    {
      id: 7,
      question: "Kogo zamordował Rodion Raskolnikow w powieści 'Zbrodnia i kara'?",
      options: [
        "Wyłącznie sędziego śledczego Porfirego Pietrowicza.",
        "Starą lichwiarkę Alonę Iwanowną oraz jej ciężarną siostrę Lizawietę.",
        "Sonię Marmieładową i jej ojca.",
        "Swego przyjaciela Razumichina."
      ],
      correct: 1,
      explanation: "Raskolnikow zaplanował morderstwo lichwiarki Alony, lecz zabił także jej siostrę Lizawietę, która nieoczekiwanie weszła do mieszkania."
    },
    {
      id: 8,
      question: "Ile wynosi minimalna liczba wyrazów w wypracowaniu na poziomie podstawowym (Formuła 2023)?",
      options: [
        "200 słów",
        "250 słów",
        "300 słów",
        "400 słów"
      ],
      correct: 2,
      explanation: "Minimalny limit to równe 300 słów. Praca poniżej 300 wyrazów podlega surowej ocenie i otrzymuje 0 pkt za kompozycję i język!"
    },
    {
      id: 9,
      question: "Kto w III części 'Dziadów' wypowiada bluźniercze słowo nazywające Boga carem?",
      options: [
        "Konrad własnymi ustami w uniesieniu.",
        "Diabeł (głos z lewej strony), po tym jak Konrad zemdlał.",
        "Ksiądz Piotr podczas egzorcyzmów.",
        "Senator Nowosilcow."
      ],
      correct: 1,
      explanation: "To kluczowy fakt antykardynalny: Konrad mdleje przed wypowiedzeniem tego słowa, a bluźnierstwo kończy diabeł!"
    },
    {
      id: 10,
      question: "Gdzie należy postawić przecinek w zdaniu ze zbiegiem spójników: 'Wiedział że jeśli nie ucieknie to zginie'?",
      options: [
        "Wiedział że, jeśli nie ucieknie to zginie",
        "Wiedział, że jeśli nie ucieknie, to zginie",
        "Wiedział, że, jeśli nie ucieknie to zginie",
        "Wiedział że jeśli, nie ucieknie, to zginie"
      ],
      correct: 1,
      explanation: "Przecinek stawiamy PRZED całym zbiegiem ('Wiedział, że jeśli...') oraz przed członem wynikowym ('...nie ucieknie, to zginie')."
    }
  ]
};
