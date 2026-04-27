import nonVegBiryaniImg from '../assets/productlist/non-veg-briyani.png';
import vegBiryaniImg from '../assets/productlist/veg-briyani.png';

// 1KG Non-Veg Images
import muttonGravyImg from '../assets/images/1kg_Nonveg/1kg Mutton Gravy.jpg';
import muttonKothuImg from '../assets/images/1kg_Nonveg/1kg Mutton Kothu Curry1.jpg';
import liverKuzhambuImg from '../assets/images/1kg_Nonveg/1kg Liver Kuzhambu.jpg';
import boneNalliImg from '../assets/images/1kg_Nonveg/1kg Bone nalli Kuzhambu.png';
import brainKuzhambuImg from '../assets/images/1kg_Nonveg/1kg Brain Kuzhambu.png';
import aattukalPayaImg from '../assets/images/1kg_Nonveg/1kg Aattukal Paya.png';
import boneKuzhambuImg from '../assets/images/1kg_Nonveg/1kg Bone Kuzhambu.png';
import chickenKuzhambuImg from '../assets/images/1kg_Nonveg/1kg Chicken Kuzhambu.png';
import chickenKothuImg from '../assets/images/1kg_Nonveg/1kg Chicken Kothu Curry.jpg';
import nattuKozhiImg from '../assets/images/1kg_Nonveg/1kg Nattu Kozhi Kuzhambu.jpg';
import neiMeenImg from '../assets/images/1kg_Nonveg/1kg Nei Meen Kuzhambu.jpg';
import seasonalFishImg from '../assets/images/1kg_Nonveg/1kg Seasonal Fish Curry.jpg';
import prawnCurryImg from '../assets/images/1kg_Nonveg/1kg Prawn Curry.jpg';
import crabCurryImg from '../assets/images/1kg_Nonveg/1kg Crab Curry.jpg';
import eggKuzhambuImg from '../assets/images/1kg_Nonveg/1kg Egg Kuzhambu.jpg';

// 1KG Veg Images
import paneerStewImg from '../assets/images/1kg veg/1kg Paneer Stew.png';
import mushroomKuzhambuImg from '../assets/images/1kg veg/1kg Mushroom Kuzhambu.jpg';
import garlicKuzhambuImg from '../assets/images/1kg veg/1kg garlic kuzhambu.jpg';
import vathalKuzhambuImg from '../assets/images/1kg veg/1kg Vathal Kuzhambu.jpg';
import tomatoKuzhambuImg from '../assets/images/1kg veg/1kg Tomato Kuzhambu.jpg';
import brinjalKuzhambuImg from '../assets/images/1kg veg/1kg Brinjal Kuzhambu.jpeg';
import vegKhurumaImg from '../assets/images/1kg veg/1kg Veg Khuruma.jpeg';
import sambarImg from '../assets/images/1kg veg/1kg Sambar.jpg';

// Medical Advice Menu Images
import ragiMaltImg from '../assets/images/medicaladvicemenu/Kepa Kachi (Ragi Malt).jpeg';
import vegSaladsImg from '../assets/images/medicaladvicemenu/Veg Salads.jpeg';
import nonVegSaladImg from '../assets/images/medicaladvicemenu/Non-Veg Salad & Soups.jpg';
import dietVarietyRiceImg from '../assets/images/medicaladvicemenu/Variety Rice (Diet Portions).jpg';
import healthyUpumaImg from '../assets/images/medicaladvicemenu/Healthy Upuma.jpeg';
import medicinalRasamImg from '../assets/images/medicaladvicemenu/Medicinal Rasam.jpg';
import riceKanchiImg from '../assets/images/medicaladvicemenu/Rice Kanchi.jpeg';
import boiledChickenImg from '../assets/images/medicaladvicemenu/Boiled Chicken.jpg';
import boiledFishImg from '../assets/images/medicaladvicemenu/Boiled Fish.jpeg';
import chapathiRollImg from '../assets/images/medicaladvicemenu/Chapathi Roll.jpg';

