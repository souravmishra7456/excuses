// excuseService.js
const { excuses } = require('./excuses.js');

function getRandomExcuse(category = null) {
    const filtered = category
        ? excuses.filter((e) => e.category.toLowerCase() === category.toLowerCase())
        : excuses;

    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
}

function getMultipleExcuses(count = 1, category = null) {
    return Array.from({ length: count }, () => getRandomExcuse(category)).filter(Boolean);
}

function listCategories() {
    return [...new Set(excuses.map((e) => e.category))].sort();
}

function searchExcuses(query) {
    if (!query) return { results: [], message: "No search query provided" };

    const results = excuses.filter((e) =>
        e.text.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        return {
            results: [],
            message: `No excuses found containing "${query}". Try a different search term.`,
            query: query,
            count: 0
        };
    }

    // Return structured format for successful searches with full excuse objects
    return {
        excuses: results.map(e => ({
            excuse: e.text,
            category: e.category
        })),
        count: results.length,
        query: query,
        message: `Found ${results.length} excuse(s) containing "${query}"`
    };
}

module.exports = {
    getRandomExcuse,
    getMultipleExcuses,
    listCategories,
    searchExcuses
};
