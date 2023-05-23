<template>
    <user-card-list :user-list="userList" />
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from '../plugins/myAxios.ts'
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const { tags } = route.query;

const userList = ref([]);

onMounted(async () => {
    const userListData = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList: tags
        },
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response?.data;
    })
    .catch(function (error) {
        console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
    })
    if(userListData) {
        userListData.forEach(user => {
            if(user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        })
        userList.value = userListData
    }
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