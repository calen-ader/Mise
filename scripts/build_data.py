"""Builds drinks.json for the IBA finder from the IBA web scrape + editorial meta.

Ingredient model:
  ING[id] = (en, es, kind, abv, {component: level})
  level 3 = declared / is the thing, 2 = commonly in this product, 1 = possible (secret recipe or brand-dependent)
Components roll up through PARENT (orange -> citrus, almond -> nuts, grain -> gluten ...).
"""
import json, re, sys, os, unicodedata as ud
sys.path.insert(0, os.path.dirname(__file__))
from meta_a import M
import meta_b, meta_c, meta_d  # noqa: registers drinks

SRC = sys.argv[1]
OUT = sys.argv[2]

# ---------- components ----------
COMP = {  # id: (en, es, is_allergen_quick)
 'egg':('Egg','Huevo',1),'milk':('Dairy','Lácteos',1),'nuts':('Tree nuts','Frutos secos',1),
 'celery':('Celery','Apio',1),'fish':('Fish','Pescado',1),'sulphites':('Sulphites','Sulfitos',1),
 'gluten':('Gluten (grain)','Gluten (cereal)',1),'caffeine':('Caffeine','Cafeína',1),
 'citrus':('Citrus','Cítricos',1),'coconut':('Coconut','Coco',1),'honey':('Honey','Miel',0),
 'orange':('Orange','Naranja',0),'lemon':('Lemon','Limón',0),'lime':('Lime','Lima',0),'grapefruit':('Grapefruit','Pomelo',0),
 'almond':('Almond','Almendra',0),'apricot':('Apricot','Damasco',0),'cherry':('Cherry','Cereza',0),
 'raspberry':('Raspberry','Frambuesa',0),'blackberry':('Blackberry','Mora',0),'blackcurrant':('Blackcurrant','Grosella negra',0),
 'peach':('Peach','Durazno',0),'pineapple':('Pineapple','Ananá',0),'cranberry':('Cranberry','Arándano rojo',0),
 'tomato':('Tomato','Tomate',0),'apple':('Apple','Manzana',0),'grape':('Grape','Uva',0),'pomegranate':('Pomegranate','Granada',0),
 'coffee':('Coffee','Café',0),'cacao':('Cacao','Cacao',0),'mint':('Mint','Menta',0),'anise':('Anise','Anís',0),
 'ginger':('Ginger','Jengibre',0),'chili':('Chili','Ají',0),'vanilla':('Vanilla','Vainilla',0),'cinnamon':('Cinnamon','Canela',0),
 'clove':('Clove','Clavo',0),'chamomile':('Chamomile','Manzanilla',0),'elderflower':('Elderflower','Flor de saúco',0),
 'violet':('Violet','Violeta',0),'juniper':('Juniper','Enebro',0),'agave':('Agave','Agave',0),'cane':('Sugar cane','Caña de azúcar',0),
 'grain':('Grain','Cereal',0),'wormwood':('Wormwood','Ajenjo',0),'gentian':('Gentian','Genciana',0),'quinine':('Quinine','Quinina',0),
 'rhubarb':('Rhubarb','Ruibarbo',0),'saffron':('Saffron','Azafrán',0),'smoke':('Smoke (peat / roast)','Ahumado',0),
 'herbs':('Undisclosed herbs','Hierbas no declaradas',0),'allspice':('Allspice','Pimienta de Jamaica',0),'artichoke':('Artichoke','Alcaucil',0),
 'passionfruit':('Passion fruit','Maracuyá',0),'hazelnut':('Hazelnut','Avellana',0),'basil':('Basil','Albahaca',0),'orangeflower':('Orange blossom','Azahar',0),'pepper':('Black pepper','Pimienta',0),
}
PARENT = {'orange':'citrus','lemon':'citrus','lime':'citrus','grapefruit':'citrus','orangeflower':'orange',
          'almond':'nuts','hazelnut':'nuts','grain':'gluten'}

