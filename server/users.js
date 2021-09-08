const users = [];

const addUser = ({ id, name, room }) => {
    // reformat user and room names
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // check for duplicate username
    const existingUser = users.find((user) => user.room === room && user.name ===name);

    // return error if username is taken
    if(existingUser) {
        return { error: 'Username is taken' };
    }
    // create user object
    const user = { id, name, room };
    // add user to user array
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    // scans user array and looks for matching id of user to delete
    const index = users.findIndex((user) => user.id === id);

    // as long as findIndex() matches the id, the returned index will not be -1
    if(index !== -1) {
        // delete user
        return users.splice(index, 1)[0];
    }

}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, users };