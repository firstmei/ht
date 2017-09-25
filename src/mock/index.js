/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUsers, Users,JgGlList} from './data/user'

let _Users = Users

let _JgGlList = JgGlList

export default {

  init () {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 登录
    mock.onPost('/login').reply(arg => {
      let {username, password} = JSON.parse(arg.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              delete user.password
              return true
            }
          })

          if (hasUser) {
            resolve([200, {code: 200, msg: '请求成功', user}])
          } else {
            resolve([200, {code: 500, msg: '账号或密码错误'}])
          }
        }, 1000)
      })
    }) 

    // 获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }])
        }, 500)
      })
    })
    mock.onGet('/jgGl/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _JgGlList.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false
        return true
      })
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
          	total: total,
            JgGlList: mockUsers
          }])
        }, 500)
      })
    })
      
    // 删除用户
    mock.onGet('/book/delete').reply(config => {
      let {id} = config.params
      _Books = _Books.filter(b => b.id !== id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })  
     //权限管理 机构管理 新增用户
    mock.onGet('/user/add').reply(config => {
	      let { id,name, address,date} = config.params;
	      if(id){
	      	_JgGlList.some(u => {
		        if (u.id === id) {
		          u.name = name;
		          u.address = address;
		          u.date = date;
		          return true;
		        }
		      });
		      return new Promise((resolve, reject) => {
		        setTimeout(() => {
		          resolve([200, {
		            code: 200,
		            msg: '编辑成功'
		          }]);
		        }, 500);
		      });
	      }else{
	      		JgGlList.push({
			        name: name,
			        address: address,
			        date: date
			      });
		      return new Promise((resolve, reject) => {
		        setTimeout(() => {
		          resolve([200, {
		            code: 200,
		            msg: '新增成功'
		          }]);
		        }, 500);
		      });
	      }
	     
    });

     //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _JgGlList = _JgGlList.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

     //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _JgGlList = _JgGlList.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });  

  }

}
