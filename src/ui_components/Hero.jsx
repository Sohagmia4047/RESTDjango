import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from 'react-icons/fa';
import { BASE_URL } from '@/api';
import { HiPencilAlt } from "react-icons/hi";

const Hero = ({userInfo, authUsername, toggleModal}) => {
  
  return (
    <div className='padding-x py-9 max-container flex flex-col items-center justify-center gap-4 bg-neutral-100 dark:bg-gray-800 rounded-md'>
      <div className='flex gap-4'>
        <div className='w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden '>
          <img src={`${BASE_URL}${userInfo?.profile_picture}`} 
          className='w-[4.5rem] h-[4.5rem] rounded-full object-cover '/>
        </div>

        <span>
          <p className='text-[.875rem] text-gray-900 dark:text-white capitalize'>{userInfo?.first_name} {userInfo?.last_name}</p>
          <p className='text-[.875rem] text-zinc-500 font-thin dark:text-gray-400'>{userInfo?.job_title || "Collaborator & Editor" }</p>
        </span>

        {userInfo?.username === authUsername && 
        <span>
          <HiPencilAlt className='dark:text-white text-3xl cursor-pointer' onClick={toggleModal} />
        </span>}

      </div>
      <p className='text-zinc-700 text-[1rem] max-md:leading-[2rem] lg:leading-normal lg:mx-[200px] text-center dark:text-gray-400'>
        {userInfo?.bio}
      </p>

      <div className='flex gap-4 justify-center items-center text-white text-xl'>
        <div className='w-[40px] h-[40px] rounded-lg bg-zinc-500 flex justify-center items-center'>
          <FaInstagram/>
        </div>
        <div className='w-[40px] h-[40px] rounded-lg bg-zinc-500 flex justify-center items-center'>
          <FaFacebook/>
        </div>
        <div className='w-[40px] h-[40px] rounded-lg bg-zinc-500 flex justify-center items-center'>
          <FaYoutube/>
        </div>
        <div className='w-[40px] h-[40px] rounded-lg bg-zinc-500 flex justify-center items-center'>
          <BsTwitterX/>
        </div>
      </div>
    </div>
  )
}

export default Hero