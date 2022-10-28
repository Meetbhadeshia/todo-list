//passing our getDate function from module.exports. We can pass an array, object, string, any thing.
//If you are exporting function, don't initialize it with (), just pass in name.
//examples of module.exports
// module.exports =  meet
// module.exports = getDate
// module.exports = {date : getDate, name: meet}
// module.exports = [getDate, meet]
let meet = "Meet"
module.exports.getDate = function () {
    const today = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    return today.toLocaleDateString("en-US", options);
}

module.exports.getDay = function () {
    const today = new Date();
    const options = { weekday: "long" };
    return today.toLocaleDateString("en-US", options);
}