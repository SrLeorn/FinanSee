/* ========================================================= JAVASCRIPT — RENDERIZAÇÃO GERAL / INICIALIZAÇÃO ========================================================= */
function renderAll(){if(!currentUserId())return;syncReferenceUI();renderDash();renderExpenses();renderIncome();renderGoals();renderCalendar();renderAlerts();renderReports();renderCfg();renderVaults();if(typeof renderVa==='function')renderVa();paymentUI();renderAccountSettings()}
nav();applyStoredTheme();const authenticated=initializeAuth();if(authenticated){load();renderAll();if(typeof onboardingNeeded==='function'&&onboardingNeeded()){showOnboarding()}else{initializeSecurityGate()}}else{document.body.classList.remove('security-checking')}registerServiceWorker();
window.addEventListener('load',()=>{setTimeout(()=>{renderInstallIntro?.();if(currentUserId()){renderAll();renderPwaStatus();renderSecuritySettings();renderAccountSettings()}},80)});
eDate.value=new Date().toISOString().slice(0,10);eDue.value=eDate.value;
