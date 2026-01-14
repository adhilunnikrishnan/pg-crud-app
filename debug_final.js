import { spawn } from 'child_process';

const server = spawn('node', ['server.js'], { 
    env: { ...process.env, NODE_ENV: 'development' },
    stdio: 'pipe' 
});

server.stdout.on('data', (data) => {
    process.stdout.write(`STDOUT: ${data}`);
});

server.stderr.on('data', (data) => {
    process.stdout.write(`STDERR: ${data}`);
});

setTimeout(async () => {
    console.log('\n--- Sending registration request ---');
    try {
        const payload = {
            username: "adhiltest" + Math.floor(Math.random() * 1000),
            email: "adhil" + Math.floor(Math.random() * 1000) + "@gmail.com",
            password: "password123",
            role: "user",
            age: 25
        };
        console.log('Payload:', JSON.stringify(payload));
        
        const response = await fetch('http://localhost:9002/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const text = await response.text();
        console.log('\n--- Result ---');
        console.log('Status:', response.status);
        console.log('Body:', text);
    } catch (e) {
        console.error('Request Error:', e.message);
    } finally {
        server.kill();
        process.exit();
    }
}, 3000);
