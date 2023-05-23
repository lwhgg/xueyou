<template>
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchMode" size="24" />
        </template>
    </van-cell>
    <user-card-list :user-list="userList" :loading="loading"/>
    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from '../plugins/myAxios.ts'
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const isMatchMode = ref<Boolean>(false);

const userList = ref([]);

const loading = ref(true);

const loadData = async () => {
    let userListData;
    loading.value = true;
    // 心动模式，根据标签匹配用户
    if(isMatchMode.value) {
        const num = 10;
        userListData = await myAxios.get('/user/match', {
            params: {
                num,
            },
        })
            .then(function (response) {
                console.log('/user/recommend succeed', response);
                return response?.data;
            })
            .catch(function (error) {
                console.error('/user/recommend error', error);
                Toast.fail('请求失败');
            })
    } else {
        userListData = await myAxios.get('/user/recommend', {
            params: {
                pageNum: 1,
                pageSize: 8
            },
        })
            .then(function (response) {
                console.log('/user/recommend succeed', response);
                return response?.data?.records;
            })
            .catch(function (error) {
                console.error('/user/recommend error', error);
                Toast.fail('请求失败');
            })
    }
    if(userListData) {
        userListData.forEach(user => {
            if(user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        })
        userList.value = userListData;
        loading.value = false;
    }
}

watchEffect(() => {
    loadData();
})

// const mockUser = {
//     id: 12345,
//     username: '鸡哥',
//     userAccount: 'jijiji',
//     avatarUrl: 'https://pic3.zhimg.com/v2-fe127aac97845744e7b2124ffe16df6d_r.jpg',
//     gender: 1,
//     profile: '鸡你太美,鸡你太美,鸡你太美,鸡你太美,鸡你太美,鸡你太美,鸡你太美,鸡你太美',
//     phone: '13154315845',
//     email: '34897@qq.com',
//     userRole: 0,
//     userCode: '888',
//     tags: ['唱歌', '跳舞', 'rap', 'java', 'c++', '唱歌', '跳舞', 'rap', 'java', 'c++'],
//     createTime: new Date()
// }

</script>

<style scoped>

</style>