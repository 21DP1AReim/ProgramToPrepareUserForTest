
const question = document.getElementById('question');
// Izveido masīvu ar 4  elementiem, katrs atbilst uz vienu no 4 izvēles opcijām, kas ir testā
// Atsķirt izvēli vienu no otras izmantojot dataset, katrai izvēlei ir savs īpaš cipars pie 'number'
const choices = Array.from(document.getElementsByClassName('izveles-text'));
const timer = document.getElementById("timer");

let questionCountPerTheme = 0
let currentQuestionIndex = 0
let correctQuestionArray = []
let userAnswerArray = []
let wrongIds = []
let selectedChoice = 0;
let currentQuestion;
let selectedAnswer;
let correctAnswer;
let wrongQuestionIndex = 0
let sec = 0;
let min = 0;
let hr = 0;
let interval;
let elapsedTime;
let startTime;
const wrongQuestion = document.getElementById('questionEndScreen');
const rightAnwer =  document.getElementById('rightChoice');
const wrongAnser = document.getElementById('wrongChoice');
let testQuestions = []
let arrLength = 0
let pvQuestions = [ // programmēšanas valodu jautājumi
{
    question: "Kuru no nosauktajiem operatoriem Java valodā ieteicams izmantot, ja nepieciešams noteikt, vai skaitlis ir pāra vai nepāra? Kā arī nav neviens no tiem kuriem tie nav tātad ir tas kurš viņs ir bet nav tas kas nav ", 
    choice1: "/ ", 
    choice2: "% ", 
    choice3: "\\", 
    choice4: " ^ ", 
    answer: 2 
},
{
    question: "Masīva elementi ir sakārtoti… ", 
    choice1: "Vērtību augošā secībā ", 
    choice2: "Indeksu augošā secībā ", 
    choice3: "Indeksu dilstošā secībā ", 
    choice4: "Vērtību dilstošā secībā ", 
    answer: 2 
},
{
    question: " Kurš no apgalvojumiem Visual Basic valodā ir pareizs? ", 
    choice1: " Dinamiskā masīva garums programmas laikā nevar mainīties ", 
    choice2: " Fiksēta masīva garums programmas laikā var tikt mainīts tikai vienu reizi ", 
    choice3: " Dinamiskā masīva garums programmas laikā var tikt mainīts vairākas reizes ", 
    choice4: " Dinamiskā masīva garums programmas laikā var tikt mainīts tikai vienu reizi ", 
    answer: 3 
},
{
    question: " Kas Visual Basic valodā norāda Do cikla beigas? ", 
    choice1: " Loop ", 
    choice2: " Exit ", 
    choice3: " Until ", 
    choice4: "  Next ", 
    answer: 2 
},
{
    question: " Kas norāda konkrēto masīva elementu? ", 
    choice1: " Masīva garums  ", 
    choice2: " Masīva nosaukums ", 
    choice3: " Masīva indekss ", 
    choice4: " Elementa vērtība ", 
    answer: 3 
},
{
    question: " Ja kāds operators vai operatoru grupa programmā jāizpilda vairākas reizes pēc kārtas, tad izdevīgi ir veidot… ", 
    choice1: "  Rekursiju ", 
    choice2: " Ciklu ", 
    choice3: " Funkciju ", 
    choice4: " Komandu  ", 
    answer: 2 
},
{
    question: " Kurš no cikliem Pascal programmēšanas valodā var neizpildīties pat vienu reizi? ", 
    choice1: " Repeat …. Until ", 
    choice2: " For … to …. Do … ", 
    choice3: " While … do …. ", 
    choice4: " For … Downto …. Do … ", 
    answer: 1  
},
{
    question: " Kāds operators jāizmanto C++ vai Java programmēšanas valodā, lai salīdzinātu divas atšķirīgas vērtības?  ", 
    choice1: " == ", 
    choice2: " != ", 
    choice3: " <> ", 
    choice4: " >< ", 
    answer: 1  
},
{
    question: " Ja pirms cikla beigām nepieciešams iziet no cikla, tad Visual Basic valodā izmanto… ", 
    choice1: " Exit  ", 
    choice2: " Loop ", 
    choice3: " Next ", 
    choice4: " Until  ", 
    answer: 1 
},
{
    question: "  Kā Java programmēšanas valodā pārbaudīt, vai divu teksta izteiksmju vērtības ir vienādas? ", 
    choice1: " String1 == String2  ", 
    choice2: " String1.equals(String2) ", 
    choice3: " String1 = String2 ", 
    choice4: " String1 <> String2 ", 
    answer: 2 
},
{
    question: " Datu objekts, kura datu vērtība ir cita datu objekta adrese, ir… ", 
    choice1: " Klons ", 
    choice2: " Masīvs ", 
    choice3: " Publiskais mainīgais ", 
    choice4: " Rādītājs (Pointer)  ", 
    answer: 4 
},
{
    question: " Kas ir klase objektorientētā programmēšanā? ", 
    choice1: "  Šablons, pēc kura tiek veidoti objekti ", 
    choice2: " Objektu grupa ", 
    choice3: " Funkciju un mainīgo grupa ", 
    choice4: " Šablons, pēc kura tiek veidotas saskarnes (interfeisi)  ", 
    answer:  1 
},
{
    question: " Kāda ir komponentu un klašu savstarpēja attiecība? ", 
    choice1: " Katrs komponents pieder noteiktai klasei  ", 
    choice2: " Katra klase pieder noteiktam komponentam ", 
    choice3: " Komponenta un klases jēdzieni savā starpā nav saistīti ", 
    choice4: " Tie ir sinonīmi ", 
    answer: 1 
},
{
    question: " Kas ir objekts objektorientētā programmēšanā?  ", 
    choice1: " Pēc klases šablona izveidots mainīgais ", 
    choice2: " Komponenta sinonīms ", 
    choice3: " Klases sinonīms ", 
    choice4: " Komponenta vizuālais attēls  ", 
    answer: 1 
},
{
    question: " Kura no nosauktajām nav objektorientēta programēšanas valoda? ", 
    choice1: " C ", 
    choice2: " Java ", 
    choice3: " Python ", 
    choice4: "  PHP ", 
    answer: 1 
},
{
    question: " Kurš ir mūsdienās visizplatītākais programmēšanas virziens?  ", 
    choice1: " Objektorientētā programmēšana ", 
    choice2: " Strukturālā programmēšana ", 
    choice3: " Vizuālā programmēšana ", 
    choice4: " Makroprogrammēšana  ", 
    answer: 1 
},
{
    question: " Ja mainīgais deklarēts modulī publisks (public), tad tas ir pieejams...  ", 
    choice1: " Visām apakšprogrammām konkrētajā modulī ", 
    choice2: " Konkrētai apakšprogrammai konkrētā modulī ", 
    choice3: " Konkrētai apakšprogrammai, bet tā vērtība tiek saglabāta visā izpildes laikā ", 
    choice4: " Visām apakšprogrammām visos moduļos projektā ", 
    answer: 4 
},
{
    question: " Kuru mainīgā nosaukumu nevar piešķirt programmēšanā? ", 
    choice1: " aa  ", 
    choice2: " a1 ", 
    choice3: " 1a ", 
    choice4: " Konstante ", 
    answer: 3 
},
{
    question: " Datu tipu pārvēršanas funkcijas un procedūras izmanto...  ", 
    choice1: " Skaitļu ievadei un izvadei STRING tipa laukos  ", 
    choice2: " Masīvu bāzes tipu izmaņai ", 
    choice3: " Failu formāta maiņai ", 
    choice4: " Jebkura datu tipa pārvēršanai citā datu tipā ", 
    answer: 4  
},
{
    question: " Objektorientētā programmēšana raksturojas ar...  ", 
    choice1: " Lineāras programmas klātbūtne ", 
    choice2: " Programmas dalīšana moduļos ", 
    choice3: " Visu objektu apvienošana ar vienas struktūras mainīgo ", 
    choice4: " Procedūras un funkcijas ", 
    answer: 2 
},
{
    question: " Kādos gadījumos objektorientētās programmēšanas klasē jābūt iebūvētam kopēšanas konstruktoram? ", 
    choice1: " Kad vajadzīgs nodot klases elementus ", 
    choice2: " Operācijas izpildei viena elementa piesavināšanai citam ", 
    choice3: " Lai izveidotu funkciju ", 
    choice4: " Lai iznīcinātu objektu no atmiņas ", 
    answer: 2 
},
{
    question: " Kāds bija programmatūras inženierijas radīšanas iemesls?  ", 
    choice1: " Strauja datortehnikas attīstība ", 
    choice2: " Microsoft korporācijas aktīva darbība ", 
    choice3: " Programmatūras kvalitātes krīze ", 
    choice4: " Nepietiekams zinātnisko grādu skaits šajā jomā ", 
    answer: 3 
},
{
    question: " Kurš no relāciju saišu tipiem nav vēlams ER modelī?  ", 
    choice1: " One-to-one ", 
    choice2: " One-to-many ", 
    choice3: " Many-to-many ", 
    choice4: " ER diagrammās var izmantot jebkurus saišu tipus  ", 
    answer: 4 
},
{
    question: " Kurš no uzskaitītajiem datu tipiem atgriež True vai False vērtības?  ", 
    choice1: " Bool vai Bolean ", 
    choice2: " Integer vai Long Int ", 
    choice3: " Char vai unsigned char ", 
    choice4: " Double vai long Double ", 
    answer: 1 
},
{
    question: " Ko programmēšanā nozīmē vārds operators?  ", 
    choice1: " Cilvēks, kurš strādā ar datoru ", 
    choice2: " Pabeigta valodas frāze, kas nosaka kādu etapu datu apstrādē ", 
    choice3: " Mainīgais, kas pēc katras darbības maina savu vērtību ", 
    choice4: " Datu elementi, kuri programmas izpildes gaitā nemaina savu vērtību  ", 
    answer: 4 
},
{
    question: " Kas ir masīvs?  ", 
    choice1: " Elementu kopa, kur katram elementam ir savs neatkārtojams indekss  ", 
    choice2: " Liels atmiņas apjoms ", 
    choice3: " Datu struktūra, kas sastāv no noteikta skaita komponenšu ", 
    choice4: " Programmas definīciju daļa  ", 
    answer: 1 
},
{
    question: " Ja ir zināms cikla atkārtošanās reižu skaits, visefektīvāk ir lietot…  ", 
    choice1: " Beznosacījuma pārejas operatoru ", 
    choice2: " Ciklu ar priekšnosacījumu ", 
    choice3: " Ciklu ar pēcnosacījumu ", 
    choice4: " Ciklu ar skaitītāju ", 
    answer: 4 
},
{
    question: " Ja vēlas, lai cikls izpildās vismaz vienu reizi, tad jālieto...  ", 
    choice1: " Beznosacījuma pārejas operators  ", 
    choice2: " Cikls ar priekšnosacījumu ", 
    choice3: " Cikls ar pēcnosacījumu ", 
    choice4: " Cikls ar skaitītāju ", 
    answer: 3 
},
{
    question: " Kuras ir teksta funkcijas, kas nosaka virknes garumu? ", 
    choice1: "  Strlen vai length ", 
    choice2: " Strcat vai concant ", 
    choice3: " Strcpy vai copy ", 
    choice4: " Strcmp ", 
    answer: 1 
},
{
    question: " Kas ir masīva indekss? ", 
    choice1: " Tas pats, kas atsevišķs masīva elements  ", 
    choice2: " Masīva elementa numurs ", 
    choice3: " Masīva rindas numurs ", 
    choice4: " Masīva pirmais elements ", 
    answer: 2 
},
{
    question: " Kā sauc mainīgos, kas definēti klases metodes iekšienē?  ", 
    choice1: " Konstantes  ", 
    choice2: " Statiskie mainīgie ", 
    choice3: " Lokālie mainīgie ", 
    choice4: " Privātie mainīgie ", 
    answer: 3 
},
{
    question: " Kāda loma ir klases metodēm?  ", 
    choice1: " Parādīt objekta uzvedību ", 
    choice2: " Parādīt objekta atribūtu ", 
    choice3: " Parādīt citas klases uzvedību ", 
    choice4: " Slēpt klases atribūtus ", 
    answer: 1 
},
{
    question: " Kas ir konstruktors?  ", 
    choice1: " Metode, kura tiek izsaukta pirmā, lai visiem mainīgajiem piešķirtu noklusētās vērtības  ", 
    choice2: " Metode, kura tiek izsaukta pirmā, lai inicializētu klases objektu ", 
    choice3: " Klases speciālā metode, lai rezervētu atmiņu klases objektam ", 
    choice4: " Klases speciālā metode, lai rezervētu atmiņu klases mainīgajiem  ", 
    answer: 2 
},
{
    question: " Kas ir destruktors? ", 
    choice1: "  Metode, kuru pēdējo izsauc pirms klases objekta izlādēšanas ", 
    choice2: " Klases speciālā metode lai atbrīvotu atmiņu no klases objekta ", 
    choice3: " Klases speciālā metode, lai atbrīvotu atmiņu klases mainīgajiem ", 
    choice4: " Metode, kuru var izsaukt, lai mainīgajiem noņemtu noklusētās vērtības ", 
    answer: 3 
},
{
    question: " Instrukcija void tiks izmantota, lai… ", 
    choice1: " Pārtrauktu metodes darbību  ", 
    choice2: " Varētu izveidot metodi, kura neatgriež rezultātus ", 
    choice3: " Metode varētu atgriezt vairākas metodes ", 
    choice4: " Varētu metodei deklarēt vairākus parametrus ", 
    answer: 2 
},
{
    question: " Ko metodēm dod atslēgvārds static?  ", 
    choice1: " Metodes atgriežamā vērtība kļūst nemainīga  ", 
    choice2: " Metodes neveic nekādu darbību ", 
    choice3: " Metodes pieder klasei un var tikt izsauktas bez klases objekta ", 
    choice4: " Metodes var izsaukt tikai no klases iekšienes ", 
    answer: 3 
},
{
    question: " Kas raksturīgs ar atslēgvārdu static definētai klasei  ", 
    choice1: " Tā ir parasta klase bez iespējas izveidot metodes ar parametru public ", 
    choice2: " Tā ir parasta klase bez iespējas izveidot klases instanci objektu ", 
    choice3: " Tā ir parasta klase bez iespējas izveidot metodes ar parametru private ", 
    choice4: " Tā ir parasta klase bez iespējas definēt savus mainīgos ", 
    answer: 2 
},
{
    question: " Konstrukcijas try {} catch{} finally {} izmanto, lai...  ", 
    choice1: " Veidotu sarežģītas datu struktūras ", 
    choice2: " Veidotu standarta metožu risinājumus ", 
    choice3: " Pārbaudītu datu kvalitāti ", 
    choice4: " Veidotu kļūdu apstrādi  ", 
    answer: 4 
},
{
    question: " Kādiem nolūkiem tiek lietots atslēgvārds void?  ", 
    choice1: " Jaunas klases mainīgo definēšanai ", 
    choice2: " Lai definētu, ka metodei nav atgriežamā tipa un vērtības ", 
    choice3: " Jaunas klases metožu definēšanai ", 
    choice4: " Metodes beigu definēšanai ", 
    answer: 2
},
{
    question: " Atslēgvārdu return lieto, lai...  ", 
    choice1: "  Definētu jaunus klases mainīgos ", 
    choice2: " Pārtrauktu metodes izpildi ", 
    choice3: " Definētu metodes beigas ", 
    choice4: " Definētu jaunas klases metodes ", 
    answer: 2 
},
{
    question: " Return konstrukciju nelieto metodēm, kuras definētas kā...  ", 
    choice1: " Void ", 
    choice2: " Private ", 
    choice3: " Public ", 
    choice4: " Static ", 
    answer: 1 
},
{
    question: " Atslēgvārdu \"this\" lieto, lai ..  ", 
    choice1: " Definētu jaunus klases mainīgos ar speciālām tiesībām  ", 
    choice2: " Piekļūtu klases objektiem kā referencēm ", 
    choice3: " Veidotu klases kopijas, kur jaunai klasei varētu piekļūt ar atslēgvārdu this ", 
    choice4: " Klases mainīgajiem piešķirtu speciālas tiesības ", 
    answer: 2 
},
{
    question: " Ko dod klases metodēm uzstādīta pazīme private? (Piem., private int summ (int a, int b)) ", 
    choice1: " Metode nevar saturēt ieejas parametrus ", 
    choice2: " Metodi nevar izsaukt citas klases ", 
    choice3: " Metodes ir redzama, bet nav lietojama klases lietotājiem ", 
    choice4: " Metodes nav redzams klases lietotājiem ", 
    answer: 2 
},
{
    question: " Ko dod klases mainīgajiem uzstādīta pazīme private? (Piem., private int a; private int b;) ) ", 
    choice1: " Mainīgajiem nevar piešķirt jaunas vērtības  ", 
    choice2: " Mainīgais nav lietojams ārpus klases ", 
    choice3: " Mainīgais nav redzams klases lietotājam ", 
    choice4: " Mainīgos nevar lietot matemātiskās operācijās ", 
    answer: 2 
},
{
    question: "  Ko dod klases mainīgajiem uzstādīta pazīme public? (Piem: Public int a; public int b;) ) ", 
    choice1: " Mainīgajiem vajag piešķirt jaunas vērtības pie katra izsaukuma ", 
    choice2: " Mainīgo var izmantot tikai matemātiskās operācijās ", 
    choice3: " Mainīgais nav redzams un izmantojams ārpus klases ", 
    choice4: " Mainīgais ir redzams un izmantojams klases lietotājam  ", 
    answer: 1 
},
{
    question: " Kura ir vismazākā programmēšanas vienība? ", 
    choice1: " Apakšsistēma ", 
    choice2: " Programma ", 
    choice3: " Modulis ", 
    choice4: " Procedūra  ", 
    answer: 4 
},
{
    question: " Galīga sakārtota viennozīmīgu kārtulu kopa kādas problēmas risināšanai ir… ", 
    choice1: " Modelis ", 
    choice2: " Algoritms ", 
    choice3: " Simulācija ", 
    choice4: " Programma ", 
    answer: 2 
},

{
    question: " Programma konkrētajā datora valodā ir…  ", 
    choice1: " Bloks  ", 
    choice2: " Modulis ", 
    choice3: " Kods ", 
    choice4: " Algoritms ", 
    answer: 3 
},
{
    question: " Kad viena klase no otras iegūst vienu vai vairākus atribūtus un metodi, to sauc par ...  ", 
    choice1: " Polimorfismu ", 
    choice2: " Mantošanu ", 
    choice3: " Klasi ", 
    choice4: " Funkciju ", 
    answer: 2 
},
{
    question: " Procesu, sistēmu vai to darbības aprakstīšana vai attēlošana ar matemātisku modeļu palīdzību ir…  ", 
    choice1: " Strukturēšana ", 
    choice2: " Modelēšana ", 
    choice3: " Kodēšana ", 
    choice4: " Programmēšana  ", 
    answer: 2 
},
{
    question: " Pie kuras datu grupas Pascal valodā pieder reālo skaitļu datu tips? ", 
    choice1: " Skalārie ", 
    choice2: " Strukturētie ", 
    choice3: " Pārsūtāmie ", 
    choice4: " Simbolu ", 
    answer: 1 
},
{
    question: " Kas piemīt katram objektam objektorientētajā programmēšanas vidē? ", 
    choice1: " Procedūras, funkcijas, mainīgie ", 
    choice2: " Īpašības, metodes, notikumi ", 
    choice3: " Kods, dati, darbības ", 
    choice4: " Logi, formas, vadīklas ", 
    answer: 3 
},
{
    question: " Kura no funkcijām Pascal un C++ vidē atgriež skaitļa veselo daļu?  ", 
    choice1: " Round ", 
    choice2: " Mid ", 
    choice3: " Odd ", 
    choice4: " Trunc  ", 
    answer: 1 
},
{
    question: " Kāda veida programmēšanas valodas mūsdienās izmanto visplašāk?  ", 
    choice1: "  Skriptu ", 
    choice2: " Imperatīvās ", 
    choice3: " Funkcionālās ", 
    choice4: " Objektorientētās  ", 
    answer: 4 
},
{
    question: " Masīvu elementiem C++ programmēšanas valodā ir vienāds...  ", 
    choice1: " Nosaukums ", 
    choice2: " Datu tips ", 
    choice3: " Izmērs ", 
    choice4: " Vērtība ", 
    answer: 2 
},
{
    question: " Katra C++ programmas izpilde iesākas ar funkciju...  ", 
    choice1: " Void ", 
    choice2: " Include ", 
    choice3: " Main ", 
    choice4: " Using ", 
    answer: 2 
},
{
    question: " C++ programmēšanas valodā skaitlis, kas ir izmantojams norādei uz atsevišķa masīva (array) elementu, ir...  ", 
    choice1: " Tips ", 
    choice2: " Indekss ", 
    choice3: " Nozīme ", 
    choice4: " Pozīcija ", 
    answer: 2 
},
{
    question: " Kas ir indentifikators C++ valodā?  ", 
    choice1: " Zīmju secība, kas sākas ar burtu vai uzsver zīmi ", 
    choice2: " Zīmju secība ", 
    choice3: " Zīmju secība, kas sākas ar burtu ", 
    choice4: " Zīmju secība, kas sākas ar uzsver zīmi ", 
    answer: 4 
},
{
    question: " Rādītāja inicializēšanai C++ programmēšanas valodā var izmantot...  ", 
    choice1: " Null ", 
    choice2: "0 ", 
    choice3: " Adresi ", 
    choice4: " Public ", 
    answer: 3 
},
{
    question: " Vesels skaitlis, kurš var būt piešķirts rādītājam C++ programmēšanas valodā ir... ", 
    choice1: " Nulle  ", 
    choice2: " Pozitīvais ", 
    choice3: " Negatīvais ", 
    choice4: " Naturālais ", 
    answer: 1 
},
{
    question: "  Kādiem skaitļiem C++ programmēšanas valodā ir pielietojama operācija %? ", 
    choice1: " Veseliem ", 
    choice2: " Reāliem ", 
    choice3: " Veseliem un reāliem ", 
    choice4: " Nav pielietojama  ", 
    answer: 1 
},
{
    question: " Starp kādiem simboliem iekļaujas komentāri C++ programmēšanas valodā? ", 

    choice1: " { } ", 

    choice2: "/* */ ", 

    choice3: " [ ] ", 

    choice4: " /% %/ ", 

    answer: 2 
},
{
    question: " Ja netiks norādīts mainīgo datu tips C++ programmēšanas valodā, tad kāds tips tiek uzlikts pēc noklusējuma? ", 
    choice1: "  int ", 
    choice2: " char ", 
    choice3: " short ", 
    choice4: "  long ", 
    answer: 1 
},
{
    question: " Kādas operācijas nav C++ valodā?  ", 
    choice1: " Virknes ", 
    choice2: " Unāras ", 
    choice3: " Bināras ", 
    choice4: " Ternāras ", 
    answer: 4 
},
{
    question: " C++ valodā literāls ir...  ", 
    choice1: " Rezervētā tipa mainīgais ", 
    choice2: " Nemaināmais valodas objekts ", 
    choice3: " Rinda ", 
    choice4: " Burts  ", 
    answer: 2 
}

]

