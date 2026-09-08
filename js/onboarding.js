/* ========================================================= JAVASCRIPT — PRIMEIROS PASSOS / ONBOARDING ========================================================= */
function onboardingNeeded(){
  if(!currentUserId())return false;
  return !data?.profile?.onboardingCompleted;
}
function onboardingCurrentStep(){return Math.min(4,Math.max(1,Number(data?.profile?.onboardingStep)||1))}
function showOnboarding(step=onboardingCurrentStep()){
  if(!currentUserId())return;
  document.body.classList.remove('security-checking');
  document.body.classList.add('onboarding-active');
  document.getElementById('onboardingScreen')?.classList.add('show');
  onboardingGoStep(step,false);
}
function hideOnboarding(){
  document.body.classList.remove('onboarding-active');
  document.getElementById('onboardingScreen')?.classList.remove('show');
}
function onboardingGoStep(step,persist=true){
  step=Math.min(4,Math.max(1,Number(step)||1));
  if(step>1 && !data.incomeSources.length){toast('Cadastre sua renda antes de continuar.',true);step=1}
  if(persist){data.profile.onboardingStep=step;saveRawOnly()}
  document.querySelectorAll('[data-ob-step]').forEach(el=>el.classList.toggle('active',Number(el.dataset.obStep)===step));
  document.querySelectorAll('[data-ob-dot]').forEach(el=>{const n=Number(el.dataset.obDot);el.classList.toggle('active',n===step);el.classList.toggle('done',n<step)});
  updateOnboardingCounts();
  document.getElementById('onboardingScreen')?.scrollTo({top:0,behavior:'smooth'});
}
function saveRawOnly(){const key=userDataKey();if(key)localStorage.setItem(key,JSON.stringify(data))}
function onboardingSaveIncome(){
  const title=String(document.getElementById('obIncomeTitle')?.value||'').trim();
  const net=n(document.getElementById('obIncomeNet')?.value);
  const company=String(document.getElementById('obIncomeCompany')?.value||'').trim();
  const payDay=Math.min(31,Math.max(1,Number(document.getElementById('obIncomePayDay')?.value)||5));
  if(!title||net<=0)return toast('Informe o nome da renda e o valor líquido mensal.',true);
  if(!data.incomeSources.length)data.incomeSources.push({id:id(),mode:'simple',title,type:'salary',company,monthly:0,netReal:net,estimatedNet:net,monthlyRecords:{},daily:0,days:22,ins:'0',insBase:'salary',baseManual:0,insManual:0,close:Number(data.profile?.closeDay)||22,payDay,vaDay:0,vtDay:0,va:0,vt:0,trips:2});
  data.profile.onboardingStep=2;saveRawOnly();toast('✓ Renda adicionada');onboardingGoStep(2,false);
}
function onboardingAddExpense(){
  const name=String(document.getElementById('obExpenseName')?.value||'').trim();
  const value=n(document.getElementById('obExpenseValue')?.value);
  const category=document.getElementById('obExpenseCategory')?.value||'Outros';
  const type=document.getElementById('obExpenseType')?.value||'indefinite';
  const due=document.getElementById('obExpenseDue')?.value||new Date().toISOString().slice(0,10);
  if(!name||value<=0)return toast('Informe o gasto e o valor.',true);
  const item={id:id(),name,category,value,type,method:'Não informado',date:new Date().toISOString().slice(0,10),due,responsibility:'mine',trackingStartKey:selectedMonthKey()};
  if(type==='indefinite')item.parts=1;
  data.expenses.push(item);saveRawOnly();
  document.getElementById('obExpenseName').value='';document.getElementById('obExpenseValue').value='';
  updateOnboardingCounts();toast('✓ Gasto adicionado');
}
function onboardingAddGoal(){
  const name=String(document.getElementById('obGoalName')?.value||'').trim();
  const target=n(document.getElementById('obGoalTarget')?.value),saved=n(document.getElementById('obGoalSaved')?.value);
  if(!name||target<=0)return toast('Informe o nome e o valor da meta.',true);
  data.goals.push({id:id(),name,target,saved,monthly:0,date:''});saveRawOnly();
  ['obGoalName','obGoalTarget','obGoalSaved'].forEach(x=>document.getElementById(x).value='');updateOnboardingCounts();toast('✓ Meta adicionada');
}
function onboardingAddVault(){
  const name=String(document.getElementById('obVaultName')?.value||'').trim();
  const category=document.getElementById('obVaultCategory')?.value||'Outros',initial=n(document.getElementById('obVaultInitial')?.value);
  if(!name)return toast('Informe o nome do cofre.',true);
  const v={id:id(),name,category,transactions:[]};if(initial>0)v.transactions.push({id:id(),type:'deposit',amount:initial,desc:'Saldo inicial',date:new Date().toISOString().slice(0,10)});data.vaults.push(v);saveRawOnly();
  document.getElementById('obVaultName').value='';document.getElementById('obVaultInitial').value='';updateOnboardingCounts();toast('✓ Cofre adicionado');
}
function updateOnboardingCounts(){
  const map=[['obExpenseCount',data.expenses.length,data.expenses.length===1?'1 gasto adicionado.':`${data.expenses.length} gastos adicionados.`],['obGoalCount',data.goals.length,data.goals.length===1?'1 meta adicionada.':`${data.goals.length} metas adicionadas.`],['obVaultCount',data.vaults.length,data.vaults.length===1?'1 cofre adicionado.':`${data.vaults.length} cofres adicionados.`]];
  map.forEach(([id,count,text])=>{const el=document.getElementById(id);if(el)el.textContent=count?text:(id==='obExpenseCount'?'Nenhum gasto adicionado ainda.':id==='obGoalCount'?'Nenhuma meta adicionada.':'Nenhum cofre adicionado.')});
}
function completeOnboarding(){
  if(!data.incomeSources.length)return onboardingGoStep(1);
  data.profile.onboardingCompleted=true;data.profile.onboardingStep=4;logActivity('setup','Configuração inicial concluída');saveRawOnly();hideOnboarding();renderAll();go('dashboard');toast('✓ Tudo pronto. Bem-vindo ao FinanSee!');
}
function importOnboardingBackup(event){
  const f=event.target.files?.[0];if(!f)return;
  const r=new FileReader();r.onload=()=>{try{const imported=JSON.parse(r.result);data=normalizeData(imported);if(!data.incomeSources.length){data.profile.onboardingCompleted=false;data.profile.onboardingStep=1;saveRawOnly();toast('Backup importado, mas ele não possui renda. Cadastre uma renda para continuar.',true);onboardingGoStep(1,false);return}data.profile.onboardingCompleted=true;data.profile.onboardingStep=4;logActivity('setup','Configuração inicial concluída');saveRawOnly();hideOnboarding();renderAll();go('dashboard');toast('✓ Backup importado. Bem-vindo de volta!')}catch(e){toast('Backup JSON inválido',true)}finally{event.target.value=''}};r.readAsText(f);
}
