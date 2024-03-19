//import liraries
import React from 'react';

type Props = {
    children: string
}
const Content = ({ children }: Props) => {
    return (
        <div className='content-body'>
            {children}
        </div>
    );
};

export default Content;
