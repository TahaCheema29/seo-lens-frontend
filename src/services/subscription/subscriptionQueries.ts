import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { subscriptionService } from "./subscriptionService"
import type { Subscription, CheckoutSessionResponse } from "@/types/subscription"

export const subscriptionKeys = {
  all: ["subscription"] as const,
  detail: () => [...subscriptionKeys.all, "detail"] as const,
}

export function useSubscription() {
  return useQuery<Subscription, Error>({
    queryKey: subscriptionKeys.detail(),
    queryFn: () => subscriptionService.getSubscription(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

export function useIsPro() {
  const { data: subscription, isLoading } = useSubscription()
  return {
    isPro: subscription?.isPro ?? false,
    isLoading,
    subscription,
  }
}

export function useCreateCheckout() {
  const queryClient = useQueryClient()

  return useMutation<CheckoutSessionResponse, Error>({
    mutationFn: () => subscriptionService.createCheckoutSession(),
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    },
  })
}
