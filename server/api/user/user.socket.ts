import {Constant} from '../../constant';

export default class UserSocket {
    socket: any;

    constructor() {
    }

    /**
     * Set Socket instance
     * */
    fnSetSocket(socket) {
        this.socket = socket;
    }

    /**
     * Emit User object for Add
     * @param {any} userObj
     * */
    fnAddUser = (userObj: any) => {
        this.socket.emit(Constant.ADD_USER, userObj);
    }

    /**
     * Emit User object for remove
     * @param {any} userObj
     * */
    fnRemoveUser = (userObj: any) => {
        this.socket.emit(Constant.REMOVE_USER, userObj);
    }
}
