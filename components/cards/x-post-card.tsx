import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Repeat2, Heart, ExternalLink } from "lucide-react"
import { Database } from '@/lib/database.types'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Post = Database['public']['Tables']['posts']['Row']
type Creator = Database['public']['Tables']['creators']['Row']

interface XPostCardProps {
  post: Post & { creator?: Creator }
  isBlurred?: boolean
}

function BlueCheckmark() {
  return (
    <span className="text-[#1d9bf0]">
      <svg viewBox="0 0 22 22" className="h-[18px] w-[18px] fill-current">
        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
      </svg>
    </span>
  )
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}m`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`
  }
  return num.toString()
}

export function XPostCard({ post, isBlurred = false }: XPostCardProps) {
  const getInitials = (name: string = 'Anonymous') => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  const creatorName = post.creator?.name || 'Anonymous'
  const creatorHandle = post.creator?.x_handle || 'unknown'
  const profilePicture = post.creator?.profile_picture || ''

  return (
    <div className="w-full max-w-[550px] mx-auto">
      <Card className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
        <CardContent className="p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage 
                  src={profilePicture} 
                  alt={creatorName}
                  className="object-cover"
                  width={48}
                  height={48}
                />
                <AvatarFallback>{getInitials(creatorName)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-bold text-sm sm:text-[15px] truncate">
                    {creatorName}
                  </span>
                  {post.creator && <BlueCheckmark />}
                </div>
                <span className="text-gray-500 text-sm sm:text-[15px] truncate">
                  {creatorHandle}
                </span>
              </div>
              
              <div className="mt-1 space-y-2 sm:space-y-3 text-sm sm:text-[15px] relative">
                <div className={cn(
                  "whitespace-pre-wrap break-words",
                  isBlurred && "blur-sm select-none"
                )}>
                  {post.content}
                </div>
                
                {post.image && (
                  <div className="relative mt-2 sm:mt-3 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800">
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={post.image}
                        alt="Post image"
                        fill
                        sizes="(max-width: 550px) 100vw, 550px"
                        className="object-cover object-center"
                        priority={false}
                        quality={85}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-2 sm:mt-3 flex justify-between items-center">
                <div className="flex gap-4 sm:gap-6 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-blue-500 transition group">
                    <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[11px] sm:text-xs group-hover:text-blue-500">
                      {formatNumber(post.comments)}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-500 transition group">
                    <Repeat2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[11px] sm:text-xs group-hover:text-green-500">
                      {formatNumber(post.shares)}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-pink-500 transition group">
                    <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[11px] sm:text-xs group-hover:text-pink-500">
                      {formatNumber(post.likes)}
                    </span>
                  </button>
                </div>
                
                {post.post_url && (
                  <a
                    href={post.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition ml-2"
                    title="Open original post"
                  >
                    <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}