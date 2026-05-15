export interface Subscription {
  tier: 'standard' | 'pro'
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  isPro: boolean
  canAccessProFeatures: boolean
  isLifetime: boolean
}

export interface CheckoutSessionResponse {
  checkoutUrl: string
  sessionId: string
}

export interface SubscriptionStatusResponse {
  status: boolean
  message: string
  data: {
    tier: 'standard' | 'pro'
    status: 'active' | 'canceled' | 'past_due' | 'unpaid'
    isPro: boolean
    canAccessProFeatures: boolean
    isLifetime: boolean
  }
}
