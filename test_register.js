import fetch from 'node-fetch';

async function testRegister() {
    const data = {
        username: "testuser_" + Date.now(),
        email: "test_" + Date.now() + "@example.com",
        password: "password123",
        role: "user",
        age: 25
    };

    console.log('Testing registration with:', data);
    try {
        const response = await fetch('http://localhost:9002/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Response:', text);
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

testRegister();
