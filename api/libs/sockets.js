import socket from 'socket.io';
import User from '../models/User';

const visits = {};

const getRecentUsers = () => {
    return User.aggregate(
        [
            { $sort: { 'created_at': -1 } },
            { $limit: 5 },
            { $lookup: {
                'from': 'items',
                'localField': '_id',
                'foreignField': 'user',
                'as': 'items'
            } },           
            { '$project': {
                '_id': 1,
                'username': 1,                
                'numItems': { $size: '$items' }
            } },        
        ]).exec();
};

const getVisits = (listId) => {
    let numVisits = 0;
    if (visits.hasOwnProperty(listId)) {
        let numUsers = new Set(visits[listId].users).size;
        numVisits = visits[listId].guests + numUsers;
    }   
    return numVisits;
};

const updateVisits = (listId, userId = null) => {
    if (!visits.hasOwnProperty(listId)) {
        visits[listId] = { guests: 0, users: [] };
    }
    userId === null ? visits[listId].guests++ : visits[listId].users.push(userId);
};

const leavePage = (listId, userId = null) => {
    if (userId === null) { 
        visits[listId].guests--;
    } else if (visits[listId].users.length > 0 && visits[listId].users.includes(userId)) {
        let index = visits[listId].users.indexOf(userId);
        visits[listId].users.splice(index, 1);
    }
};

exports.listen = function(app) {
    const io = socket(app);

    io.on('connection', socket => {
        socket.on('NUMBER_ITEMS_UPDATED', async (userid) => {
            const dashboardBlocks = ['items', 'lists'];
            let recentUsers = [];
            await getRecentUsers().then(users => {
                if (users.length > 0) {
                    recentUsers = users.map(user => user._id.toString());                    
                }
            });
            if (recentUsers.includes(userid)) {
                dashboardBlocks.push('lastUsers');
            }
            io.emit('UPDATE_DASHBOARD', dashboardBlocks);
        });

        socket.on('NEW_USER', () => {
            const dashboardBlocks = ['users', 'lastUsers'];
            io.emit('UPDATE_DASHBOARD', dashboardBlocks);
        });

        socket.on('LIST_UPDATED', (isEditing = false) => {
            io.emit('UPDATE_LIST', isEditing);
        });

        socket.on('VIEW_LIST', (listId, userId) => { 
            updateVisits(listId, userId);
            let numVisits = getVisits(listId);
            socket.join(listId, () => {
                socket.room = { listId : Object.keys(socket.rooms)[1], userId: userId };
            });
            io.to(listId).emit('UPDATE_LIST_COUNTER', numVisits);
        });

        socket.on('disconnect', () => {
            if (socket.room) {
                let listId = socket.room.listId;
                let userId = socket.room.userId;
                leavePage(listId, userId);
                let numVisits = getVisits(listId);
                socket.to(listId).emit('UPDATE_LIST_COUNTER', numVisits);
                if (numVisits === 0) delete visits[listId];
            }
        });        
    });

    return io;
};