let dbQuestions = [ // Datu bazu jautajumi 
{
    question: " Kura no dotajām nav datu bāzu vadības sistēma? ", 
    choice1: " MySQL ", 
    choice2: " Oracle ", 
    choice3: " PHP ", 
    choice4: " MS Access ", 
    answer: 3 
},
{
    question: " Datu bāzu struktūras attēlošanai izmanto ER diagrammas. Ko nozīmē saīsinājums 'ER'? ", 
    choice1: " Entity relation ", 
    choice2: " Emty real ", 
    choice3: " Energy relation ", 
    choice4: " Evalution tool ", 
    answer: 1 
},
{
    question: " Kuru no tabulas atribūtiem parasti apzīmē ar zvaigznīti (*) vai izceļ ar pustrekniem burtiem, projektējot datubāzi? ", 
    choice1: " Jaunu lauku ", 
    choice2: " Saistošu jeb ārēju atslēgu ", 
    choice3: " Primāru atslēgu ", 
    choice4: " Jaunu ierakstu ", 
    answer: 3 
},
{
    question: " Ko reprezentē relāciju datu bāzes tabulas rindas? ", 
    choice1: " Relācijas ", 
    choice2: " Atribūtus ", 
    choice3: " Kolonnas ", 
    choice4: " Unikālus ierakstus ", 
    answer: 2 
},
{
    question: " Kuru no tabulu saišu veidiem nav iespējams realizēt tiešā veidā? ", 
    choice1: " Viens pret vien ", 
    choice2: " Viens pret daudziem ", 
    choice3: " Daudzi pret daudziem ", 
    choice4: " Daudzi pret viens ", 
    answer: 3 
},
{
    question: " Kas ir primārā atslēga? ", 
    choice1: " Atslēga, kas seko pirms sekundāras atslēgas ", 
    choice2: " Parole datu bāzes pārbaudei ", 
    choice3: " Lauks, kas nodrošina katra ieraksta dublēšanu ", 
    choice4: " Unikāls identifikators, kuru izmanto tabulu saistībām ", 
    answer: 4 
},
{
    question: " Kas ir ER modelis? ", 
    choice1: " Grafisks līdzeklis datu bāzes struktūras attēlošanai ", 
    choice2: " Datu bāzes vienas datu tabulas lauku saraksts ", 
    choice3: " Vaicājumu veidošanas loga komponente ", 
    choice4: " Informācijas plūsmas struktūra ", 
    answer: 1 
},
{
    question: " Kādām vērtībām ir paredzēta šāda ievada maska: >L <?????", 
    choice1: " Vērtībām, kurās pirmais burts ir mazs, bet visi pārējie lieli ", 
    choice2: " Vērtībām, kurās pirmais burts ir liels, bet visi pārējie mazi ", 
    choice3: " Vērtībām, kurās visi burti ir mazi ", 
    choice4: " Vērtībām, kurās visi burti ir lieli ", 
    answer: 2 
},
{
    question: " Kādām vērtībām ir paredzēta šāda ievada maska: >L <?????", 
    choice1: " Vērtībām, kurās pirmais burts ir mazs, bet visi pārējie lieli ", 
    choice2: " Vērtībām, kurās pirmais burts ir liels, bet visi pārējie mazi ", 
    choice3: " Vērtībām, kurās visi burti ir mazi ", 
    choice4: " Vērtībām, kurās visi burti ir lieli ", 
    answer: 2 
},
{
    question: " Kādas datu apkopes funkcijas var izmantot, veidojot pārskatus ar veidņa palīdzību? ", 
    choice1: " Count, Sum, Avg ", 
    choice2: " Sum, Min, Max, Multiply ", 
    choice3: " Sum, Avg, Min, Max ", 
    choice4: " Sum, Avg, Min, Max, Std ", 
    answer: 3 
},
{
    question: " Kurš no apgalvojumiem visprecīzāk apraksta datu bāzi? ", 
    choice1: " Liela tabula ar sākotnējiem datiem ", 
    choice2: " Sistematizēta informācijas glabātuve ", 
    choice3: " Saraksts ar kolonnu un rindu nosaukumiem ", 
    choice4: " Vaicājumu kopums, kas veido tabulas ", 
    answer: 4 
},
{
    question: " Relāciju datu bāze... ", 
    choice1: " Nodrošina veselu skaitļu saites ", 
    choice2: " Sastāv no atsevišķām tabulām ar saistītiem datiem ", 
    choice3: " Automātiski ievada un glabā informāciju ", 
    choice4: " Atlasa datus ar eksistējošo vaicājumu palīdzību ", 
    answer: 2 
},
{
    question: " Vai tabulā, kurā ir atslēgas lauks, drīkst būt vienādas rindas, t.i. divās dažādās rindās vērtības sakrīt visos laukos, kas veido primāro atslēgu? ", 
    choice1: " Nē, nedrīkst ", 
    choice2: " Jā, drīkst ", 
    choice3: " Jā, ja tabulā ir tikai 3 lauki ", 
    choice4: " Jā, ja tabulā nav ierakstu ", 
    answer: 1 
},
{
    question: " Kāds ir primārā atslēgas lauka uzdevums? ", 
    choice1: " Izdzēsto ierakstu numuru glabāšana ", 
    choice2: " Ieraksta lauku saskaitīšana ", 
    choice3: " Ierakstu viennozīmīga identificēšana ", 
    choice4: " Esošā/aktuālā ieraksta numuru glabāšana ", 
    answer: 3 
},
{
    question: " Kas ir tabulas lauka indekss? ", 
    choice1: " Lauka viennozīmīgs identifikators ", 
    choice2: " Ieraksta kārtas numurs ", 
    choice3: " Lauka kārtas numurs ", 
    choice4: " Datu struktūra, kas paātrina datu meklēšanu un kārtošanu datu laukā ", 
    answer: 1 
},
{
    question: " Datu tabulām nav... ", 
    choice1: " Kolonnu (Column) ", 
    choice2: " Indeksu (Index) ", 
    choice3: " Ierobežojumu (Constraint) ", 
    choice4: " Skatu (View) ", 
    answer: 3 
},
{
    question: " Kādu komandu lieto, lai izveidotu datubāzi? ", 
    choice1: " CREATE TABLE \"Nosaukums\" ", 
    choice2: " CREATE DATABASE \"Nosaukums\" ", 
    choice3: " CREATE INDEX \"Nosaukums\" ", 
    choice4: " CREATE VIEW \"Nosaukums\" ", 
    answer: 2 
},
{
    question: " Kādu operatoru lieto, lai sakārtotu vienas vai vairāku kolonu datus augošā vai dilstošā secībā ", 
    choice1: " CREATE VIEW ", 
    choice2: " ORDER BY ", 
    choice3: " GROUP BY ", 
    choice4: " SELECT ", 
    answer: 2 
},
{
    question: " Kādu operatoru lieto, lai atlasītu visus unikālos ierakstus kolonnā vai unikālu ierakstu kombinācijas vairākās kolonnās vienlaicīgi? ", 
    choice1: " CREATE VIEW ", 
    choice2: " ORDER BY ", 
    choice3: " GROUP BY ", 
    choice4: " SELECT ", 
    answer: 3 
},
{
    question: " Tabulas primārā atslēga ir... ", 
    choice1: " Ieraksta unikālā atslēga, kas nodrošina datu integritāti ", 
    choice2: " Unikāls lauks vai lauku kopa, kas identificē unikālu ierakstu tabulā ", 
    choice3: " Unikāls indekss ar mērķi meklēt datus pēc dažādiem laukiem ", 
    choice4: " Unikālais indekss ir visu indeksu summa tabulā ", 
    answer: 2 
},
{
    question: " Kura ir datu bāzes vadības sistēma (DBVS)? ", 
    choice1: " Microsoft Office Excel ", 
    choice2: " Linux UBUNTU ", 
    choice3: " MySQL Server ", 
    choice4: " Microsoft Windows Server 2008 ", 
    answer: 3 
},
{
    question: " Kur datu bāzes vadības sistēma (DBVS) glabā datus ?", 
    choice1: " Indeksos ", 
    choice2: " Skatā ", 
    choice3: " Tabulās ", 
    choice4: " Failos ", 
    answer: 4 
},
{
    question: " Kāda operācija jālieto, lai labotu tabulas ierakstu vērtības? ", 
    choice1: " SELECT ", 
    choice2: " INSERT ", 
    choice3: " DELETE ", 
    choice4: " UPDATE ", 
    answer: 4 
},
{
    question: " Ar kādu komandu tabulā pievieno jaunu ierakstu? ", 
    choice1: " SELECT ", 
    choice2: " INSERT ", 
    choice3: " DELETE ", 
    choice4: " UPDATE ", 
    answer: 2 
},
{
    question: " Ar kādu komandu maina tabulas struktūru? ", 
    choice1: " CREATE ", 
    choice2: " INSERT ", 
    choice3: " ALTER ", 
    choice4: " UPDATE ", 
    answer: 3 
},
{
    question: " Ar kādu komandu tabulai pieliek indeksu? ", 
    choice1: " CREATE ", 
    choice2: " INSERT ", 
    choice3: " ALTER ", 
    choice4: " UPDATE ", 
    answer: 1 
},
{
    question: " Kura nav relāciju datu bāze? ", 
    choice1: " MySQL Server ", 
    choice2: " DBVS Oracle ", 
    choice3: " Microsoft Office Excel ", 
    choice4: " Microsoft SQL Server ", 
    answer: 3 
},
{
    question: " Datubāzes tabulas laukam (column) vai vairākiem laukiem ir uzstādīts ierobežojums: Unikāla atslēga (UNIQUE Constraints). Ko dod šāds ierobežojums? ", 
    choice1: " Uzliek kolonnām vērtību UNIQUE, ja netiek padotas standarta vērtības ", 
    choice2: " Vienai vai vairākām kolonnām jāatbilst noteiktam kritērijam ", 
    choice3: " Nodrošina, ka kolonnā(s) ir unikālas vērtības ", 
    choice4: " Nodrošina, ka kolonnai(ām) ir unikāli kolonnu nosaukumi ", 
    answer: 3 
}

]
let adtsQuestions = [ // alrogirtmu, datu tipu, struktūras jautājumi
{
    question: " Kurā no algoritma struktūras veidiem darbības tiek veiktas viena aiz otras? ", 
    choice1: " Lineārajā ", 
    choice2: " Sazarotajā ", 
    choice3: " Cikliskajā ", 
    choice4: " Saliktajā ", 
    answer: 1 
},
{
    question: " Kurā no algoritma struktūras veidiem tiek veiktas pārbaudes, bet darbības neatkārtojas? ", 
    choice1: " Lineārajā ", 
    choice2: " Sazarotajā ", 
    choice3: " Cikliskajā ", 
    choice4: " Saliktajā ", 
    answer: 2 
},
{
    question: " Kurā no algoritma struktūras veidiem vienas un tās pašas darbības tiek veiktas atkārtoti? ", 
    choice1: " Lineārajā ", 
    choice2: " Sazarotajā ", 
    choice3: " Cikliskajā ", 
    choice4: " Saliktajā ", 
    answer: 3 
},
{
    question: " Kas ir algoritms? ", 
    choice1: " Ļoti precīzs un skaidrs paskaidrojums, kā ir jārīkojas, lai sasniegtu kādu mērķi vai atrisinātu kādu problēmu ", 
    choice2: " Komandu virkne, kur kādas no uzskaitītajām darbībām var nepildīt ", 
    choice3: " Vispusīgs darbību apraksts, lai pietuvinātos atrisinājumam ", 
    choice4: " Darbību virkne aprēķinu veikšanai ", 
    answer: 1 
},
{
    question: " Kura no uzskaitītajām nav algoritma īpašība? ", 
    choice1: " Galīgs un efektīvs ", 
    choice2: " Viennozīmīgs ", 
    choice3: " Vispārīgs ", 
    choice4: " Uztverams ", 
    answer: 4 
},
{
    question: " Kurā no algoritma pieraksta veidiem izmanto grafisko elementu apzīmējumus? ", 
    choice1: " Programmēšanas valodās ", 
    choice2: " Strukturētā tekstā ", 
    choice3: " Pseidovalodā ", 
    choice4: " Blokshēmās ", 
    answer: 4 
},
{
    question: " Kurā no datu struktūrām elementu skaits ir nemainīgs visā šīs struktūras pastāvēšanas laikā? ", 
    choice1: " Daļēji dinamiskā datu struktūrā ", 
    choice2: " Dinamiskā datu struktūrā ", 
    choice3: " Sasaistītā datu struktūrā ", 
    choice4: " Statiskā datu struktūrā ", 
    answer: 4 
},
{
    question: " Kurā no datu struktūrām elementu skaits var brīvi mainīties? ", 
    choice1: " Daļēji dinamiskā datu struktūrā ", 
    choice2: " Dinamiskā datu struktūrā ", 
    choice3: " Sasaistītā datu struktūrā ", 
    choice4: " Statiskā datu struktūrā ", 
    answer: 2 
},
{
    question: " Kas ir datu struktūra? ", 
    choice1: " Datu elementu kopums ", 
    choice2: " Nesaistīti datu elementi ", 
    choice3: " Skaitļu virkne ", 
    choice4: " Teksta kopas ", 
    answer: 1 
},
{
    question: " Kas katram masīva elementam ir neatkārtojams? ", 
    choice1: " Elementu daudzums ", 
    choice2: " Indekss ", 
    choice3: " Datu tips ", 
    choice4: " Vērtība ", 
    answer: 2 
},
{
    question: " Pie kura no datu tipiem pieder patiess/aplams dati? ", 
    choice1: " Datuma ", 
    choice2: " Loģiskajiem ", 
    choice3: " Skaitliskajiem ", 
    choice4: " Rakstzīmju ", 
    answer: 2 
},
{
    question: " Kuram no uzskaitītajiem datiem pieder mainīgais x? X=5.1 ", 
    choice1: " Veselajiem skaitļiem ", 
    choice2: " Reālajiem skaitļiem ", 
    choice3: " Rakstzīmēm ", 
    choice4: " Loģiskajiem datiem ", 
    answer: 2 
},
{
    question: " Kurš no uzskaitītajiem datu tipiem neiederas? ", 
    choice1: " Shortint ", 
    choice2: " Integer ", 
    choice3: " Word ", 
    choice4: " Real ", 
    answer: 3 
},
{
    question: " Kuram no uzskaitītajiem datiem pieder mainīgais x? X='Tests' ", 
    choice1: " Veselajiem skaitļiem ", 
    choice2: " Reālajiem skaitļiem ", 
    choice3: " Rakstzīmēm ", 
    choice4: " Loģiskajiem datiem ", 
    answer: 3 
},
{
    question: " Cik bultiņas var pienākt vienam blokshēmas elementam, izņemot pirmo? ", 
    choice1: " Viena ", 
    choice2: " Neierobežots skaits ", 
    choice3: " Bultiņu skaits atkarīgs no iepriekšējo elementu daudzuma ", 
    choice4: " Bultiņu skaits atkarīgs no sekojošo elementu daudzuma ", 
    answer: 4 
},
{
    question: " Cik bultiņas var iziet no viena blokshēmas elementa, izņemot pēdējo un sazarošanas elementu? ", 
    choice1: " Viena ", 
    choice2: " Neierobežots skaits ", 
    choice3: " Bultiņu skaits atkarīgs no iepriekšējo elementu daudzuma ", 
    choice4: " Bultiņu skaits atkarīgs no sekojošo elementu daudzuma ", 
    answer: 1 
},
{
    question: " Kas raksturīgs lineāro algoritmu blokshēmām? ", 
    choice1: " Tām nav sākuma elementa ", 
    choice2: " Tām nav zarošanās elementa ", 
    choice3: " Tām nav beigu elementa ", 
    choice4: " Tām nav norādītas izpildāmās darbības ", 
    answer: 2 
},
{
    question: " Cik bultiņas var iziet no viena blokshēmas zarošanās elementa? ", 
    choice1: " Viena ", 
    choice2: " Divas ", 
    choice3: " Bultiņu skaits atkarīgs no iepriekšējo elementu daudzuma ", 
    choice4: " Bultiņu skaits atkarīgs no sekojošo elementu daudzuma ", 
    answer: 2  
},
{
    question: " Cik norādījumus jeb komandas izpilda vienā algoritma solī? ", 
    choice1: " Vienu ", 
    choice2: " Skaits nav noteikts ", 
    choice3: " Skaits atkarīgs no iepriekšējo elementu daudzuma ", 
    choice4: " Skaits atkarīgs no sekojošo elementu daudzuma ", 
    answer: 1 
},
{
    question: " Kādu loģisko funkciju izmanto, ja vēlas, lai abi nosacījumi izpildās, tas ir, tie ir patiesi? ", 
    choice1: " And ", 
    choice2: " Xor ", 
    choice3: " Not ", 
    choice4: " Or ", 
    answer: 1 
},
{
    question: " Kurā no variantiem ir dota loģiskā funkcija, kurā apgalvojums būs patiess tad, ja vismaz viens no nosacījumiem būs patiess? ", 
    choice1: " And ", 
    choice2: " Xor ", 
    choice3: " Not ", 
    choice4: " Or ", 
    answer: 4 
},
{
    question: " Kurā no variantiem ir dota loģiskā funkcija, kurā tiek izmantota loģiskā reizināšana? ", 
    choice1: " And ", 
    choice2: " Xor ", 
    choice3: " Not ", 
    choice4: " Or ", 
    answer: 1 
},
{
    question: " Kurā no variantiem ir dota loģiskā funkcija, kurā tiek izmantota loģiskā saskaitīšana? ", 
    choice1: " And ", 
    choice2: " Xor ", 
    choice3: " Not ", 
    choice4: " Or ", 
    answer: 4 
},
{
    question: " Kurā no variantiem ir dota loģiskā negācija? ", 
    choice1: " And ", 
    choice2: " Xor ", 
    choice3: " Not ", 
    choice4: " Or ", 
    answer: 3 
},
{
    question: " Kuram no dotajiem loģiskajiem operatoriem ir lielākā prioritāte? ", 
    choice1: " And ", 
    choice2: " Xor ", 
    choice3: " Not ", 
    choice4: " Or ", 
    answer: 3 
},
{
    question: " Dots decimālās skaitīšanas sistēmas skaitlis 11. Kāds ir šī skaitļa binārais kods? ", 
    choice1: " 1011 ", 
    choice2: " 1101 ", 
    choice3: "1110 ", 
    choice4: " 0111 ", 
    answer: 1 
},
{
    question: " Dots binārās skaitīšanas sistēmas skaitlis 1001. Kāda ir šī skaitļa decimālās skaitīšanas sistēmas vērtība? ", 
    choice1: " 7 ", 
    choice2: " 8 ", 
    choice3: " 9 ", 
    choice4: " 10 ", 
    answer: 3 
},
{
    question: " Visām piemēros dotajām darbībām ir nepieciešams cikls. Kuru no aprēķiniem var realizēt efektīvāk, ja daļa no aprēķina tiek veikta pēc cikla izpildes? ", 
    choice1: " Skaitļu summu ", 
    choice2: " Skaitļu starpību ", 
    choice3: " Skaitļu reizinājumu ", 
    choice4: " Skaitļu vidējo aritmētisko ", 
    answer: 4 
},
{
    question: " Jānis ik mēnesi krājkasē ieliek 10 EUR. Cik gadus Jānim ir jākrāj, lai kopējā summa būtu 300 EUR? ", 
    choice1: " 2 gadus ", 
    choice2: "2.5 gadus ", 
    choice3: " 2.6 gadus ", 
    choice4: "2.7 gadus ", 
    answer: 2 
},
{
    question: " Kāds būs rezultāts operācijai UN (AND - &&) ja salīdzināsim PATIESS (TRUE) ar NEPATIESS (FALSE)? IF ( TRUE AND FALSE) ",
    choice1: " Rezultāts būs PATIESS (TRUE) ", 
    choice2: " Rezultāts būs NEPATIESS (FALSE) ", 
    choice3: " Rezultāts būs PATIESS (TRUE) jo operācijai UN(AND) rezultāts vienmēr ir PATIESS (TRUE) ", 
    choice4: " Rezultāts būs NEPATIESS (FALSE), jo operācijai UN(AND) rezultāts nekad nav PATIESS (TRUE) ", 
    answer: 2 
},
{
    question: " Kurš ir kārtošanas algoritms? ", 
    choice1: " No augšas uz leju ", 
    choice2: " Burbuļa metode ", 
    choice3: " No sākuma uz beigām ", 
    choice4: " Pēc kārtas ", 
    answer: 2 
},
{
    question: " Kādā gadījumā no trim nogriežņiem nevar izveidot trijstūri? ", 
    choice1: " Ja divas malas ir garākas par trešo malu ", 
    choice2: " Ja visas malas ir vienāda garuma ", 
    choice3: " Ja divu malu garuma summa ir mazāka par trešās malas garumu ", 
    choice4: " Ja divu malu garumu summa pārsniedz trešās malas garumu ", 
    answer: 3 
},
{
    question: " Kurai nosauktajai darbībai ir augstākā prioritāte? ", 
    choice1: " Kvadrātam ", 
    choice2: " Iekavām ", 
    choice3: " Reizināšanai ", 
    choice4: " Atņemšanai ", 
    answer: 2 
},
{
    question: " Cik dažādu skaitļu kombinācijas var izveidot no 5 simboliem, ja simboli skaitlī neatkārtojas? ", 
    choice1: "100 ", 
    choice2: "50 ", 
    choice3: "120 ", 
    choice4: "150 ", 
    answer: 3 
},
{
    question: " Kāds būs ātrums m/s, ja dots ātrums 36 km/h? ", 
    choice1: " 20 ", 
    choice2: "15 ", 
    choice3: "10 ", 
    choice4: "1", 
    answer: 3 
},
{
    question: " Cik bieži atkārtojas cipars 0 skaitļos no 1 līdz 100? ", 
    choice1: " 10", 
    choice2: "11 ", 
    choice3: " 12", 
    choice4: "13 ", 
    answer: 2 
},
{
    question: " Cik skaitļu (simbolu) ir intervālā no 1 līdz 1000? (aprēķināšanai var izmantot formulu) ", 
    choice1: "3339 ", 
    choice2: "2939 ", 
    choice3: "2893 ", 
    choice4: " 2793 ", 
    answer: 3 
},
{
    question: " Ja no 2000.gada 1. janvāra ir pagājušas 3500 dienas, tad kurš gads ir pašreiz? ", 
    choice1: " 2010. gads ", 
    choice2: "2009. gads ", 
    choice3: "2008.gads ", 
    choice4: "2011.gads ", 
    answer: 2 
},
{
    question: " Kāds skaitlis trūkst skaitļu virknē ? zīmes vietā? 1 3 9 ? 81 243 ", 
    choice1: " 21 ", 
    choice2: " 18", 
    choice3: " 27", 
    choice4: " 36", 
    answer: 3 
},
{
    question: " Ja četri cilvēki trijās dienās izdzer kopā divpadsmit litrus ūdens, cik dienās viens cilvēks izdzers trīs litrus ūdens? ", 
    choice1: " 4", 
    choice2: "1 ", 
    choice3: " 2", 
    choice4: " 3", 
    answer: 4 
},
{
    question: " Kādus datu tipus nevar izmantot kā indeksu? ", 
    choice1: " Reālos datu tipus ", 
    choice2: " Konstantes ", 
    choice3: " Tipu-diapazonu ", 
    choice4: " Veselu datu tipus ", 
    answer: 3
}
]

