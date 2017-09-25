import Main from './views/home.vue'
import NotFound from './views/404.vue'
import ZhGl from './views/qxfp/zhgl.vue'
import JgGl from './views/qxfp/jggl.vue'
import YhzGl from './views/qxfp/yhzgl.vue'
import JsGl from './views/qxfp/jsgl.vue'
import YhGl from './views/qxfp/yhgl.vue'
import LogGl from './views/rzgl/log.vue'
import SubSysGl from './views/zxtgl/subSys.vue'
import ParamGl from './views/csgl/params.vue'

let routes = [{
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
},{
    path: '/',
    component: Main,
    redirect: '/zhgl',
    name: '权限分配',
    iconCls: 'iconfont icon-permmison',
    children: [{
        path: '/zhgl',
        component: ZhGl,
        name: '租户管理'
    }, {
        path: '/jggl',
        component: JgGl,
        name: '机构管理'
    }, {
        path: '/yhzgl',
        component: YhzGl,
        name: '用户组管理'
    }, {
        path: '/jsgl',
        component: JsGl,
        name: '角色管理'
    }, {
        path: '/yhgl',
        component: YhGl,
        name: '用户管理'
    }]
}, {
    path: '/',
    component: Main,
    name: '',
    iconCls: 'iconfont icon-subsys',
    leaf: true,
    children: [{
        path: '/subsysgl',
        component: SubSysGl,
        name: '子系统管理'
    }]
}, {
    path: '/',
    component: Main,
    name: '',
    iconCls: 'iconfont icon-param',
    leaf: true,
    children: [{
        path: '/paramPage',
        component: ParamGl,
        name: '参数管理'
    }]
}, {
    path: '/',
    component: Main,
    name: '',
    iconCls: 'iconfont icon-log',
    leaf: true,
    children: [{
        path: '/rzgl',
        component: LogGl,
        name: '日志管理'
    }]
}, {
    path: '*',
    hidden: true,
    redirect: {
        path: '/404'
    }
}];

export default routes;