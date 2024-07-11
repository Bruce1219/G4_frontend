// src/stores/userLogin.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import mitt from 'mitt'; // 事件總線

const emitter = mitt();

export const useAdminStore = defineStore('admin', () => {
    const currentUser = ref(null);
    const currentAccount = ref(null);
    const flag = ref(Date.now());

    function setCurrentUser(user) {
        currentUser.value = user;
        if (user) {
            currentAccount.value = user.m_name;
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            currentAccount.value = null;
        }
    }

    function clearCurrentUser() {
        currentUser.value = null;
        currentAccount.value = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user_member');
    }

    function loadCurrentUser() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            currentUser.value = parsedUser;
            currentAccount.value = parsedUser.m_name;
        }
    }

    function isLoggedIn() {
        return !!currentUser.value;
    }

    function triggerFetchMemberInfo() {
        flag.value = Date.now();
        emitter.emit('memberInfoUpdated');
    }

    return {
        currentUser,
        currentAccount,
        flag,
        setCurrentUser,
        clearCurrentUser,
        loadCurrentUser,
        isLoggedIn,
        triggerFetchMemberInfo
    };
});

export { emitter };
