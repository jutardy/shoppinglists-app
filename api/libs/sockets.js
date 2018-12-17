import socket from 'socket.io';
import userController from '../controllers/userController';
import visits from './visits';

const updateOnLeave = (listId, userId) => {
    visits.leavePage(listId, userId);
    let numVisits = visits.getVisits(listId);
    if (numVisits === 0) delete visits.storage[listId];
    return numVisits;
};

exports.listen = function(app) {
    const io = socket(app);

    io.on('connection', socket => {
        socket.on('NUMBER_ITEMS_UPDATED', async (userid) => {
            const dashboardBlocks = ['items', 'lists'];
            let recentUsers = [];
            await userController.getRecentUsers().then(users => {
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
            visits.updateVisits(listId, userId);
            let numVisits = visits.getVisits(listId);
            socket.join(listId, () => {
                socket.room = { listId : Object.keys(socket.rooms)[1], userId: userId };
            });
            io.to(listId).emit('UPDATE_LIST_COUNTER', numVisits);
        });

        socket.on('LEAVE_LIST', (listId, userId) => { 
            socket.leave(listId, () => {
                let numVisits = updateOnLeave(listId, userId);
                socket.to(listId).emit('UPDATE_LIST_COUNTER', numVisits);
            });
        });

        socket.on('disconnect', () => {
            if (socket.room) {
                let listId = socket.room.listId;
                let userId = socket.room.userId;
                socket.leave(listId, () => {
                    let numVisits = updateOnLeave(listId, userId);
                    socket.to(listId).emit('UPDATE_LIST_COUNTER', numVisits);
                });
            }
        });        
    });

    return io;
};