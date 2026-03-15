import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { broadbandPackageData } from '../../../data/boardband';
import { monthlyPackages } from '../../../data/monthly';
import { topupPackages } from '../../../data/topup';
import { solarcellPackages } from '../../../data/solar';

export async function GET() {
  try {
    console.log('Seeding promotions via API...');
    await prisma.promotion.deleteMany({});

    let totalSeeded = 0;

    // 1. Seed Broadband Data
    for (const pkg of broadbandPackageData) {
      await prisma.promotion.create({
        data: {
          type: 'broadband',
          categoryName: pkg.header_theme === 'netflix' ? 'Netflix' : pkg.header_theme === 'youtube' ? 'YouTube' : 'ทั่วไป',
          name: pkg.name,
          price: pkg.price,
          speed: pkg.download_speed && pkg.upload_speed ? `${pkg.download_speed}/${pkg.upload_speed} ${pkg.speed_unit || 'Mbps'}` : null,
          priceNote: pkg.price_note,
          validity: pkg.contract_months ? `${pkg.contract_months}` : null,
          imageUrl: null,
          promoBadge: pkg.promo_badge,
          perks: pkg.perks || [],
          details: pkg.freebies || [],
          status: pkg.is_active,
          displayOrder: pkg.display_order || 0
        }
      });
      totalSeeded++;
    }

    // 2. Seed Monthly Data
    for (const pkg of monthlyPackages) {
      let categoryName = "เปิดเบอร์ใหม่";
      if (pkg.category_id === 2) categoryName = "ย้ายค่ายเบอร์เดิม";
      if (pkg.category_id === 3) categoryName = "เปลี่ยนเติมเงินเป็นรายเดือน";
      if (pkg.category_id === 4) categoryName = "ลูกค้าปัจจุบัน";
      if (pkg.category_id === 5) categoryName = "แพ็กเกจเสริม";

      await prisma.promotion.create({
        data: {
          type: 'monthly',
          categoryName,
          name: pkg.name,
          price: pkg.price,
          speed: pkg.speed,
          priceNote: pkg.price_note,
          promoBadge: pkg.promo_badge,
          perks: pkg.perks || [],
          status: pkg.is_active !== false,
          displayOrder: pkg.display_order || 0
        }
      });
      totalSeeded++;
    }

    // 3. Seed Topup Data
    for (const pkg of topupPackages) {
      let categoryName = "เปิดเบอร์ใหม่";
      if (pkg.category_id === 2) categoryName = "ย้ายค่ายเบอร์เดิม";
      if (pkg.category_id === 3) categoryName = "แพ็กเกจเสริม";

      await prisma.promotion.create({
        data: {
          type: 'topup',
          categoryName,
          name: pkg.name,
          price: pkg.price,
          speed: pkg.speed,
          priceNote: pkg.price_note,
          perks: pkg.perks || [],
          status: pkg.is_active !== false,
          displayOrder: pkg.display_order || 0
        }
      });
      totalSeeded++;
    }

    // 4. Seed Solar Data
    for (let i = 0; i < solarcellPackages.length; i++) {
        const pkg = solarcellPackages[i];
        if (pkg) {
            await prisma.promotion.create({
                data: {
                type: 'solar',
                categoryName: pkg.pack,
                name: pkg.title,
                price: parseFloat(pkg.price.replace(/,/g, '')),
                speed: pkg.description,
                priceNote: pkg.discount_price,
                perks: [
                    { text: pkg.solarcell },
                    { text: pkg.arae },
                    { text: pkg.scope },
                    { text: pkg.karantee },
                ],
                details: [
                    { key: 'discount_price', value: pkg.discount_price }
                ],
                status: true,
                displayOrder: i + 1
                }
            });
            totalSeeded++;
        }
      }

    return NextResponse.json({ message: `Successfully seeded ${totalSeeded} promotions.` });
  } catch (error: any) {
    console.error('API Seeding Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
