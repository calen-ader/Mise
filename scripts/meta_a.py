# Per-drink editorial data. Keyed by IBA name as scraped.
# y=year (approx), pl=place, tech=techniques, glass, fl=flavour tags,
# h=(history EN, history ES), mes=method ES, gar=(garnish EN, garnish ES)
M = {}
def d(name, **kw): M[name] = kw

d("Bellini", y=1948, pl="Venice", tech=["stir"], glass="flute", fl=["sparkling","fruity"],
  h=("Giuseppe Cipriani mixed it at Harry's Bar in Venice. The pink colour reminded him of a toga in a painting by Giovanni Bellini, so he named it after the painter.",
     "Giuseppe Cipriani lo creó en el Harry's Bar de Venecia. El tono rosado le recordó a una toga de un cuadro de Giovanni Bellini, y le puso el nombre del pintor."),
  mes="Vierte el puré de durazno en el vaso mezclador con hielo y añade el Prosecco. Revuelve suavemente y sirve en una copa flauta fría. Variantes: PUCCINI con jugo fresco de mandarina; ROSSINI con puré de frutilla; TINTORETTO con jugo de granada.",
  gar=("", ""))
d("Black Russian", y=1949, pl="Brussels", tech=["build"], glass="rocks", fl=["sweet","coffee","spirit"],
  h=("Gustave Tops made it at the Hotel Metropole in Brussels for Perle Mesta, then US ambassador to Luxembourg. Add cream and it becomes the White Russian.",
     "Gustave Tops lo preparó en el Hotel Metropole de Bruselas para Perle Mesta, entonces embajadora de EE. UU. en Luxemburgo. Con crema se convierte en White Russian."),
  mes="Vierte los ingredientes en un vaso old fashioned lleno de hielo. Revuelve suavemente. Variante: WHITE RUSSIAN, flota crema fresca encima e intégrala despacio.",
  gar=("", ""))
d("Bloody Mary", y=1934, pl="Paris / New York", tech=["stir"], glass="rocks", fl=["savoury","spicy"],
  h=("Fernand Petiot claimed it from Harry's New York Bar in Paris in the 1920s, then refined it at the St. Regis in New York in 1934. The brunch drink of record.",
     "Fernand Petiot decía haberlo creado en el Harry's New York Bar de París en los años 20 y lo perfeccionó en el St. Regis de Nueva York en 1934. El trago de brunch por excelencia."),
  mes="Revuelve suavemente todos los ingredientes en un vaso mezclador con hielo y sirve en vaso rocks. Si se pide con hielo, sírvelo en vaso highball.",
  gar=("Celery, lemon wedge (optional)", "Apio, gajo de limón (opcional)"))
d("Caipirinha", y=1918, pl="São Paulo, Brazil", tech=["muddle","build"], glass="rocks", fl=["sour","fresh"],
  h=("Brazil's national drink. One story traces it to a lime, garlic and honey remedy for the 1918 flu; the garlic went, sugar and ice came in.",
     "El trago nacional de Brasil. Una versión lo vincula a un remedio de lima, ajo y miel contra la gripe de 1918; el ajo desapareció y llegaron el azúcar y el hielo."),
  mes="Coloca la lima y el azúcar en un vaso old fashioned doble y machaca suavemente. Llena con hielo picado y añade la cachaça. Revuelve suavemente para integrar. Variante: CAIPIROSKA, usa vodka en lugar de cachaça.",
  gar=("", ""))
d("Champagne Cocktail", y=1862, pl="United States", tech=["build"], glass="flute", fl=["sparkling","bitter"],
  h=("Already in Jerry Thomas's 1862 bartender's guide, one of the first cocktail books. A sugar cube soaked in bitters keeps the bubbles rising.",
     "Ya aparece en la guía de Jerry Thomas de 1862, uno de los primeros libros de coctelería. El terrón de azúcar con amargo mantiene las burbujas subiendo."),
  mes="Coloca el terrón de azúcar con 2 golpes de amargo en una copa de Champagne grande y añade el cognac. Completa suavemente con Champagne frío.",
  gar=("Orange zest and maraschino cherry", "Piel de naranja y cereza marrasquino"))
