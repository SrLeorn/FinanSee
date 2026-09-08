/* ========================================================= JAVASCRIPT — COMPETÊNCIAS / PAGAMENTOS / PENDÊNCIAS ========================================================= */
function changeReferenceMonth(delta){view=new Date(view.getFullYear(),view.getMonth()+delta,1,12);renderAll()}
function goCurrentMonth(){const t=new Date();view=new Date(t.getFullYear(),t.getMonth(),1,12);renderAll()}
function statusRecord(eid,key=selectedMonthKey()){return data.expenseStatus?.[eid]?.[key]||null}
function dueDateForMonth(e,key=selectedMonthKey()){if(expMonth(e,key)<=0)return null;const [y,m]=key.split('-').map(Number),base=new Date((e.due||e.date||`${key}-01`)+'T12:00:00');const day=Math.min(new Date(y,m,0).getDate(),Math.max(1,base.getDate()));return new Date(y,m-1,day,12)}
function expenseState(e,key=selectedMonthKey()){
  if(expMonth(e,key)<=0)return'inactive';const rec=statusRecord(e.id,key);if(rec?.status==='paid')return'paid';const due=dueDateForMonth(e,key);const now=new Date();now.setHours(12,0,0,0);if(due&&due<now&&key<=mkey(now))return'overdue';return'pending';
}
function setExpensePaid(eid,key=selectedMonthKey(),paid=true){data.expenseStatus[eid]=data.expenseStatus[eid]||{};if(paid)data.expenseStatus[eid][key]={status:'paid',paidAt:new Date().toISOString()};else delete data.expenseStatus[eid][key];const e=data.expenses.find(x=>x.id===eid);if(e)logActivity('expense',paid?'Conta paga':'Pagamento desmarcado',`${e.name} · ${monthLabel(key)}`,expMonth(e,key));save()}
function expenseTrackingStart(e){return e.trackingStartKey||data.profile.trackingStartKey||mkey(new Date())}
function priorMonthKeys(from,toExclusive){const out=[];let k=from,guard=0;while(k<toExclusive&&guard++<120){out.push(k);k=addMonthsKey(k,1)}return out}
function arrearsEntries(key=selectedMonthKey()){
  const out=[];for(const e of data.expenses){const start=[expenseTrackingStart(e),String(e.due||e.date||'').slice(0,7)].sort().reverse()[0]||key;for(const k of priorMonthKeys(start,key)){const amount=expMonth(e,k);if(amount>0&&expenseState(e,k)!=='paid')out.push({e,key:k,amount,state:expenseState(e,k)})}}return out;
}
function arrearsTotal(key=selectedMonthKey()){return arrearsEntries(key).reduce((s,x)=>s+x.amount,0)}
function monthlyExpenseStats(key=selectedMonthKey()){let expected=0,paid=0,pending=0;for(const e of data.expenses){const amount=expMonth(e,key);if(!amount)continue;expected+=amount;if(expenseState(e,key)==='paid')paid+=amount;else pending+=amount}return{expected,paid,pending,arrears:arrearsTotal(key)}}
function syncReferenceUI(){const label=monthLabel();const el=document.getElementById('referenceMonthLabel');if(el)el.textContent=label;const mt=document.getElementById('monthText');if(mt)mt.textContent='Competência: '+label}
