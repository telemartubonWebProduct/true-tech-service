import React from 'react';
import { Box, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import { solarProductInfo } from '@/src/data/solar';

export default function Productnservice() {
  return (
    <Box 
      sx={{ 
        p: { xs: 3, sm: 4, md: 6 }, 
        maxWidth: '1200px', 
        mx: 'auto', 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
        gap: { xs: 4, md: 6 }, 
        bgcolor: 'white', 
        color: 'black', 
        fontFamily: 'Prompt' 
      }}
    >
      {/* Left Section */}
      <Box>
        <Typography 
          fontWeight="bold" 
          gutterBottom 
          sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' } }}
        >
          {solarProductInfo.title}
        </Typography>
        <Typography 
          fontWeight="medium" 
          gutterBottom 
          sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}
        >
          {solarProductInfo.subtitle}
        </Typography>
        <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }}>
          <span dangerouslySetInnerHTML={{ __html: solarProductInfo.description }} />
        </Typography>
        <Box 
          borderTop={1} 
          borderColor="grey.300" 
          pt={4} 
          mt={4}
        >
          <Typography 
            variant="h6" 
            fontWeight="medium" 
            display="flex" 
            alignItems="center" 
            gutterBottom
            sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}
          >
            <span role="img" aria-label="phone" style={{ marginRight: '8px' }}><CallIcon/></span> ติดต่อสอบถาม
          </Typography>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{ fontSize: { xs: '18px', sm: '24px', md: '28px' } }}
          >
            065-224-6569
          </Typography>
        </Box>
      </Box>

      {/* Right Section - Image Video */}
      <Box 
        sx={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%', 
          minHeight: '400px', 
          borderRadius: '16px', 
          overflow: 'hidden',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' 
        }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        >
            <source src="/assets/wEnergy/revieww.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Box>
  );
}
