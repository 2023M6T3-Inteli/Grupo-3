import React from 'react';


const ButtonAccount: React.FC = () => {
    return ( 
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: 'flex', height: 40, width: 347, backgroundColor: "#0672CB", justifyContent: 'center' }}>
                <button type='submit' style={{ color: 'white' }}>NEXT</button>
            </div>
        </div>
    );
}

export default ButtonAccount;