let wppQuestions = [ //  WEB programmēšanas pamatu jautājumi
{
    question: " HTML ir... ", 
    choice1: " Hiperteksta iezīmēšanas valoda ", 
    choice2: " Programmēšanas valoda ", 
    choice3: " INTERNET protokols ", 
    choice4: " Teksta redaktors ", 
    answer: 1 
},
{
    question: " Tagus HTML dokumentos apzīmē... ", 
    choice1: " Ar leņķveida iekavām: < > ", 
    choice2: " Ar sleš-zīmēm: / / ", 
    choice3: " Ar pēdiņām: \" \" ", 
    choice4: " Ar figūriekavām: { } ", 

    answer: 1   
},
{
    question: " HTML dokumentus var veidot... ", 
    choice1: " Jebkurā teksta redaktorā ", 
    choice2: " Tikai ar speciālu programmu palīdzību ", 
    choice3: " Tikai Notepad ", 
    choice4: " Tikai MS WORD ", 
    answer: 2 
},
{
    question: " Kādu simbolu izmanto kā atdalītāju, aprakstot taga vairākus atribūtus? ", 
    choice1: " Atstarpi ", 
    choice2: " Komatu ", 
    choice3: " Semikolu ", 
    choice4: " Kolu ", 
    answer: 1
},
{
    question: " Kuri no dotajiem atribūtiem tiek izmantoti tikai hipersaišu izveidošanas tagos? ", 
    choice1: " HREF ", 
    choice2: " NAME ", 
    choice3: " ALT ", 
    choice4: " ANCHOR ", 
    answer: 1 
},
{
    question: " Ko dara pārlūkprogramma ar HTML kodu? ", 
    choice1: " Interpretē ", 
    choice2: " Kompilē ", 
    choice3: " Izpilda ", 
    choice4: " Izveido ", 
    answer: 1 
},
{
    question: " HTML dokuments satur izteiksmi:<body class = “important”>  . Kas šeit ir class? ", 
    choice1: " Atribūts ", 
    choice2: " Stils ", 
    choice3: " Tags ", 
    choice4: " Deskriptors ", 
    answer: 2
},
{
    question: " Kādi līdzekļi ļauj grupēt saistītu informāciju Web lapā? ", 
    choice1: " Tabulu veidošanas līdzekļi un tags <div> ", 
    choice2: " Tikai tabulu veidošanas līdzekļi ", 
    choice3: " Stilu lapas ", 
    choice4: " Tags <pre>", 
    answer: 1 
},
{
    question: " Kurš no dotajiem tagiem ir lieks? ", 
    choice1: "<hr> ", 
    choice2: "<table> ", 
    choice3: " <td>", 
    choice4: " <tr>", 
    answer: 1 
},
{
    question: " Ja logam jābūt sadalītam vairākās daļās, kurās vienlaicīgi attēlo dažādu HTML dokumentu saturu, izmanto... ", 
    choice1: " Freimus ", 
    choice2: " Tabulas ", 
    choice3: " Tagus <div>", 
    choice4: " Tagus <pre> ", 
    answer: 3 
},
{
    question: " Atribūtu NORESIZE HTML dokumentos izmanto, lai lietotājs nevarētu mainīt... ", 
    choice1: " Freima izmēru ", 
    choice2: " Loga izmēru ", 
    choice3: " Tabulas izmēru ", 
    choice4: " Bildes izmēru ", 
    answer: 1 
},
{
    question: " Ar kāda taga palīdzību var uzzīmēt horizontālu līniju? ", 
    choice1: "<HR> ", 
    choice2: " <BR>", 
    choice3: " <A>", 
    choice4: " <PRE>", 
    answer: 1 
},
{
    question: " Ar kāda taga palīdzību var aprakstīt bildes sadalījumu vairākās daļās, katrai no kurām jānozīmē atsevišķa hipersaite? ", 
    choice1: " MAP ", 
    choice2: " IMG ", 
    choice3: " USERMAP ", 
    choice4: " DIV ", 
    answer: 1 
},
{
    question: " CSS datnē aprakstītus stilus var izmantot… ", 
    choice1: " Vairākiem HTML dokumentiem ", 
    choice2: " Tikai vienam noteiktajam HTML dokumentam ", 
    choice3: " Tikai citā CSS datnē ", 
    choice4: " Tikai index.html dokumenta stilu aprakstīšanai ", 
    answer: 1 
},
{
    question: " CSS (Cascading Style Sheets) ir... ", 
    choice1: " Parametru kopums HTML elementu attēlošanai ", 
    choice2: " WEB lapā attēlojamas tabulas ", 
    choice3: " Tabulu veidošanas parametru kopums ", 
    choice4: " Tabulu noformēšanas stila apraksts ", 
    answer: 1 
},
{
    question: " Kurš no stilu aprakstiem ir korekts? ", 
    choice1: " {font-family: Arial; color: #0000FF;} ", 
    choice2: " {font-face: Arial; color: blue;} ", 
    choice3: " {font-family=\"Arial\"; color=\"blue\";} ", 
    choice4: " {font-face=\"Arial\"; color=\"#0000FF\";} ", 
    answer: 1 
},
{
    question: " Kuri no dotajiem atribūtiem ļauj nokopēt elementam stilus, kas ir aprakstīti .css datnē? ", 
    choice1: " ID un CLASS ", 
    choice2: " CLASS un STYLE ", 
    choice3: " STYLE un NAME ", 
    choice4: " NAME un ID ", 
    answer: 1 
},
{
    question: " Ar kāda taga palīdzību var ievietot bildi WEB lapā? ", 
    choice1: " <img> ", 
    choice2: " <picture> ", 
    choice3: " <graphic> ", 
    choice4: " <photo> ", 
    answer: 1
},
{
    question: " Filtrus var izmantot… ", 
    choice1: " Ar <DIV> izdalītiem teksta blokiem un grafiskiem attēliem ", 
    choice2: " Grafiskiem attēliem un tabulām ", 
    choice3: " Ar <P> izdalītām teksta rindkopām ", 
    choice4: " Tabulām un/vai atsevišķām to daļām ", 
    answer: 1 
},
{
    question: " Kurš no dotajiem tagiem paredzēts HTML dokumenta satura dalīšanai loģiskās daļās? ", 
    choice1: "<DIV> ", 
    choice2: " <TABLE>", 
    choice3: " <FRAME>", 
    choice4: " <IFRAME>", 
    answer: 1 
},
{
    question: " Kas ir Z-index? ", 
    choice1: " Slāņa numurs, kurā elements tiks izvietots ", 
    choice2: " Elementa trešā koordināta (kopā ar X in Y) ", 
    choice3: " Elementa numurs, kurš apzīmēts ar burtu Z ", 
    choice4: " Trīsdimensiju objekts ", 
    answer: 2 
},
{
    question: " Kāda ir <META> taga nozīme HTML valodā? ", 
    choice1: " Tas satur informāciju par pašu HTML dokumentu ", 
    choice2: " Tajā apraksta stilus ", 
    choice3: " Tas satur HTML dokumenta virsrakstu ", 
    choice4: " Tas satur WEB vietnes kartes aprakstu ", 
    answer: 1 
},
{
    question: " Kādas ciklu konstrukcijas ir JavaScript valodā? ", 
    choice1: " Tikai for un while ", 
    choice2: " Tikai for ", 
    choice3: " Tikai do...while ", 
    choice4: " Trīs: while, for, do...while ", 
    answer: 4 
},
{
    question: " JavaScript kods: break me ... ", 
    choice1: " Atslēdz JavaScript interpretēšanu ", 
    choice2: " Iziet no cikla vai switch uz \"me\" zīmi ", 
    choice3: " Izdod kļūdu ", 
    choice4: " Ieslēdz JavaScript interpretēšanu ", 
    answer: 3 
},
{
    question: " Cik parametrus var nodot funkcijai JavaScript valodā? ", 
    choice1: " Tieši tik daudz, cik ir norādīts funkcijas definēšanā ", 
    choice2: " Tik daudz, cik ir norādīts funkcijas definēšanā vai mazāk ", 
    choice3: " Tik daudz, cik ir norādīts funkcijas definēšanā vai vairāk ", 
    choice4: " Daudzums nav noteikts ", 
    answer: 3 
},
{
    question: " Kurš no dotajiem nav peles notikums? ", 
    choice1: " Onmousescroll ", 
    choice2: " Onclick ", 
    choice3: " Onmouseover ", 
    choice4: " Onmousemove ", 
    answer: 1 
},
{
    question: " Kāds notikums netiek izsaukts ar peles pogas nospiešanu? ", 
    choice1: " Onfocus ", 
    choice2: " Onclick ", 
    choice3: " Onkeydown ", 
    choice4: " Onmousedown ", 

    answer: 3 
},
{
    question: " Kurš operators JavaScript valodā veic ne tikai matemātiskās operācijas? ", 
    choice1: "/ ", 
    choice2: " + ", 
    choice3: " - ", 
    choice4: " >>> ", 
    answer: 1 
},
{
    question: " Kur pēc HTML standarta dokumentā var atrasties <script> tags? ", 
    choice1: " Tikai HEAD ", 
    choice2: " Tikai BODY ", 
    choice3: " HEAD vai BODY ", 
    choice4: " Jebkurā vietā ", 
    answer: 3 
},
{
    question: " Kas ir ECMAScript? ", 
    choice1: " Jauna programmēšanas valoda ", 
    choice2: " Pārstrādātā Javascript realizācija ", 
    choice3: " Javascript valodas specifikācija ", 
    choice4: " PHP valodas procedūru kopums ", 
    answer: 1 
},
{
    question: " Kā izvadīt paziņojumu 5 sekundes pēc skripta palaišanas? ", 
    choice1: " Sleep(5); alert(\"Sveiki!\"); ", 
    choice2: " Sleep(5000); alert(\"Sveiki!\"); ", 
    choice3: " SetTimeout('alert(\"Sveiki!\")', 5000); ", 
    choice4: " SetTimeout(function() {alert(\"Sveiki!\")}, 5); ", 
    answer: 3 
},
{
    question: " Ko dara operators ===? ", 
    choice1: " Salīdzina mainīgo atsauces, bet nesalīdzina vērtības ", 
    choice2: " Salīdzina mainīgos, ņemot vērā mainīgo tipus ", 
    choice3: " Salīdzina mainīgos, ignorējot mainīgo tipus ", 
    choice4: " Piešķir vērtību ", 
    answer: 2 
},
{
    question: " Kāds binārais operators nav JavaScript valodā? ", 
    choice1: " * un >>> ", 
    choice2: "# un ! ", 
    choice3: " & un % ", 
    choice4: " ^ un >> ", 
    answer: 2 
},
{
    question: " Kāda aritmētiskā operācija noved pie kļūdas JavaScript valodā? ", 
    choice1: " Dalīšana ar nulli ", 
    choice2: " Skaitļa reizināšana ar rindu ", 
    choice3: " Sakne no noliedzošā skaitļa ", 
    choice4: " Reizināšana ar bezgalību ", 
    answer: 2 
},
{
    question: " Katra PHP darbība ir jānoslēdz ar... ", 
    choice1: " Komatu (,) ", 
    choice2: " Semikolu (;) ", 
    choice3: " Punktu (.) ", 
    choice4: " Kolu (:) ", 
    answer: 2 
},
{
    question: " Kurš nav datu tips JavaScript valodā? ", 
    choice1: " Date ", 
    choice2: " String ", 
    choice3: " Integer ", 
    choice4: " Boolean ", 
    answer: 1 
},
{
    question: " Kurš prefikss PHP valodā ir nepieciešams mainīgo veidošanai? ", 
    choice1: "@ ", 
    choice2: "// ", 
    choice3: "$ ", 
    choice4: "# ", 
    answer: 3 
},
{
    question: " Kā pareizi uzrakstīt komentārus JavaScript valodā? ", 
    choice1: "// tas ir komentārs ", 
    choice2: " @@ tas ir komentārs ", 
    choice3: " ** tas ir komentārs ", 
    choice4: "\\ tas ir komentārs \\ ", 
    answer: 1 
},
{
    question: " Kurš no šiem PHP mainīgajiem nav derīgs mainīgais? ", 
    choice1: "$my_variable ", 
    choice2: " $myvariable ", 
    choice3: "$_myvariable ", 
    choice4: "$my-variable ", 
    answer: 4 
},
{
    question: " Kā uzrakstīt komentāru vairākās rindās PHP valodā? ", 
    choice1: "## tas ir komentārs ## ", 
    choice2: " <* tas ir komentārs *> ", 
    choice3: "/* tas ir komentārs */ ", 
    choice4: " { tas ir komentārs } ", 
    answer: 3 
},
{
    question: " Kurš no PHP operatoriem tiek izmantots rindu konkatenācijai? ", 
    choice1: ". ", 
    choice2: " => ", 
    choice3: " -> ", 
    choice4: "& ", 
    answer: 1 
},
{
    question: " Kā noteikt konstanti PHP valodā? ", 
    choice1: " Variable(\"FOO\", \"BAR\"); ", 
    choice2: " Constant(\"FOO\", \"BAR\"); ", 
    choice3: " Define(\"FOO\", \"BAR\"); ", 
    choice4: " Defineconstant(\"FOO\", \"BAR\"); ", 
    answer: 3 
},
{
    question: " Kāds atslēgvārds ļauj vienai klasei mantot citas klases īpašības? PHP valodā ", 
    choice1: " Define ", 
    choice2: " Extends ", 
    choice3: " Inherit ", 
    choice4: " New ", 
    answer: 2 
},
{
    question: " Kāds no atslēgvārdiem nav piekļūšanas modifikators? ", 
    choice1: " Public ", 
    choice2: " Protected ", 
    choice3: " Private ", 
    choice4: " Only ", 
    answer: 4 
},
{
    question: " Kurš no atslēgvārdiem tiek izmantots objekta veidošanai? PHP valodā ", 
    choice1: " NewObj ", 
    choice2: " new ", 
    choice3: " New_obj ", 
    choice4: " Obj ", 
    answer: 2 
},
{
    question: " Klašu eksemplārus vēl sauc par... ", 
    choice1: " Metodēm ", 
    choice2: " Objektiem ", 
    choice3: " Konstruktoriem ", 
    choice4: " Funkcijām ", 
    answer: 2 
},
{
    question: " Kas no dotā nav inkapsulācijas priekšrocība? ", 
    choice1: " Aizsargāti dati var būt saņemti tikai ar metožu palīdzību ", 
    choice2: " Iespēja saņemt piekļūšanu pie datiem no koda citas daļas, kas atrodas aiz paketes robežām ", 
    choice3: " Daudzkārtējas koda izmantošanas iespēja ", 
    choice4: " Papildus koda aizsardzība ", 
    answer: 3 
},
{
    question: " Kā griezties pie klases mainīgajiem, izmantojot atslēgvārdu $this? ", 
    choice1: " $this.$varname ", 
    choice2: "  $this.varname ", 
    choice3: " $this->$varname ", 
    choice4: " $this->varname ", 
    answer: 4 
},
{
    question: " Kurš tags HTML dokumentā nosaka lapaspuses galveni? ", 
    choice1: " <section> ", 
    choice2: " <nav> ", 
    choice3: " <header> ", 
    choice4: " <html> ", 
    answer: 3 
},
{
    question: " Kura komanda krāsu piešķiršanai ir kļūdaina? ", 
    choice1: " color: #aaa; ", 
    choice2: " color: #aaaaaa; ", 
    choice3: " color: #000; ", 
    choice4: " color: #hhh ", 
    answer:  4
},
{
    question: " Kurš tags HTML dokumentā nosaka atsevišķu elementu sarakstā? ", 
    choice1: " <style> ", 
    choice2: " <th>", 
    choice3: " <li>", 
    choice4: " <nav>", 
    answer: 3 
},
{
    question: " Kurš tags HTML dokumentā attēlo bildes? ", 
    choice1: "<style> ", 
    choice2: " <p>", 
    choice3: " <img>", 
    choice4: " <td>", 
    answer: 3 
},
{
    question: " Kurš tags tiek izmantots, lai HTML dokumentā iezīmētu tabulas sākumu? ", 
    choice1: " <table>", 
    choice2: " <head>", 
    choice3: " <form>", 
    choice4: "<isindex> ", 
    answer: 1 
},
{
    question: " Kurš tags HTML dokumentā veido lapaspuses saikni ar citām datnēm? ", 
    choice1: "<thead> ", 
    choice2: " <tfoot>", 
    choice3: "<style> ", 
    choice4: " <link>", 
    answer: 4 
},
{
    question: " Kurš tags HTML dokumentā ļauj noteikt navigācijas izvēlni? ", 
    choice1: " <nav>", 
    choice2: " <marquee>", 
    choice3: "<span> ", 
    choice4: " <pre>", 
    answer: 1 
}
]

