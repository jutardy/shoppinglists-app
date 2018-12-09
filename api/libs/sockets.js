import socket from 'socket.io';
import User from '../models/User';

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

exports.listen = function(app) {
    const io = socket(app);

    io.on('connection', socket => {
        socket.on('NUMBER_ITEMS_UPDATED', async (userid) => {
            const dashboardBlocks = ['items', 'lists'];
            let recentUsers = [];
            await getRecentUsers().then(users => {
                if (users.length > 0) {
                    recentUsers = users.map(user => user._id);
                    console.log(recentUsers)
                    if (recentUsers.includes(userid)) {
                        console.log('include')
                        dashboardBlocks.push('lastUsers');
                    }
                }
                console.log('emit')
                io.emit('UPDATE_DASHBOARD', dashboardBlocks);
            });
        });
        socket.on('NEW_USER', () => {
            const dashboardBlocks = ['users', 'lastUsers'];
            io.emit('UPDATE_DASHBOARD', dashboardBlocks);
        });
    });

    return io;
};