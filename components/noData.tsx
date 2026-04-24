"use client"

import HomeButton from "@/components/homeButton";

const NoDataFound = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'Georgia, serif'
        }}>
            {/* Centered Home Button */}
            <div style={{
                marginBottom: '2rem',
                transform: 'scale(1.2)', // Slightly larger for emphasis
                opacity: 0.8
            }}>
                <HomeButton />
            </div>

            {/* Error Message */}
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: 'rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
            }}>
                No Data Found
            </h2>

            <p style={{
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                color: 'rgba(0,0,0,0.5)',
                maxWidth: '300px',
                lineHeight: '1.6'
            }}>
                Please enter a correct date or return to the chronological overview.
            </p>
        </div>
    );
};

export default NoDataFound;