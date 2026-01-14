import bcrypt from 'bcrypt';
async function testBcrypt() {
    try {
        console.log('Testing bcrypt...');
        const hash = await bcrypt.hash('test', 10);
        console.log('Hash created:', hash);
        const match = await bcrypt.compare('test', hash);
        console.log('Match:', match);
    } catch (error) {
        console.error('Bcrypt error:', error);
    }
}
testBcrypt();