d("Corpse Reviver #2", y=1930, pl="London", tech=["shake"], glass="cocktail", fl=["sour","herbal"],
  h=("Printed in Harry Craddock's Savoy Cocktail Book (1930) as a 'hair of the dog'. Craddock warned that four taken in quick succession would unrevive the corpse.",
     "Publicado en el Savoy Cocktail Book de Harry Craddock (1930) como remedio para la resaca. Craddock advertía que cuatro seguidos volverían a matar al muerto."),
  mes="Vierte todos los ingredientes en la coctelera con hielo. Agita bien y cuela en una copa de cóctel fría.",
  gar=("Orange zest", "Piel de naranja"))
d("Cosmopolitan", y=1988, pl="Miami / New York", tech=["shake"], glass="cocktail", fl=["sour","fruity"],
  h=("Cheryl Cook in Miami and Toby Cecchini at the Odeon in New York both shaped it in the late 1980s. Sex and the City made it a global order.",
     "Cheryl Cook en Miami y Toby Cecchini en el Odeon de Nueva York le dieron forma a fines de los 80. Sex and the City lo volvió un pedido mundial."),
  mes="Añade todos los ingredientes en una coctelera con hielo. Agita bien y cuela en una copa de cóctel grande.",
  gar=("Lemon twist", "Twist de limón"))
d("Cuba Libre", y=1900, pl="Havana", tech=["build"], glass="highball", fl=["sweet","fresh"],
  h=("Born in Havana around 1900, after the Spanish-American War, when cola arrived on the island. The name was a toast: 'Free Cuba!'",
     "Nació en La Habana hacia 1900, tras la guerra hispano-estadounidense, cuando la cola llegó a la isla. El nombre era un brindis: «¡Cuba libre!»"),
  mes="Construye todos los ingredientes en un vaso highball lleno de hielo.",
  gar=("Lime wedge", "Gajo de lima"))
d("French 75", y=1922, pl="Paris", tech=["shake"], glass="flute", fl=["sparkling","sour"],
  h=("Named after the French 75 mm field gun of the First World War, for its kick. Harry MacElhone printed an early version in 1922.",
     "Lleva el nombre del cañón francés de 75 mm de la Primera Guerra Mundial, por su potencia. Harry MacElhone publicó una versión temprana en 1922."),
  mes="Vierte todos los ingredientes, excepto el Champagne, en una coctelera. Agita bien y cuela en una copa flauta. Completa con Champagne y revuelve suavemente.",
  gar=("", ""))
d("French Connection", y=1971, pl="United States", tech=["build"], glass="rocks", fl=["sweet","spirit","nutty"],
  h=("A two-bottle drink named after the 1971 film The French Connection. It belongs to the same family as the Godfather (Scotch and amaretto).",
     "Un trago de dos botellas con el nombre de la película The French Connection (1971). Pertenece a la misma familia que el Godfather (whisky escocés y amaretto)."),
  mes="Vierte todos los ingredientes directamente en un vaso old fashioned lleno de hielo. Revuelve suavemente.",
  gar=("", ""))
d("Golden Dream", y=1960, pl="Florida", tech=["shake"], glass="cocktail", fl=["sweet","creamy","fruity"],
  h=("An early 1960s dessert drink from Florida built to sell Galliano, whose tall bottle was everywhere in American bars of the time.",
     "Un trago de postre de Florida de principios de los 60, pensado para vender Galliano, cuya botella alta estaba en todos los bares estadounidenses de la época."),
  mes="Vierte todos los ingredientes en una coctelera con hielo. Agita enérgicamente unos segundos. Cuela en una copa de cóctel fría.",
  gar=("", ""))
d("Grasshopper", y=1918, pl="New Orleans", tech=["shake"], glass="cocktail", fl=["sweet","creamy","minty"],
  h=("Credited to Philip Guichet of Tujague's in New Orleans. Its mint-green colour made it a 1950s and 60s after-dinner favourite.",
     "Se atribuye a Philip Guichet, del bar Tujague's de Nueva Orleans. Su verde menta lo hizo un favorito de sobremesa en los años 50 y 60."),
  mes="Vierte todos los ingredientes en una coctelera con hielo. Agita enérgicamente unos segundos. Cuela en una copa de cóctel fría.",
  gar=("Optional mint leaf", "Hoja de menta opcional"))
