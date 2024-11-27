import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Database } from '@/lib/database.types'
import { Button } from '@/components/ui/button'
import { MessageSquare, Heart, Repeat2, ExternalLink } from 'lucide-react'
import Image from 'next/image'

type Post = Database['public']['Tables']['posts']['Row']

interface LinkedInPostCardProps {
  post: Post
}

export function LinkedInPostCard({ post }: LinkedInPostCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="whitespace-pre-wrap">{post.content}</div>
          {post.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">{post.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Repeat2 className="h-4 w-4" />
            <span className="text-sm">{post.shares}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <a href={post.post_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Original
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
} 