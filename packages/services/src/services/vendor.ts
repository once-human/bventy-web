import { api } from "../api";

export interface VendorProfileRequest {
    business_name: string;
    category: string;
    city: string;
    bio: string;
    whatsapp_link: string;
    portfolio_image_url?: string;
}

export interface VendorProfile {
    id: string;
    business_name: string;
    slug: string;
    category: string;
    city: string;
    bio: string;
    whatsapp_link: string;
    profile_picture?: string;
    primary_profile_image_url?: string;
    verified: boolean;
    owner_full_name?: string;
    owner_profile_image?: string;
    // New fields
    portfolio_image_url?: string;
    gallery_images?: string[];
    portfolio_files?: any[]; // JSONB array
    average_rating: number;
    review_count: number;
    is_accepting_bookings: boolean;
    views_count?: number;
    password?: string;
    owner_user_id?: string;
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    organizer_name: string;
    profile_image?: string;
    reply_text?: string;
    replied_at?: string;
    helpful_count: number;
    is_public: boolean;
}

export interface TentativeHold {
    id: string;
    title: string;
    status: string;
    expires_in: string;
    created_at: string;
}

export interface UpcomingBooking {
    id: string;
    title: string;
    event_date: string;
    status: string;
}

export interface VendorOverviewStats {
    urgent_requests: number;
    pending_responses: number;
    avg_response_time: number;
    upcoming_bookings: UpcomingBooking[];
    profile_views: number;
    tentative_holds: TentativeHold[];
    is_accepting_bookings: boolean;
}

export interface CalendarEvent {
    id: string;
    title: string;
    start_time: string;
    end_time: string;
    is_all_day: boolean;
    type: string;
    details?: string;
}

export interface ManualLeadPayload {
    event_title: string;
    event_date: string;
    event_type?: string;
    organizer: string;
    budget?: string;
    notes?: string;
    contact_info?: string;
}

export interface VendorServiceItem {
    id: string;
    name: string;
    base_price: number;
    price_unit: string;
    status: string;
    description: string;
}

export interface VendorPricingRules {
    weekend_premium_enabled: boolean;
    weekend_premium_percentage: number;
    last_minute_booking_enabled: boolean;
    last_minute_booking_percentage: number;
    last_minute_days: number;
}

export interface VendorCancellationPolicy {
    policy_type: string;
    strictness_level: 'flexible' | 'moderate' | 'strict' | 'custom';
    time_frame_days: number;
    refund_percentage: number;
    custom_text: string;
}

export interface VendorServiceArea {
    id: string;
    name: string;
}

export interface PublicVendorDetails {
    services: {
        name: string;
        price: number;
        unit: string;
        description: string;
    }[];
    pricing_rules: VendorPricingRules;
    cancellation_policy: {
        type: string;
        strictness_level: string;
        time_frame_days: number;
        refund_percentage: number;
        text: string;
    };
    service_areas: string[];
}

