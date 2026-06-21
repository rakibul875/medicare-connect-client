import { handelPost } from "../action/serverPost"

export const handelPostSubscriptionData =async (subscriptionData) => {
 return handelPost(`/subscription`,subscriptionData)
}

