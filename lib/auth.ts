import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// もしGoogle等も使うなら import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  // JWTモードを使う
  session: { strategy: "jwt" },

  // NextAuth用のsecret
  // (envファイルや本番環境で process.env.NEXTAUTH_SECRET として管理)
  secret: process.env.NEXTAUTH_SECRET,

  // OAuthプロバイダ設定
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // GoogleProvider({ ... })
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      // 初回ログイン時にOAuth情報をtokenに格納する
      if (account && profile) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
        token.email = profile.email;
        token.name = profile.name || profile.email?.split("@")[0];
        token.picture = profile.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // session.user に必要な情報を格納
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
          image: token.picture,
          provider: token.provider,
          providerAccountId: token.providerAccountId,
        };
      }
      return session;
    },
  },
};
