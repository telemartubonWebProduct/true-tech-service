"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";


const TermsAndPrivacyClient: React.FC = () => {
  return (
    <div>
      <Container className="my-10 mx-auto p-6 md:p-10 bg-white shadow-md rounded-xl">
        <Box className="mb-10 text-center">
          <Typography
            fontFamily={"Prompt"}
            color="primary"
            variant="h4"
            className="font-bold mb-3"
          >
            ข้อตกลงและเงื่อนไขการให้บริการ (Terms of Service)
          </Typography>
          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            color="textSecondary"
            className="font-semibold"
          >
            และ นโยบายความเป็นส่วนตัว (Privacy Policy)
          </Typography>
          <Typography
            fontFamily={"Prompt"}
            variant="body2"
            color="textSecondary"
            className="mt-4"
          >
            แก้ไขและมีผลบังคับใช้ล่าสุดเมื่อ: {new Date().toLocaleDateString("th-TH", { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>

        {/* ----------------------------------------------------------- */}
        {/* ส่วนที่ 1: ข้อตกลงและเงื่อนไขการให้บริการ (Term of Service) */}
        {/* ----------------------------------------------------------- */}
        <Box className="mb-12 text-gray-800">
          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-6 pb-2 border-b-2 border-red-500 inline-block"
            color="primary"
          >
            ส่วนที่ 1: ข้อตกลงและเงื่อนไขการให้บริการ
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            1. การยอมรับเงื่อนไข
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-6 leading-relaxed">
            ยินดีต้อนรับสู่เว็บไซต์ของเรา ซึ่งบริหารและดำเนินการโดย <strong>บริษัท เทเลมาร์ท คอมมิวนิเคชั่น จำกัด (ตัวแทนจำหน่ายที่ได้รับการแต่งตั้งอย่างเป็นทางการ หรือ Authorized Dealer)</strong> เว็บไซต์นี้เป็นแพลตฟอร์มสำหรับการแนะนำ การให้ข้อมูล และบริการที่เกี่ยวข้องกับอินเทอร์เน็ต โซล่าเซลล์ และบริบทอื่นที่เกี่ยวข้อง การที่ท่านเข้าถึง ใช้งาน หรือเยี่ยมชมเว็บไซต์นี้ ถือว่าท่านได้อ่าน ทำความเข้าใจ และยอมรับข้อตกลงและเงื่อนไขทั้งหมดที่ระบุไว้ในหน้านี้อย่างไม่มีเงื่อนไข หากท่านไม่ยอมรับเงื่อนไขประการใดประการหนึ่ง โปรดงดเว้นการใช้งานเว็บไซต์นี้โดยทันที
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            2. ขอบเขตการให้บริการ
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-6 leading-relaxed">
            ข้อมูล คำแนะนำ ตลอดจนเนื้อหาที่ปรากฏบนเว็บไซต์ มีวัตถุประสงค์เพื่อสนับสนุนการตัดสินใจในการเลือกใช้สินค้าหรือบริการของผู้ใช้งานเท่านั้น การนำเสนอข้อมูลไม่ใช่ข้อเสนอผูกมัดทางกฎหมาย เราขอสงวนสิทธิ์โดยชอบธรรมในการแก้ไข เปลี่ยนแปลง ปรับปรุง อัปเดต ถอดถอน หรือยกเลิกบริการใด ๆ บนเว็บไซต์ได้ตลอดเวลาโดยมิต้องแจ้งให้ทราบล่วงหน้า
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            3. ความรับผิดชอบของผู้ใช้งาน
          </Typography>
          <List className="mb-6 list-decimal pl-5">
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ผู้ใช้งานต้องรับผิดชอบในการพิจารณาและตรวจสอบความถูกต้อง สมบูรณ์ และความเหมาะสมของข้อมูลก่อนการตัดสินใจทำธุรกรรมใด ๆ" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ผู้ใช้งานตกลงที่จะไม่ใช้แพลตฟอร์มนี้เพื่อกิจกรรมที่ผิดกฎหมาย ละเมิดสิทธิผู้อื่น ขัดต่อความสงบเรียบร้อยหรือศีลธรรมอันดีของประชาชน หรือการกระทำใดที่ก่อให้เกิดความเสียหายต่อระบบคอมพิวเตอร์ของเราและบุคคลภายนอก" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ห้ามมิให้ผู้ใช้งานทำการเจาะระบบ (Hack) แทรกแซงการทำงาน หรือใช้โปรแกรมอัตโนมัติ (เช่น Bot, Spider) เพื่อดึงข้อมูล หรือกระทำการใดอันส่งผลกระทบต่อเสถียรภาพของเว็บไซต์" />
            </ListItem>
          </List>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            4. ลิขสิทธิ์และทรัพย์สินทางปัญญา
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-6 leading-relaxed">
            เนื้อหาทั้งหมดของเว็บไซต์ รวมถึงแต่ไม่จำกัดเพียง ข้อความ รูปภาพ กราฟิก โลโก้ ไอคอน ซอฟต์แวร์ โค้ดคอมพิวเตอร์ และการออกแบบเว็บไซต์ เป็นทรัพย์สินทางปัญญาของเรา หรือเครือข่ายพันธมิตร (เช่น True Corporation) ซึ่งได้รับความคุ้มครองตามพระราชบัญญัติลิขสิทธิ์ และกฎหมายทรัพย์สินทางปัญญาสากล ห้ามมิให้ผู้ใดทำซ้ำ ดัดแปลง ลอกเลียนแบบ หรือจัดจำหน่าย ไม่ว่าส่วนหนึ่งส่วนใดหรือทั้งหมด โดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษร
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            5. การปฏิเสธและจำกัดความรับผิด
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-6 leading-relaxed">
            แพลตฟอร์มละเนื้อหาทั้งหมดจัดทำขึ้นตาม &quot;สภาพที่เป็นอยู่&quot; (As Is) และ &quot;ตามที่มีอยู่&quot; (As Available) เราพยายามอย่างที่สุดเพื่อให้ข้อมูลมีความถูกต้อง แต่ไม่รับประกันในความสมบูรณ์แบบปราศจากข้อผิดพลาด ในทุกกรณีที่เป็นไปตามกฎหมายสูงสุด บริษัท กรรมการ พนักงาน หรือตัวแทน จะไม่รับผิดชอบต่อความเสียหายทางตรง ทางอ้อม หรือความเสียหายพิเศษใด ๆ อันเป็นผลจากการเข้าถึงใช้งาน ข้อมูลขัดข้อง หรือการพึ่งพาเนื้อหาของเว็บไซต์
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            6. กฎหมายที่ใช้บังคับ
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-6 leading-relaxed">
            ข้อตกลงและเงื่อนไขฉบับนี้ให้ถูกควบคุม ตีความ และอยู่ภายใต้บังคับของกฎหมายแห่งราชอาณาจักรไทย และข้อพิพาทใด ๆ ที่เกิดขึ้นเกี่ยวกับบริการนี้จะอยู่ในขอบเขตอำนาจศาลของประเทศไทย
          </Typography>
        </Box>

        {/* ----------------------------------------------------------- */}
        {/* ส่วนที่ 2: นโยบายความเป็นส่วนตัว (Privacy Policy) */}
        {/* ----------------------------------------------------------- */}
        <Box className="mb-10 text-gray-800">
          <Typography
            fontFamily={"Prompt"}
            variant="h5"
            className="font-semibold mb-6 pb-2 border-b-2 border-red-500 inline-block"
            color="primary"
          >
            ส่วนที่ 2: นโยบายความเป็นส่วนตัว (Privacy Policy)
          </Typography>

          <Typography fontFamily={"Prompt"} variant="body1" className="mb-6 leading-relaxed">
            เราตระหนักถึงความสำคัญและเคารพสิทธิความเป็นส่วนตัวของท่านอย่างสูงสุด นโยบายฉบับนี้ออกแบบมาเพื่อให้สอดคล้องกับ <strong>พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (Personal Data Protection Act - PDPA)</strong> ของประเทศไทย ตลอดจนมาตรฐานสากล เช่น <strong>General Data Protection Regulation (GDPR)</strong> เพื่อสร้างความโปร่งใสในกระบวนการจัดเก็บ ประมวลผล ใช้ และปกป้องข้อมูลส่วนบุคคลของท่าน
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            1. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-2 leading-relaxed">
            เราจะทำการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านที่จำเป็นต่อการให้บริการ โดยอาจแบ่งออกเป็นประเภทต่าง ๆ ดังนี้:
          </Typography>
          <List className="mb-6 list-disc pl-5">
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ข้อมูลระบุตัวตนและติดต่อ (Identity and Contact Data): เช่น ชื่อ-นามสกุล, เบอร์โทรศัพท์, อีเมล, ที่อยู่, รวมถึงบัญชีโซเชียลมีเดียเมื่อท่านติดต่อเรา" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ข้อมูลทางเทคนิค (Technical Data): เช่น หมายเลข IP Address, ประเภทและเวอร์ชันของเบราว์เซอร์, ข้อมูลคุกกี้ (Cookies), ข้อมูลการวิเคราะห์ (Analytics Data), ประวัติการเข้าชม (Log Data)" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ข้อมูลการใช้งาน (Usage Data): ข้อมูลพฤติกรรมการเรียกดูหน้าเว็บไซต์และระยะเวลาของการใช้งาน" />
            </ListItem>
          </List>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูล
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-2 leading-relaxed">
            เราทำการเก็บรวมรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของท่านตาม &quot;ฐานความยินยอม&quot; (Consent Basis), &quot;ฐานการปฏิบัติตามสัญญา&quot; (Contract Basis), หรือ &quot;ฐานประโยชน์โดยชอบด้วยกฎหมาย&quot; (Legitimate Interest) เพื่อ:
          </Typography>
          <List className="mb-6 list-disc pl-5">
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ประมวลผลคำขอ ดำเนินการตามความประสงค์ และนำเสนอบริการที่ตรงกับความต้องการของท่าน" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="พัฒนา ปรับปรุงประสิทธิภาพของเว็บไซต์ รวมถึงวิเคราะห์พฤติกรรมการเยี่ยมชมเพื่อสร้างประสบการณ์ที่ดียิ่งขึ้น" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="แจ้งข่าวสาร โปรโมชั่น และทำการตลาดสิทธิพิเศษต่าง ๆ (เฉพาะในกรณีที่ท่านได้ให้ความยินยอม)" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ใช้เป็นช่องทางในการติดต่อสื่อสารตอบกลับข้อซักถาม รวมถึงแก้ไขปัญหาข้อร้องเรียน (อาทิ ผ่านแชท Tawk.to)" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="ปฏิบัติตามกฎระเบียบของหน่วยงานรัฐและกฎหมายที่บังคับใช้" />
            </ListItem>
          </List>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            3. นโยบายการใช้คุกกี้ (Cookies) และเทคโนโลยีบุคคลที่สาม
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-4 leading-relaxed">
            เราใช้ &quot;คุกกี้&quot; (Cookies) และเทคโนโลยีที่ใกล้เคียง เพื่อรวบรวมข้อมูลการใช้งานอันจะช่วยให้เว็บไซต์ทำงานได้อย่างมีประสิทธิภาพและจดจำความพึงพอใจของท่าน เว็บไซต์ของเราอาจรวมถึงเครื่องมือจากผู้ให้บริการภายนอก (Third-Party Providers) เช่น <strong>Google Analytics</strong> หรือระบบ <strong>Live Chat (Tawk.to)</strong> ซึ่งผู้ให้บริการเหล่านี้อาจเก็บรวบรวมข้อมูลภายใต้นโยบายส่วนบุคคลของตนเอง ท่านมีสิทธิในการตั้งค่าเบราว์เซอร์ของท่านเพื่อปฏิเสธคุกกี้ทั้งหมดหรือบางส่วนได้ อย่างไรก็ตาม หากท่านปิดการทำงานของคุกกี้ การทำงานบางส่วนของเว็บไซต์อาจทำงานได้ไม่สมบูรณ์
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            4. การเปิดเผยหรือแบ่งปันข้อมูลแก่บุคคลภายนอก
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-2 leading-relaxed">
            เรายืนยันที่จะไม่ขาย แลกเปลี่ยน หรือส่งต่อข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สาม เว้นแต่ในสถานการณ์ต่อไปนี้:
          </Typography>
          <List className="mb-6 list-disc pl-5">
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="เมื่อได้รับอนุญาตหรือความยินยอมเป็นลายลักษณ์อักษรจากท่านขัดแจ้ง" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="เพื่อให้ผู้ให้บริการ พันธมิตรทางธุรกิจ หรือบริษัทในเครือ (Data Processors) สามารถดำเนินการในส่วนที่เกี่ยวข้องกับการให้บริการ (เช่น ระบบแชท, การตลาด, บริการวิเคราะห์ข้อมูล) ภายใต้บันทึกข้อตกลงการบริหารข้อมูลส่วนบุคคล (DPA) ที่เข้มงวด" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="เมื่อมีความจำเป็นเพื่อปฏิบัติตามคำสั่งศาล หรือตามหมายเรียกของเจ้าพนักงานผู้มีอำนาจตามกฎหมาย" />
            </ListItem>
          </List>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            5. การรักษาความปลอดภัยของข้อมูลและระยะเวลาจัดเก็บ
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-6 leading-relaxed">
            เราประยุกต์ใช้มาตรการทางเทคนิคและการบริหารจัดการระดับสูง (Technical and Organizational Measures) เพื่อป้องกันข้อมูลสูญหาย การเข้าถึงโดยไม่ได้รับอนุญาต การใช้งาน ดัดแปลง หรือเปิดเผยโดยมิชอบ ข้อมูลของท่านจะถูกจัดเก็บไว้เป็นระยะเวลาเท่าที่จำเป็น เพื่อให้บรรลุวัตถุประสงค์ที่ระบุไว้ในนโยบาย หรือตราบเท่าที่กฎหมายหมายสากลและกฎหมายไทยกำหนดไว้
          </Typography>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            6. สิทธิในฐานะเจ้าของข้อมูลส่วนบุคคล (Data Subject Rights)
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-2 leading-relaxed">
            เพื่อให้สอดคล้องกับ PDPA และหลักเกณฑ์ประดับสากล (เช่น GDPR) ท่านมีสิทธิอันชอบด้วยกฎหมาย ดังต่อไปนี้:
          </Typography>
          <List className="mb-6 list-disc pl-5">
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="สิทธิขอรับการเข้าถึง (Right of Access): ท่านสามารถขอทราบข้อมูลที่บริษัทมีเกี่ยวกับท่าน และขอรับสำเนาที่เกี่ยวข้องได้" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="สิทธิขอให้แก้ไขข้อมูล (Right to Rectification): หากข้อมูลไม่ถูกต้อง ท่านมีสิทธิขอให้เราอัปเดตและแก้ไขให้ถูกต้อง ปัจจุบัน และครอบคลุม" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="สิทธิขอให้ลบข้อมูล (Right to Erasure / Right to be Forgotten): ท่านมีสิทธิขอให้ลบ ทำลาย หรือทำให้ข้อมูลของท่านไม่สามารถระบุตัวตนได้ ภายใต้เงื่อนไขบางประการ" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="สิทธิเพิกถอนความยินยอม (Right to Withdraw Consent): ท่านมีอิสระในการเพิกถอนความยินยอมได้ตลอดเวลา เว้นแต่มีข้อจำกัดด้านสัญญาหรือกฎหมาย" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', paddingY: 0.5 }}>
              <ListItemText sx={{ ".MuiListItemText-primary": { fontFamily: "Prompt", color: "inherit", fontSize: "1rem" } }} primary="สิทธิในการระงับ/คัดค้านการประมวลผล (Right to Restriction/Object) และการโอนย้ายข้อมูล (Right to Data Portability)" />
            </ListItem>
          </List>

          <Typography fontFamily={"Prompt"} variant="h6" className="font-semibold mt-4 mb-2" color="primary">
            7. การติดต่อเพื่อใช้สิทธิและข้อซักถาม
          </Typography>
          <Typography fontFamily={"Prompt"} variant="body1" className="mb-4 leading-relaxed">
            หากท่านมีคำถามเกี่ยวกับเงื่อนไขการให้บริการ หรือต้องการใช้สิทธิอันเกี่ยวกับข้อมูลส่วนบุคคลของท่านในนโยบายฉบับนี้ โปรดติดต่อ <strong>เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (Data Protection Officer - DPO)</strong> ของเราผ่านทางช่องทางดังต่อไปนี้:
          </Typography>
          <Box className="bg-red-50 p-6 rounded-lg border border-red-100 mb-6 shadow-sm">
            <Typography fontFamily={"Prompt"} variant="body1" className="mb-2 text-gray-800 flex items-center">
              <span className="font-semibold w-24">อีเมล:</span> 
              <a href="mailto:Truetelemart@hotmail.com" className="text-red-600 hover:underline">Truetelemart@hotmail.com</a>
            </Typography>
            <Typography fontFamily={"Prompt"} variant="body1" className="mb-2 text-gray-800 flex items-center">
              <span className="font-semibold w-24">โทรศัพท์:</span> 
              <span>+66 910 192 552</span>
            </Typography>
            <Typography fontFamily={"Prompt"} variant="body1" className="text-gray-800 flex items-center">
              <span className="font-semibold w-24">เวลาทำการ:</span> 
              <span>วันจันทร์ - วันเสาร์ (9:00 - 18:00 น.)</span>
            </Typography>
          </Box>
        </Box>

        {/* ----------------------------------------------------------- */}
        {/* ส่วนท้าย */}
        {/* ----------------------------------------------------------- */}
        <Box className="text-center mt-12 pt-8 border-t border-gray-100">
          <Typography
            fontFamily={"Prompt"}
            variant="body2"
            color="textSecondary"
            className="italic"
          >
            เอกสารฉบับนี้มีผลบังคับใช้นับตั้งแต่วันที่ประกาศ เราขอสงวนสิทธิ์โดยชอบธรรมในการปรับปรุงหรือแก้ไขเป็นระยะ เพื่อให้สอดคล้องกับแนวทางข้อบังคับทางกฎหมายและการดำเนินงาน โดยเราจะเผยแพร่ฉบับปรับปรุงผ่านหน้านี้และถือว่ามีผลทันที
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default TermsAndPrivacyClient;
