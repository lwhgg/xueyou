// 定义一些路由
import TeamPage from "../pages/TeamPage.vue";
import Index from "../pages/Index.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', title: '找队伍', component: TeamPage },
    { path: '/user', title: '用户信息', component: UserPage },
    { path: '/user/update', title: '更新用户信息', component: UserUpdatePage },
    { path: '/user/team/join', title: '加入队伍列表', component: UserTeamJoinPage },
    { path: '/user/team/create', title: '创建队伍列表', component: UserTeamCreatePage },
    { path: '/search', title: '找伙伴', component: SearchPage },
    { path: '/user/list', title: '用户列表', component: SearchResultPage },
    { path: '/user/edit', title: '编辑用户信息', component: UserEditPage },
    { path: '/user/login', title: '登录', component: UserLoginPage },
    { path: '/user/register', title: '注册', component: UserRegisterPage },
    { path: '/team/add', title: '创建队伍', component: TeamAddPage },
    { path: '/team/update', title: '更新队伍信息', component: TeamUpdatePage }
]
export default routes;
