// _actions.js
'use server'

async function fetchDataWithRetry(url, options = {}, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Response not ok');
            return response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

export async function getCanadianCustomers(signal) {
    const API_URL = process.env.API_URL; // Ensure this environment variable is correctly set
    return await fetchDataWithRetry(`${API_URL}/canadian_customers`, { signal }, 3);
}
