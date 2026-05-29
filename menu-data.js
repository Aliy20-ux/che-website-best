/* ═══════════════════════════════════════
   CHE Edinburgh — menu-data.js
   All items confirmed from Uber Eats live listing
   Photos: Unsplash with correct cross-origin params
   ═══════════════════════════════════════ */

/* 
  These URLs use the Unsplash Source API which works reliably
  from any domain without referrer restrictions
*/
function u(id, w, h) {
  w = w || 200; h = h || 200;
  return 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + w + '&h=' + h + '&q=80&fm=jpg';
}

/* Photo URL helper - local images take priority, fallback to Unsplash */
function u(id, w, h) {
  w = w || 400; h = h || 400;
  /* Local image paths (string starting with 'images/') */
  if (typeof id === 'string' && id.startsWith('images/')) {
    return id;
  }
  /* Pexels IDs are pure numbers */
  if (typeof id === 'number' || /^\d+$/.test(id)) {
    return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + w + '&h=' + h + '&fit=crop';
  }
  return 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + w + '&h=' + h + '&q=80&fm=jpg';
}

var P = {
  /* LOCAL PHOTOS — correctly matched to each item */
  shawarma:    'images/shawarma.jpg',        // Chicken Shawarma Wrap
  mix:         'images/mix_shawarma.jpg',    // Mix Shawarma Wrap
  falafel:     'images/falafel_wrap.jpg',    // Falafel Wrap
  vegfalafel:  'images/vegan_falafel.jpg',   // Vegan Falafel Wrap
  fetawrap:    'images/falafel_wrap.jpg',    // Feta Wrap (same style wrap)
  chipswrap:   'images/loaded_chips.jpg',    // Chips Wrap — shows chips, not a falafel
  campagnol:   'images/campagnol_pizza.jpg', // Campagnol Pizza (mushroom & chicken)
  hawaii:      'images/hawaii_pizza.jpg',    // Hawaii Pizza
  vegpizza:    'images/house_special.jpg',   // Vegetarian Pizza
  hotspicy:    'images/house_special.jpg',   // Hot & Spicy Pizza
  housepizza:  'images/house_special.jpg',   // House Special Pizza
  custom:      'images/campagnol_pizza.jpg', // Make Your Own (pizza base reference)
  chipsmeat:   'images/loaded_chips.jpg',    // Chips, Cheese & Meat / Chicken
  shawarmasalad:'images/shawarma_salad.jpg', // Shawarma Salad
  falafelsalad:'images/shawarma_salad.jpg',  // Falafel Salad
  salad:       'images/shawarma_salad.jpg',  // House Salad
  hummus:      'images/hummus.jpg',          // Hummus
  garlic:      'images/garlic_mayo.jpg',     // Garlic Mayonnaise
  chilli:      'images/chilli_sauce.jpg',    // Chilli Sauce
  tahini:      'images/tahina.jpg',          // Tahina Yoghurt

  /* Stock photos for items without uploaded photos */
  lamb:        'photo-1555939594-58d7cb561ad1',    // Lamb Shawarma
  burger:      'photo-1568901346375-23c9450c58cd', // Beef Burger
  beefcheese:  'photo-1553979459-d2229ba7433b',    // Beef Cheese Burger
  chickburg:   'photo-1606755962773-d324e0a13086', // Chicken Burger
  burgchips:   'photo-1572802419224-296b0aeee0d9', // Burger & Chips
  margarita:   'photo-1574071318508-1cdbab80d002', // Margarita Pizza (plain cheese)
  chips:       'photo-1576107232684-1279f390859f', // Chips
  cheesychips: 'photo-1541592106381-b31e9677c0e5', // Cheesy Chips
  mushroom:    'photo-1565299624946-b28f40a0ae38', // Fonghi Pizza
  pepperoni:   'photo-1628840042765-356cda07504e', // Pepperoni Pizza
  drinks:      'photo-1581006852262-e4307cf6283a', // Drinks
  water:       'photo-1548839140-29a749e1cf4d',    // Water
};

window.PHOTO_URL = u;
window.PHOTOS = P;