// Pathiya Sapadu Images
import traditionalPathiyaImg from '../assets/images/pathiyasapadu/Traditional Pathiya Sapadu.jpg';
import pathiyaTiffinImg from '../assets/images/pathiyasapadu/chapathi,idiyappam.jpeg';
import pathiyaRiceVegImg from '../assets/images/pathiyasapadu/Rice,Veg,Rasam,Variety Rice.png';
import pathiyaParottaImg from '../assets/images/pathiyasapadu/Parotta.jpg';


export const categories = ["All", "1KG Non-Veg", "1KG Veg", "1KG Biryani", "Pathiya Sapadu", "Medical Advice Menu"];

export const products = [
  // 1KG Non-Veg
  {
    id: 1,
    name: "1kg Mutton Gravy",
    tamilName: "1கிலோ மட்டன் கிரேவி",
    description: "Rich, slow-cooked mutton in authentic traditional gravy. Choice of Fry/Semi-Gravy available.",
    price: 1550,
    category: "1KG Non-Veg",
    isVeg: false,
    image: muttonGravyImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 2,
    name: "1kg Mutton Kothu Curry",
    tamilName: "1கிலோ மட்டன் கொத்து கறி",
    description: "Shredded mutton tossed with special spices and aromatics in traditional style.",
    price: 1550,
    category: "1KG Non-Veg",
    isVeg: false,
    image: muttonKothuImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 3,
    name: "1kg Liver Kuzhambu",
    tamilName: "1கிலோ ஈரல் குழம்பு",
    description: "Fresh tender mutton liver cooked with hand-ground spices. Rich in nutrients.",
    price: 1550,
    category: "1KG Non-Veg",
    isVeg: false,
    image: liverKuzhambuImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 4,
    name: "1kg Bone/nalli Kuzhambu",
    tamilName: "1கிலோ நல்லி எலும்பு குழம்பு",
    description: "Exquisite traditional delicacy made with succulent nalli marrow bones simmered in spiced gravy.",
    price: 1100,
    category: "1KG Non-Veg",
    isVeg: false,
    image: boneNalliImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 5,
    name: "1kg Brain Kuzhambu",
    tamilName: "1கிலோ மூளை குழம்பு",
    description: "Silky and delicate goat brain prepared with mild spices for a unique taste.",
    price: 990,
    category: "1KG Non-Veg",
    isVeg: false,
    image: brainKuzhambuImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 6,
    name: "1kg Aattukal Paya",
    tamilName: "1கிலோ ஆட்டுக்கால் பாயா",
    description: "Slow-cooked trotters soup/gravy, perfect pairing for Idiyappam or Appam.",
    price: 880,
    category: "1KG Non-Veg",
    isVeg: false,
    image: aattukalPayaImg,
    canChooseStyle: false,
    isWeightBased: true
  },
  {
    id: 7,
    name: "1kg Bone Kuzhambu",
    tamilName: "1கிலோ எலும்பு குழம்பு",
    description: "Flavorful and hearty gravy cooked with succulent bone pieces for maximum extract.",
    price: 990,
    category: "1KG Non-Veg",
    isVeg: false,
    image: boneKuzhambuImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 8,
    name: "1kg Chicken Kuzhambu",
    tamilName: "1கிலோ சிக்கன் குழம்பு",
    description: "Homestyle traditional chicken gravy made with fresh farm-raised chicken.",
    price: 770,
    category: "1KG Non-Veg",
    isVeg: false,
    image: chickenKuzhambuImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 9,
    name: "1kg Chicken Kothu Curry",
    tamilName: "1கிலோ சிக்கன் கொத்து கறி",
    description: "Minced chicken tossed with house-made spices for a spicy, addictive side.",
    price: 770,
    category: "1KG Non-Veg",
    isVeg: false,
    image: chickenKothuImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 10,
    name: "1kg Nattu Kozhi Kuzhambu",
    tamilName: "1கிலோ நாட்டுக்கோழி குழம்பு",
    description: "Authentic country chicken gravy with medicinal herbs and robust spices.",
    price: 1100,
    category: "1KG Non-Veg",
    isVeg: false,
    image: nattuKozhiImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 11,
    name: "1kg Nei Meen Kuzhambu",
    tamilName: "1கிலோ நெய் மீன் குழம்பு",
    description: "Premium Seer fish slices in a tangy, thick authentic tamarind gravy.",
    price: 2200,
    category: "1KG Non-Veg",
    isVeg: false,
    image: neiMeenImg,
    canChooseStyle: false,
    isWeightBased: true
  },
  {
    id: 12,
    name: "1kg Seasonal Fish Curry",
    tamilName: "1கிலோ மீன் குழம்பு",
    description: "Fresh catch of the day cooked in traditional coastal spice blend.",
    price: 1100,
    category: "1KG Non-Veg",
    isVeg: false,
    image: seasonalFishImg,
    canChooseStyle: false,
    isWeightBased: true
  },
  {
    id: 13,
    name: "1kg Prawn Curry",
    tamilName: "1கிலோ இறால் குழம்பு",
    description: "Juicy prawns simmered gently in a spicy and aromatic coconut-based gravy.",
    price: 1550,
    category: "1KG Non-Veg",
    isVeg: false,
    image: prawnCurryImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 14,
    name: "1kg Crab Curry",
    tamilName: "1கிலோ நண்டு குழம்பு",
    description: "Mud crabs cooked with roasted spices and pepper for a spicy treat.",
    price: 1100,
    category: "1KG Non-Veg",
    isVeg: false,
    image: crabCurryImg,
    canChooseStyle: true,
    isWeightBased: true
  },
  {
    id: 15,
    name: "1kg Egg Kuzhambu",
    tamilName: "1கிலோ முட்டை குழம்பு",
    description: "Hard-boiled eggs in a fragrant, thick southern style gravy.",
    price: 660,
    category: "1KG Non-Veg",
    isVeg: false,
    image: eggKuzhambuImg,
    canChooseStyle: false,
    isWeightBased: true
  },

  // 1KG Veg
  {
    id: 16,
    name: "1kg Paneer Stew",
    tamilName: "1கிலோ பன்னீர் ஸ்டூ",
    description: "Rich cubes of paneer in a creamy, mildly spiced stew with vegetables.",
    price: 1100,
    category: "1KG Veg",
    isVeg: true,
    image: paneerStewImg,
    isWeightBased: true
  },
  {
    id: 17,
    name: "1kg Mushroom Kuzhambu",
    tamilName: "1கிலோ காளான் குழம்பு",
    description: "Fresh mushrooms cooked into a spicy, flavorful traditional village-style gravy.",
    price: 900,
    category: "1KG Veg",
    isVeg: true,
    image: mushroomKuzhambuImg,
    isWeightBased: true
  },
  {
    id: 18,
    name: "1kg Garlic Kuzhambu",
    tamilName: "1கிலோ பூண்டு குழம்பு",
    description: "Tangy and pungent gravy made with roasted full garlic pearls and tamarind.",
    price: 900,
    category: "1KG Veg",
    isVeg: true,
    image: garlicKuzhambuImg,
    isWeightBased: true
  },
  {
    id: 19,
    name: "1kg Vathal Kuzhambu",
    tamilName: "1கிலோ வத்தல் குழம்பு",
    description: "Classic sun-dried berry gravy, perfectly balanced with spice and tanginess.",
    price: 330,
    category: "1KG Veg",
    isVeg: true,
    image: vathalKuzhambuImg,
    isWeightBased: true
  },
  {
    id: 20,
    name: "1kg Tomato Kuzhambu",
    tamilName: "1கிலோ தக்காளி குழம்பு",
    description: "Simple yet heartwarming homestyle tomato-based gravy.",
    price: 220,
    category: "1KG Veg",
    isVeg: true,
    image: tomatoKuzhambuImg,
    isWeightBased: true
  },
  {
    id: 21,
    name: "1kg Brinjal Kuzhambu",
    tamilName: "1கிலோ கத்தரிக்காய் குழம்பு",
    description: "Oil-fried tender brinjals in a thick, authentic southern masala gravy.",
    price: 220,
    category: "1KG Veg",
    isVeg: true,
    image: brinjalKuzhambuImg,
    isWeightBased: true
  },
  {
    id: 22,
    name: "1kg Veg Khuruma",
    tamilName: "1கிலோ வெஜிடபிள் குருமா",
    description: "Assorted vegetables cooked in a rich coconut and cashew-based gravy.",
    price: 250,
    category: "1KG Veg",
    isVeg: true,
    image: vegKhurumaImg,
    isWeightBased: true
  },
  {
    id: 23,
    name: "1kg Sambar",
    tamilName: "1கிலோ சாம்பார்",
    description: "Classic South Indian lentil and vegetable stew with house-made masala.",
    price: 460,
    category: "1KG Veg",
    isVeg: true,
    image: sambarImg,
    isWeightBased: true
  },

  // 1KG Biryani
  {
    id: 24,
    name: "1kg Meat Biryani / Fried Rice",
    tamilName: "1கிலோ பிரியாணி / ப்ரைடு ரைஸ்",
    description: "Signature Seeraga Samba biryani or savory fried rice in 1KG portion.",
    price: 1100,
    typePrices: {
      'Chicken Biryani': 1100,
      'Mutton Biryani': 1800,
      'Chicken Fried Rice': 1100
    },
    category: "1KG Biryani",
    isVeg: false,
    image: nonVegBiryaniImg,
    isWeightBased: true,
    canChooseType: true,
    typeOptions: ['Chicken Biryani', 'Mutton Biryani', 'Chicken Fried Rice']
  },
  {
    id: 26,
    name: "1kg Mushroom / Veg Biryani",
    tamilName: "1கிலோ காளான் / வெஜ் பிரியாணி",
    description: "Fragrant vegetarian biryani option with fresh mushrooms or mixed seasonal vegetables.",
    price: 880,
    category: "1KG Biryani",
    isVeg: true,
    image: vegBiryaniImg,
    isWeightBased: true,
    canChooseType: true,
    typeOptions: ['Mushroom', 'Veg']
  },
  {
    id: 27,
    name: "Traditional Pathiya Sapadu",
    tamilName: "பாரம்பரிய பத்திய சாப்பாடு",
    description: "Authentic dietary meal prepared with medicinal herbs and zero spices. Ideal for recovery.",
    price: 150,
    category: "Pathiya Sapadu",
    isVeg: true,
    image: traditionalPathiyaImg,
    isWeightBased: false
  },
  {
    id: 28,
    name: "Idly / Chappathi / Idiyappam",
    tamilName: "இட்லி / சப்பாத்தி / இடியாப்பம்",
    description: "Soft steamed idly, hand-rolled chappathi, or fresh idiyappam. Served with mild accompaniments.",
    price: 15,
    category: "Pathiya Sapadu",
    isVeg: true,
    image: pathiyaTiffinImg,
    isWeightBased: false,
    canChooseType: true,
    typeOptions: ['Idly', 'Chappathi', 'Idiyappam']
  },
  {
    id: 29,
    name: "Rice / Veg / Rasam / Variety Rice",
    tamilName: "சாதம் / காய்கறிகள் / ரசம் / கலவை சாதம்",
    description: "Pure traditional rice, seasonal vegetable poriyal, and soothing garlic rasam bundle.",
    price: 120,
    category: "Pathiya Sapadu",
    isVeg: true,
    image: pathiyaRiceVegImg,
    isWeightBased: false,
    canChooseType: true,
    typeOptions: ['Plain Rice', 'Variety Rice', 'Rasam Set']
  },
  {
    id: 30,
    name: "Parotta",
    tamilName: "பரோட்டா",
    description: "Hand-stretched traditional layered parotta. Soft and fluffy.",
    price: 20,
    category: "Pathiya Sapadu",
    isVeg: true,
    image: pathiyaParottaImg,
    isWeightBased: false
  },
  // Medical Advice Menu
  {
    id: 31,
    name: "Kepa Kachi (Ragi Malt)",
    tamilName: "கேழ்வரகு கஞ்சி",
    description: "Nutritious and cooling ragi (finger millet) porridge, excellent for digestive health.",
    price: 60,
    category: "Medical Advice Menu",
    isVeg: true,
    image: ragiMaltImg,
    isWeightBased: false,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 32,
    name: "Veg Salads",
    tamilName: "காய்கறி சாலட்",
    description: "Freshly chopped seasonal vegetables with a light, healthy dressing.",
    price: 90,
    category: "Medical Advice Menu",
    isVeg: true,
    image: vegSaladsImg,
    isWeightBased: false,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 33,
    name: "Non-Veg Salad & Soups",
    tamilName: "அசைவ சாலட் & சூப்",
    description: "Protein-rich boiled chicken/mutton strips tossed with greens and clear bone broth.",
    price: 150,
    category: "Medical Advice Menu",
    isVeg: false,
    image: nonVegSaladImg,
    isWeightBased: false,
    rating: 4.9,
    reviews: 212
  },
  {
    id: 34,
    name: "Variety Rice (Diet Portions)",
    tamilName: "கலவை சாதம்",
    description: "Lemon, Curry Leaf, or Mint rice made with minimal oil, packed with antioxidants.",
    price: 80,
    category: "Medical Advice Menu",
    isVeg: true,
    image: dietVarietyRiceImg,
    isWeightBased: false,
    rating: 4.5,
    reviews: 145
  },
  {
    id: 35,
    name: "Healthy Upuma",
    tamilName: "உப்புமா",
    description: "Light and fluffy wheat or millet upuma served with mild vegetable stew.",
    price: 70,
    category: "Medical Advice Menu",
    isVeg: true,
    image: healthyUpumaImg,
    isWeightBased: false,
    rating: 4.4,
    reviews: 98
  },
  {
    id: 36,
    name: "Medicinal Rasam",
    tamilName: "ரசம்",
    description: "Pepper, cumin, and garlic infused clear herbal soup to boost immunity.",
    price: 50,
    category: "Medical Advice Menu",
    isVeg: true,
    image: medicinalRasamImg,
    isWeightBased: false,
    rating: 4.9,
    reviews: 320
  },
  {
    id: 37,
    name: "Rice Kanchi",
    tamilName: "அரிசி கஞ்சி",
    description: "Soft cooked traditional medicinal rice gruel, easy to digest for convalescence.",
    price: 60,
    category: "Medical Advice Menu",
    isVeg: true,
    image: riceKanchiImg,
    isWeightBased: false,
    rating: 4.7,
    reviews: 167
  },
  {
    id: 38,
    name: "Boiled Chicken",
    tamilName: "வேகவைத்த சிக்கன்",
    description: "Lean, protein-rich farm chicken boiled with turmeric and mild pepper.",
    price: 180,
    category: "Medical Advice Menu",
    isVeg: false,
    image: boiledChickenImg,
    isWeightBased: false,
    rating: 4.6,
    reviews: 110
  },
  {
    id: 39,
    name: "Boiled Fish",
    tamilName: "வேகவைத்த மீன்",
    description: "Fresh catch gently poached with ginger and mild spices. Rich in Omega-3.",
    price: 220,
    category: "Medical Advice Menu",
    isVeg: false,
    image: boiledFishImg,
    isWeightBased: false,
    rating: 4.8,
    reviews: 85
  },
  {
    id: 40,
    name: "Chapathi Roll",
    tamilName: "சப்பாத்தி ரோல்",
    description: "Whole wheat chapathi wraps filled with fresh greens and steamed paneer/chicken.",
    price: 90,
    category: "Medical Advice Menu",
    isVeg: true,
    image: chapathiRollImg,
    isWeightBased: false,
    canChooseType: true,
    typeOptions: ['Veg Roll', 'Chicken Roll'],
    typePrices: {
      'Veg Roll': 90,
      'Chicken Roll': 120
    },
    rating: 4.5,
    reviews: 205
  },
  {
    id: 41,
    name: "Soft Idly",
    tamilName: "இட்லி",
    description: "Easily digestible, ultra-soft steamed rice cakes served with mild coconut chutney.",
    price: 40,
    category: "Medical Advice Menu",
    isVeg: true,
    image: pathiyaTiffinImg,
    isWeightBased: false,
    rating: 4.9,
    reviews: 450
  }
];
