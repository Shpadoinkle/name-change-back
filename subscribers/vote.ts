// import {
//     EventSubscriber,
//     EntitySubscriberInterface,
//     InsertEvent,
//     // RemoveEvent,
//     // UpdateEvent,
//   } from 'typeorm'
//   import {Vote} from '../entities/vote'
//   import {User} from '../entities/user'
// //   import Expo from 'expo-server-sdk'

//   @EventSubscriber()
//   export class VoteSubscriber implements EntitySubscriberInterface<Vote> {
//     listenTo() {
//       return Vote
//     }

//     async afterInsert(event: InsertEvent<Vote>) {
//       let voter = await event.manager
//         .getRepository(User)
//         .findOne((await event.entity.owner).id)

//       const user = await event.entity.receiver
//       if (await user.rejectsNotification(2)) {
//         return
//       }
//       let userDevices = (await user.devices) || []
//       if (userDevices.length > 0) {
//         const expoToken = userDevices[0].token

//         if (Expo.isExpoPushToken(expoToken)) {
//           let expo = new Expo()
//           let messages = []
//           messages.push({
//             to: expoToken,
//             sound: 'default',
//             body: `${fromUser.name} sent you a new referral`,
//             data: {
//               type: 'referralRequest',
//               title: `${fromUser.name} sent you a new referral`,
//               referral: event.entity,
//               sender: fromUser,
//             },
//           })
//           expo.sendPushNotificationsAsync(messages)
//         }
//       }
//     }
//   }
