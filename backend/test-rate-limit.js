const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5500';

async function testRateLimit() {
    console.log('🧪 Testing Rate Limiting...\n');

    // Test 1: Make multiple requests to trigger rate limit
    console.log('📊 Test 1: Making 105 requests (should trigger rate limit after 100)...');

    let rateLimitHit = false;
    let successCount = 0;

    for (let i = 1; i <= 105; i++) {
        try {
            const response = await fetch(`${BASE_URL}/excuse`);

            if (response.status === 429) {
                if (!rateLimitHit) {
                    console.log(`🚫 Rate limit hit at request #${i}`);
                    rateLimitHit = true;

                    const errorData = await response.json();
                    console.log('Rate limit response:', errorData);
                }
            } else if (response.ok) {
                successCount++;
                if (i % 20 === 0) {
                    console.log(`✅ Request #${i} successful`);
                }
            }
        } catch (error) {
            console.error(`❌ Request #${i} failed:`, error.message);
        }

        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    console.log(`\n📈 Results: ${successCount} successful requests out of 105`);

    // Test 2: Test search endpoint rate limit
    console.log('\n📊 Test 2: Testing search endpoint rate limit (30 requests)...');

    let searchRateLimitHit = false;
    let searchSuccessCount = 0;

    for (let i = 1; i <= 35; i++) {
        try {
            const response = await fetch(`${BASE_URL}/search?q=test`);

            if (response.status === 429) {
                if (!searchRateLimitHit) {
                    console.log(`🚫 Search rate limit hit at request #${i}`);
                    searchRateLimitHit = true;

                    const errorData = await response.json();
                    console.log('Search rate limit response:', errorData);
                }
            } else if (response.ok) {
                searchSuccessCount++;
                if (i % 10 === 0) {
                    console.log(`✅ Search request #${i} successful`);
                }
            }
        } catch (error) {
            console.error(`❌ Search request #${i} failed:`, error.message);
        }

        await new Promise(resolve => setTimeout(resolve, 10));
    }

    console.log(`\n📈 Search Results: ${searchSuccessCount} successful requests out of 35`);

    // Test 3: Health check (should not be rate limited)
    console.log('\n📊 Test 3: Testing health endpoint (should not be rate limited)...');

    try {
        const response = await fetch(`${BASE_URL}/health`);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Health check successful:', data);
        } else {
            console.log('❌ Health check failed:', response.status);
        }
    } catch (error) {
        console.error('❌ Health check error:', error.message);
    }

    console.log('\n🎉 Rate limit testing completed!');
}

// Run the test
testRateLimit().catch(console.error); 