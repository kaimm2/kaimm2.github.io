// engine.js - Tthanh Obfuscator Level 4 (Hybrid VM)

// Random string generator
function randomString(len) {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
}

// Encode string into hex
function encodeString(str) {
    return str
        .split("")
        .map(c => "\\x" + c.charCodeAt(0).toString(16))
        .join("");
}

// Generate opaque predicate
function generateOpaquePredicate() {
    return `((Math.random() * 99999) < 99999)`; // always true but looks tricky
}

// Level 4 Obfuscator (Hybrid VM)
function obfuscate(script) {
    let key = randomString(16);
    let encoded = encodeString(script);
    let filler = randomString(128);

    return `--[[ Obfuscated by Tthanh Obfuscator - discord.gg/cEwrGBTckj ]]--
local junk_${filler} = ${Math.floor(Math.random() * 9999999)}
if ${generateOpaquePredicate()} then
    local k = "${key}"
    local function d(s)
        local o = ""
        for hex in string.gmatch(s, "\\x(..)") do
            o = o .. string.char(tonumber(hex, 16))
        end
        return o
    end
    -- Hybrid VM simulation
    local vm_code = "loadstring(d('"..encoded.."'))()"
    loadstring(vm_code)()
else
    repeat until false
end`;
}

// Bind to HTML
window.onload = () => {
    const inp = document.getElementById("input");
    const out = document.getElementById("output");
    const run = document.getElementById("run");

    run.onclick = () => {
        out.value = obfuscate(inp.value);
    };
};
