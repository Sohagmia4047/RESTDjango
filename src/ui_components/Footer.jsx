import React from 'react'
import { CiMail } from "react-icons/ci";
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-[#F6F6F7] padding-x py-16 max-container dark:bg-[#141624]'>
    <div className='flex max-lg:gap-9 lg:gap-4 flex-wrap max-md:justify-center justify-between'>
        <div className='w-[300px] flex flex-col gap-6 max-md:items-center'>
            <h1 className='text-[#141624] text-2xl dark:text-[#FFFFFF]'>SohagFolio</h1>

            <p className='text-[14px] text-[#696A75] leading-[1.5] max-md:text-center dark:text-[#97989F]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Quasi ut aut aperiam dolor id harum aliquam, repudiandae 
                consectetur odit? Quam, illo temporibus accusamus fugiat 
                aliquam nobis suscipit ut corrupti voluptates.
            </p>
        </div>

        <div className='text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center'>
            <p className='font-semibold text-[16px] dark:text-white'>Quick Links</p>
            <ul className='flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]'>
                <li>Home</li>
                <li>About</li>
                <li>Blog</li>
                <li>Archived</li>
                <li>Author</li>
                <li>Contact</li>
            </ul>
        </div>

        <div className='text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center'>
            <p className='font-semibold text-[16px] dark:text-white'>Categoy</p>
            <ul className='flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]'>
                <li>Lifestyle</li>
                <li>Technology</li>
                <li>Travel</li>
                <li>Business</li>
                <li>Economy</li>
                <li>Sports</li>
            </ul>
        </div>

        <div className='bg-white w-[350px] px-6 flex flex-col items-center justify-center gap-2 rounded-lg dark:bg-[#242535] py-6'>
            <h3 className='font-semibold text-xl dark:text-white'>weekly newsletter</h3>
            <p className='text-[#696A75] text-1rem mb-5 dark:text-[#97989F]'>get blog articles and offers via email</p>
            <div className='w-full relative'>
                <input className='border border-[#DCDDDF] rounded-sm h-[40px] px-3 py-3 w-full text-[14px] dark:text-[#181A2A]' 
                placeholder='your Email'/>
                <CiMail className='absolute top-[12px] right-[10px] text-[16px] dark:text-[#97989F]'/>
            </div>
            <button className='bg-[#4B6BFB] text-[#FFFFFF] text-1rem rounded-md w-full py-3'>Subscribe</button>
        </div>

        <div className='py-3 flex items-center gap-6 cursor-pointer max-md:mt-6 max-md:justify-center'>
            <FaInstagram className='dark:text-white text-[20px] text-[#141624]'/>
            <FaFacebook className='dark:text-white text-[20px] text-[#141624]'/>
            <BsTwitterX className='dark:text-white text-[20px] text-[#141624]'/>
            <FaYoutube className='dark:text-white text-[20px] text-[#141624]'/>
        </div>
    </div>
    </footer>
  )
}

export default Footer