d("Hemingway Special", y=1930, pl="Havana", tech=["shake"], glass="cocktail", fl=["sour","fruity"],
  h=("The Floridita's daiquiri for Ernest Hemingway: double rum, no sugar, grapefruit and maraschino instead. Also called the Papa Doble.",
     "El daiquiri del Floridita para Ernest Hemingway: doble ron, sin azúcar, con pomelo y marrasquino. También se le llama Papa Doble."),
  mes="Vierte todos los ingredientes en una coctelera con hielo. Agita bien y cuela en una copa de cóctel grande.",
  gar=("", ""))
d("Horse's Neck", y=1890, pl="United States", tech=["build"], glass="highball", fl=["fresh","spirit"],
  h=("It started in the 1890s as ginger ale with a long lemon spiral. Brandy was added later; that version was ordered 'with a kick'.",
     "Empezó en la década de 1890 como ginger ale con un largo espiral de limón. El brandy llegó después; esa versión se pedía «con patada»."),
  mes="Vierte el cognac y el ginger ale directamente en un vaso highball con hielo. Revuelve suavemente. Si se desea, añade unos golpes de amargo de Angostura.",
  gar=("One lemon rind spiral", "Un espiral de cáscara de limón"))
d("Irish Coffee", y=1943, pl="Foynes, Ireland", tech=["build"], glass="mug", fl=["coffee","creamy","hot"],
  h=("Chef Joe Sheridan served it to cold passengers at the Foynes flying-boat terminal in 1943. A journalist brought it to San Francisco's Buena Vista Cafe in 1952.",
     "El chef Joe Sheridan lo sirvió en 1943 a pasajeros helados en la terminal de hidroaviones de Foynes. Un periodista lo llevó al Buena Vista Cafe de San Francisco en 1952."),
  mes="Vierte el café negro caliente en una copa Irish coffee precalentada. Añade el whiskey y al menos una cucharadita de azúcar, y revuelve hasta disolver. Vierte la crema fría y espesa sobre el dorso de una cuchara, justo encima del café, para que flote sin mezclarse. Se puede usar almíbar en lugar de azúcar.",
  gar=("", ""))
d("KIR", y=1945, pl="Dijon", tech=["build"], glass="wine", fl=["fruity"],
  h=("Félix Kir, priest, Resistance hero and mayor of Dijon after the war, poured Burgundy white wine with cassis at receptions to promote both.",
     "Félix Kir, sacerdote, héroe de la Resistencia y alcalde de Dijon tras la guerra, servía vino blanco de Borgoña con cassis en las recepciones para promocionar ambos."),
  mes="Vierte la crème de cassis en la copa y completa con vino blanco. Variante: KIR ROYAL, usa Champagne en lugar de vino blanco.",
  gar=("", ""))
d("Long Island Ice Tea", y=1972, pl="Long Island, New York", tech=["build"], glass="highball", fl=["sweet","sour","spirit"],
  h=("Claimed by Robert 'Rosebud' Butt at the Oak Beach Inn on Long Island in 1972. Five spirits and no tea; cola gives the colour.",
     "Robert «Rosebud» Butt dice haberlo creado en el Oak Beach Inn de Long Island en 1972. Cinco destilados y nada de té; la cola le da el color."),
  mes="Añade todos los ingredientes en un vaso highball lleno de hielo. Revuelve suavemente.",
  gar=("Lemon slice (optional)", "Rodaja de limón (opcional)"))
d("Mai-Tai", y=1944, pl="Oakland, California", tech=["shake"], glass="rocks", fl=["sour","tropical","nutty"],
  h=("Victor 'Trader Vic' Bergeron mixed it in 1944. A Tahitian friend tasted it and said 'Maita'i roa ae', out of this world.",
     "Victor «Trader Vic» Bergeron lo creó en 1944. Una amiga tahitiana lo probó y dijo «Maita'i roa ae»: fuera de este mundo."),
  mes="Añade todos los ingredientes en una coctelera con hielo. Agita y sirve en un vaso rocks doble o highball. El ron de melaza de Martinica que usaba Trader Vic no era agrícola, sino un ron de melaza.",
  gar=("Pineapple spear, mint leaves, lime peel", "Lanza de ananá, hojas de menta, piel de lima"))