ING = {
 # spirits
 'gin':('Gin','Gin','spirit',40,{'juniper':3,'citrus':1,'grain':1}),
 'old-tom-gin':('Old Tom gin','Old Tom gin','spirit',40,{'juniper':3,'citrus':1,'grain':1}),
 'vodka':('Vodka','Vodka','spirit',40,{'grain':1}),
 'vodka-citron':('Citrus vodka','Vodka cítrico','spirit',40,{'lemon':3,'grain':1}),
 'vodka-vanilla':('Vanilla vodka','Vodka de vainilla','spirit',35,{'vanilla':3,'grain':1}),
 'white-rum':('White rum','Ron blanco','spirit',40,{'cane':3}),
 'gold-rum':('Gold rum','Ron dorado','spirit',40,{'cane':3}),
 'aged-rum':('Aged rum','Ron añejo','spirit',40,{'cane':3}),
 'dark-rum':('Dark Jamaican rum','Ron oscuro jamaicano','spirit',40,{'cane':3}),
 'black-rum':('Black rum (Gosling\'s)','Ron negro (Gosling\'s)','spirit',40,{'cane':3}),
 'demerara-rum':('Demerara rum','Ron demerara','spirit',40,{'cane':3}),
 'martinique-rum':('Martinique molasses rum','Ron de melaza de Martinica','spirit',40,{'cane':3}),
 'overproof-rum':('Jamaican overproof white rum','Ron blanco overproof jamaicano','spirit',63,{'cane':3}),
 'aguardiente':('Cuban aguardiente','Aguardiente cubano','spirit',40,{'cane':3}),
 'cachaca':('Cachaça','Cachaça','spirit',40,{'cane':3}),
 'tequila':('Tequila 100% agave','Tequila 100% agave','spirit',40,{'agave':3}),
 'tequila-reposado':('Reposado tequila 100% agave','Tequila reposado 100% agave','spirit',40,{'agave':3}),
 'mezcal':('Mezcal','Mezcal','spirit',42,{'agave':3,'smoke':3}),
 'bourbon':('Bourbon','Bourbon','spirit',45,{'grain':3}),
 'rye':('Rye whiskey','Whiskey de centeno','spirit',45,{'grain':3}),
 'scotch':('Scotch whisky','Whisky escocés','spirit',40,{'grain':3}),
 'islay':('Islay single malt (Lagavulin 16)','Single malt de Islay (Lagavulin 16)','spirit',43,{'grain':3,'smoke':3}),
 'irish':('Irish whiskey','Whiskey irlandés','spirit',40,{'grain':3}),
 'cognac':('Cognac','Cognac','spirit',40,{'grape':3}),
 'brandy':('Brandy','Brandy','spirit',40,{'grape':3}),
 'calvados':('Calvados','Calvados','spirit',40,{'apple':3}),
 'pisco':('Pisco','Pisco','spirit',40,{'grape':3}),
 'grappa':('Smooth white grappa','Grappa blanca suave','spirit',40,{'grape':3}),
 'absinthe':('Absinthe','Absenta','spirit',60,{'anise':3,'wormwood':3,'herbs':1}),
 'blackstrap-rum':('Blackstrap rum','Ron blackstrap','spirit',40,{'cane':3}),
 'agricole':('Rhum agricole (Martinique)','Rhum agrícola (Martinica)','spirit',50,{'cane':3}),
 # wine
 'amontillado':('Amontillado sherry','Jerez amontillado','wine',18,{'grape':3,'sulphites':3}),
 'palo-cortado':('Palo cortado sherry','Jerez palo cortado','wine',19,{'grape':3,'sulphites':3}),
 'sparkling':('Sparkling wine','Espumante','wine',11.5,{'grape':3,'sulphites':3}),
 'champagne':('Champagne','Champagne','wine',12,{'grape':3,'sulphites':3}),
 'prosecco':('Prosecco','Prosecco','wine',11,{'grape':3,'sulphites':3}),
 'white-wine':('Dry white wine','Vino blanco seco','wine',12,{'grape':3,'sulphites':3}),
 'red-wine':('Red wine','Vino tinto','wine',13,{'grape':3,'sulphites':3}),
 'port':('Tawny port','Oporto tawny','wine',20,{'grape':3,'sulphites':3}),
 'dry-vermouth':('Dry vermouth','Vermut seco','wine',18,{'grape':3,'sulphites':3,'wormwood':3,'citrus':2,'herbs':1}),
 'sweet-vermouth':('Sweet red vermouth','Vermut rojo dulce','wine',16,{'grape':3,'sulphites':3,'wormwood':3,'orange':2,'herbs':1}),
 'lillet':('Lillet Blanc','Lillet Blanc','wine',17,{'grape':3,'sulphites':3,'orange':3,'quinine':3}),
 # liqueurs
 'triple-sec':('Triple sec','Triple sec','liqueur',35,{'orange':3}),
 'cointreau':('Cointreau','Cointreau','liqueur',40,{'orange':3}),
 'curacao':('Orange curaçao','Curaçao de naranja','liqueur',30,{'orange':3}),
 'grand-marnier':('Grand Marnier','Grand Marnier','liqueur',40,{'orange':3,'grape':3}),
 'coffee-liqueur':('Coffee liqueur','Licor de café','liqueur',20,{'coffee':3,'caffeine':3,'vanilla':2}),
 'amaretto':('Amaretto','Amaretto','liqueur',28,{'almond':2,'apricot':2}),
 'campari':('Campari','Campari','liqueur',25,{'orange':2,'herbs':1}),
 'aperol':('Aperol','Aperol','liqueur',11,{'orange':3,'rhubarb':3,'gentian':3,'herbs':1}),
 'fernet':('Fernet-Branca','Fernet-Branca','liqueur',39,{'saffron':3,'chamomile':2,'herbs':1}),
 'nonino':('Amaro Nonino','Amaro Nonino','liqueur',35,{'grape':3,'orange':2,'herbs':1}),
 'galliano':('Galliano','Galliano','liqueur',30,{'vanilla':3,'anise':3,'citrus':2,'juniper':2,'herbs':1}),
 'green-chartreuse':('Green Chartreuse','Chartreuse verde','liqueur',55,{'herbs':1}),
 'yellow-chartreuse':('Yellow Chartreuse','Chartreuse amarilla','liqueur',40,{'honey':2,'herbs':1}),
 'maraschino':('Maraschino liqueur','Licor de marrasquino','liqueur',32,{'cherry':3,'almond':1}),
 'cherry-liqueur':('Cherry liqueur','Licor de cereza','liqueur',24,{'cherry':3,'almond':1}),
 'benedictine':('Bénédictine','Bénédictine','liqueur',40,{'honey':3,'citrus':2,'herbs':1}),
 'drambuie':('Drambuie','Drambuie','liqueur',40,{'grain':3,'honey':3,'herbs':1}),
 'creme-de-cacao':('Crème de cacao','Crème de cacao','liqueur',20,{'cacao':3,'vanilla':2}),
 'creme-de-menthe':('Crème de menthe','Crème de menthe','liqueur',24,{'mint':3}),
 'creme-de-cassis':('Crème de cassis','Crème de cassis','liqueur',15,{'blackcurrant':3}),
 'creme-de-mure':('Crème de mûre','Crème de mûre (mora)','liqueur',16,{'blackberry':3}),
 'creme-de-violette':('Crème de violette','Crème de violette','liqueur',16,{'violet':3}),
 'peach-schnapps':('Peach schnapps','Licor de durazno','liqueur',20,{'peach':3}),
 'raspberry-liqueur':('Raspberry liqueur','Licor de frambuesa','liqueur',16,{'raspberry':3}),
 'apricot-brandy':('Apricot brandy (liqueur)','Licor de damasco','liqueur',24,{'apricot':3,'almond':1}),
 'cynar':('Cynar','Cynar','liqueur',16.5,{'artichoke':3,'herbs':1}),
 'allspice-dram':('Allspice dram (St. Elizabeth)','Licor de pimienta de Jamaica (St. Elizabeth)','liqueur',22.5,{'allspice':3}),
 'passion-liqueur':('Passion fruit liqueur','Licor de maracuyá','liqueur',20,{'passionfruit':3}),
 'peach-brandy':('Peach brandy (liqueur)','Licor de durazno (peach brandy)','liqueur',30,{'peach':3}),
 'frangelico':('Frangelico','Frangelico','liqueur',20,{'hazelnut':3,'vanilla':2}),
 'angostura':('Angostura bitters','Amargo de Angostura','bitters',44.7,{'gentian':3,'herbs':1,'citrus':1}),
 'orange-bitters':('Orange bitters','Amargo de naranja','bitters',28,{'orange':3,'herbs':1}),
 'peychauds':('Peychaud\'s bitters','Amargo Peychaud\'s','bitters',35,{'anise':2,'herbs':1}),
 # juices & fresh
 'lemon':('Fresh lemon juice','Jugo de limón fresco','juice',0,{'lemon':3}),
 'lime':('Fresh lime juice','Jugo de lima fresco','juice',0,{'lime':3}),
 'lime-fruit':('Lime','Lima','juice',0,{'lime':3}),
 'orange-juice':('Fresh orange juice','Jugo de naranja fresco','juice',0,{'orange':3}),
 'pineapple':('Fresh pineapple juice','Jugo de ananá fresco','juice',0,{'pineapple':3}),
 'grapefruit':('Grapefruit juice','Jugo de pomelo','juice',0,{'grapefruit':3}),
 'cranberry':('Cranberry juice','Jugo de arándano rojo','juice',0,{'cranberry':3}),
 'tomato':('Tomato juice','Jugo de tomate','juice',0,{'tomato':3}),
 'peach-puree':('White peach purée','Puré de durazno blanco','juice',0,{'peach':3}),
 'passion-puree':('Passion fruit purée','Puré de maracuyá','juice',0,{'passionfruit':3}),
 'cane-juice':('Sugar cane juice','Jugo de caña','juice',0,{'cane':3}),
 # sweet
 'sugar':('Sugar','Azúcar','sweet',0,{'cane':2}),
 'sugar-cube':('Sugar cube','Terrón de azúcar','sweet',0,{'cane':2}),
 'simple':('Simple syrup','Almíbar simple','sweet',0,{'cane':2}),
 'honey':('Honey syrup','Almíbar de miel','sweet',0,{'honey':3}),
 'raw-honey':('Raw honey','Miel cruda','sweet',0,{'honey':3}),
 'honey-chamomile':('Honey mix (chamomile)','Mezcla de miel (manzanilla)','sweet',0,{'honey':3,'chamomile':2}),
 'agave-syrup':('Agave syrup','Jarabe de agave','sweet',0,{'agave':3}),
 'grenadine':('Grenadine','Granadina','sweet',0,{'pomegranate':2}),
 'orgeat':('Orgeat (almond) syrup','Jarabe de orgeat (almendra)','sweet',0,{'almond':3,'orangeflower':2}),
 'passion-syrup':('Passion fruit syrup','Jarabe de maracuyá','sweet',0,{'passionfruit':3}),
 'demerara-syrup':('Demerara syrup','Almíbar de demerara','sweet',0,{'cane':3}),
 'vanilla-sugar':('Vanilla sugar','Azúcar de vainilla','sweet',0,{'vanilla':3,'cane':2}),
 'raspberry-syrup':('Raspberry syrup','Jarabe de frambuesa','sweet',0,{'raspberry':3}),
 'falernum':('Falernum','Falernum','sweet',0,{'lime':3,'ginger':3,'clove':3,'almond':2}),
 'donns-mix':('Donn\'s Mix (grapefruit + cinnamon)','Donn\'s Mix (pomelo + canela)','sweet',0,{'grapefruit':3,'cinnamon':3}),
 'elderflower':('Elderflower cordial','Cordial de flor de saúco','sweet',0,{'elderflower':3,'lemon':2}),
 'chamomile-cordial':('Chamomile cordial','Cordial de manzanilla','sweet',0,{'chamomile':3,'lemon':2}),
 # mixers
 'soda':('Soda water','Soda','mixer',0,{}),
 'cola':('Cola','Cola','mixer',0,{'caffeine':3}),
 'ginger-beer':('Ginger beer','Ginger beer','mixer',0,{'ginger':3}),
 'ginger-ale':('Ginger ale','Ginger ale','mixer',0,{'ginger':3}),
 'grapefruit-soda':('Pink grapefruit soda','Soda de pomelo rosado','mixer',0,{'grapefruit':3}),
 'coffee':('Hot coffee','Café caliente','mixer',0,{'coffee':3,'caffeine':3}),
 'espresso':('Espresso','Espresso','mixer',0,{'coffee':3,'caffeine':3}),
 'water':('Water','Agua','mixer',0,{}),
 # dairy, egg
 'cream':('Fresh cream','Crema fresca','dairy',0,{'milk':3}),
 'coconut-cream':('Coconut cream','Crema de coco','dairy',0,{'coconut':3}),
 'egg-white':('Egg white','Clara de huevo','egg',0,{'egg':3}),
 'egg-yolk':('Egg yolk','Yema de huevo','egg',0,{'egg':3}),
 # other
 'mint':('Fresh mint','Menta fresca','fresh',0,{'mint':3}),
 'ginger':('Fresh ginger','Jengibre fresco','fresh',0,{'ginger':3}),
 'basil':('Italian basil','Albahaca italiana','fresh',0,{'basil':3}),
 'cloves':('Cloves','Clavos de olor','fresh',0,{'clove':3}),
 'pineapple-fruit':('Pineapple chunks','Trozos de ananá','fresh',0,{'pineapple':3}),
 'orange-wheel':('Orange wheel','Rodaja de naranja','fresh',0,{'orange':3}),
 'lemon-wheel':('Lemon wheel','Rodaja de limón','fresh',0,{'lemon':3}),
 'chili':('Red chili','Ají rojo','fresh',0,{'chili':3}),
 'celery-salt':('Celery salt','Sal de apio','seasoning',0,{'celery':3}),
 'worcestershire':('Worcestershire sauce','Salsa inglesa','seasoning',0,{'fish':3,'gluten':2}),
 'tabasco':('Tabasco','Tabasco','seasoning',0,{'chili':3}),
 'pepper':('Black pepper','Pimienta negra','seasoning',0,{'pepper':3}),
 'salt':('Salt','Sal','seasoning',0,{}),
 'vanilla':('Vanilla extract','Extracto de vainilla','seasoning',35,{'vanilla':3}),
 'orange-flower-water':('Orange flower water','Agua de azahar','seasoning',0,{'orangeflower':3}),
}

