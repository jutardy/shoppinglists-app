const storage = {};

const getVisits = (listId) => {
    let numVisits = 0;
    if (storage.hasOwnProperty(listId)) {
        let numUsers = new Set(storage[listId].users).size;
        numVisits = storage[listId].guests + numUsers;
    }   
    return numVisits;
};

const updateVisits = (listId, userId = null) => {
    if (!storage.hasOwnProperty(listId)) {
        storage[listId] = { guests: 0, users: [] };
    }
    userId === null ? storage[listId].guests++ : storage[listId].users.push(userId);
};

const leavePage = (listId, userId = null) => {
    if (storage.hasOwnProperty(listId)) {
        if (userId === null) { 
            storage[listId].guests--;
        } else if (storage[listId].users.length > 0 && storage[listId].users.includes(userId)) {
            let index = storage[listId].users.indexOf(userId);
            storage[listId].users.splice(index, 1);
        }
    }
};

export default {
    storage,
    getVisits,
    updateVisits,
    leavePage
};