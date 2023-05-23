<template>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="search" size="18" :class="{login: route.path === '/user/login'}"/>
        </template>
    </van-nav-bar>
    <div id="content">
        <router-view />
    </div>

    <van-tabbar route @change="onChange" v-if="route.path !== '/user/login'" >
        <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
        <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.ts";

const router = useRouter();
const route = useRoute();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
    const toPath = to.path;
    const route = routes.find((route) => {
        return toPath === route.path;
    })
    title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
    router.back();
};
const onClickRight = () => {
    router.push({ path: '/search' })
};
</script>

<style scoped>
.login {
    display: none;
}
#content {
    padding-bottom: 50px;
}
</style>