RAW = {
 'Gin':'gin','Dry Gin':'gin','London Dry Gin':'gin','Old Tom Gin':'old-tom-gin',
 'Vodka':'vodka','Smirnoff Vodka':'vodka','Vodka Citron':'vodka-citron','Vodka Vanilla':'vodka-vanilla','Vanilla Vodka':'vodka-vanilla','Creme de Cassis':'creme-de-cassis',
 'White Rum':'white-rum','White rum':'white-rum','Rum':'white-rum','White Cuban Ron':'white-rum',
 'Gold Rum':'gold-rum','Gold Puerto Rican rum':'gold-rum','Aged Rum':'aged-rum',
 'Jamaican Rum':'dark-rum','Amber Jamaican Rum':'dark-rum','Jamaican dark rum':'dark-rum','Goslings Rum':'black-rum',
 'Demerara Rum':'demerara-rum','Martinique Molasses Rhum':'martinique-rum','Jamaica Overproof White Rum':'overproof-rum',
 'Cuban Aguardiente':'aguardiente','Cachaça':'cachaca',
 'Tequila':'tequila','Tequila 100% Agave':'tequila','100% Agave Tequila':'tequila','Tequila Agave 100% Reposado':'tequila-reposado',
 'Mezcal':'mezcal','Espadin Mezcal':'mezcal',
 'Bourbon Whiskey':'bourbon','Bourbon or Rye Whiskey':['bourbon','rye'],'Rye Whiskey or Bourbon':['rye','bourbon'],
 'Rye Whiskey':'rye','Rye Whisky':'rye','Scotch Whisky':'scotch','Blended Scotch Whisky':'scotch','Lagavulin 16 y Whisky':'islay',
 'Irish Whiskey':'irish','Cognac':'cognac','Cognac or Brandy':['cognac','brandy'],'Brandy':'brandy','Calvados':'calvados',
 'Pisco':'pisco','White Smooth Grappa':'grappa','Absinthe':'absinthe','Pernod':'absinthe',
 'Champagne':'champagne','Chilled Champagne':'champagne','Prosecco':'prosecco','Brut Champagne or Prosecco':['champagne','prosecco'],
 'Sparkling wine':'sparkling','Dry White Wine':'white-wine','Red wine':'red-wine','Red Tawny Port Wine':'port',
 'Dry Vermouth':'dry-vermouth','Sweet Red Vermouth':'sweet-vermouth','Sweet Vermouth':'sweet-vermouth','Lillet Blanc':'lillet',
 'Triple Sec':'triple-sec','Cointreau':'cointreau','Curacao':'curacao','Orange Curacao':'curacao','Grand Marnier':'grand-marnier',
 'Coffee Liqueur':'coffee-liqueur','Kahlúa':'coffee-liqueur','Amaretto':'amaretto','Bitter Campari':'campari','Aperol':'aperol',
 'Fernet Branca':'fernet','Amaro Nonino':'nonino','Galliano':'galliano','Green Chartreuse':'green-chartreuse','Yellow Chartreuse':'yellow-chartreuse',
 'Maraschino Luxardo':'maraschino','Maraschino Liqueur':'maraschino','Cherry liqueur':'cherry-liqueur',
 'DOM Bénédictine':'benedictine','Bénédictine':'benedictine','Drambuie':'drambuie',
 'Crème de Cacao':'creme-de-cacao','Crème de Menthe':'creme-de-menthe','White Crème de Menthe':'creme-de-menthe',
 'Crème de Cassis':'creme-de-cassis','Crème de Cassis':'creme-de-cassis','Crème de Mûre':'creme-de-mure','Crème de Violette':'creme-de-violette',
 'Peach Schnapps':'peach-schnapps','Raspberry Liqueur':'raspberry-liqueur','Apricot Brandy':'apricot-brandy',
 'Angostura Bitters':'angostura','Angostura bitters':'angostura','Aromatic Bitters':'angostura','Orange Bitters':'orange-bitters',"Peychaud's Bitters":'peychauds',
 'Fresh Lemon Juice':'lemon','Fresh lemon Juice':'lemon','Fresh lemon juice':'lemon','Lemon juice':'lemon',
 'Fresh Lime Juice':'lime','Fresh lime juice':'lime','Lime Juice':'lime','Freshly Squeezed Lime Juice':'lime','Fresh Lime':'lime','Fresh lime':'lime',
 'Lime cut into small wedges':'lime-fruit',
 'Fresh Orange Juice':'orange-juice','Fresh orange juice':'orange-juice','Fresh Pineapple Juice':'pineapple','Grapefruit Juice':'grapefruit',
 'Cranberry Juice':'cranberry','Tomato Juice':'tomato','White Peach Puree':'peach-puree','Sugar Cane Juice':'cane-juice',
 'Sugar':'sugar','White Cane Sugar':'sugar','Powdered Sugar':'sugar','Superfine Sugar':'sugar','Sugar Cube':'sugar-cube',
 'Simple Syrup':'simple','Simple syrup':'simple','Sugar Syrup':'simple','Sugar syrup':'simple',
 'Honey Syrup':'honey','Monin Honey Syrup':'honey','Raw Honey':'raw-honey','Honey mix':'honey-chamomile','Agave Syrup':'agave-syrup',
 'Grenadine Syrup':'grenadine','Grenadine syrup':'grenadine','Orgeat Syrup':'orgeat','Raspberry Syrup':'raspberry-syrup',
 'Falernum':'falernum',"Donn's Mix":'donns-mix','Elderflower Cordial':'elderflower','Chamomile cordial':'chamomile-cordial',
 'Soda Water':'soda','Soda water':'soda','Coca Cola':'cola','Cola':'cola','Ginger Beer':'ginger-beer','Ginger beer':'ginger-beer',
 'Ginger Ale':'ginger-ale','Pink Grapefruit Soda':'grapefruit-soda','Hot coffee':'coffee','strong Espresso':'espresso',
 'Water':'water','Plain Water':'water',
 'Cream':'cream','Fresh Cream':'cream','Fresh cream':'cream','Coconut Cream':'coconut-cream',
 'Egg White':'egg-white','Egg white':'egg-white','Raw Egg White':'egg-white','Egg Yolk':'egg-yolk',
 'Mint Leaves':'mint','Mint Sprigs':'mint','fresh Mint sprigs':'mint','quarter size Sliced Fresh Ginger':'ginger',
 'thin Slices Red Chili Pepper':'chili','Celery Salt':'celery-salt','Worcestershire Sauce':'worcestershire','Tabasco':'tabasco',
 'Pepper':'pepper','Salt':'salt','Vanilla Extract':'vanilla','Orange Flower Water':'orange-flower-water',
}

