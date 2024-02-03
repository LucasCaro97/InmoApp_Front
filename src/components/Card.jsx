import React from 'react'

const Card = ({title, description, imageUrl, index  }) => {
  return (
    <div key={index} className='h-[450px]'>
                <div className='h-56 rounded-tl-xl bg-green-700 flex justify-center items-center'>
                    <img src="/landingimg.png" alt="" />
                </div>
            <div>
            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <p className='text-xl font-semibold'>{title}</p>
                <p>{description}</p>
                <button className='bg-green-900 text-slate-300 text-lg px-6 py-1 rounded-xl'>Ver mas</button>
            </div>
            </div>
        </div>
  )
}

export default Card
