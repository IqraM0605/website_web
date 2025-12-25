import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import yearPhotos from './photos';

export default function BirthdayWebsite() {
    const [page, setPage] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);
    const [showCake, setShowCake] = useState(false);
    const [particles, setParticles] = useState([]);
    const [heartBurst, setHeartBurst] = useState([]);
    const [isExploding, setIsExploding] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);

    useEffect(() => {
        if (page === 3) {
            setTimeout(() => setShowCake(true), 500);

            const newParticles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 5,
                duration: 3 + Math.random() * 4
            }));
            setParticles(newParticles);
        }
    }, [page]);

    const handleHeartClick = () => {
        setIsExploding(true);

        // Generate millions of hearts (well, 150 for performance!)
        const burstHearts = Array.from({ length: 150 }, (_, i) => ({
            id: i,
            left: 50,
            top: 50,
            angle: (Math.PI * 2 * i) / 150,
            distance: Math.random() * 80 + 40,
            scale: Math.random() * 0.5 + 0.3,
            duration: Math.random() * 0.5 + 1,
            rotation: Math.random() * 360
        }));

        setHeartBurst(burstHearts);

        // Transition to next page after explosion
        setTimeout(() => {
            setPage(2);
            setIsExploding(false);
            setHeartBurst([]);
        }, 1500);
    };

    const images = [
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1530281700549-e82e7bf110d2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=600&fit=crop"
    ];

    const nextImage = () => {
        setImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleYearClick = (year) => {
        setSelectedYear(year);
    };

    // Navigation functions for responsive back buttons
    const goBack = () => {
        if (page > 1) {
            setPage(page - 1);
        } else {
            // If on page 1, go back to the last page (page 4)
            setPage(4);
        }
    };

    if (page === 1) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4">
                {/* Animated background stars */}
                <div className="absolute inset-0 opacity-20">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: Math.random() * 3 + 1 + 'px',
                                height: Math.random() * 3 + 1 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                {/* Fairy lights/chandelier effect */}
                <div className="absolute top-10 left-1/4 w-64 h-64">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-yellow-300"
                            style={{
                                width: Math.random() * 8 + 4 + 'px',
                                height: Math.random() * 8 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.7
                            }}
                        />
                    ))}
                </div>

                <div className="absolute top-20 right-1/3 w-48 h-48">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-pink-300"
                            style={{
                                width: Math.random() * 6 + 3 + 'px',
                                height: Math.random() * 6 + 3 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.6
                            }}
                        />
                    ))}
                </div>

                <div className="absolute bottom-20 left-1/3 w-56 h-56">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-purple-300"
                            style={{
                                width: Math.random() * 7 + 4 + 'px',
                                height: Math.random() * 7 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.5
                            }}
                        />
                    ))}
                </div>

                <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1); }
            75% { transform: scale(1.15); }
          }
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-10px) translateX(5px); }
            50% { transform: translateY(-5px) translateX(-5px); }
            75% { transform: translateY(-15px) translateX(3px); }
          }
          @keyframes sparkleRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

                {/* Heart burst explosion */}
                {isExploding && heartBurst.map((heart) => (
                    <div
                        key={heart.id}
                        className="absolute text-red-500 pointer-events-none"
                        style={{
                            left: '50%',
                            top: '50%',
                            width: `${heart.scale * 40}px`,
                            height: `${heart.scale * 40}px`,
                            animation: `burst ${heart.duration}s ease-out forwards`,
                            '--angle': `${heart.angle}rad`,
                            '--distance': `${heart.distance}vw`,
                            '--rotation': `${heart.rotation}deg`,
                            opacity: 1,
                            filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))',
                            position: 'fixed',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <Heart className="w-full h-full fill-current" />
                    </div>
                ))}

                <style>{`
          @keyframes burst {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(calc(-50% + cos(var(--angle)) * var(--distance)), calc(-50% + sin(var(--angle)) * var(--distance))) rotate(var(--rotation)) scale(0.2);
              opacity: 0;
            }
          }
        `}</style>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    {/* Title with perfect alignment */}
                    <div className="mb-16">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-wider leading-none"
                            style={{
                                textShadow: '0 0 60px rgba(236, 72, 153, 0.6)',
                                fontFamily: 'Georgia, serif',
                                animation: 'gentleFloat 4s ease-in-out infinite'
                            }}>
                            Khebdi Jannu
                        </h1>

                        {/* Sparkles decoration - perfectly centered */}
                        <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
                            {[...Array(7)].map((_, i) => (
                                <Sparkles
                                    key={i}
                                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-300"
                                    style={{
                                        animation: `twinkle ${1 + i * 0.2}s ease-in-out infinite ${i * 0.15}s, sparkleRotate ${3 + i}s linear infinite`,
                                        filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.8))'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Heart button - perfectly centered */}
                    <div className="flex flex-col items-center justify-center">
                        <button
                            onClick={handleHeartClick}
                            disabled={isExploding}
                            className="group relative inline-flex items-center justify-center transform transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-pink-500 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"
                                style={{ width: '150px', height: '150px', margin: '-25px' }} />

                            {/* Main heart */}
                            <Heart
                                className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 text-red-500 fill-red-500 cursor-pointer"
                                style={{
                                    animation: isExploding ? 'none' : 'heartbeat 1.5s ease-in-out infinite',
                                    filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 0.9))',
                                    transform: isExploding ? 'scale(1.5)' : 'scale(1)',
                                    opacity: isExploding ? 0 : 1,
                                    transition: 'all 0.3s ease-out'
                                }}
                            />
                        </button>

                        {/* Text below heart */}
                        <div className="mt-8">
                            <p className="text-xl sm:text-2xl md:text-3xl text-pink-200 font-bold tracking-wide"
                                style={{
                                    textShadow: '0 0 20px rgba(251, 207, 232, 0.9)',
                                    fontFamily: 'Georgia, serif'
                                }}>
                                ✨ Tap on heart ✨
                            </p>
                        </div>
                    </div>
                </div>

                {/* Responsive back button */}
                <button
                    onClick={goBack}
                    className="absolute top-4 right-4 text-pink-300 hover:text-pink-100 font-bold text-lg transition-colors backdrop-blur-sm bg-white bg-opacity-10 px-4 py-2 rounded-full"
                >
                    ← Back
                </button>
            </div>
        );
    }

    if (page === 2) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Floating hearts background */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-pink-500 opacity-10"
                        style={{
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            fontSize: Math.random() * 30 + 20 + 'px',
                            animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 2}s`
                        }}
                    >
                        ❤️
                    </div>
                ))}

                {/* Fairy lights/chandelier effect */}
                <div className="absolute top-10 left-1/4 w-64 h-64">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-yellow-300"
                            style={{
                                width: Math.random() * 8 + 4 + 'px',
                                height: Math.random() * 8 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.7
                            }}
                        />
                    ))}
                </div>

                <div className="absolute top-20 right-1/3 w-48 h-48">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-pink-300"
                            style={{
                                width: Math.random() * 6 + 3 + 'px',
                                height: Math.random() * 6 + 3 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.6
                            }}
                        />
                    ))}
                </div>

                <div className="absolute bottom-20 left-1/3 w-56 h-56">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-purple-300"
                            style={{
                                width: Math.random() * 7 + 4 + 'px',
                                height: Math.random() * 7 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.5
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-6xl w-full relative z-10">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
                        style={{
                            textShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
                            fontFamily: 'Georgia, serif'
                        }}>
                        Our Beautiful Memories ✨
                    </h2>

                    {/* Year Selection */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                        {Object.keys(yearPhotos).map((year) => (
                            <button
                                key={year}
                                onClick={() => handleYearClick(year)}
                                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105 ${selectedYear === year
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                    : 'bg-white bg-opacity-20 text-pink-200 hover:bg-opacity-30'
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>

                    {/* Photo Gallery */}
                    {selectedYear ? (
                        <div className="relative bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-8 border border-white border-opacity-20"
                            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}>
                            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-pink-200">
                                Photos from {selectedYear}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                                {yearPhotos[selectedYear] && yearPhotos[selectedYear].map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
                                        style={{ aspectRatio: '4/3' }}
                                    >
                                        <img
                                            src={photo}
                                            alt={`Photo from ${selectedYear} - ${index + 1}`}
                                            className="w-full h-full object-cover object-center"
                                            style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 sm:py-16">
                            <p className="text-xl sm:text-2xl text-pink-200 mb-8">Select a year to view photos</p>
                        </div>
                    )}

                    {/* Original memories gallery button */}
                    <div className="text-center mt-4 sm:mt-8">
                        <button
                            onClick={() => setPage(3)}
                            className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full text-xl sm:text-2xl font-bold hover:scale-105 transition-transform shadow-2xl overflow-hidden group"
                        >
                            <span className="relative z-10">Continue to Surprise 🎂</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>

                {/* Responsive back button */}
                <button
                    onClick={goBack}
                    className="absolute top-4 right-4 text-pink-300 hover:text-pink-100 font-bold text-lg transition-colors backdrop-blur-sm bg-white bg-opacity-10 px-4 py-2 rounded-full"
                >
                    ← Back
                </button>
            </div>
        );
    }

    if (page === 3) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-950 via-rose-950 to-purple-950 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Floating particles */}
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
                        style={{
                            left: particle.left + '%',
                            bottom: '-10%',
                            animation: `rise ${particle.duration}s ease-in ${particle.delay}s infinite`
                        }}
                    />
                ))}

                {/* Fairy lights/chandelier effect */}
                <div className="absolute top-10 left-1/4 w-64 h-64">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-yellow-300"
                            style={{
                                width: Math.random() * 8 + 4 + 'px',
                                height: Math.random() * 8 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.7
                            }}
                        />
                    ))}
                </div>

                <div className="absolute top-20 right-1/3 w-48 h-48">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-pink-300"
                            style={{
                                width: Math.random() * 6 + 3 + 'px',
                                height: Math.random() * 6 + 3 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.6
                            }}
                        />
                    ))}
                </div>

                <div className="absolute bottom-20 left-1/3 w-56 h-56">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-purple-300"
                            style={{
                                width: Math.random() * 7 + 4 + 'px',
                                height: Math.random() * 7 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.5
                            }}
                        />
                    ))}
                </div>

                <style>{`
          @keyframes rise {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
          }
          @keyframes cakeRise {
            0% { transform: translateY(100vh) scale(0.5) rotateY(0deg); opacity: 0; }
            60% { transform: translateY(0) scale(1.1) rotateY(360deg); opacity: 1; }
            100% { transform: translateY(0) scale(1) rotateY(360deg); opacity: 1; }
          }
        `}</style>

                <div className="max-w-4xl w-full relative z-10">
                    {/* 3D Animated Cake */}
                    <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${showCake ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            animation: showCake ? 'cakeRise 2.5s ease-out forwards' : 'none',
                            transformStyle: 'preserve-3d'
                        }}>
                        <div className="inline-block relative" style={{ perspective: '1000px' }}>
                            {/* Cake emoji with glow */}
                            <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] mb-4 relative"
                                style={{
                                    filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))',
                                    transform: 'rotateY(0deg)',
                                    transformStyle: 'preserve-3d'
                                }}>
                                🎂
                            </div>
                        </div>

                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4"
                            style={{
                                textShadow: '0 0 40px rgba(251, 191, 36, 0.5)',
                                fontFamily: 'Georgia, serif'
                            }}>
                            Happy Birthday
                            Khebdi Jannu! ❤️🎉
                        </h2>
                    </div>

                    {/* Letter */}
                    <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-2 border-yellow-200 relative overflow-hidden"
                        style={{
                            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(251, 191, 36, 0.1)',
                            transform: showCake ? 'scale(1)' : 'scale(0.9)',
                            opacity: showCake ? 1 : 0,
                            transition: 'all 1s ease-out 2s'
                        }}>

                        {/* Decorative corners */}
                        <div className="absolute top-4 left-4 text-yellow-400 text-2xl sm:text-4xl">✨</div>
                        <div className="absolute top-4 right-4 text-pink-400 text-2xl sm:text-4xl">💕</div>
                        <div className="absolute bottom-4 left-4 text-purple-400 text-2xl sm:text-4xl">🌸</div>
                        <div className="absolute bottom-4 right-4 text-yellow-400 text-2xl sm:text-4xl">⭐</div>

                        <div className="relative z-10">
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4 sm:mb-6"
                                style={{ fontFamily: 'Georgia, serif' }}>
                                Dear Khebdi Jannu,
                            </p>

                            <p className="text-lg text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                On this special day, I want you to know how incredibly grateful I am to have you as my best friend. You've been there through all the ups and downs, the laughter and tears, and every moment in between.
                            </p>

                            <p className="text-lg text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                Your kindness, your smile, and your friendship mean the world to me. You make every day brighter just by being you. Thank you for all the memories we've created together and for being such an amazing person.
                            </p>

                            <p className="text-lg text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                Here's to another year of adventures, inside jokes, and unforgettable moments. May all your dreams come true and may this year bring you endless happiness!
                            </p>

                            <p className="text-lg text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                Wishing you a day filled with joy, laughter, and all the things that make you happy. May this new year of your life bring you closer to all your dreams and aspirations.
                            </p>

                            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mt-4 sm:mt-8"
                                style={{ fontFamily: 'Georgia, serif' }}>
                                Happy Birthday, Khebdi Jaanu! 🎂❤️✨
                            </p>

                            <p className="text-base sm:text-lg text-gray-700 mt-4 sm:mt-6 italic" style={{ fontFamily: 'Georgia, serif' }}>
                                With all my love and best wishes,<br />
                                IQRA 💕
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-6 sm:mt-8">
                        <button
                            onClick={() => setPage(4)}
                            className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full text-xl sm:text-2xl font-bold hover:scale-105 transition-transform shadow-2xl overflow-hidden group"
                        >
                            <span className="relative z-10">Our Journey Together 📖</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>

                {/* Responsive back button */}
                <button
                    onClick={goBack}
                    className="absolute top-4 right-4 text-pink-300 hover:text-pink-100 font-bold text-lg transition-colors backdrop-blur-sm bg-white bg-opacity-10 px-4 py-2 rounded-full"
                >
                    ← Back
                </button>
            </div>
        );
    }

    if (page === 4) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Floating stars background */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-yellow-300 opacity-30"
                        style={{
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            fontSize: Math.random() * 20 + 10 + 'px',
                            animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite ${Math.random() * 2}s`
                        }}
                    >
                        ✨
                    </div>
                ))}

                {/* Fairy lights/chandelier effect */}
                <div className="absolute top-10 left-1/4 w-64 h-64">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-yellow-300"
                            style={{
                                width: Math.random() * 8 + 4 + 'px',
                                height: Math.random() * 8 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.7
                            }}
                        />
                    ))}
                </div>

                <div className="absolute top-20 right-1/3 w-48 h-48">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-pink-300"
                            style={{
                                width: Math.random() * 6 + 3 + 'px',
                                height: Math.random() * 6 + 3 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.6
                            }}
                        />
                    ))}
                </div>

                <div className="absolute bottom-20 left-1/3 w-56 h-56">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-purple-300"
                            style={{
                                width: Math.random() * 7 + 4 + 'px',
                                height: Math.random() * 7 + 4 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `twinkle ${Math.random() * 2 + 1}s infinite ${Math.random() * 2}s`,
                                filter: 'blur(1px)',
                                opacity: 0.5
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-4xl w-full relative z-10">
                    {/* Heart decoration */}
                    <div className="text-center mb-4 sm:mb-8">
                        <div className="inline-block text-5xl sm:text-6xl" style={{
                            animation: 'heartbeat 2s ease-in-out infinite',
                            filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))'
                        }}>
                            💖
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-2 border-pink-200 relative overflow-hidden"
                        style={{
                            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(236, 72, 153, 0.1)',
                            transform: 'scale(1)',
                            opacity: 1,
                            transition: 'all 1s ease-out'
                        }}>

                        {/* Decorative corners */}
                        <div className="absolute top-4 left-4 text-yellow-400 text-2xl sm:text-4xl">✨</div>
                        <div className="absolute top-4 right-4 text-pink-400 text-2xl sm:text-4xl">💕</div>
                        <div className="absolute bottom-4 left-4 text-purple-400 text-2xl sm:text-4xl">🌸</div>
                        <div className="absolute bottom-4 right-4 text-yellow-400 text-2xl sm:text-4xl">⭐</div>

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                                style={{ fontFamily: 'Georgia, serif' }}>
                                Our Journey Together
                            </h2>

                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4 sm:mb-6"
                                style={{ fontFamily: 'Georgia, serif' }}>
                                Dear Khebdi Jannu,
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                As I look through these photos from 2022 to 2025, I'm overwhelmed with gratitude for the incredible journey we've shared together. Four years of beautiful memories, countless moments of laughter, and an unbreakable bond that has only grown stronger with time.
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                From the early days in 2022 when we first started creating memories, to all the adventures we've had through 2023 and 2024, and now looking back at 2025, I realize how blessed I am to have you in my life. These photos capture just a fraction of the joy, warmth, and happiness you've brought into my world.
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                Your friendship has been a constant source of strength and comfort. Through every season of life, every challenge and celebration, you've been there with your beautiful smile and caring heart. You've seen me at my best and my worst, and somehow you still choose to stick around.
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                The trust, understanding, and unconditional support we share is something truly rare. You've celebrated my victories as if they were your own and lifted me up during difficult times. The inside jokes, the late-night conversations, the shared dreams – all of these have woven the beautiful tapestry of our friendship.
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                I know that like all close relationships, we haven't always seen eye to eye. We've had our disagreements and moments when we didn't understand each other, sometimes even fighting over things that seem so trivial now. But what makes our friendship truly special is that we always found our way back to each other. Through every misunderstanding, every argument, and every moment of distance, we chose to reconnect and work through our differences with love and understanding.
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                These experiences have only deepened our bond, teaching us that true friendship isn't about never having conflicts – it's about choosing each other again and again, even when things get tough. Every time we've fought and made up, our friendship has grown stronger and more resilient.
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                                As we move forward, I'm excited about all the new memories we'll create together. The future holds so much promise, and I'm grateful to have such an amazing friend to share it with. Thank you for being exactly who you are – a beautiful soul who makes the world brighter just by being in it.
                            </p>

                            <p className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mt-6 sm:mt-8"
                                style={{ fontFamily: 'Georgia, serif' }}>
                                With all my love and endless gratitude,<br />
                                IQRA 💕
                            </p>

                            <div className="text-center mt-6 sm:mt-10">
                                <div className="inline-flex items-center gap-2 sm:gap-4 text-pink-600 flex-wrap justify-center">
                                    <span className="text-2xl sm:text-3xl">💖</span>
                                    <span className="text-base sm:text-lg md:text-lg font-bold">May Allah bless you with success in every aspect of life. Ameen.</span>
                                    <span className="text-2xl sm:text-3xl">💖</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Responsive back button */}
                    <div className="text-center mt-6 sm:mt-8">
                        <button
                            onClick={goBack}
                            className="text-pink-300 hover:text-pink-100 font-bold text-lg transition-colors backdrop-blur-sm bg-white bg-opacity-10 px-4 py-2 sm:px-6 sm:py-3 rounded-full"
                        >
                            ← Back to Start
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}