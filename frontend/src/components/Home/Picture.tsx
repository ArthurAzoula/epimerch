import React from 'react';

type PictureProps = {
    urlImage: string;
    classname: string;
};

const Picture = ({urlImage, classname}: PictureProps) => {
    return (
        <div className={` ${classname}`}>
            <img src={urlImage} alt="image" />
        </div>
    );
};

export default Picture;