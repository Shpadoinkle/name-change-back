// require('dotenv').config()
// var jwt = require('jsonwebtoken')
// import 'reflect-metadata'

// import {Container} from 'typedi'
// import * as TypeORM from 'typeorm'
// import * as TypeGraphQL from 'type-graphql'
// import {authChecker} from './auth'

// // Queries
// import UserQueriesResolver from './graphql/resolvers/queries/UserQueriesResolver'
// import UserFieldsResolver from './graphql/resolvers/fields/UserFieldsResolver'
// import NameQueriesResolver from './graphql/resolvers/queries/NameQueriesResolver'

// // Mutations
// import LoginMutationsResolver from './graphql/resolvers/mutations/LoginMutationsResolver'
// import SessionMutationsResolver from './graphql/resolvers/mutations/SessionMutationsResolver'
// import NameMutationsResolver from './graphql/resolvers/mutations/NameMutationsResolver'

// // Entities
// import User from './entities/User'
// import Name from './entities/Name'

// // Subscribers
// // import { EnquirySubscriber } from "./subscribers/enquiry";

// // Types
// import {Context} from './types/context'

// import {ApolloServer} from 'apollo-server-koa'

// const Koa = require('koa')
// const cors = require('@koa/cors')

// const app = new Koa()

// app.use(require('koa-bodyparser')())
// app.use(require('koa-logger')())

// app.use(
//   cors({
//     origin: '*',
//     credentials: true,
//     allowHeaders: ['Content-Type', 'Set-Cookie', 'Authorization', '*'],
//   })
// )

// // register 3rd party IOC container
// TypeORM.useContainer(Container)

// export async function bootstrap() {
//   try {
//     // create TypeORM connection
//     await TypeORM.createConnection({
//       type: 'postgres',
//       database: process.env.DATABASE_NAME,
//       username: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//       port: 5432,
//       host: process.env.DATABASE_HOST,
//       entities: [User, Name],
//       // subscribers: [EnquirySubscriber],
//       synchronize: true,
//       logger: 'advanced-console',
//       logging: 'all',
//       dropSchema: false,
//       cache: true,
//     })

//     // build TypeGraphQL executable schema
//     const schema = await TypeGraphQL.buildSchema({
//       resolvers: [
//         UserFieldsResolver,
//         UserQueriesResolver,
//         LoginMutationsResolver,
//         SessionMutationsResolver,
//         NameMutationsResolver,
//         NameQueriesResolver,
//       ],
//       container: Container,
//       authChecker,
//     })

//     // Create GraphQL server
//     const server = new ApolloServer({
//       schema,
//       context: async ({ctx, connection}) => {
//         // console.log("ctx", ctx);
//         // console.log("connection", connection);

//         if (connection) {
//           console.log('websocket context?', connection.context)
//           return connection.context
//         }

//         if (!ctx.request.header.authorization) {
//           return {}
//         }

//         let token = ctx.request.header.authorization
//           .replace('Bearer:', '')
//           .trim()

//         try {
//           let {user} = await jwt.verify(token, process.env.JWT_SECRET)
//           const ctx: Context = {user}
//           return ctx
//         } catch (err) {
//           console.log(err)
//           return {}
//         }

//         // if (connection) {
//         //   //console.log("websocket context?", connection.context);
//         //   return connection.context;
//         // }
//         //
//         // const { auth = {} } = ctx.state;
//         // const { user, disguise, sudo } = auth;
//         // return {
//         //   user: user && user.isAdmin ? disguise || user : user,
//         //   auth: { user, disguise, sudo },
//         //   request: ctx.request
//         // };
//       },

//       subscriptions: {
//         onConnect: async (connectionParams, webSocket, context) => {
//           // console.log(
//           //   "subscriptions onConnect connectionParams",
//           //   connectionParams
//           // );
//           // const { authToken } = connectionParams;
//           //
//           // if (authToken) {
//           //   try {
//           //     let decoded = await jwt.verify(authToken, process.env.JWT_SECRET);
//           //     console.log(decoded.user);
//           //     return { user: decoded.user };
//           //   } catch (err) {
//           //     console.log("verify error", err);
//           //     throw new Error("Missing auth token!");
//           //   }
//           // }
//           //
//           // throw new Error("Missing auth token!");
//         },
//         onDisconnect: (webSocket, context) => {
//           console.log('@@@@ WEBSOCKET DISCONNECTED @@@@')
//         },
//       },
//     })

//     const httpServer = app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
//       console.log(`🚀 Server ready at ${server.graphqlPath}`)
//       console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`)
//     })

//     server.applyMiddleware({app})
//     server.installSubscriptionHandlers(httpServer)
//   } catch (err) {
//     console.error(err)
//   }
// }
// bootstrap()
