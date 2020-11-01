// import {
//   EntitySubscriberInterface,
//   EventSubscriber,
//   InsertEvent
// } from "typeorm";

// import { Enquiry } from "../entities/enquiry";

// import { User } from "../entities/user";
// import { Listing } from "../entities/listing";

// import * as Emailer from "../emailer";

// @EventSubscriber()
// export class EnquirySubscriber implements EntitySubscriberInterface<Enquiry> {
//   /**
//    * Indicates that this subscriber only listen to Enquiry events.
//    */
//   listenTo() {
//     return Enquiry;
//   }

//   //  after an enquiry is inserted
//   async afterInsert(event: InsertEvent<Enquiry>) {
//     // console.log(`AFTER ENQUIRY INSERTED: `, event.entity);

//     const enquiry = event.entity;

//     // get listing and its owner
//     let listing = await event.manager
//       .getRepository(Listing)
//       .findOne((await event.entity.listing).id, { relations: ["owner"] });

//     // need to await because its lazy
//     const owner = await listing.owner;

//     //  Send enquiry email to listing owner
//     await Emailer.listingEnquiry({
//       enquiry,
//       listing,
//       owner
//     });
//   }
// }