let osQuestions = [ // operētājsistēmu jautājumi
{
    question: " Ar kādu taustiņu kombināciju notiek iezīmēto failu dzēšana no cietā diska, nepārvietojot tos uz atkritni MS Windows vidē? ", 
    choice1: " CTRL + DEL ", 
    choice2: " ALT + DEL ", 
    choice3: " CTRL + ALT + DEL ", 
    choice4: " SHIFT + DEL ", 
    answer: 4 
},
{
    question: " Kādu programmu startē taustiņu kombinācija CTRL +ALT + DEL, ja dators nav pieslēgts domēnam? ", 
    choice1: " Izdzēš iezīmēto failu, nepārvietojot to uz disketi ", 
    choice2: " Startē programmu Windows explorer ", 
    choice3: " Startē programmu Internet explorer ", 
    choice4: " Startē programmu Task manager ", 
    answer: 4 
},
{
    question: " Kura no operētājsistēmām neatbalsta failu sistēmu NTFS? ", 
    choice1: " DOS ", 
    choice2: " Windows NT ", 
    choice3: " Windows XP ", 
    choice4: " Windows 2000 ", 
    answer: 1 
},
{
    question: " Kura operētājsistēma ir visjaunākā? ", 
    choice1: " Windows XP ", 
    choice2: " Windows 98 ", 
    choice3: " Windows Vista ", 
    choice4: " Windows 8 ", 
    answer: 4 
},
{
    question: " Kāda ir Linux priekšrocība, salīdzinājumā ar Windows operētājsistēmām? ", 
    choice1: " Bezmaksas, izejas teksta pieejamība ", 
    choice2: " Drošība, kā arī teicams ātrums, kas ļauj strādāt ar liela apjoma datiem ", 
    choice3: " Izmantojams lielos datortīklos ", 
    choice4: " Lieliska grafika ", 
    answer: 1 
},
{
    question: " Kas ir Linux? ", 
    choice1: " Vienlietotāja un daudzuzdevumu operētājsistēma ", 
    choice2: " Daudzlietotāju un daudzuzdevumu operētājsistēma ", 
    choice3: " Daudzlietotāju un vienuzdevuma operētājsistēma ", 
    choice4: " Vienlietotāja un vienuzdevuma operētājsistēma ", 
    answer: 2 
},
{
    question: " Datorā ir instalēta Windows 7 32 bitu operētājsistēma. Cik liels operatīvās atmiņas apjoms tiks izmantots, ja datoram kopumā ir 16 GB operatīvās atmiņas? ", 
    choice1: "2 ", 
    choice2: " 4", 
    choice3: " 8", 
    choice4: " 16", 
    answer: 1 
},
{
    question: " Operētājsistēma ir... ", 
    choice1: " Galveno datora ierīču kopums ", 
    choice2: " Zema līmeņa valodas programmēšanas sistēma ", 
    choice3: " Programmatūras kopums, kurš nodrošina visu datora ierīču darbību ", 
    choice4: " Programmu kopums, kas izmantojams operācijām ar dokumentiem ", 
    answer: 3 
},
{
    question: " Kas ir Wild List kolekcija ", 
    choice1: " Vīrusu kolekcija ", 
    choice2: " Vīrusu ļaunprātīgās darbības rezultātu datu bāze ", 
    choice3: " Pretvīrusu programmu datu bāze ", 
    choice4: " Pretvīrusu programmu testēšanas rezultātu datu bāze ", 
    answer:  1
},
{
    question: " Kā var mainīt nospiesta tastatūras taustiņa atkārtošanās ātrumu? ", 
    choice1: " Mainot tastatūras pieslēgšanas portu ", 
    choice2: " Mainot attiecīgo parametru BIOSā ", 
    choice3: " Mainot attiecīgo parametru operētājsistēmā ", 
    choice4: " Mainot tastatūras taustiņus ", 
    answer: 3 
},
{
    question: " Sistēma, kas ļauj izmantot attāla datora datnes un perifērijas iekārtas tā, it kā tās atrastos lietotāja datorā, ir... ", 
    choice1: " NTFS ", 
    choice2: " FTP ", 
    choice3: " NFS ", 
    choice4: " PPP ", 
    answer: 3 
},
{
    question: " Laika intervāls, ko datora centrālais procesors izdala atsevišķa operētājsistēmas darba izpildei, ir... ", 
    choice1: " Sekunde ", 
    choice2: " Darba laiks ", 
    choice3: " Laikšķēle ", 
    choice4: " Stunda ", 
    answer: 3 
},
{
    question: " Mākslīga failu sistēma UNIX tipa operētājsistēmās, ko izmanto, lai piekļūtu kodolā esošajai informācijai par procesiem, ir... ", 
    choice1: " PROCFS ", 
    choice2: " EXT ", 
    choice3: " FAT ", 
    choice4: " NTFS ", 
    answer: 1 
},
{
    question: " Operētājsistēma, kas ļauj vienlaicīgi strādāt ar datorsistēmu vairākiem lietotājiem ir.. ", 
    choice1: " Iegultā operētājsistēma ", 
    choice2: " Dalītā operētājsistēma ", 
    choice3: " Vairāklietotāju operētājsistēma ", 
    choice4: " Vairākuzdevumu operētājsistēma ", 
    answer: 3 
},
{
    question: " Operētājsistēma, kas ir kādas lielākas operētājsistēmas daļa un parasti ir paredzēta kādu specifisku darbību veikšanai, ir... ", 
    choice1: " Iegultā operētājsistēma ", 
    choice2: " Dalītā operētājsistēma ", 
    choice3: " Vairāklietotāju operētājsistēma ", 
    choice4: " Vairākuzdevumu operētājsistēma ", 
    answer: 1 
},
{
    question: " Kas ir datne? ", 
    choice1: " Datu kopa, ko apstrādes procesā uzskata par vienotu veselumu ", 
    choice2: " Standartizēta kopne datu apmaiņai starp procesoru un atmiņu ", 
    choice3: " Informācijas mērvienība ", 
    choice4: " Informācijas vienība ", 
    answer: 1 
},
{
    question: " Kāda failu sistēma tiek izmantota kompaktdiskos? ", 
    choice1: " UDF ", 
    choice2: " FAT32 ", 
    choice3: " NTFS ", 
    choice4: " EXT2 ", 
    answer: 1 
},
{
    question: " Kāds mērķis ir cietā diska formatēšanai? ", 
    choice1: " Atjaunot bojāto informāciju ", 
    choice2: " Dzēst konkrētu datni ", 
    choice3: " Sagatavot informācijas uzglabāšanai ", 
    choice4: " Saspiest informāciju, lai atbrīvotu vietu uz diska ", 
    answer: 3 
},
{
    question: " Kā sauc iebūvēto web serveri Windows operētājsistēmā? ", 
    choice1: " IIS ", 
    choice2: " Apache ", 
    choice3: " OmniHTTPd ", 
    choice4: " TomCat ", 
    answer: 1 
},
{
    question: " Kura operētājsistēma nav firmas Microsoft izstrādājums? ", 
    choice1: " DOS ", 
    choice2: " Windows 3.11 ", 
    choice3: " GNU/Linux ", 
    choice4: " Windows XP ", 
    answer: 3 
},
{
    question: " Cik lielus klasterus atbalsta failu sistēma NTFS? ", 
    choice1: " 1,44 MB - 650 MB ", 
    choice2: " 512 B - 64 KB ", 
    choice3: " 256 B - 32 KB ", 
    choice4: " 128 B - 16 KB ", 
    answer: 2 
},
{
    question: " Kāds ir cietā diska sektora apjoms? ", 
    choice1: "512 baiti ", 
    choice2: "128 baiti ", 
    choice3: "256 baiti ", 
    choice4: "1024 baiti ", 
    answer: 1 
},
{
    question: " Kura ir visplašāk izmantotā viedtālruņu operētājsistēma? ", 
    choice1: " Symbian ", 
    choice2: " iOS ", 
    choice3: " Blackberry OS ", 
    choice4: " Android ", 
    answer: 4 
},
{
    question: " Kādu failu sistēmas formātu izmanto Linux operētājsistēma? ", 
    choice1: " NTFS ", 
    choice2: " FAT32 ", 
    choice3: " exFAT ", 
    choice4: " Ext4 ", 
    answer: 4 
},
{
    question: " Programmas, kuras apkalpo datora ierīces, sauc par ", 
    choice1: " Draiveriem ", 
    choice2: " Translatoriem ", 
    choice3: " Interpretatoriem ", 
    choice4: " Kompilatoriem ", 
    answer: 1 
},
{
    question: " Par kādām failu vadīšanas darbībām parasti nav atbildīga OS? ", 
    choice1: " Failu izveidošanu un dzēšanu ", 
    choice2: " Direktoriju izveidošanu un dzēšanu ", 
    choice3: " Failu arhivēšanu ", 
    choice4: " Datu dublēšanu uz datu nesēju ", 
    answer: 3 
},
{
    question: " Kādas funkcijas veic Windows reģistri? ", 
    choice1: " Apkopo informāciju par datora stāvokli ", 
    choice2: " Šķiro informāciju par programmām ", 
    choice3: " Pārsūta informāciju par datora stāvokli ", 
    choice4: " Glabā informāciju par datora stāvokli ", 
    answer: 4 
},
{
    question:  " Kas ir draiveris? ", 
    choice1: " Programma ", 
    choice2: " Mikroshēma ", 
    choice3: " Datu bāze ", 
    choice4: " Ierīce ", 

    answer: 1 
},
{
    question: " Ko dara BitLocker rīks operērājsistēmā Windows 7? ", 
    choice1: " Palīdz aizsargāt datnes un mapes šifrējot disku ", 
    choice2: " Skenē datnes un mapes, pārbaudot tās pret vīrusiem ", 
    choice3: " Sakārto datnes un mapes cietajā diskā ", 
    choice4: " Veido rezerves kopijas datnēm un mapēm ", 
    answer: 1 
},
{
    question: " Kuru faila sistēmu neatbalsta WINDOWS 8 ? ", 
    choice1: " FAT 32 ", 
    choice2: " NTFS ", 
    choice3: " UDF ", 
    choice4: " EXT4 ", 
    answer: 4 
},
{
    question: " Kādai kodēšanai ir paredzētas ASCII kodu tabulas? ", 
    choice1: " Simbolu kodēšanai ", 
    choice2: " Ciparu kodēšanai ", 
    choice3: " Zīmju kodēšanai ", 
    choice4: " Burtu kodēšanai ", 
    answer: 1 
},
{
    question: " Kāda tastatūras kombinācija ļauj aizvērt pašreizējo cilni internet pārlūkprogrammā? ", 
    choice1: " Ctrl+W ", 
    choice2: " Ctrl+T ", 
    choice3: " Ctrl+C ", 
    choice4: " Ctrl+Shift+Tab ", 
    answer: 1 
},
{
    question: " Operētājsistēmas galvenā, noteicošā daļa, kura pārvalda aparātu līdzekļus un programmu izpildi, ir... ", 
    choice1: " Kodols ", 
    choice2: " Failu struktūra ", 
    choice3: " Komandu apvalks ", 
    choice4: " Utilītas ", 
    answer: 1 
},
{
    question: " Reglaments, kas nosaka organizācijas un datu glabāšanas veidu uz informācijas nesējiem, ir... ", 
    choice1: " Mapes ", 
    choice2: " Loģiskais disks ", 
    choice3: " Failu sistēma ", 
    choice4: " Draiveri (dziņi) ", 
    answer: 3 
},
{
    question: " Digitālo drošības sertifikātu grupa ir... ", 
    choice1: " FireWall ", 
    choice2: " SSL ", 
    choice3: " HTTP ", 
    choice4: " Antivīrusu programmatūra ", 
    answer: 2 
},
{
    question: " Sertifikāta statusa pārbaudes standarta mehānisms ir... ", 
    choice1: " AI ", 
    choice2: " CA ", 
    choice3: " CRL ", 
    choice4: " MBR ", 
    answer: 2 
},
{
    question: " Datorprogramma vai programmu kopums, kas nodrošina klienta programmu pieprasījumu apstrādi, ir... ", 
    choice1: " Operētājsistēma ", 
    choice2: " Serveris ", 
    choice3: " Utilītas ", 
    choice4: " Lietojumprogramma ", 
    answer: 2 
}
]

