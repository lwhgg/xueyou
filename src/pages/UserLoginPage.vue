<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="userAccount"
                name="userAccount"
                label="用户名"
                placeholder="请输入用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="userPassword"
                type="password"
                name="userPassword"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div><a href="/user/register" style="font-size: 10px; float: right; margin-bottom: 10px; margin-right: 20px;">没有账号？点击注册</a></div>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
    const res = await myAxios.post('/user/login', {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
    })
    if(res.code === 0 && res.data) {
        Toast.success('登录成功');
        // 跳转到之前的页面
        window.location.href = route.query?.redirect ?? '/';
    } else {
        Toast.fail('登录失败');
    }
};
</script>

<style>

</style>