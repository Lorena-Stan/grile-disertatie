const questions = [
  {
    "id": 1,
    "intrebare": "Toful gutos defineste:",
    "variante": [
      "un granulom de corp strain inert",
      "o distrofie protidica",
      "depunerile de acid uric si urati la nivel articular"
    ],
    "corect": 0
  },
  {
    "id": 2,
    "intrebare": "Aparitia semnelor de calduri la femele castrate este determinata de:",
    "variante": [
      "ovarita parenchimatoasa",
      "gestatie",
      "reminescenta ovariana"
    ],
    "corect": 2
  },
  {
    "id": 3,
    "intrebare": "Consecin?ele chisturilor paraovariene sunt:",
    "variante": [
      "nu sunt relevante",
      "hiperestrogenism",
      "infertilitate"
    ],
    "corect": 0
  },
  {
    "id": 4,
    "intrebare": "Absen?a caldurilor la femele poate fi determinat? de:",
    "variante": [
      "chisturile paraovariene",
      "chisturile foliculare",
      "chisturile pancreatice"
    ],
    "corect": 1
  },
  {
    "id": 5,
    "intrebare": "Vehicularea, prin intermediul sistemului cardiovascular, a unor agregate straine de compozitia normala a sangelui poarta denumirea de:",
    "variante": [
      "tromboza",
      "limfopenie",
      "embolie"
    ],
    "corect": 2
  },
  {
    "id": 6,
    "intrebare": "Prezenta unei populatii monomorfe de celule ce manifesta diferite grade de atipie, defineste:",
    "variante": [
      "un proces inflamator acut",
      "un proces neoplazic",
      "un proces inflamator parenchimatos"
    ],
    "corect": 1
  },
  {
    "id": 7,
    "intrebare": "Consecin?ele prolapsului uterin sunt:",
    "variante": [
      "scaderea tonusului uterin, cahexia, hiperestrogenismul",
      "aderente fibroase peritoneale",
      "staza sangvina, necroza si infectie"
    ],
    "corect": 2
  },
  {
    "id": 8,
    "intrebare": "Encefalopatiile spongiforme transmisibile au origine:",
    "variante": [
      "prionica",
      "bacteriana",
      "virala"
    ],
    "corect": 0
  },
  {
    "id": 9,
    "intrebare": "Fatarile distocice favorizeaza:",
    "variante": [
      "lactatie falsa",
      "ruptura uterina",
      "uichisturi ovariene"
    ],
    "corect": 1
  },
  {
    "id": 10,
    "intrebare": "Hipoplazia functiei ovariene determin?:",
    "variante": [
      "hidrometru",
      "atrofia endometrului",
      "hiperestrogenism"
    ],
    "corect": 1
  },
  {
    "id": 11,
    "intrebare": "In cadrul procesului inflamator proliferativ, dominanta celulara este reprezentata de:",
    "variante": [
      "neutrofile si fibroblaste",
      "fibrocite si fibre de colagen",
      "limfocite si macrofage"
    ],
    "corect": 2
  },
  {
    "id": 12,
    "intrebare": "Rahitismul se caracterizeaza prin:",
    "variante": [
      "oase moi, cu canal medular largit",
      "porozitate crescuta a oaselor",
      "curbarea si ingrosarea oaselor lungi"
    ],
    "corect": 2
  },
  {
    "id": 13,
    "intrebare": "Hiperplazia endometrului poate fi determinat? de:",
    "variante": [
      "hepatosteatoza",
      "intoxicatia cu lucerna",
      "consumul de plante fitoestrogene"
    ],
    "corect": 2
  },
  {
    "id": 14,
    "intrebare": "Endometrita apare mai frecvent in:",
    "variante": [
      "estru",
      "anestru",
      "metestrus"
    ],
    "corect": 0
  },
  {
    "id": 15,
    "intrebare": "Guta articulara este o distrofie datorata:",
    "variante": [
      "depunerii acidului uric si a sarurilor acestuia la nivel articular",
      "maturarii vicioase a cartilajelor articulare",
      "acumularii unei colectii lichidiene la nivel articular"
    ],
    "corect": 0
  },
  {
    "id": 16,
    "intrebare": "Apoptoza celulelor prostatice este determinata de:",
    "variante": [
      "scaderea testosteronului din sange",
      "administrarea de acid acetilsalicilic",
      "cresterea hormonilor estrogeni"
    ],
    "corect": 0
  },
  {
    "id": 17,
    "intrebare": "Hidrartroza reprezinta:",
    "variante": [
      "un proces inflamator",
      "o tulburare circulatorie",
      "o malformatie congenitala"
    ],
    "corect": 1
  },
  {
    "id": 18,
    "intrebare": "Osteomalacia reprezinta:",
    "variante": [
      "ramolirea sau inmuierea oaselor",
      "rarefactia osului la tineret",
      "o tumora osoasa"
    ],
    "corect": 0
  },
  {
    "id": 19,
    "intrebare": "Cresterea numarului de celule keratinizate anucleate la nivelul epidermului poarta\ndenumirea de:",
    "variante": [
      "paracheratoza",
      "discheratoza",
      "hipercheratoza"
    ],
    "corect": 2
  },
  {
    "id": 20,
    "intrebare": "Dilatatia cardiaca necesita diagnostic diferential fata de:",
    "variante": [
      "hipetrofia concentrica",
      "pericardita fibroasa",
      "hipertrofia excentrica"
    ],
    "corect": 2
  },
  {
    "id": 21,
    "intrebare": "Stadiul final a furunculozei este:",
    "variante": [
      "dermatita fibroasa",
      "dermatita subepidermica pustuloasa",
      "hiperelastoza cutanata"
    ],
    "corect": 0
  },
  {
    "id": 22,
    "intrebare": "Rinitele acute pot imbraca urmatoarele forme:",
    "variante": [
      "parazitara, atrofica, fibroasa",
      "catarala, purulenta, fibroasa",
      "catarala, seroasa, purulenta"
    ],
    "corect": 2
  },
  {
    "id": 23,
    "intrebare": "Inflamatia tesutului conjunctiv subcutanat poarta denumirea de:",
    "variante": [
      "paniculita",
      "dermatita",
      "conjunctivita"
    ],
    "corect": 0
  },
  {
    "id": 24,
    "intrebare": "Maceratia fetala reprezinta:",
    "variante": [
      "deshidratarea progresiv? a fetu?ilor mor?i ?i re?inu?i timp îndelungat în uter",
      "expulzarea unui fetus mort în intervalul de timp în care nou-n?scu?ii sunt viabili",
      "lichefierea ?esuturilor fetale moi ?i resorb?ia/eliminarea extern? a acestora"
    ],
    "corect": 2
  },
  {
    "id": 25,
    "intrebare": "Culoarea galben?, vizibil? în scler?, mucoase, piele nepigmentat?, ?esut adipos si pe unele organe interne este intalnita in:",
    "variante": [
      "intoxicatia cu rostopasca",
      "icter",
      "hipovitaminoza A\t"
    ],
    "corect": 1
  },
  {
    "id": 26,
    "intrebare": "Care dintre urmatoarele neoforma?iuni cutanate sunt de natura benigna?",
    "variante": [
      "osteosarcomul",
      "papilomul",
      "carcinomul"
    ],
    "corect": 1
  },
  {
    "id": 27,
    "intrebare": "Cheratitele sunt:",
    "variante": [
      "inflamatiile coroidei",
      "inflamatiile corpului ciliar",
      "inflamatiile corneei"
    ],
    "corect": 2
  },
  {
    "id": 28,
    "intrebare": "Extinderea procesului supurativ la ochiul s?n?tos poarta denumirea de:",
    "variante": [
      "oftalmia simpatica",
      "retinopatia degenerativa",
      "cherato-conjunctivita"
    ],
    "corect": 0
  },
  {
    "id": 29,
    "intrebare": "Prezenta celulelor gigante multinucleate este specifica unui proces",
    "variante": [
      "inflamator cronic",
      "tumoral",
      "distrofic"
    ],
    "corect": 0
  },
  {
    "id": 30,
    "intrebare": "Functia exocrina testiculara este asigurata de:",
    "variante": [
      "spermatozoizi",
      "prostata",
      "celulele epiteliului germinativ din tubii seminiferi"
    ],
    "corect": 2
  },
  {
    "id": 31,
    "intrebare": "Encefalita eozinofilica apare consecutiv:",
    "variante": [
      "intoxicatiei cu solanine",
      "intoxicatiei cu sare",
      "neurofibromului"
    ],
    "corect": 1
  },
  {
    "id": 32,
    "intrebare": "Tumora maligna a tesutului muscular neted poarta denumirea de:",
    "variante": [
      "rabdomiom",
      "leiomiosarcom",
      "rabdomiosarcom"
    ],
    "corect": 1
  },
  {
    "id": 33,
    "intrebare": "Freemartinismul se caracterizeaza prin:",
    "variante": [
      "subdezvoltare utero-ovariana",
      "absenta ovarelor",
      "hiperplazie vulvo-vaginala"
    ],
    "corect": 0
  },
  {
    "id": 34,
    "intrebare": "Aparitia unui sindrom de feminizare la masculi se datoreaza:",
    "variante": [
      "hipertiroidismului",
      "castrarii",
      "sertolinomului"
    ],
    "corect": 2
  },
  {
    "id": 35,
    "intrebare": "Metroragia reprezinta:",
    "variante": [
      "edematierea endometrului",
      "o hemoragie uterina",
      "o hemoragie digestiva"
    ],
    "corect": 1
  },
  {
    "id": 36,
    "intrebare": "Dezvoltarea exagerat? a unor grupe de mu?chi, datorit? cre?terii num?rului de fibre musculare poarta denumirea de:",
    "variante": [
      "hiperplazia fibrelor musculare",
      "amiotrofia musculara",
      "miodistrofia nutritionala"
    ],
    "corect": 0
  },
  {
    "id": 37,
    "intrebare": "Acumularea de lichid neinflamator la nivelul tunicii vaginale poarta denumirea de:",
    "variante": [
      "vaginita exudativa",
      "mucometrita",
      "hidrocel"
    ],
    "corect": 2
  },
  {
    "id": 38,
    "intrebare": "Boala muschilor albi apare consecutiv:",
    "variante": [
      "atrofiei musculare",
      "carentei nutritionale in vitamina E si seleniu",
      "atrofiei de denervare"
    ],
    "corect": 1
  },
  {
    "id": 39,
    "intrebare": "Aportul nutritiv scazut sau tulburarile de malabsorbtie determina:",
    "variante": [
      "atrofie cahectica",
      "hepatosteatoza",
      "encefalopatie spongiforma"
    ],
    "corect": 0
  },
  {
    "id": 40,
    "intrebare": "Acumularea de tesut adipos printre fibrele musculare poart? denumirea de:",
    "variante": [
      "steatoza musculara",
      "lipomatoza musculara",
      "fibrosteatoza"
    ],
    "corect": 1
  },
  {
    "id": 41,
    "intrebare": "Aspectul macroscopic de tesut ramolit, de culoare cenusiu-verzui, urat mirositor este specific:",
    "variante": [
      "gangrenei umede",
      "hipertrofiei musculare",
      " distrofie vacuolare"
    ],
    "corect": 0
  },
  {
    "id": 42,
    "intrebare": "Sarcomul Stiker este:",
    "variante": [
      "o tumora benigna",
      "o tumora maligna",
      "o inflamatie limfohistiocitara"
    ],
    "corect": 1
  },
  {
    "id": 43,
    "intrebare": "Infecunditatea este:",
    "variante": [
      "o tulburare definitiva a functiei de reproductie",
      "o tulburare pasagera a functiei de reproductie",
      "o tulburare de comportament"
    ],
    "corect": 1
  },
  {
    "id": 44,
    "intrebare": "Stomatita aftoasa este specifica:",
    "variante": [
      "pasteurelozei",
      "ectima contagioasa",
      "salmonelozei"
    ],
    "corect": 1
  },
  {
    "id": 45,
    "intrebare": "Epulidele sunt:",
    "variante": [
      "tumori gingivale",
      "inflamatii ale epiteliului cecal",
      "protuberante cartilaginoase pe razele osoase"
    ],
    "corect": 0
  },
  {
    "id": 46,
    "intrebare": "Edemul este o consecinta a:",
    "variante": [
      "hemoragiei",
      "efortului muscular",
      "stazei"
    ],
    "corect": 2
  },
  {
    "id": 47,
    "intrebare": "Esofagita de reflux apare în cazul:",
    "variante": [
      "dilacerarea musculaturii esofagiene",
      "inchiderii imperfecte a orificiului cardia",
      "absenta peristaltismului esofagian"
    ],
    "corect": 1
  },
  {
    "id": 48,
    "intrebare": "Sabloza se mai numeste:",
    "variante": [
      "meteorism",
      "supraincarcarea rumenului",
      "geosedimentoza"
    ],
    "corect": 2
  },
  {
    "id": 49,
    "intrebare": "Pericardita sclerogena este o inflamatie de tip:",
    "variante": [
      "exudativ",
      "proliferativ",
      "alterativ"
    ],
    "corect": 1
  },
  {
    "id": 50,
    "intrebare": "Lipofuscinoza intestinala se caracterizeaza prin:",
    "variante": [
      "fecale grase ca urmare a malabsorbtiei lipidelor",
      "pigmentarea maronie a musculaturii intestinale",
      "continut negricios in lumenul intestinal"
    ],
    "corect": 1
  },
  {
    "id": 51,
    "intrebare": "Capacitatea celulelor de a se multiplica, producând colonii, poarta denumirea de:",
    "variante": [
      "apoptoza",
      "citoproliferare",
      "citodiferentiere"
    ],
    "corect": 1
  },
  {
    "id": 52,
    "intrebare": "Enterita hemoragico-necrotica este:",
    "variante": [
      "un proces inflamator",
      "o distrofie pigmentara",
      "o tulburare circulatorie"
    ],
    "corect": 0
  },
  {
    "id": 53,
    "intrebare": "Colestaza defineste:",
    "variante": [
      "prezenta trombilor biliari si a pigmentilor biliari in celulele kupfer",
      "prezenta unor necroze difuze, centrolobulare",
      "fibroza masiva a parenchimului hepatic"
    ],
    "corect": 0
  },
  {
    "id": 54,
    "intrebare": "Apari?ia celulelor blastice, imature, în sângele periferic se datoreaza:",
    "variante": [
      "anemiei aregenerative",
      "hemolizei intravasculare",
      "insuficientei functionale a citodiabazei"
    ],
    "corect": 2
  },
  {
    "id": 55,
    "intrebare": "Cre?terea num?rului de eritrocite, peste limita superioar? a valorilor normale poart? denumirea de:",
    "variante": [
      "poliglobulie",
      "anemie",
      "hematopoieza"
    ],
    "corect": 0
  },
  {
    "id": 56,
    "intrebare": "Afectiunile hepatice predominant distrofice sunt:",
    "variante": [
      "hepatita interstitiala, ciroza hepatica, guta",
      "hepatosteatoza, amiloidoza, guta",
      "amiloidoza, hepatomul, colangiocarcinomul"
    ],
    "corect": 1
  },
  {
    "id": 57,
    "intrebare": "Hepatita granulomatoasa este intalnita in:",
    "variante": [
      "salmoneloza",
      "necrobaciloza ",
      "tuberculoza"
    ],
    "corect": 2
  },
  {
    "id": 58,
    "intrebare": "Ciroza hepatica este:",
    "variante": [
      "un proces distrofic",
      "un proces inflamator",
      "un proces tumoral"
    ],
    "corect": 1
  },
  {
    "id": 59,
    "intrebare": "Celulele implicate ?n modularea reactiilor alergice sunt:",
    "variante": [
      "neutrofilele",
      "eozinofilele",
      "celulele Kupffer"
    ],
    "corect": 1
  },
  {
    "id": 60,
    "intrebare": "Celula stem unipotenta din care se formeaza trombocitul este:",
    "variante": [
      "megacarioblastul",
      "prolimfoblastul",
      "reticulocitul"
    ],
    "corect": 0
  },
  {
    "id": 61,
    "intrebare": "Sc?derea num?rului de leucocite din sânge poart? denumirea de:",
    "variante": [
      "leucopenie",
      "limfopenie",
      "leucocitoza"
    ],
    "corect": 0
  },
  {
    "id": 62,
    "intrebare": "Inflamatia limbii poarta denumirea de:",
    "variante": [
      "glosita",
      "gingivita",
      "stomatita"
    ],
    "corect": 0
  },
  {
    "id": 63,
    "intrebare": "Leziunile care, coroborate, duc la stabilirea unui diagnostic de certitudine poarta denumirea de:",
    "variante": [
      "leziuni identice",
      "leziuni reversibile",
      "leziuni caracteristice"
    ],
    "corect": 2
  },
  {
    "id": 64,
    "intrebare": "Prezenta unei populatii monomorfe de celule ce manifesta diferite grade de atipie, defineste:",
    "variante": [
      "o colectie purulenta",
      "un proces inflamator acut",
      "un proces neoplazic"
    ],
    "corect": 2
  },
  {
    "id": 65,
    "intrebare": "Consecinta leziunilor celulare ireversibile este:",
    "variante": [
      "necrobioza",
      "apoptoza",
      "necroza"
    ],
    "corect": 1
  },
  {
    "id": 66,
    "intrebare": "Adaptarea celulelor la stres prin cresterea in dimensiuni poarta denumirea de:",
    "variante": [
      "homeostazie",
      "necrobioza",
      "hipertrofie"
    ],
    "corect": 2
  },
  {
    "id": 67,
    "intrebare": "Una dintre cauzele aparitiei atrofiei musculare este determinata de:",
    "variante": [
      "reducerea aportului sangvin",
      "excesul hormonal",
      "efortul muscular intens"
    ],
    "corect": 0
  },
  {
    "id": 68,
    "intrebare": "Ficat m?rit în volum, cu margini rotunjite, de culoare galben lutos, friabil, este descrierea:",
    "variante": [
      "amiloidozei hepatice",
      "steatozei hepatice",
      "necrozei hepatice"
    ],
    "corect": 1
  },
  {
    "id": 69,
    "intrebare": "Amiloidoza este o leziune de tip:",
    "variante": [
      "inflamator",
      "neoplazic",
      "distrofic"
    ],
    "corect": 2
  },
  {
    "id": 70,
    "intrebare": "Care dintre urmatoarele leziuni are un caracter reversibil?",
    "variante": [
      "metaplazia",
      "neoplazia",
      "guta"
    ],
    "corect": 0
  },
  {
    "id": 71,
    "intrebare": "Forma si rigiditatea celulelor este determinata de:",
    "variante": [
      "membrana celulara",
      "citoschelet",
      "nucleu"
    ],
    "corect": 1
  },
  {
    "id": 72,
    "intrebare": "Inhibi?ia profund? a sistemului nervos, cu p?strarea func?iilor vegetative de baz? defineste:",
    "variante": [
      "agonia",
      "moartea biologica",
      "coma"
    ],
    "corect": 2
  },
  {
    "id": 73,
    "intrebare": "Moartea datorata uzurii fiziologice poarta denumirea de:",
    "variante": [
      "fiziologica",
      "aparenta",
      "provocata"
    ],
    "corect": 0
  },
  {
    "id": 74,
    "intrebare": "Coagulii forma?i post-mortem vor fi diferen?ia?i de trombi aparuti in timpul vietii prin faptul ca:",
    "variante": [
      "apare doar in artere",
      "nu au aderenta",
      "contin mai multa fibrina"
    ],
    "corect": 1
  },
  {
    "id": 75,
    "intrebare": "Salpingita este:",
    "variante": [
      "o tumora a glandei mamare",
      "o distrofie uterine",
      "o inflamatie a trompelor uterine"
    ],
    "corect": 2
  },
  {
    "id": 76,
    "intrebare": "Septicemia este declansata de:",
    "variante": [
      "multiplicarea microorganismelor in sange",
      "ingerarea de substante toxice",
      "o reactie alergica"
    ],
    "corect": 0
  },
  {
    "id": 77,
    "intrebare": "Celulele epitelioide reprezinta:",
    "variante": [
      "celule tumorale",
      "celule de origine epiteliala",
      "celule macrofagic-like"
    ],
    "corect": 2
  },
  {
    "id": 78,
    "intrebare": "Hiperemia activa se defineste ca fiind:",
    "variante": [
      "cre?terea cantit??ii de sânge venos într-un teritoriu tisular",
      "extravazarea sangelui arterial din patul vascular si invadarea teritoriilor invecinate",
      "cre?terea cantit??ii de sânge arterial într-un teritoriu tisular"
    ],
    "corect": 2
  },
  {
    "id": 79,
    "intrebare": "Hiperemia pasiva se defineste ca fiind:",
    "variante": [
      "cresterea masei de sange in teritoriul venos si capilar datorita incetinirii si/sau reducerii cantitative a fluxului sangvin venos",
      "cresterea masei de sange in teritoriul venos si capilar datorita aparitiei trombilor si/sau embolilor in patul vascular",
      "cresterea masei de sange in teritoriul arterial si capilar datorita aparitiei trombilor si/sau embolilor in patul vascular"
    ],
    "corect": 0
  },
  {
    "id": 80,
    "intrebare": "Antracoza este ?ntalnita frecvent la:",
    "variante": [
      "viteii nou-nascuti",
      "cainii urbani, batrani",
      "femelele gestante"
    ],
    "corect": 1
  },
  {
    "id": 81,
    "intrebare": "Scurgerea unui sange de culoare rosu-negricos la sectionarea unui organ parenchimatos denota:",
    "variante": [
      "o ruptura de aorta",
      "un infarct",
      "o staza"
    ],
    "corect": 2
  },
  {
    "id": 82,
    "intrebare": "Scaderea progresiva a circulatiei arteriale defineste :",
    "variante": [
      "o ischemie",
      "un hematom",
      "un edem"
    ],
    "corect": 0
  },
  {
    "id": 83,
    "intrebare": "Calcificarile metastatice survin în cazul:",
    "variante": [
      "unui dezechilibru fosfocalcic",
      "hiperparatiroidismului",
      "unor tesuturi necrozate"
    ],
    "corect": 1
  },
  {
    "id": 84,
    "intrebare": "Prezenta unor pete rosii, subcutanate, bine delimitate, care nu dispar la compresiune atesta:",
    "variante": [
      "o hiperemie pasiva",
      "un edem inflamator",
      "o hemoragie"
    ],
    "corect": 2
  },
  {
    "id": 85,
    "intrebare": "Una dintre cauzele aparitiei trombilor este:",
    "variante": [
      "lezarea endoteliului vascular",
      "cresterea vitezei de circulatie a sangelui",
      "scaderea factorilor de coagulare"
    ],
    "corect": 0
  },
  {
    "id": 86,
    "intrebare": "Deshidratarea severa determina:",
    "variante": [
      "o poliglobulie relativa",
      "o anemie severa",
      " trombocitopenie"
    ],
    "corect": 0
  },
  {
    "id": 87,
    "intrebare": "Flebolitele sunt:",
    "variante": [
      "inflamatii ale venelor",
      "hemoragii capilare",
      "trombi venosi calcificati"
    ],
    "corect": 2
  },
  {
    "id": 88,
    "intrebare": "Structurile centrale ale limfopoiezei sunt reprezentate de:",
    "variante": [
      "maduva hematopoietica, limfonodurile si splina",
      "maduva hematopoietica, splina, timusul",
      "maduva hematopoietica, timusul si bursa Fabricius"
    ],
    "corect": 2
  },
  {
    "id": 89,
    "intrebare": "Metastazarea este o consecinta a:",
    "variante": [
      "proceselor inflamatorii acute",
      "emboliilor",
      "distrofiilor minerale"
    ],
    "corect": 1
  },
  {
    "id": 90,
    "intrebare": "Granulomul parazitar este constituit din:",
    "variante": [
      "zona centrala, necrotica si zona periferica, limfo-histiocitara si eozinocitara",
      "o singura zona reprezentata de necroza masiva si detritus parazitar",
      "zona centrala, fibrozata, zona periferica, eozinofilica"
    ],
    "corect": 0
  },
  {
    "id": 91,
    "intrebare": "Necroza produsa prin blocarea circulatiei sangvine intr-un teritoriu poarta denumirea de:",
    "variante": [
      "infarct",
      "metastaza",
      "ischemie"
    ],
    "corect": 0
  },
  {
    "id": 92,
    "intrebare": "Acumularea transudatului in cavitati poarta denumirea de:",
    "variante": [
      "peritonita",
      "hidropizie",
      "anasarca"
    ],
    "corect": 1
  },
  {
    "id": 93,
    "intrebare": "Chilotoraxul defineste:",
    "variante": [
      "hemoragie in cavitatea toracica",
      "inflamatia purulenta a cavitatii toracice",
      "limforagie in cavitatea toracica"
    ],
    "corect": 2
  },
  {
    "id": 94,
    "intrebare": "Enterita hemoragica se caracterizeaza prin:",
    "variante": [
      "prezenta unei colectii alb-sidefii pe suprafata mucoasei gastrice",
      "prezenta unei cantitati mari de sange in lumenul intestinal",
      "prezenta unui exudat rosiatic in structura peretilor intestinali"
    ],
    "corect": 2
  },
  {
    "id": 95,
    "intrebare": "Splina SAGO este specifica:",
    "variante": [
      "gutei",
      "amiloidozei",
      "steatozei"
    ],
    "corect": 1
  },
  {
    "id": 96,
    "intrebare": "Cre?terea, la nivel sangvin, a produ?ilor de catabolism ai bazelor purinice ?i depunerea lor în diferite ?esuturi ?i organe se intalneste in:",
    "variante": [
      "sindromul uremic",
      "guta",
      "anemie"
    ],
    "corect": 1
  },
  {
    "id": 97,
    "intrebare": "Colectiile lichidiene ce pot fi prezente la nivelul tunicii externe cardiace sunt reprezentate de:",
    "variante": [
      "hidrotoraxul si ascita",
      "endocarditele sero-fibrinoase si ascita",
      "chilo- si hemopericardul"
    ],
    "corect": 2
  },
  {
    "id": 98,
    "intrebare": "Inflamatiile predominant alterative sunt reprezentate de:",
    "variante": [
      "inflamatiile proliferative si granulomatoase",
      "inflamatiile parenchimatoase si necrotice",
      "inflamatiile parenchimatoase, catarale si purulente"
    ],
    "corect": 1
  },
  {
    "id": 99,
    "intrebare": "Depigmentarea senila a firului de par poarta denumirea de:",
    "variante": [
      "albinism",
      "canitie",
      "leucodermie"
    ],
    "corect": 1
  }
];