import { spawn } from 'child_process';

const server = spawn('node', ['server.js'], { stdio: 'pipe' });

server.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
});

server.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
});

setTimeout(async () => {
    console.log('Sending request...');
    try {
        const response = await fetch('http://localhost:9002/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "testuser" + Date.now(),
                email: "test_" + Date.now() + "@example.com",
                password: "password123",
                role: "user",
                age: 25
            })
        });
        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Body:', text);
    } catch (e) {
        console.error('Request failed:', e.message);
    } finally {
        server.kill();
        process.exit();
    }
}, 5000);
