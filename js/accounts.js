/* ========================================================= JAVASCRIPT — CONTAS / LOGIN LOCAL ========================================================= */
const USERS_KEY='finansee_users_v1';
const SESSION_KEY='finansee_active_user_v1';
let currentUser=null;

function authBytesToB64(bytes){return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function authB64ToBytes(s){s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';return Uint8Array.from(atob(s),c=>c.charCodeAt(0))}
function authRandomB64(size=16){const b=new Uint8Array(size);crypto.getRandomValues(b);return authBytesToB64(b)}
async function authDerive(secret,saltB64,iterations=180000){
  if(!window.crypto?.subtle)throw new Error('Este navegador não oferece Web Crypto.');
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:authB64ToBytes(saltB64),iterations,hash:'SHA-256'},key,256);
  return authBytesToB64(bits);
}
function authEqual(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let r=0;for(let i=0;i<a.length;i++)r|=a.charCodeAt(i)^b.charCodeAt(i);return r===0}
function getUsers(){try{const u=JSON.parse(localStorage.getItem(USERS_KEY)||'[]');return Array.isArray(u)?u:[]}catch{return []}}
function setUsers(users){localStorage.setItem(USERS_KEY,JSON.stringify(users))}
function normalizeEmail(email){return String(email||'').trim().toLowerCase()}
function currentUserId(){return currentUser?.id||sessionStorage.getItem(SESSION_KEY)||''}
function userDataKey(uid=currentUserId()){return uid?`finansee_data_${uid}`:''}
function userSecurityKey(uid=currentUserId()){return uid?`finansee_security_${uid}`:'finansee_security_guest'}
function getActiveUser(){const id=sessionStorage.getItem(SESSION_KEY);if(!id)return null;return getUsers().find(u=>u.id===id)||null}
function showAuth(mode='login',message=''){
  document.body.classList.add('auth-required');
  document.getElementById('authScreen')?.classList.add('show');
  switchAuth(mode);
  setAuthMessage(message);
}
function hideAuth(){document.body.classList.remove('auth-required');document.getElementById('authScreen')?.classList.remove('show')}
function switchAuth(mode){
  const login=mode!=='register';
  document.getElementById('loginPanel')?.classList.toggle('active',login);
  document.getElementById('registerPanel')?.classList.toggle('active',!login);
  document.getElementById('authLoginTab')?.classList.toggle('active',login);
  document.getElementById('authRegisterTab')?.classList.toggle('active',!login);
  setAuthMessage('');
  setTimeout(()=>document.getElementById(login?'loginEmail':'regName')?.focus(),80);
}
function setAuthMessage(text,isError=true){const el=document.getElementById('authMessage');if(!el)return;el.textContent=text;el.classList.toggle('ok',!!text&&!isError)}
async function createAccount(){
  const name=String(document.getElementById('regName')?.value||'').trim();
  const email=normalizeEmail(document.getElementById('regEmail')?.value);
  const password=document.getElementById('regPassword')?.value||'';
  const confirm=document.getElementById('regConfirm')?.value||'';
  if(name.length<2)return setAuthMessage('Informe seu nome.');
  if(!/^\S+@\S+\.\S+$/.test(email))return setAuthMessage('Informe um e-mail válido.');
  if(password.length<6)return setAuthMessage('A senha precisa ter pelo menos 6 caracteres.');
  if(password!==confirm)return setAuthMessage('As senhas não conferem.');
  const users=getUsers();if(users.some(u=>u.email===email))return setAuthMessage('Já existe uma conta com este e-mail.');
  try{
    const salt=authRandomB64(16),iterations=180000,hash=await authDerive(password,salt,iterations);
    const user={id:'u_'+Date.now().toString(36)+Math.random().toString(36).slice(2,8),name,email,salt,hash,iterations,createdAt:new Date().toISOString()};
    users.push(user);setUsers(users);sessionStorage.setItem(SESSION_KEY,user.id);localStorage.removeItem(SESSION_KEY);currentUser=user;
    const fresh=emptyData(name);localStorage.setItem(userDataKey(user.id),JSON.stringify(fresh));
    finishLogin(true);
  }catch(e){setAuthMessage(e.message||'Não foi possível criar a conta.')}
}
async function loginAccount(){
  const email=normalizeEmail(document.getElementById('loginEmail')?.value);
  const password=document.getElementById('loginPassword')?.value||'';
  const user=getUsers().find(u=>u.email===email);
  if(!user)return setAuthMessage('E-mail ou senha incorretos.');
  try{const hash=await authDerive(password,user.salt,user.iterations||180000);if(!authEqual(hash,user.hash))return setAuthMessage('E-mail ou senha incorretos.');
    sessionStorage.setItem(SESSION_KEY,user.id);localStorage.removeItem(SESSION_KEY);currentUser=user;finishLogin(false);
  }catch(e){setAuthMessage(e.message||'Não foi possível entrar.')}
}
function finishLogin(isNew){
  hideAuth();
  load();
  if(typeof nav==='function')nav();
  if(typeof renderAll==='function')renderAll();
  if(typeof renderAccountSettings==='function')renderAccountSettings();
  if(typeof onboardingNeeded==='function'&&onboardingNeeded()){
    if(typeof showOnboarding==='function')showOnboarding();
  }else if(typeof initializeSecurityGate==='function'){initializeSecurityGate()}
  if(isNew&&typeof toast==='function')toast('✓ Conta criada. Vamos configurar seu FinanSee.');
}
function logoutAccount(){
  if(!confirm('Sair desta conta neste dispositivo?'))return;
  sessionStorage.removeItem(SESSION_KEY);localStorage.removeItem(SESSION_KEY);sessionStorage.removeItem('finansee_unlocked');currentUser=null;data=emptyData('');
  document.body.classList.remove('app-locked');document.getElementById('lockScreen')?.classList.remove('show');
  showAuth('login','Você saiu da conta.',false);
}
function renderAccountSettings(){
  const u=currentUser||getActiveUser();
  const name=document.getElementById('accountName'),email=document.getElementById('accountEmail');
  if(name)name.textContent=u?.name||'—';if(email)email.textContent=u?.email||'—';
  const first=u?.name?u.name.trim().split(/\s+/)[0]:'Conta';
  const initials=(u?.name||'F').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'F';
  const header=document.getElementById('headerUser');if(header)header.textContent=first;
  const hAvatar=document.getElementById('headerAvatar');if(hAvatar)hAvatar.textContent=initials;
  const pAvatar=document.getElementById('profileAvatar');if(pAvatar)pAvatar.textContent=initials;
  const pName=document.getElementById('profileMenuName');if(pName)pName.textContent=u?.name||'Usuário';
  const pEmail=document.getElementById('profileMenuEmail');if(pEmail)pEmail.textContent=u?.email||'—';
}
async function changeAccountPassword(){
  const old=document.getElementById('accountOldPassword')?.value||'',next=document.getElementById('accountNewPassword')?.value||'',confirm=document.getElementById('accountNewConfirm')?.value||'';
  if(next.length<6)return toast('A nova senha precisa ter pelo menos 6 caracteres.',true);if(next!==confirm)return toast('A confirmação não confere.',true);
  const users=getUsers(),idx=users.findIndex(u=>u.id===currentUserId());if(idx<0)return toast('Conta não encontrada.',true);const u=users[idx];
  const oldHash=await authDerive(old,u.salt,u.iterations||180000);if(!authEqual(oldHash,u.hash))return toast('Senha atual incorreta.',true);
  u.salt=authRandomB64(16);u.iterations=180000;u.hash=await authDerive(next,u.salt,u.iterations);users[idx]=u;setUsers(users);currentUser=u;
  ['accountOldPassword','accountNewPassword','accountNewConfirm'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});toast('✓ Senha da conta alterada');
}

