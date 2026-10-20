/* Convención del GYM 4: r_j = z_j - c_j (maximización). */
const MODEL_P='max z = 5x₁ + 3x₂\n3x₁ + 5x₂ ≤ 15\n5x₁ + 2x₂ ≤ 10; x ≥ 0';
const MODEL_Q='max z = 3x₁ + 5x₂\nx₁ ≤ 4\n3x₁ + 2x₂ ≤ 18; x ≥ 0';
const CHANGE_OPTIONS=['Cambio en b','Cambio en c','Cambio en A','Agregar variable','Agregar restricción'];
const DIAG_OPTIONS=['FACTIBILIDAD','OPTIMALIDAD','AMBAS','SIN PÉRDIDA'];
const ACTION_OPTIONS=['Considerar dual simplex','Continuar con simplex primal','Conservar la base óptima','Reconstruir una base: M grande'];
const BANK=[];
function add(id,stage,theme,model,change,math,options,answer,why,page,extra={}){BANK.push({id,stage,theme,model,original:model===MODEL_P?'Base original (x₂, x₁): xᴮ = (45/19, 20/19), z = 235/19.':model===MODEL_Q?'Base original (x₃, x₂): xᴮ = (4, 9), z = 45; x₃ es holgura.':'Base original factible y óptima.',change,math,options,answer,why,page,difficulty:stage<3?'Inicial':stage===3?'Intermedio':'Avanzado',...extra});}
[
['B01','Recursos',MODEL_P,'La materia prima disponible pasa de 15 a 3.','b: (15, 10) → (3, 10). A y c no cambian.',0,'Cambió el vector de recursos b. El efecto sobre factibilidad se verifica con B⁻¹b.',30,'b'],
['C01','Utilidad',MODEL_Q,'La utilidad de x₁ pasa de $3 a $10.','c: (3, 5) → (10, 5). Restricciones sin cambios.',1,'Cambió c, el vector del objetivo. No todo cambio en c destruye la optimalidad.',31,'c'],
['B02','Capacidad',MODEL_P,'Se amplía el primer recurso de 15 a 16.','b: (15, 10) → (16, 10).',0,'Cambió b. Una ampliación tampoco permite concluir sin revisar la base.',30,'b'],
['C02','Utilidad',MODEL_P,'La utilidad por unidad de x₂ baja de $3 a $1.','c: (5, 3) → (5, 1).',1,'Cambió c₂; como x₂ es básica, se revisa también cᴮ.',33,'c']
].forEach(([id,t,m,ch,ma,a,w,p,channel])=>add(id,1,t,m,ch,ma,CHANGE_OPTIONS,CHANGE_OPTIONS[a],w,p,{channel}));
[
['A01','Tecnología','El consumo de x₁ cambia de (1, 3) a (10, 1).','a₁: (1, 3) → (10, 1); c₁ = 3.',2,'Se modificó una columna existente de A, no el recurso disponible.',34,'A'],
['V01','Nuevo producto','Se incorpora x₅ con utilidad 7 y consumos (1, 2).','Nueva columna a₅ = (1, 2), c₅ = 7, x₅ ≥ 0.',3,'Agregar un producto incorpora una variable, con su columna en A y coeficiente en c.',39,'A'],
['R01','Nueva regla','Se incorpora la condición adicional x₂ ≤ 1.','Las dos restricciones originales permanecen.',4,'Se añadió una restricción: hay una condición adicional que la solución debe cumplir.',42,'b'],
['A02','Reingeniería','El consumo de x₁ cambia de (1, 3) a (2, 3).','Se sustituye a₁; dimensiones y b permanecen iguales.',2,'Cambió A. Sus efectos dependen de si la columna es básica y de los valores nuevos.',34,'A']
].forEach(([id,t,ch,ma,a,w,p,channel])=>add(id,2,t,MODEL_Q,ch,ma,CHANGE_OPTIONS,CHANGE_OPTIONS[a],w,p,{channel}));
const FORMULAS=['xᴮ = B⁻¹b y z = cᴮB⁻¹b','rⱼ = cᴮB⁻¹aⱼ − cⱼ','yⱼ = B⁻¹aⱼ y rⱼ','Invertibilidad de B y recalcular la tabla'];
[
['F01',MODEL_P,'Solo cambia b; B y c se mantienen.','Se actualiza b a (3, 10).',0,'Revisar xᴮ permite comprobar factibilidad; z también se actualiza. Los costos reducidos no dependen de b.',30,'b'],
['F02',MODEL_Q,'Solo cambia c₁ de una variable no básica.','x₁ = 0; B y cᴮ no cambian.',1,'Se recalcula el costo reducido de esa variable. xᴮ no cambia.',31,'c'],
['F03',MODEL_Q,'Cambia la columna no básica a₁.','B se mantiene; a₁ = (10, 1).',2,'Actualizar la columna transformada y su costo reducido; no sustituir B si la columna no es básica.',34,'A'],
['F04',MODEL_P,'Cambia una columna básica de A.','La nueva matriz B debe comprobarse antes de usar su inversa.',3,'Puede cambiar B⁻¹ o no existir. Primero revisar que B siga siendo base.',35,'A']
].forEach(([id,m,ch,ma,a,w,p,channel])=>add(id,3,'Instrumentos de revisión',m,ch,ma,FORMULAS,FORMULAS[a],w,p,{channel}));
// Datos calculados en el orden de base indicado; r incluye todas las no básicas.
const CASES=[
{id:'D01',model:MODEL_P,change:'El primer recurso se reduce de 15 a 3.',xb:[-15/19,44/19],r:[5/19,16/19],text:'xᴮ = (−15/19, 44/19)\nr(x₃,x₄) = (5/19, 16/19)',why:'La componente negativa hace no factible esta base; ambos costos reducidos siguen no negativos.',page:30,channel:'b'},
{id:'D02',model:MODEL_Q,change:'La utilidad de x₁ sube de 3 a 10.',xb:[4,9],r:[-2.5,2.5],text:'xᴮ = (4, 9)\nr(x₁,x₄) = (−5/2, 5/2)',why:'La base sigue factible. r₁ < 0 incumple la condición de optimalidad para maximizar.',page:32,channel:'c'},
{id:'D03',model:MODEL_P,change:'El primer recurso aumenta de 15 a 16.',xb:[50/19,18/19],r:[5/19,16/19],text:'xᴮ = (50/19, 18/19)\nr(x₃,x₄) = (5/19, 16/19)',why:'Todas las componentes básicas y todos los costos reducidos son no negativos: no hay pérdida.',page:30,channel:'b'},
{id:'D04',model:MODEL_Q,change:'La utilidad de x₁ sube de 3 a 7.',xb:[4,9],r:[.5,2.5],text:'xᴮ = (4, 9)\nr(x₁,x₄) = (1/2, 5/2)',why:'Cambió c pero se conserva la condición de optimalidad y también la factibilidad.',page:31,channel:'c'},
{id:'D05',model:'max z = x₁ + x₂\nx₁ + x₂ ≤ 2\nx₂ ≤ 1; x ≥ 0',change:'La columna básica a₁ pasa de (1, 0) a (−1, 0).',xb:[-2,1],r:[-2,-1],text:'Base (x₁,s₂): B nueva = diag(−1,1)\nxᴮ = (−2,1); r(x₂,s₁) = (−2,−1)',why:'La nueva B es invertible, pero xᴮ tiene un negativo y los costos reducidos incumplen optimalidad: ambas condiciones se pierden.',page:35,channel:'A'},
{id:'D06',model:MODEL_Q,change:'Se agrega x₅ con a₅ = (1,2) y c₅ = 7.',xb:[4,9],r:[4.5,2.5,-2],text:'x₅ = 0; xᴮ = (4,9)\nr(x₁,x₄,x₅) = (9/2,5/2,−2)',why:'La solución extendida con x₅ = 0 sigue factible, pero el nuevo costo reducido es negativo.',page:40,channel:'A'}
];
CASES.forEach(c=>{let f=c.xb.every(v=>v>=0),o=c.r.every(v=>v>=0);add(c.id,4,'Diagnóstico de la base',c.model,c.change,c.text,DIAG_OPTIONS,!f&&!o?'AMBAS':!f?'FACTIBILIDAD':!o?'OPTIMALIDAD':'SIN PÉRDIDA',c.why,c.page,{...c,feasible:f,optimal:o});});
[
['M01',CASES[0],0,'La fila de x₂ tiene coeficiente −3/19 en x₄: existe candidato de entrada.','Conserva r ≥ 0 y pierde factibilidad. Dual simplex es apropiado para intentar recuperar factibilidad.',25],
['M02',CASES[1],1,'La columna x₁ tiene entradas (1, 3/2), con candidatos para razón primal.','La base es factible y pierde la condición de optimalidad: continuar con simplex primal.',32],
['M03',CASES[2],2,'B no cambia y sigue invertible.','Ambas condiciones se conservan. No se requiere pivotear para mantener esta base óptima.',30],
['M04',CASES[4],3,'El resumen del GYM propone recuperar una base factible con variables artificiales.','No se cumplen las condiciones de inicio del dual simplex. El GYM trata ambas pérdidas con M grande.',43]
].forEach(([id,c,a,n,w,p])=>add(id,5,'Procedimiento',c.model,c.change,c.text+'\n'+n,ACTION_OPTIONS,ACTION_OPTIONS[a],w,p,{channel:c.channel,feasible:c.xb.every(v=>v>=0),optimal:c.r.every(v=>v>=0)}));
add('I01',6,'Mini caso integrador',MODEL_P,'Se añade x₂ ≤ 1. ¿Qué conviene considerar?', 'x₂ actual = 45/19 > 1\nNueva holgura = −26/19\nr(x₃,x₄,s nueva) = (5/19,16/19,0)\nFila nueva: coeficiente de x₃ = −5/19.',ACTION_OPTIONS,ACTION_OPTIONS[0],'La solución actual viola la nueva restricción; al canonizar, se mantiene r ≥ 0 y aparece holgura negativa con candidato. Considerar dual simplex.',42,{channel:'b',feasible:false,optimal:true});
add('I02',6,'Mini caso integrador',MODEL_Q,'Una columna básica cambia y B nueva = [[0,0],[1,1]]. ¿Qué revisar primero?', 'det(B nueva) = 0; no existe B nueva⁻¹.\nNo se pueden calcular xᴮ ni r con esa inversa.', ['Reconstruir una base independiente','Usar la inversa anterior sin ajustes','Declarar el modelo infactible','Declarar ambas condiciones conservadas'],'Reconstruir una base independiente','Las columnas son dependientes: ya no forman base. Esto no demuestra infactibilidad del modelo. El GYM propone reconstrucción con artificiales y M grande.',35,{channel:'A'});
function shuffled(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function makeSession(rng=Math.random){return [1,2,3,4,5,6].map(stage=>shuffled(BANK.filter(s=>s.stage===stage),rng)[0]);}
if(typeof module!=='undefined')module.exports={BANK,CASES,makeSession};
