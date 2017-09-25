<template>
	<el-row class="container">
		<!-- 头部开始 -->
		<div class="header">
			<el-col :span="24">
				<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
					<img src="../assets/company-log.png" height="50" width="270">
				</el-col>
				<el-col :span="14">
					<div class="tools" @click.prevent="collapse">
						<i class="fa fa-align-justify"></i>
					</div>
				</el-col>
			</el-col>
		</div>
		<el-col :span="24" class="main-wrapper">
			<!-- 侧边栏 -->
				
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--展开折叠开关-->
		        <div class="menu-toggle" @click.prevent="collapse">
		          <i class="iconfont icon-menu-expand" v-show="!collapsed"></i>
		          <i class="iconfont icon-menu-collapse" v-show="collapsed"></i>
		        </div>
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo my-el-menu" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				 <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul> 
			</aside>

				
			<!-- 切换视图 -->
			<section  class="main-content">
				<el-col :span="24" class="breadcrumb-container current-location">
						<b class="title">首页</b>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
				<transition name="fade">
	              <router-view class="view"></router-view>
	            </transition>
			</section>
		</el-col>			
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'admin',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: ''
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			

		}
	}

</script>

<style>
	*{
		margin:0;
		padding: 0;
	}
	.header{
		height:60px;
		background: url(../assets/back.png) repeat-y;
	}
	.my-el-menu{
		overflow: hidden;
		width:180px !important;
	}
	.main-content{
		padding: 10px;
	}
	.el-menu .iconfont{
    vertical-align: baseline;
    margin-right: 6px;
    } 
    .logo{
    	padding-top: 5px;
		padding-left: 20px;
    }
  .current-location{
  	height:40px;
  	line-height:40px;
  	margin-bottom:15px;
  }
</style>
<style scoped lang="scss">
   .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;  
    .main-wrapper {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
    }
    aside {
      flex: 0 0 180px;
      width: 180px;
      .el-menu {
        height: 100%;
        border-radius: 0px;
      }
      .collapsed {
        width: 50px;
        .submenu {
          position: absolute;
          top: 0px;
          left: 50px;
          z-index: 9999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 50px;
      width: 50px;
      overflow:hidden;
    }
    .menu-expanded {
      flex: 0 0 180px;
      width: 180px;
    }
    .menu-toggle {
      text-align: center;
      height: 26px;
      line-height: 30px;
    }
    .main-content {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      .breadcrumb-container {					
		.title {
			width: 40px;
			float: left;
			color: #475669;
		}
		.breadcrumb-inner {
			height:40px;
			line-height:40px;
		}
	}
    .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>