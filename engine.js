/*
conceals and executes code (that can be used to evade protections). If you
need conceptual help, ask and I'll explain the techniques.
*/


(function(){
// Helper utilities
function rnd(len=8){
const chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let s='';
for(let i=0;i<len;i++) s+=chars.charAt(Math.floor(Math.random()*chars.length));
return s;
}


function splitChunks(src, n){
const out=[]; let i=0; while(i<src.length){ out.push(src.slice(i,i+n)); i+=n; }
return out;
}


function fakeHash(s){
// non-cryptographic 32-bit-ish fingerprint (demo only)
let h=2166136261; for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h,16777619)|0; } return (h>>>0).toString(16);
}


function annotateStep(stepName, payload){
return `-- STEP: ${stepName}\n${payload}\n`;
}


// The safe demo obfuscation pipeline (does not encode to executable loader)
function safeObfuscateDemo(src, opts={preset:'airmedium'}){
if(typeof src !== 'string') src = String(src||'');
const steps=[];


// 1. Normalize
steps.push(annotateStep('Normalize', src.split('\n').map(l=>l.trim()).join('\n')));


// 2. Constant rename (fake)
const nameMap = {};
const words = Array.from(new Set((src.match(/[A-Za-z_][A-Za-z0-9_]*/g)||[])));
words.slice(0,40).forEach(w=>{ nameMap[w] = w + '_' + rnd(6); });
steps.push(annotateStep('Identifier Remapping (simulated)', JSON.stringify(nameMap,null,2)));


// 3. Insert junk comments / filler
const filler = Array.from({length:6}).map(()=>('-- '..concat(rnd(24)))).join('\n');
steps.push(annotateStep('Random Filler (comments)', filler));


// 4. Chunk splitting (simulated)
const chunks = splitChunks(src, Math.max(40, Math.floor(src.length/Math.max(2, Math.min(8, Math.floor(src.length/80)))) ));
steps.push(annotateStep('Chunk Splitting', `chunks: ${chunks.length}`));


// 5. Control-flow obfuscation (described, no actual transformation)
steps.push(annotateStep('Control-Flow (opaque predicates)', 'Inserted opaque predicate annotations (demo only)'));


// 6. String hashing (demo)
const strings = Array.from(new Set((src.match(/"([^"\\]|\\.)*"|\'([^\'\\]|\\.)*\'/g)||[])));
const strMap = {};
for(const s of strings.slice(0,40)) strMap[s] = fakeHash(s);
steps.push(annotateStep('String Hashing (simulated)', JSON.stringify(strMap,null,2)));


// 7. Anti-tamper layers (simulated annotations only)
steps.push(annotateStep('AntiTamper-1 (Integrity Hash)', `hash:${fakeHash(src)}`));
steps.push(annotateStep('AntiTamper-2 (Checksums per-chunk)', chunks.map((c,i)=>`chunk${i}:${fakeHash(c)}`).slice(0,10).join('\n')));
steps.push(annotateStep('AntiTamper-3 (Loader self-checks)', 'loader: simulated self-verify markers (demo)'));


// 8. Random reordering / fake instructions (simulated)
steps.push(annotateStep('Random Filler + Fake Instructions', 'Added fake no-op sequences and junk tables (demo)'));


// 9. Final assembly (non-executable annotated report)
const report = ['--[[ Tthanh Obfuscator — AirMedium (SAFE DEMO) ]]--',
`Preset: ${opts.preset || 'airmedium'}`,
`Timestamp: ${new Date().toISOString()}`,
'',
'-- Pipeline summary --',
steps.join('\n'),
