import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { knowledgeArticles } from '@/src/data/solar';

export default function Knowledge() {
    return (
        <Box>
            <Box className="w-full text-center mt-10 mb-8">
                <Typography className="text-[35px] font-semi-bold text-black" sx={{ fontFamily: 'Prompt' }}>
                    ความรู้พื้นฐานโซล่าเซลล์
                </Typography>
            </Box>

            {knowledgeArticles.map((article, index) => {
                const isEven = index % 2 === 0;
                const textBox = (
                    <Box key={`text-${index}`}>
                        <Typography
                            fontWeight="semi-bold"
                            gutterBottom
                            sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, fontFamily: 'Prompt' }}
                        >
                            {article.title}
                        </Typography>
                        <Typography
                            fontWeight="regular"
                            gutterBottom
                            sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Prompt', whiteSpace: 'pre-line' }}
                        >
                            {article.content}
                        </Typography>
                    </Box>
                );

                const imgBox = (
                    <Box key={`img-${index}`}>
                        <Image
                            src={article.imageSrc}
                            alt={article.imageAlt}
                            width={600}
                            height={400}
                            layout="intrinsic"
                            style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                        />
                    </Box>
                );

                return (
                    <Box
                        key={`article-${index}`}
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
                        {article.imagePosition === 'right' ? (
                            <>
                                {textBox}
                                {imgBox}
                            </>
                        ) : (
                            <>
                                {imgBox}
                                {textBox}
                            </>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}
