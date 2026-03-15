export {
  monthlyBanner as bannerMonthy,
  monthlyBannerMobile as bannerMonthyMobile,
  PromotionMonthyUpspeed,
  PromotionMonthyNolimit,
  PromotionMonthySocial,
  PromotionMonthyCall,
  PromotionMonthyAsianCombo,
  PromotionMonthyComboplus,
  PromotionMonthyViu,
  PromotionMonthyIqiyi,
  PromotionMonthyWeTV,
  PromotionInsuranceCumulative,
  PromotionFreeAcidentInsurance,
  PromotionConsultcoupon,
  PromotionWhoscall,
  PromotionGame,
  PromotionCouponLiftstyle,
} from "@/src/data/monthly";

import { monthlyBanner as bannerMonthy, monthlyBannerMobile as bannerMonthyMobile } from "@/src/data/monthly";

export default function BannerMonthy() {
    return (
        <div className="relative w-full h-full">
            <picture>
                <source
                    media="(max-width: 768px)"
                    srcSet={
                        bannerMonthyMobile.find(
                            (b) => b.id === b.id
                        )?.image
                    }
                />
                <img
                    src={bannerMonthy[0]?.image}
                    alt={`bannerMonthy 1`}
                    className="w-full object-cover h-full"
                />
            </picture>
        </div>
    );
}
