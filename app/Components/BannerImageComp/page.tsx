'use client';
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Card1 from '../Cards/Card1/Card1';
import Card2 from '../Cards/Card2/Card2';
import Card3 from '../Cards/Card3/Card3';
import Card4 from '../Cards/Card4/Card4';
import style from './bannerImageComp.module.css';

interface CardData {
    title: string;
    description: string;
    link: string;
    image: string | null;
}

const BannerImageComp = () => {
    const [data, setData] = useState<CardData | null>(null);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            try {
                setData(JSON.parse(storedData));
            } catch (error) {
                console.error('Error parsing stored data:', error);
            }
        }
    }, []);

    const handleSave = (updatedData: Partial<CardData>) => {
        const newData = { ...(data || {}), ...updatedData } as CardData;
        setData(newData);
        localStorage.setItem('formData', JSON.stringify(newData)); // Update local storage
    };

    const handleSelectCard = (cardIndex: number) => {
        setSelectedCard(cardIndex);
    };

    const handleDownload = async () => {
        if (selectedCard !== null) {
            const cardElement = document.getElementById(`card${selectedCard}`);
            const radioInputs = document.querySelectorAll('input[type="radio"]');
            const labels = document.querySelectorAll('label');

            if (cardElement) {
                try {
                    // Hide radio buttons and labels
                    radioInputs.forEach(input => (input as HTMLElement).style.display = 'none');
                    labels.forEach(label => (label as HTMLElement).style.display = 'none');
                    
                    // Ensure the element is visible for capture
                    cardElement.style.visibility = 'visible';

                    const canvas = await html2canvas(cardElement, {
                        useCORS: true,
                        scrollX: 0,
                        scrollY: -window.scrollY,
                        width: cardElement.scrollWidth,
                        height: cardElement.scrollHeight,
                        scale: window.devicePixelRatio,
                    });
                    const dataURL = canvas.toDataURL('image/png');

                    // Restore radio buttons and labels
                    radioInputs.forEach(input => (input as HTMLElement).style.display = 'block');
                    labels.forEach(label => (label as HTMLElement).style.display = 'block');

                    // Create a link and download the image
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = `card${selectedCard}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch (error) {
                    console.error('Error generating image:', error);
                }
            }
        }
    };

    return (
        <div className={style.bannerImgs}>
            <h1 className={style.heading}>Select One Banner</h1>
            <div className={style.cardsContainer}>
                <div className={`${style.cardWrapper} ${selectedCard === 1 ? style.selectedCard : ''}`}>
                    <input
                        type="radio"
                        id="card1"
                        name="cardSelection"
                        value="1"
                        checked={selectedCard === 1}
                        onChange={() => handleSelectCard(1)}
                    />
                    <label htmlFor="card1">Card 1</label>
                    <div id="card1">
                        <Card1 data={data} onSave={handleSave} />
                    </div>
                </div>
                
                <div className={`${style.cardWrapper} ${selectedCard === 2 ? style.selectedCard : ''}`}>
                    <input
                        type="radio"
                        id="card2"
                        name="cardSelection"
                        value="2"
                        checked={selectedCard === 2}
                        onChange={() => handleSelectCard(2)}
                    />
                    <label htmlFor="card2">Card 2</label>
                    <div id="card2">
                        <Card2 data={data} onSave={handleSave} />
                    </div>
                </div>
                
                <div className={`${style.cardWrapper} ${selectedCard === 3 ? style.selectedCard : ''}`}>
                    <input
                        type="radio"
                        id="card3"
                        name="cardSelection"
                        value="3"
                        checked={selectedCard === 3}
                        onChange={() => handleSelectCard(3)}
                    />
                    <label htmlFor="card3">Card 3</label>
                    <div id="card3">
                        <Card3 data={data} onSave={handleSave} />
                    </div>
                </div>
                
                <div className={`${style.cardWrapper} ${selectedCard === 4 ? style.selectedCard : ''}`}>
                    <input
                        type="radio"
                        id="card4"
                        name="cardSelection"
                        value="4"
                        checked={selectedCard === 4}
                        onChange={() => handleSelectCard(4)}
                    />
                    <label htmlFor="card4">Card 4</label>
                    <div id="card4">
                        <Card4 data={data} onSave={handleSave} />
                    </div>
                </div>
                
            </div>
            <button
                className={style.downloadButton}
                onClick={handleDownload}
                disabled={selectedCard === null}
            >
                Download Selected
            </button>
        </div>
    );
};

export default BannerImageComp;