let btQuestions = [ // biroja tehnikas jautājumi
{
    question: " Kāda ir programmatūras ergonomikas funkcija? ", 
    choice1: " Izvirzīt prasības darba vietas iekārtošanai ", 
    choice2: " Izvirzīt prasības un ieteikumus lietotāja un datora saskarnei ", 
    choice3: " Noteikt, kādas programmas ir jālieto dažādu uzdevumu veikšanai ", 
    choice4: " Noteikt, cik daudz programmu vienlaicīgi ir pieļaujams lietot ", 
    answer: 1 
},
{
    question: " Kāds antivīrusu programmas veids meklē failos vīrusus pirms failu palaišanas, salīdzinot faila kodu ar vīrusu maskām datu bāzē? ", 
    choice1: " Skeneris ", 
    choice2: " Monitors ", 
    choice3: " Imunizators ", 
    choice4: " Uzvedības bloķerators ", 
    answer: 1 
},
{
    question: " Kam paredzēta reversa funkcija dokumentu smalcinātājiem? ", 
    choice1: " Iesprūdušo dokumentu izņemšanai ", 
    choice2: " Tas ir dokumentu iznīcināšanas process ", 
    choice3: " Funkcija paātrina sasmalcināšanas procesu ", 
    choice4: " Apturēt smalcināšanas procesu ", 
    answer: 1 
},
{
    question: " Digitālajā kamerā gaismjutīgie elementi tiek izvietoti šaha kārtībā. Kā sauc šādu matricas tehnoloģiju? ", 
    choice1: " CCD ", 
    choice2: " Super CCD ", 
    choice3: " LCD ", 
    choice4: " TFT ", 
    answer: 1 
},
{
    question: " Kādos veidos iedala ploterus? ", 
    choice1: " Galda, veltņa, ruļļu ploteri ", 
    choice2: " Galda, plaknes, rokas ploteri ", 
    choice3: " Veltņa, ruļļu, plaknes ploteri ", 
    choice4: " Plaknes, veltņa, galda ploteri ", 
    answer: 1 
},
{
    question: " Kurš no webkameras raksturlielumiem ir būtiskākais, ja to izmanto videokonferencei? ", 
    choice1: " Attēla kvalitāte ", 
    choice2: " Skaņas kvalitāte ", 
    choice3: " Attēla pārraides ātrums ", 
    choice4: " Pieslēgšanas saskarne ", 
    answer: 1 
},
{
    question: " Kur lielākoties izmanto trekpadu? ", 
    choice1: " Printeros ", 
    choice2: " Plaukstdatoros ", 
    choice3: " Televizora pultī ", 
    choice4: " Portatīvajos datoros ", 
    answer: 4 
},
{
    question: " Ko izmanto, lai datorā ievadītu rasējumu? ", 
    choice1: " Grafisko planšeti ", 
    choice2: " Kursorsviru ", 
    choice3: " Kursorbumbu ", 
    choice4: " Skeneri ", 
    answer: 4 
},
{
    question: " Kāds parametrs nosaka printera maksimālo izdruku skaitu mēnesī? ", 
    choice1: " Ātrdarbība ", 
    choice2: " Resurss ", 
    choice3: " Izšķirtspēja ", 
    choice4: " Izmantojamā papīra formāts ", 
    answer: 1 
},
{
    question: " Kāda ir Blue Ray diska ietilpība? ", 
    choice1: "20 GB ",
    choice2: "15 GB ", 
    choice3: " 25 GB ", 
    choice4: "30 GB ", 
    answer: 3 
},
{
    question: " Kādas datnes ir ar paplašinājumu .cdr? ", 
    choice1: " Vektorgrafikas ", 
    choice2: " Web ", 
    choice3: " Konfigurācijas ", 
    choice4: " Arhivētas ", 
    answer: 1 
},
{
    question: " Kas jāieraksta Excel formulas rindā, lai izvadītu divu vai vairāku šūnu saturu vienā šūnā? ", 
    choice1: " AND ", 
    choice2: " & ", 
    choice3: " PLUS ", 
    choice4:" + ", 
    answer: 2 
},
{
    question: " Izplatāmprogrammatūra ir... ", 
    choice1: " Novecojusi programmatūra ", 
    choice2: " Bezmaksas programmatūra ", 
    choice3: " Bezmaksas izmēģinājuma versija, par ko vēlāk ir jāmaksā ", 
    choice4: " Maksas programmatūra ", 
    answer: 2 
},
{
    question: " Kuri ir dokumenta orientācijas veidi? ", 
    choice1: " A4 un Letter ", 
    choice2: " Portrait un Landscape ", 
    choice3: " Oval un Square ", 
    choice4: " Small un Large ", 
    answer: 2 
},
{
    question: " Kurš pilnais faila nosaukums ir uzrakstīts pareizi? ", 
    choice1: " C;Work,Letter.docx ", 
    choice2: " C:/Work/Letter.docx ", 
    choice3: " C:\\Work\\Letter.doc ", 
    choice4: " C:>\\Work\\Letter.docx ", 

    answer: 3 
},
{
    question: " Kādus simbolus nevar lietot datnes nosaukumā? ", 
    choice1: " Burtus no A līdz Z ", 
    choice2: " * : / \\ | < > ” ", 
    choice3: " Jebkurus ciparus ", 
    choice4: "! @ # $ % ? ; ", 

    answer: 2 
},
{
    question: " MS PowerPoint prezentācijas pamatelements ir... ", 
    choice1: " Forma ", 
    choice2: " Slīds ", 
    choice3: " Režīms ", 
    choice4: " Animācija ", 
    answer: 2 
},
{
    question: " Ko MS PowerPoint programmā veic komanda Slide Show / Set Up Slide Show? ", 
    choice1: " Nodrošina, ka slīdi demonstrācijas laikā aizpilda visu ekrānu ", 
    choice2: " Notiek slīdu demonstrācija, sākot ar pirmo ", 
    choice3: " Rāda kādu no slīdu izlasēm, pēc programmas izvēles ", 
    choice4: " Aktivizē dialoglogu demonstrācijas parametru iestatīšanai ", 
    answer: 2 
},
{
    question: " Kāds datu formāts attēlo valūtu MS Excel programmā? ", 
    choice1: " General ", 
    choice2: " Fraction ", 
    choice3: " Currency ", 
    choice4: " Percentage ", 
    answer: 3 
},
{
    question: " Kura no izteiksmēm būs šūnā, dublējot formulu =$D$5+90 ar peli divas šūnas uz leju? ", 
    choice1: " =$D$5+90 ", 
    choice2: " =$D$7+90 ", 
    choice3: " =$D$5+92 ", 
    choice4: " =$D$7+92 ", 
    answer: 1 
},
{
    question: " MS Excel tabulas A kolonā secīgi ierakstīti 5 skaitļi. Kura no dotajām formulām atgriezīs visu piecu skaitļu summu? ", 
    choice1: " =sum(A1:A5) ", 
    choice2: " =sum(A1,A5) ", 
    choice3: " = sum(A1A5) ", 
    choice4: " A1+A2+A3+A4+A5 ", 
    answer: 1 
},
{
    question: " MS Excel darblapā šūnā A1 ir formula =B1/B10. Kādu formulu iegūs, dublējot to uz šūnu A2? " , 
    choice1: " = B1/$B$10 ", 
    choice2: " = B2/B10 ", 
    choice3: " = B2/B11 ", 
    choice4: " =A1/B10 ", 
    answer: 3 
},
{
    question: " Kā efektīvi aprēķināt vidējo aritmētisko no šūnu a1, a2, a3, a4 vērtībām? ", 
    choice1: " = A1+A2+A3+A4/4 ", 
    choice2:  " =average(A1:a4)", 
    choice3: " = sum(A1;a4)/4 ", 
    choice4: " (A1+A2+A3+A4)/4 ", 
    answer: 2 
},
{
    question: " Kāds ir MS Excel formulas =round(4568,347; -2) rezultāts? ", 
    choice1: " 4568 ", 
    choice2: " 4600 ", 
    choice3: " 4568,345 ", 
    choice4: " -45683472 ", 
    answer: 2 
},
{
    question: " Ar kādu taustiņu kombināciju MS Word var pasvītrot tekstu? ", 
    choice1: " Ctrl+B ", 
    choice2: " Ctrl+I ", 
    choice3: " Ctrl+U ", 
    choice4: " Ctrl+A ", 
    answer: 3 
},
{
    question: " Lai izsauktu Ms Word lietojumprogrammā aizvietošanas (Replace) dialoglogu, jānospiež taustiņu kombinācija... ", 
    choice1: " Alt+H ", 
    choice2: " Ctrl+H ", 
    choice3: " Shift+H ", 
    choice4: " Ctrl+F ", 
    answer: 2 
},
{
    question: " Kāda ir fonta lieluma mērvienība? ", 
    choice1: " pt ", 
    choice2: " cm ", 
    choice3: " mm ", 
    choice4: " collas ", 
    answer: 1 
},
{
    question: " Ar kuru taustiņu kombināciju var atlasīt visu dokumentu? ", 
    choice1: " Print Screen ", 
    choice2: " Ctrl + A ", 
    choice3: " Shift + A ", 
    choice4: " Alt + A ", 
    answer: 2 
},
{
    question: " Kurš taustiņš dzēš informāciju pa labi no teksta kursora? ", 
    choice1: " Backspace ", 
    choice2: " Insert ", 
    choice3: " Delete ", 
    choice4: " Clear ", 
    answer: 3 
},
{
    question: " Kas notiks, ja Print loga opcijā (laukā) Pages uzraksta: 12-? ", 
    choice1: " Varēs apskatīties no 1. līdz 12. lappusei ", 
    choice2: " Izdrukās pirmās 12 (divpadsmit) lappuses ", 
    choice3: " Izdrukās no 12. lappuses līdz dokumenta beigām ", 
    choice4: " Izdrukās divpadsmito lappusi ", 
    answer: 3 
},
{
    question: " Ar kuru MS Word rīku tabulā apvieno vairākas šūnas vienā? ", 
    choice1: " Split Cells ", 
    choice2: " Wrap Text ", 
    choice3: " Merge Cells ", 
    choice4: " Split Table ", 
    answer: 3 
},
{
    question: " Kurš rīks dublē formatējumu (noformējumu)? ", 
    choice1: " Format Copy ", 
    choice2: " Toolbars ", 
    choice3: " Format Painter ", 
    choice4: " Copy ", 
    answer: 3 
},
{
    question: " Kas ir dokumenta formatēšana? ", 
    choice1: " Dokumenta kodēšana binārajā sistēmā ", 
    choice2: " Dokumenta pārrakstīšana no viena formāta citā ", 
    choice3: " Dokumenta noformēšana ar dažādiem fontiem, atkāpēm utt. ", 
    choice4: " Dokumenta parametru uzstādīšana, izmantojot sagataves ", 
    answer: 3 
},
{
    question: " MS Word dokumentā stilus lieto, lai ... ", 
    choice1: " Pēc tam automātiski izveidotu satura rādītāju (Table of Contents) ", 
    choice2: " Tabulām izmantotu automātisko noformēšanu (Auto Format) ", 
    choice3: " Pārbaudītu pareizrakstības un stila kļūdas tekstā ", 
    choice4: " Dokuments būtu noformēts izvēlētajā stilā ", 
    answer: 4 
},
{
    question: " Vektorgrafika paredzēta… ", 
    choice1: " Kvalitatīvai attēla pārveidošanai ", 
    choice2: " Dažādu logo un shēmu zīmēšanai ", 
    choice3: " Dažādu attēlu un fotogrāfiju kombinēšanai ", 
    choice4: " Attēlu izmēru mainīšanai, nezaudējot to kvalitāti ", 
    answer: 4 
}
]

