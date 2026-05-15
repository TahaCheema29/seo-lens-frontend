import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { subscriptionService } from "./subscriptionService"
import { useCurrentUser } from "@/services/auth/authQuery"
import type { Subscription, CheckoutSessionResponse } from "@/types/subscription"

export const subscriptionKeys = {
  all: ["subscription"] as const,
  detail: (userId: string | undefined) => [...subscriptionKeys.all, "detail", userId] as const,
}

export function useSubscription() {
  const { data: user } = useCurrentUser()
  
  return useQuery<Subscription, Error>({
    queryKey: subscriptionKeys.detail(user?.id),
    queryFn: () => subscriptionService.getSubscription(),
    enabled: !!user?.id, // Only fetch when user is logged in
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
