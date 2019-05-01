import Axios from '../util/http';
import { UserInfo } from '../interface/user.interface';
import { NoteInfo } from '../interface/note.interface';

/**
 * 由于使用了GraphQL, 按照每一个页面，创建请求的的函数
 */

/**
 * 获取首页的信息
 */
export async function getHomeInfo(pagestart: number = 1, pagesize: number = 10): Promise<any> {
  try {
    const { data } = await Axios.post('/graphql', {
      query: `
        query getHomeInfo {
          users(pagestart: ${pagestart}, pagesize: ${pagesize}) {
            data {
              id
              name
              createDate
            }
          }
        }
      `,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * 获取个人详情页的数据
 */
export async function getAboutInfo(id: string): Promise<any> {
  try {
    const { data } = await Axios.post('/graphql', {
      query: `
        query getAboutInfo {
          user(id: "${id}") {
            data {
              name
              createDate
            }
          }
          notes(uId: "${id}") {
            data {
              id
              title
              detail
            }
          }
        }
      `,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(userinfo: UserInfo): Promise<string> {
  try {
    const { name, password } = userinfo;
    const { data: { login: { token } } } = await Axios.post('/graphql', {
      query: `
        mutation LoginUser {
          login(user: {
            name: "${name}",
            password: "${password}"
          }) {
            token
          }
        }
      `,
    });
    return token;
  } catch (error) {
    throw error;
  }
}

export async function createNote(note: NoteInfo): Promise<any> {
  try {
    const { title, detail, uId } = note;
    const { data } = await Axios.post('/graphql', {
      query: `
        mutation AddNote {
          addNote(note: {
            title: "${title}",
            detail: "${detail}",
            uId: "${uId}"
          }) {
            code
          }
        }
      `,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