let vnapQuestions = [ // valsts normatīvo aktu prasību jautājumi
{
    question: " Fizisko personu datu aizsardzības likumā ir definēts, ka par sensitīviem var tikt uzskatīti personas dati, kuri satur informāciju par... ", 
    choice1: " Personas piedalīšanos vēlēšanās, masu pasākumos un mītiņos ", 
    choice2: " Personas rasi, etnisko izcelsmi, reliģisko, filozofisko un politisko pārliecību, dalību arodbiedrībās; personas veselību ", 
    choice3: " Personas materiālo stāvokli, sociālo stāvokli un personai piederošajiem īpašumiem ", 
    choice4: " Personas izglītības līmeni, tā zinātnisko grādu un tai piederošajiem patentiem un autorapliecībām ", 
    answer: 2 
},
{
    question: " Personas datu apstrāde sākotnēji neparedzētiem mērķiem ir pieļaujama tikai tad, ja... ", 
    choice1: " Tiek veikti zinātniskie vai statistiskie pētījumi ", 
    choice2: " Tā tiek veikta pilsoņiem, kuri ir atstājuši Latvijas vai ES teritoriju ", 
    choice3: " Tā tiek veikta likumpārkāpējiem un personām, kuras atrodas apcietinājumā ", 
    choice4: " Personai ir Latvijas nepilsoņa statuss ", 
    answer: 1 
},
{
    question: " Kādā gadījumā sensitīvo personas datu apstrāde ir atļauta? ", 
    choice1: " Lai aizsargātu datu subjekta finansiālās intereses, bet datu subjekts tiesiski vai fiziski nav spējīgs dot tam savu piekrišanu ", 
    choice2: " Lai aizsargātu datu subjekta vai citas personas dzīvību un veselību, un datu subjekts tiesiski vai fiziski nav spējīgs dot savu piekrišanu ", 
    choice3: " Lai aizsargātu datu subjekta vai citas personas identitāti pirmstiesas izmeklēšanas laikā, ja draud briesmas tā dzīvībai vai veselībai ", 
    choice4: " Nekādi izņēmuma gadījumi nav pieļaujami ", 
    answer: 2 
},
{
    question: " Ministru kabineta noteikumos Nr. 280 (Kārtība, kādā aizsargājama informācija dienesta vajadzībām) ir noteikts, ka statusu \"informācija dienesta vajadzībām\" var noteikt... ", 
    choice1: " Tikai attiecīgās iestādes vadītājs ar rakstisku rīkojumu vai informācijas autors ", 
    choice2: " Tikai attiecīgā ministrija, kuras pakļautībā atrodas attiecīgā iestāde un informācijas autors ", 
    choice3: " Tikai ES institūcija, kuras pakļautībā atrodas attiecīgā nozares iestāde un informācijas autors ", 
    choice4: " Visiem Aizsardzības ministrijas un NATO valstu savstarpējās apmaiņas dokumentiem ", 
    answer: 1 
},
{
    question: " Valsts informācijas sistēmu likums definē, ka Valsts informācijas sistēmu darbības koordināciju nodrošina... ", 
    choice1: " Satiksmes ministrijas Sakaru departaments ", 
    choice2: " Satversmes aizsardzības birojs ", 
    choice3: " Datu valsts inspekcija ", 
    choice4: " Vides aizsardzības un reģionālās attīstības ministrija ", 
    answer: 4 
},
{
    question: " Valsts informācijas sistēmas datu bāze ir valsts īpašums, savukārt informācijas tehnoloģijas un informācijas pārraides līdzekļi... ", 
    choice1: " Var būt tikai valsts īpašums ", 
    choice2: " Var būt tikai privātīpašums ", 
    choice3: " Var būt gan publiskais, gan privātais īpašums ", 
    choice4: " Var būt tikai pašvaldības īpašums ", 
    answer: 3 
},
{
    question: " Valsts informācijas sistēmas aizsardzībai var tikt izmantoti gan fiziskie, gan loģiskie aizsardzības līdzekļi. Loģiskie aizsardzības līdzekļi ir... ", 
    choice1: " Autentifikācijas un autorizācijas protokolu izmantošana lietotāja identifikācijai ", 
    choice2: " Datu pārraides plūsmas ievietošana VPN tuneļos un informācijas šifrēšana šajos tuneļos ", 
    choice3: " Ugunsmūru, VPN un VLAN tīklu organizēšana, veidojot loģiski atsaistītus datu pārraides tīklus ", 
    choice4: " Jebkuri informācijas un programmatūras aizsardzības līdzekļi, kas, nodrošinot sistēmas lietotāja identitātes un piekļuves tiesību pārbaudi, pasargā informāciju no tīšas vai nejaušas grozīšanas vai dzēšanas ", 
    answer: 4 
},
{
    question: " Kādi likumi regulē intelektuālā īpašuma tiesības? ", 
    choice1: " Autortiesību un patentu likumi ", 
    choice2: " Darba aizsardzības likums ", 
    choice3: " Darba drošības likums ", 
    choice4: " Uzņēmuma iekšējie normatīvie akti ", 
    answer: 1 
},
{
    question: " Kura LR ministrija ir atbildīga par autortiesību praktisko aizsardzību? ", 
    choice1: " Aizsardzības ministrija ", 
    choice2: " Iekšlietu ministrija ", 
    choice3: " Izglītības ministrija ", 
    choice4: " Veselības ministrija ", 
    answer: 2 
},
{
    question: " Kā apzīmē kvalitātes pārvaldības sistēmas sertificēšanas standartu? ", 
    choice1: " ISO 900 ", 
    choice2: " ISO 9000 ", 
    choice3: " ISO 9001 ", 
    choice4: " ISO 9010 ", 
    answer: 3 
},
{
    question: " Kurš standarts attiecināms uz programmatūras izstrādi? ", 
    choice1: " ISO 9001 ", 
    choice2: " CMM ", 
    choice3: " MMC ", 
    choice4: " MCM ", 
    answer: 1 
},
{
    question: " Cik minūtes ieteicams atpūsties pēc divu stundu darba pie datora? ", 
    choice1: "5 minūtes ", 
    choice2: "10 minūtes ", 
    choice3: " 15 minūtes ", 
    choice4: "20 minūtes ", 
    answer: 3 
},
{
    question: " Ieteicamā darba telpas platība vienam darbiniekam ir vismaz... ", 
    choice1: "3 m2 ", 
    choice2: "3,8 m2 ", 
    choice3: "4,2 m2 ", 
    choice4: "4,8 m2 ", 
    answer: 4 
},
{
    question: " Kādai jābūt apgaismojuma intensitātei rakstīšanas, drukāšanas, lasīšanas, datu apstrādes telpās? ", 
    choice1: "100 lx ", 
    choice2: "300 lx ", 
    choice3: " 500 lx ", 
    choice4: "700 lx ", 
    answer: 2 
},
{
    question: " Kāds ir lielākais pieļaujamais trokšņa līmenis lielās biroju darba telpās un telpās ar biroja tehniku? ", 
    choice1: " 40 dB ", 
    choice2: "45 dB ", 
    choice3: " 50 dB ", 
    choice4: "55 dB ", 
    answer: 4 
},
{
    question: " Kāds ir minimālais cilvēka dzīvībai bīstamais spriegums ? ", 
    choice1: " Spriegums virs 12 V ", 
    choice2: " Spriegums virs 42 V ", 
    choice3: " Spriegums virs 60 V ", 
    choice4: " Spriegums virs 220 V ", 
    answer: 2 
},
{
    question: " Cik bieži jāplāno darba vides iekšējā uzraudzība, lemjot par darba aizsardzības jautājumu organizēšanu uzņēmumā? ", 
    choice1: " Ne retāk kā vienu reizi 5 gados ", 
    choice2: " Ne retāk kā vienu reizi 3 gados ", 
    choice3: " Ne retāk kā vienu reizi 2 gados ", 
    choice4: " Ne retāk kā vienu reizi gadā ", 
    answer: 4 
},
{
    question: " Par kādiem jautājumiem darba devējam jākonsultējas ar nodarbinātajiem? ", 
    choice1: " Par darba samaksas sistēmas izveidi ", 
    choice2: " Par darba vides risku novērtēšanu ", 
    choice3: " Par uzņēmuma stratēģisko attīstību ", 
    choice4: " Par uzņēmuma grāmatvedības sistēmas izveidi ", 
    answer: 2 
},
{
    question: " Pirmreizējā veselības pārbaude jāveic... ", 
    choice1: " Trīs darba dienu laikā pēc darba līguma noslēgšanas ", 
    choice2: " Pirms darba līguma noslēgšanas ", 
    choice3: " Vienas nedēļas laikā pēc darba līguma noslēgšanas ", 
    choice4: " Dienu pēc darba līguma noslēgšanas ", 
    answer: 2 
},
{
    question: " Darba vides iekšējā uzraudzībā ietilpst... ", 
    choice1: " Nodarbināto pienākumu izstrādāšana ", 
    choice2: " Darba vides risku novērtēšana ", 
    choice3: " Uzņēmuma finansiālās darbības analīze ", 
    choice4: " Uzņēmuma saimnieciskās darbības analīze ", 
    answer: 2 
},
{
    question: " Kurš no minētajiem nosacījumiem neveido mikroklimatu darba vietā? ", 
    choice1: " Gaisa plūsmas ātrums ", 
    choice2: " Darba telpas iekārtojums ", 
    choice3: " Gaisa relatīvais mitrums ", 
    choice4: " Virsmas temperatūra ", 
    answer: 2 
},
{
    question: " Kolektīvie darba aizsardzības līdzekļi ir... ", 
    choice1: " Darbiniekam izsniegtās aizsargbrilles ", 
    choice2: " Dzirdes aizsardzības austiņas ", 
    choice3: " Darba aizsardzības drošības zīmes ", 
    choice4: " Darba apģērbs un apavi ", 
    answer: 3 
},
{
    question: " Individuālie darba aizsardzības līdzekļi ir... ", 
    choice1: " Dzirdes aizsardzības austiņas ", 
    choice2: " Drošības zīmes ", 
    choice3: " Instruktāža darba aizsardzībā ", 
    choice4: " Nožogojumi ", 
    answer: 1 
},
{
    question: " Kāda forma ir aizlieguma darba aizsardzības zīmei? ", 
    choice1: " Aplis ", 
    choice2: " Trijstūris ", 
    choice3: " Taisnstūris ", 
    choice4: " Kvadrāts ", 
    answer: 1 
},
{
    question: " Kāda forma ir brīdinājuma darba aizsardzības zīmei? ", 
    choice1: " Aplis ", 
    choice2: " Trijstūris ", 
    choice3: " Taisnstūris ", 
    choice4: " Kvadrāts ", 
    answer: 2 
},
{
    question: " Ugunsdrošības zīmes pamatkrāsojums(signālkrāsojums) ir... ", 
    choice1: " Zaļš ", 
    choice2: " Sarkans ", 
    choice3: " Zils ", 
    choice4: " Dzeltens ", 
    answer: 2 
},
{
    question: " Kāds ir ieteicamais apgaismojums, strādājot pie datora? ", 
    choice1: " 100 ls ", 
    choice2: " 300 ls ", 
    choice3: " 400 lx ", 
    choice4: "500 lk ", 
    answer: 4 
},
{
    question: " Kurš ir galvenais normatīvais akts darba tiesisko attiecību jomā? ", 
    choice1: " Darba likums ", 
    choice2: " Darba aizsardzības likums ", 
    choice3: " Bezdarbnieku un darba meklētāju atbalsta likums ", 
    choice4: " Likums \"Par apdrošināšanu bezdarba gadījumam\" ", 
    answer: 2 
},
{
    question: " Ar kādu līgumu darba devējs un darbinieks nodibina darba tiesiskās attiecības? ", 
    choice1: " Ar uzņēmuma līgumu ", 
    choice2: " Ar pilnvarojuma līgumu ", 
    choice3: " Ar darba līgumu ", 
    choice4: " Ar darba koplīgumu ", 
    answer: 3 
},
{
    question: " Kurš no zemāk minētajiem jautājumiem nav pieļaujams darba intervijas laikā? ", 
    choice1: " Par pretendenta iegūto izglītību ", 
    choice2: " Par pretendenta iepriekšējo darba pieredzi ", 
    choice3: " Par pretendenta nacionālo vai etnisko izcelsmi ", 
    choice4: " Par pretendenta valodu zināšanām ", 
    answer: 3 
},
{
    question: " Kādā formā un kad ir slēdzams darba līgums? ", 
    choice1: " Mutiski pirms darba uzsākšanas ", 
    choice2: " Rakstveidā pirms darba uzsākšanas ", 
    choice3: " Mutiski pēc darba uzsākšanas ", 
    choice4: " Rakstveidā pēc darba uzsākšanas ", 
    answer: 2 
},
{
    question: " Kādu termiņu paredz Darba likums uz noteiktu laiku noslēgtam darba līgumam (ieskaitot termiņa pagarinājumus)?", 
    choice1: " Tas nevar būt ilgāks par vienu gadu ", 
    choice2: " Tas nevar būt ilgāks par diviem gadiem ", 
    choice3: " Tas nevar būt ilgāks par trīs gadiem ", 
    choice4: " Tas nevar būt ilgāks par pieciem gadiem ", 
    answer: 4 
},
{
    question: " Kāds ir maksimālais pārbaudes laika termiņš, noslēdzot darba līgumu ar darbinieku? ", 
    choice1: " Viens mēnesis ", 
    choice2: " Divi mēneši ", 
    choice3: " Trīs mēneši ", 
    choice4: " Četri mēneši ", 
    answer: 3 
},
{
    question: " Cik lielā attālumā no acīm jābūt novietotam monitoram? ", 
    choice1: " 30-50 cm ", 
    choice2: " 50-70 cm ", 
    choice3: " 70-90 cm ", 
    choice4: " 90-100 cm ", 
    answer: 2 
},
{
    question: " Cik grādu leņķī zem acu līmeņa vajadzētu atrasties datora ekrāna apakšējai malai ? ", 
    choice1: " 00-100", 
    choice2: " 100-200", 
    choice3: "200-300 ", 
    choice4: "300-400 ", 
    answer: 1 
},
{
    question: " Personas datu aizsardzības uzraudzību veic... ", 
    choice1: " Datu valsts inspekcija ", 
    choice2: " Tieslietu ministrijas ", 
    choice3: " Ekonomikas policija ", 
    choice4: " Policija ", 
    answer: 1 
},
{
    question: " Kura ir informācijas tehnoloģiju drošības incidentu novēršanas institūcija Latvijā? ", 
    choice1: " LIKTA ", 
    choice2: " LAKA.LV ", 
    choice3: " CERT.LV ", 
    choice4: " ISACA ", 
    answer: 3 
},
{
    question: " Kurš dokuments ir jāiekļauj minimālajā dokumentācijas komplektā, kas nepieciešams, izstrādājot programmatūru? ", 
    choice1: " Projekta dienasgrāmata ", 
    choice2: " Programmatūras izstrādes plāns ", 
    choice3: " Lietotāja rokasgrāmata ", 
    choice4: " Problēmu ziņojumi ", 
    answer: 3 
},
{
    question: " Kuri no nosauktajiem nav sensitīvi personas dati? ", 
    choice1: " Personas dati, kas norāda personas dzimšanas datus ", 
    choice2: " Personas dati, kas norāda personas dalību arodbiedrībās ", 
    choice3: " Personas dati, kas norāda personas reliģisko pārliecību ", 
    choice4: " Personas dati, kas norāda personas etnisko izcelsmi ", 
    answer: 1 
},
{
    question: " Kurš Licences veids nav minēts Autortiesību likumā? ", 
    choice1: " Izņēmuma licence ", 
    choice2: " Vispārēja licence ", 
    choice3: " Individuālā licence ", 
    choice4: " Vienkāršā licence ", 
    answer: 3 
},
{
    question: " Kas, saskaņā ar Fizisko personu datu aizsardzības likumu, ir personas dati? ", 
    choice1: " Informācija, kas attiecas uz identificējamu fizisku vai juridisku personu ", 
    choice2: " Informācija, kas attiecas uz identicētu vai identificējamu fizisko personu ", 
    choice3: " Informācija, kas attiecas uz identificējamu juridisku personu ", 
    choice4: " Informācija, kas attiecas uz jebkuru fizisko personu ", 
    answer: 1 
},
{
    question: " Datu bāzes veidotāja tiesības ir spēkā ... ", 
    choice1: " 10 gadus ", 
    choice2: " 15 gadus ", 
    choice3: "25 gadus ", 
    choice4: "50 gadus ", 
    answer: 2 
},


{
    question: "Informācijas atklātības likumā ir definēts, ka pastāv vispārpieejamā informācija un ierobežotas pieejamības informācija. Vai ierobežotās pieejamības informācija no šī likuma viedokļa kļūst par vispārpieejamo informāciju, ja kāds to nelegāli publicē? ", 
    choice1: "Ierobežotās pieejamības informācija saglabā savu statusu", 
    choice2: "Ierobežotās pieejamības informācija kļūst par vispārpieejamo informāciju", 
    choice3: "Ierobežotās pieejamības informācija saglabā savu statusu tikai noteiktai lietotāju grupai", 
    choice4: "Ierobežotās pieejamības informācija kļūst par vispārpieejamo informāciju tikai noteiktai lietotāju grupai", 
    answer: 1
},
{
    question: "Uz cik ilgu laiku var noteikt pieejamības statusu informācijai?", 
    choice1: "Viss atkarīgs no informācijas autora vai iestādes vadītāja, kurš termiņu nosaka pēc saviem ieskatiem", 
    choice2: "Informācijas autors vai iestādes vadītājs ierobežotas pieejamības statusu informācijai nosaka uz laiku, kas nav ilgāks par desmit gadiem ", 
    choice3: "Informācijas autors vai iestādes vadītājs ierobežotas pieejamības statusu informācijai nosaka uz laiku, kas nav ilgāks par vienu gadu ", 
    choice4: "Informācijas autors vai iestādes vadītājs ierobežotas pieejamības statusu informācijai nosaka uz laiku, kas nav ilgāks par trīs gadiem ", 
    answer: 1
},
{
    question: " Vai ierobežotas pieejamības informācija automātiski var mainīt savu statusu un kļūt par vispārpieejamo informāciju?", 
    choice1: " Nē, tas nav iespējams ", 
    choice2: " Jā, ja informācijas autors pats nelegāli publisko šo ierobežotās pieejamības informāciju ", 
    choice3: " Jā, ja attiecīgā iestāde nav reģistrējusi ierobežotās lietošanas informāciju normatīvajos aktos noteiktajā kārtībā ", 
    choice4: " Jā, ja beidzies termiņš, uz kādu informācijai noteikts ierobežotas pieejamības statuss, vai, ja ierobežotas pieejamības statuss ir atcelts pirms likumā noteiktā termiņa ", 
    answer: 1 
},
{
    question: " Kas ir komercnoslēpums? ", 
    choice1: " Komersanta radīta vai komersantam piederoša informācija, kuras atklāšana varētu būtiski negatīvi ietekmēt komersanta konkurētspēju ", 
    choice2: " Informācija, kas ir saistīta ar valsts pārvaldes funkciju vai uzdevumu izpildi ", 
    choice3: " Informācija, kas ir saistīta ar valsts un pašvaldību publiskajiem iepirkumiem ", 
    choice4: " Informācija, kas ir saistīta ar komersanta publiskajiem iepirkumiem ", 
    answer: 1 
},
{
    question: " Informācijas tehnoloģiju drošības likumā ir definēts, ka Drošības incidentu novēršanas institūcijas tiesības ir... ", 
    choice1: " Iegūt no valsts un pašvaldību institūcijām un privāto tiesību juridiskajām personām pēc abpusējas vienošanās tiešsaistes datu plūsmas tehniskos parametrus ", 
    choice2: " Iegūt no privāto tiesību juridiskajām personām un fiziskajām personām pēc abpusējas vienošanās tiešsaistes datu plūsmas tehniskos parametrus ", 
    choice3: " Iegūt no valsts un pašvaldību institūcijām un privāto tiesību juridiskajām personām bez abpusējas vienošanās izmantojamo programmu licenču informāciju ", 
    choice4: " Iegūt no valsts un pašvaldību institūcijām un privāto tiesību juridiskajām personām bez abpusējas vienošanās tiešsaistes P2P programmu (torentu utt.) datu plūsmas informatīvos parametrus ", 
    answer: 1
},
{
    question: " Drošības incidentu novēršanas institūcija ir tiesīga saņemt un apstrādāt personas datus gadījumā, ja... ", 
    choice1: " Kaitnieciskā programmatūra varētu dot pieeju citu personu datiem ", 
    choice2: " Daudzu personu privātie dati tiek izmantoti kaitnieciskas programmatūras vadībai (paroļu ģeneratori u.tml.) ", 
    choice3: " Personas dati var sniegt būtisku informāciju par kaitniecisku programmatūru ", 
    choice4: " Nevienai institūcijai nav tiesības izmantot personu privātos datus savai darbībai ", 
    answer: 1
},
{
    question: " Kādas darbības jāveic publiskajam elektronisko sakaru komersantam pēc Drošības incidentu novēršanas institūcijas pieprasījuma? ", 
    choice1: " Jākonstatē galalietotājs, kurš izsūta kaitniecisko programmatūru, un par to jāziņo attiecīgajai iestādei ", 
    choice2: " Īslaicīgi (ne ilgāk kā uz 24 stundām) jāslēdz galalietotāja piekļuve elektronisko sakaru tīklam ", 
    choice3: " Galalietotājs publiski jābrīdina par tā kaitnieciskās darbības sekām ", 
    choice4: " Drošības incidentu novēršanas institūcija publiskajam sakaru komersantam neko nevar pieprasīt ", 
    answer: 1
},
{
    question: " Kādu elektronisko parakstu saskaņā ar Elektronisko dokumentu likumu var uzskatīt par drošu? ", 
    choice1: " Tādu, kas ir piesaistīts vienīgi parakstītājam, nodrošina parakstītāja personas identifikāciju, ir radīts ar drošiem elektroniskā paraksta radīšanas līdzekļiem, kurus var kontrolēt tikai parakstītājs ", 
    choice2: " Tādu, kura kodēšanai tiek izmantota 1024 bitu kodu atslēga ", 
    choice3: " Tādu, kurš ir piesaistīts vienīgi specializētai elektroniskā paraksta veidošanas aparatūrai ", 
    choice4: " Tādu, kura veidošanai tiek izmantots specializēts autorizācijas serveris, kurš kontrolē kodu atslēgas ", 
    answer: 1
},
{
    question: " Elektroniskā paraksta veidošanas sistēmā tiek izmantoti Kvalifikācijas sertifikāti. Uzticamais sertifikācijas pakalpojumu sniedzējs var anulēt tā izsniegto kvalifikācijas sertifikātu, ja ir pamats uzskatīt, ka elektroniskā paraksta radīšanas… ", 
    choice1: " Programmatūra tiek izmantota uz inficēta datora ", 
    choice2: " Aparatūrai ir beigusies ražotāja garantija ", 
    choice3: " Aparatūra tiek izmantota citā datu pārraides tīklā ", 
    choice4: " Dati izmantoti bez parakstītāja ziņas ", 
    answer: 1
}
]


