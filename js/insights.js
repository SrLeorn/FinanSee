/* ========================================================= JAVASCRIPT — INSIGHTS V7 / ORÇAMENTOS / RECORRÊNCIAS / HISTÓRICO ========================================================= */
const BUDGET_CATEGORIES=['Moradia','Alimentação','Transporte','Saúde','Assinaturas','Lazer','Compras','Educação','Dívidas','Outros'];
function daysUntilNextPay(){
  if(!data.incomeSources.length)return null;
  const today=new Date();today.setHours(12,0,0,0);
  const days=data.incomeSources.map(r=>Math.min(31,Math.max(1,Number(r.payDay)||5)));
  const candidates=[];
  for(const d of days){let dt=new Date(today.getFullYear(),today.getMonth(),d,12);if(dt<today)dt=new Date(today.getFullYear(),today.getMonth()+1,d,12);candidates.push(dt)}
  const next=new Date(Math.min(...candidates.map(x=>x.getTime())));return {days:Math.max(1,Math.ceil((next-today)/86400000)),date:next};
}
function categorySpend(category,key=mkey()){return data.expenses.reduce((s,e)=>s+(e.category===category?expMonth(e,key):0),0)}
function renderSmartInsights(){
  const inc=incomeTotal(),ex=expenseTotal(),available=inc-ex,next=daysUntilNextPay();
  const safe=document.getElementById('dailySafe'),hint=document.getElementById('dailySafeHint');
  if(safe&&hint){if(!next||inc<=0){safe.textContent='—';hint.textContent='Cadastre uma renda para calcular.'}else{safe.textContent=money(Math.max(0,available)/next.days);hint.textContent=`Referência para os próximos ${next.days} dia(s), até ${next.date.toLocaleDateString('pt-BR')}. Não é uma recomendação de investimento.`}}
  const pi=document.getElementById('projIncome'),pe=document.getElementById('projExpenses'),pb=document.getElementById('projBalance');if(pi)pi.textContent=money(inc);if(pe)pe.textContent=money(ex);if(pb){pb.textContent=money(available);pb.className=available<0?'bad':'ok'}
  renderBudgetOverview();renderRecurringUpcoming();renderActivityTimeline();
}
function openBudgetModal(){renderBudgetEditor();openM('budget')}
function renderBudgetEditor(){const el=document.getElementById('budgetEditor');if(!el)return;const budgets=data.profile.budgets||{};el.innerHTML=BUDGET_CATEGORIES.map(cat=>`<div class="budget-edit-row"><div><b>${esc(cat)}</b><small>Gasto atual: ${money(categorySpend(cat))}</small></div><input inputmode="decimal" data-budget-cat="${esc(cat)}" value="${budgets[cat]?money(budgets[cat]):''}" placeholder="Sem limite"></div>`).join('')}
function saveBudgets(){const next={};document.querySelectorAll('[data-budget-cat]').forEach(input=>{const value=n(input.value);if(value>0)next[input.dataset.budgetCat]=value});data.profile.budgets=next;logActivity('budget','Limites mensais atualizados',`${Object.keys(next).length} categoria(s)`);save();closeM('budget');toast('✓ Limites atualizados')}
function renderBudgetOverview(){const el=document.getElementById('budgetOverview');if(!el)return;const budgets=data.profile.budgets||{},entries=Object.entries(budgets).filter(([,v])=>n(v)>0);if(!entries.length){el.innerHTML='<div class="empty-state compact-empty"><h3>Sem limites definidos</h3><p>Defina um teto mensal para alimentação, lazer, transporte e outras categorias.</p><button class="btn sm primary" onclick="openBudgetModal()">Criar limites</button></div>';return}el.innerHTML=entries.map(([cat,limit])=>{const used=categorySpend(cat),pct=Math.min(140,limit?used/limit*100:0),state=used>limit?'over':pct>=85?'near':'good';return `<div class="budget-row ${state}"><div class="budget-head"><span><b>${esc(cat)}</b><small>${money(used)} de ${money(limit)}</small></span><b>${Math.round(pct)}%</b></div><div class="progress budget-progress"><span style="width:${Math.min(100,pct)}%"></span></div>${state==='over'?'<small class="bad">Limite ultrapassado</small>':state==='near'?'<small class="warn">Próximo do limite</small>':''}</div>`}).join('')}
function expenseStartDate(e){return new Date((e.due||e.date||new Date().toISOString().slice(0,10))+'T12:00:00')}
function installmentNumber(e,now=new Date()){if(!(e.type==='installment'||e.responsibility==='shared'||e.type==='subscription'))return null;const start=expenseStartDate(e);const months=(now.getFullYear()-start.getFullYear())*12+now.getMonth()-start.getMonth();const total=Number(e.debtParts||e.parts||1);const current=Math.min(total,Math.max(1,months+1));return {current,total,pct:Math.min(100,current/Math.max(1,total)*100)}}
function nextOccurrence(e,base=new Date()){
  const start=expenseStartDate(e);base=new Date(base);base.setHours(12,0,0,0);
  if(e.type==='single'){return start>=base?start:null}
  const active=expMonth(e,mkey(base))>0||expMonth(e,mkey(new Date(base.getFullYear(),base.getMonth()+1,1)))>0;if(!active&&start<base)return null;
  const day=Math.min(28,start.getDate());let candidate=new Date(base.getFullYear(),base.getMonth(),day,12);if(candidate<base)candidate=new Date(base.getFullYear(),base.getMonth()+1,day,12);
  const prog=installmentNumber(e,candidate);if(prog&&prog.current>prog.total)return null;return candidate;
}
function recurringEntries(limit=6){return data.expenses.filter(e=>e.type!=='single').map(e=>({e,date:nextOccurrence(e)})).filter(x=>x.date).sort((a,b)=>a.date-b.date).slice(0,limit)}
function renderRecurringUpcoming(){const el=document.getElementById('recurringUpcoming');if(!el)return;const list=recurringEntries(6);if(!list.length){el.innerHTML='<div class="empty-state compact-empty"><h3>Nenhuma cobrança próxima</h3><p>Gastos mensais e parcelados aparecem aqui automaticamente.</p></div>';return}el.innerHTML=list.map(({e,date})=>{const prog=installmentNumber(e,date),amt=expMonth(e,mkey(date));return `<div class="recurrence-row"><div><b>${esc(e.name)}</b><small>${date.toLocaleDateString('pt-BR')}${prog?` · ${prog.current}/${prog.total}`:''}</small>${prog?`<div class="progress mini-progress"><span style="width:${prog.pct}%"></span></div>`:''}</div><b>${money(amt)}</b></div>`}).join('')}
function activityLabel(type){return ({expense:'Gasto',income:'Renda',goal:'Meta',vault:'Cofre',budget:'Orçamento',backup:'Backup',profile:'Perfil',setup:'Configuração'})[type]||'Atividade'}
function renderActivityTimeline(){const el=document.getElementById('activityTimeline');if(!el)return;const list=(data.activity||[]).slice(0,8);if(!list.length){el.innerHTML='<div class="empty-state compact-empty"><h3>Seu histórico começa aqui</h3><p>Novos gastos, rendas, metas, cofres e alterações importantes serão registrados.</p></div>';return}el.innerHTML=list.map(a=>{const dt=new Date(a.date),when=Number.isNaN(dt.getTime())?'':dt.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});return `<div class="activity-row"><div class="activity-dot"></div><div><small>${activityLabel(a.type)} · ${when}</small><b>${esc(a.title)}</b>${a.detail?`<span>${esc(a.detail)}</span>`:''}</div>${a.amount!=null?`<strong>${money(a.amount)}</strong>`:''}</div>`}).join('')}
function budgetAlerts(){const budgets=data.profile.budgets||{},out=[];Object.entries(budgets).forEach(([cat,limit])=>{const used=categorySpend(cat),pct=limit?used/limit*100:0;if(pct>=100)out.push(`🔴 ${cat} — limite ultrapassado (${Math.round(pct)}%)`);else if(pct>=85)out.push(`🟡 ${cat} — ${Math.round(pct)}% do limite usado`)});return out}