RAW.update({'Blackstrap rum':'blackstrap-rum','Blended Aged Rum':'aged-rum','Cuban Rum':'white-rum','Gold Jamaican Rum':'gold-rum',
 'Rhum Martinique Agricole':'agricole','Ron Profundo Havana Club':'aged-rum','Ron Smoky Havana Club':'aged-rum','Cachaca':'cachaca',
 'Amontillado sherry':'amontillado','Palo Cortado':'palo-cortado','Campari':'campari','Cynar':'cynar','Fernet':'fernet',
 'Cherry Brandy Luxardo':'cherry-liqueur','Cherry Sangue Morlacco':'cherry-liqueur','Allspice Saint Elizabeth':'allspice-dram',
 'Passion Fruit Liqueur':'passion-liqueur','Passion Fruit Puree':'passion-puree','Passion Fruit Syrup':'passion-syrup',
 'Peach Brandy':'peach-brandy','Licor Amaretto':'amaretto','Licor Frangelico':'frangelico','Agave Nectar':'agave-syrup',
 'Demerara sugar syrup':'demerara-syrup','Vanilla Sugar':'vanilla-sugar','Cloves':'cloves','Italian Basil leaves':'basil',
 'Pineapple Chunks':'pineapple-fruit','Orange Wheel':'orange-wheel','Lemon Wheel':'lemon-wheel','Gengibre Slice':'ginger',
 'Sweet Vermouth Cinzano Rosso':'sweet-vermouth','Lagavulin 16y':'islay','Raw whole Egg White':'egg-white','Champagne':'champagne',
 'Fresh Squeezed Lemon Juice':'lemon','Freshly Squeezed Lemon Juice':'lemon','Fresh Squeezed Lime Juice':'lime','Freshly Squeezed Lime juice':'lime',
 'Freshly Squeezed Orange Juice':'orange-juice','Pineapple juice':'pineapple','Honey Mix':'honey','Superfine Sugar':'sugar','Angostura':'angostura',
 'sliced fresh ginger':'ginger','Red wine':'red-wine'})