function startTest(){
    
    let checkboxes = document.querySelectorAll('input[name="Test"]:checked'); 
    if (checkboxes.length === 0){
        alert("Lūdzu izvēlaties vismaz vienu tēmu!");
        return;
    } 
    let checkedBoxes = document.querySelectorAll('input[name="Test"]:checked');
    let values = [];
    checkedBoxes.forEach((checkbox) =>{
        values.push(checkbox.value)
    });
    
    if(document.getElementById("radio2").checked){
        questionCountPerTheme = 5
    }else if(document.getElementById("radio3").checked){
        questionCountPerTheme = 10
    }else{
        questionCountPerTheme = 3
    }
    

    values.includes("Programmēšanas valodas") ? addPVQuestions() : null;
    values.includes("Algoritmi, datu tipi, struktūras") ? addADTSQuestions() : null;
    values.includes("Datu bāzu tehnoloģijas") ? addDBQuestions() : null;
    values.includes("Web programmēsanas pamati") ? addWPPQuestions() : null;
    values.includes("Operētājsistēmas, operētājsistēmu uzbūves pamati") ? addOSQuestions() : null;
    values.includes("Biroja tehnika") ? addBTQuestions() : null;
    values.includes("Valsts normatīvo aktu prasības") ? addVNAPQuestions() : null;
    
    startTimer(true);

    currentQuestion = testQuestions[currentQuestionIndex]
    question.innerText = currentQuestion.question
        
    updateQuestionFontSize()


    showUpdate()

    choices.forEach((choice) =>{


        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]

        choice.classList.remove("choice-short")
        choice.classList.remove("choice-medium")
        choice.classList.remove("choice-long")
    
        if(currentQuestion['choice'+number].length > 120){
            choice.classList.add("choice-long")
        }else if(currentQuestion['choice'+number].length > 50)
            choice.classList.add("choice-medium")
        else{
            choice.classList.add("choice-short")
        }
    })

    document.getElementById("checkboxes").style.display = "none";
    document.getElementById("startTestBtn").style.display ="none";
    document.getElementById("topBit").style.display="none";
    document.getElementById("startRadio").style.display="none";

    // Shows questions and choice answers
    document.getElementById("nxtQuestion").style.display = "inline";
    document.getElementById("prevQuestion").style.display = "inline";
    document.getElementById("progress").style.display = "inline"

    document.getElementById("c1").style.display = "flex";
    document.getElementById("c2").style.display = "flex";
    document.getElementById("c3").style.display = "flex";
    document.getElementById("c4").style.display = "flex";
    document.getElementById("question").style.display = "inline";

    choices.forEach((choice) =>{
        choice.addEventListener('click', (event) =>{
            
            selectedChoice = event.target;
            removeSelect()


            selectedChoice.classList.add("selected");

        })
    })

    

};

