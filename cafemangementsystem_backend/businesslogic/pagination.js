
const pagination = ((query) => {
    let page = query.page || 1;
    let limit = query.limit || 5;
    let skip = (page - 1) * limit;
    return { page, limit, skip }
});

module.exports = pagination;