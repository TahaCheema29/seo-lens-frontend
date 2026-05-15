import { axiosInstance, ENDPOINTS } from "@/config/apiConfig"
import type { Subscription, CheckoutSessionResponse, SubscriptionStatusResponse } from "@/types/subscription"

export const subscriptionService = {
  async getSubscription(): Promise<Subscription> {
    const response = await axiosInstance.get<SubscriptionStatusResponse>(
      ENDPOINTS.payments.subscription
    )
    return response.data.data
  },

  async createCheckoutSession(): Promise<CheckoutSessionResponse> {
    const response = await axiosInstance.post<{
      status: boolean
      message: string
      data: CheckoutSessionResponse
    }>(ENDPOINTS.payments.checkout)
    return response.data.data
  },
}