function nextQuestion(){

    if(testQuestions.length-2 == currentQuestionIndex){
        showFinishTestBtn()
    }

    if(selectedChoice == "None" || selectedChoice == 0){
        alert("Please select a choice!")
        return;
    }
    if(userAnswerArray.length >= 0 ){ // This fixes something
        selectedChoice.classList.remove("selected")
    }
    

    
    
    selectedAnswer = selectedChoice.dataset['number']
    correctAnswer = testQuestions[currentQuestionIndex].answer;

    

    userAnswerArray[currentQuestionIndex] = selectedAnswer
    correctQuestionArray[currentQuestionIndex] = correctAnswer;


    currentQuestionIndex++;

    console.log(userAnswerArray)
    console.log(correctQuestionArray)


    showUpdate()


    currentQuestion = testQuestions[currentQuestionIndex]
    question.innerText = currentQuestion.question

    updateQuestionFontSize()

    if(userAnswerArray.length > currentQuestionIndex){
        // when user goes back to previous question and comes back to next question, the selected question doesn't show up
           document.querySelector(`[data-number="${userAnswerArray[currentQuestionIndex]}"]`).classList.add("selected")
        }

    choices.forEach((choice) =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]

        choice.classList.remove("choice-short")
        choice.classList.remove("choice-medium")
        choice.classList.remove("choice-long")
        

    
        if(currentQuestion['choice'+number].length > 120){
            choice.classList.add("choice-long")
        }else if(currentQuestion['choice'+number].length > 50)
            choice.classList.add("choice-medium")
        else{
            choice.classList.add("choice-short")
        }
    })
    selectedChoice = "None"
}

function previousQuestion(){
    
    if(currentQuestionIndex == 0){
        alert("Testa sākums")
        return;
    }
    showNextQuestionBtn()

    currentQuestionIndex--;
    
    showUpdate()
    removeSelect();
    document.querySelector(`[data-number="${userAnswerArray[currentQuestionIndex]}"]`).classList.add("selected")

    currentQuestion = testQuestions[currentQuestionIndex]
    question.innerText = currentQuestion.question
    updateQuestionFontSize()

    choices.forEach((choice) =>{
        
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]

        choice.classList.remove("choice-short")
        choice.classList.remove("choice-medium")
        choice.classList.remove("choice-long")
    
        if(currentQuestion['choice'+number].length > 120){
            choice.classList.add("choice-long")
        }else if(currentQuestion['choice'+number].length > 60)
            choice.classList.add("choice-medium")
        else{
            choice.classList.add("choice-short")
        }
        
    })
    

};

function addPVQuestions(){
    arrLength = pvQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(pvQuestions[arr[i]])
    }
}
function addDBQuestions(){
    arrLength = dbQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(dbQuestions[arr[i]])
    }
}
function addADTSQuestions(){
    arrLength = adtsQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(adtsQuestions[arr[i]])
    }
}
function addWPPQuestions(){
    arrLength = wppQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(wppQuestions[arr[i]])
    }
}
function addOSQuestions(){
    arrLength = osQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(osQuestions[arr[i]])
    }
}
function addBTQuestions(){
    arrLength = btQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(btQuestions[arr[i]])
    }
}
function addVNAPQuestions(){
    arrLength = vnapQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(vnapQuestions[arr[i]])
    }
}

function chooseTestQuestions(arrayLength){
    let usedQuestions = [];
    let wantQuestionCount = 0;
    let randNum = 0;

    while(wantQuestionCount != questionCountPerTheme){
        randNum = Math.floor(Math.random() * arrayLength)
        if(usedQuestions.includes(randNum)){
            continue;
        }else{
            usedQuestions.push(randNum);
            wantQuestionCount++;

        }
        
    }
    return usedQuestions;
}

function removeSelect(){
    document.querySelector('[data-number="4"]').classList.remove("selected")
    document.querySelector('[data-number="3"]').classList.remove("selected")
    document.querySelector('[data-number="2"]').classList.remove("selected")
    document.querySelector('[data-number="1"]').classList.remove("selected")
};

function finishTest(){

    

    selectedAnswer = selectedChoice.dataset['number']
    correctAnswer = testQuestions[currentQuestionIndex].answer;
    userAnswerArray[currentQuestionIndex] = selectedAnswer
    correctQuestionArray[currentQuestionIndex] = correctAnswer;


    for(let i = 0; i < testQuestions.length; i++){
        if(parseInt(userAnswerArray[i]) != correctQuestionArray[i]){
            wrongIds.push(i)
        }
    }



    
    if(wrongIds.length > 0){
        rightAnwer.innerHTML =  testQuestions[wrongIds[0]]['choice'+correctQuestionArray[wrongIds[0]]]
        wrongAnser.innerHTML = testQuestions[wrongIds[0]]['choice'+userAnswerArray[wrongIds[0]]]
        wrongQuestion.innerHTML = testQuestions[wrongIds[0]].question
        if(testQuestions[wrongIds[0]]['choice'+userAnswerArray[wrongIds[0]]].length > 120){
            wrongAnser.classList.add("choice-long")
        }else if(testQuestions[wrongIds[0]]['choice'+userAnswerArray[wrongIds[0]]].length > 60){
            wrongAnser.classList.add("choice-medium")
        }else{
            wrongAnser.classList.add("choice-short")
        }
        if(testQuestions[wrongIds[0]]['choice'+correctQuestionArray[wrongIds[0]]].length > 120){
            rightAnwer.classList.add("choice-long")
        }else if(testQuestions[wrongIds[0]]['choice'+correctQuestionArray[wrongIds[0]]].length > 60){
            rightAnwer.classList.add("choice-medium")
        }else{
            rightAnwer.classList.add("choice-short")
        } 

        document.getElementById("forWrong").style.display = "inline"
        document.getElementById("questionEndScreen").style.display = "inline"
        document.getElementById("checkCorrect").style.display = "inline"
        
    }




    sec = Math.floor((elapsedTime / 1000) % 60);
    min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hr = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    let spentTime = hr / 60 + min

    let correctQuestions = () =>{
        let correct = 0;
        for(let i = 0; i < testQuestions.length; i++){
            if(parseInt(userAnswerArray[i]) == correctQuestionArray[i]){
                correct++;
            }
            else{
                continue;
            }
        }
        return correct;
        
    }




    console.log(userAnswerArray)
    console.log(correctQuestionArray)

    document.getElementById("correctQuestions").innerText = `You got  ${correctQuestions()} out of ${testQuestions.length} questions right!\n You finished the test in ${spentTime} minutes and ${sec} seconds!`
    startTimer(false);


    document.getElementById("questionEndScreen").style.display = "inline";
    
    document.getElementById("correctQuestions").style.display = "inline";

    document.getElementById("mainMenuBtn").style.display = "inline"
    document.getElementById("nxtQuestion").style.display = "none";
    document.getElementById("prevQuestion").style.display = "none";
    document.getElementById("finishTest").style.display = "none";
    document.getElementById("progress").style.display = "none"

    document.getElementById("c1").style.display = "none";
    document.getElementById("c2").style.display = "none";
    document.getElementById("c3").style.display = "none";
    document.getElementById("c4").style.display = "none";
    document.getElementById("question").style.display = "none";



}

function showFinishTestBtn(){
    document.getElementById("nxtQuestion").style.display = "none"
    document.getElementById("finishTest").style.display = "inline"
}

function showNextQuestionBtn(){
    document.getElementById("nxtQuestion").style.display = "inline"
    document.getElementById("finishTest").style.display = "none"
}

function goBackToStartScreen(){

    document.getElementById("endScreenOutput").style.display = "none";
    document.getElementById("correctQuestions").style.display = "none"
    document.getElementById("checkCorrect").style.display = "none"
    document.getElementById("mainMenuBtn").style.display = "none"
    document.getElementById("checkboxes").style.display = "inline";
    document.getElementById("startTestBtn").style.display ="inline";
    document.getElementById("topBit").style.display="inline";
    document.getElementById("startRadio").style.display="inline";

    document.getElementById("radio2").checked = true

    questionCountPerTheme = 0
    currentQuestionIndex = 0
    correctQuestionArray = []
    userAnswerArray = []
    selectedChoice = 0;

    selectedAnswer;
    correctAnswer;

    testQuestions = []
    arrLength = 0

    removeSelect()


    let checkboxes = document.getElementsByName('Test');
        
    for(var i= 0; i<checkboxes.length; i++){
        
    checkboxes[i].checked = false;}
        
        

}

function showUpdate(){
    document.getElementById("progress").innerText = `Question ${currentQuestionIndex+1} out of ${testQuestions.length}`
}

function updateQuestionFontSize(){
    question.classList.remove("long-text")
    question.classList.remove("medium-text")
    question.classList.remove("short-text")

    if(currentQuestion.question.length > 150){
        question.classList.add("long-text")
    }else if(currentQuestion.question.length > 70)
        question.classList.add("medium-text")
    else{
        question.classList.add("short-text")
    }
}

function updateChoiceFontSize(){
    question.classList.remove("choice-short")
    question.classList.remove("choice-medium")
    question.classList.remove("choice-long")

    if(currentQuestion.question.length > 100){
        question.classList.add("choice-long")
    }else if(currentQuestion.question.length > 40)
        question.classList.add("choice-medium")
    else{
        question.classList.add("choice-short")
    }
}

function startTimer(bool){
 if(!bool){
    sec = 0;
    min = 0;
    hr = 0; 
    clearInterval(interval)
    elapsedTime = 0;
    timer.style.display = "none"
    return
}
timer.style.display = "inline";
startTime = Date.now();
interval = setInterval(updateTimeOnTimer, 250)

}
function updateTimeOnTimer(){
    elapsedTime = Date.now() - startTime;

    sec = Math.floor((elapsedTime / 1000) % 60);
    min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hr = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    sec = pad(sec);
    min = pad(min);
    hr = pad(hr);

    timer.innerHTML = `${hr}:${min}:${sec}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}

function nextWrongQuestion(){
    if(wrongIds.length <= wrongQuestionIndex+1){
        alert("Beigas klāt")
        return;
    }

    wrongQuestionIndex++
    rightAnwer.classList.remove("choice-short")
    rightAnwer.classList.remove("choice-medium")
    rightAnwer.classList.remove("choice-long")
    wrongAnser.classList.remove("choice-short")
    wrongAnser.classList.remove("choice-medium")
    wrongAnser.classList.remove("choice-long")
    let right = testQuestions[wrongIds[wrongQuestionIndex]]['choice'+correctQuestionArray[wrongIds[wrongQuestionIndex]]]
    let wrong = testQuestions[wrongIds[wrongQuestionIndex]]['choice'+userAnswerArray[wrongIds[wrongQuestionIndex]]]
    rightAnwer.innerHTML =  right
    wrongAnser.innerHTML = wrong
    wrongQuestion.innerHTML = testQuestions[wrongIds[wrongQuestionIndex]].question

    if(wrong.length > 120){
        wrongAnser.classList.add("choice-long")
    }else if(wrong.length > 60){
        wrongAnser.classList.add("choice-medium")
    }else{
        wrongAnser.classList.add("choice-short")
    }
    if(right.length > 120){
        rightAnwer.classList.add("choice-long")
    }else if(right.length > 60){
        rightAnwer.classList.add("choice-medium")
    }else{
        rightAnwer.classList.add("choice-short")
    }   
}

function previousWrongQuestion(){
    if(wrongQuestionIndex == 0){
        alert("Sākums")
        return;
    }
    wrongQuestionIndex--
    rightAnwer.classList.remove("choice-short")
    rightAnwer.classList.remove("choice-medium")
    rightAnwer.classList.remove("choice-long")
    wrongAnser.classList.remove("choice-short")
    wrongAnser.classList.remove("choice-medium")
    wrongAnser.classList.remove("choice-long")

    let right = testQuestions[wrongIds[wrongQuestionIndex]]['choice'+correctQuestionArray[wrongIds[wrongQuestionIndex]]]
    let wrong = testQuestions[wrongIds[wrongQuestionIndex]]['choice'+userAnswerArray[wrongIds[wrongQuestionIndex]]]
    rightAnwer.innerHTML =  right
    wrongAnser.innerHTML = wrong
    wrongQuestion.innerHTML = testQuestions[wrongIds[wrongQuestionIndex]].question

    if(wrong.length > 120){
        wrongAnser.classList.add("choice-long")
    }else if(wrong.length > 60){
        wrongAnser.classList.add("choice-medium")
    }else{
        wrongAnser.classList.add("choice-short")
    }
    if(right.length > 120){
        rightAnwer.classList.add("choice-long")
    }else if(right.length > 60){
        rightAnwer.classList.add("choice-medium")
    }else{
        rightAnwer.classList.add("choice-short")
    } 
}
