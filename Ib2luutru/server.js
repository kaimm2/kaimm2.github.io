const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

app.post('/api/log', async (req, res) => {
    const { code } = req.body;
    
    if (!code || code.trim() === '') {
        return res.status(400).json({ error: 'Code is required' });
    }

    const tempInputFile = path.join(__dirname, 'temp_input.lua');
    const outputFile = path.join(__dirname, 'dumped_output.lua');

    try {
        if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
        }
        
        fs.writeFileSync(tempInputFile, code, 'utf8');

        exec(`/nix/store/xlws98i2ayymvaf0m58jk8j2h0rr3d5a-lua-5.4.7/bin/lua Logevnlarry.lua temp_input.lua`, { 
            timeout: 30000,
            maxBuffer: 1024 * 1024 * 10
        }, (error, stdout, stderr) => {
            let result = '';
            
            if (fs.existsSync(outputFile)) {
                result = fs.readFileSync(outputFile, 'utf8');
                fs.unlinkSync(outputFile);
            }

            if (fs.existsSync(tempInputFile)) {
                fs.unlinkSync(tempInputFile);
            }

            if (result) {
                res.json({ success: true, output: result, logs: stdout });
            } else if (error) {
                res.json({ success: false, error: error.message, logs: stdout + '\n' + stderr });
            } else {
                res.json({ success: true, output: stdout || 'No output generated', logs: stderr });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