export const vendorService = {
    createProfile: async (data: VendorProfileRequest): Promise<void> => {
        await api.post("/vendor/onboard", data);
    },
    updateProfile: async (data: Partial<VendorProfileRequest> & { gallery_images?: string[]; portfolio_files?: any[] }): Promise<void> => {
        await api.put("/vendor/me", data);
    },
    getVendors: async (): Promise<VendorProfile[]> => {
        const response = await api.get<VendorProfile[]>("/vendors");
        return response.data || [];
    },
    getVendorBySlug: async (slug: string): Promise<VendorProfile> => {
        const response = await api.get<VendorProfile>(`/vendors/slug/${slug}`);
        const data = response.data;
        // Ensure arrays are initialized if null
        if (!data.gallery_images) data.gallery_images = [];
        if (!data.portfolio_files) data.portfolio_files = [];
        return data;
    },
    getMyProfile: async (): Promise<VendorProfile> => {
        const response = await api.get<VendorProfile>("/vendor/me");
        const data = response.data;
        // Ensure arrays are initialized if null
        if (!data.gallery_images) data.gallery_images = [];
        if (!data.portfolio_files) data.portfolio_files = [];
        return data;
    },
    getVendorReviews: async (vendorId: string, params?: { rating?: number; has_reply?: boolean; sort?: string }): Promise<Review[]> => {
        const queryParams = new URLSearchParams();
        if (params?.rating) queryParams.append("rating", params.rating.toString());
        if (params?.has_reply !== undefined) queryParams.append("has_reply", params.has_reply.toString());
        if (params?.sort) queryParams.append("sort", params.sort);

        const response = await api.get<Review[]>(`/vendors/${vendorId}/reviews?${queryParams.toString()}`);
        return response.data || [];
    },
    likeReview: async (reviewId: string): Promise<void> => {
        await api.post(`/reviews/${reviewId}/like`);
    },
    replyToReview: (reviewId: string, replyText: string) => {
        return api.post(`/reviews/${reviewId}/reply`, { reply_text: replyText });
    },
    getVendorPerformance: () => {
        return api.get("/vendor/performance").then((res) => res.data);
    },
    submitReview: async (vendorId: string, rating: number, comment: string, quoteId?: string): Promise<void> => {
        await api.post(`/vendors/${vendorId}/reviews`, { rating, comment, quote_id: quoteId });
    },
    checkReviewEligibility: async (vendorId: string): Promise<{ eligible: boolean }> => {
        const response = await api.get<{ eligible: boolean }>(`/vendors/${vendorId}/reviews/eligibility`);
        return response.data;
    },
    getOverviewStats: async (): Promise<VendorOverviewStats> => {
        const response = await api.get<VendorOverviewStats>("/vendor/overview");
        return response.data;
    },
    getCalendarEvents: async (startDate: string, endDate: string): Promise<CalendarEvent[]> => {
        const response = await api.get<CalendarEvent[]>(`/vendor/calendar/events?start_date=${startDate}&end_date=${endDate}`);
        return response.data || [];
    },
    createManualBlock: async (data: { title: string; start_time: string; end_time: string; is_all_day: boolean }): Promise<void> => {
        await api.post("/vendor/calendar/blocks", data);
    },
    deleteManualBlock: async (id: string): Promise<void> => {
        await api.delete(`/vendor/calendar/blocks/${id}`);
    },
    confirmHold: async (id: string): Promise<void> => {
        await api.patch(`/quotes/vendor/confirm/${id}`);
    },
    rejectHold: async (id: string): Promise<void> => {
        await api.patch(`/quotes/vendor/reject/${id}`);
    },

    getQuoteDetail: async (id: string): Promise<any> => {
        const { data } = await api.get(`/quotes/${id}`);
        return data;
    },

    updateInternalNotes: async (id: string, notes: string): Promise<void> => {
        await api.patch(`/quotes/${id}/notes`, { notes });
    },
    createManualLead: async (data: ManualLeadPayload): Promise<{ quote_id: string }> => {
        const response = await api.post<{ quote_id: string }>("/quotes/manual", data);
        return response.data;
    },
    updateVendorProfile: async (data: Partial<VendorProfile>): Promise<void> => {
        await api.put("/vendor/me", data);
    },

    // Services & Pricing
    getServices: async (): Promise<VendorServiceItem[]> => {
        const response = await api.get<VendorServiceItem[]>("/vendor/services");
        return response.data || [];
    },
    addService: async (service: Omit<VendorServiceItem, 'id'>): Promise<void> => {
        await api.post("/vendor/services", service);
    },
    updateService: async (id: string, service: Partial<VendorServiceItem>): Promise<void> => {
        await api.put(`/vendor/services/${id}`, service);
    },
    deleteService: async (id: string): Promise<void> => {
        await api.delete(`/vendor/services/${id}`);
    },
    getPricingRules: async (): Promise<VendorPricingRules> => {
        const response = await api.get<VendorPricingRules>("/vendor/pricing-rules");
        return response.data;
    },
    updatePricingRules: async (rules: Partial<VendorPricingRules>): Promise<void> => {
        await api.put("/vendor/pricing-rules", rules);
    },
    getCancellationPolicy: async (): Promise<VendorCancellationPolicy> => {
        const response = await api.get<VendorCancellationPolicy>("/vendor/cancellation-policy");
        return response.data;
    },
    updateCancellationPolicy: async (policy: VendorCancellationPolicy): Promise<void> => {
        await api.put("/vendor/cancellation-policy", policy);
    },
    getServiceAreas: async (): Promise<VendorServiceArea[]> => {
        const response = await api.get<VendorServiceArea[]>("/vendor/service-areas");
        return response.data || [];
    },
    addServiceArea: async (areaName: string): Promise<void> => {
        await api.post("/vendor/service-areas", { area_name: areaName });
    },
    deleteServiceArea: async (id: string): Promise<void> => {
        await api.delete(`/vendor/service-areas/${id}`);
    },
    getPublicVendorDetails: async (slug: string): Promise<PublicVendorDetails> => {
        const response = await api.get<PublicVendorDetails>(`/vendors/slug/${slug}/details`);
        return response.data;
    }
}