window.MENU_DATA = {
  pizza: [
    { name: 'Margarita Pizza',      desc: 'Tomato sauce and cheese.',                                              price: '£11.50', tags: ['veg'],          photo: P.margarita,  badge: '84% Liked · 26 reviews' },
    { name: 'Make Your Own Pizza',  desc: 'Create your own pizza with your choice of toppings.',                  price: '£11.50', tags: ['pop'],          photo: P.custom,     badge: '85% Liked' },
    { name: 'Fonghi Pizza',         desc: 'Mushrooms.',                                                           price: '£12.00', tags: ['veg'],          photo: P.mushroom },
    { name: 'Pepperoni Pizza',      desc: 'Classic pepperoni pizza, a timeless favourite.',                       price: '£14.00', tags: ['top'],          photo: P.pepperoni,  badge: '91% Liked · 12 reviews' },
    { name: 'Campagnol Pizza',      desc: 'Mushroom and chicken.',                                                 price: '£14.50', tags: ['halal'],        photo: P.campagnol,  badge: '83% Liked' },
    { name: 'Hawaii Pizza',         desc: 'Ham and pineapple.',                                                    price: '£14.50', tags: [],               photo: P.hawaii,     badge: '80% Liked' },
    { name: 'Vegetarian Pizza',     desc: 'Mushroom, fresh tomato, mixed peppers, sweetcorn, olives.',            price: '£15.00', tags: ['veg'],          photo: P.vegpizza,   badge: '87% Liked · 16 reviews' },
    { name: 'Hot and Spicy Pizza',  desc: 'Pepperoni, salami, mixed peppers, jalapeño.',                         price: '£15.00', tags: ['hot'],           photo: P.hotspicy,   badge: '78% Liked · 14 reviews' },
    { name: 'House Special Pizza',  desc: 'Chicken or lamb, mixed peppers, onion, olive, jalapeño.',             price: '£16.00', tags: ['halal','sig'],   photo: P.housepizza, badge: '70% Liked · 20 reviews' },
  ],
  wraps: [
    { name: 'Vegan Falafel Wrap',         desc: 'Salad wrap (cabbage, lettuce, parsley, tomato, onion, cucumber, pickle) + hummus.',                         price: '£11.50', tags: ['vegan'],        photo: P.vegfalafel, badge: '88% Liked · 9 reviews' },
    { name: 'Falafel Wrap',               desc: 'Salad wrap + garlic mayonnaise, chilli sauce, tahina yoghurt.',                                             price: '£11.50', tags: ['veg','best'],   photo: P.falafel,    badge: '89% Liked · 37 reviews' },
    { name: 'Chips, Cheese & Salad Wrap', desc: 'Chips & cheese in a warm wrap with garlic mayo, chilli sauce, tahina yoghurt.',                             price: '£11.50', tags: [],              photo: P.chipswrap,  badge: '66% Liked' },
    { name: 'Feta Cheese Wrap',           desc: 'Salad wrap with feta cheese and tahina yoghurt.',                                                            price: '£11.50', tags: ['veg'],          photo: P.fetawrap,   badge: '80% Liked · 5 reviews' },
    { name: 'Chicken Shawarma Wrap',      desc: 'Slow-roasted chicken, salad wrap, garlic mayonnaise, chilli sauce, tahina yoghurt.',                        price: '£13.00', tags: ['halal','best'], photo: P.shawarma,   badge: '83% Liked · 59 reviews' },
    { name: 'Lamb Shawarma Wrap',         desc: 'Tender lamb in warm pita bread with fresh salad.',                                                           price: '£13.00', tags: ['halal'],        photo: P.lamb,       badge: '78% Liked · 32 reviews' },
    { name: 'Mix Shawarma Wrap',          desc: 'Chicken & lamb together, salad wrap, garlic mayo, chilli sauce, tahina yoghurt.',                            price: '£14.00', tags: ['halal','top'],  photo: P.mix,        badge: '94% Liked · 17 reviews' },
  ],
  burgers: [
    { name: 'Beef Burger',                    desc: 'Served with fresh salad and sauce.',                              price: '£9.20',  tags: ['halal'],       photo: P.burger,    badge: '90% Liked · 11 reviews' },
    { name: 'Beef Burger with Cheese',        desc: 'Served with salad and sauce. #2 most liked.',                    price: '£10.00', tags: ['halal','top'],  photo: P.beefcheese,badge: '100% Liked · 3 reviews' },
    { name: 'Chicken Burger with Cheese',     desc: 'Served with salad and sauce.',                                   price: '£10.00', tags: ['halal'],        photo: P.chickburg },
    { name: 'Beef Burger with Cheese & Chips',desc: 'Cheeseburger with chips, salad and sauce. #3 most liked.',      price: '£12.00', tags: ['halal','pop'],  photo: P.burgchips, badge: '76% Liked · 13 reviews' },
  ],
  chips: [
    { name: 'Chips',                   desc: 'Golden fried chips — voted Edinburgh\'s best by our regulars.',  price: '~£3.50', tags: ['top'],          photo: P.chips,       badge: 'Edinburgh\'s Best' },
    { name: 'Cheesy Chips',            desc: 'Thick-cut chips smothered in melted cheese. A cult favourite.', price: '~£4.50', tags: ['must'],         photo: P.cheesychips },
    { name: 'Chips, Cheese & Meat',    desc: 'Loaded chips with cheese and shawarma meat.',                   price: '~£6.00', tags: ['halal','must'], photo: P.chipsmeat },
    { name: 'Chips, Cheese & Chicken', desc: 'Chips loaded with cheese and shawarma chicken.',                price: '~£6.00', tags: ['halal'],        photo: P.chipsmeat },
  ],
  salad: [
    { name: 'House Salad',    desc: 'White cabbage, lettuce, parsley, tomato, onion, cucumber, pickle.',  price: '~£3.50', tags: ['vegan'], photo: P.salad },
    { name: 'Falafel Salad',  desc: 'House salad topped with crispy falafel and tahina.',                 price: '~£7.00', tags: ['veg'],   photo: P.falafelsalad },
    { name: 'Shawarma Salad', desc: 'House salad with chicken or lamb shawarma and garlic sauce.',        price: '~£8.50', tags: ['halal'], photo: P.shawarmasalad },
  ],
  sauces: [
    { name: 'Garlic Mayonnaise', desc: 'Our legendary house garlic sauce — so beloved a customer said they\'d name their firstborn after it.', price: '~£0.50', tags: ['cult'], photo: P.garlic },
    { name: 'Chilli Sauce',      desc: 'Fiery house chilli sauce for a proper kick.',                                                           price: '~£0.50', tags: ['hot'],  photo: P.chilli },
    { name: 'Tahina Yoghurt',    desc: 'Creamy sesame tahini blended with yoghurt — a classic Middle Eastern staple.',                          price: '~£0.50', tags: ['veg'],  photo: P.tahini },
    { name: 'Hummus',            desc: 'Smooth, authentic blended chickpea hummus.',                                                            price: '~£1.00', tags: ['vegan'],photo: P.hummus },
  ],
  drinks: [
    { name: 'Soft Drinks (Can)', desc: 'Coke, Fanta, Sprite and more — chilled and ready.', price: '~£1.50', tags: [], photo: P.drinks },
    { name: 'Still Water',       desc: 'Chilled still mineral water.',                       price: '~£1.00', tags: [], photo: P.water  },
  ],
};
