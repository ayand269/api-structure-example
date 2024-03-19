//import liraries
import React from 'react';

type Props = {
    children: string
}
const CodesBlock = ({ children }: Props) => {
    return (
        <div className='codes-block'>
            {children}
        </div>
    );
};

export default CodesBlock;