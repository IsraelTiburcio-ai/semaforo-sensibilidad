const assert=require('node:assert/strict');
const {BANK,CASES,makeSession}=require('./data.js');
assert.equal(BANK.length,24);assert.equal(new Set(BANK.map(s=>s.id)).size,24);
for(const s of BANK){for(const k of ['id','theme','original','change','math','answer','why','difficulty','page'])assert.ok(s[k]);assert.ok(s.options.includes(s.answer));assert.equal(new Set(s.options).size,s.options.length);}
for(let i=0;i<100;i++)assert.deepEqual(makeSession().map(s=>s.stage),[1,2,3,4,5,6]);
const invP=[[5/19,-3/19],[-2/19,5/19]];
const mv=(a,b)=>a.map(row=>row.reduce((v,x,i)=>v+x*b[i],0));
const near=(a,b)=>a.forEach((v,i)=>assert.ok(Math.abs(v-b[i])<1e-10));
near(mv(invP,[3,10]),CASES[0].xb);near(mv(invP,[16,10]),CASES[2].xb);
near([3*5/19+5*(-2/19),3*(-3/19)+5*5/19],CASES[0].r);
assert.equal(7.5-10,CASES[1].r[0]);assert.equal(7.5-7,CASES[3].r[0]);assert.equal(5-7,CASES[5].r[2]);
near(mv([[-1,0],[0,1]],[2,1]),CASES[4].xb);near([-1*1-1,-1*1],CASES[4].r);
console.log('PASS: 24 escenarios, 100 selecciones, fórmulas y diagnósticos.');
