import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import InputError from "@/ui_components/InputError"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { createBlog, updateBlog } from "@/services/apiBlog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SmallSpinner from "@/ui_components/SmallSpinner"
import SmallSpinnerText from "@/ui_components/SmallSpinnerText"
import LoginPage from "./LoginPage"


const CreatePostPage = ({blog, isAuthenticated}) => {

    const { register, handleSubmit, formState, setValue, reset} = useForm({defaultValues: blog ? blog : {}},)
    const {errors} = formState;
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const blogID = blog?.id

    const updateMutation = useMutation({
    mutationFn: ({ data, id }) => updateBlog(data, id),
    onSuccess: () => {
      navigate("/");
      toast.success("Your post has been updated successfully!");
      console.log("Your post has been updated successfully!");
    },

    onError: (err) => {
      toast.error(err.message);
      console.log("Error updating blog", err);
    },
  });

    const mutation = useMutation({
    mutationFn: (data) => createBlog(data),
    onSuccess: () => {
      toast.success("New post added successfully!!")
      queryClient.invalidateQueries({queryKey: ["blogs"]})
      navigate("/")
      reset()
    },
    })

    function onSubmit(data){
      const formData = new FormData();
      formData.append("title", data.title)
      formData.append("content", data.content)
      formData.append("category", data.category)

      if (data.featured_image && data.featured_image[0]) {
      if (data.featured_image[0] != "/") {
        formData.append("featured_image", data.featured_image[0]);
      }}

      if(blog && blogID){
        updateMutation.mutate({data:formData, id:blogID})
      }
      else{
        mutation.mutate(formData)
      }
    } 

    if(isAuthenticated === false){
        return <LoginPage/>
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
        className={`${
        blog && "h-[90%] overflow-auto"
      }  md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center 
      gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}>
        <div className="flex flex-col gap-2 justify-center items-center mb-2">
            <h3 className="font-semibold text-2xl">{blog ? "Update post" : "Create Post"}</h3>
            <p>{blog ? "Do you want to update your post?" : "Create a new post and share your ideas."}</p>
        </div>

        <div>
            <Label htmlFor="title" className="dark:text-[#97989F]">
                Title
            </Label>
            <Input
            type="text"
            id="title"
            {...register("title", {required: "Blog's title is required", minLength:{value: 3, message: "The title might be at least 3 characters"}})}
            placeholder="Give your post a title"
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px]"/>
            {errors?.title?.message && <InputError error={errors.title.message} />}
        </div>

        <div>
            <Label htmlFor="content">Content</Label>
            <Textarea 
            id="content"
            placeholder="Write your blog post"
             {...register("content", {required: "Blog's content is required", minLength:{value: 10, message: "The content might be at least 10 characters"}})}
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px] w-[400px] text-justify"/>
            {errors?.content?.message && (
          <InputError error={errors.content.message} />
        )}
        </div>

        <div className="w-full">
            <Label htmlFor="category">Category</Label>
            
            <Select {...register("category", 
                {required: "Blog's category is required"})} 
                onValueChange={ (value)=> setValue("category", value)}
                defaultValue={blog ? blog.category : ""}>
                <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]">
                    <SelectValue placeholder="Select a category"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="Frontend">Frontend</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="Fullstack">Fullstack</SelectItem>
                        <SelectItem value="Web3">Web3</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errors?.category?.message && (
          <InputError error={errors.category.message} />
        )}
        </div>

        <div className="w-full">
            <Label>Featured Image</Label>
            <Input
            type="file"
            id="picture"
            {...register("featured_image", {required: blog ? false : "Blog's featured_image is required"})}
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full"/>
            {errors?.featured_image?.message && (
          <InputError error={errors.featured_image.message} />
        )}   
        </div>

        <div className="w-full flex items-center justify-center flex-col my-4">
            {blog ? 
            (<button disabled={updateMutation.isPending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                { updateMutation.isPending ? (<>{""} <SmallSpinner/><SmallSpinnerText text="Updating post...."/> {""}</>) : (<SmallSpinnerText text="Update post"/>)}
            </button>) :

            (<button disabled={mutation.isPending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                { mutation.isPending ? (<>{""} <SmallSpinner/><SmallSpinnerText text="Creating post...."/> {""}</>) : (<SmallSpinnerText text="Create post"/>)}
            </button>)
            }
        </div>

    </form>
  )
}

export default CreatePostPage;
