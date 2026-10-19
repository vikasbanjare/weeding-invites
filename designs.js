window.invitationCatalog = [
  // Heritage: architecture, textiles and ceremonial details.
  ['Royal Court','Heritage','Digital','plum','royal','foil','crest','✦','A regal palace invitation in burgundy and gold.','studio.html?style=royal'],
  ['Amber Darbar','Heritage','Paper','ochre','','linen','arch','◇','Warm sandstone arches and courtly lettering.'],
  ['Jharokha Letter','Heritage','Paper','ivory','chettinad','cotton','border','✧','A carved-window frame inspired by old havelis.'],
  ['Chettinad Morning','Heritage','Website','sand','chettinad','matte','split','☀','South Indian courtyard warmth, drawn in wood and light.'],
  ['Zari Heirloom','Heritage','Paper','plum','','foil','border','✦','A textile-like border with a restrained metallic gleam.'],
  ['Haveli Gold','Heritage','Digital','night','palace','foil','band','✺','A lantern-lit palace scene with an heirloom finish.'],
  ['Terracotta Arch','Heritage','Paper','clay','','deckle','arch','⌒','Architectural curves in earthy terracotta.'],
  ['Heritage Seal','Heritage','Paper','sand','','letterpress','crest','✺','A formal monogram and generous old-world spacing.'],
  ['Ivory Darbar','Heritage','Digital','ivory','royal','silk','vignette','✧','Palace detail softened to an elegant ivory story.'],
  ['Peacock Pavilion','Heritage','Paper','blue','','foil','corner','✦','A jewel-blue palette with pavilion-like framing.'],

  // Modern: graphic structure, expressive type and editorial contrast.
  ['Modern Arches','Modern','Digital','rose','modern','matte','split','○','Sculptural arches with warm editorial colour.'],
  ['The Edit','Modern','Paper','ivory','','matte','editorial','01','An invitation that reads like a beautifully set journal.'],
  ['Cobalt Lines','Modern','Digital','blue','','matte','offset','／','Electric blue, fine rules and generous white space.'],
  ['Noir Type','Modern','Paper','night','','foil','type','M+A','Big type and a precise gold accent after dark.'],
  ['Blush Grid','Modern','Paper','rose','','matte','corner','+','A soft pink grid with graphic restraint.'],
  ['Copper Rhythm','Modern','Motion','clay','modern','foil','band','◒','Overlapping forms made for a moving save-the-date.'],
  ['Mono Letter','Modern','Paper','ivory','','letterpress','type','M','A typographic note with a quiet pressed finish.'],
  ['Gilded Minimal','Modern','Digital','sand','','foil','offset','·','Just a few words and one line of gold.'],
  ['New Geometry','Modern','Paper','ochre','modern','matte','arch','△','Playful geometry with an Indian colour memory.'],
  ['Afterglow','Modern','Website','plum','','silk','vignette','✧','A moody late-evening canvas for a digital story.'],

  // Botanical: floral illustration, natural colour and garden settings.
  ['Garden Vow','Botanical','Digital','sage','garden','cotton','arch','❀','An airy botanical mandap wrapped in soft florals.','studio.html?style=garden'],
  ['Marigold Poem','Botanical','Paper','ivory','marigold','deckle','border','✿','Hand-painted marigolds on a soft handmade-paper ground.'],
  ['Jasmine Letter','Botanical','Paper','ivory','','cotton','corner','✿','A delicate jasmine-inspired note in cream and green.'],
  ['Wild Garden','Botanical','Digital','sage','garden','matte','split','❀','An abundant garden with room for a joyful announcement.'],
  ['Pressed Petals','Botanical','Paper','rose','','vellum','offset','✿','Translucent layers and the feel of saved flowers.'],
  ['Gulmohar','Botanical','Paper','clay','marigold','linen','band','✾','Sunlit red-orange blooms and natural fibre character.'],
  ['Mogra Morning','Botanical','Digital','sand','','silk','arch','❁','Quiet white blossoms for a morning ceremony.'],
  ['Olive & Ochre','Botanical','Paper','ochre','','kraft','editorial','✤','Earthy foliage, warm paper and bold composition.'],
  ['Rosewater','Botanical','Paper','rose','','deckle','border','❀','Soft rose tones and a gently torn silhouette.'],
  ['Fern Study','Botanical','Website','forest','garden','matte','vignette','✺','A darker garden palette with fine botanical texture.'],

  // Paper: the finish itself leads the concept.
  ['Cotton Rag','Paper','Paper','ivory','','cotton','type','M+A','Soft cotton stock with an open, gallery-like layout.'],
  ['Deckled Edge','Paper','Paper','sand','marigold','deckle','corner','✧','An irregular handmade edge and watercolor warmth.'],
  ['Vellum Layer','Paper','Paper','rose','','vellum','split','◇','A translucent overlay with a second story beneath.'],
  ['Letterpress No. 1','Paper','Paper','ivory','','letterpress','border','I','A classic impression, simple and timeless.'],
  ['Gold Foil','Paper','Paper','night','','foil','crest','✦','A small ceremonial mark shining against dark stock.'],
  ['Handmade Kraft','Paper','Paper','sand','','kraft','offset','✤','Uncoated warmth with a relaxed handwritten spirit.'],
  ['Satin Ribbon','Paper','Paper','rose','','silk','band','∞','A refined suite inspired by tied keepsakes.'],
  ['Embossed Crest','Paper','Paper','blue','','letterpress','crest','M','A raised monogram framed by a pale-blue field.'],
  ['Watercolor Wash','Paper','Paper','sage','marigold','cotton','editorial','✿','A gentle wash of colour on textured paper.'],
  ['Arch Envelope','Paper','Paper','clay','','matte','arch','⌒','An architectural die-cut direction in clay and cream.'],

  // Destination: a sense of place, from Indian palaces to coast and mountains.
  ['Palace Edit','Destination','Website','night','palace','foil','vignette','✦','A scrollable palace story with editable ceremonies and motion keepsake.','palace.html'],
  ['Moonlit Mehfil','Destination','Digital','night','moonlit','foil','band','☾','A lantern-lit night under the stars.','studio.html?style=moonlit'],
  ['Courtyard Story','Destination','Website','sand','chettinad','cotton','split','✺','A Chettinad-inspired courtyard and a family gathering.'],
  ['Monsoon Garden','Destination','Website','forest','garden','matte','vignette','❀','Rain-washed greenery with a dreamy arrival.'],
  ['Desert Sky','Destination','Motion','ochre','','linen','offset','☼','Dunes, glowing light and a cinematic opening.'],
  ['Coastal Dawn','Destination','Digital','blue','','cotton','editorial','≈','Sea air and quiet morning light in a spare layout.'],
  ['City Lights','Destination','Website','plum','modern','matte','band','✧','A contemporary celebration after the skyline lights up.'],
  ['Mountain Overture','Destination','Paper','sage','','deckle','border','△','A layered landscape for a high-altitude celebration.'],
  ['The Museum','Destination','Website','ivory','royal','matte','editorial','Ⅰ','A curated walk through architecture and memory.'],
  ['Blue Hour','Destination','Motion','blue','moonlit','silk','vignette','☾','A twilight reveal with luminous type and atmosphere.']
].map(([name,collection,format,tone,art,finish,layout,motif,description,live],index)=>({
  id:`design-${String(index+1).padStart(2,'0')}`,name,collection,format,tone,art,finish,layout,motif,description,live:`invitation.html?design=design-${String(index+1).padStart(2,'0')}&v=20261019`
}));
