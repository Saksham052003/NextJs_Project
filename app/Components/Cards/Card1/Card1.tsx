// app/components/Cards/Card1/Card1.tsx
'use client';
import React from 'react';
import style from './card1.module.css';
import EditBannerTemplateBs from '../../EditBannerTemplateBs/EditBannerTemplateBs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';

interface CardData {
    title: string;
    description: string;
    link: string;
    image: string | null;
}

interface CardProps {
    data: CardData | null;
    onSave: (updatedData: Partial<CardData>) => void;
}

const Card1 = ({ data, onSave }: CardProps) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleClick = () => {
        if (data?.link) {
            window.location.href = data.link;
        }
    };

    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <div className={style.card1}>
                <h1 className={style.title1}>{data?.title}</h1>
                <p className={style.des1}>{data?.description}</p>
                {data?.image && <img src={data.image} alt="Uploaded" className={style.img1}/>}
                <button className={style.button1} onClick={handleClick}>
                    Learn More
                </button>
                <button className={style.editIcon} onClick={() => setIsEditing(true)}>
  <FontAwesomeIcon icon={faPen} size="lg" />
</button>
                {isEditing && <EditBannerTemplateBs onClose={() => setIsEditing(false)} onSave={onSave} />}
            </div>
        </div>
    );
}

export default Card1;
