import React from 'react'

interface AvatarGroupProps {
    user: any;
}
const AvatarGroup: React.FC<AvatarGroupProps> = ({ user }) => {

    const slicedUsers = user.slice(0, 3);

    const positionMap = {
        0: 'top-0 left-[12px]',
        1: 'buttom-0',
        2: 'buttom-0 right-0'
    };




    return (
        <div className=' relative h-11 w-11'>
            {slicedUsers.map((user: any, index: any) => (
                <div
                    key={user.id}
                    className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]
                    ${positionMap[index as keyof typeof positionMap]}`}
                >
                    
                </div>
            ))}

        </div>
    )
}

export default AvatarGroup