d("Margarita", y=1938, pl="Mexico", tech=["shake"], glass="cocktail", fl=["sour","fresh"],
  h=("Many bartenders claim it, Carlos 'Danny' Herrera among them. It descends from the Daisy family of sours, and margarita is Spanish for daisy.",
     "Muchos bartenders lo reclaman, entre ellos Carlos «Danny» Herrera. Desciende de la familia de sours Daisy, y «margarita» es justamente daisy en inglés."),
  mes="Añade todos los ingredientes en una coctelera con hielo. Agita y cuela en una copa de cóctel fría.",
  gar=("Half salt rim (optional)", "Medio borde de sal (opcional)"))
d("Mimosa", y=1925, pl="Paris", tech=["build"], glass="flute", fl=["sparkling","fruity"],
  h=("Frank Meier of the Ritz in Paris is usually credited, around 1925. London's Buck's Club had served the near-identical Buck's Fizz a few years earlier.",
     "Se suele atribuir a Frank Meier, del Ritz de París, hacia 1925. El Buck's Club de Londres ya servía unos años antes el casi idéntico Buck's Fizz."),
  mes="Vierte el jugo de naranja en una copa flauta y añade suavemente el espumante. Revuelve suavemente. También se conoce como Buck's Fizz.",
  gar=("Orange twist (optional)", "Twist de naranja (opcional)"))
d("Mint Julep", y=1800, pl="American South", tech=["muddle","build"], glass="mug", fl=["minty","spirit"],
  h=("A Southern drink since the late 1700s, first taken as a morning tonic. Official drink of the Kentucky Derby since 1938.",
     "Un trago del sur de EE. UU. desde fines del siglo XVIII, al principio tomado como tónico matinal. Bebida oficial del Derby de Kentucky desde 1938."),
  mes="En una copa julep de acero machaca suavemente la menta con el azúcar y el agua. Llena con hielo picado, añade el bourbon y revuelve bien hasta que la copa se escarche.",
  gar=("Mint sprig", "Rama de menta"))
d("Mojito", y=1930, pl="Havana", tech=["muddle","build"], glass="highball", fl=["sour","minty","fresh"],
  h=("Its ancestor, El Draque, is linked to Francis Drake's sailors in the 1500s. La Bodeguita del Medio in Havana made the modern version famous.",
     "Su antepasado, El Draque, se asocia a los marineros de Francis Drake en el siglo XVI. La Bodeguita del Medio en La Habana hizo famosa la versión moderna."),
  mes="Mezcla las ramas de menta con el azúcar y el jugo de lima. Añade un chorrito de soda y llena el vaso de hielo. Vierte el ron y completa con soda. Revuelve ligeramente para integrar.",
  gar=("Mint sprigs and a lime slice", "Ramas de menta y rodaja de lima"))
d("Moscow Mule", y=1941, pl="Los Angeles", tech=["build"], glass="mug", fl=["spicy","fresh"],
  h=("Made at the Cock 'n' Bull in Los Angeles in 1941 to move unsold vodka and ginger beer. The copper mug was part of the pitch.",
     "Se creó en el Cock 'n' Bull de Los Ángeles en 1941 para vender vodka y ginger beer que no salían. El jarro de cobre era parte de la estrategia."),
  mes="En un jarro Mule o vaso rocks combina el vodka y el ginger beer. Añade el jugo de lima y revuelve suavemente para integrar.",
  gar=("Lime slice", "Rodaja de lima"))
d("Pina Colada", y=1954, pl="San Juan, Puerto Rico", tech=["blend"], glass="other", fl=["sweet","creamy","tropical"],
  h=("Ramón 'Monchito' Marrero is credited at the Caribe Hilton in San Juan in 1954; Barrachina restaurant also claims it. Puerto Rico's national drink since 1978.",
     "Se atribuye a Ramón «Monchito» Marrero en el Caribe Hilton de San Juan en 1954; el restaurante Barrachina también lo reclama. Trago nacional de Puerto Rico desde 1978."),
  mes="Licúa todos los ingredientes con hielo, sirve en un vaso grande y acompaña con pajitas. Históricamente se añadían unas gotas de jugo de lima. Se pueden usar 4 rodajas de ananá fresco en lugar del jugo.",
  gar=("Pineapple slice and cocktail cherry", "Rodaja de ananá y cereza de cóctel"))