RAWN = {ud.normalize('NFC',k).lower():v for k,v in RAW.items()}

def nkey(s): return re.sub(r'[^a-z0-9]','',ud.normalize('NFKD',s).encode('ascii','ignore').decode().lower())
ALIAS = {'longislandicetea':'longislandicedtea','southside':'southside'}
MK = {ALIAS.get(nkey(k),nkey(k)):v for k,v in M.items()}

PREFIX = [(r'^a dash of ','dash'),(r'^dash of ','dash'),(r'^a pinch of ','pinch'),(r'^a splash of ','splash'),(r'^splash of ','splash'),
          (r'^fill up with ','fill up'),(r'^top up with ','top up'),(r'^top up ','top up'),(r'^top with ','top up')]
UNORM = {'dashes':'dash','dash':'dash','bar spoon':'bar spoon','bar spoons':'bar spoon','tsp':'teaspoon','teaspoon':'teaspoon','teaspoons':'teaspoon',
         'tablespoon':'tablespoon','drops':'drops','pcs':'piece','pc':'piece','ml':'ml','':''}
def clean(x):
    """Normalise a scraped IBA ingredient list (2023 or 2026 format) to [(name, qty, unit, direction)]."""
    out=[]
    for i in x['ingredients']:
        name=ud.normalize('NFC',i['ingredient']).replace('’',"'").replace('‘',"'").strip().rstrip('*').strip()
        q=(i['quantity'] or '').strip(); u=UNORM.get((i['unit'] or '').strip().lower(), (i['unit'] or '').strip().lower())
        dr=i['direction']
        if 'Allspice Saint Elizabeth' in name:
            out.append(('Allspice Saint Elizabeth','7.5','ml','7.5 ml Allspice Saint Elizabeth')); out.append(('Fresh Lime Juice','15','ml','15 ml Fresh Lime Juice')); continue
        if name.startswith('Tabasco, Celery Salt'):
            for n in ('Tabasco','Celery Salt','Pepper'): out.append((n,'1','dash',n+' (Up to taste)'))
            continue
        low=name.lower()
        for rx,un in PREFIX:
            if re.match(rx,low): name=name[len(re.match(rx,low).group(0)):]; u=un; q=q or ('1' if un=='dash' else ''); break
        if 'to serve on the side' in name: name=name.replace(' to serve on the side',''); dr=dr+' (on the side)'
        notes=re.findall(r'\(([^)]*)\)',name); name=re.sub(r'\s*\([^)]*\)','',name).strip()
        for n_ in notes:
            if n_ not in dr: dr=dr+' ('+n_+')'
        if q.lower()=='few': q='few'
        m=re.match(r'^(\d+)\s*(?:to|/)\s*(\d+)$',q)
        if m:
            a,b=int(m.group(1)),int(m.group(2)); q = f'{a}/{b}' if (a<b and b in (2,3,4) and '/' in q) else f'{a}-{b}'
        if not u and q and name.lower() not in ('soda water',): u='piece'
        if not u and not q: u='top up'
        if u=='' : u='piece'
        out.append((name,q,u,dr))
    return out