async function forgotPassword(){
  const email=normalizeEmail(prompt('Digite o e-mail da conta local que deseja remover:')||'');if(!email)return;
  const users=getUsers(),u=users.find(x=>x.email===email);if(!u)return setAuthMessage('Nenhuma conta local encontrada com este e-mail.');
  if(!confirm('O FinanSee não possui recuperação por e-mail. Para usar este endereço novamente, é necessário apagar o perfil local e todos os dados dele. Continuar?'))return;
  const token=prompt('Digite APAGAR para remover definitivamente este perfil local:');if(token!=='APAGAR')return setAuthMessage('Exclusão cancelada.');
  setUsers(users.filter(x=>x.id!==u.id));localStorage.removeItem(userDataKey(u.id));localStorage.removeItem(userSecurityKey(u.id));
  switchAuth('register');document.getElementById('regEmail').value=email;setAuthMessage('Perfil local removido. Agora você pode criar uma nova conta com este e-mail.',false);
}
async function deleteCurrentProfile(){
  const users=getUsers(),idx=users.findIndex(u=>u.id===currentUserId());if(idx<0)return toast('Conta não encontrada.',true);const u=users[idx];
  const password=prompt('Confirme sua senha da conta para excluir este perfil:');if(password===null)return;
  try{const hash=await authDerive(password,u.salt,u.iterations||180000);if(!authEqual(hash,u.hash))return toast('Senha incorreta. Perfil não excluído.',true)}catch(e){return toast('Não foi possível validar a senha.',true)}
  const token=prompt('Esta ação apaga conta, dados financeiros, PIN e configurações locais. Digite APAGAR para confirmar:');if(token!=='APAGAR')return toast('Exclusão cancelada');
  setUsers(users.filter(x=>x.id!==u.id));localStorage.removeItem(userDataKey(u.id));localStorage.removeItem(userSecurityKey(u.id));sessionStorage.removeItem(SESSION_KEY);sessionStorage.removeItem('finansee_unlocked');currentUser=null;data=emptyData('');
  hideOnboarding?.();document.body.classList.remove('app-locked');document.getElementById('lockScreen')?.classList.remove('show');showAuth('login','Perfil excluído deste dispositivo.',false);
}

function initializeAuth(){
  // Sessões persistidas em localStorage não são reutilizadas nesta versão; a sessão atual vive apenas nesta aba/app aberto.
  localStorage.removeItem(SESSION_KEY);
  currentUser=getActiveUser();
  if(!currentUser){showAuth('login');return false}
  hideAuth();return true;
}
