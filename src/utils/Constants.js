const kRegExpEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const kRegExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const kRegExpPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const kRegExpUserName = /^[a-zA-Z0-9_\.]+$/;

const adNames = {
  women: ["SHIRT / BLOUSE", "JUMPSUIT / DUNGAREES", "VEST", "SKIRT", "TROUSERS / SHORTS", "DRESS", "TUNIC", "JACKET"],
  man: ["SHIRT", "VEST", "PANTS", "JACKET"],
  child: [
    // Girl
    "SHIRT / BLOUSE",
    "JUMPSUIT / DUNGAREES",
    "VEST",
    "SKIRT",
    "TROUSERS / SHORTS",
    "PYJAMAS",
    "DRESS",
    "TUNIC",
    "JACKET",
    "SCHOOL APRON",
    "DISGUISE",

    // Boy
    "SHIRT",
    "PANTS",
  ],
};

const materialFabrics = [
  {
    title: "Ribbed edges",
    description:
      "The ribbing is used in sewing to make the edges of sleeves, collars, etc. stretch clothing in jersey, knit, fleece for sweatshirts etc. It is a knitted fabric which is mainly used to tighten certain parts of clothing.",
  },
  {
    title: "Chambray",
    description:
      "Chambray fabric is a light canvas whose warp is a colored thread and the weft a white thread. It is often used to make shirts and can also be used to make light clothing and accessories.100% cotton",
  },
  {
    title: "plain cotton",
    description: "Range of quality plain poplin fabrics 100% cotton - 125 g/m²",
  },
  {
    title: "cotton fabric",
    description:
      "Custom cotton fabrics: Polka dots, stars, stripes, checks, flowers... Light cotton fabrics for children and adults.",
  },
  {
    title: "Crepe/Polyester",
    description:
      "Fabrics made of polyester, muslin and textured crepe. Polyester fabrics are soft and fluid and can be transparent or opaque. Crepe is a fabric with a slight texture made from synthetic yarns crossed specifically to obtain an irregular effect. They are used to make blouses, skirts, flowing dresses with a nice drape. The crepe can even be used to make ceremonial clothes: wedding dress. This type of fabric also lends itself to being draped for fuzzier garments.",
  },
  {
    title: "Lace",
    description:
      "Cotton and polyester lace fabrics for clothing: wedding dresses, formal wear. But also for customization or decoration: appliqués, dream catchers. Also consider textile art.",
  },
  {
    title: "Water repellent",
    description:
      "Water-repellent fabrics can be used to make jackets and coats but also accessories. Softshell fabric is used to make windproof mid-season coats. It is made of a water-repellent membrane against the rain and a layer of breathable micro-fleece. Trench fabrics are fluid and light and will make it possible to make light rain jackets but also shopping bags for example. Water-repellent fabrics can be used to make bags or saddlebags.",
  },
  {
    title: "double gauze",
    description:
      "Double cotton gauze fabric for clothing and decoration. Double cotton gauze is actually two thin layers of cotton gauze connected by tiny, almost invisible stitches.",
  },
  {
    title: "Lining",
    description:
      "Satin lining for clothes, jackets, dresses, coats The satin lining has a nice hold and will also maintain your garment",
  },
  {
    title: "Scottish",
    description:
      "Scottish cut fabrics: burberry, checkered fabric, British fabric, Tartan... Different materials for this classic print.",
  },
  {
    title: "Sponge",
    description:
      "100% Oeko-tex certified cotton terry, thick quality 350 and 430 g/m² Very absorbent white and colored bamboo terry and microfiber, special washable diaper.",
  },
  {
    title: "Fake fur",
    description:
      "Acrylic faux fur cut fabric. Long pile or short pile for collars and cuffs, shepherd's vests, poufs, cushions. Synthetic fur lining.",
  },
  {
    title: "Festive",
    description: "Party fabrics, decoration, disguise, tulle, taffeta, sequins",
  },
  {
    title: "Felt",
    description:
      "Polyester felt fabric. Felt is used for decoration, disguises or accessories. Felt is a kind of soft and fine felt. It is classified as nonwovens since it is made up of many fibers compressed together.",
  },
  {
    title: "Net",
    description: "Net fabrics for bulk bag, washing bag, zero waste bag, bulk pocket.",
  },
  {
    title: "Gabardine",
    description:
      "Stretch or non-stretch gabardine fabric, in cotton or polyester. Gabardine is used for making pants especially but also for dresses in thick and rather stiff fabric. It will also be suitable for skirts and jackets.",
  },
  {
    title: "Jacquard",
    description: "Fabric type Jacquard, Brocade, damask... for making clothes such as jackets, dresses, skirts or pants.",
  },
  {
    title: "Jersey",
    description:
      "Jersey fabric is a thin, stretchy cotton fabric. It is used to make children's and adult clothes: skirts, pants, tops, pajamas... Also find viscose jersey fabrics more often appreciated for making women's clothes.",
  },
  {
    title: "Velor jersey",
    description: "Velor jersey fabric, for clothing and household linen: dressing gowns, pajamas, cuddly toys, etc.",
  },
  {
    title: "jersey sweatshirt",
    description:
      "Thick jersey fabrics, also called fleece, for making sweatshirts, jackets and sweaters. With a very soft side in brushed cotton or lighter terrycloth, jersey sweatshirt fabric is ideally sewn with a double feed foot and a double needle for keep its elasticity.",
  },
  {
    title: "Woolen",
    description:
      "Woolen type fabrics for making jackets, coats or textile art. Boiled wool, cashmere wool, polyester wool, plain and fancy",
  },
  {
    title: "Soft woolen fabric",
    description: "Fabric for making winter clothes such as dresses, skirts, pants, jackets",
  },
  {
    title: "Lange",
    description: "Very soft, the organic cotton or bamboo baby swaddle can also be used as a towel, glove, bed sheet or wipe",
  },
  {
    title: "Linen",
    description: "Range of 100% plain linen fabric, for making clothes: Shirts, pants, jackets...",
  },
  {
    title: "Meshes",
    description:
      "Knit and stretch fabrics for making adult and children's clothing. Knit-like stretch fabrics for making dresses, thin cardigans, sweaters.",
  },
  {
    title: "Quilted",
    description: "Quilted cotton piqué fabric for making sleeping bags, angel's nest, lining, accessories...",
  },
  {
    title: "Honeycomb",
    description: "Honeycomb terry fabrics of different qualities for making towels, tea towels, bathrobes, home accessories",
  },
  {
    title: "Cotton piqué",
    description: "Cotton piqué fabric, 100% cotton Plain and fancy fabrics, flat and quilted",
  },
  {
    title: "Fleece / comforter",
    description: "Fleece fabric cut, plain double-sided and printed, soft and light. For clothes, blankets, sleeping bags",
  },
  {
    title: "PUL washable diapers",
    description:
      "Special fabric for making washable diapers. PUL (Laminated Polyurethane) is a synthetic coating, quite flexible and relatively breathable. PUL is a waterproof and breathable material which is used to make protective pants for babies or incontinent people.",
  },
  {
    title: "Faux leather",
    description: "Faux leather fabric for clothing and making clothes but also for making accessories.",
  },
  {
    title: "Tulle",
    description:
      "Tulle fabric for making clothes, disguises and accessories or decoration.Tulle is a very light and transparent fabric with openings in the shape of regular hexagonal cells obtained by twisting the threads on themselves.",
  },
  {
    title: "Velvet",
    description:
      "Corduroy fabric by the meter, milleraies and large ribs, 100% cotton for making clothes: jackets, blazers, pants, cushions...",
  },
  {
    title: "Gingham",
    description:
      "Dyed woven gingham fabric: The yarns are dyed before being woven, which ensures that the pattern is always aligned with the weft of the fabric",
  },
];

export { kRegExpEmail, kRegExpPassword, kRegExpPhone, kRegExpUserName, materialFabrics, adNames };
