// Tthanh Obfuscator Engine - Level 3 (sUNC ~90%)

function randomString(len) {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
}

function encodeString(str) {
    return str
        .split("")
        .map((c) => "\\x" + c.charCodeAt(0).toString(16))
        .join("");
}

function generateOpaquePredicate() {
    return `((123456 * 8 / 4) == (2 * 123456))`;
}

function obfuscate(script) {
    let key = randomString(12);
    let encoded = encodeString(script);

    let filler = randomString(64);

    return `--[[ Obfuscated by Tthanh Obfuscator - Level 3 ]]--
local junk_${filler} = ${Math.floor(Math.random() * 999999)}
if ${generateOpaquePredicate()} then
    local k = "${key}"
    local function d(s)
        local o = ""
        for hex in string.gmatch(s, "\\x(..)") do
            o = o .. string.char(tonumber(hex, 16))
        end
        return o
    end
    loadstring(d("${encoded}"))()
else
    while true do end
end`;
}

// UI Bind

window.onload = () => {
    const inp = document.getElementById("input");
    const out = document.getElementById("output");
    const run = document.getElementById("run");

    run.onclick = () => {
        out.value = obfuscate(inp.value);
    };
};