const renderDashV7Base=renderDash;
renderDash=function(){renderDashV7Base();renderSmartInsights()};
const renderAlertsV7Base=renderAlerts;
renderAlerts=function(){renderAlertsV7Base();const extra=budgetAlerts();if(extra.length&&document.getElementById('alertsList'))document.getElementById('alertsList').insertAdjacentHTML('beforeend',extra.map(x=>`<div class="alert">${esc(x)}</div>`).join(''))};

/* ========================================================= JAVASCRIPT — AJUSTES V8 DO DASHBOARD ========================================================= */
const renderSmartInsightsV8Base=renderSmartInsights;
renderSmartInsights=function(){
  renderSmartInsightsV8Base();
  const key=selectedMonthKey(),inc=incomeTotal(key),ex=expenseTotal(key),arrears=arrearsTotal(key),available=inc-ex-arrears,next=daysUntilNextPay();
  if(document.getElementById('dArrears'))dArrears.textContent=money(arrears);
  const recTotal=incomeReceivedTotal(key),expectedTotal=incomeExpectedTotal();if(document.getElementById('dIncomeSub'))dIncomeSub.textContent=recTotal>0?(recTotal>=expectedTotal?'valor recebido na competência':'parcial recebido · restante em previsão'):'previsão · recebido ainda não informado';
  if(document.getElementById('dAvail')){dAvail.textContent=money(available);dAvail.className='value '+(available<0?'bad':'ok')}
  if(document.getElementById('projIncome'))projIncome.textContent=money(inc);
  if(document.getElementById('projExpenses'))projExpenses.textContent=money(ex+arrears);
  if(document.getElementById('projBalance')){projBalance.textContent=money(available);projBalance.className=available<0?'bad':'ok'}
  if(document.getElementById('dailySafe')&&document.getElementById('dailySafeHint')){if(!next||inc<=0){dailySafe.textContent='—';dailySafeHint.textContent='Cadastre uma renda para calcular.'}else{dailySafe.textContent=money(Math.max(0,available)/next.days);dailySafeHint.textContent=`Referência após compromissos e pendências, para os próximos ${next.days} dia(s).`}}
  if(typeof renderVa==='function')renderVa();
};
