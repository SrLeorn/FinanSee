/* ========================================================= JAVASCRIPT — CÁLCULOS / COMPETÊNCIA ========================================================= */
const INSS=[[1621,.075],[2902.84,.09],[4354.27,.12],[8475.55,.14]];
function inss(base){let t=0,p=0;for(const [lim,r] of INSS){if(base>p)t+=(Math.min(base,lim)-p)*r;if(base<=lim)break;p=lim}return t}
function calc(r){let base=n(r.monthly)||n(r.daily)*Number(r.days||22);let ins=0;if(r.ins==='manual')ins=n(r.insManual);else{let b=r.insBase==='manual'?n(r.baseManual):r.insBase==='minimum'?1621:n(r.monthly);ins=b*(Number(r.ins||0)/100)}let gross=base+ins,ii=inss(gross),tax=Math.max(0,gross-ii),ir=tax>5000?Math.max(0,tax*.275-908.73):tax>4664.68?Math.max(0,tax*.225-675.49):tax>3751.05?Math.max(0,tax*.15-394.16):tax>2826.65?Math.max(0,tax*.075-182.16):0;let vtCost=n(r.vt)*Number(r.trips||2)*Number(r.days||22),vtDisc=Math.min(base*.06,vtCost);let estimatedNet=n(r.estimatedNet)>0?n(r.estimatedNet):(n(r.netReal)>0?n(r.netReal):gross-ii-ir-vtDisc);return{gross,ins,inss:ii,irrf:ir,estimatedNet,net:estimatedNet,va:n(r.va)*Number(r.days||22),vtCost,vtDisc}}
function mkey(d=new Date()){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function selectedMonthKey(){return mkey(view)}
function monthLabel(key=selectedMonthKey()){const [y,m]=key.split('-').map(Number);return new Date(y,m-1,1,12).toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}
function addMonthsKey(key,months){const [y,m]=key.split('-').map(Number);const d=new Date(y,m-1+Number(months||0),1,12);return mkey(d)}
function incomeRecord(r,key=selectedMonthKey()){return r.monthlyRecords?.[key]||null}
function incomeExpected(r){return n(r.estimatedNet)>0?n(r.estimatedNet):calc(r).estimatedNet}
function incomeValueForMonth(r,key=selectedMonthKey()){const rec=incomeRecord(r,key);return rec&&n(rec.received)>0?n(rec.received):incomeExpected(r)}
function incomeReceivedTotal(key=selectedMonthKey()){return data.incomeSources.reduce((s,r)=>s+n(incomeRecord(r,key)?.received),0)}
function incomeExpectedTotal(){return data.incomeSources.reduce((s,r)=>s+incomeExpected(r),0)}
function incomeTotal(key=selectedMonthKey()){return data.incomeSources.reduce((s,r)=>s+incomeValueForMonth(r,key),0)}
function expMonth(e,key=selectedMonthKey()){
  const start=String(e.due||e.date||'').slice(0,7);if(!start||key<start)return 0;
  if(e.responsibility==='shared')return key<addMonthsKey(start,Number(e.debtParts||e.parts||1))?n(e.myShare):0;
  if(e.type==='single')return String(e.date||e.due).slice(0,7)===key?n(e.value):0;
  if(e.type==='indefinite')return n(e.value);
  if(e.type==='subscription'){const parts=Number(e.parts||1);return key<addMonthsKey(start,parts)?n(e.value):0}
  if(e.type==='installment'){const [sy,sm]=start.split('-').map(Number),[ky,km]=key.split('-').map(Number),delta=(ky-sy)*12+(km-sm);return delta>=0&&delta<Number(e.parts||1)?n(e.value)/Math.max(1,Number(e.parts||1)):0}
  return 0;
}
function expenseTotal(key=selectedMonthKey()){return data.expenses.reduce((s,e)=>s+expMonth(e,key),0)}
