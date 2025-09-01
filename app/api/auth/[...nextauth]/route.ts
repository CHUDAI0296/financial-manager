import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '../../../../lib/models/user';

// 配置NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // @ts-ignore - 忽略类型检查
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // 从数据库中获取用户
          const user = await getUserByEmail(credentials.email);
          
          // 如果用户不存在或没有密码
          if (!user || !user.password) {
            return null;
          }

          // 验证密码
          // @ts-ignore - 忽略类型检查
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            return null;
          }

          // 返回不包含密码的用户对象
          return {
            id: user._id ? user._id.toString() : '',
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    // @ts-ignore - 忽略类型检查
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    // @ts-ignore - 忽略类型检查
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 创建NextAuth处理程序
const handler = NextAuth(authOptions);

// 导出GET和POST处理函数
export { handler as GET, handler as POST }; 