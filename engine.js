// 
// 

function RNG(len) {
    let c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let o = "";
    for (let i = 0; i < len; i++) o += c[Math.floor(Math.random() * c.length)];
    return o;
}

function EncodeHex(s) {
    return s.split("").map(ch => "\\x" + ch.charCodeAt(0).toString(16)).join("");
}

function LayerEncode(str) {
    // 
    let layer1 = EncodeHex(str);

    // 
    let layer2 = layer1.split("").reverse().join("");

    // 
    let salt = RNG(20);
    let layer3 = salt + layer2 + salt;

    // 
    let chunks = [];
    for (let i = 0; i < layer3.length; i += 10) {
        chunks.push(layer3.slice(i, i + 10));
    }

    return chunks;
}

function ComplexJunk() {
    let t = RNG(32);
    return `
local ${t} = {${Math.random()*9999}, "${RNG(15)}", ${Math.random()*5000}, "${RNG(15)}"}
for i=1,#${t} do
    for j=1,#${t} do
        local _ = (${Math.random()*9000} * ${Math.random()*8000}) % 2
    end
end
`;
}

function VMWrapper(inner) {
    let key = RNG(20);
    let junk = ComplexJunk();

    return `
--[[ Obfuscator By Tthanh - discord.gg/cEwrGBTckj ]]--
local function VM_EXEC(k, data)
    local function _scramble(x)
        local o = ""
        for hex in string.gmatch(x, "..") do
            o = o .. string.char(tonumber(hex, 16))
        end
        return o
    end
    local dec = ""
    for i = #data, 1, -1 do
        dec = dec .. data:sub(i,i)
    end

    local cleaned = string.sub(dec, ${key.length+1}, #dec - ${key.length})
    ${junk}
    local ok,err = pcall(function()
        loadstring(_scramble(cleaned))()
    end)
    if not ok then
        while true do end -- Anti tamper
    end
end

VM_EXEC("${key}", "${inner}")
`;
}

function Obfuscate(script) {
    let chunks = LayerEncode(script);

    // 
    let concat = chunks.join("");

    // 
    let rebuilt = concat
        .split("")
        .map(c => c.charCodeAt(0).toString(16).padStart(2,"0"))
        .join("");

    // 
    return VMWrapper(rebuilt);
}

//
window.ultraObfuscate = Obfuscate;
