/* ========================================================= JAVASCRIPT — NAVEGAÇÃO / ÍCONES / MENU DO PERFIL ========================================================= */
const pages=[
  ['dashboard','home','Início'],['expenses','wallet','Gastos'],['income','income','Rendas'],
  ['calendar','calendar','Calendário'],['alerts','bell','Alertas'],['planning','target','Metas'],
  ['vaults','vault','Cofre'],['food','food','Vale Alimentação'],['purchase','cart','Comprar'],['reports','chart','Relatórios'],['settings','gear','Config.']
];
const morePages=['income','calendar','alerts','vaults','food','purchase','reports','settings'];
const ICONS={
  home:'<path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  wallet:'<path d="M4 6h14a2 2 0 0 1 2 2v11H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h11"/><path d="M15 11h6v5h-6a2.5 2.5 0 0 1 0-5Z"/>',
  income:'<path d="M12 3v14"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2V0M22 12h2"/>',
  vault:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M12 9V7M12 17v-2M9 12H7M17 12h-2"/>',
  food:'<path d="M7 3h10v4a5 5 0 0 1-10 0V3Z"/><path d="M5 21h14M9 12v9M15 12v9"/>',
  cart:'<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2H10V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  plus:'<path d="M12 5v14M5 12h14"/>'
};
function iconSvg(name,cls='app-icon'){return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.home}</svg>`}
function nav(){
  const side=document.getElementById('nav'),bottom=document.getElementById('bottom');
  side.innerHTML=pages.map(p=>`<button data-page="${p[0]}"><span class="nav-icon">${iconSvg(p[1])}</span><span>${p[2]}</span></button>`).join('');
  bottom.innerHTML=`
    <button class="bottom-nav-btn" data-page="dashboard">${iconSvg('home')}<small>Início</small></button>
    <button class="bottom-nav-btn" data-page="expenses">${iconSvg('wallet')}<small>Gastos</small></button>
    <button class="bottom-plus" type="button" onclick="toggleQuickSheet()" aria-label="Adicionar"><span class="plus-disc">${iconSvg('plus')}</span><small>Novo</small></button>
    <button class="bottom-nav-btn" data-page="planning">${iconSvg('target')}<small>Metas</small></button>
    <button class="bottom-nav-btn" id="moreNavBtn" type="button" onclick="toggleMoreSheet()">${iconSvg('menu')}<small>Mais</small></button>`;
  document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>go(b.dataset.page));buildMoreSheet();
}
function buildMoreSheet(){const el=document.getElementById('moreSheetItems');if(!el)return;el.innerHTML=morePages.map(id=>{const p=pages.find(x=>x[0]===id);return `<button class="sheet-item" data-sheet-page="${p[0]}"><span class="sheet-icon">${iconSvg(p[1])}</span><div><b>${p[2]}</b><small>${sheetHint(p[0])}</small></div></button>`}).join('');el.querySelectorAll('[data-sheet-page]').forEach(b=>b.onclick=()=>go(b.dataset.sheetPage))}
function sheetHint(id){return ({income:'Fontes de renda e salário',calendar:'Vencimentos do mês',alerts:'Avisos e limites',vaults:'Dinheiro guardado separado',food:'Saldo e gastos do Vale Alimentação',purchase:'Simular uma compra',reports:'Resumo dos próximos meses',settings:'Conta, segurança e backup'})[id]||''}
function go(p){if(document.body.classList.contains('onboarding-active'))return;document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===p));document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===p));const more=document.getElementById('moreNavBtn');if(more)more.classList.toggle('active',morePages.includes(p));document.getElementById('title').textContent=pages.find(x=>x[0]===p)?.[2]||'FinanSee';closeSheets();closeProfileMenu();renderAll();window.scrollTo({top:0,behavior:'smooth'})}
function toggleMoreSheet(){const open=!document.getElementById('moreSheet').classList.contains('show');closeSheets();if(open)openSheet('moreSheet')}
function toggleQuickSheet(){const open=!document.getElementById('quickSheet').classList.contains('show');closeSheets();if(open)openSheet('quickSheet')}
function openSheet(id){document.getElementById(id)?.classList.add('show');document.getElementById('sheetBackdrop')?.classList.add('show')}
function closeSheets(){document.querySelectorAll('.mobile-sheet').forEach(x=>x.classList.remove('show'));document.getElementById('sheetBackdrop')?.classList.remove('show')}
function quickExpense(){closeSheets();resetExpenseForm();openM('expense')}function quickIncome(){closeSheets();openIncomeModal()}function quickGoal(){closeSheets();go('planning');openM('goal')}function quickVault(){closeSheets();go('vaults');openM('vault')}function quickPurchase(){closeSheets();go('purchase')}
function toggleProfileMenu(ev){ev?.stopPropagation();const menu=document.getElementById('profileMenu'),btn=document.getElementById('accountMenuBtn');const open=!menu?.classList.contains('show');closeProfileMenu();if(open){menu?.classList.add('show');btn?.setAttribute('aria-expanded','true')}}
function closeProfileMenu(){document.getElementById('profileMenu')?.classList.remove('show');document.getElementById('accountMenuBtn')?.setAttribute('aria-expanded','false')}
function openSettingsCard(id){closeProfileMenu();go('settings');setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'center'}),120)}
document.addEventListener('click',e=>{if(!e.target.closest?.('#profileMenu')&&!e.target.closest?.('#accountMenuBtn'))closeProfileMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProfileMenu()});