d("Pisco Sour", y=1920, pl="Lima", tech=["shake"], glass="other", fl=["sour","silky"],
  h=("Victor Morris, an American bartender in Lima, created it in the 1920s. Peru and Chile both claim pisco, and the drink.",
     "Victor Morris, un bartender estadounidense en Lima, lo creó en los años 20. Perú y Chile reclaman el pisco, y también el trago."),
  mes="Añade todos los ingredientes en una coctelera con hielo. Agita y cuela en una copa goblet fría.",
  gar=("A few dashes of Amargo bitters on top", "Unas gotas de amargo de Amargo encima"))
d("Sea Breeze", y=1970, pl="United States", tech=["build"], glass="highball", fl=["fruity","sour"],
  h=("A 1920s gin drink that was rebuilt with vodka, cranberry and grapefruit in the 1970s, helped by cranberry growers' marketing.",
     "Un trago de gin de los años 20 que en los 70 se rehízo con vodka, arándano y pomelo, impulsado por el marketing de los productores de arándano."),
  mes="Construye todos los ingredientes en un vaso highball lleno de hielo.",
  gar=("Orange zest and cherry", "Piel de naranja y cereza"))
d("Sex on the Beach", y=1987, pl="Florida", tech=["build"], glass="highball", fl=["sweet","fruity"],
  h=("Ted Pizio, a bartender in Florida, came up with it in 1987 for a peach schnapps sales contest during spring break.",
     "Ted Pizio, bartender en Florida, lo inventó en 1987 para un concurso de ventas de licor de durazno durante el spring break."),
  mes="Construye todos los ingredientes en un vaso highball lleno de hielo.",
  gar=("Half orange slice", "Media rodaja de naranja"))
d("Singapore Sling", y=1915, pl="Singapore", tech=["shake"], glass="other", fl=["fruity","sweet","herbal"],
  h=("Ngiam Tong Boon created it at the Long Bar of the Raffles Hotel around 1915. A pink drink that let women drink in public without seeming to.",
     "Ngiam Tong Boon lo creó en el Long Bar del Hotel Raffles hacia 1915. Un trago rosado que permitía a las mujeres beber en público sin que se notara."),
  mes="Vierte todos los ingredientes en una coctelera con hielo. Agita bien y cuela en un vaso Hurricane.",
  gar=("Pineapple and maraschino cherry", "Ananá y cereza marrasquino"))
d("Tequila Sunrise", y=1972, pl="Sausalito, California", tech=["build"], glass="highball", fl=["sweet","fruity"],
  h=("Bobby Lozoff and Billy Rice made the modern version at the Trident in Sausalito. The Rolling Stones drank it on their 1972 tour, and the Eagles wrote the song.",
     "Bobby Lozoff y Billy Rice crearon la versión moderna en el Trident de Sausalito. Los Rolling Stones lo tomaron en su gira de 1972 y los Eagles le escribieron la canción."),
  mes="Vierte el tequila y el jugo de naranja directamente en un vaso highball con hielo. Añade el jarabe de granadina para crear el efecto de amanecer; no revuelvas.",
  gar=("Half orange slice or orange zest", "Media rodaja de naranja o piel de naranja"))
d("Vesper", y=1953, pl="Fiction (Casino Royale)", tech=["shake"], glass="cocktail", fl=["spirit","dry"],
  h=("Ian Fleming had James Bond invent it in Casino Royale (1953), named after Vesper Lynd. Fleming's recipe used Kina Lillet, now gone.",
     "Ian Fleming hizo que James Bond lo inventara en Casino Royale (1953), con el nombre de Vesper Lynd. La receta de Fleming usaba Kina Lillet, que ya no existe."),
  mes="Vierte todos los ingredientes en una coctelera con hielo. Agita y cuela en una copa de cóctel fría.",
  gar=("Lemon zest", "Piel de limón"))
d("Zombie", y=1934, pl="Hollywood", tech=["blend"], glass="highball", fl=["tropical","sour","spirit"],
  h=("Donn Beach, the original tiki bartender, created it in Hollywood in the 1930s and limited guests to two. He kept the recipe in code.",
     "Donn Beach, el bartender que inventó el tiki, lo creó en Hollywood en los años 30 y limitaba a dos por cliente. Guardaba la receta en clave."),
  mes="Añade todos los ingredientes a una licuadora con 170 g de hielo picado. Licúa por pulsos unos segundos. Sirve en un vaso alto. Donn's Mix: 2 partes de pomelo amarillo fresco y 1 de almíbar de canela.",
  gar=("Mint leaves", "Hojas de menta"))
