import Badge from '@/ui_components/Badge'
import BlogWriter from '@/ui_components/BlogWriter'
import banner from '../images/detailBanner.jpg'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, getBlog } from '@/services/apiBlog'
import Spinner from '@/ui_components/Spinner'
import { BASE_URL } from '@/api'
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Modal from '@/ui_components/Modal'
import CreatePostPage from './CreatePostPage'
import { useState } from 'react'
import { toast } from 'react-toastify'

const DetailPage = ({username, isAuthenticated}) => {
  const {slug} = useParams()
  const [showModel, setShowModel] = useState(false)
  const navigate = useNavigate()

  function toggleModal(){
    setShowModel(curr => !curr)
  }

  const {isPending,isError,error,data:blog} = useQuery({
    queryKey: ['blogs', slug],
    queryFn: () => getBlog(slug)
  })

  const blogID = blog ?.id

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Items delete successfully.")
      navigate("/")
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  })

  function handleDeleteBlog(){
    const popUp = window.confirm("Are you want to delete the blog?")
    if(!popUp){
      return;
    }

    deleteMutation.mutate(blogID)
  }
  
  if(isPending){
    return <Spinner/>
  }
  
  return (
    <>
      <div className='padding-dx max-container py-6'>
          <Badge blog={blog}/>
          <div className='flex justify-between items-center'>
              <h2 className='py-4 leading-normal text-2xl md:text-3xl text-gray-800 tracking-wide font-semibold dark:text-gray-300'>{blog.title}</h2>

              {isAuthenticated && username === blog.author.username && 
              (<span className='flex justify-between items-center gap-2'>
                <HiPencilAlt onClick={toggleModal} className='dark:text-white text-3xl cursor-pointer' />
                <MdDelete onClick={handleDeleteBlog} className='dark:text-white text-3xl cursor-pointer' />
              </span>)}
          </div>
          <BlogWriter blog={blog}/>

          <div className='w-full h-[350px] my-6 overflow-hidden rounded-sm '>
            <img className='w-full h-full object-fill rounded-sm' src={`${BASE_URL}${blog.featured_image}`}/>
          </div>

          <p className='text-[16px] leading-[2rem] text-justify text-gray-500 dark:text-neutral-300'>
            {blog.content}
          </p>
      </div>
      {showModel && <Modal toggleModal={toggleModal}>
        <CreatePostPage blog={blog}/>
      </Modal>}
    </>
  )
}

export default DetailPage