# paren notes found in directions -> ES
NOTE_ES = {'optional':'opcional','Optional':'opcional','White':'blanca','Green':'verde','Brown':'oscura','Chilled':'fría',
 'Almond':'almendra','Up to taste':'a gusto','Shiraz or Malbech':'Shiraz o Malbec','Persiano':'lima persa',
 '1/2 Water + 1/2 Agave Nectar':'1/2 agua + 1/2 néctar de agave','replace water with chamomile':'agua reemplazada por manzanilla'}

UNIT = {  # unit -> (en, es)
 'dash':('dash','golpe'),'drops':('drops','gotas'),'bar spoon':('bar spoon','cuchara de bar'),'teaspoon':('tsp','cdta.'),
 'tablespoon':('tbsp','cda.'),'piece':('','u.'),'top up':('top up','completar'),'fill up':('fill up','completar'),
 'splash':('splash','chorrito'),'shot':('shot','shot'),'pinch':('pinch','pizca'),'ml':('ml','ml')}

GLASS = {  # id: (en, es, group)
 'cocktail':('Cocktail glass','Copa de cóctel','stem'),'martini':('Martini glass','Copa martini','stem'),
 'slim':('Slim cocktail glass','Copa de cóctel delgada','stem'),'goblet':('Goblet','Copa goblet','stem'),
 'cobbler':('Cobbler glass','Copa cobbler','stem'),'flute':('Flute','Copa flauta','flute'),
 'wine':('Wine glass','Copa de vino','wine'),'rocks':('Old fashioned','Vaso old fashioned','low'),
 'dof':('Double old fashioned','Old fashioned doble','low'),'small-tumbler':('Small tumbler','Vaso bajo','low'),
 'highball':('Highball','Vaso highball','tall'),'collins':('Collins','Vaso Collins','tall'),
 'tall-tumbler':('Tall tumbler','Vaso alto','tall'),'hurricane':('Hurricane','Copa hurricane','tall'),
 'copper':('Copper mug','Jarro de cobre','mug'),'tiki':('Tiki mug','Taza tiki','mug'),'julep':('Julep cup','Copa julep','mug'),
 'irish':('Irish coffee glass','Copa Irish coffee','mug'),'clay':('Clay cup','Vasija de barro','mug'),
}
# drink -> (glass, ice, glass_alt)
GI = {
 'Bellini':('flute','up'),'Black Russian':('rocks','cubes'),'Bloody Mary':('rocks','up','highball'),'Caipirinha':('dof','cracked'),
 'Champagne Cocktail':('flute','up'),'Corpse Reviver #2':('cocktail','up'),'Cosmopolitan':('cocktail','up'),'Cuba Libre':('highball','cubes'),
 'French 75':('flute','up'),'French Connection':('rocks','cubes'),'Golden Dream':('cocktail','up'),'Grasshopper':('cocktail','up'),
 'Hemingway Special':('cocktail','up'),"Horse's Neck":('highball','cubes'),'Irish Coffee':('irish','hot'),'KIR':('wine','up'),
 'Long Island Ice Tea':('highball','cubes'),'Mai-Tai':('dof','crushed','highball'),'Margarita':('cocktail','up'),'Mimosa':('flute','up'),
 'Mint Julep':('julep','crushed'),'Mojito':('highball','cubes'),'Moscow Mule':('copper','cubes','rocks'),'Pina Colada':('hurricane','blended'),
 'Pisco Sour':('goblet','up'),'Sea Breeze':('highball','cubes'),'Sex on the Beach':('highball','cubes'),'Singapore Sling':('hurricane','cubes'),
 'Tequila Sunrise':('highball','cubes'),'Vesper':('cocktail','up'),'Zombie':('tall-tumbler','blended'),
 'Barracuda':('highball','cubes'),"Bee's Knees":('cocktail','up'),'Bramble':('rocks','crushed'),'Canchanchara':('clay','cracked'),
 "Dark ‘n' stormy":('highball','cubes'),'Espresso Martini':('cocktail','up'),'Fernandito':('dof','cubes'),'French Martini':('cocktail','up'),
 'Illegal':('cocktail','up','clay'),'Lemon drop Martini':('cocktail','up'),'Naked and Famous':('cocktail','up'),'New York Sour':('rocks','cubes'),
 'Old Cuban':('cocktail','up'),'Paloma':('highball','cubes'),'Paper Plane':('cocktail','up'),'Penicillin':('rocks','cubes'),
 'Russian Spring Punch':('tall-tumbler','cubes'),'Southside':('cocktail','up'),'Spicy Fifty':('cocktail','up'),'Spritz':('wine','cubes'),
 'Suffering Bastard':('collins','cubes'),'Tipperary':('martini','up'),"Tommy's Margarita":('rocks','cubes'),'Trinidad Sour':('cocktail','up'),
 'VE.N.TO':('small-tumbler','cubes'),'Yellow Bird':('cocktail','up'),
 'Alexander':('cocktail','up'),'Americano':('rocks','cubes'),'Angel Face':('cocktail','up'),'Aviation':('cocktail','up'),
 'Between the Sheets':('cocktail','up'),'Boulevardier':('cocktail','up'),'Brandy Crusta':('slim','up'),'Casino':('rocks','cubes'),
 'Clover Club':('cocktail','up'),'Daiquiri':('cocktail','up'),'Dry Martini':('martini','up'),'Gin Fizz':('tall-tumbler','none'),
 'Hanky Panky':('cocktail','up'),'John Collins':('collins','cubes'),'Last word':('cocktail','up'),'Manhattan':('cocktail','up'),
 'Martinez':('cocktail','up'),'Mary Pickford':('cocktail','up'),'Monkey Gland':('cocktail','up'),'Negroni':('rocks','cubes'),
 'Old Fashioned':('rocks','cubes'),'Paradise':('cocktail','up'),"Planter's Punch":('small-tumbler','cubes','clay'),'Porto Flip':('cocktail','up'),
 'Ramos Fizz':('highball','none'),'Rusty Nail':('rocks','cubes'),'Sazerac':('rocks','none'),'Sidecar':('cocktail','up'),
 'Stinger':('martini','up'),'Tuxedo':('martini','up'),'Vieux Carrè':('cocktail','up'),'Whiskey Sour':('cobbler','up','rocks'),
 'White Lady':('cocktail','up'),
}
GI.update({'Cardinale':('cocktail','up'),'Chartreuse Swizzle':('highball','crushed'),'Don’s Special Daiquiri':('goblet','crushed'),
 'Garibaldi':('highball','cubes'),'Gin Basil Smash':('cocktail','up'),'Grand Margarita':('rocks','cubes'),'IBA Tiki':('tiki','crushed'),
 'Jungle Bird':('rocks','cubes'),'Missionary’s Downfall':('goblet','blended'),'Pisco Punch':('goblet','up'),'Porn Star Martini':('cocktail','up'),
 'Rabo de Galo':('rocks','cubes'),'Remember the Maine':('cocktail','up'),'Sherry Cobbler':('julep','crushed'),'Three Dots and a Dash':('goblet','crushed')})
