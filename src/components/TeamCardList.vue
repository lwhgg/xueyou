<template>
    <div id="teamCardList">
        <van-card
            v-for="team in props.teamList"
            :desc="team.description"
            :title="team.name"
            thumb="https://tx-free-imgs2.acfun.cn/kimg/bs2/zt-image-host/ChYwODlhOGJhZDMzMTBlOWQxYjFlMjAyEJjM1y8.png"
        >
            <template #tags>
                <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px; margin-bottom: 8px">
                    {{ teamStatusEnum[team.status] }}
                </van-tag>
                <span>{{ `队伍人数：${team.hasJoinNum} / ${team.maxNum}` }}</span>
            </template>
            <template #bottom>
                <div v-if="team.expireTime">{{ '过期时间：' + dateHandle(new Date(team.expireTime)) }}</div>
                <div>{{ '创建时间：' + dateHandle(new Date(team.createTime)) }}</div>
            </template>
            <template #footer>
                <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain @click="preJoinTeam(team)">加入队伍</van-button>
                <van-button v-if="team.userId === currentUser?.id" size="small" plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
                <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" type="danger" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
                <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>
            </template>
        </van-card>
        <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
            <van-field type="password" v-model="password" placeholder="请输入密码" />
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";
import {dateHandle} from "../common/formatDate.ts";

interface teamCardListProps {
    teamList: TeamType[];
}

const props = withDefaults(defineProps<teamCardListProps>(), {
    teamList: []
});

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
const currentUser = ref();

const router = useRouter();

onMounted(async () => {
    currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team : TeamType) => {
    joinTeamId.value = team.id
    if(team.status === 2) {
        showPasswordDialog.value = true
    } else {
        doJoinTeam()
    }
}

const doJoinCancel = () => {
    joinTeamId.value = 0
    password.value = ''
}

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async () => {
    const res = await myAxios.post('/team/join', {
        teamId: joinTeamId.value,
        password: password.value,
    });
    if (res?.code === 0) {
        Toast.success('加入成功');
        location.reload()
        doJoinCancel();
    } else {
        Toast.fail('加入失败' + (res.description ? `，${res.description}` : ''));
    }
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
    router.push({
        path: '/team/update',
        query: {
            id,
        }
    })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
    const res = await myAxios.post('/team/quit', {
        teamId: id
    });
    if (res?.code === 0) {
        Toast.success('操作成功');
        location.reload()
    } else {
        Toast.fail('操作失败' + (res.description ? `，${res.description}` : ''));
    }
}

/**
 * 删除队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
    const res = await myAxios.post('/team/delete', {
        teamId: id
    });
    if (res?.code === 0) {
        Toast.success('操作成功');
        location.reload()
    } else {
        Toast.fail('操作失败' + (res.description ? `，${res.description}` : ''));
    }
}

function time(date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    var h = date.getHours()
    h = h < 10 ? '0' + h : h
    var minute = date.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    var second = date.getSeconds()
    second = second < 10 ? '0' + second : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
    height: 128px;
    object-fit: unset;
}
</style>