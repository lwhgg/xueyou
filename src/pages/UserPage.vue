<template>
    <template v-if="user">
        <van-cell title="当前用户" :value="user?.username" />
        <van-cell title="修改信息" is-link to="/user/update" />
        <van-cell title="我创建的队伍" is-link to="/user/team/create" />
        <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//     id: 1,
//     username: '小叮当',
//     userAccount: 'codeDang',
//     avatarUrl: 'https://pic3.zhimg.com/v2-e422ac1f0de6e35a99dc94b0f0c117e6_r.jpg?source=1940ef5c',
//     gender: '男',
//     phone: '13545641188',
//     email: '123548@qq.com',
//     userCode: 12345,
//     createTime: new Date(),
// }

const user = ref();

onMounted(async () => {
    user.value = await getCurrentUser();
})

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/edit',
        query: {
            editKey,
            editName,
            currentValue,
        }
    })
}
</script>

<style>

</style>