GIK = {ALIAS.get(nkey(k),nkey(k)):v for k,v in GI.items()}
DISPLAY = {'KIR':'Kir','Long Island Ice Tea':'Long Island Iced Tea','Mai-Tai':'Mai Tai','Pina Colada':'Piña Colada',
 "Dark ‘n' stormy":"Dark 'n' Stormy",'Lemon drop Martini':'Lemon Drop Martini','Last word':'Last Word','Vieux Carrè':'Vieux Carré',
 'VE.N.TO':'VE.N.TO'}
CAT = {'The Unforgettables':'unforgettables','Contemporary Classics':'contemporary','New Era Drinks':'newera'}
TOPUP = {'cola':60,'soda':60,'prosecco':60,'sparkling':60,'ginger-beer':90}

def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower().replace('ñ','n')).strip('-')

def qty(q):
    q=q.strip()
    if not q: return 1
    if q=='few': return 3
    if '-' in q: a,b=q.split('-'); return (float(a)+float(b))/2
    if '/' in q: a,b=q.split('/'); return float(a)/float(b)
    return float(q)

def volume(ids, n, unit, raw):
    i = ids[0]
    if unit=='ml': return n
    if unit=='dash': return n*0.8
    if unit=='drops': return 5 if i=='egg-white' else n*0.05
    if unit in('bar spoon','teaspoon'):
        return n*5 if ING[i][2]!='sweet' or i in('honey',) else n*2.5  # granulated sugar adds less liquid
    if unit=='tablespoon': return n*15
    if unit=='splash': return 20
    if unit=='shot': return 30
    if unit=='fill up': return 100
    if unit=='top up': return TOPUP.get(i,60)
    if unit=='piece':
        return {'lime-fruit':25,'egg-white':30,'sugar-cube':2}.get(i,0)
    return 0

