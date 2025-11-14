// SIMPLE LEVEL 4 HYBRID VM MOCK ENGINE
// (chỉ để demo, không phải VM thật để tránh quá nặng)

function obfuscate(input) {
    if (!input.trim()) return "// ERROR: Không có code để obfuscate";

    // Fake layer heavy
    let encoded = btoa(unescape(encodeURIComponent(input)));

    const wrapper = `
--[[ Tthanh Obfuscator - discord.gg/cEwrGBTckj ]]
local _ENV0 = {}
local data = "${encoded}"

local function decode(b)
    local d = {}
    for i = 1, #b do
        d[#d+1] = string.char( string.byte(b, i) ~ 15 )
    end
    return table.concat(d)
end

local function run()
    local raw = decode(data)
    local chunk = loadstring(raw)
    return chunk()
end

return run()
`;

    return wrapper;
}

window.obfuscate = obfuscate;