DIL = {'swizzle':0.3,'shake':0.25,'stir':0.2,'build':0.1,'blend':0.35,'muddle':0.15}

d_src = json.load(open(SRC))
out = []
missing=set()
for x in d_src:
    name = x['name']; meta = MK.get(ALIAS.get(nkey(name),nkey(name)))
    if meta is None: missing.add('META '+name); continue
    lines=[]; tot=0; alc=0
    for raw,iq,iu,idir in clean(x):
        ing={'quantity':iq,'unit':iu,'direction':idir}
        ids = RAWN.get(raw.lower())
        if ids is None: missing.add(raw); continue
        if isinstance(ids,str): ids=[ids]
        notes = re.findall(r'\(([^)]*)\)', ing['direction'])
        side = any('on the side' in n for n in notes)
        opt = any('ptional' in n for n in notes)
        notes=[n for n in notes if 'ptional' not in n]
        if raw=='Crème de Cacao':
            notes = notes  # White / Brown come from direction
        n = qty(ing['quantity']); u = ing['unit']
        v = 0 if (opt or side) else volume(ids,n,u,raw)
        tot += v; alc += v*ING[ids[0]][3]/100
        q = ing['quantity'] if ing['quantity']!='few' else ''
        if u=='top up' or u=='fill up' or u=='splash' or u=='pinch': q=''
        lines.append({'ids':ids,'q':q,'u':u,'opt':opt,
            'n_en':', '.join(notes),'n_es':', '.join(NOTE_ES.get(t,t) for t in notes),
            'brand': raw if raw in ('Smirnoff Vodka','Kahlúa','Maraschino Luxardo','Lagavulin 16 y Whisky','Lagavulin 16y','Goslings Rum','Monin Honey Syrup','Cointreau','Grand Marnier','Ron Profundo Havana Club','Ron Smoky Havana Club','Cherry Sangue Morlacco','Cherry Brandy Luxardo','Sweet Vermouth Cinzano Rosso','Allspice Saint Elizabeth','Licor Frangelico') else ''})
    tech = meta['tech']
    dil = max(DIL[t] for t in tech)
    gi = GIK[nkey(name)] if nkey(name) in GIK else GIK[ALIAS.get(nkey(name),nkey(name))]
    if gi[1] in ('crushed','cracked'): dil=max(dil,0.25)
    if gi[1]=='hot': dil=0
    final = tot*(1+dil)
    abv = round(100*alc/final,1) if final else 0
    out.append({
        'id':slug(DISPLAY.get(name,name)),'name':DISPLAY.get(name,name),'url':x.get('url'),'src':'iba','cat':CAT[x['category']],
        'year':meta['y'],'place':meta['pl'],'tech':tech,'glass':gi[0],'glassAlt':gi[2] if len(gi)>2 else None,'ice':gi[1],
        'flav':meta['fl'],'abv':abv,'vol':round(final/5)*5,'alcMl':round(alc,1),
        'lines':lines,
        'method':{'en':re.sub(r'\s+',' ',x['method']).strip(),'es':meta['mes']},
        'garnish':{'en':meta['gar'][0],'es':meta['gar'][1]},
        'history':{'en':meta['h'][0],'es':meta['h'][1]},
        'video':x.get('video'),
    })
if missing: print('MISSING', missing); sys.exit(1)
json.dump({'ing':{k:{'en':v[0],'es':v[1],'kind':v[2],'abv':v[3],'c':v[4]} for k,v in ING.items()},
           'comp':{k:{'en':v[0],'es':v[1],'quick':v[2],'parent':PARENT.get(k)} for k,v in COMP.items()},
           'glass':{k:{'en':v[0],'es':v[1],'g':v[2]} for k,v in GLASS.items()},
           'unit':UNIT,'drinks':out}, open(OUT,'w'), ensure_ascii=False)
print(len(out),'drinks')
for o in sorted(out,key=lambda o:o['abv']): print(f"{o['abv']:5} {o['vol']:4} {o['name']}")
